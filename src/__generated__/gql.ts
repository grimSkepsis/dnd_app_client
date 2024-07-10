/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getInventoryAndItems(\n    $name: String!\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: InventoryItemQueryFilter!\n  ) {\n    inventoryWithItems {\n      getInventoryWithItemsByOwnerName(\n        nameTerm: $name\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        inventory {\n          uuid\n          name\n          cp\n          sp\n          gp\n          pp\n          cp\n        }\n        items {\n          entities {\n            name\n            value\n            quantity\n            traits\n            description\n            bulk\n            level\n          }\n          pageIndex\n          pageSize\n          totalEntities\n          totalPages\n        }\n      }\n    }\n  }\n": types.GetInventoryAndItemsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getInventoryAndItems(\n    $name: String!\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: InventoryItemQueryFilter!\n  ) {\n    inventoryWithItems {\n      getInventoryWithItemsByOwnerName(\n        nameTerm: $name\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        inventory {\n          uuid\n          name\n          cp\n          sp\n          gp\n          pp\n          cp\n        }\n        items {\n          entities {\n            name\n            value\n            quantity\n            traits\n            description\n            bulk\n            level\n          }\n          pageIndex\n          pageSize\n          totalEntities\n          totalPages\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getInventoryAndItems(\n    $name: String!\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: InventoryItemQueryFilter!\n  ) {\n    inventoryWithItems {\n      getInventoryWithItemsByOwnerName(\n        nameTerm: $name\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        inventory {\n          uuid\n          name\n          cp\n          sp\n          gp\n          pp\n          cp\n        }\n        items {\n          entities {\n            name\n            value\n            quantity\n            traits\n            description\n            bulk\n            level\n          }\n          pageIndex\n          pageSize\n          totalEntities\n          totalPages\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;