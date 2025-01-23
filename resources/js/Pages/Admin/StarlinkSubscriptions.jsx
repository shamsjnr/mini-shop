import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import SplitLayout from '@/Layouts/SplitLayout';
import { Button } from '@headlessui/react';
import Modal from "@/Components/Modal";
import { useState } from "react";
import { ChevronLeft, Pen, Starlink, Trash } from '@/Icons/OIcons';
import { showErrorToast, showSuccessToast } from '@/toastService';
import StarlinkPlan from './Partials/StarlinkPlan';

export default function Dashboard({ data, history }) {

    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

        remove(route('admin.starlink.delete', [oldData.id]), options);
    }

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4">
                <div className="font-sansation rounded-2xl pt-5 justify-between hidden sm:flex">
                    <h3 className='text-2xl text-amber-500 dark:text-amber-400'>Subsciptions</h3>
                </div>
                <SplitLayout maxW="auto" hideOnSmall >
                    <div className='overflow-auto max-h-full pb-4 bg-white/80 dark:bg-transparent rounded-lg px-2 shadow-lg'>
                        <table className='w-full rounded-lg' id='dtx'>
                            <thead>
                                <tr className='text-nowrap *:bg-white/10 dark:*:bg-black/5 *:backdrop-blur-lg'>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500] w-6'>#</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Customer Name</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Plan</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Email</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Amount</th>
                                <th className='py-3 px-5 sticky top-0 text-left font-[500] w-[80px]'></th>
                                </tr>
                            </thead>
                            <tbody>
                            { data?.map((data, i) => (
                                <tr key={`plan-${i}`} className='border-b dark:border-gray-300/10 hover:bg-gray-300/15 dark:hover:bg-gray-300/5 last:border-transparent odd:bg-gray-200/50 dark:odd:bg-gray-100/5 dark:text-gray-300 '>
                                    <td className='px-5'>{i + 1 }</td>
                                    <td className='py-4 px-5'>{ data?.user?.name }</td>
                                    <td className='py-4 px-5'>{ data?.plan?.name }</td>
                                    <td className='py-4 px-5'>{ data?.user?.email }</td>
                                    <td className='py-4 px-5 text-nowrap'><span className="naira">N</span> { Number(data?.plan?.price)?.toLocaleString("En-US") }</td>
                                    <td className='py-3 px-5'>
                                        <div className='flex gap-2'>
                                            <span
                                                className='text-gray-700 dark:text-gray-300 border dark:border-gray-600/80 inline-flex justify-center items-center w-[40px] h-[40px] bg-white/80 dark:bg-white/10 hover:bg-transparent transition-all rounded-full p-1 cursor-pointer'
                                                onClick={() => {
                                                    setOldData(data);
                                                    setShowPlanModal(true);
                                                }}
                                            >
                                                <Pen size={28} />
                                            </span>
                                            {/* <span
                                                className='text-red-600 border dark:border-gray-600/80 inline-flex justify-center items-center w-[40px] h-[40px] bg-white/80 dark:bg-white/10 hover:bg-transparent transition-all rounded-full p-1 cursor-pointer'
                                                onClick={() => {
                                                    setOldData(data);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <Trash size={21} />
                                            </span> */}
                                        </div>
                                    </td>
                                </tr>
                            )) }
                            { ! data.length && <tr><td colSpan={6} className='p-8 text-center'>No data</td></tr> }
                            </tbody>
                        </table>
                    </div>
                </SplitLayout>
            </div>

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
