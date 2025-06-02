import React from 'react'
import images from '../../../constants/images'
import SiteStatisticsChart from '../../dashboard/components/SiteStatisticsChart'
import RideStatisticsChart from '../../dashboard/components/RideStatisticsChart'
import { BoxContainer } from '../component/BoxContainer'
import { useQuery } from '@tanstack/react-query'
import { fetchAnalytics } from '../../../queries/analytics/analytics'
import Loader from '../../../components/Loader'


const RiderMetrics: React.FC = () => {
  const {data:userAnalytics ,isLoading,error} = useQuery({
    queryKey: ['userAnalytics'],
    queryFn: () => fetchAnalytics('RiderAnalytics'),
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
        label: 'Riders',
        data: userAnalytics.monthlyUserCreated,
        backgroundColor: '#7e22ce',
        borderRadius: 6,
      },
    ],
  };
  const pieData = {
    labels: ['Total Rider', 'Active Rider', 'Inactive Rider'],
    datasets: [
      {
        data: userAnalytics.preData,
        backgroundColor: [
          '#818cf8', // blue for scheduled
          '#16a34a', // green for active
          '#dc2626', // red for completed
        ],
        borderWidth: 0,
      },
    ],
  };
  const pielabels = [
    {
      labelColor: '#818cf8',
      label: 'Total Rider'
    },
    {
      labelColor: '#16a34a',
      label: 'Active Rider'
    },
    {
      labelColor: '#dc2626',
      label: 'Inactive Rider'
    },
  ]
  
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-8 h-fit">
          <h2 className="text-2xl font-semibold  flex items-center gap-2 px-6 py-4 pb-2 rounded-t-md bg-gray-100">
            <img src={images.signal} alt="signal" className="w-6 h-6" />
            Rider Statistics
          </h2>
          <div className="p-4 pt-0 w-full h-[400px] overflow-hidden">
            <SiteStatisticsChart NotZoom={true} data={barData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-4 h-fit">
          <h2 className="text-2xl font-semibold  flex items-center gap-2 px-4 py-4 pb-2 rounded-t-md bg-gray-100">
            <img src={images.signal} alt="signal" className="w-6 h-6" />
            Rider Distribution
          </h2>
          <div className="p-4 pt-0 w-full mt-10 overflow-hidden">
            <RideStatisticsChart labels={pielabels} data={pieData} />
          </div>
        </div>
      </div>
      <BoxContainer data={userAnalytics.cardData} heading='Riders Metrics' />
    </div>
  )
}

export default RiderMetrics