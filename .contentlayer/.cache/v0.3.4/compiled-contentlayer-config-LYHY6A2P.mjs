// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import path from "path";
var Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `**/index.md`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split(path.sep).pop()
    },
    image: {
      type: "string",
      resolve: (doc) => `/articles/${doc._raw.sourceFileDir}/001.jpg`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/articles",
  documentTypes: [Article]
});
export {
  Article,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LYHY6A2P.mjs.map
