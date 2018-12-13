const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    info: {
      title: 'Weather-api', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Example API' // Description (optional)
    },
    schemes: ['http', 'https']
  },
  // Path to the API docs
  apis: [
    './src/swagger/definitions.yaml',
    './src/swagger/params.yaml',
    './src/swagger/responses.yaml',
    './src/routes/*.js'
  ]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
