import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { Film } from '../../types';
import { useGetPlanetFilmsQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Container from '../../components/Container';

const Films = () => {
  const { planetId } = useParams<Record<'planetId', string>>();

  const filmsQuery = useGetPlanetFilmsQuery(planetId);

  const gridProps = useMemo<GridProps<Film>>(
    () => ({
      header: [
        'title',
        'episode_id',
        'director',
        'release_date',
        'species',
        'characters',
        'vehicles',
        'url',
      ],
      values: filmsQuery.data?.films,
    }),
    [filmsQuery.data?.films],
  );

  return (
    <Container>
      <Heading as="h1">
        Star Wars Films in {filmsQuery.data?.planetName || '...'}
      </Heading>

      {filmsQuery.isError && <div>An error has happened</div>}

      {filmsQuery.isLoading && <div>Loading films...</div>}

      {filmsQuery.isSuccess && <Grid {...gridProps} />}

      <Footer />
    </Container>
  );
};

export default Films;
