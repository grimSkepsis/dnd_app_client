import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3002/graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;

// import type { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:3001",
//   documents: "src/**/*.tsx",
//   generates: {
//     "src/gql/": {
//       preset: "client",
//       plugins: [],
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"],
//     },
//   },
// };

// export default config;
