const StatusTag = ({ status, children, ...props }) => {
  return (
    <span className={`
        rounded-xl
        py-1.5 px-2.5 pe-3
        flex items-center gap-2
        font-semibold tracking-wide
        w-fit
        ${ status === 'success' && 'bg-green-500/20 dark:bg-green-600/15 text-green-700' }
        ${ status === 'warning' && 'bg-yellow-500/20 text-yellow-600' }
        ${ status === 'danger' && 'bg-red-500/10 text-red-600' }`
    }> {children} </span>
  )
}

export default StatusTag
