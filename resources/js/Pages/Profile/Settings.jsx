import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Bell, ChevronLeft, FileText, Logout, Password, Trash, UnVerified, UserBox, Verified } from '@/Icons/OIcons';
import { useState } from 'react';
import { Button } from '@headlessui/react';
import StatusTag from '@/Components/StatusTag';

export default function Edit({ status }) {
    const user = usePage().props.auth.user;
    const [logout, setLogout] = useState(false);

    const links = [
        {text: 'My Profile', icon: <UserBox size={24} />, click: 'profile'},
        {text: 'Notifications', icon: <Bell size={24} />, click: 'notifications'},
        {text: 'Terms and Conditions', icon: <FileText size={24} />, click: 'terms'},
        {text: 'Change Password', icon: <Password size={24} />, click: 'password'},
        {text: 'Delete Account', icon: <span className='text-amber-600'><Trash size={24} /></span>, click: 'delete'},
    ];

    const [viewing, setViewing] = useState('');
    const [selectedView, setSelectedView] = useState(0);

    const toggleView = (i) => {
        if ( ! i) {
            setSelectedView('');
            setViewing('');
            return;
        }
        setSelectedView(i);
        setViewing(links[i - 1]?.click);
    }

    return (
        <AuthenticatedLayout
            headerText={'Settings'}
            hideNav={true}
        >
            <Head title="Settings" />

            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 p-4 ps-6">
                    <img src={`https://ui-avatars.com/api/?name=${ user?.name }&background=random&rounded=true&size=98`} alt="" />
                    <div className='flex flex-col items-start text-sm'>
                        <span className='text-lg font-semibold tracking-wide'>{ user.name }</span>
                        <span>{ user.email }</span>
                        <span>{ user.phone }</span>
                        <StatusTag status={'success'}>
                            { user.email_verified_at ? <Verified size={20} /> : <UnVerified size={18} /> }
                            { user.email_verified_at ? ' Verified' : ' Pending verification' }
                        </StatusTag>
                    </div>
                </div>
                <div className='flex flex-col gap-1 dark:bg-indigo-950/20 pb-1 overflow-hidden'>
                { links.map((link, i) => (
                    <Button
                        key={`menu-${i}`}
                        onClick={() => {
                            toggleView(i + 1);
                        }}
                        className={'bg-white/30 dark:bg-gray-950/5 backdrop-blur-sm flex items-center gap-3 py-6 px-5'}
                    > {link.icon} {link.text} </Button>
                ))
                }
                    <Button
                        onClick={() => setLogout(true)}
                        className={'bg-white/30 dark:bg-gray-950/5 backdrop-blur-sm flex items-center gap-3 py-6 px-5'}
                    > <span className='text-red-600'><Logout size={24} /></span> Log out </Button>
                </div>

                {/* Logout */}
                <div
                    className={`fixed top-0 bottom-0 left-0 right-0 p-6 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm flex justify-center items-center transition-[opacity] duration-75 ${logout ? 'z-50 scale-100 opacity-100' : '-z-10 scale-50 opacity-0'}`}
                    onClick={e => {
                        if (e.target.classList.contains('fixed'))
                            setLogout(false);
                    }}
                >
                    <div className="p-8 rounded-2xl w-full text-center -mt-20 bg-red-100/50 dark:bg-gray-900/80 dark:text-gray-200 shadow-sm shadow-red-600/20">
                        <span className='text-xl'>Confirm logout</span>
                        <div className="flex gap-4 mt-8 justify-center uppercase font-semibold">
                            <span className='shadow w-full py-4 text-sm rounded-3xl bg-white/80 dark:bg-gray-800/80' onClick={() => setLogout(false)}>Cancel</span>
                            <Link href={route('logout')} className="shadow w-full py-4 text-sm rounded-3xl bg-red-600 text-white">
                                Log out
                            </Link>
                        </div>
                    </div>
                </div>

                { selectedView ?
                <div className="bg-white/70 fixed -top-6 right-0 bottom-0 left-0 z-20 sm:rounded-lg sm:p-8 dark:bg-gray-300/5 backdrop-blur-xl">
                    <div className="flex items-center mb-4 shadow-sm mt-[2px]">
                        <span className='p-5 pe-3' onClick={() => toggleView('')}><ChevronLeft size={24} /></span>
                        <div className='text-xl text-gray-700 dark:text-inherit'>{ links[selectedView - 1]?.text }</div>
                    </div>
                    <div className='py-3 px-4'>
                    { viewing === 'profile' &&
                        <UpdateProfileInformationForm
                            status={status}
                            className="max-w-xl"
                            toggleView={toggleView}
                        />
                    }
                    { viewing === 'password' &&
                        <UpdatePasswordForm
                            status={status}
                            className="max-w-xl"
                            toggleView={toggleView}
                        />
                    }
                    { viewing === 'delete' &&
                        <DeleteUserForm
                            className="max-w-xl"
                            toggleView={toggleView}
                        />
                    }
                    </div>
                </div> : '' }
            </div>
        </AuthenticatedLayout>
    );
}
