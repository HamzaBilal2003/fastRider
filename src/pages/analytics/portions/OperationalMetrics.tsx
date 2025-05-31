import React from 'react'
import { BoxContainer } from '../component/BoxContainer'
import { operationalMetricsData } from '../../../constants/statisticsData'

const OperationalMetrics  : React.FC = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <BoxContainer heading='Operational Metrics' data={operationalMetricsData}/>
    </div>
  )
}

export default OperationalMetrics