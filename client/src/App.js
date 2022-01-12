import { useState, useEffect } from 'react';
import './App.css';

import DropDown from './components/DropDown';

/* Link: Launch
  DropDown
  Launch Date = Calender
  Mission Name - ''
  Rocket Type - ''
  Destination Exoplanet
  button Launch Mission
*/

/* link: Upcoming - Future Missions
No. Date Mission Rocket Destination
x deletes item 
*/

/* link: History - Previous Missions
  No. Date Mission Rocket Customers
*/

function App() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyAPI = async () => {
      let response = await fetch('http://localhost:5000/planets');
      response = await response.json();
      console.log('API response', response);
      setPlanets(response);
      setIsLoading(false);
    };
    fetchMyAPI();
  }, []);

  // const mappedData = planets.map(planet => {
  //   return (
  //     <ul key={planet['kepler_name']}>
  //       <li>{planet['kepler_name']}</li>
  //     </ul>
  //   );
  // });

  // const loadingList = isLoading ? 'loading...' : mappedData;

  return (
    <div className='App'>
      <header className='App-header'>
        <section>
          <h1>NASA Project</h1>
          <p>Planets With Possible Life:</p>
          {/* {loadingList} */}
        </section>
        <section>
          <DropDown planets={planets} />
        </section>
      </header>
    </div>
  );
}

export default App;
