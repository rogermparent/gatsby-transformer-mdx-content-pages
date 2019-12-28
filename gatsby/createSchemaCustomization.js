const {
  parentPassthrough,
  parentResolverPassthrough
} = require(`gatsby-plugin-parent-resolvers`);

const contentPageInterface = require(`gatsby-interface-content-pages`);

const { withDefaults } = require("../utils/default-options");
const mdxPageInterface = require(`gatsby-interface-mdx-content-pages`);
const {
  interfaceName: contentPageInterfaceName
} = require(`gatsby-interface-content-pages`);

const createSchemaCustomization = ({ actions, schema }, pluginOptions) => {
  const { createTypes } = actions;
  const options = withDefaults(pluginOptions);

  const { typeName, adjustTypeDefinition } = options;

  const originalDefinition = {
    name: typeName,
    fields: {
      ...contentPageInterface.fields,
      frontmatter: {
        type: `MdxFrontmatter!`,
        resolve: parentPassthrough()
      },
      body: {
        type: `String!`,
        resolve: parentResolverPassthrough()
      }
    },
    interfaces: [`Node`, contentPageInterface.name, mdxPageInterface.name]
  };

  const typeDefinition = adjustTypeDefinition
    ? adjustTypeDefinition({
        originalDefinition,
        options
      })
    : originalDefinition;

  const type = schema.buildObjectType(typeDefinition);

  createTypes(type);
};

module.exports = createSchemaCustomization;
