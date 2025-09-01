const sharp = require('sharp');

// Create a simple colored square with text
const width = 512;
const height = 512;
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#4A90E2"/>
  <text x="50%" y="50%" font-family="Arial" font-size="120" fill="white" text-anchor="middle" dominant-baseline="middle">
    FD
  </text>
</svg>
`;

// Generate icons
Promise.all([
  sharp(Buffer.from(svg))
    .resize(192, 192)
    .toFile('public/icon-192x192.png'),
  sharp(Buffer.from(svg))
    .resize(512, 512)
    .toFile('public/icon-512x512.png')
]).then(() => {
  console.log('Icons generated successfully!');
}).catch(err => {
  console.error('Error generating icons:', err);
});
