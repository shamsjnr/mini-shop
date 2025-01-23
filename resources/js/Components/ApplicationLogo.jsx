import Logo from '@/../images/Logo.png';

export default function ApplicationLogo(props) {
    return (
        <div className='flex gap-4 items-center'>
            <img src={Logo} {...props} />
            <h3 className='text-3xl drop-shadow-[-1px_2px_0.5px_#1818ff] tracking-wider text-indigo-50'>Olimpia</h3>
        </div>
    );
}
