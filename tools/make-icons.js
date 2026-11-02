// Renders the PWA home-screen icons from the game's own in-code pixel art.
// Usage: node tools/make-icons.js   (needs Playwright + Chromium)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(__dirname, '../index.html'));
  await p.waitForTimeout(300);
  const out = await p.evaluate(() => {
    // 64x64 pixel scene: the Dingle, with the surveyor in a clearing of fog
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d'); g.imageSmoothingEnabled = false;
    g.drawImage(mapCanvas, 37 * 16 - 32, 52 * 16 - 30, 64, 64, 0, 0, 64, 64);
    const grd = g.createRadialGradient(36, 34, 20, 36, 34, 40);
    grd.addColorStop(0, 'rgba(23,21,46,0)'); grd.addColorStop(1, 'rgba(23,21,46,0.95)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
    drawPerson(g, 32, 30, 'down', 0, PLAYER_LOOK);
    const big = (size) => {
      const o = document.createElement('canvas'); o.width = size; o.height = size;
      const og = o.getContext('2d'); og.imageSmoothingEnabled = false;
      og.drawImage(c, 0, 0, size, size);
      return o.toDataURL('image/png').split(',')[1];
    };
    return { i512: big(512), i192: big(192), i180: big(180), i32: big(32) };
  });
  const w = (n, d) => fs.writeFileSync(path.resolve(__dirname, '../icons', n), Buffer.from(d, 'base64'));
  w('icon-512.png', out.i512); w('icon-192.png', out.i192); w('apple-touch-icon.png', out.i180); w('favicon-32.png', out.i32);
  await b.close();
})();
