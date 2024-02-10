import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors/authSelector';
import { setIsAuth } from '../../redux/auth-slice';
import { NavLink, useNavigate } from 'react-router-dom';
import { localStorageKeys } from '../../const/const';

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(setIsAuth(false));
        localStorage.removeItem(`${localStorageKeys.userId}`);
        navigate('/login');
    };

    return (
        <header className={'flex justify-end gap-x-[20px] h-[60px] p-[20px]'}>
            {isAuth
                ? <button onClick={onLogout}>Log out</button>
                : (<>
                    <NavLink to={'/login'}>Log in</NavLink>
                    <NavLink to={'/signup'}>Sign up</NavLink>
                </>)
            }
        </header>
    );
};
