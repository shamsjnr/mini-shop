import { Link } from "@inertiajs/react"

const SplitLayout = ({ links, hideOnSmall, maxW='', children }) => {

    return (
        <div className="h-[calc(100vh_-_90px)] grid sm:grid-cols-[1fr_240px] gap-4 py-2">
            <div className={`h-full overflow-auto ${ maxW || 'max-w-4xl'}`}>
                { children }
            </div>
            <div className={`flex flex-col gap-2 ${hideOnSmall && 'hidden sm:flex'} `}>
            { links?.map((link, i) => {
                const href = ( ! link.params ? route(link.href) : route(link.href, link.params));
                const param = Object.values(route().params)[0] ?? '';
                const statusClass = (( ! route().routeParams && ! link.params) || param === link.text)
                    ? 'bg-indigo-100 dark:bg-indigo-100/10 text-indigo-800 dark:text-amber-500'
                    : 'bg-gray-50/80 dark:bg-indigo-950/20';

                return (
                <Link
                    key={`link-${i}`}
                    href={ href }
                    className={`w-full py-3 px-5 rounded text-[.9em] ${statusClass}`}
                >
                    { link.text }
                </Link>
                )
            })}
            </div>
        </div>
    );
}

export default SplitLayout
