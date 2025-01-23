import BottomSubmit from "@/Components/BottomSubmit"
import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, useForm, usePage } from "@inertiajs/react"
import { useState } from "react"

function Start({ pay }) {

    const { post, data, setData, processing } = useForm({
        amount: 50
    });
    const [showModal, setShowModal] = useState(false);

    const message = usePage().props.flash;
    if (message.message) {
        window.location = message.message;
        return;
    }

    const submit = () => {
        post(route('paynow'), {

        })
    }

    return (
        <AuthenticatedLayout hideNav={true} headerText="Payment">
            <Head title="Deposit" />
            <form onSubmit={(e) => e.preventDefault()} className="p-3">
                <h4 className="text-lg">Payment amount:</h4>
                <div className="relative text-xl">
                    <span className="naira text-3xl absolute left-4 bottom-50 translate-y-1/2 z-10">N</span>
                    <TextInput
                        value={data.amount.toString()}
                        onChange={e => setData('amount', Number(e.target.value))}
                        className="w-full py-4 text-3xl ps-12 tracking-wider"
                        type="number"
                        min="50"
                    />
                </div>
                <BottomSubmit buttonText={'Proceed'} type={'button'} action={ () => setShowModal(true)} isFixed={true} disabled={processing} />
            </form>
            <Modal show={showModal} onClose={setShowModal}>
                <div className="flex flex-col gap-4">
                    <div className="text-center">Please confirm initiating deposit of:</div>
                    <h4 className="text-4xl text-center">
                        <span className="naira me-3 text-indigo-700 dark:text-amber-400">N</span>
                        { new Intl.NumberFormat().format(data.amount) }
                    </h4>
                    <div className="text-sm">
                        Please Note: <br />
                        <ul className="list-disc ms-4">
                            <li>You will be redirected to a third-party app to complete your payment. </li>
                            <li>Your wallet will immediately reflect your deposit upon confirmation of your payment. </li>
                        </ul>
                    </div>
                    <PrimaryButton onClick={() => submit()} className="w-full rounded-3xl" disabled={processing}>Pay</PrimaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Start
