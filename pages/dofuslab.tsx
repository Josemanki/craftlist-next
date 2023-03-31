import { Box, Button, Container, Loader, Text, TextInput } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import Layout from '../components/Layout';
import { ExtendedItem } from '../types';
import { DOFUSLAB_URL_REGEX } from '../utils/constants';
import { useLocalStorage } from '../utils/hooks';

export default function DofuslabPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [craftlistItems, setCraftlistItems] = useLocalStorage<ExtendedItem[]>(
    'equipment',
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!inputValue.match(DOFUSLAB_URL_REGEX)) {
      setError('This does not look like a valid DofusLab URL');
      setIsLoading(false);
      return;
    }
    const split = inputValue.split('/');
    const setId =
      inputValue.at(-1) === '/'
        ? split[split.length - 2]
        : split[split.length - 1];
    try {
      const { data } = await axios.get(`/api/scrape/${setId}`);
      setCraftlistItems(data);
      setIsLoading(false);
      router.push('/equipment');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Container size={'45rem'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>
            <Text span fw={'bold'} fz={'lg'}>
              So you want to craft a new set?
            </Text>
            <p>
              Got you covered! We make it easy for you to get the materials from
              any DofusLab set.
              <br />
              <Text span fw={'bold'}>
                In order to use the application you just have to paste the share
                link from any DofusLab set you want
              </Text>
              , and the app is gonna give you a crafting list (that you can of
              course edit 😉) so your process is quicker and easier!
            </p>
          </Text>
          <TextInput
            placeholder="https://dofuslab.io/view/<setId>/"
            label="Paste your DofusLab share link here:"
            value={inputValue}
            onChange={(e) => handleChange(e)}
            error={error}
            rightSection={
              isLoading ? (
                <Loader size="xs" />
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )
            }
          />
        </Box>
      </Container>
    </Layout>
  );
}
