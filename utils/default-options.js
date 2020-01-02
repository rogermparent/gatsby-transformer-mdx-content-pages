const makePagePath = require(`./make-page-path`);
const getTemplate = require(`./get-template`);
const buildNodeId = require(`./build-node-id`);
const filterNode = require(`./filter-node`);

const defaultOptions = {
  typeName: `MdxContentPage`,
  filterNode,
  includeSubdirectories: false,
  relativeDirectory: undefined,
  sourceInstanceName: undefined,
  buildNodeId,
  makePagePath,
  basePath: `/`,
  indexName: `index`,
  getTemplate,
  templateDirectory: `src/templates`,
  directoryTemplates: {},
  defaultTemplate: `default`
};

const withDefaults = options => ({
  ...defaultOptions,
  ...options
});

module.exports = {
  defaultOptions,
  withDefaults
};
