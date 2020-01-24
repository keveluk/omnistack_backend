module.exports = function strToArray(text) {
  return text
    .toLowerCase()
    .split(",")
    .map(text => text.trim());
};
