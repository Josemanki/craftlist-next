import { useMemo, useState } from 'react';
import { ExtendedItem, Recipe, SearchItem, TAutocompleteItem } from '../types';
import { getItemById, searchApi } from '../utils/api';
import useLocalStorage from './useLocalStorage';

const useCraftlist = (
  key: string,
  searchEndpoint: string,
  singleItemEndpoint: string
) => {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [craftlistItems, setCraftlistItems] = useLocalStorage<ExtendedItem[]>(
    key,
    []
  );
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (val: string) => {
    setValue(val);

    if (val.trim().length === 0) {
      setLoading(false);
      setSearchItems([]);
    } else {
      setLoading(true);
      try {
        const data = await searchApi(searchEndpoint, val);
        const extendedResponse = await Promise.all(
          data.map(async (item) => {
            const itemData = getItemById(singleItemEndpoint, item.ankama_id);
            return itemData;
          })
        );
        const itemsWithRecipe = extendedResponse.filter((item) =>
          item.hasOwnProperty('recipe')
        );
        setSearchItems(itemsWithRecipe);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onItemSubmit = (autocompleteItem: TAutocompleteItem) => {
    const { value, ...rest } = autocompleteItem;
    const itemWithoutValue = rest as ExtendedItem;
    const indexInCraftlist = craftlistItems.findIndex(
      (item) => item.ankama_id === autocompleteItem.ankama_id
    );
    if (indexInCraftlist < 0) {
      setCraftlistItems((prev) => [...prev, itemWithoutValue]);
      setSearchItems([]);
      setValue('');
      return;
    }
    const temp = craftlistItems.slice();
    temp[indexInCraftlist].quantity++;
    setCraftlistItems(temp);
    setSearchItems([]);
    setValue('');
  };

  const resourceList = useMemo(() => {
    const ingredientsById = new Map<number, Recipe>();
    craftlistItems
      .map((item) =>
        item.recipe.map((resource) => ({
          item_ankama_id: resource.item_ankama_id,
          item_subtype: resource.item_subtype,
          quantity: resource.quantity * item.quantity,
        }))
      )
      .flat()
      .forEach(({ item_ankama_id, item_subtype, quantity }: Recipe) => {
        if (!ingredientsById.has(item_ankama_id)) {
          ingredientsById.set(item_ankama_id, {
            item_ankama_id,
            item_subtype,
            quantity,
          });
          return;
        }
        const existingItem = ingredientsById.get(item_ankama_id);
        if (existingItem) existingItem.quantity += quantity;
      });
    return ingredientsById;
  }, [craftlistItems]);

  const handleQuantityChange = (id: number, quantity: number) => {
    const temp = craftlistItems.slice();
    const foundIndex = craftlistItems.findIndex(
      (item) => item.ankama_id === id
    );
    temp[foundIndex].quantity = quantity;
    setCraftlistItems(temp);
  };

  const handleDeleteItem = (id: number) => {
    const temp = craftlistItems.slice();
    const foundIndex = [...craftlistItems].findIndex(
      (item) => item.ankama_id === id
    );
    if (foundIndex < 0) return;
    temp.splice(foundIndex, 1);
    setCraftlistItems(temp);
  };

  return {
    searchItems,
    craftlistItems,
    value,
    resourceList,
    loading,
    handleChange,
    handleQuantityChange,
    onItemSubmit,
    handleDeleteItem,
  };
};

export default useCraftlist;
