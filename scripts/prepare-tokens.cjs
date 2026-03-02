// scripts/prepare-tokens.cjs
const fs = require('fs');
const path = require('path');

// Carga los JSON exportados desde Figma
const brand = require('../src/tokens/brand.json');
const alias = require('../src/tokens/alias.json');

// Combinar Brand + Alias
const combined = {
  color: {
    brand: brand.Color || {},        // tus colores de Brand
    semantic: alias.Colors || {}      // tus tokens semánticos de Alias
  }
};

// Guardar en build/tokens-for-style-dict.json
fs.writeFileSync(
  path.join(__dirname, '../build/tokens-for-style-dict.json'),
  JSON.stringify(combined, null, 2)
);

console.log('✅ Tokens combinados generados en build/tokens-for-style-dict.json');