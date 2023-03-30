import { Autocomplete, AutocompleteItem, Group, Loader } from '@mantine/core';
import React, { useState } from 'react';
import { AutoCompleteItem } from './AutoCompleteItem';

type Props = {
  value: string;
  loading: boolean;
  items: any[];
  handleChange: (val: string) => void;
  onItemSubmit: (AutocompleteItem: any) => void;
};

const SearchBar = ({
  value,
  loading,
  items,
  handleChange,
  onItemSubmit,
}: Props) => {
  const data = items.map((item) => ({
    ...item,
    quantity: 1,
    value: item.name,
  }));

  return (
    <Autocomplete
      label="Search item:"
      value={value}
      data={data}
      onChange={handleChange}
      itemComponent={AutoCompleteItem}
      onItemSubmit={(a) => onItemSubmit(a)}
      rightSection={loading ? <Loader size="1rem" /> : null}
      placeholder="Search items"
    />
  );
};

export default SearchBar;
