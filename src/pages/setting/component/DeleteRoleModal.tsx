import React from 'react';
import { X } from 'lucide-react';

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roleName: string;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  roleName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004c] bg-opacity-50 flex items-center justify-center p-6 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative shadow-xl animate-slideIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Delete Role</h2>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the role <span className="font-medium text-gray-900">"{roleName}"</span>? 
          This action cannot be undone.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal;