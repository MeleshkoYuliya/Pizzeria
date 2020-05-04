
const { UnprocessableEntityError } = require('./errors');

const parseDetails = errors => Object.keys(errors).map(field => ({
  field: errors[field].path,
  message: errors[field].message
}));

const handleMongooseError = (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new UnprocessableEntityError('Has already been taken'));
  }

  if (error.name === 'ValidationError') {
    const errorDetails = parseDetails(error.errors);
    next(new UnprocessableEntityError(error.message, errorDetails));
  }

  next(error);
};

module.exports = {
  handleMongooseError,
}