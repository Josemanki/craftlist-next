import { Group, Button, Box, Text, Container } from '@mantine/core';
import HomeCards from '../components/HomeCards';
import Layout from '../components/Layout';
import { cardData } from '../utils/constants';

export default function IndexPage() {
  return (
    <Layout>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: '1rem',
          }}
        >
          <Text size={'2rem'} align="center">
            What do you want to craft today?
          </Text>
          <HomeCards cardData={cardData} />
        </Box>
      </Container>
    </Layout>
  );
}
