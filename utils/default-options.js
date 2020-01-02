const makePagePath = require(`./make-page-path`);
const getTemplate = require(`./get-template`);
const buildNodeId = require(`./build-node-id`);
const filterNode = require(`./filter-node`);

const defaultOptions = {
  typeName: `MdxContentPage`,
  filterNode,
  buildNodeId,
  makePagePath,
  getTemplate
};

const withDefaults = options => ({
  ...defaultOptions,
  ...options
});

module.exports = {
  defaultOptions,
  withDefaults
};
