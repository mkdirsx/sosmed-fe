import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/Profile Page/ProfilePage';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/User/UserSlice';

function App() {
  const call = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')) {
      call(setUser( JSON.parse(localStorage.getItem('user')) ))
    }
    else {
      navigate('/login');
    }
  }, [call])

  return (
    <div className="w-full h-[100vh] bg-gray-300 overflow-hidden">
        <Routes>
          <Route path='/' element={<Navigate to={'/home'}/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
