const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const BOT_TOKEN = '8633683144:AAHH2YiwL3kDL0s88aoVAY_ZmggFcYYs-XI'; 
const SAVE_DIR = 'C:\\Users\\habte\\Videos\\newSystem\\cirt';

const bot = new Telegraf(BOT_TOKEN);

// Ensure directory exists
if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR, { recursive: true });
}

console.log('🚀 Sequential Bot Started.');
console.log(`📂 Saving to: ${SAVE_DIR}`);

// --- THE QUEUE ---
// This acts like a "single file line" at a bank.
// No matter how many people (images) come in, they must wait their turn.
let processingQueue = Promise.resolve();

bot.on('photo', (ctx) => {
    // Add this task to the end of the line
    processingQueue = processingQueue.then(async () => {
        await processImage(ctx);
    }).catch(err => {
        console.error("Queue Error:", err);
    });
});

// --- THE WORKER FUNCTION ---
async function processImage(ctx) {
    try {
        // 1. Get the highest quality photo
        const photoArray = ctx.message.photo;
        const fileId = photoArray[photoArray.length - 1].file_id;

        // 2. Get file link
        const fileLink = await ctx.telegram.getFileLink(fileId);

        // 3. CRITICAL: Check folder NOW, inside the lock
        // Since we are in a queue, no other image is checking this folder right now.
        const nextIndex = getNextIndex(SAVE_DIR);
        const fileName = `${nextIndex}.jpg`;
        const filePath = path.join(SAVE_DIR, fileName);

        console.log(`Processing... Saving as ${fileName}`);

        // 4. Download
        const response = await axios({
            url: fileLink.href,
            responseType: 'stream',
        });

        // 5. Save to disk and WAIT for it to finish
        await new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`✅ Done: ${fileName}`);
        // Optional: Reply to user (might be spammy if you forward 10 images)
        await ctx.reply(`✅ Saved: ${fileName}`);

    } catch (error) {
        console.error('Failed to save image:', error.message);
    }
}

// --- HELPER: MATH STUFF ---
function getNextIndex(dir) {
    const files = fs.readdirSync(dir);
    
    // Sort files numerically: 0, 1, 2... 
    const numbers = files
        .map(f => parseInt(path.parse(f).name))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b);

    // If empty, start at 0. Otherwise, highest + 1
    if (numbers.length === 0) return 0;
    return numbers[numbers.length - 1] + 1;
}

// Start Bot
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));