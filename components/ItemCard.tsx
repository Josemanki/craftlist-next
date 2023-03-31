import {
  Box,
  Card,
  CloseButton,
  createStyles,
  Group,
  Image as MantineImage,
  List,
  Loader,
  NumberInput,
  rem,
  Text,
} from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExtendedItem } from '../types';
import { getResourceById } from '../utils/api';

interface ItemCardProps {
  item: ExtendedItem;
  handleQuantityChange: any;
  resourceIds: { id: number; quantity: number; type: string }[];
  handleDeleteItem: any;
}

export function ItemCard({
  item,
  resourceIds,
  handleQuantityChange,
  handleDeleteItem,
}: ItemCardProps) {
  const { classes } = useStyles();
  const [inputQuantity, setInputQuantity] = useState(item.quantity);

  useEffect(() => {
    setInputQuantity(item.quantity);
  }, [item.quantity]);

  const results = useQueries({
    queries: resourceIds.map((resource) => ({
      queryKey: ['resource', resource.id],
      queryFn: () => getResourceById(resource.id, resource.type),
      staleTime: Infinity,
    })),
  });

  const handleInputQuantityChange = (id: number, value: any) => {
    if (value > 0) {
      setInputQuantity(value);
      handleQuantityChange(id, value);
      return;
    }
    setInputQuantity(1);
    handleQuantityChange(id, 1);
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <CloseButton
          onClick={() => handleDeleteItem(item.ankama_id)}
          size={'md'}
          className={classes.closeButton}
          color={'red'}
        />
        <MantineImage
          src={item.image_urls.hd}
          alt={item.name}
          height={100}
          fit="contain"
        />
      </Card.Section>

      <Group position="apart" mt="xl" mb={'sm'} sx={{ flexWrap: 'nowrap' }}>
        <Text fz="sm" fw={700} className={classes.title}>
          {item.name}
        </Text>
        <Group spacing={5}>
          <NumberInput
            value={inputQuantity}
            min={1}
            max={99}
            size={'sm'}
            onChange={(value) =>
              handleInputQuantityChange(item.ankama_id, value)
            }
            styles={{
              input: {
                width: rem(60),
                textAlign: 'center',
                paddingLeft: 'calc(0.25rem  / 3)',
              },
            }}
          />
        </Group>
      </Group>
      <Card.Section className={classes.footer}>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size="xs" color="dimmed">
              Resource
            </Text>
            <Text size="xs" color="dimmed">
              Amount
            </Text>
          </Box>
          <List sx={{ listStyle: 'none', marginTop: '.8rem' }}>
            {results &&
              results.map((result, i) => {
                const found = resourceIds.find(
                  (resource) => resource.id == result.data?.data.ankama_id
                );
                return result.isLoading ? (
                  <Box key={i} sx={{ marginLeft: '.5rem' }}>
                    <Loader size="1rem" />
                  </Box>
                ) : (
                  <List.Item key={i} sx={{ '&>div': { width: '100%' } }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        <Image
                          src={result.data?.data?.image_urls?.sd}
                          alt=""
                          height={30}
                          width={30}
                        />
                        <Text ml="xs">{result.data?.data?.name}</Text>
                      </Box>
                      <Text ml="xs">
                        {found ? `x${found.quantity * item.quantity}` : '-'}
                      </Text>
                    </Box>
                  </List.Item>
                );
              })}
          </List>
        </div>
      </Card.Section>
    </Card>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    '&>div': {
      width: '100%',
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },

  closeButton: {
    color: 'white',
    marginLeft: 'auto',
    marginTop: '.2rem',
    marginRight: '.2rem',
  },
}));
