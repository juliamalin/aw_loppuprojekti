import './App.css';
import { store } from './main/store';
import { Provider } from "react-redux";
import Navbar, { Header } from './main/headerfooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleLogin} from './login/google';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className='taskit'>
          <p>Taskit</p>
        </div>  
        <div className='kartta'>
          <p>kartta</p>
        </div>
        <GoogleLogin />
      </div>
    </Provider>
  );
}

export default App;