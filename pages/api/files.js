import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }

    const filesList = files.map(file => {
      const filePath = path.join('/uploads', file);
      return {
        name: file,
        path: filePath,
      };
    });

    res.status(200).json(filesList);
  });
}
