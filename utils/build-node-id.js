const buildNodeId = ({ node, createNodeId }, options) =>
  createNodeId(`${node.id} >>> ${options.typeName}`);
module.exports = buildNodeId;
