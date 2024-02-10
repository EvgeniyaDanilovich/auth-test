import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuth, selectUsers } from '../../redux/selectors/authSelector';
import { fetchUsers } from '../../redux/api/fetchUsers';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { usersActions } from '../../redux/users-slice';
import { updateUserStatus } from '../../redux/api/updateUserStatus';
import { deleteUser } from '../../redux/api/deleteUser';
import { localStorageKeys } from '../../const/const';
import { setIsAuth } from '../../redux/auth-slice';

export const TablePage = () => {
    const [mainCheckbox, setMainCheckbox] = useState(false);
    const isAuth = useSelector(selectIsAuth);
    const users = useSelector(selectUsers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserId = localStorage.getItem(localStorageKeys.userId);

    if (!isAuth) navigate('/login');

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const logoutUser = () => {
        dispatch(setIsAuth(false));
        localStorage.removeItem(`${localStorageKeys.userId}`);
        navigate('/login');
    };

    const onBlockStatus = () => {
        users.map(user => {
            if (user.checked) {
                dispatch(updateUserStatus({ userId: user.id, status: 'Blocked' }));

                if (user.id === currentUserId) {
                    logoutUser();
                }
            }
        });
    };

    const onUnblockStatus = () => {
        users.map(user => {
            if (user.checked) {
                dispatch(updateUserStatus({ userId: user.id, status: 'Active' }));
            }
        });
    };

    const onDeleteUser = () => {
        users.map(user => {
            if (user.checked) {
                dispatch(deleteUser(user.id));

                if (user.id === currentUserId) {
                    logoutUser();
                }
            }
        });
    };

    const handleCheckbox = useCallback((checked, userId) => {
        dispatch(usersActions.setChecked({ userId, checked: !checked }));
    }, []);

    const handleMainCheckbox = useCallback(() => {
        setMainCheckbox(prev => !prev);
    }, []);

    useEffect(() => {
        dispatch(usersActions.setAllCheckbox(mainCheckbox));
    }, [mainCheckbox]);

    const createUsersList = useMemo(() => {
        return users.map((user) => {
            const checked = !!user.checked;
            const isColored = user.status === 'Blocked';

            return (
                <div className={`${isColored && 'bg-slate-200'} flex items-center gap-x-[5px] mb-[10px]`} key={user.id}>
                    <div>
                        <Checkbox checked={checked} setChecked={() => handleCheckbox(checked, user.id)} />
                    </div>
                    <div className={'w-[120px]'}>{user.username}</div>
                    <div className={'w-[230px]'}>{user.email}</div>
                    <div className={'w-[200px]'}>{user.registrationDate}</div>
                    <div className={'w-[200px]'}>{user.lastLoginDate}</div>
                    <div className={'w-[80px]'}>{user.status}</div>
                </div>);
        });
    }, [users]);

    return (
        <div className={'px-[20px]'}>
            <div className="flex gap-x-[15px] mb-[25px]">
                <div className={'cursor-pointer hover:underline'} onClick={onBlockStatus}>Block</div>
                <div className={'cursor-pointer hover:underline'} onClick={onUnblockStatus}>Unblock</div>
                <div className={'cursor-pointer hover:underline'} onClick={onDeleteUser}>Delete</div>
            </div>
            <div className={'max-w-[900px]'}>
                <div className="flex gap-x-[5px] mb-[10px] uppercase font-bold">
                    <div><Checkbox checked={mainCheckbox} setChecked={handleMainCheckbox} /></div>
                    <div className='w-[120px]'>Name</div>
                    <div className='w-[230px]'>Email</div>
                    <div className='w-[200px]'>Registration date</div>
                    <div className='w-[200px]'>Last login date</div>
                    <div className='w-[80px]'>Status</div>
                </div>
                {createUsersList}
            </div>
        </div>
    );
};
