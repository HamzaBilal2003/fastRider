import React from 'react'
import { BoxContainer } from '../component/BoxContainer'
import { useQuery } from '@tanstack/react-query'
import { fetchAnalytics } from '../../../queries/analytics/analytics'
import Loader from '../../../components/Loader'


const SatisfactionMetrics: React.FC = () => {
  const {data:userAnalytics ,isLoading,error} = useQuery({
    queryKey: ['userAnalytics'],
    queryFn: () => fetchAnalytics('CustomerAnalytics'),
  });
  if (isLoading) return <Loader/>
  if (error) {
    console.error('Error fetching user analytics:', error);
    return <div className="text-red-500 text-center">Failed to load user metrics.</div>;
  }
  return (
    <div className='flex flex-col gap-6 p-6'>
      <BoxContainer data={userAnalytics.cardData} heading='Customers Metrics' />
    </div>
  )
}

export default SatisfactionMetrics