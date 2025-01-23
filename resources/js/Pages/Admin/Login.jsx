import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        is_admin: true,
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        if ( ! data.email) {
            document.querySelector('#email').focus();
            return;
        } else if ( ! data.password) {
            document.querySelector('#password').focus();
            return;
        }

        post(route('login.store'), {
            onFinish: () => reset('password'),
        });
    };

    const [visiblePass, setVisiblePass] = useState(false);

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className='flex flex-col gap-4 mt-3 mb-5'>
                <div className='flex flex-col gap-5'>
                    <div>
                        <TextInput
                            labelText="Email address"
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div>
                        {/* <InputLabel htmlFor="password" value="Password" /> */}

                        <div className='relative'>
                            <TextInput
                                labelText="Password"
                                id="password"
                                type={ visiblePass ? 'text' : "password" }
                                name="password"
                                value={data.password}
                                className="block w-full"
                                autoComplete="off"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <span className='absolute top-1/2 -translate-y-1/2 right-0 py-2 px-3 cursor-pointer hover:text-gray-600 transition-all' onClick={ () => setVisiblePass(prev => !prev)}>
                                { visiblePass ? <VisibilityOff /> : <Visibility /> }
                            </span>
                        </div>

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>

                <div className="my-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
