import { Link } from "@inertiajs/react"


function BottomLink({ text, isActive, link, classes, children, ...props }) {
    const Content = () => {
        return (
            <div className={`flex flex-col justify-center items-center p-3 ${classes}`}>
                <i className={`block ${isActive ? 'bg-purple-500/40 p-1.5 mb-0.5 ring-2 dark:ring-0 ring-purple-300 rounded-full' : 'mb-1'}`}>
                    { children }
                </i>
                { text }
            </div>
        );
    }

    return ( link ? <Link href={route(link)} {...props}> <Content /> </Link> : <span {...props}><Content /></span> );
}

export default BottomLink
