import React from 'react'
import HorizontalAlign from '../../components/HorizontalAlign'
import ItemGap from '../../components/ItemGap'
import Button from '../../components/buttons/Button'
import Dropdown from '../../components/Dropdown'
import { DateDropOptions, tierStatus } from '../../components/FilterData'
import TableCan from '../../components/TableCan'

const TierManagement  : React.FC = () => {
    const handleDetailsClick = (e: any) => {
        console.log(e)
    }
    return (
        <>
            <div className="bg-white">
                <HorizontalAlign havsShadow={true}>
                    <h1 className="text-2xl font-semibold px-6"><span className='text-black/50'>Rider Management</span> / Tier Mangement</h1>
                    <div className="px-6">
                        <Dropdown
                            options={DateDropOptions}
                            onChange={handleDetailsClick}
                            placeholder="This Week"
                            position="right-0"
                        />
                    </div>
                </HorizontalAlign>
            </div>
            <div className="p-6 flex flex-col gap-6">
                <HorizontalAlign>
                    <ItemGap>
                        <Dropdown
                            options={DateDropOptions}
                            onChange={handleDetailsClick}
                            placeholder="Period"
                            position="right-0"
                        />
                        <Dropdown
                            options={tierStatus}
                            onChange={handleDetailsClick}
                            placeholder="Period"
                            position="right-0"
                        />
                    </ItemGap>
                    <Button>
                        Add New
                    </Button>
                </HorizontalAlign>
                <TableCan
                    heading='Tiers'
                    showHeading={true}
                    headerTr={['Tier Number', 'no of riders', 'commission', 'tier amount', 'date created', 'status', 'action']}
                    dataTr={[]}
                    TrName={() => null}
                />
            </div>
        </>

    )
}

export default TierManagement