const crypto = require(`crypto`);
const buildMdxContentPageNode = ({
  fieldData,
  typeName = `MdxContentPage`
}) => ({
  ...fieldData,
  // Required fields.
  children: [],
  internal: {
    type: typeName,
    contentDigest: crypto
      .createHash(`md5`)
      .update(JSON.stringify(fieldData))
      .digest(`hex`),
    content: JSON.stringify(fieldData),
    description: `Mdx implementation of the ContentPage interface`
  }
});

module.exports = buildMdxContentPageNode;
