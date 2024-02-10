import { Input } from '../../Components/Input/Input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../redux/api/setAuthData';

export const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setAuthData({ username, email, password }));
        setEmail('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className={'w-[300px] mx-auto'}>
            <h3 className={'font-bold mb-[20px] uppercase'}>Create new account</h3>
            <form onSubmit={handleSubmit} className={'flex flex-col'}>
                <Input value={username} label={'Name'} setValue={setUsername} />
                <Input value={email} label={'Email'} setValue={setEmail} />
                <Input value={password} label={'Password'} setValue={setPassword} />
                <button className={'font-medium hover:underline'}>Create</button>
            </form>
        </div>
    );
};
