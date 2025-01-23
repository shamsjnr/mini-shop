import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import background from './../../images/bg-light.png';
import BottomLink from '@/Components/BottomLink';
import { ChevronLeft, Gear, GearOutline } from '@/Icons/OIcons';
import { toast, ToastContainer } from 'react-toastify';

export default function AuthenticatedLayout({ header, headerText='', back='', hideNav=false, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="h-dvh overflow-auto relative bg-gray-100 sm:pt-0 dark:bg-gray-900 bg-opacity-5" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="sm:hidden sticky z-10 p-3 top-0 left-0 right-0 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 dark:text-gray-300 flex justify-between items-center">
                { ! headerText ?
                <div className='flex gap-4 items-center'>
                    <img src={`https://ui-avatars.com/api/?name=${ user?.name }&background=random&rounded=true&size=48`} alt="" />
                    <span className='text-lg'>{ user?.name }</span>
                </div> :
                <h4 className="text-xl p-2 drop-shadow-sm flex items-center gap-3">
                    <Link href={ route(back || 'dashboard') }>
                        <ChevronLeft size={24} />
                    </Link>
                    { headerText }
                </h4>
                }
                <span className='pe-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 3.434a6.19 6.19 0 0 1 4.661 5.47l.253 2.033l.001.015a4.34 4.34 0 0 0 1.357 2.807l.014.012c.244.23.544.51.73 1.058c.17.496.234 1.17.234 2.186c0 .372-.067.731-.253 1.044a1.6 1.6 0 0 1-.76.646a3 3 0 0 1-.823.2c-.174.022-.372.039-.562.055l-.25.022c-1.4.132-3.48.268-6.102.268a66 66 0 0 1-6.101-.268l-.25-.022a14 14 0 0 1-.563-.055a3 3 0 0 1-.822-.2a1.6 1.6 0 0 1-.76-.646c-.187-.313-.254-.672-.254-1.044c0-1.017.064-1.69.233-2.186c.187-.548.487-.829.73-1.058l.015-.012a4.34 4.34 0 0 0 1.357-2.807l.001-.015l.253-2.032A6.19 6.19 0 0 1 10.5 3.434V3a1.5 1.5 0 0 1 3 0zM7.332 9.045l-.001.015l-.253 2.032a5.84 5.84 0 0 1-1.824 3.76c-.227.213-.289.279-.351.46c-.083.245-.153.705-.153 1.703c0 .201.037.267.041.274l.005.006c.005.004.02.015.054.03c.078.033.206.064.424.091c.145.019.292.031.463.046l.302.027c1.357.127 3.39.261 5.961.261c2.57 0 4.604-.134 5.96-.261l.303-.027c.171-.015.318-.027.463-.046c.218-.027.346-.058.424-.092a.2.2 0 0 0 .054-.029l.002-.002l.003-.004c.004-.007.041-.073.041-.274c0-.998-.07-1.458-.153-1.702c-.062-.182-.125-.248-.35-.46a5.84 5.84 0 0 1-1.825-3.76l-.253-2.033l-.001-.015a4.684 4.684 0 0 0-9.336 0"/><path fill="currentColor" d="M6.908 18.928a.75.75 0 0 1 .896.567a2.2 2.2 0 0 0 .518 1.005c.413.461 1.011.75 1.678.75c.666 0 1.264-.289 1.677-.75a.75.75 0 0 1 1.118 1A3.74 3.74 0 0 1 10 22.75a3.74 3.74 0 0 1-3.45-2.276a3.7 3.7 0 0 1-.21-.65a.75.75 0 0 1 .568-.896" opacity="0.5"/></svg>
                </span>
            </div>
            <nav className="fixed sm:static bottom-0 sm:bottom-auto w-full z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hidden">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className={`
                                    sm:hidden
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    p-3 transition-all
                                    bg-gray-100 dark:bg-gray-900
                                    text-gray-500 dark:text-gray-400
                                    focus:bg-gray-100 dark:focus:bg-gray-900
                                    focus:text-gray-500 dark:focus:text-gray-400
                                    focus:outline-none
                                    ${showingNavigationDropdown ? 'absolute left-2/3 ms-2' : ''}
                                `}
                            >
                                <svg
                                    className="h-5 w-5"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            {header && (
                                <header>
                                    {header}
                                </header>
                            )}
                        </div>
                    </div>
                </div>
                { ( ! hideNav && ! headerText ) &&
                <div className="sm:hidden bg-white/70 text-sm dark:bg-gray-800/95 dark:text-amber-300 backdrop-blur-sm border-t-2 border-indigo-600 grid grid-cols-3 justify-center m-3 rounded-2xl">
                    <BottomLink text={'Home'} isActive={route().current('dashboard')} link={'dashboard'}>
                        { route().current('dashboard') ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 28 28"><path fill="currentColor" d="M12.592 3.495a2.25 2.25 0 0 1 2.816 0l7.75 6.218A2.25 2.25 0 0 1 24 11.468v11.28a2.25 2.25 0 0 1-2.25 2.25h-3a2.25 2.25 0 0 1-2.25-2.25v-6a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v6a2.25 2.25 0 0 1-2.25 2.25h-3A2.25 2.25 0 0 1 4 22.749v-11.28c0-.682.31-1.328.842-1.755zm1.877 1.17a.75.75 0 0 0-.938 0l-7.75 6.218a.75.75 0 0 0-.281.585v11.28c0 .415.336.75.75.75h3a.75.75 0 0 0 .75-.75v-6a2.25 2.25 0 0 1 2.25-2.25h3.5a2.25 2.25 0 0 1 2.25 2.25v6c0 .415.336.75.75.75h3a.75.75 0 0 0 .75-.75v-11.28a.75.75 0 0 0-.28-.585z"/></svg>
                        }
                    </BottomLink>
                    <BottomLink text={'Buy Data'} isActive={route().current('bundles')} link={'dashboard'}>
                        { route().current('bundles') ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M11.19 2.25c-.26 0-.52.06-.77.15L3.06 5.45a1.994 1.994 0 0 0-1.09 2.6L6.93 20a2 2 0 0 0 1.81 1.25c.26 0 .53-.03.79-.15l7.37-3.05a2.02 2.02 0 0 0 1.23-1.8c.01-.25-.04-.54-.13-.8L13 3.5a1.95 1.95 0 0 0-1.81-1.25m3.48 0l3.45 8.35V4.25a2 2 0 0 0-2-2m4.01 1.54v9.03l2.43-5.86a1.99 1.99 0 0 0-1.09-2.6m-10.28-.14l4.98 12.02l-7.39 3.06L3.8 7.29"/></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6q.396.168.768.315a1 1 0 0 1 .53 1.311L19 13"/></svg>
                        }
                    </BottomLink>
                    <BottomLink text={'Settings'} isActive={route().current('profile.settings')} link={'profile.settings'}>
                        { route().current('profile.settings') ? <Gear /> : <Gear /> }
                    </BottomLink>
                    {/* <BottomLink text={'Log out'} className="text-red-500" isActive={false} onClick={() => setLogout(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.203C3 14.724 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5" color="currentColor"/></svg>
                    </BottomLink> */}
                </div>
                }
            </nav>
            <div className='fixed top-0 right-0 left-0 bottom-0 -z-0 bg-gray-50/80 dark:bg-gray-900/90'></div>
            <main className={`dark:text-gray-300 ${ ! hideNav ? 'pb-28' : 'pb-12' } sm:pb-8 pt-4 px-1 relative max-h-[calc(100%_-_80px)] overflow-auto`}>{children}</main>
            <ToastContainer />
        </div>
    );
}
