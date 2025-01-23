import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Logout, Power } from "@/Icons/OIcons";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({ children }) {
  const user = usePage().props.auth.user;

  const [showingNavigation, setShowingNavigation] = useState(false);

  return (
    <>
      <div className="h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-300 sm:grid sm:grid-cols-[300px_1fr] overflow-auto">
        <nav className="dark:bg-primary sm:h-full sticky top-0 z-50">
          <div className="sm:py-2 h-full">
            <div className="flex sm:flex-col justify-between h-full bg-white/70 dark:bg-gray-900/80 shadow-lg dark:sm:border-r dark:border-gray-700 relative">
              <div className="flex sm:flex-col sm:p-6 font-sansation w-full">
                <div className="flex w-full items-center ps-4 h-[72px] relative z-[1] sm:h-auto sm:ps-0 sm:mb-4 backdrop-blur-md sm:border-b dark:sm:border-b-2 border-gray-150 dark:border-gray-800 sm:pb-6">
                  <ApplicationLogo width={46} />
                </div>

                <div className={`
                    ${showingNavigation ? 'translate-y-0 shadow-2xl opacity-100' : '-translate-y-[120%] opacity-0'}
                    sm:translate-y-0
                    sm:opacity-100
                    sm: shadow-none
                    absolute top-[68px] left-0 right-0
                    sm:static
                    py-4 px-5 sm:p-0
                    bg-white/70 dark:bg-gray-900/80 sm:bg-transparent
                    backdrop-blur-md
                    flex flex-col
                    transition-all origin-top
                `}>
                    <NavLink href={route("admin.index")} active={ route().current("admin.index") }>Dashboard</NavLink>
                    <NavLink href={route("admin.plans")} active={ route().current("admin.plans") || route().current("admin.plans.isp") }>Data Plans</NavLink>
                    <NavLink href={route("admin.starlink")} active={ route().current("admin.starlink") }>Starlink Plans</NavLink>
                    <NavLink href={route("admin.starlink.subscriptions")} active={ route().current("admin.starlink.subscriptions") }>Starlink Subscriptions</NavLink>
                    <NavLink href={route("admin.profile")} active={ route().current("admin.profile") }>Profile</NavLink>
                    <div className="sm:px-6 flex gap-2 justify-between items-center sm:hidden pt-4 pb-2 border-t dark:border-gray-300/20">
                        <div className="flex gap-2 items-center font-roboto">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&rounded=true&background=5171A599&color=FFFFFF`}
                                style={{ width: "32px" }}
                                alt={user.name}
                            />
                            <span>{user.name}</span>
                        </div>
                        <Link
                            href={route("logout")}
                            as="button"
                            className="hover:bg-gray-100 w-fit flex items-center gap-2 py-1 pe-4 transition-all text-red-700 drop-shadow-sm"
                        >
                            <Logout size={28} />
                        </Link>
                    </div>
                </div>
              </div>

              <div className="hidden sm:px-6 sm:flex gap-4 sm:absolute bottom-0 pb-8 left-0 right-0">
                <div className="flex gap-4 items-center font-roboto">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&rounded=true&background=5171A599&color=FFFFFF`}
                    style={{ width: "48px" }}
                    alt={user.name}
                  />
                  <span>{user.name}</span>
                </div>
                <Link
                    href={route("logout")}
                    as="button"
                    className="hover:bg-gray-100 w-fit rounded-full flex justify-center items-center gap-2 p-3 transition-all text-red-700 drop-shadow-sm"
                >
                    <Power size={28} />
                </Link>
              </div>
              <div className="flex items-center sm:hidden font-roboto">
                <button
                  onClick={() =>
                    setShowingNavigation(
                      (previousState) => !previousState
                    )
                  }
                  className="inline-flex fixed z-10 top-5 right-5 sm:none items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={`${ showingNavigation ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}`}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <section className="p-2 sm:p-6 sm:py-2 overflow-auto">
          <main className="font-roboto px-2 sm:px-0">
            {children}
          </main>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}
