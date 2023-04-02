import Layout from '../components/Layout';
import { Box, Container } from '@mantine/core';
import Head from 'next/head';
import ItemCards from '../components/ItemCards';
import { ResourceTable } from '../components/ResourceTable';
import SearchBar from '../components/SearchBar';
import useCraftlist from '../hooks/useCraftlist';
import { IDOL_SEARCH_ENDPOINT, SINGLE_IDOL_ENDPOINT } from '../utils/constants';

export default function IdolsPage() {
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
  } = useCraftlist('idols', IDOL_SEARCH_ENDPOINT, SINGLE_IDOL_ENDPOINT);

  return (
    <Layout>
      <Head>
        <title>Dofus Craftlist - Idols</title>
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
