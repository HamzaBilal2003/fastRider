import React from 'react'
import { BoxContainer } from '../component/BoxContainer'
import { technicalMetricsData } from '../../../constants/statisticsData'

const TechnicalMetrics : React.FC = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <BoxContainer heading='Technical Metrics' data={technicalMetricsData}/>
    </div>
  )
}

export default TechnicalMetrics