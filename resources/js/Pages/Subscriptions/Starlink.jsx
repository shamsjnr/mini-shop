import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { Starlink as StarlinkIcon } from '@/Icons/OIcons'
import Earth from '@/../images/Earth.png'
import Dropdown from '@/Components/Dropdown'
import { ChevronRightRounded } from '@mui/icons-material'
import TextInput from '@/Components/TextInput'
import { showErrorToast } from '@/toastService'
import Modal from '@/Components/Modal'

function Starlink ({ plans }) {
    const { user } = usePage().props.auth;

    const { post, data, setData, processing } = useForm({
        type: 'personal',
        priority: '',
        kit_number: '',
        kit_email: '',
        kit_pass: '',
        kit_pass_confirmation: '',
    });

    const { put, data:email, setData:setEmail, processing:emailProcessing } = useForm({
        email: ''
    })

    const subType = data.type;
    const [price, setPrice] = useState(0);

    const handleMailUpdate = () => {
        put(route('profile.email'), {
            onError: (errs) => {
                showErrorToast(errs);
            }
        });
    }

    const handleSubmit = () => {
        post(route('starlink'), {
            onError: (errs) => {
                showErrorToast(errs);
            }
        })
    }

    const [showKitModal, setShowKitModal] = useState(false);

    return (
        <AuthenticatedLayout hideNav={true} headerText="Starlink">
            <Head title='Buy Starlink' />

            <div className='p-3 flex flex-col gap-2'>
                <div className='px-12 pt-8 pb-20'>
                    <div className={`fixed -left-[23%] -top-[22%] -right-[23%] transition-all duration-700 ${subType === 'personal' && '-rotate-[180deg]'}`}>
                        <img src={Earth} alt="Earth Grayed" className='w-full' />
                    </div>
                    <span className='relative left-1/2 -translate-x-1/4 inline-block'>
                        <StarlinkIcon size="12rem" />
                    </span>
                </div>
                <div className="grid grid-cols-2 mt-2 switch p-1 relative text-center bg-white/80 dark:bg-gray-50/10 rounded-[36px]">
                    <span className={`absolute top-2 bottom-2 transition-[left] ${subType === 'personal' ? 'left-2' : 'left-1/2'} w-[calc(50%_-_0.5rem)] bg-indigo-700 dark:bg-amber-400 rounded-3xl`}></span>
                    <span
                        className={`p-3 py-4 relative ${subType === 'personal' && 'text-gray-100 dark:text-gray-800'}`}
                        onClick={() => {
                            setPrice(0);
                            setData('type', 'personal');
                        }}
                    >Personal</span>
                    <span
                        className={`p-3 py-4 relative ${subType === 'business' && 'text-gray-100 dark:text-gray-800'}`}
                        onClick={() => {
                            setPrice(0);
                            setData('type', 'business');
                        }}
                    >Business</span>
                </div>
                <div className="flex justify-between items-baseline mt-4">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className='flex items-center gap-2 p-2 pb-0 ps-0'>
                                Priority
                                <span className='rotate-90'><ChevronRightRounded /></span>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content align='left' width='' contentClasses='bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg py-2'>
                        { subType === 'personal' ?
                        <>
                            {
                                plans?.personal?.map((plan, i) => (
                            <span
                                key={`per-${i}`}
                                className='p-3 block px-4 whitespace-nowrap hover:bg-indigo-100/80 dark:hover:bg-amber-200/5'
                                onClick={() => {
                                    setPrice(plan.price);
                                    setData('priority', plan.name);
                                }}
                            >
                                <span className="font-semibold">{ plan.name }</span><br />
                                <span className="naira">N</span> { Number(plan.price).toLocaleString() }
                            </span>
                                ))
                            }
                        </> :
                        <>
                        {
                            plans?.business?.map((plan, i) => (
                        <span
                            key={`per-${i}`}
                            className='p-3 block px-4 whitespace-nowrap hover:bg-indigo-100/80 dark:hover:bg-amber-200/5'
                            onClick={() => {
                                setPrice(plan.price);
                                setData('priority', plan.name);
                            }}
                        >
                            <span className="font-semibold">{ plan.name }</span><br />
                            <span className="naira">N</span> { Number(plan.price).toLocaleString() }
                        </span>
                            ))
                        }
                        </> }
                        </Dropdown.Content>
                    </Dropdown>
                    <div>
                        { price ? <><span className="text-2xl font-semibold"><span className='naira'>N</span> { Number(price).toLocaleString() }</span>/mo</> : '-' }
                    </div>
                </div>
                <div className="rounded-2xl bg-blue-200/80  dark:bg-blue-500/20 relative p-8 pb-12 shadow-md">
                    <div className="bg-white/80 dark:bg-indigo-950/95 absolute left-0 top-4 py-2 px-6 rounded-e-3xl">
                        Key Features
                    </div>
                    { subType === 'personal' &&
                    <ul className='leading-8 pt-10 ps-4'>
                        <li>Unlimited Data</li>
                        <li>Affordable Rate</li>
                        <li>Fixed Location</li>
                    </ul> }
                    { subType === 'business' &&
                    <ul className='leading-8 pt-10 ps-4'>
                        <li>Unlimited Standard Data</li>
                        <li>Public IP</li>
                        <li>Network Priority</li>
                        <li>Priority Support</li>
                    </ul> }
                    <PrimaryButton
                        className='absolute disabled:absolute disabled:before:opacity-0 w-full max-w-64 h-[60px] top-full left-1/2 shadow-md -translate-x-1/2 -translate-y-1/2'
                        onClick={() => setShowKitModal(true)}
                        disabled={ ! price}
                    >Proceed</PrimaryButton>
                </div>
            </div>
            {
            ( ! user.email || user.email.includes('@olimpia.ng') ) &&
            <div className="fixed bg-white/10 top-0 left-0 right-0 bottom-0 p-4 flex justify-center items-center">
                <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-[2px] z-[-1]"></div>
                <div className="bg-white/40 dark:bg-indigo-950/10 w-full p-4 pt-7 rounded-3xl shadow-lg border border-x-indigo-400 dark:border-x-amber-300 dark:text-gray-200 -mt-8 flex flex-col gap-3 backdrop-blur-xl">
                    <div>Please provide a valid email address that will be used to track and send updates about your subscription.</div>
                    <TextInput value={email.email} onChange={e => setEmail('email', e.target.value)} className="w-full" labelText={'Email address:'} required />
                    <PrimaryButton disabled={emailProcessing} onClick={handleMailUpdate}>Proceed</PrimaryButton>
                </div>
            </div>
            }
            <Modal show={showKitModal} onClose={setShowKitModal} maxWidth='md'>
                <h4 className='text-lg font-[500] mb-3'>Provide your Starlink kit credentials</h4>
                <span className="text-sm">
                    You will receive an OTP email from Starlink and we'll expect your feedback within 2 minutes of receiving these updates.
                </span>
                <div className="flex flex-col gap-3 pt-5">
                    <div className="group">
                        <TextInput
                            labelText="Kit Number:"
                            type="number"
                            min="1"
                            className="w-full"
                            value={data.kit_number}
                            onChange={e => setData('kit_number', e.target.value)}
                            required
                        />
                    </div>
                    <div className="group">
                        <TextInput
                            labelText="Kit Reg. Email:"
                            type="email"
                            className="w-full"
                            value={data.kit_email}
                            onChange={e => setData('kit_email', e.target.value)}
                            required
                        />
                    </div>
                    <div className="group">
                        <TextInput
                            labelText="Kit Reg. Password:"
                            type="password"
                            className="w-full"
                            value={data.kit_pass}
                            onChange={e => setData('kit_pass', e.target.value)}
                            required
                        />
                    </div>
                    <div className="group">
                        <TextInput
                            labelText="Confirm Kit Reg. Password:"
                            type="password"
                            className="w-full"
                            value={data.kit_pass_confirmation}
                            onChange={e => setData('kit_pass_confirmation', e.target.value)}
                            required
                        />
                    </div>
                    <PrimaryButton
                        className='w-full mt-3'
                        onClick={handleSubmit}
                        disabled={processing}
                    >Subscribe</PrimaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Starlink
