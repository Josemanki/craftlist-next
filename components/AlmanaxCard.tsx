import { Card, createStyles, Loader, Text } from '@mantine/core';
import Image from 'next/image';
import { AlmanaxEntry } from '../types';
import { formatAlmanaxDate } from '../utils/helpers';

export interface AlmanaxCardProps {
  almanaxData: AlmanaxEntry[];
  isAlmanaxDataLoading: boolean;
}

const AlmanaxCard = ({
  almanaxData,
  isAlmanaxDataLoading,
}: AlmanaxCardProps) => {
  const { classes } = useStyles();

  return (
    <Card withBorder padding="lg" className={classes.card}>
      {isAlmanaxDataLoading ? (
        <Loader />
      ) : !almanaxData.length ? (
        <>
          <Card.Section>
            <Text fz={'md'} fw={'bold'} ta={'center'}>
              Next Almanax crafting bonus:
            </Text>
          </Card.Section>
          <Card.Section>
            <Text fz={'sm'} ta={'center'}>
              There doesn&apos;t seem to be any crafting bonus for the next 35
              days! :(
            </Text>
          </Card.Section>
        </>
      ) : (
        <>
          <Card.Section>
            <Text fw={'bold'} fz={'md'} ta={'center'}>
              Next Almanax crafting bonus: <br />
              <Text span fz={'sm'} fw={'bold'}>
                {formatAlmanaxDate(almanaxData[0].date)}
              </Text>
            </Text>
          </Card.Section>
          <Card.Section>
            <Image
              src={almanaxData[0].tribute.item.image_urls.sd}
              alt={almanaxData[0].tribute.item.name}
              width={120}
              height={120}
            />
          </Card.Section>
          <Card.Section>
            <Text fz={'sm'} ta={'center'}>
              {almanaxData[0].bonus.description}
            </Text>
          </Card.Section>
        </>
      )}
    </Card>
  );
};

const useStyles = createStyles((theme) => ({
  card: {
    padding: '3rem 1rem',
    borderRadius: theme.radius.md,
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
    backgroundColor: 'transparent',
  },
}));

export default AlmanaxCard;
