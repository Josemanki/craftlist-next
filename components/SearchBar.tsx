import { Autocomplete, AutocompleteItem, Group, Loader } from '@mantine/core';
import React, { useState } from 'react';
import { SearchItem, TAutocompleteItem } from '../types';
import { AutoCompleteItem } from './AutoCompleteItem';

type Props = {
  value: string;
  loading: boolean;
  items: SearchItem[];
  handleChange: (val: string) => void;
  onItemSubmit: (autocompleteItem: TAutocompleteItem) => void;
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
      onItemSubmit={(a: TAutocompleteItem) => onItemSubmit(a)}
      rightSection={loading ? <Loader size="1rem" /> : null}
      placeholder="Search items"
    />
  );
};

export default SearchBar;
