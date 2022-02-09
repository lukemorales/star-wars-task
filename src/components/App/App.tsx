import './App.css';

import { useState } from 'react';

import Planets from '../Planets';
import { useGetPlanetsQuery } from '../../queries';

const App = () => {
  const [page, setPage] = useState(1);
  const planetsQuery = useGetPlanetsQuery(page);

  return (
    <div className="App">
      <h1>Star Wars Planets</h1>

      {planetsQuery.isLoading && <span>Loading Planets...</span>}

      {planetsQuery.data && (
        <>
          <Planets data={planetsQuery.data.results} />

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

export default App;
