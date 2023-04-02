import { Box, Container } from '@mantine/core';
import Head from 'next/head';
import ItemCards from '../components/ItemCards';
import Layout from '../components/Layout';
import { ResourceTable } from '../components/ResourceTable';
import SearchBar from '../components/SearchBar';
import { ITEM_SEARCH_ENDPOINT, SINGLE_ITEM_ENDPOINT } from '../utils/constants';
import useCraftlist from '../hooks/useCraftlist';

export default function EquipmentPage() {
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
  } = useCraftlist('equipment', ITEM_SEARCH_ENDPOINT, SINGLE_ITEM_ENDPOINT);

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
          handleDeleteItem={handleDeleteItem}
        />
      </Container>
    </Layout>
  );
}
