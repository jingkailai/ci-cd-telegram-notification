function is_blank(param) {
  if (!param === null || param === "" || param === undefined) {
    return true;
  } else {
    return false;
  }
}

function is_number(param) {
  return !isNaN(param); // isNaN returns true if param is not a number
}
function matches_pattern(string, pattern) { }

module.exports = {
  is_blank: is_blank,
};  