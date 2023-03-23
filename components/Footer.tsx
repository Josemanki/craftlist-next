import { createStyles, Container, Group, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    marginTop: 'auto',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  credits: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },

  logo: {
    fontSize: '1.2rem',
    fontWeight: 700,
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <p className={classes.logo}>DofusCraftlist</p>
        <Group spacing={0} className={classes.credits} position="right" noWrap>
          <p>Item data provided with ❤️ by Stelzo</p>
        </Group>
      </Container>
    </footer>
  );
}
