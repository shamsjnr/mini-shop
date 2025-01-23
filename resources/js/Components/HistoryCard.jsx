import dayjs from 'dayjs'
import React from 'react'

function HistoryCard({ status, title, date, amount, description }) {
  return (
    <div className='flex justify-between items-center mb-1 p-4 ps-3 bg-white/80 dark:bg-indigo-900/10 rounded-2xl shadow-sm backdrop-blur-sm'>
        <div className='flex gap-2 items-center'>
            {status === 'completed' &&
            <i className='text-green-700'>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 16 16"><path fill="currentColor" d="m11.334 2.064l.077.153l.576 1.533c.045.12.14.216.261.261l1.48.556c.65.243.999.937.826 1.594l-.042.13l-.688 1.523a.45.45 0 0 0 0 .37l.654 1.44a1.34 1.34 0 0 1-.544 1.71l-.153.077l-1.533.576a.45.45 0 0 0-.26.261l-.556 1.48a1.34 1.34 0 0 1-1.595.826l-.13-.042l-1.523-.688a.45.45 0 0 0-.37 0l-1.439.654a1.34 1.34 0 0 1-1.71-.544l-.077-.153l-.577-1.533a.45.45 0 0 0-.261-.26l-1.48-.556a1.34 1.34 0 0 1-.826-1.595l.042-.13l.689-1.523a.45.45 0 0 0 0-.37L1.52 6.375a1.34 1.34 0 0 1 .543-1.71l.153-.077L3.75 4.01a.45.45 0 0 0 .261-.261l.556-1.48a1.34 1.34 0 0 1 1.594-.826l.13.042l1.523.689a.45.45 0 0 0 .37 0l1.44-.654a1.34 1.34 0 0 1 1.71.543m-1.17 3.641l-3.187 3.64l-1.162-1.162a.447.447 0 0 0-.632.632l1.5 1.5a.447.447 0 0 0 .652-.022l3.5-4a.447.447 0 0 0-.672-.588"/></svg>
            </i>}
            {status === 'pending' &&
            <i className='text-amber-500 dark:text-amber-400'>
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray="2 4" strokeDashoffset={6} d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"></animate></path><path strokeDasharray={32} strokeDashoffset={32} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0"></animate></path><path strokeDasharray={10} strokeDashoffset={10} d="M12 16v-7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"></animate></path><path strokeDasharray={6} strokeDashoffset={6} d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"></animate></path></g></svg>
            </i>}
            { ! status &&
            <i className='text-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12.75 11.38V6h-1.5v6l4.243 4.243l1.06-1.06zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"/></svg>
            </i>}
            <div className='flex flex-col gap-1'>
                <span className="font-semibold">{ title }</span>
                <span className='text-xs'>{ dayjs(date).format('DD MMMM, YYYY') }</span>
            </div>
        </div>
        <div className='flex flex-col gap-1 justify-end text-end'>
            <span className='font-semibold'><span className="line-through decoration-double">N</span> { new Intl.NumberFormat().format(amount) }</span>
            <span className='text-xs'>{ description }</span>
        </div>
    </div>
  )
}

export default HistoryCard
