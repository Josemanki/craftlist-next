import {
  Group,
  Button,
  Box,
  Text,
  Container,
  createStyles,
} from '@mantine/core';
import HomeCards from '../components/HomeCards';
import Layout from '../components/Layout';
import { cardData } from '../utils/constants';

export default function IndexPage() {
  const { classes } = useStyles();
  return (
    <Layout>
      <Container>
        <main className={classes.main}>
          <Text size={'2rem'} align="center">
            What do you want to craft today?
          </Text>
          <HomeCards cardData={cardData} />
        </main>
      </Container>
    </Layout>
  );
}

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: '1rem',
  },
}));
