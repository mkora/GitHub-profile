module.exports = (error, meta = {}) => {
  let message;
  try {
    const json = JSON.parse(error.message);
    message = (json && typeof json === 'object')
      ? json : { message: error.message };
  } catch (e) {
    message = { message: error.message };
  }
  return Object.assign({}, message, meta);
};
