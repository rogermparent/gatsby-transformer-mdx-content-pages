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

module.exports = {
  matchesInstanceName,
  matchesContentDirectory
};
