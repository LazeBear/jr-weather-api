module.exports = (res, code, message, data) => {
  res.status(code).json({
    status: code,
    message,
    data
  });
};
