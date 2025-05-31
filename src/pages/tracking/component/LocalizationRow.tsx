import React from 'react'
import images from '../../../constants/images';

interface Props {
    displayData: {
        id: number;
        country: string;
        state: string;
    };
    onDelete?: (del: any) => void;
    onEdit?: (edit: any) => void;
}

const LocalizationRow: React.FC<Props> = ({
    displayData,
    onDelete,
    onEdit,
}) => {

    const handleEdit = () => {
        onEdit?.(displayData);
    };

    const handleDelete = () => {
        onDelete?.(displayData);
    };

    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative">
            <td className="p-2 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2">{displayData.country}</td>
            <td className="p-2">{displayData.state}</td>
            <td className="p-2">
                <div className="flex items-center gap-2">
                    <button onClick={handleEdit} className="cursor-pointer p-2 border border-gray-200 rounded-md">
                        <img src={images.editBlack} alt="edit admin" className="size-[20px]" />
                    </button>
                    <button onClick={handleDelete} className="cursor-pointer p-2 border border-gray-200 rounded-md">
                        <img src={images.delBlack} alt="edit admin" className="size-[20px]" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default LocalizationRow;