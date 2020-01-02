const path = require("path");

const getTemplate = (
  { node, getNode },
  { directoryTemplates, defaultTemplate, templateDirectory }
) => {
  // If there's a frontmatter template, use that before doing anything else.
  if (node.frontmatter.template) {
    return path.join(templateDirectory, node.frontmatter.template);
  }

  // Otherwise, go into the deeper logic
  const { relativeDirectory } = getNode(node.parent);

  const templateKey =
    (directoryTemplates && directoryTemplates[relativeDirectory]) ||
    defaultTemplate;

  return path.join(templateDirectory, templateKey);
};

module.exports = getTemplate;
