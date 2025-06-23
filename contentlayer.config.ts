// contentlayer.config.ts
import { defineDocumentType, makeSource } from "@contentlayer/source-files"
import path from "path"

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "**/index.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    views: { type: "number", required: false }, // 追加した views もここに
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.sourceFileDir.split(path.sep).pop() ?? "",
    },
    image: {
      type: "string",
      resolve: (doc) => `/articles/${doc._raw.sourceFileDir}/001.jpg`,
    },
  },
}))

export default makeSource({
  contentDirPath: "src/articles",
  documentTypes: [Article],
})
