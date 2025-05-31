import React from 'react'
import { formatCreatedAt } from '../../../constants/help';

interface props {
    displayData: {
        id?: number;
        activity: string;
        created_at: string;
    };
    // index: number;
}


const ActivityRow: React.FC<props> = ({ displayData }) => {
    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2 py-4">{displayData.activity}</td>
            <td className="p-2 py-4">{formatCreatedAt(displayData.created_at)}</td>
        </tr>
    )
}

export default ActivityRow