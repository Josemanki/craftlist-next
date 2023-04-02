import { Container, createStyles, rem } from '@mantine/core';

export function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <span className={classes.logo}>DofusCraftlist</span>
        <p className={classes.credits}>Item data provided with ❤️ by Stelzo</p>
      </Container>
    </footer>
  );
}

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
      margin: '0',
    },
  },

  logo: {
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: '0',
  },
}));
