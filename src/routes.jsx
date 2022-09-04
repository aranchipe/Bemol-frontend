import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { ToastContainer } from 'react-toastify';
import { getItem } from './utils/storage';
import Main from './pages/Main';


function ProtectedRoutes({ redirectTo }) {
    const authentication = getItem('token');

    return authentication ? <Outlet /> : < Navigate to={redirectTo} />
}

function MainRoutes() {

    return (
        <>
            <ToastContainer />

            <Routes>

                <Route path="/cadastro" element={<Cadastro />} />


                <Route path="/">
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoutes redirectTo='/login' />}>
                    <Route path='/main' element={<Main />} />

                </Route>

            </Routes>
        </>
    )
}

export default MainRoutes;