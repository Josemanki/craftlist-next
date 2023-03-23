import {
  createStyles,
  Card,
  Image as MantineImage,
  Text,
  Group,
  RingProgress,
  rem,
  List,
  Box,
  NumberInput,
} from '@mantine/core';
import Image from 'next/image';

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
}));

interface ItemCardProps {
  title: string;
  stats: {
    title: string;
    values: string[];
  }[];
}

export function ItemCard({ title, stats }: ItemCardProps) {
  const { classes } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text size="xs" color="dimmed">
          {stat.title}
        </Text>
        <Text size="xs" color="dimmed">
          Amount
        </Text>
      </Box>
      <List sx={{ listStyle: 'none', marginTop: '.8rem' }}>
        {stat.values.map((stat, i) => (
          <List.Item key={i} sx={{ '&>div': { width: '100%' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Image
                  src={'/assets/equipment.png'}
                  alt=""
                  height={30}
                  width={30}
                />
                <Text ml="xs">{stat}</Text>
              </Box>
              <Text ml="xs">{'x2'}</Text>
            </Box>
          </List.Item>
        ))}
      </List>
    </div>
  ));

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <MantineImage
          src={'/assets/equipment.png'}
          alt={title}
          height={100}
          fit="contain"
        />
      </Card.Section>

      <Group position="apart" mt="xl" mb={'sm'} sx={{ flexWrap: 'nowrap' }}>
        <Text fz="sm" fw={700} className={classes.title}>
          {title}
        </Text>
        <Group spacing={5}>
          <NumberInput
            defaultValue={1}
            min={1}
            max={99}
            size={'sm'}
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
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}
