module.exports = (res, code, message, data) => {
  res.status(code).send({
    status: code,
    message,
    data
  });
};
