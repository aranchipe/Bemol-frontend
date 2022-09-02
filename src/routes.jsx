import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
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

                <Route path="/">
                    <Route path="/" element={<SignIn />} />
                    <Route path="/login" element={<SignIn />} />
                </Route>

                <Route element={<ProtectedRoutes redirectTo='/login' />}>
                    <Route path='/main' element={<Main />} />

                </Route>

            </Routes>
        </>
    )
}

export default MainRoutes;