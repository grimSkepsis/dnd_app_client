import { graphql } from "@/gql";
// import { gql } from "@apollo/client";

export const inventoryWithItemsQueryDocument = graphql(`
  query inventoryWithItemsQuery(
    $name: String!
    $pageIndex: Int!
    $pageSize: Int!
    $orderBy: String!
    $orderDirection: String!
    $filter: InventoryItemQueryFilter!
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
            name
            value
            quantity
            traits
            description
            bulk
            level
          }
          pageIndex
          pageSize
          totalEntities
          totalPages
        }
      }
    }
  }
`);
