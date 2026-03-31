import fitz  # PyMuPDF
import textwrap
import os
import logging
import subprocess
from flask import Flask, request, jsonify

from b import replace_barcode_expand_box

app = Flask(__name__)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


def get_local_barcode_svg_string(custom_data):
    """Backward-compatible wrapper around the local ww.js generator."""
    return get_local_barcode_svg_string_ww(custom_data)


def get_local_barcode_svg_string_ww(custom_data):
    """Generate barcode SVG locally via ww.js instead of the browser hook."""
    script_path = os.path.join(os.path.dirname(__file__), "wwsvg_cli.js")
    try:
        result = subprocess.run(
            ["node", script_path, custom_data, "30", "100"],
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
        )
        return result.stdout
    except Exception as e:
        logger.error(f"Local barcode generation error: {e}")
    return '<svg width="100" height="100"><line x1="0" y1="0" x2="1" y2="1" /></svg>'


def edit_text_layer(input_pdf, output_pdf, amharic_font_path, replacements):
    """Handles text replacement."""
    try:
        doc = fitz.open(input_pdf)
    except Exception as e:
        return {"status": "error", "message": f"Error opening PDF: {e}"}

    total_instances_found = 0
    amharic_font_used = False

    for page in doc:
        for item in replacements:
            target_text = item.get("old")
            new_text = item.get("new")
            use_english_font = item.get("english", True)
            limit = item.get("limit", 20)
            mask_inset_left = item.get("mask_inset_left", 0)
            mask_inset_right = item.get("mask_inset_right", 0)
            mask_inset_top = item.get("mask_inset_top", 0)
            mask_inset_bottom = item.get("mask_inset_bottom", 0)

            if not all([target_text, new_text]):
                continue

            if use_english_font:
                active_font_name, active_font_file = "helv", None
            else:
                active_font_name, active_font_file = "amharic_font", amharic_font_path
                amharic_font_used = True

            matches = []
            target_clean = target_text.strip()
            if " " in target_clean:
                matches = page.search_for(target_clean)
            else:
                for word in page.get_text("words"):
                    if word[4] == target_clean:
                        matches.append(fitz.Rect(word[:4]))

            for rect in matches:
                total_instances_found += 1
                size = 11.0
                try:
                    block_data = page.get_text("dict", clip=rect)
                    for block in block_data.get("blocks", []):
                        for line in block.get("lines", []):
                            for span in line.get("spans", []):
                                if span["text"].strip():
                                    size = span["size"]
                except Exception:
                    pass

                redact_rect = fitz.Rect(
                    rect.x0 + mask_inset_left,
                    rect.y0 + mask_inset_top,
                    rect.x1 - mask_inset_right,
                    rect.y1 - mask_inset_bottom,
                )
                if redact_rect.x1 <= redact_rect.x0 or redact_rect.y1 <= redact_rect.y0:
                    redact_rect = rect

                page.add_redact_annot(redact_rect, fill=(1, 1, 1))
                page.apply_redactions()

                wrapped = textwrap.wrap(new_text, width=limit)
                line_h = size * 1.3
                start_y = ((rect.y0 + rect.y1) / 2) - ((len(wrapped) * line_h) / 2)

                for i, line in enumerate(wrapped):
                    try:
                        page.insert_text(
                            (rect.x0, start_y + (i * line_h) + size),
                            line,
                            fontname=active_font_name,
                            fontfile=active_font_file,
                            fontsize=size,
                        )
                    except Exception:
                        pass

    if total_instances_found > 0:
        if amharic_font_used:
            try:
                doc.subset_fonts()
            except Exception:
                pass
        doc.save(output_pdf, garbage=4, deflate=True)
        doc.close()
        return {"status": "success", "count": total_instances_found}

    doc.save(output_pdf)
    doc.close()
    return {"status": "no_changes", "count": 0}


@app.route("/process_pdf", methods=["POST"])
async def process_pdf_request():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"status": "error", "message": "Invalid JSON"}), 400

    input_file = data.get("input_file_path")
    if not input_file or not os.path.exists(input_file):
        return jsonify({"status": "error", "message": "Input file not found"}), 404

    out_dir_pre = r"C:\\Users\\habte\\Videos\\newSystem\\pdfs"
    # out_dir_pre = r"C:\\Users\\habte\\Videos\\newSystem\pdfs"
    variable_dir = data.get("id") + data.get("fullName")
    out_dir = os.path.join(out_dir_pre, variable_dir)
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    font_file = r"C:\\Users\\habte\\Videos\\newSystem\\NotoSansEthiopic-Regular.ttf"
    filename = data.get("barcode_value") + data.get("type") + ".pdf"
    output_path = os.path.join(out_dir, filename)

    text_result = edit_text_layer(input_file, output_path, font_file, data.get("changes", []))
    if text_result["status"] == "error":
        return jsonify(text_result), 500

    barcode_value = data.get("barcode_value")
    barcode_status = "Skipped"
    pat = ""

    if barcode_value:
        svg_data = get_local_barcode_svg_string_ww(barcode_value)
        if svg_data and "Error" not in svg_data:
            success = await replace_barcode_expand_box(output_path, svg_data)
            if success:
                barcode_status = "UPDATED (Surgical)"
                pat = success
            else:
                barcode_status = "FAILED (Stream Error)"
        else:
            barcode_status = "FAILED (Local SVG Error)"

    msg = f"Text: {text_result['count']} changes. Barcode: {barcode_status}"
    logger.info(f"SUCCESS {msg}")

    return jsonify({
        "status": "success",
        "message": msg,
        "output_file": pat,
    }), 200


if __name__ == "__main__":
    print("Flask Server Running (Sync Mode)...")
    app.run(host="0.0.0.0", port=5000, debug=True)
