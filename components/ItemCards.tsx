import { SimpleGrid } from '@mantine/core';
import React from 'react';
import { ItemCard } from './ItemCard';

type Props = {};

const ItemCards = (props: Props) => {
  return (
    <SimpleGrid cols={3}>
      <ItemCard
        title="Crocobur"
        stats={[
          {
            title: 'Resources',
            values: ['Stat here', 'Stat here', 'Stat here'],
          },
        ]}
      />
      <ItemCard
        title="Crocobur"
        stats={[
          {
            title: 'Resources',
            values: ['stat here', 'stat here', 'stat here'],
          },
        ]}
      />
      <ItemCard
        title="Crocobur"
        stats={[
          {
            title: 'Resources',
            values: ['stat here', 'stat here', 'stat here'],
          },
        ]}
      />
    </SimpleGrid>
  );
};

export default ItemCards;
