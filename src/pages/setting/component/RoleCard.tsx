import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Role } from '../../../queries/role/role';

interface RoleCardProps {
  role: Role;
  onEdit: (roleId: number) => void;
  onDelete: (roleId: number) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEdit = () => {
    onEdit(role.role_id);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete(role.role_id);
    setMenuOpen(false);
  };

  return (
    <div className="flex items-center space-x-2 py-2">
      <span className="font-medium truncate">{role.role_name}</span>
      <div className="relative">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Role options"
        >
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <div 
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50 animate-fadeIn"
            onBlur={() => setMenuOpen(false)}
          >
            <button
              className="flex items-center space-x-2 px-4 py-3 w-full hover:bg-gray-50 text-left rounded-t-lg transition-colors"
              onClick={handleEdit}
            >
              <Edit2 size={16} className="text-blue-600" />
              <span>Edit Role</span>
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-3 w-full hover:bg-gray-50 text-left rounded-b-lg transition-colors"
              onClick={handleDelete}
            >
              <Trash2 size={16} className="text-red-600" />
              <span className="text-red-600">Delete Role</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleCard;