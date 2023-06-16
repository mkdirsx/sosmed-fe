import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="w-full h-[100vh] bg-gray-300">
        <Routes>
          <Route path='/' element={<Navigate to={'/register'}/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
