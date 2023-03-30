import { createStyles, SimpleGrid, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

interface CardData {
  link: string;
  label: string;
  image: string;
}

type HomeCardsProps = {
  cardData: CardData[];
};

const HomeCards = ({ cardData }: HomeCardsProps) => {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      cols={2}
      spacing={16}
      breakpoints={[
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
      ]}
    >
      {cardData.map(({ link, label, image }) => (
        <Link href={link} key={link} className={classes.cardLink}>
          <Image src={image} alt={label} width={150} height={150} />
          <Text size="lg" weight={700} sx={{ textDecoration: 'none' }}>
            {label}
          </Text>
        </Link>
      ))}
    </SimpleGrid>
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
}));

export default HomeCards;
