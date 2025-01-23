export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex
                items-center
                justify-center
                rounded-3xl
                border
                border-transparent
                bg-indigo-700
                dark:bg-amber-400
                p-4
                text-xs
                font-semibold
                uppercase
                tracking-widest
                text-white
                dark:text-gray-900
                transition
                duration-150
                ease-in-out
                hover:bg-indigo-900
                dark:hover:bg-amber-500
                focus:bg-indigo-800
                dark:focus:bg-amber-400/90
                outline-none
                focus:ring-2
                focus:ring-indigo-500
                dark:focus:ring-amber-600/90
                focus:ring-offset-2
                active:bg-indigo-800
                dark:active:bg-amber-400/90
                min-w-24
                ${ disabled && 'opacity-75' } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
