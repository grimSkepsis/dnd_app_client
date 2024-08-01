import { graphql } from "@/gql";

export const ItemListingFragmentDocument = graphql(/* GraphQL */ `
  fragment ItemListing on Item {
    uuid
    name
  }
`);

export const ItemsListingQueryDocument = graphql(`
  query itemsListing(
    $pageIndex: Int!
    $pageSize: Int!
    $orderBy: String!
    $orderDirection: String!
    $filter: ItemQueryFilter!
  ) {
    items {
      getItems(
        pageIndex: $pageIndex
        pageSize: $pageSize
        orderBy: $orderBy
        orderDirection: $orderDirection
        filter: $filter
      ) {
        entities {
          ...ItemListing
        }
        pageIndex
        pageSize
        totalEntities
        totalPages
      }
    }
  }
`);

export const AdjustItemQuantityMutationDocument = graphql(`
  mutation adjustItemsForInventory(
    $inventoryId: String!
    $items: [InventoryItemQuantityAdjustmentParams!]!
  ) {
    inventoryItems {
      addOrRemoveItemsFromInventory(inventoryId: $inventoryId, items: $items)
    }
  }
`);

export const InventoryItemListingFragmentDocument = graphql(/* GraphQL */ `
  fragment InventoryItemListing on InventoryItem {
    uuid
    name
    value
    displayValue
    quantity
    traits
    description
    bulk
    displayBulk
    level
    isConsumable
  }
`);

export const InventoryWithItemsListingFragment = graphql(/* GraphQL */ `
  fragment InventoryWithItemsListing on InventoryWithItems {
    inventory {
      uuid
      name
      cp
      sp
      gp
      pp
      cp
    }
    items {
      entities {
        ...InventoryItemListing
      }
      pageIndex
      pageSize
      totalEntities
      totalPages
    }
  }
`);

export const InventoryWithItemsListingQueryDocument = graphql(`
  query inventoryWithItemsListing(
    $name: String!
    $pageIndex: Int!
    $pageSize: Int!
    $orderBy: String!
    $orderDirection: String!
    $filter: ItemQueryFilter!
  ) {
    inventoryWithItems {
      getInventoryWithItemsByOwnerName(
        nameTerm: $name
        pageIndex: $pageIndex
        pageSize: $pageSize
        orderBy: $orderBy
        orderDirection: $orderDirection
        filter: $filter
      ) {
        ...InventoryWithItemsListing
      }
    }
  }
`);
