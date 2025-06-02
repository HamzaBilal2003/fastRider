import React from 'react'
import images from '../../../constants/images'
import SiteStatisticsChart from '../../dashboard/components/SiteStatisticsChart'
import { BoxContainer } from '../component/BoxContainer'
import { useQuery } from '@tanstack/react-query'
import { fetchAnalytics } from '../../../queries/analytics/analytics'
import Loader from '../../../components/Loader'


const RevenueMetrics: React.FC = () => {
  const {data:userAnalytics ,isLoading,error} = useQuery({
    queryKey: ['userAnalytics'],
    queryFn: () => fetchAnalytics('RevenueAnalytics'),
  });
  if (isLoading) return <Loader/>
  if (error) {
    console.error('Error fetching user analytics:', error);
    return <div className="text-red-500 text-center">Failed to load user metrics.</div>;
  }
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: userAnalytics.monthlyUserCreated,
        backgroundColor: '#7e22ce',
        borderRadius: 6,
      },
    ],
  };
  
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-8 h-fit">
          <h2 className="text-2xl font-semibold  flex items-center gap-2 px-6 py-4 pb-2 rounded-t-md bg-gray-100">
            <img src={images.signal} alt="signal" className="w-6 h-6" />
            Revenue Statistics
          </h2>
          <div className="p-4 pt-0 w-full h-[400px] overflow-hidden">
            <SiteStatisticsChart NotZoom={true} data={barData} />
          </div>
        </div>
      </div>
      <BoxContainer data={userAnalytics.cardData} heading='Revenue Metrics' />
    </div>
  )
}

export default RevenueMetrics