import axios from 'axios';
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
