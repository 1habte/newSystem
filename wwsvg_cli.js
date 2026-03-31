const { ww } = require("./ww");

const input = process.argv[2] || "";
const height = Number(process.argv[3] || 30);
const width = Number(process.argv[4] || 100);

process.stdout.write(ww(input, height, width));
