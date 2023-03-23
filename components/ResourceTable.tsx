import { Box, Container, createStyles, List, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type ResourceTableProps = {};

const useStyles = createStyles((theme) => ({
  listGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    listStyle: 'none',
    width: '100%',
    padding: 0,
    boxShadow: `2px 0 0 0 ${theme.colors.dark[5]},
    0 2px 0 0 ${theme.colors.dark[5]},
    2px 2px 0 0 ${theme.colors.dark[5]},
    2px 0 0 0 ${theme.colors.dark[5]} inset,
    0 2px 0 0 ${theme.colors.dark[5]} inset;`,
  },
  listItemRow: {
    display: 'flex',
    gap: '2rem',
  },
  listGridItem: {
    padding: '.15rem',
    '&:nth-child(even)': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

export const ResourceTable = (props: ResourceTableProps) => {
  const { classes } = useStyles();
  return (
    <Container>
      <Text weight={600} size={'lg'}>
        Your shopping list
      </Text>
      <ul className={classes.listGrid}>
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>{' '}
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>{' '}
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>{' '}
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>{' '}
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>{' '}
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>{' '}
        <li className={classes.listGridItem}>
          <Box className={classes.listItemRow}>
            <Image
              src={'/assets/equipment.png'}
              alt={''}
              height={30}
              width={30}
            />
            <Text size={'md'}>x3</Text>
            <Text size={'md'}>Crocobur</Text>
          </Box>
        </li>
      </ul>
    </Container>
  );
};

export default ResourceTable;
