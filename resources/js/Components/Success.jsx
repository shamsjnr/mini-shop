import React, { useState } from 'react'

function Success({ message, ...props }) {

    const [show, setShow] = useState(true);

    return ( show &&
        <div className='fixed top-0 z-50 right-0 left-0 bottom-0 flex justify-center items-center p-5 backdrop-blur-md bg-white/80 dark:bg-gray-800/80'>
            <div className="rounded-2xl text-lg bg-white/50 dark:bg-gray-800/20 flex flex-col gap-4 overflow-hidden w-full p-4 items-center">
                <span className='text-indigo-800 dark:text-amber-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={120} height={120} viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.403 1.403l.083.094l2 2l.094.083a1 1 0 0 0 1.226 0l.094-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32"></path></svg>
                </span>
                <h4 className='text-3xl font-semibold tracking-wider'>Success</h4>
                <div className='text-center' dangerouslySetInnerHTML={{__html: message}} />
                <span onClick={() => setShow(false)} className='p-4 rounded-[3rem] font-semibold tracking-wider bg-indigo-700 text-white w-full text-center'>Continue</span>
            </div>
        </div>
    )
}

export default Success
