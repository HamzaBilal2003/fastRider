import React from 'react'
import { BoxContainer } from '../component/BoxContainer'
import {  marketData } from '../../../constants/statisticsData'

const MarketingMetrics : React.FC = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <BoxContainer heading='Marketing Metrics' data={marketData}/>
    </div>
  )
}

export default MarketingMetrics