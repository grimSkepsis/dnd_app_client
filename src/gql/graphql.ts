import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Inventory = {
  __typename?: 'Inventory';
  capacity: Scalars['Int']['output'];
  cp: Scalars['Int']['output'];
  gp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pp: Scalars['Int']['output'];
  sp: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type InventoryCurrencyChangeInput = {
  cp: Scalars['Int']['input'];
  gp: Scalars['Int']['input'];
  pp: Scalars['Int']['input'];
  sp: Scalars['Int']['input'];
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  activationCost?: Maybe<Scalars['String']['output']>;
  bulk?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayBulk?: Maybe<Scalars['String']['output']>;
  displayValue?: Maybe<Scalars['String']['output']>;
  effect?: Maybe<Scalars['String']['output']>;
  isConsumable: Scalars['Boolean']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  traits?: Maybe<Array<Scalars['String']['output']>>;
  usageRequirements?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['ID']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type InventoryItemMutation = {
  __typename?: 'InventoryItemMutation';
  addOrRemoveItemsFromInventory: Scalars['Boolean']['output'];
  sellItems: Scalars['Boolean']['output'];
};


export type InventoryItemMutationAddOrRemoveItemsFromInventoryArgs = {
  inventoryId: Scalars['String']['input'];
  items: Array<InventoryItemQuantityAdjustmentParams>;
};


export type InventoryItemMutationSellItemsArgs = {
  inventoryId: Scalars['String']['input'];
  items: Array<InventoryItemQuantityAdjustmentParams>;
};

export type InventoryItemQuantityAdjustmentParams = {
  itemId: Scalars['String']['input'];
  quantityChange: Scalars['Int']['input'];
};

export type InventoryItemQuery = {
  __typename?: 'InventoryItemQuery';
  getInventoryItems?: Maybe<PaginatedInventoryItemResponse>;
};


export type InventoryItemQueryGetInventoryItemsArgs = {
  filter: ItemQueryFilter;
  inventoryId: Scalars['String']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type InventoryMutation = {
  __typename?: 'InventoryMutation';
  updateInventoryCurrency?: Maybe<Inventory>;
};


export type InventoryMutationUpdateInventoryCurrencyArgs = {
  inventoryId: Scalars['String']['input'];
  params: InventoryCurrencyChangeInput;
};

export type InventoryQuery = {
  __typename?: 'InventoryQuery';
  getChracterInventory?: Maybe<Inventory>;
  getInventories: PaginatedInventoryResponse;
  getInventory?: Maybe<Inventory>;
  getInventoryByOwner?: Maybe<Inventory>;
  getInventoryByOwnerName?: Maybe<Inventory>;
};


export type InventoryQueryGetChracterInventoryArgs = {
  id: Scalars['String']['input'];
};


export type InventoryQueryGetInventoryArgs = {
  id: Scalars['String']['input'];
};


export type InventoryQueryGetInventoryByOwnerArgs = {
  id: Scalars['String']['input'];
};


export type InventoryQueryGetInventoryByOwnerNameArgs = {
  nameTerm: Scalars['String']['input'];
};

export type InventoryWithItems = {
  __typename?: 'InventoryWithItems';
  inventory: Inventory;
  items: PaginatedInventoryItemResponse;
};

export type InventoryWithItemsQuery = {
  __typename?: 'InventoryWithItemsQuery';
  getInventoryWithItemsById?: Maybe<InventoryWithItems>;
  getInventoryWithItemsByOwnerName?: Maybe<InventoryWithItems>;
};


export type InventoryWithItemsQueryGetInventoryWithItemsByIdArgs = {
  filter: ItemQueryFilter;
  id: Scalars['String']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type InventoryWithItemsQueryGetInventoryWithItemsByOwnerNameArgs = {
  filter: ItemQueryFilter;
  nameTerm: Scalars['String']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Item = {
  __typename?: 'Item';
  activationCost?: Maybe<Scalars['String']['output']>;
  bulk?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayBulk?: Maybe<Scalars['String']['output']>;
  displayValue?: Maybe<Scalars['String']['output']>;
  effect?: Maybe<Scalars['String']['output']>;
  isConsumable: Scalars['Boolean']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  traits?: Maybe<Array<Scalars['String']['output']>>;
  usageRequirements?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['ID']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type ItemMutation = {
  __typename?: 'ItemMutation';
  createItem?: Maybe<Item>;
  updateItem?: Maybe<Item>;
};


export type ItemMutationCreateItemArgs = {
  params: ItemProperties;
};


export type ItemMutationUpdateItemArgs = {
  itemUuid: Scalars['String']['input'];
  params: ItemProperties;
};

export type ItemProperties = {
  activationCost?: InputMaybe<Scalars['String']['input']>;
  bulk?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  effect?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  traits?: InputMaybe<Array<Scalars['String']['input']>>;
  usageRequirements?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemQuery = {
  __typename?: 'ItemQuery';
  getItem?: Maybe<Item>;
  getItems?: Maybe<PaginatedItemResponse>;
  getTraits: Array<Trait>;
};


export type ItemQueryGetItemArgs = {
  id: Scalars['String']['input'];
};


export type ItemQueryGetItemsArgs = {
  filter: ItemQueryFilter;
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type ItemQueryFilter = {
  excludedTraits?: InputMaybe<Array<Scalars['String']['input']>>;
  includedTraits?: InputMaybe<Array<Scalars['String']['input']>>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  inventory: InventoryMutation;
  inventoryItems: InventoryItemMutation;
  items: ItemMutation;
};

export type PaginatedInventoryItemResponse = {
  __typename?: 'PaginatedInventoryItemResponse';
  entities: Array<InventoryItem>;
  pageIndex: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalEntities: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedInventoryResponse = {
  __typename?: 'PaginatedInventoryResponse';
  entities: Array<Inventory>;
  pageIndex: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalEntities: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedItemResponse = {
  __typename?: 'PaginatedItemResponse';
  entities: Array<Item>;
  pageIndex: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalEntities: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  inventory: InventoryQuery;
  inventoryItems: InventoryItemQuery;
  inventoryWithItems: InventoryWithItemsQuery;
  items: ItemQuery;
};

export type Trait = {
  __typename?: 'Trait';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type ItemListingFragment = { __typename?: 'Item', uuid: string, name?: string | null } & { ' $fragmentName'?: 'ItemListingFragment' };

export type ItemsListingQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  filter: ItemQueryFilter;
}>;


export type ItemsListingQuery = { __typename?: 'QueryRoot', items: { __typename?: 'ItemQuery', getItems?: { __typename?: 'PaginatedItemResponse', pageIndex: number, pageSize: number, totalEntities: number, totalPages: number, entities: Array<(
        { __typename?: 'Item' }
        & { ' $fragmentRefs'?: { 'ItemListingFragment': ItemListingFragment } }
      )> } | null } };

export type ItemDetailsFragment = { __typename?: 'Item', uuid: string, name?: string | null, value?: number | null, displayValue?: string | null, description?: string | null, activationCost?: string | null, usageRequirements?: string | null, effect?: string | null, traits?: Array<string> | null, bulk?: number | null, displayBulk?: string | null, level?: number | null, isConsumable: boolean } & { ' $fragmentName'?: 'ItemDetailsFragment' };

export type ItemDetailsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ItemDetailsQuery = { __typename?: 'QueryRoot', items: { __typename?: 'ItemQuery', getItem?: (
      { __typename?: 'Item' }
      & { ' $fragmentRefs'?: { 'ItemDetailsFragment': ItemDetailsFragment } }
    ) | null } };

export type AdjustItemsForInventoryMutationVariables = Exact<{
  inventoryId: Scalars['String']['input'];
  items: Array<InventoryItemQuantityAdjustmentParams> | InventoryItemQuantityAdjustmentParams;
}>;


export type AdjustItemsForInventoryMutation = { __typename?: 'MutationRoot', inventoryItems: { __typename?: 'InventoryItemMutation', addOrRemoveItemsFromInventory: boolean } };

export type SellItemsForInventoryMutationVariables = Exact<{
  inventoryId: Scalars['String']['input'];
  items: Array<InventoryItemQuantityAdjustmentParams> | InventoryItemQuantityAdjustmentParams;
}>;


export type SellItemsForInventoryMutation = { __typename?: 'MutationRoot', inventoryItems: { __typename?: 'InventoryItemMutation', sellItems: boolean } };

export type QuickCreateItemMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type QuickCreateItemMutation = { __typename?: 'MutationRoot', items: { __typename?: 'ItemMutation', createItem?: { __typename?: 'Item', name?: string | null } | null } };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
  params: ItemProperties;
}>;


export type UpdateItemMutation = { __typename?: 'MutationRoot', items: { __typename?: 'ItemMutation', updateItem?: (
      { __typename?: 'Item' }
      & { ' $fragmentRefs'?: { 'ItemDetailsFragment': ItemDetailsFragment } }
    ) | null } };

export type InventoryItemListingFragment = { __typename?: 'InventoryItem', uuid: string, name?: string | null, value?: number | null, displayValue?: string | null, quantity: number, traits?: Array<string> | null, description?: string | null, bulk?: number | null, displayBulk?: string | null, level?: number | null, isConsumable: boolean } & { ' $fragmentName'?: 'InventoryItemListingFragment' };

export type InventoryWithItemsListingFragment = { __typename?: 'InventoryWithItems', inventory: { __typename?: 'Inventory', uuid: string, name: string, cp: number, sp: number, gp: number, pp: number }, items: { __typename?: 'PaginatedInventoryItemResponse', pageIndex: number, pageSize: number, totalEntities: number, totalPages: number, entities: Array<(
      { __typename?: 'InventoryItem' }
      & { ' $fragmentRefs'?: { 'InventoryItemListingFragment': InventoryItemListingFragment } }
    )> } } & { ' $fragmentName'?: 'InventoryWithItemsListingFragment' };

export type InventoryWithItemsListingQueryVariables = Exact<{
  id: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  filter: ItemQueryFilter;
}>;


export type InventoryWithItemsListingQuery = { __typename?: 'QueryRoot', inventoryWithItems: { __typename?: 'InventoryWithItemsQuery', getInventoryWithItemsById?: (
      { __typename?: 'InventoryWithItems' }
      & { ' $fragmentRefs'?: { 'InventoryWithItemsListingFragment': InventoryWithItemsListingFragment } }
    ) | null } };

export type UpdateInventoryCurrencyMutationVariables = Exact<{
  inventoryId: Scalars['String']['input'];
  params: InventoryCurrencyChangeInput;
}>;


export type UpdateInventoryCurrencyMutation = { __typename?: 'MutationRoot', inventory: { __typename?: 'InventoryMutation', updateInventoryCurrency?: { __typename?: 'Inventory', uuid: string, name: string, cp: number, sp: number, gp: number, pp: number } | null } };

export type InventoryListingFragment = { __typename?: 'Inventory', uuid: string, name: string } & { ' $fragmentName'?: 'InventoryListingFragment' };

export type InventoryListingQueryVariables = Exact<{ [key: string]: never; }>;


export type InventoryListingQuery = { __typename?: 'QueryRoot', inventory: { __typename?: 'InventoryQuery', getInventories: { __typename?: 'PaginatedInventoryResponse', pageIndex: number, pageSize: number, totalEntities: number, totalPages: number, entities: Array<(
        { __typename?: 'Inventory' }
        & { ' $fragmentRefs'?: { 'InventoryListingFragment': InventoryListingFragment } }
      )> } } };

export type TraitListingFragment = { __typename?: 'Trait', name: string, description?: string | null } & { ' $fragmentName'?: 'TraitListingFragment' };

export type TraitListingQueryVariables = Exact<{ [key: string]: never; }>;


export type TraitListingQuery = { __typename?: 'QueryRoot', items: { __typename?: 'ItemQuery', getTraits: Array<(
      { __typename?: 'Trait' }
      & { ' $fragmentRefs'?: { 'TraitListingFragment': TraitListingFragment } }
    )> } };

export const ItemListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ItemListingFragment, unknown>;
export const ItemDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"activationCost"}},{"kind":"Field","name":{"kind":"Name","value":"usageRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<ItemDetailsFragment, unknown>;
export const InventoryItemListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<InventoryItemListingFragment, unknown>;
export const InventoryWithItemsListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryWithItemsListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryWithItems"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}},{"kind":"Field","name":{"kind":"Name","value":"sp"}},{"kind":"Field","name":{"kind":"Name","value":"gp"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryItemListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<InventoryWithItemsListingFragment, unknown>;
export const InventoryListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Inventory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<InventoryListingFragment, unknown>;
export const TraitListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TraitListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Trait"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<TraitListingFragment, unknown>;
export const ItemsListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemsListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemQueryFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ItemsListingQuery, ItemsListingQueryVariables>;
export const ItemDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"activationCost"}},{"kind":"Field","name":{"kind":"Name","value":"usageRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<ItemDetailsQuery, ItemDetailsQueryVariables>;
export const AdjustItemsForInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adjustItemsForInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItemQuantityAdjustmentParams"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrRemoveItemsFromInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inventoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}]}]}}]}}]} as unknown as DocumentNode<AdjustItemsForInventoryMutation, AdjustItemsForInventoryMutationVariables>;
export const SellItemsForInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sellItemsForInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItemQuantityAdjustmentParams"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sellItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inventoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}]}]}}]}}]} as unknown as DocumentNode<SellItemsForInventoryMutation, SellItemsForInventoryMutationVariables>;
export const QuickCreateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"quickCreateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<QuickCreateItemMutation, QuickCreateItemMutationVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemProperties"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"activationCost"}},{"kind":"Field","name":{"kind":"Name","value":"usageRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;
export const InventoryWithItemsListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"inventoryWithItemsListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemQueryFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryWithItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInventoryWithItemsById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryWithItemsListing"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryWithItemsListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryWithItems"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}},{"kind":"Field","name":{"kind":"Name","value":"sp"}},{"kind":"Field","name":{"kind":"Name","value":"gp"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryItemListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<InventoryWithItemsListingQuery, InventoryWithItemsListingQueryVariables>;
export const UpdateInventoryCurrencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInventoryCurrency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryCurrencyChangeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInventoryCurrency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inventoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}},{"kind":"Field","name":{"kind":"Name","value":"sp"}},{"kind":"Field","name":{"kind":"Name","value":"gp"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInventoryCurrencyMutation, UpdateInventoryCurrencyMutationVariables>;
export const InventoryListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"inventoryListing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Inventory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<InventoryListingQuery, InventoryListingQueryVariables>;
export const TraitListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"traitListing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTraits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TraitListing"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TraitListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Trait"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<TraitListingQuery, TraitListingQueryVariables>;