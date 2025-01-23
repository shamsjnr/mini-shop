import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            headerText={'Profile Settings'}
        >
            <Head title="Profile" />

            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white/70 p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-300/5 backdrop-blur-sm">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white/70 p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-300/5 backdrop-blur-sm">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800/50 backdrop-blur-sm">
                    <DeleteUserForm className="max-w-xl" />
                </div> */}
            </div>
        </AuthenticatedLayout>
    );
}