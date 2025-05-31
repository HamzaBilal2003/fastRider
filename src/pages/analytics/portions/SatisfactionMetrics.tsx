import React from 'react'
import { BoxContainer } from '../component/BoxContainer'
import { customerSatisfactionMetricsData } from '../../../constants/statisticsData'

const SatisfactionMetrics : React.FC = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <BoxContainer heading='Customer Satisfaction Metrics' data={customerSatisfactionMetricsData}/>
    </div>
  )
}

export default SatisfactionMetrics