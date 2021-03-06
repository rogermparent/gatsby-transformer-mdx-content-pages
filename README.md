# Gatsby Transformer: MDX Content Pages

This plugin serves as the basic building block for any MDX powered website-
pages generated from 1-to-1 relationships with MDX files. Beyond that, the
plugin offers a few APIs that allow for extending these pages with whatever
functionality you may need- as such, the plugin alone supplies the bare minimum
for creating pages.

## How to Use

There are many ways to use this plugin, and it's made such that you can use as much or as little functionality as you'd like.

### No options

This method is only useful for the most basic sites, but it's here if you want it.

```javascript
plugins: [
  `gatsby-transformer-mdx-content-pages`
]
```

This will process all MDX files into `ContentPage`-inheriting nodes called `MDXContentPage`.  
You can query for these in `createPages` to make site pages yourself, or have a plugin like `gatsby-plugin-create-content-pages` do it for you.

Before your site will work, you'll have to make template files in the template directory. This is `src/templates` by default.

### Basic options

You may also use the default logic on only certain MDX nodes depending on the files they come from, or change where the plugin looks for templates.

```javascript
plugins: [
  {
    resolve: `gatsby-transformer-mdx-content-pages`,
    options: {
      relativeDirectory: `pages`,
      sourceInstanceName: `content`,
      templateDirectory: `src/components`,
      defaultTemplate: `page`
    }
  }
]
```

The options in this example will make this instance of the plugin operate only
on files retrieved from an instance of `gatsby-source-filesystem` with the
`name` "content", in the directory `pages` relative to that instance's root.  
Leaving either `relativeDirectory` or `sourceInstanceName` out will mean those
filters will not be run, letting you filter on only one of the conditions.  
Leaving both out means no filters will be run, meaning all MDX nodes will be
used.

`templateDirectory` is the directory the plugin will search for page components,
relative to the project root.  
It's `src/templates` by default. If you want to look in another directory, like
`src/components`, you can specify it in this option.

In the default `getTemplate` function, MDX nodes without a template specified in
frontmatter will use the component named `default` in the template directory.  
The `defaultTemplate` option changes this behavior specifically, allowing you to 
default to another filename like `page`.

### Advanced options

In the case of situations where you want specialized logic in how page paths and
templates are resolved, or you want to filter which nodes are made in a
completely different way from the usual, there are options available to override
the internal functions used for these purposes.

This feature is also mandatory if your MDX nodes are coming from somewhere other
than `gatsby-source-filesystem`.

```javascript
const alternatePagePathMaker = require('./page-path-maker')

plugins: [
  {
    resolve: `gatsby-transformer-mdx-content-pages`,
    options: {
      getTemplate: ({node, getNode}, options) => ([...]),
      filterNode: ({node, getNode}, options) => ([...]),
      makePagePath: alternatePagePathMaker,
    }
  }
]
```

## Options

### typeName: String = "MdxContentPage"

This is the type name used for nodes generated by this plugin.

It's reused in multiple places, so make sure to set it here over anywhere else.

### filterNode: Function

This function is used to determine which MDX nodes to act on.

If the return value is `true`, the node will be processed. Otherwise, it will be
skipped.

The default function assumes the parent node is a `File`, and filters using
`relativeDirectory` and `fileNode`. When neither is specified, all MDX nodes
will be processed.

#### Options used by the default function

##### sourceInstanceName: String | Array<String>

When specified, this instance of the plugin will only act on nodes whose parent
`File` is generated by an instance of `gatsby-source-filesystem` with a matching
`name` setting.

An array can also be specified to match multiple instances.

##### relativeDirectory: String | Array<String>

When specified, this instance of the plugin will only act on nodes whose parent
`File`s have a relative directory matching this string.

An array can also be specified to match multiple directories.

##### includeSubdirectories: Boolean = false

When set to true, MDX files with a source directory that's within the specified
relative directory will also be processed by the plugin.

### makePagePath: Function

This option allows you to override the function that generates paths that pages
will be written to.

It receives two arguments:

 - `{node, getNode}`: an object containing the MDX node and Gatsby's `getNode`
   function so that we can reach into other related nodes, like the `File`
   parent.
 
 - `options`: All the options provided to the plugin are shared with this
   function.
 
#### Options used by the default function

##### basePath: String = "/"

This string is prepended to all pages made by the default `makePagePath` function.

##### indexName: String = "index"

When a page doesn't have a defined slug and its filename (without the extension)
matches this string, the resulting path is set to the parent directory.

Essentially, this emulates the behavior of `index.html` in a standard web
server.

### getTemplate: Function

This option allows you to override the function that determines which template
each page will use.

The default attempts to use a template specified in frontmatter, then tries a
directory-specific template from `directoryTemplates`, and finally falls back to
the `defaultTemplate` option.

It receives two arguments:

 - `{node, getNode}`: an object containing the MDX node and Gatsby's `getNode`
   function so that we can reach into other related nodes, like the `File`
   parent.
 
 - `options`: All the options provided to the plugin are shared with this
   function.
 
#### Options used by the default function

##### templateDirectory: String = "src/templates"

This string represents the directory that templates are stored.  
It is prepended to all templates, including the default.

##### directoryTemplates: Object<String, String>

When the given MDX node doesn't specify a template in frontmatter, the parent
`File`'s relative directory is used on this object and, if there's a value
there, that value is used as the template.

##### defaultTemplate: String

If no frontmatter template is specified and there's no matching directory
template, this string will be used as the page's template.

### buildNodeId: Function

This option allows you to override how node's IDs are made in `onCreateNode`.
There isn't much point to it, but it's there if you need it.

It receives two arguments:

 - `{node, createNodeId}`: an object containing the MDX node and Gatsby's `createNodeId`
   function that hashes the input to make an ID.
 
 - `options`: All the options provided to the plugin are shared with this
   function.

The default function is essentially the template string `${node.id} >>> ${options.typeName}` 
wrapped in `createNodeId`. This should be sufficient for any purpose.
