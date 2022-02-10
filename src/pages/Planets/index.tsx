import { useMemo, useState } from 'react';

import { ButtonGroup, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import type { PlanetWithId } from '../../types';
import { useGetPlanetsQuery } from '../../queries';
import Grid, { GridProps } from '../../components/Grid';
import Heading from '../../components/Heading';

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
        'films',
        'residents',
      ],
      values: planetsQuery.data?.results,
      actions: [
        {
          label: 'Go to Details',
          action: (planet) => history.push(`/planets/${planet.id}`),
          isEnabled: () => true,
        },
        {
          label: 'Go to Films',
          action: (planet) => history.push(`/planets/${planet.id}/films`),
          isEnabled: (planet) => planet.films.length > 0,
        },
        {
          label: 'Go to Residents',
          action: (planet) => history.push(`/planets/${planet.id}/residents`),
          isEnabled: (planet) => planet.residents.length > 0,
        },
      ],
    }),
    [planetsQuery.data?.results, history],
  );

  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-between">
      <Heading as="h1">Star Wars Planets </Heading>

      {planetsQuery.isError && <div>An error has happened</div>}

      {planetsQuery.isLoading && <span>Loading Planets...</span>}

      {planetsQuery.data && (
        <>
          <Grid {...gridData} />

          <ButtonGroup className="mt-4">
            <Button
              type="button"
              disabled={!planetsQuery.data.previous}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Prev page
            </Button>
            <Button
              type="button"
              disabled={!planetsQuery.data.next}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next page
            </Button>
          </ButtonGroup>

          <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 11 }}
          >
            <Toast isOpen={planetsQuery.isFetching}>
              <ToastHeader>Star Wars API</ToastHeader>
              <ToastBody className="text-start">
                Loading more planets...
              </ToastBody>
            </Toast>
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
