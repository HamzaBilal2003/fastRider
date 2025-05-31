import React from 'react'
import { BoxContainer } from '../component/BoxContainer'
import {  geoData } from '../../../constants/statisticsData'

const GeographicMetrics: React.FC  = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <BoxContainer heading='Geographic Metrics' data={geoData}/>
    </div>
  )
}

export default GeographicMetrics