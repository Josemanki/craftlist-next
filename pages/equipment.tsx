import { Box, Container, SimpleGrid } from '@mantine/core';
import { ItemCard } from '../components/ItemCard';
import ItemCards from '../components/ItemCards';
import Layout from '../components/Layout';
import { ResourceTable } from '../components/ResourceTable';
import SearchBar from '../components/SearchBar';

export default function EquipmentPage() {
  return (
    <Layout>
      <Container>
        <Box sx={{ margin: '1rem auto', maxWidth: '20rem' }}>
          <SearchBar />
        </Box>
        <ResourceTable />
        <ItemCards />
      </Container>
    </Layout>
  );
}
