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

export const ItemDetailsFragmentDocument = graphql(/* GraphQL */ `
  fragment ItemDetails on Item {
    uuid
    name
    value
    displayValue
    description
    activationCost
    usageRequirements
    effect
    traits
    description
    bulk
    displayBulk
    level
    isConsumable
  }
`);

export const ItemDetailsQueryDocument = graphql(`
  query itemDetails($id: String!) {
    items {
      getItem(id: $id) {
        ...ItemDetails
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

export const QuickCreateItemMutationDocument = graphql(`
  mutation quickCreateItem($name: String!) {
    items {
      createItem(params: { name: $name }) {
        name
      }
    }
  }
`);

export const UpdateItemMutationDocument = graphql(`
  mutation updateItem($id: String!, $params: ItemProperties!) {
    items {
      updateItem(itemUuid: $id, params: $params) {
        ...ItemDetails
      }
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
