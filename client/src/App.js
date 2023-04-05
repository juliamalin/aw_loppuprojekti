import './App.css';
import { store } from './main/store';
import { Provider } from "react-redux";
import Navbar, { Header } from './main/content'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskContainer } from './features/tasks/taskContainer';
import { Profile } from './features/profiles/ProfilePage';
import { Main } from './main/content';
import { GoogleLogin } from './login/google';
import { Login } from './login/login';


function App() {

  return (

    <div className="App">
      <Navbar />
      <Main />
    </div>

  );
}

export default App;


