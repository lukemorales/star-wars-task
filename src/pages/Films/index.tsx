import './styles.css';

import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { Film } from '../../types';
import { useGetPlanetFilmsQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';

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
    <div className="App">
      <h1>Star Wars Films in {filmsQuery.data?.planetName || '...'}</h1>

      {filmsQuery.isLoading && <div>Loading films...</div>}

      {filmsQuery.isSuccess && <Grid {...gridProps} />}
    </div>
  );
};

export default Films;
