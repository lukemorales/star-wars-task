import './styles.css';

import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { Planet } from '../../types';
import { useGetSinglePlanetQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';

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
      ],
      values: [planetQuery.data || ({} as Planet)],
    }),
    [planetQuery.data],
  );

  return (
    <div className="App">
      <h1>Star Wars {planetQuery.data?.name || '...'} Details</h1>

      {planetQuery.isLoading && <div>Loading films...</div>}

      {planetQuery.isSuccess && <Grid {...gridProps} />}
    </div>
  );
};

export default PlanetDetails;
