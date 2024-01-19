class ApplicationError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message ||
      'Something went wrong. Please try again.';
    this.status = status || 500;
  }
}

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'The request could not be understood by the server due to malformed syntax.', 400);
  }
}

class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(message || 'The server understood the request, but is refusing to fulfill it.', 403);
  }
}

class ResourceNotFoundError extends ApplicationError {
  constructor(resource = 'resource') {
    super(`Resource - ${resource} not found.`, 404);
  }
}

class ServerError extends ApplicationError {
  constructor(message) {
    super(message || 'Unexpected server error', 500);
  }
}

class NotUniqueUserName extends ApplicationError {
  constructor(message) {
    super(message || 'This username is already exist', 409);
  }
}

class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'User with this username not found', 404);
  }
}

class TokenError extends ApplicationError {
  constructor(message) {
    super(message || 'Token error', 408);
  }
}

class RoleError extends ApplicationError {
  constructor(message) {
    super(message || 'You do not have permission', 403);
  }
}

module.exports = {
  ApplicationError,
  BadRequestError,
  ForbiddenError,
  ResourceNotFoundError,
  ServerError,
  NotUniqueUserName,
  UserNotFoundError,
  TokenError,
  RoleError
};