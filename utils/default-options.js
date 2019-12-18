const makePagePath = require(`./make-page-path`);
const getTemplate = require(`./get-template`);
const buildNodeId = childNode => `${childNode.id} >>> ContentPage`;

const defaultOptions = {
  basePath: `/`,
  indexName: `index`,
  includeSubdirectories: false,
  makePagePath,
  getTemplate,
  typeName: `MdxContentPage`,
  nodeFields: {},
  buildNodeId,
  templateDirectory: `src/templates`,
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
