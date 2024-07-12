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
  activationCost: Scalars['String']['output'];
  bulk: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  effect: Scalars['String']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  traits: Array<Scalars['String']['output']>;
  usageRequirements: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
  value: Scalars['Int']['output'];
};

export type InventoryItemQuery = {
  __typename?: 'InventoryItemQuery';
  getInventoryItems?: Maybe<PaginatedResponse>;
};


export type InventoryItemQueryGetInventoryItemsArgs = {
  filter: InventoryItemQueryFilter;
  inventoryId: Scalars['String']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type InventoryItemQueryFilter = {
  excludedTraits?: InputMaybe<Array<Scalars['String']['input']>>;
  includedTraits?: InputMaybe<Array<Scalars['String']['input']>>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
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
  items: PaginatedResponse;
};

export type InventoryWithItemsQuery = {
  __typename?: 'InventoryWithItemsQuery';
  getInventoryWithItemsByOwnerName?: Maybe<InventoryWithItems>;
};


export type InventoryWithItemsQueryGetInventoryWithItemsByOwnerNameArgs = {
  filter: InventoryItemQueryFilter;
  nameTerm: Scalars['String']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type PaginatedResponse = {
  __typename?: 'PaginatedResponse';
  entities: Array<InventoryItem>;
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
};

export type InventoryWithItemsQueryQueryVariables = Exact<{
  name: Scalars['String']['input'];
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
  orderDirection: Scalars['String']['input'];
  filter: InventoryItemQueryFilter;
}>;


export type InventoryWithItemsQueryQuery = { __typename?: 'QueryRoot', inventoryWithItems: { __typename?: 'InventoryWithItemsQuery', getInventoryWithItemsByOwnerName?: { __typename?: 'InventoryWithItems', inventory: { __typename?: 'Inventory', uuid: string, name: string, cp: number, sp: number, gp: number, pp: number }, items: { __typename?: 'PaginatedResponse', pageIndex: number, pageSize: number, totalEntities: number, totalPages: number, entities: Array<{ __typename?: 'InventoryItem', name: string, value: number, quantity: number, traits: Array<string>, description: string, bulk: number, level: number }> } } | null } };


export const InventoryWithItemsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"inventoryWithItemsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryItemQueryFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryWithItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInventoryWithItemsByOwnerName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nameTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}},{"kind":"Field","name":{"kind":"Name","value":"sp"}},{"kind":"Field","name":{"kind":"Name","value":"gp"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"cp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"traits"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bulk"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalEntities"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]}}]} as unknown as DocumentNode<InventoryWithItemsQueryQuery, InventoryWithItemsQueryQueryVariables>;