import React, { useEffect, useState } from 'react';
import { Input } from '../../Components/Input/Input';
import { loginByUserName } from '../../redux/api/loginByUserName';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthError, selectIsAuth } from '../../redux/selectors/authSelector';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isAuth = useSelector(selectIsAuth);
    const authError = useSelector(selectAuthError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isAuth) navigate('/');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginByUserName({ username, password }));
    };

    useEffect(() => {
        if (authError) {
            alert(authError);
        }
    }, [authError]);

    return (
        <div className={'w-[300px] mx-auto'}>
            <h3 className={'font-bold mb-[20px] uppercase'}>Log in</h3>
            <form onSubmit={handleSubmit} className={'flex flex-col'}>
                <Input value={username} label={'Name'} setValue={setUsername}/>
                <Input value={password} label={'Password'} setValue={setPassword} />
                <button className={'font-medium hover:underline'}>Log in</button>
            </form>
        </div>
    );
};
