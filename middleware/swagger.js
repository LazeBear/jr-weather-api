const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    info: {
      title: 'Hello World', // Title (required)
      version: '1.0.0' // Version (required)
    },
    schemes: ['http', 'https']
  },
  // Path to the API docs
  apis: ['./routes/*.js']
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
