import { memo } from 'react';

export const Checkbox = memo(({ checked, setChecked }) => {

    const onCheckedHandler = () => {
        setChecked();
    };

    return (
        <input onChange={onCheckedHandler} type="checkbox" checked={checked} />
    );
});