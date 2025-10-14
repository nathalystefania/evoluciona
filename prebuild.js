const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carga variables desde .env
dotenv.config();

// Crea el contenido para environment.ts
const environment = `
export const environment = {
  production: false,
  zohoFormId: '${process.env.ZOHO_FORM_ID || ''}',
  zohoActionUrl: '${process.env.ZOHO_ACTION_URL || ''}',
  zohoRid: '${process.env.ZOHO_RID || ''}',
  gaMeasurementId: '${process.env.GA_MEASUREMENT_ID || ''}',
  gaAdsId: '${process.env.GA_ADS_ID || ''}'
};
`;

// Crea el contenido para environment.prod.ts
const environmentProd = `
export const environment = {
  production: true,
  zohoFormId: '${process.env.ZOHO_FORM_ID || ''}',
  zohoActionUrl: '${process.env.ZOHO_ACTION_URL || ''}',
  zohoRid: '${process.env.ZOHO_RID || ''}',
  gaMeasurementId: '${process.env.GA_MEASUREMENT_ID || ''}',
  gaAdsId: '${process.env.GA_ADS_ID || ''}'
};
`;

// Rutas de los archivos
const envDir = path.resolve(__dirname, 'src/environments');
const envFile = path.join(envDir, 'environment.ts');
const envProdFile = path.join(envDir, 'environment.prod.ts');

// Asegura que el directorio exista
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Escribe los archivos
fs.writeFileSync(envFile, environment);
fs.writeFileSync(envProdFile, environmentProd);

console.log('environment.ts y environment.prod.ts generados exitosamente.');


// --- Inyección de Google y ZOHO Scripts en index.html ---

const indexPath = path.join(__dirname, 'src/index.html');
const backupPath = path.join(__dirname, 'src/index.backup.html');

const GA_ID = process.env.GA_MEASUREMENT_ID;
const ADS_ID = process.env.GA_ADS_ID;
const ZOHO_RID = process.env.ZOHO_RID;

// Backup de index.html antes de modificarlo
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(indexPath, backupPath);
  console.log('Backup de index.html creado.');
}

// Crear scripts dinámicos
let scripts = '';
if (ZOHO_RID) {
  scripts += `
<!-- Zoho form script -->
<script>
// Evitar que Zoho use document.write
document._write = document.write;
  document.write = function(content) {
    console.warn("Ignored Zoho document.write to prevent overwrite:", content);
    };
</script>
<script id='wf_script' src='https://bigin.zoho.com/crm/WebformScriptServlet?rid=${ZOHO_RID}'></script>`;
}
if (GA_ID) {
  scripts += `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>`;
}
if (ADS_ID) {
  scripts += `
<!-- Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ADS_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${ADS_ID}');
</script>`;
}


// Inyecta los scripts antes de </head>
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace('</head>', `${scripts}\n</head>`);
fs.writeFileSync(indexPath, indexContent);

console.log('Scripts de Google insertados en index.html');
