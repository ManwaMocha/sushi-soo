const fs = require('fs').promises;
const path = require('path');

module.exports = function (req, res, next) {
  if (req.method === 'POST' && req.url === '/upload') {
    const busboy = require('busboy')({ headers: req.headers });
    let filePath;
    let fileName;

   busboy.on('file', (fieldname, file, filename) => {
  if (!filename.toLowerCase().endsWith('.jpg') && !filename.toLowerCase().endsWith('.jpeg')) {
    return res.status(400).json({ error: 'Only JPG files are allowed' });
  }
  fileName = `${Date.now()}-${filename}`;
  filePath = path.join(__dirname, 'public/images', fileName);
  file.pipe(require('fs').createWriteStream(filePath));
});


    busboy.on('finish', async () => {
      try {
        const dbPath = path.join(__dirname, 'db.json');
        const db = JSON.parse(await fs.readFile(dbPath, 'utf8'));
        db.menuImages = db.menuImages || [];
        db.menuImages.push({
          id: Date.now().toString(),
          url: `http://localhost:3000/images/${fileName}`
        });
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
        res.status(201).json({ url: `http://localhost:3000/images/${fileName}` });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save image: ' + error.message });
      }
    });

    busboy.on('error', (error) => {
      res.status(500).json({ error: 'Upload failed: ' + error.message });
    });

    req.pipe(busboy);
  } else {
    next();
  }
};