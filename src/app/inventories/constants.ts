import { InventoryWithItems } from "@/gql/graphql";

export const DEFAULT_INVENTORY_DATA: InventoryWithItems = {
  __typename: "InventoryWithItems",
  inventory: {
    __typename: "Inventory",
    capacity: 0,
    cp: 0,
    sp: 0,
    gp: 0,
    pp: 0,
    uuid: "",
    name: "",
  },
  items: {
    __typename: "PaginatedResponse",
    entities: [],
    pageIndex: 0,
    pageSize: 0,
    totalEntities: 0,
    totalPages: 0,
  },
};
