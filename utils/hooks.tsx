import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { AutocompleteItem, ExtendedItem, SearchItem } from '../types';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Checking window for SSR
  const isServer = typeof window === 'undefined';
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => initialValue);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  /* prevents hydration error so that state is only initialized after server is defined */
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
};

export const useCraftlist = (
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
        const { data } = await axios.get(`${searchEndpoint}${val}`);
        const extendedResponse = await Promise.all(
          data.map(async (item: SearchItem) => {
            const itemData = await axios.get(
              `${singleItemEndpoint}${item.ankama_id}`
            );
            return itemData.data;
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

  const onItemSubmit = (autocompleteItem: AutocompleteItem) => {
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
    const ingredientsById = new Map();
    craftlistItems
      .map((item) =>
        item.recipe.map((resource) => ({
          item_ankama_id: resource.item_ankama_id,
          type: resource.item_subtype,
          quantity: resource.quantity * item.quantity,
        }))
      )
      .flat()
      .forEach(({ item_ankama_id, type, quantity }) => {
        if (!ingredientsById.has(item_ankama_id)) {
          ingredientsById.set(item_ankama_id, {
            item_ankama_id,
            type,
            quantity,
          });
          return;
        }
        ingredientsById.get(item_ankama_id).quantity += quantity;
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
    searchItems: searchItems,
    craftlistItems: craftlistItems,
    value: value,
    resourceList: resourceList,
    loading: loading,
    handleChange: handleChange,
    handleQuantityChange: handleQuantityChange,
    onItemSubmit: onItemSubmit,
    handleDeleteItem: handleDeleteItem,
  };
};
