const someEqual = (items, compareTo) =>
  Array.isArray(items)
    ? items.some(childSetting => someEqual(compareTo, childSetting))
    : compareTo === items;

const someStartWith = (items, compareTo) =>
  Array.isArray(items)
    ? items.some(childSetting => someStartWith(compareTo, childSetting))
    : compareTo.startsWith(items);

const matchesInstanceName = (instanceNameSetting, fileInstanceName) =>
  someEqual(instanceNameSetting, fileInstanceName);

const matchesContentDirectory = (
  contentDirectorySetting,
  fileContentDirectory,
  includeSubdirectories
) =>
  includeSubdirectories
    ? someStartWith(contentDirectorySetting, fileContentDirectory)
    : someEqual(contentDirectorySetting, fileContentDirectory);

const fileChildMatches = ({
  node,
  sourceInstanceName,
  relativeDirectory,
  includeSubdirectories,
  getNode,
  fileNode
}) => {
  const resolvedFileNode = fileNode || getNode(node.parent);

  if (
    sourceInstanceName !== undefined &&
    !matchesInstanceName(
      sourceInstanceName,
      fileNode.sourceInstanceName,
      includeSubdirectories
    )
  ) {
    return false;
  }
  if (
    relativeDirectory !== undefined &&
    !matchesContentDirectory(relativeDirectory, fileNode.relativeDirectory)
  ) {
    return false;
  }

  return true;
};

module.exports = {
  matchesInstanceName,
  matchesContentDirectory,
  fileChildMatches
};
