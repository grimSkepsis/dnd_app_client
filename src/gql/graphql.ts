/* eslint-disable */
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
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  traits?: Maybe<Array<Scalars['String']['output']>>;
  usageRequirements?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['ID']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type InventoryItemMutation = {
  __typename?: 'InventoryItemMutation';
  addOrRemoveItemsFromInventory: Scalars['Boolean']['output'];
};


export type InventoryItemMutationAddOrRemoveItemsFromInventoryArgs = {
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

export type InventoryQuery = {
  __typename?: 'InventoryQuery';
  getChracterInventory?: Maybe<Inventory>;
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
  getInventoryWithItemsByOwnerName?: Maybe<InventoryWithItems>;
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
  name: Scalars['String']['output'];
  traits?: Maybe<Array<Scalars['String']['output']>>;
  usageRequirements?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['ID']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type ItemQuery = {
  __typename?: 'ItemQuery';
  getItems?: Maybe<PaginatedItemResponse>;
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
  inventoryItems: InventoryItemMutation;
};

export type PaginatedInventoryItemResponse = {
  __typename?: 'PaginatedInventoryItemResponse';
  entities: Array<InventoryItem>;
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

export type ItemListingFragment = { __typename?: 'Item', uuid: string, name: string } & { ' $fragmentName'?: 'ItemListingFragment' };

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

export type AdjustItemsForInventoryMutationVariables = Exact<{
  inventoryId: Scalars['String']['input'];
  items: Array<InventoryItemQuantityAdjustmentParams> | InventoryItemQuantityAdjustmentParams;
}>;


export type AdjustItemsForInventoryMutation = { __typename?: 'MutationRoot', inventoryItems: { __typename?: 'InventoryItemMutation', addOrRemoveItemsFromInventory: boolean } };

export type InventoryItemListingFragment = { __typename?: 'InventoryItem', uuid: string, name: string, value?: number | null, displayValue?: string | null, quantity: number, traits?: Array<string> | null, description?: string | null, bulk?: number | null, displayBulk?: string | null, level?: number | null, isConsumable: boolean } & { ' $fragmentName'?: 'InventoryItemListingFragment' };

export type InventoryWithItemsListingFragment = { __typename?: 'InventoryWithItems', inventory: { __typename?: 'Inventory', uuid: string, name: string, cp: number, sp: number, gp: number, pp: number }, items: { __typename?: 'PaginatedInventoryItemResponse', pageIndex: number, pageSize: number, totalEntities: number, totalPages: number, entities: Array<(
      { __typename?: 'InventoryItem' }
      & { ' $fragmentRefs'?: { 'InventoryItemListingFragment': InventoryItemListingFragment } }
    )> } } & { ' $fragmentName'?: 'InventoryWithItemsListingFragment' };

export type InventoryWithItemsListingQueryVariables = Exact<{
  name: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  filter: ItemQueryFilter;
}>;


export type InventoryWithItemsListingQuery = { __typename?: 'QueryRoot', inventoryWithItems: { __typename?: 'InventoryWithItemsQuery', getInventoryWithItemsByOwnerName?: (
      { __typename?: 'InventoryWithItems' }
      & { ' $fragmentRefs'?: { 'InventoryWithItemsListingFragment': InventoryWithItemsListingFragment } }
    ) | null } };

export const ItemListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ItemListingFragment, unknown>;
export const InventoryItemListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<InventoryItemListingFragment, unknown>;
export const InventoryWithItemsListingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryWithItemsListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryWithItems"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}},{"kind":"Field","name":{"kind":"Name","value":"sp"}},{"kind":"Field","name":{"kind":"Name","value":"gp"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryItemListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}}]} as unknown as DocumentNode<InventoryWithItemsListingFragment, unknown>;
export const ItemsListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemsListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemQueryFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ItemsListingQuery, ItemsListingQueryVariables>;
export const AdjustItemsForInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adjustItemsForInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItemQuantityAdjustmentParams"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrRemoveItemsFromInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inventoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}]}]}}]}}]} as unknown as DocumentNode<AdjustItemsForInventoryMutation, AdjustItemsForInventoryMutationVariables>;
export const InventoryWithItemsListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"inventoryWithItemsListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemQueryFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryWithItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInventoryWithItemsByOwnerName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nameTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryWithItemsListing"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryItemListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"displayValue"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"displayBulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isConsumable"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryWithItemsListing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryWithItems"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}},{"kind":"Field","name":{"kind":"Name","value":"sp"}},{"kind":"Field","name":{"kind":"Name","value":"gp"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryItemListing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<InventoryWithItemsListingQuery, InventoryWithItemsListingQueryVariables>;