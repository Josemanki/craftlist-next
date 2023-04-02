import {
  Burger,
  Container,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header as MantineHeader,
  rem,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header({ links }: HeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState<string | null>(
    typeof window !== 'undefined' ? location.pathname : null
  );
  const { classes, theme, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  return (
    <MantineHeader height={70}>
      <Container className={classes.header}>
        <Link href={'/'} className={classes.logo}>
          <Title order={1}>
            <span className={classes.logoWhiteSpan}>Dofus</span>
            <span className={classes.logoGreenSpan}>Craftlist</span>
          </Title>
        </Link>
        <nav>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </nav>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="md"
        />
      </Container>
      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        closeButtonProps={{ size: 'lg' }}
      >
        <Divider
          my="sm"
          color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
        />
        <nav>{items}</nav>
      </Drawer>
    </MantineHeader>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  logo: {
    fontSize: '2rem',
    fontWeight: 700,
    textDecoration: 'none',
    margin: '1rem 0rem',
  },

  logoWhiteSpan: {
    color: theme.white,
  },

  logoGreenSpan: {
    color: theme.colors.lime[6],
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
