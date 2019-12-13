const path = require("path");
const joinPath = parts => path.posix.join("/", ...parts.filter(Boolean));

const makePagePath = ({ node, getNode, options: { basePath = "/", indexName = "index" } }) => {
  if (node.frontmatter.slug) {
    const { relativeDirectory } = getNode(node.parent);
    if (path.isAbsolute(node.frontmatter.slug)) {
      return joinPath([basePath, node.frontmatter.slug]);
    } else {
      return joinPath([basePath, relativeDirectory, node.frontmatter.slug]);
    }
  } else {
    // otherwise use the filepath function from gatsby-source-filesystem
    const { relativeDirectory, name } = getNode(node.parent);
    return joinPath([basePath, relativeDirectory, name === indexName ? "/" : name]);
  }
};

module.exports = makePagePath;
