import { Box, createStyles, Loader, Text } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import Image from 'next/image';
import { Recipe } from '../types';
import { getResourceById } from '../utils/api';

type ResourceTableProps = {
  allResources: Map<number, Recipe>;
};

export const ResourceTable = ({ allResources }: ResourceTableProps) => {
  const { classes } = useStyles();

  const results = useQueries({
    queries: Array.from(allResources.values()).map(
      ({ item_ankama_id, item_subtype }: Recipe) => ({
        queryKey: ['resource', item_ankama_id],
        queryFn: () => getResourceById(item_ankama_id, item_subtype),
        staleTime: Infinity,
      })
    ),
  });

  return (
    <>
      <Text weight={600} size={'lg'}>
        Your shopping list
      </Text>
      <ul className={classes.listGrid}>
        {results && !results.length ? (
          <li className={classes.emptyMessage}>
            Please add some items to get started!
          </li>
        ) : (
          results.map((result, i) => {
            const resource = result.data?.data;
            const resourceInMap = allResources.get(resource?.ankama_id);
            return result.isLoading ? (
              <Box key={i} sx={{ marginLeft: '.5rem' }}>
                <Loader size="1rem" />
              </Box>
            ) : (
              <li key={resource?.ankama_id} className={classes.listGridItem}>
                <Box className={classes.listItemRow}>
                  <Image
                    src={resource?.image_urls.icon}
                    alt={resource?.name}
                    height={30}
                    width={30}
                  />
                  <Text size={'md'}>
                    {resourceInMap?.quantity
                      ? `x${resourceInMap?.quantity}`
                      : '-'}
                  </Text>
                  <Text size={'md'}>{resource?.name ?? 'Error fetching!'}</Text>
                </Box>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  listGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    listStyle: 'none',
    width: '100%',
    padding: 0,
    border: `1px solid ${theme.colors.dark[5]}`,
    borderRadius: theme.radius.sm,
    [theme.fn.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  listItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingLeft: theme.spacing.xs,
  },
  listGridItem: {
    padding: '.15rem',
    '&:nth-of-type(even)': {
      backgroundColor: theme.colors.dark[5],
    },
  },
  emptyMessage: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gridColumnStart: 1,
    gridColumnEnd: 4,
  },
}));

export default ResourceTable;
