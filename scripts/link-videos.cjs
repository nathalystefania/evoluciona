
const fs = require('node:fs');
const path = require('node:path');

const assetsDir = path.resolve(
  __dirname,
  '../dist/evoluciona/assets'
);

const linkPath = path.join(assetsDir, 'video');

const target = '/opt/tomcat/common/assets/video';

if (!fs.existsSync(assetsDir)) {
  throw new Error(`No existe assets: ${assetsDir}`);
}

try {
  const current = fs.lstatSync(linkPath);

  if (
    current.isSymbolicLink() &&
    fs.readlinkSync(linkPath) === target
  ) {
    console.log('✓ Enlace de videos ya existe');
    process.exit(0);
  }

  throw new Error(
    'assets/video ya existe y no coincide con el destino esperado. ' +
    'No se modificará automáticamente.'
  );
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

fs.symlinkSync(target, linkPath, 'dir');

console.log(`✓ Enlace creado: assets/video -> ${target}`);
