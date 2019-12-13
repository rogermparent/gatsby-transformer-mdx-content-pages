const crypto = require(`crypto`);
const {
  parentPassthrough,
  parentResolverPassthrough
} = require(`gatsby-plugin-parent-resolvers`);

const { matchesInstanceName, matchesContentDirectory } = require(`./utils/matchers`);
const makePagePath = require(`./utils/make-page-path`)
const getTemplate = require(`./utils/get-template`)

const defaultOptions = {
  basePath: `/`,
  indexName: `index`,
  includeSubdirectories: false,
  makePagePath,
  getTemplate
};

const withDefaults = options => ({
  ...defaultOptions,
  options
});

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(
    schema.buildObjectType({
      name: `MdxContentPage`,
      fields: {
        id: { type: `ID!` },
        pagePath: {
          type: `String!`
        },
        template: {
          type: `String`
        },
        frontmatter: {
          type: `MdxFrontmatter!`,
          resolve: parentPassthrough()
        },
        body: {
          type: `String!`,
          resolve: parentResolverPassthrough()
        }
      },
      interfaces: [`Node`, `ContentPage`]
    })
  );
};

exports.onCreateNode = async (
  { node, actions, getNode, createNodeId },
  pluginOptions
) => {
  const options = withDefaults(pluginOptions);
  const {
    sourceInstanceName,
    contentDirectory,
    includeSubdirectories,

    getTemplate,
    makePagePath
  } = options;

  const { createNode, createParentChildLink } = actions;

  // Only process Mdx nodes
  if (node.internal.type !== `Mdx`) {
    return;
  }

  const fileNode = getNode(node.parent);

  // Bail out early if we don't meet the provided limitations
  if (
    (sourceInstanceName &&
      !matchesInstanceName(sourceInstanceName, fileNode.sourceInstanceName)) ||
    (contentDirectory &&
      !matchesContentDirectory(
        contentDirectory,
        fileNode.relativeDirectory,
        includeSubdirectories
      ))
  )
    return;

  const pagePath = makePagePath({ node, getNode, options });

  const fieldData = {
    pagePath,
    template: getTemplate({ node, getNode, options }),
    source___NODE: node.id
  };

  const contentPageId = createNodeId(`${node.id} >>> ContentPage`);
  await createNode({
    ...fieldData,
    // Required fields.
    id: contentPageId,
    parent: node.id,
    children: [],
    internal: {
      type: `MdxContentPage`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData),
      description: `Mdx implementation of the ContentPage interface`
    }
  });
  createParentChildLink({ parent: node, child: getNode(contentPageId) });
};
