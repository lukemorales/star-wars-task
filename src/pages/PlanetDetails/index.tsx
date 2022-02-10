import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { Planet } from '../../types';
import { useGetSinglePlanetQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Container from '../../components/Container';

const PlanetDetails = () => {
  const { planetId } = useParams<Record<'planetId', string>>();

  const planetQuery = useGetSinglePlanetQuery(planetId);

  const gridProps = useMemo<GridProps<Planet>>(
    () => ({
      header: [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population',
        'films',
        'residents',
      ],
      values: [planetQuery.data || ({} as Planet)],
    }),
    [planetQuery.data],
  );

  return (
    <Container>
      <Heading as="h1">
        Star Wars {planetQuery.data?.name || '...'} Details
      </Heading>

      {planetQuery.isError && <div>An error has happened</div>}

      {planetQuery.isLoading && <div>Loading films...</div>}

      {planetQuery.isSuccess && <Grid {...gridProps} />}

      <Footer />
    </Container>
  );
};

export default PlanetDetails;
