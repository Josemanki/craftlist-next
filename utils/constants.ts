export const links = [
  {
    link: '/equipment',
    label: 'Equipment',
  },
  {
    link: '/consumables',
    label: 'Consumables',
  },
  {
    link: '/idols',
    label: 'Idols',
  },
  {
    link: '/dofuslab',
    label: 'DofusLab Set',
  },
];

export const cardData = [
  {
    link: '/equipment',
    label: 'Equipment',
    image: '/assets/equipment.png',
  },
  {
    link: '/consumables',
    label: 'Consumables',
    image: '/assets/consumables.png',
  },
  {
    link: '/idols',
    label: 'Idols',
    image: '/assets/idols.png',
  },
  {
    link: '/dofuslab',
    label: 'DofusLab Set',
    image: '/assets/dofuslab.svg',
  },
];

export const DOFUSLAB_URL_REGEX =
  /(https?:\/\/)?(dofuslab)\.(io)([\/view\-]*)*\/([\/\w\.-]*)*\//;

export const CONSUMABLE_SEARCH_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/consumables/search?limit=8&query=`;
export const SINGLE_CONSUMABLE_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/consumables/`;
export const ITEM_SEARCH_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/equipment/search?limit=8&query=`;
export const SINGLE_ITEM_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/equipment/`;
export const IDOL_SEARCH_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/resources/search?filter%5Btype_name%5D=idol&limit=8&query=`;
export const SINGLE_IDOL_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/resources/`;
export const SINGLE_RESOURCE_ENDPOINT =
  'https://api.dofusdu.de/dofus2/en/items/resources/';
