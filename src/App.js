import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { Routes,Route} from 'react-router-dom';
import Loggedin from './components/Loggedin';
import Index from './components/Index';
import Info from './components/Info';
import PrivateRoute from './PrivateRoute';
import Updateinfo from './components/Updateinfo';
function App() {
  
  return (
    <div className="App container">
     <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup'  element={<Signup />} />
        <Route path='/user_info' element={<PrivateRoute><Info /></PrivateRoute>} />
        <Route path='/loggedin' element={<PrivateRoute><Loggedin /></PrivateRoute>} />
        <Route path='/update_user' element={<PrivateRoute><Updateinfo /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
