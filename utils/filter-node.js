const { fileChildMatches } = require(`./matchers`);

const filterNode = (
  { node, getNode },
  {
    includeSubdirectories = false,
    relativeDirectory = undefined,
    sourceInstanceName = undefined
  }
) => {
  const fileNode = getNode(node.parent);

  return fileChildMatches({
    fileNode,
    relativeDirectory,
    includeSubdirectories,
    sourceInstanceName
  });
};

module.exports = filterNode;
