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
        phone: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        if ( ! data.phone) {
            document.querySelector('#phone').focus();
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

            <form onSubmit={submit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-5'>
                    <div>
                        {/* <InputLabel htmlFor="phone" value="Phone number" /> */}

                        <TextInput
                            labelText="Phone number"
                            id="phone"
                            type="tel"
                            maxLength="11"
                            name="phone"
                            value={data.phone}
                            className="block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setData('phone', e.target.value)}
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

                <div className="mt-1 flex justify-end">
                    {/* <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label> */}

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-red-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="my-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <span className='text-sm'>Don't have an account?</span>
                    <Link href={route('register')} className="text-purple-700 border-b border-purple-500 inline-block p-2" disabled={processing}>
                        Sign up now
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
