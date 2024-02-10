import './App.css';
import { Header } from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { TablePage } from './Pages/TablePage/TablePage';
import { SignupPage } from './Pages/SignupPage/SignupPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuth } from './redux/auth-slice';
import { localStorageKeys } from './const/const';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const isAuth = localStorage.getItem(`${localStorageKeys.userId}`);
        if(isAuth) {
            // dispatch(authActions.setIsAuth(true))
            dispatch(setIsAuth(true))
        }
    }, [])

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<TablePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </div>
    );
}

export default App;
