const fs = require('fs');
const path = require('path');
const Jimp = require('jimp-compact');

async function fixPngs(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await fixPngs(fullPath);
    } else if (file.toLowerCase().endsWith('.png')) {
      const buf = fs.readFileSync(fullPath);
      const headerHex = buf.slice(0, 4).toString('hex');

      if (headerHex !== '89504e47') {
        console.log(`Fixing invalid PNG header (${headerHex}) -> ${fullPath}...`);
        try {
          const img = await Jimp.read(fullPath);
          await img.writeAsync(fullPath);

          const fixedBuf = fs.readFileSync(fullPath);
          const newHeaderHex = fixedBuf.slice(0, 4).toString('hex');
          console.log(`  └─ Done! New Header: ${newHeaderHex} (${fullPath})`);
        } catch (err) {
          console.error(`  └─ Failed to convert ${fullPath}:`, err.message);
        }
      }
    }
  }
}

console.log('Starting PNG header validation and conversion...');
fixPngs('assets')
  .then(() => console.log('All PNG assets processed successfully!'))
  .catch((err) => console.error('Error during asset processing:', err));
