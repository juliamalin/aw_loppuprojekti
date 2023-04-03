import './App.css';
import { store } from './main/store';
import { Provider } from "react-redux";
import Navbar, { Header } from './main/headerfooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskContainer } from './features/tasks/taskContainer';
import { GoogleLogin } from './login/google';
import { MapContainer } from './features/map/MapContainer';



function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className='taskit'>
          <p>Taskit</p>
          <TaskContainer />
        </div>
        <div className='kartta'>
          <p>kartta</p>
          <MapContainer />
        </div>
        <GoogleLogin />
      </div>
    </Provider>
  );
}

export default App;


