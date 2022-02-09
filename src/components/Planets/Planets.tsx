import './Planets.css';

import { useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import Grid from '../Grid';
import { GridProps } from '../Grid/Grid';
import type { PlanetWithId } from '../../types';

interface PlanetsProps {
  data: PlanetWithId[];
}

const Planets = ({ data }: PlanetsProps) => {
  const history = useHistory();

  const gridData = useMemo<GridProps<PlanetWithId>>(
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
      values: data,
      actions: [
        {
          label: 'Go to Details',
          action: (planet) => history.push(`/planets/${planet.id}`),
          isVisible: () => true,
        },
        {
          label: 'Go to Films',
          action: (planet) => history.push(`/planets/${planet.id}/films`),
          isVisible: (planet) => planet.films.length > 0,
        },
        {
          label: 'Go to Residents',
          action: (planet) => history.push(`/planets/${planet.id}/residents`),
          isVisible: (planet) => planet.residents.length > 0,
        },
      ],
    }),
    [data, history],
  );

  return (
    <div className="App">
      <Grid {...gridData} />
    </div>
  );
};

export default Planets;
