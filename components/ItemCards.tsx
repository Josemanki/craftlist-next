import { SimpleGrid } from '@mantine/core';
import React from 'react';
import { ExtendedItem } from '../types';
import { ItemCard } from './ItemCard';

type Props = {
  itemList: ExtendedItem[];
  handleQuantityChange: any;
  handleDeleteItem: any;
};

const ItemCards = ({
  itemList,
  handleQuantityChange,
  handleDeleteItem,
}: Props) => {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
      ]}
    >
      {itemList.map((itemData) => (
        <ItemCard
          item={itemData}
          key={itemData.ankama_id}
          resourceIds={itemData.recipe.map((resource) => ({
            id: String(resource.item_ankama_id),
            quantity: resource.quantity,
          }))}
          handleQuantityChange={handleQuantityChange}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
    </SimpleGrid>
  );
};

export default ItemCards;
