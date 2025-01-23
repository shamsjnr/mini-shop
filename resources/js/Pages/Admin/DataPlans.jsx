import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import SplitLayout from '@/Layouts/SplitLayout';
import { Button } from '@headlessui/react';
import Modal from "@/Components/Modal";
import { useState } from "react";
import Plan from './Partials/Plan';
import MTN from '@/../images/MTN.png';
import Glo from '@/../images/Glo.png';
import Airtel from '@/../images/Airtel.png';
import NineMobile from '@/../images/9Mobile.png';
import { ChevronLeft, Pen, Trash } from '@/Icons/OIcons';
import { showErrorToast, showSuccessToast } from '@/toastService';
import Dropdown from '@/Components/Dropdown';

export default function Dashboard({ plans, isps }) {

    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const ispLinks = isps?.map(isp => ({ text: isp.name, href: 'admin.plans.isp', params: [isp.name] })); // Prepare isps for linking...
    const links = [
        { text: "All", href: 'admin.plans', params: null },
        ...ispLinks
    ];
    const logos = {
        MTN: MTN,
        Glo: Glo,
        Airtel: Airtel,
        "9Mobile": NineMobile,
    }

    const [oldData, setOldData] = useState({});

    const { delete:remove, processing } = useForm({});

    const options = {
        onError: (err) => {
            showErrorToast(err);
        },
        onSuccess: (ev) => {
            setOldData({});
            showSuccessToast(ev);
            setShowDeleteModal(false);
        }
    };

    const handleDelete = () => {
        if ( ! oldData ) return;

        remove(route('admin.plans.delete', [oldData.id]), options);
    }

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4">
                <div className="font-sansation rounded-2xl pt-5 justify-between hidden sm:flex">
                    <h3 className='text-2xl text-amber-500 dark:text-amber-400'>Data Plans</h3>
                </div>
                <SplitLayout links={links} hideOnSmall >
                    <div className="flex justify-between sm:justify-end p-2 px-3 mb-2 sticky top-0 z-10 bg-white/80 dark:bg-gray-900/20 rounded-lg shadow-sm">
                        <div className="sm:hidden">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button className={'inline-flex gap-2 items-center py-3 px-6 rounded-3xl border bg-white/80 dark:border-gray-500/50 dark:bg-gray-800/20'}>
                                        Change Category
                                        <span className='relative -rotate-90'><ChevronLeft size={16} /></span>
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses='flex flex-col -mt-2 bg-white/60 p-2 dark:bg-gray-800/30 backdrop-blur-lg' align='left'>
                                { links?.map((link, i) => {
                                    const href = ( ! link.params ? route(link.href) : route(link.href, link.params));
                                    const param = Object.values(route().params)[0] ?? '';
                                    const statusClass = (( ! route().routeParams && ! link.params) || param === link.text)
                                        ? 'bg-indigo-100 dark:bg-indigo-100/10 text-indigo-800 dark:text-amber-500'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/60';

                                    return (
                                    <Link
                                        key={`link-${i}`}
                                        href={ href }
                                        className={`w-full py-3 px-5 rounded text-[.9em] ${statusClass}`}
                                    >
                                        { link.text }
                                    </Link>
                                    )
                                })}

                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <Button
                            onClick={() => {
                                setOldData({});
                                setShowPlanModal(true);
                            }}
                            className={'bg-indigo-700 dark:bg-amber-400 font-[500] text-white dark:text-gray-800 py-3 px-6 rounded-3xl'}
                        >Add Plan</Button>
                    </div>
                    <div className='overflow-auto max-h-[calc(100%_-76px)] pb-4 bg-white/80 dark:bg-transparent rounded-lg px-2 shadow-lg'>
                        <table className='w-full rounded-lg' id='dtx'>
                            <thead>
                                <tr className='text-nowrap *:bg-white/10 dark:*:bg-black/5 *:backdrop-blur-lg'>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500] w-6'>#</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'></th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Plan Name</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Price</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Duration</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500] w-[80px]'></th>
                                </tr>
                            </thead>
                            <tbody>
                            { plans?.map((data, i) => (
                                <tr key={`plan-${i}`} className='border-b dark:border-gray-300/10 hover:bg-gray-300/15 dark:hover:bg-gray-300/5 last:border-transparent odd:bg-gray-200/50 dark:odd:bg-gray-100/5 dark:text-gray-300 '>
                                    <td className='px-5'>{i + 1 }</td>
                                    <td className='p-0 w-[38px]'><span className='block rounded-full overflow-hidden w-[36px]'><img src={ logos[data.isp.name] } /></span></td>
                                    <td className='py-4 px-5'>{ data?.name }</td>
                                    <td className='py-4 px-5 text-nowrap'><span className="naira">N</span> { Number(data?.price)?.toLocaleString("En-US") }</td>
                                    <td className='py-4 px-5'>{ data?.term ? `${data.term} Day${ data?.term === 1 ? '' : 's'}` : '-' }</td>
                                    <td className='py-3 px-5 flex gap-2'>
                                        <span
                                            className='text-gray-700 dark:text-gray-300 border dark:border-gray-600/80 inline-flex justify-center items-center w-[40px] h-[40px] bg-white/80 dark:bg-white/10 hover:bg-transparent transition-all rounded-full p-1 cursor-pointer'
                                            onClick={() => {
                                                setOldData(data);
                                                setShowPlanModal(true);
                                            }}
                                        >
                                            <Pen size={28} />
                                        </span>
                                        <span
                                            className='text-red-600 border dark:border-gray-600/80 inline-flex justify-center items-center w-[40px] h-[40px] bg-white/80 dark:bg-white/10 hover:bg-transparent transition-all rounded-full p-1 cursor-pointer'
                                            onClick={() => {
                                                setOldData(data);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            <Trash size={21} />
                                        </span>
                                    </td>
                                </tr>
                            )) }
                            { ! plans.length && <tr><td colSpan={6} className='p-8 text-center'>No data</td></tr> }
                            </tbody>
                        </table>
                    </div>
                </SplitLayout>
            </div>
            <Modal show={showPlanModal} onClose={setShowPlanModal}>
                <Plan oldData={oldData} isps={isps} setOpen={setShowPlanModal} />
            </Modal>

            <Modal maxWidth='md' show={showDeleteModal} centered showClose={false} onClose={setShowDeleteModal}>
                <div className='flex flex-col gap-5'>
                    <h4 className='text-lg font-semibold'>Confirm Delete</h4>
                    <div className="text-center flex flex-col gap-2">
                        <span>Sure to delete?</span>
                        This operation cannot be undone
                    </div>
                    <div className="grid grid-cols-2 pb-2 gap-4 px-5">
                        <Button className='rounded-3xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-gray-200/20 p-3' onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button className='rounded-3xl bg-red-600 text-gray-100' disabled={processing} onClick={handleDelete}>Yes, Delete</Button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
