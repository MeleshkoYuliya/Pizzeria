class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);

    this.name = 'BadRequest';
    this.status = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);

    this.name = 'Unauthorized';
    this.status = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);

    this.name = "Forbidden";
    this.status = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);

    this.name = 'NotFound';
    this.status = 404;
  }
}

class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message);

    this.name = 'Conflict';
    this.status = 409;
  }
}

class UnprocessableEntityError extends Error {
  constructor(message = 'Unprocessable Entity', details = []) {
    super(message);

    this.details = details;
    this.name = 'UnprocessableEntity';
    this.status = 422;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
};