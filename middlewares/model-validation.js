const validation = (schema) => {
  return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: true });
      const valid = error == null;

      if (valid) {
          next();
    
      } else {
          const { details } = error;
          const message = details.map(e => (e.message).replace("/",'')).join(',') ;
          return res.status(422).json({ message: message, data: {} });
      }
  }
}
module.exports = validation;