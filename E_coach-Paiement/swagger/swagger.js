import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Clean Architecture API',
      version: '1.0.0',
    },
  },
  apis: ['./interfaces/api/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerUi.serve(swaggerSpec);