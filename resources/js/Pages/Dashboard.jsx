import BottomLink from '@/Components/BottomLink';
import HistoryCard from '@/Components/HistoryCard';
import Success from '@/Components/Success';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Nodata from '@/../images/no-data.png';
import { PhoneVibrate, Starlink, Wifi } from '@/Icons/OIcons';

export default function Dashboard({ history, wallet }) {

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            { flash.message && <Success message={flash.message} /> }

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">

                {/* Hero Card */}
                <div className="overflow-hidden relative bg-indigo-800/90 backdrop-blur-sm mx-2 shadow-xl rounded-3xl text-center text-gray-100 p-5">
                    <div className='flex flex-col gap-3 max-w-xs mx-auto relative'>
                        <span className='font-semibold tracking-wide'>Your Balance</span>
                        <div className="mb-3 text-4xl font-bold">
                            <span className='line-through decoration-double'>N</span> { new Intl.NumberFormat().format(wallet || 0) }.00
                        </div>
                        <Link href={route('paynow')} className='cursor-pointer bg-white/95 rounded-3xl py-3 w-full shadow-md hover:shadow-xl hover:bg-white/20 backdrop-blur-sm hover:text-gray-50 border hover:border-white/80 transition-all text-gray-800 flex justify-center gap-2 items-center font-semibold tracking-wide'>
                            <i className='text-indigo-800'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="currentColor" d="M34 18A16 16 0 1 1 18 2a16 16 0 0 1 16 16m-8.41-1.5H19.5v-6.09a1.5 1.5 0 0 0-3 0v6.09h-6.09a1.5 1.5 0 0 0 0 3h6.09v6.09a1.5 1.5 0 0 0 3 0V19.5h6.09a1.5 1.5 0 0 0 0-3"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                            </i>
                            Top up
                        </Link>
                    </div>
                    <div className="absolute bottom-3 -left-2 text-gray-900/20 -z-10 -rotate-12 drop-shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.002 11v-1c0-3.771 0-5.657-1.24-6.828C17.52 2 15.524 2 11.532 2h-1.06c-3.993 0-5.99 0-7.23 1.172S2.002 6.229 2.002 10v4c0 3.771 0 5.657 1.24 6.828S6.48 22 10.472 22h.53m-4-15h8m-8 5h8m5.86 2.44l.695.692a1.497 1.497 0 0 1 0 2.121l-3.638 3.696a2 2 0 0 1-1.05.551l-2.254.488a.5.5 0 0 1-.597-.593l.48-2.235c.074-.397.267-.762.554-1.047l3.683-3.674a1.507 1.507 0 0 1 2.127 0" color="currentColor"/></svg>
                    </div>
                </div>

                {/* Section Cards */}
                <div className="rounded-3xl mt-2 mx-2 dark:text-gray-300 dark:border-indigo-200/20 drop-shadow-sm grid grid-cols-3 gap-3">
                    <BottomLink text={'Airtime'} link={'buy.airtime'} classes="border border-white dark:border-amber-300/50 bg-white/70 dark:bg-amber-300/10 hover:bg-white/90 dark:hover:bg-amber-400/20 transition-all shadow-sm rounded-2xl">
                        <i className='text-indigo-800 dark:text-amber-400/80'>
                            <PhoneVibrate size={38} />
                        </i>
                    </BottomLink>
                    <BottomLink text={'Data'} link={'buy.data'} classes="border border-white dark:border-amber-300/50 bg-white/70 dark:bg-amber-300/10 hover:bg-white/90 dark:hover:bg-amber-400/20 transition-all shadow-sm rounded-2xl">
                        <i className='text-indigo-800 dark:text-amber-400/80'>
                            <Wifi size={38} />
                        </i>
                    </BottomLink>
                    <BottomLink text={'Starlink'} link={'starlink'} classes="border border-white dark:border-amber-300/50 bg-white/70 dark:bg-amber-300/10 hover:bg-white/90 dark:hover:bg-amber-400/20 transition-all shadow-sm rounded-2xl">
                        <i className='text-indigo-800 dark:text-amber-400/80'>
                            <Starlink size={38} />
                        </i>
                    </BottomLink>
                </div>

                {/* Recents */}
                <div className='p-2'>
                    <h4 className='font-semibold mb-1 mt-2 dark:text-gray-300'>Recent Transactions</h4>
                    <div className=''>
                    {
                        (history && history.length) ? history.map((data, i) => {
                            return (
                            <HistoryCard key={`trx-${i}`}
                                status={data.status.toLowerCase()}
                                date={data.date}
                                title={data.statement}
                                amount={data.amount}
                                description={data.description}
                            />)
                        }) :
                        <div className='p-6 pb-0 flex flex-col items-center gap-4'>
                            <img src={Nodata} className='w-3/4' />
                            <h4 className='tracking-wider text-xl'>It looks empty here!</h4>
                        </div>
                    }
                    { (history && history.length) ?
                        <div className='text-center py-3 text-indigo-700 dark:text-amber-400'>
                            <Link href='#' className='inline-flex gap-1'>
                                View History
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.5 17a1 1 0 0 1-.71-.29a1 1 0 0 1 0-1.42L13.1 12L9.92 8.69a1 1 0 0 1 0-1.41a1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32"/></svg>
                            </Link>
                        </div>
                    : ''}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
