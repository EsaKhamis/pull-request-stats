const table = require('markdown-table');
const calculateBests = require('./calculateBests');
const getTableData = require('./getTableData');
const toTableArray = require('./toTableArray');

module.exports = ({
  reviewers,
  disableLinks,
  displayCharts,
  core,
}) => {
  const execute = () => {
    const allStats = reviewers.map((r) => r.stats);
    const bests = calculateBests(allStats);
    core.debug(allStats);
    const tableData = getTableData({
      bests,
      reviewers,
      disableLinks,
      displayCharts,
      core,
    });

    return table(toTableArray(tableData));
  };

  return execute();
};
