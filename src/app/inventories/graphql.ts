import { graphql } from "@/gql";

export const InventoryItemListingFragmentDocument = graphql(/* GraphQL */ `
  fragment InventoryItemListing on InventoryItem {
    name
    value
    displayValue
    quantity
    traits
    description
    bulk
    displayBulk
    level
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

export const inventoryWithItemsListingQueryDocument = graphql(`
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
