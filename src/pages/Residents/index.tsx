import './styles.css';

import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { Resident } from '../../types';
import Grid, { GridProps } from '../../components/Grid';
import { useGetPlanetResidentsQuery } from '../../queries';

const Residents = () => {
  const { planetId } = useParams<Record<'planetId', string>>();

  const residentsQuery = useGetPlanetResidentsQuery(planetId);

  const gridProps = useMemo<GridProps<Resident>>(
    () => ({
      header: [
        'name',
        'gender',
        'birth_year',
        'height',
        'mass',
        'skin_color',
        'films',
        'starships',
        'homeworld',
      ],
      values: residentsQuery.data?.residents,
    }),
    [residentsQuery.data?.residents],
  );

  return (
    <div className="App">
      <h1>Star Wars Residents in {residentsQuery.data?.planetName || '...'}</h1>

      {residentsQuery.isError && <div> An error occured</div>}

      {residentsQuery.isLoading && <div>Loading films...</div>}

      {residentsQuery.isSuccess && <Grid {...gridProps} />}
    </div>
  );
};

export default Residents;
