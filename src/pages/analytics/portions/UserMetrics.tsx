import React from 'react'
import images from '../../../constants/images'
import SiteStatisticsChart from '../../dashboard/components/SiteStatisticsChart'
import RideStatisticsChart from '../../dashboard/components/RideStatisticsChart'
import { BoxContainer } from '../component/BoxContainer'
import { boxData } from '../../../constants/statisticsData'
const UserMetrics : React.FC = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-8 h-fit">
          <h2 className="text-2xl font-semibold  flex items-center gap-2 px-6 py-4 pb-2 rounded-t-md bg-gray-100">
            <img src={images.signal} alt="signal" className="w-6 h-6" />
            Users Statistics
          </h2>
          <div className="p-4 pt-0 w-full h-[400px] overflow-hidden">
            <SiteStatisticsChart />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-4 h-fit">
          <h2 className="text-2xl font-semibold  flex items-center gap-2 px-4 py-4 pb-2 rounded-t-md bg-gray-100">
            <img src={images.signal} alt="signal" className="w-6 h-6" />
            Ride Statistics
          </h2>
          <div className="p-4 pt-0 w-full mt-10 overflow-hidden">
            <RideStatisticsChart />
          </div>
        </div>
      </div>

      <BoxContainer data={boxData} heading='User Metrics' />
    </div>
  )
}

export default UserMetrics