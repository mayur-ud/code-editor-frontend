import Fcard from './featureCard';
import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
  } from '@mantine/core';
//   import { IconGauge, IconUser, IconCookie } from '@tabler/icons';
  
  const mockdata = [
    {
      title: 'Extreme performance',
      description:
        'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    //   icon: IconGauge,
    },
    {
      title: 'Privacy focused',
      description:
        'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    //   icon: IconUser,
    },
    {
      title: 'No third parties',
      description:
        'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    //   icon: IconCookie,
    },
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.colors.dark[5],
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
        backgrounColor: 'hsl(223, 83%, 9%)',
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.colors.dark[5],
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));
  
  export function FeaturesCards() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature,index) => (
      <Fcard  key={index} className={classes.card} >
        
        <Text color="white" size="xl" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="lg"   color="hsl(226, 51%, 74%)" mt="sm">
          {feature.description}
        </Text>
      
      
      </Fcard>
    ));
    return (
      <Container size="lg" py="xl">
        <Group position="center">
          <Badge variant="filled" size="lg">
            code collab
          </Badge>
        </Group>
  
        <Title order={1} sx={{fontSize : '42px'}} color="hsl(200, 53%, 39%)" className={classes.title} align="center" mt="sm" >
          Integrate effortlessly with any technology stack
        </Title>
  
        <Text color="dimmed" size="22px"  className={classes.description} align="center" mt={'48px'}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
          hunger drives it to try biting a Steel-type Pokémon.
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }