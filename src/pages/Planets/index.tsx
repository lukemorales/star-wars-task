import './styles.css';

import { useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';

import type { PlanetWithId } from '../../types';
import { useGetPlanetsQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';

const Planets = () => {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const planetsQuery = useGetPlanetsQuery(page);

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
      values: planetsQuery.data?.results,
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
    [planetsQuery.data?.results, history],
  );

  return (
    <div className="App">
      <h1>Star Wars Planets </h1>

      {planetsQuery.isLoading && <span>Loading Planets...</span>}

      {planetsQuery.data && (
        <>
          <Grid {...gridData} />
          <div
            style={{
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'end',
              gap: '2rem',
              fontSize: '0.75rem',
              height: 16,
            }}
          >
            {planetsQuery.isFetching && 'Loading more planets...'}
          </div>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <button
              type="button"
              disabled={!planetsQuery.data.previous}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Prev page
            </button>
            <button
              type="button"
              disabled={!planetsQuery.data.next}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
