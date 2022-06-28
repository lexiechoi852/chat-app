import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export const PrivateRoutes = () => {
  const { isAuth } =  useAppSelector((state) => state.auth);

  return (
    isAuth ? <Outlet/> : <Navigate to='/login'/>
  )
}