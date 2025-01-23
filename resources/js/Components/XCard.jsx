import React from 'react'

function XCard({
  title, jumboText, className, children
}) {
  return (
    <div className={`relative select-none hover:scale-[0.99] transition-all z-0 border flex items-center overflow-hidden border-gray-200 dark:border-gray-800 bg-white/90 p-6 h-full w-full rounded-xl shadow-md dark:bg-gray-100/5 ${className}`}>
      <div className="text text-[5rem]">{ jumboText }</div>
      <div className="absolute bottom-0 left-0 right-0 tracking-wider py-3.5 px-6 backdrop-blur-sm bg-gray-100/50 dark:bg-gray-100/5">{ title }</div>
      <div className="absolute -z-10 text-gray-500 opacity-10 bottom-4 right-4">
        { children }
      </div>
    </div>
  )
}

export default XCard
