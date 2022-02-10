import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { Planet } from '../../types';
import { useGetSinglePlanetQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';
import Heading from '../../components/Heading';

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
    <div className="text-center d-flex flex-column align-items-center justify-content-between">
      <Heading as="h1">
        Star Wars {planetQuery.data?.name || '...'} Details
      </Heading>

      {planetQuery.isError && <div>An error has happened</div>}

      {planetQuery.isLoading && <div>Loading films...</div>}

      {planetQuery.isSuccess && <Grid {...gridProps} />}
    </div>
  );
};

export default PlanetDetails;
