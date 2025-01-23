import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isValid=false, isFocused = false, labelText='', labelClasses='', ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className='relative'>
            <input
                {...props}
                type={type}
                className={
                    `border-gray-300
                    shadow-sm
                    relative
                    focus:border-amber-500
                    focus:ring-amber-300
                    p-3
                    ${ props.required && `
                    focus:pt-6
                    focus:pb-2
                    valid:pt-6
                    valid:pb-2
                    `}
                    [&:valid+label]:text-gray-500
                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-300
                    dark:focus:border-indigo-600
                    dark:focus:ring-indigo-600 ${className}
                    [&:focus+label]:top-4
                    [&:valid+label]:top-4
                    [&:focus+label]:left-2
                    [&:valid+label]:left-2
                    `
                }
                ref={localRef}
            />
            <label htmlFor="" className='absolute top-1/2 text-gray-800 dark:text-gray-300 text-[0.875em] -translate-y-1/2 transition-all left-3' onClick={() => localRef.current?.focus()}>{ labelText }</label>
        </div>
    );
});
