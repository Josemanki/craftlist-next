import { Box, createStyles, Text } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

type ResourceTableProps = {
  allResources: any;
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
  },
  listItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingLeft: theme.spacing.xs,
  },
  listGridItem: {
    padding: '.15rem',
    '&:nth-child(even)': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const RESOURCE_ENDPOINT = 'https://api.dofusdu.de/dofus2/en/items/resources/';

export const ResourceTable = ({ allResources }: ResourceTableProps) => {
  const { classes } = useStyles();

  const results = useQueries({
    queries: Array.from(allResources.keys()).map((resourceId: any, i) => ({
      queryKey: ['resource', resourceId],
      queryFn: async () => {
        const result = await axios.get(`${RESOURCE_ENDPOINT}${resourceId}`);
        return result;
      },
      staleTime: Infinity,
    })),
  }).map((result) => result.data?.data);

  return (
    <>
      <Text weight={600} size={'lg'}>
        Your shopping list
      </Text>
      <ul className={classes.listGrid}>
        {results &&
          results.map((resource) => {
            const resourceInMap = allResources.get(resource?.ankama_id);
            return (
              <li key={resource?.ankama_id} className={classes.listGridItem}>
                <Box className={classes.listItemRow}>
                  <Image
                    src={resource?.image_urls.icon}
                    alt={resource?.name}
                    height={30}
                    width={30}
                  />
                  <Text size={'md'}>{`x${resourceInMap?.quantity}`}</Text>
                  <Text size={'md'}>{resource?.name}</Text>
                </Box>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ResourceTable;
