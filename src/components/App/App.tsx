import './App.css';

import Planets from '../Planets';
import { useGetPlanetsQuery } from '../../queries';

const App = () => {
  const planetsQuery = useGetPlanetsQuery();

  return (
    <div className="App">
      <h1>Star Wars Planets</h1>

      {planetsQuery.isLoading && <span>Loading Planets...</span>}

      {planetsQuery.isSuccess && <Planets data={planetsQuery.data.results} />}
    </div>
  );
};

export default App;
