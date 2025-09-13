const errorHandler = (err, req, res, next) => {
  if(res.statusCode === 200) { 
    if(err.status || err.statusCode) {
      res.status(err.status || err.statusCode);
    } else {
      res.status(500);
    }
  }
  
  res.json({ message: err.message });
};

module.exports = errorHandler;