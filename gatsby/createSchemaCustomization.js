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

  const { additionalFields, typeName } = options;

  const type = schema.buildObjectType({
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
      },
      ...additionalFields
    },
    interfaces: [`Node`, contentPageInterface.name, mdxPageInterface.name]
  });

  createTypes(type);
};

module.exports = createSchemaCustomization;
