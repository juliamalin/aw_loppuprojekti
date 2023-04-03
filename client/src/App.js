import './App.css';
import { store } from './main/store';
import { Provider } from "react-redux";
import Navbar, { Header } from './main/headerfooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profile } from './features/profiles/ProfilePage';



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className='taskit'>
          <p>Taskit</p>
          <Profile/>
        </div>  
        <div className='kartta'>
          <p>kartta</p>
        </div>
      </div>
    </Provider>
  );
}

export default App;