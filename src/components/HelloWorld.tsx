import React, { useRef, useState } from 'react';
interface Props {
    text: string;
    number?: number;
    handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
const HelloWorld: React.FC<Props> = (props) => {
    const { text, handleChange } = props;
    const [count, setCount] = useState<number | null>(2);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            HelloWorld {text} <input ref={inputRef} onChange={handleChange} />
        </div>
    );
};

export default HelloWorld;
