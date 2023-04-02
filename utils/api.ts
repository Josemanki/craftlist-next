import axios from 'axios';
import { ExtendedItem, SearchItem } from '../types';
import {
  SINGLE_CONSUMABLE_ENDPOINT,
  SINGLE_ITEM_ENDPOINT,
  SINGLE_RESOURCE_ENDPOINT,
} from './constants';

// Decides what endpoint to call when generating resource list on card/resource table
export const getResourceById = async (resourceId: number, itemType: string) => {
  let result;
  switch (itemType) {
    case 'resources':
      result = await axios.get(`${SINGLE_RESOURCE_ENDPOINT}${resourceId}`);
      break;
    case 'consumables':
      result = await axios.get(`${SINGLE_CONSUMABLE_ENDPOINT}${resourceId}`);
      break;
    case 'equipment':
      result = await axios.get(`${SINGLE_ITEM_ENDPOINT}${resourceId}`);
      break;

    default:
      break;
  }
  return result;
};

export const searchApi = async (
  searchEndpoint: string,
  searchValue: string
) => {
  const { data } = await axios.get<SearchItem[]>(
    `${searchEndpoint}${searchValue}`
  );
  return data;
};

export const getItemById = async (
  singleItemEndpoint: string,
  itemId: number
) => {
  const { data } = await axios.get<ExtendedItem>(
    `${singleItemEndpoint}${itemId}`
  );
  return data;
};
