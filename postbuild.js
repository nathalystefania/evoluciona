const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'src/index.html');
const backupPath = path.join(__dirname, 'src/index.backup.html');

if (fs.existsSync(backupPath)) {
  fs.copyFileSync(backupPath, indexPath);
  fs.unlinkSync(backupPath);
  console.log('index.html restaurado correctamente después del build');
} else {
  console.log('No se encontró backup de index.html');
}
