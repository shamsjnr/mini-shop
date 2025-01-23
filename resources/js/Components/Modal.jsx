import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

export default function Modal({
  children,
  onClose,
  centered,
  show = false,
  maxWidth = '2xl',
  closeable = true,
  showClose = true
}) {
  const close = () => {
    if (closeable) {
      onClose(false);
    }
  };

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-3xl',
  }[maxWidth];

  return (
    <Transition show={show} leave="duration-200">
      <Dialog
        as="div"
        className={`fixed top-0 left-0 right-0 bottom-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm dark:backdrop-blur-md z-50 transform overflow-y-auto px-4 ${ centered ? 'flex items-center' : 'py-12' } transition-all sm:px-0`}
        onClose={close}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0" onClick={close} />
        </TransitionChild>

        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className={`relative sm:mx-auto sm:w-full ${maxWidthClass}`}>
            { showClose && <span className="bg-indigo-600 dark:bg-amber-400 text-white dark:text-gray-800 z-10 text-[2rem] cursor-pointer w-[32px] h-[32px] flex justify-center items-center rounded-full absolute top-2 right-2" onClick={close}>&times;</span> }
            <DialogPanel
              className={`p-6 bg-white/80 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200 relative transform rounded-xl border dark:border-none border-white dark:shadow-sm dark:shadow-amber-300 transition-all`}
            >
              {children}
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
