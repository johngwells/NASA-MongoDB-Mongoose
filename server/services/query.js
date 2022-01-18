const DEFAULT_PAGE_NUMBER = 1;
// returns all if limit is not set
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  // make positive values & convert string to number
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit
  };
}

module.exports = {
  getPagination
};
