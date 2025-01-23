import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'flex items-center gap-2 transition duration-150 ease focus:outline-none rounded-lg mb-3 p-2 ' +
                (active ? 'text-indigo-800 -mx-2 py-3 px-4 dark:text-amber-500 bg-indigo-100 dark:bg-amber-100/10' : ' text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-amber-500 hover:bg-indigo-100 dark:hover:bg-amber-100/20') +
                className
            }
        >
            {children}
        </Link>
    );
}
