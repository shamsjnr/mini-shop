import background from './../../images/bg-light.png';
// import LoginImg from '@/../images/Login-pana.png';
import LoginImg from '@/../images/fore-ground.jpg';

export default function GuestLayout({ children }) {
    return (
        <div className="h-dvh overflow-hidden relative bg-gray-100 sm:pt-0 dark:bg-gray-900" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className='fixed top-0 right-0 left-0 bottom-0 -z-0 bg-gray-50/80 dark:bg-gray-900/90'></div>
            <div className='absolute flex justify-center bg-gray-200/5 min-h-[60vh] w-full'>
                { (route().current('login') || route().current('admin.login')) &&
                <div>
                    <img src={LoginImg} alt="Login Image" className='dark:mix-blend-soft-light' />
                </div>
                }
            </div>
            <div className='
                absolute bottom-0
                shadow-2xl w-full
                rounded-t-3xl pb-12 pt-6
                bg-gradient-to-b
                from-white/40 to-white/95
                dark:from-gray-900/20 dark:to-gray-900/40
                backdrop-blur-md
                flex flex-col items-center sm:justify-center'
            >
                <div className="w-full overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg dark:text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
