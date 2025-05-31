import React, { useState } from 'react';
import {  MoreVertical, Edit2, Trash2, ChevronRight } from 'lucide-react';
import AddRoleModal from '../component/AddRoleModal';
import SearchFilter from '../../../components/SearchFilter';
import HorizontalAlign from '../../../components/HorizontalAlign';

interface Permission {
  id: string;
  name: string;
  key: string;
  hasChildren?: boolean;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

const mockPermissions: Permission[] = [
  { id: '1', name: 'Dashboard', key: 'dashboard', hasChildren: true },
  { id: '2', name: 'Create', key: 'create' },
  { id: '3', name: 'Update', key: 'update' },
  { id: '4', name: 'View', key: 'view' },
  { id: '5', name: 'Delete', key: 'delete' },
  { id: '6', name: 'User Mgt', key: 'user_mgt', hasChildren: true },
  { id: '7', name: 'Riders Mgt', key: 'riders_mgt', hasChildren: true },
  { id: '8', name: 'Support', key: 'support', hasChildren: true },
  { id: '9', name: 'Reviews', key: 'reviews', hasChildren: true },
];

const mockRoles: Role[] = [
  { id: '1', name: 'Owner', permissions: ['dashboard', 'create', 'update'] },
  { id: '2', name: 'Admin', permissions: ['dashboard', 'view'] },
  { id: '3', name: 'Super Admin', permissions: ['dashboard', 'create', 'update', 'delete'] },
];
const  RoleManagement : React.FC = ()=> {
  // const [searchTerm, setSearchTerm] = useState('');
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [roles, setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    // setSearchTerm(value);
    console.log(value);
  };

  const handleAddRole = (newRole: { name: string; permissions: string[] }) => {
    const role: Role = {
      id: (roles.length + 1).toString(),
      ...newRole
    };
    setRoles([...roles, role]);
    setIsAddRoleModalOpen(false);
  };

  const handleRoleAction = (roleId: string, action: 'edit' | 'delete') => {
    if (action === 'delete') {
      setRoles(roles.filter(role => role.id !== roleId));
    } else {
      setSelectedRole(roleId);
    }
  };

  return (
    <div>
      <div className='bg-white'>
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6"><span className='text-gray-400'>Admin Management</span> / Role Manegement</h1>
        </HorizontalAlign>
      </div>
      <div className="p-6">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => setIsAddRoleModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Create new role
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold p-4">User Permissions</h1>
          <div className="p-4 border-b">
            <div className="grid grid-cols-1 lg:grid-cols-12 space-x-4">
              <div className="relative flex-1 lg:col-span-3">
                <SearchFilter handleFunction={(e) => handleSearch(e)} />
              </div>
              <div className={`lg:col-span-9 grid grid-cols-6`}>
                {roles.map(role => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <span>{role.name}</span>
                    <div className="relative">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                      >
                        <MoreVertical size={20} />
                      </button>
                      {selectedRole === role.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border z-50">
                          <button
                            className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-50 text-left"
                            onClick={() => handleRoleAction(role.id, 'edit')}
                          >
                            <Edit2 size={16} />
                            <span>Edit Role</span>
                          </button>
                          <button
                            className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-50 text-left text-red-600"
                            onClick={() => handleRoleAction(role.id, 'delete')}
                          >
                            <Trash2 size={16} />
                            <span>Delete Role</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y">
            {mockPermissions.map((permission) => (
              <div key={permission.id} className="grid grid-cols-12 p-4">
                <div className="flex items-center space-x-2 col-span-3 ">
                  {permission.hasChildren && (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                  <span className={permission.hasChildren ? 'font-medium' : 'pl-6'}>
                    {permission.name}
                  </span>
                </div>
                <div className='col-span-9 grid grid-cols-6'>
                  {roles.map(role => (
                    <div key={role.id} className="flex col-span-1 pl-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        checked={role.permissions.includes(permission.key)}
                        onChange={() => { }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AddRoleModal
          isOpen={isAddRoleModalOpen}
          onClose={() => setIsAddRoleModalOpen(false)}
          onSubmit={handleAddRole}
        />
      </div>
    </div>
  );
}

export default RoleManagement