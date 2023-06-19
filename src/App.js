import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/Profile Page/ProfilePage';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/User/UserSlice';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import ActivationPage from './pages/ActivationPage/ActivationPage';

function App() {
  const call = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')) {
      call(setUser( JSON.parse(localStorage.getItem('user')) ))
    }
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const decoded = JSON.parse(atob(token.split('.')[1]));
      if(decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('user');
        call(setUser({}));
        navigate('/login');
      }
    }
  }, [call])

  return (
    <div className="w-full h-[100vh] bg-gray-300 overflow-hidden">
        <Routes>
          <Route path='/' element={<Navigate to={'/home'}/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/post/:id' element={<PostDetailPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/$2y$10$Xe2xcXHL7.faauuauzNaOuNuWwIffUCfXT0u9Wh25uPj7IoMzJhte/:code' element={<ActivationPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
