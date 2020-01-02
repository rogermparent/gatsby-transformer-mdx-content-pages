const { withDefaults } = require("../utils/default-options");
const buildMdxContentPageNode = require(`../utils/build-mdx-content-page-node`);
const path = require(`path`);

const onCreateNode = async (
  { node, actions, getNode, createNodeId },
  pluginOptions
) => {
  const options = withDefaults(pluginOptions);
  const {
    // Options
    sourceInstanceName,
    contentDirectory,
    includeSubdirectories,
    defaultTemplate,
    templateDirectory,
    // Overridable functions
    getTemplate,
    makePagePath,
    buildNodeId,
    filterNode,
    adjustFieldData,
    // Schema customization
    typeName,
    additionalFields
  } = options;

  const { createNode, createParentChildLink } = actions;

  // Only process Mdx nodes
  if (node.internal.type !== `Mdx`) return;

  // Bail out early if this node doesn't pass the filter
  if (!filterNode({ node, getNode }, options)) return;

  const fileNode = getNode(node.parent);

  const pagePath = makePagePath({ node, getNode }, options);

  const template = getTemplate({ node, getNode }, options) || "";

  const originalFieldData = {
    id: buildNodeId({ node, createNodeId }, options),
    parent: node.id,
    pagePath,
    template,
    sourceInstanceName: fileNode.sourceInstanceName,
    relativeDirectory: fileNode.relativeDirectory,
    source___NODE: node.id
  };

  const fieldData = adjustFieldData
    ? adjustFieldData({
        node,
        getNode,
        originalFieldData,
        options
      })
    : originalFieldData;

  const contentPageNode = buildMdxContentPageNode({
    typeName,
    fieldData
  });

  await createNode(contentPageNode);
  createParentChildLink({ parent: node, child: contentPageNode });
};

module.exports = onCreateNode;
