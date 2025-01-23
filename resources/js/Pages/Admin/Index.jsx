import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import XCard from '@/Components/XCard';
import StatusTag from '@/Components/StatusTag';
import { List, Starlink, Users } from '@/Icons/OIcons';

export default function Dashboard({ counts, recents }) {

  return (
    <AdminLayout>
      <Head title="Dashboard" />

      <div className="flex flex-col gap-4">
        <div className="font-sansation rounded-2xl pt-5 justify-between hidden sm:flex">
          <h3 className='text-2xl text-amber-500 dark:text-amber-400'>Dashboard</h3>
        </div>
        <div className="h-[calc(100vh_-_90px)] grid sm:grid-rows-[200px_1fr] gap-6 py-2">
          <div className='flex gap-4 sm:flex-row overflow-auto pb-3'>
            <XCard className={'min-w-full sm:min-w-min sm:w-full'} title={'Total number of users'} jumboText={counts?.users}>
              <Users size={160} />
            </XCard>
            <XCard className={'min-w-full sm:min-w-min sm:w-full'} title={'Pending Starlink Subscriptions'} jumboText={counts?.starlink || 0}>
              <Starlink size={180} />
            </XCard>
            <XCard className={'min-w-full sm:min-w-min sm:w-full'} title={'Transactions this month'} jumboText={counts?.transactions || 0}>
              <List size={140} />
            </XCard>
          </div>

          <div className='w-full overflow-auto'>
            <h4 className='text-xl drop-shadow-xl mt-4'>Recent Transactions</h4>
            <div className="overflow-hidden h-[calc(100%_-_60px)] mt-3 bg-white/80 dark:bg-transparent border border-gray-200 dark:border-gray-800">
              <div className='overflow-auto max-h-full pb-4'>
                <table className='w-full rounded-lg' id='dtx'>
                  <thead>
                    <tr className='text-nowrap *:bg-white/10 dark:*:bg-black/5 *:backdrop-blur-lg'>
                      <th className='py-3 px-5 sticky top-0 text-left font-[500] w-6'>#</th>
                      <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Type</th>
                      <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Customer</th>
                      <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Email</th>
                      <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Date</th>
                      <th className='py-3 px-5 sticky top-0 text-left font-[500]'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  { recents?.map((data, i) => {
                    const options = {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    };
                    const dated = new Date(data.created_at)?.toLocaleDateString('en-US', options);
                    let status = data?.status?.toLowerCase();
                    status = status === 'completed' ? 'success' : (status === 'pending' ? 'warning' : 'danger');
                    return (
                    <tr key={`rec-${i}`} className='border-b dark:border-gray-300/10 hover:bg-gray-300/15 dark:hover:bg-gray-300/5 last:border-transparent odd:bg-gray-200/50 dark:odd:bg-gray-100/5 dark:text-gray-300 '>
                      <td className='px-5'>{i + 1 }</td>
                      <td className='py-4 px-5'>{ data?.statement }</td>
                      <td className='py-4 px-5'><span className='inline-block w-[120px] text-ellipsis overflow-hidden'>{ data?.user?.name }</span></td>
                      <td className='py-4 px-5'><span className='inline-block w-[160px] hover:w-auto text-ellipsis overflow-hidden'>{ data?.user?.email }</span></td>
                      <td className='py-4 px-5 text-nowrap'>{ dated || '-' }</td>
                      <td className='py-4 px-5'><StatusTag status={status}>{ data?.status?.toLowerCase() }</StatusTag></td>
                    </tr>
                    )
                  }) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
