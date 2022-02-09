import './Planets.css';

import { ComponentProps, useMemo } from 'react';

import Grid from '../Grid';
import type { PlanetWithId } from '../../types';

type GridProps = ComponentProps<typeof Grid>;

interface PlanetsProps {
  data: PlanetWithId[];
}

const Planets = ({ data }: PlanetsProps) => {
  const gridProps = useMemo<GridProps>(
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
          label: 'Go to Films',
          action: (planet) => {
            console.log(`redirect to grid with ${planet.films.length} Films`);
          },
        },
        {
          label: 'Go to Residents',
          action: (planet) => {
            console.log(
              `redirect to grid with ${planet.residents.length} Residents`,
            );
          },
        },
      ],
    }),
    [data],
  );

  return (
    <div className="App">
      <Grid {...gridProps} />
    </div>
  );
};

export default Planets;
