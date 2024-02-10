import { memo } from 'react';

export const Input = memo(({ value, label, setValue }) => {

    const onChangeHandler = (e) => {
        setValue(e.target.value);
    };

    return (
        <label>{label}<br/>
            <input className={'border w-[300px] focus:outline-none px-[15px] py-[4px] mb-[10px]'}
                   onChange={onChangeHandler} type="text" placeholder="Type here" value={value} />
        </label>
    );
});