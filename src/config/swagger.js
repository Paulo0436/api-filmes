const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

// Carrega o arquivo swagger.yaml da raiz do projeto
const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));

module.exports = { swaggerUi, swaggerDocument };
