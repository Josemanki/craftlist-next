import { Box, createStyles } from '@mantine/core';
import { links } from '../utils/constants';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Header links={links} />
      <Box className={classes.content}>{children}</Box>
      <Footer />
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },

  content: {
    flex: '1 0 auto',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
}));

export default Layout;
