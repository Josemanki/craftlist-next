import { AutocompleteItem, Box, Container } from '@mantine/core';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import ItemCards from '../components/ItemCards';
import Layout from '../components/Layout';
import { ResourceTable } from '../components/ResourceTable';
import SearchBar from '../components/SearchBar';
import { ExtendedItem, SearchItem } from '../types';

export default function EquipmentPage() {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [craftlistItems, setCraftlistItems] = useState<ExtendedItem[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const SEARCH_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/equipment/search?limit=8&query=`;
  const SINGLE_ITEM_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/equipment/`;
  const RESOURCE_ENDPOINT = 'https://api.dofusdu.de/dofus2/en/items/resources/';

  const handleChange = async (val: string) => {
    setValue(val);

    if (val.trim().length === 0) {
      setLoading(false);
      setSearchItems([]);
    } else {
      setLoading(true);
      try {
        const { data } = await axios.get(`${SEARCH_ENDPOINT}${val}`);
        const extendedResponse = await Promise.all(
          data.map(async (item: SearchItem) => {
            const itemData = await axios.get(
              `${SINGLE_ITEM_ENDPOINT}${item.ankama_id}`
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
          quantity: resource.quantity * item.quantity,
        }))
      )
      .flat()
      .forEach(({ item_ankama_id, quantity }) => {
        if (!ingredientsById.has(item_ankama_id)) {
          ingredientsById.set(item_ankama_id, { item_ankama_id, quantity });
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

  return (
    <Layout>
      <Head>
        <title>Dofus Craftlist - Equipment</title>
      </Head>
      <Container>
        <Box sx={{ margin: '1rem auto', maxWidth: '20rem' }}>
          <SearchBar
            value={value}
            loading={loading}
            items={searchItems}
            handleChange={handleChange}
            onItemSubmit={onItemSubmit}
          />
        </Box>
        <ResourceTable allResources={resourceList} />
        <ItemCards
          itemList={craftlistItems}
          handleQuantityChange={handleQuantityChange}
        />
      </Container>
    </Layout>
  );
}
