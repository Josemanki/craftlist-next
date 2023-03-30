import { Box, Container } from '@mantine/core';
import Head from 'next/head';
import ItemCards from '../components/ItemCards';
import Layout from '../components/Layout';
import { ResourceTable } from '../components/ResourceTable';
import SearchBar from '../components/SearchBar';
import { useCraftlist } from '../utils/hooks';

const SEARCH_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/consumables/search?limit=8&query=`;
const SINGLE_ITEM_ENDPOINT = `https://api.dofusdu.de/dofus2/en/items/consumables/`;

export default function ContactPage() {
  const {
    searchItems,
    craftlistItems,
    value,
    handleChange,
    resourceList,
    handleQuantityChange,
    onItemSubmit,
    loading,
    handleDeleteItem,
  } = useCraftlist('consumables', SEARCH_ENDPOINT, SINGLE_ITEM_ENDPOINT);

  return (
    <Layout>
      <Head>
        <title>Dofus Craftlist - Consumables</title>
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
          handleDeleteItem={handleDeleteItem}
        />
      </Container>
    </Layout>
  );
}
