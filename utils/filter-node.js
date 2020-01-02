const { fileChildMatches } = require(`./matchers`);

const filterNode = (
  { node, getNode },
  { relativeDirectory, sourceInstanceName, includeSubdirectories }
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
