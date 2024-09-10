// Middleware pour gérer les erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  };
  
  export default errorHandler;
  