import { Head, useForm } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AdminLayout from '@/Layouts/AdminLayout';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import { showErrorToast, showSuccessToast } from '@/toastService';

export default function Edit({ mustVerifyEmail, status }) {

  const { data, setData, put, errors, processing, reset } = useForm({
    oldPin: '',
    newPin: '',
    newPin_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('admin.setPin'), {
      onError: (err) => {
        showErrorToast(err);
      },
      onSuccess: (data) => {
        showSuccessToast(data);
        reset();
      }
    });
  }

  return (
    <AdminLayout>
      <Head title="Profile" />

      <div className="flex flex-col gap-4 max-w-4xl">
        <div className="font-sansation rounded-2xl pt-5 flex justify-between">
          <h3 className='text-2xl text-amber-500 dark:text-amber-400'>Profile setttings</h3>
        </div>

        <div className="space-y-6 ">
          <div className="border shadow-md border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:shadow sm:rounded-2xl sm:p-8 bg-white/80 dark:bg-gray-100/5">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="border shadow-md border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:shadow sm:rounded-2xl sm:p-8 bg-white/80 dark:bg-gray-100/5">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="border shadow-md border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:shadow sm:rounded-2xl sm:p-8 bg-white/80 dark:bg-gray-100/5">
            <header>
              <h2 className="text-lg font-medium font-sansation text-amber-400 dark:text-secondary mb-3">Update PIN</h2>

              <p className="mt-1 text-sm dark:text-accent">
                  This is your two-step (4-character) verification method required to confirm your admin login.
              </p>
            </header>
            <form onSubmit={handleSubmit} className='mt-6 space-y-6 max-w-xl'>
              <div>
                <TextInput
                    labelText="Current PIN"
                    id="oldPin"
                    value={data.oldPin}
                    onChange={(e) =>
                        setData('oldPin', e.target.value)
                    }
                    type="password"
                    maxLength="4"
                    minLength="4"
                    className="block w-full"
                    required
                />
              </div>
              <div>
                <TextInput
                    labelText="New PIN"
                    id="newPin"
                    value={data.newPin}
                    onChange={(e) =>
                        setData('newPin', e.target.value)
                    }
                    type="password"
                    maxLength="4"
                    minLength="4"
                    size="4"
                    className="block w-full"
                    required
                />
              </div>
              <div>
                <TextInput
                    labelText="Confirm New PIN"
                    id="newPin_confirmation"
                    value={data.newPin_confirmation}
                    onChange={(e) =>
                        setData('newPin_confirmation', e.target.value)
                    }
                    type="password"
                    maxLength="4"
                    minLength="4"
                    className="block w-full"
                    required
                />
              </div>

              <div className="flex items-center gap-4">
                <PrimaryButton className="disabled:ps-12" disabled={processing}>Save</PrimaryButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
