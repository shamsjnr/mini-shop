import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { showErrorToast, showSuccessToast } from "@/toastService";
import { useForm } from "@inertiajs/react"

const Plan = ({ oldData, isps, setOpen = () => {} }) => {

    const { data, setData, processing, post, put } = useForm({
        isp: oldData?.isp?.name || '',
        name: oldData?.name || '',
        term: oldData?.term || '30',
        price: oldData?.price || 0,
        discount: oldData?.discount || 0
    });

    const options = {
        onError: (err) => {
            showErrorToast(err);
        },
        onSuccess: (ev) => {
            showSuccessToast(ev);
            setOpen(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( ! oldData?.id )
            post(route('admin.plans'), options);
        else
            put(route('admin.plans.update', [oldData.id]), options);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="pb-4 text-lg">{ oldData?.id ? 'Update' : 'Create New' } Plan</h4>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="form-group">
                    <SelectInput
                        labelText="Service Provider:"
                        className="w-full"
                        keys="name"
                        values="name"
                        value={data.isp}
                        options={isps}
                        onChange={e => setData('isp', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        labelText="Plan Name:"
                        className="w-full"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        labelText="Duration (in Days):"
                        type="number"
                        min="1"
                        className="w-full"
                        value={data.term}
                        onChange={e => setData('term', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        labelText="Price:"
                        type="number"
                        className="w-full"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        min={0}
                        required
                    />
                </div>
            </div>
            <PrimaryButton className="disabled:ps-12" disabled={processing}>Submit</PrimaryButton>
        </form>
    )
}

export default Plan
