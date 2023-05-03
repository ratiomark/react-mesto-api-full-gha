class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static Unauthorized(message = 'У вас нет доступа') {
    return new ApiError(401, message);
  }

  static NotFound(message = 'Данные не найдеты') {
    return new ApiError(404, message);
  }

  static Conflict(message = 'Пользователь с таким имейлом уже существует') {
    return new ApiError(409, message);
  }

  static BadRequest(message = 'Предоставьте корректные данные') {
    return new ApiError(400, message);
  }

  static Forbidden(message = 'Доступ запрещен, эти не ваши данные') {
    return new ApiError(403, message);
  }
}

module.exports = { ApiError };
