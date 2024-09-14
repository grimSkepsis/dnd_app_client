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
    "\n  fragment ItemListing on Item {\n    uuid\n    name\n  }\n": types.ItemListingFragmentDoc,
    "\n  query itemsListing(\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: ItemQueryFilter!\n  ) {\n    items {\n      getItems(\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        entities {\n          ...ItemListing\n        }\n        pageIndex\n        pageSize\n        totalEntities\n        totalPages\n      }\n    }\n  }\n": types.ItemsListingDocument,
    "\n  fragment ItemDetails on Item {\n    uuid\n    name\n    value\n    displayValue\n    description\n    activationCost\n    usageRequirements\n    effect\n    traits\n    description\n    bulk\n    displayBulk\n    level\n    isConsumable\n  }\n": types.ItemDetailsFragmentDoc,
    "\n  query itemDetails($id: String!) {\n    items {\n      getItem(id: $id) {\n        ...ItemDetails\n      }\n    }\n  }\n": types.ItemDetailsDocument,
    "\n  mutation adjustItemsForInventory(\n    $inventoryId: String!\n    $items: [InventoryItemQuantityAdjustmentParams!]!\n  ) {\n    inventoryItems {\n      addOrRemoveItemsFromInventory(inventoryId: $inventoryId, items: $items)\n    }\n  }\n": types.AdjustItemsForInventoryDocument,
    "\n  mutation quickCreateItem($name: String!) {\n    items {\n      createItem(params: { name: $name }) {\n        name\n      }\n    }\n  }\n": types.QuickCreateItemDocument,
    "\n  mutation updateItem($id: String!, $params: ItemProperties!) {\n    items {\n      updateItem(itemUuid: $id, params: $params) {\n        ...ItemDetails\n      }\n    }\n  }\n": types.UpdateItemDocument,
    "\n  fragment InventoryItemListing on InventoryItem {\n    uuid\n    name\n    value\n    displayValue\n    quantity\n    traits\n    description\n    bulk\n    displayBulk\n    level\n    isConsumable\n  }\n": types.InventoryItemListingFragmentDoc,
    "\n  fragment InventoryWithItemsListing on InventoryWithItems {\n    inventory {\n      uuid\n      name\n      cp\n      sp\n      gp\n      pp\n      cp\n    }\n    items {\n      entities {\n        ...InventoryItemListing\n      }\n      pageIndex\n      pageSize\n      totalEntities\n      totalPages\n    }\n  }\n": types.InventoryWithItemsListingFragmentDoc,
    "\n  query inventoryWithItemsListing(\n    $name: String!\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: ItemQueryFilter!\n  ) {\n    inventoryWithItems {\n      getInventoryWithItemsByOwnerName(\n        nameTerm: $name\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        ...InventoryWithItemsListing\n      }\n    }\n  }\n": types.InventoryWithItemsListingDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ItemListing on Item {\n    uuid\n    name\n  }\n"): (typeof documents)["\n  fragment ItemListing on Item {\n    uuid\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query itemsListing(\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: ItemQueryFilter!\n  ) {\n    items {\n      getItems(\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        entities {\n          ...ItemListing\n        }\n        pageIndex\n        pageSize\n        totalEntities\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query itemsListing(\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: ItemQueryFilter!\n  ) {\n    items {\n      getItems(\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        entities {\n          ...ItemListing\n        }\n        pageIndex\n        pageSize\n        totalEntities\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ItemDetails on Item {\n    uuid\n    name\n    value\n    displayValue\n    description\n    activationCost\n    usageRequirements\n    effect\n    traits\n    description\n    bulk\n    displayBulk\n    level\n    isConsumable\n  }\n"): (typeof documents)["\n  fragment ItemDetails on Item {\n    uuid\n    name\n    value\n    displayValue\n    description\n    activationCost\n    usageRequirements\n    effect\n    traits\n    description\n    bulk\n    displayBulk\n    level\n    isConsumable\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query itemDetails($id: String!) {\n    items {\n      getItem(id: $id) {\n        ...ItemDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query itemDetails($id: String!) {\n    items {\n      getItem(id: $id) {\n        ...ItemDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation adjustItemsForInventory(\n    $inventoryId: String!\n    $items: [InventoryItemQuantityAdjustmentParams!]!\n  ) {\n    inventoryItems {\n      addOrRemoveItemsFromInventory(inventoryId: $inventoryId, items: $items)\n    }\n  }\n"): (typeof documents)["\n  mutation adjustItemsForInventory(\n    $inventoryId: String!\n    $items: [InventoryItemQuantityAdjustmentParams!]!\n  ) {\n    inventoryItems {\n      addOrRemoveItemsFromInventory(inventoryId: $inventoryId, items: $items)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation quickCreateItem($name: String!) {\n    items {\n      createItem(params: { name: $name }) {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation quickCreateItem($name: String!) {\n    items {\n      createItem(params: { name: $name }) {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateItem($id: String!, $params: ItemProperties!) {\n    items {\n      updateItem(itemUuid: $id, params: $params) {\n        ...ItemDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateItem($id: String!, $params: ItemProperties!) {\n    items {\n      updateItem(itemUuid: $id, params: $params) {\n        ...ItemDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment InventoryItemListing on InventoryItem {\n    uuid\n    name\n    value\n    displayValue\n    quantity\n    traits\n    description\n    bulk\n    displayBulk\n    level\n    isConsumable\n  }\n"): (typeof documents)["\n  fragment InventoryItemListing on InventoryItem {\n    uuid\n    name\n    value\n    displayValue\n    quantity\n    traits\n    description\n    bulk\n    displayBulk\n    level\n    isConsumable\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment InventoryWithItemsListing on InventoryWithItems {\n    inventory {\n      uuid\n      name\n      cp\n      sp\n      gp\n      pp\n      cp\n    }\n    items {\n      entities {\n        ...InventoryItemListing\n      }\n      pageIndex\n      pageSize\n      totalEntities\n      totalPages\n    }\n  }\n"): (typeof documents)["\n  fragment InventoryWithItemsListing on InventoryWithItems {\n    inventory {\n      uuid\n      name\n      cp\n      sp\n      gp\n      pp\n      cp\n    }\n    items {\n      entities {\n        ...InventoryItemListing\n      }\n      pageIndex\n      pageSize\n      totalEntities\n      totalPages\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query inventoryWithItemsListing(\n    $name: String!\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: ItemQueryFilter!\n  ) {\n    inventoryWithItems {\n      getInventoryWithItemsByOwnerName(\n        nameTerm: $name\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        ...InventoryWithItemsListing\n      }\n    }\n  }\n"): (typeof documents)["\n  query inventoryWithItemsListing(\n    $name: String!\n    $pageIndex: Int!\n    $pageSize: Int!\n    $orderBy: String!\n    $orderDirection: String!\n    $filter: ItemQueryFilter!\n  ) {\n    inventoryWithItems {\n      getInventoryWithItemsByOwnerName(\n        nameTerm: $name\n        pageIndex: $pageIndex\n        pageSize: $pageSize\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n        filter: $filter\n      ) {\n        ...InventoryWithItemsListing\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;