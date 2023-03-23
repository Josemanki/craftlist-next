import { Autocomplete, Loader } from '@mantine/core';
import React, { useState } from 'react';

type Props = {};

const SearchBar = (props: Props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (val: string) => {
    setValue(val);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  return (
    <Autocomplete
      value={value}
      data={[]}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      placeholder="Search items"
    />
  );
};

export default SearchBar;
