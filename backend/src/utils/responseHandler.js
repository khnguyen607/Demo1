const successResponse = (res, data, message = "Success") => {
  res.status(200).json({ message, data });
};

const errorResponse = (res, error, code = 500) => {
  res.status(code).json({ error: error.message });
};

module.exports = { successResponse, errorResponse };
