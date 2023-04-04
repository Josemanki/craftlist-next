import { createStyles, Grid, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { isToday } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { getAlmanax } from '../utils/api';
import AlmanaxCard from './AlmanaxCard';

interface CardData {
  link: string;
  label: string;
  image: string;
}

type HomeCardsProps = {
  cardData: CardData[];
};

const showNotification = (formattedBonus: string) => {
  notifications.show({
    title: 'Crafting Almanax Bonus going on!',
    message: formattedBonus,
  });
};

const HomeCards = ({ cardData }: HomeCardsProps) => {
  const { data: almanaxData, isLoading: isAlmanaxDataLoading } = useQuery(
    ['almanax'],
    getAlmanax,
    {
      onSuccess(data) {
        if (data && data.length && isToday(new Date(data[0].date))) {
          showNotification(data[0].bonus.description);
        }
      },
    }
  );
  const { classes } = useStyles();

  return (
    <Grid columns={2} justify={'center'} className={classes.cardGrid}>
      <Grid.Col span={2}></Grid.Col>
      {cardData.map(({ link, label, image }) => (
        <Link href={link} key={link} className={classes.cardLink}>
          <Image src={image} alt={label} width={150} height={150} />
          <Text size="lg" weight={700} sx={{ textDecoration: 'none' }}>
            {label}
          </Text>
        </Link>
      ))}
      <AlmanaxCard
        almanaxData={almanaxData || []}
        isAlmanaxDataLoading={isAlmanaxDataLoading}
      />
    </Grid>
  );
};

const useStyles = createStyles((theme) => ({
  cardLink: {
    padding: '3rem 1rem',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.dark[6],
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
    alignItems: 'center',
    width: '18rem',
    '&:hover': {
      backgroundColor: theme.colors.dark[4],
      transition: '.1s ease-in',
    },
  },
  cardGrid: {
    gap: theme.spacing.md,
  },
}));

export default HomeCards;
