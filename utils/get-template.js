const getTemplate = ({ node, getNode, options }) => {
  if (node.frontmatter.template) {
    return node.frontmatter.template;
  }

  const { relativeDirectory } = getNode(node.parent);

  const directoryTemplate =
    options.directoryTemplates && options.directoryTemplates[relativeDirectory];

  if (directoryTemplate) {
    return directoryTemplate;
  }

  if (options.defaultTemplate) {
    return options.defaultTemplate;
  }

  return null;
};

module.exports = getTemplate;
