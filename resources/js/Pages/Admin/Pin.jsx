import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import TextInput from '@/Components/TextInput';
import { showErrorToast, showSuccessToast } from '@/toastService';
import { ToastContainer } from 'react-toastify';

export default function Dashboard({ auth }) {

  const { post, data, setData } = useForm({
    pin: ''
  });

  const numDigits = 4;

  const [pin, setPin] = useState(new Array(numDigits).fill(''));
  const refs = useRef([]);

  const handleChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;

    if (value && index < numDigits - 1) {
      refs.current[index + 1].focus();
    }

    setPin(newPin);
  };

  useEffect(() => {
    const pincode = pin.join('');
    if (pincode && pincode.length === 4) {
      setData('pin', pincode);
    }
  }, [pin]);

  useEffect(() => {

    if ( ! data?.pin || ! data?.pin?.length === 4) return; // Make sure PIN insertion is complete before submitting...

    post(route('admin.pin'), {
      onError: (err) => showErrorToast(err),
      onSuccess: () => showSuccessToast('Access granted<br />Logging you in...'),
    });
  }, [data?.pin]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      refs.current[index - 1].focus();
    }
    if (e.key === 'Enter' && e.target.value && index < numDigits - 1) {
      refs.current[index + 1].focus();
    }
  };

  return (
    <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-300'>
      <Head title="Admin verification" />
      <div className="h-dvh flex justify-center items-center text-xl px-4">
        <div className="w-full max-w-2xl flex flex-col gap-5 -mt-32">
          <div className="p-4 text-center">
            <h3 className='text-3xl mb-4'>Welcome <span className='text-indigo-600 dark:text-amber-400'>{auth.user.name.split(' ')[0] ?? ''}</span></h3>
            <div>Let's confirm it really is YOU</div>
          </div>

          <div className="border border-gray-200 shadow-md dark:border-gray-700 rounded-3xl bg-white/30 dark:bg-gray-50/5 px-4 py-6 text-center flex flex-col justify-center items-center gap-4">
            <h4>Enter your <span className='text-indigo-600 dark:text-amber-400'>PIN</span></h4>
            <div className="flex gap-3">
              {Array.from({length: numDigits}).map((_, i) => (
                <TextInput
                  className={'w-16 shadow-[0_0.5px_3px_-1px] rounded-2xl dark:shadow-none bg-gray-100/50 shadow-indigo-800 dark:shadow-amber-500 p-4 text-2xl text-center'}
                  key={i}
                  ref={ref => refs.current[i] = ref}
                  value={pin[i]}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(e, i)}
                  maxLength={1}
                  autoFocus={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
