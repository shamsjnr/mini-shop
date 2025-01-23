import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import TextInput from '@/Components/TextInput'
import { showErrorToast } from '@/toastService'
import Modal from '@/Components/Modal'
import MTN from '@/../images/MTN.png';
import Glo from '@/../images/Glo.png';
import Airtel from '@/../images/Airtel.png';
import NineMobile from '@/../images/9Mobile.png';
import { Button } from '@headlessui/react'
import { Olimpia } from '@/Icons/OIcons'

function Data ({ isps, plans }) {

    const { post, data, setData, processing } = useForm({
        isp: 'MTN',
        phone: '',
        data_plan: null
    });

    const logos = [
        { name: "MTN", logo: MTN, bg: 'bg-amber-400/20 dark:bg-gray-100/5 [&>img]:max-h-[60px]', accent:'bg-amber-300/30'},
        { name: "Glo", logo: Glo, bg: 'bg-green-600/20 dark:bg-gray-100/5', accent:'bg-green-600/30'},
        { name: "Airtel", logo: Airtel, bg: 'bg-red-400/10 dark:bg-gray-100/5 [&>img]:max-h-[62px]', accent:'bg-red-400/30'},
        { name: "9Mobile", logo: NineMobile, bg: 'bg-green-400/15 dark:bg-gray-100/5', accent:'bg-green-400/20'},
    ];

    const [selected, setSelected] = useState(null);

    const handleSubmit = () => {
        post(route('buy.data'), {
            onError: (errs) => {
                showErrorToast(errs);
            }
        })
    }

    useEffect(() => {
        setData('data_plan', null);
    }, [data.isp]);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    return (
        <AuthenticatedLayout hideNav={true} headerText="Data Plan">
            <Head title='Buy Data' />

            <div className="grid grid-cols-4 gap-3 px-3 pb-4">
            { logos?.map((isp, i) => (
                <div
                    key={`isp-${i}`}
                    className={`
                        w-full relative
                        border dark:border-gray-100/10
                        flex justify-center items-center
                        p-2 rounded-2xl
                        ${isp.bg}
                    `}
                    onClick={() => {
                        setData('isp', isp.name);
                        setSelected(i);
                    }}
                >
                    <span className={`
                        absolute top-2 right-2
                        w-4 h-4 rounded-full
                        transition-all border-2
                        ${ data.isp !== isp.name ?
                            'border-indigo-700/20 bg-white/30 dark:bg-gray-800/80' :
                            'bg-indigo-600 border-transparent dark:bg-amber-500 dark:border-gray-800/20 w-4 h-4 border-0 shadow-[0_0_6px_rgba(255,255,255,.15)_inset]'
                        }
                    `}></span>
                    <img src={ isp.logo } className='w-16 max-h-16 rounded-full' />
                </div>
            ))}
            </div>
            <div className='flex flex-col gap-4 bg-white/60 dark:bg-gray-800/20 px-5 py-6 rounded-2xl shadow-xl'>
                <div className='group'>
                    <TextInput
                        labelText="Receiver's Phone Number:"
                        type="tel"
                        className="w-full"
                        value={data.phone}
                        maxLength="11"
                        onChange={e => setData('phone', e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                { plans.map((plan, i) => ( data.isp === plan.isp.name &&
                    <div
                        key={`plan-${i}`}
                        onClick={() => setData('data_plan', plan.id)}
                        className={`
                            relative
                            min-w-16 py-4 px-5
                            flex flex-col justify-center items-center grow
                            rounded-xl transition-all
                            font-semibold text-lg
                            text-gray-600 dark:text-gray-300
                            border border-white dark:border-gray-800/80
                            shadow-sm dark:shadow-black/50
                            cursor-pointer
                            overflow-hidden
                        `}
                    >
                        <i className='absolute -bottom-8 -right-2 text-indigo-600/15'><Olimpia size={140} /></i>
                        <span className={`absolute top-0 right-0 bottom-0 left-0 ${ selected !== null && Number(data.data_plan) !== plan.id && logos[selected].accent }`}></span>
                        <span className='text-sm relative'>{ plan.term } Day</span>
                        <div className='text-3xl relative'>{ plan.name }</div>
                        <span className='relative'><span className="naira">N</span> {Number(plan.price - plan.discount).toLocaleString()}</span>
                    </div>
                )) }
                </div>
                <div className="fixed bottom-0 left-0 right-0 px-4 pb-5 pt-4">
                    <PrimaryButton
                        className='w-full'
                        onClick={handleSubmit}
                        disabled={processing}
                    >Proceed</PrimaryButton>
                </div>
            </div>
            <Modal show={showConfirmModal} onClose={setShowConfirmModal} maxWidth='md'>
                <h4 className='text-lg font-[500] mb-3'>Hey !!</h4>
                <div className="text-md text-center">
                    This is the first time you are purchasing airtime for this contact <br /><br />Click OK to Proceed
                </div>
                <div className="flex gap-3 pt-5">
                    <Button
                        className='w-full mt-3 border rounded-3xl'
                        onClick={() => setShowConfirmModal(false)}
                    >Cancel</Button>
                    <PrimaryButton
                        className='w-full mt-3 text-[1em] font-normal'
                        onClick={handleSubmit}
                        disabled={processing}
                    >OK</PrimaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Data
