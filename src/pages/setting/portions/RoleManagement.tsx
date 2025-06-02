import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';

import AddRoleModal from '../component/AddRoleModal';
import RoleCard from '../component/RoleCard';
import ModuleCheckbox from '../component/ModuleCheckbox';
import DeleteRoleModal from '../component/DeleteRoleModal';
import HorizontalAlign from '../../../components/HorizontalAlign';
import Loader from '../../../components/Loader';

import { 
  fetchRolesAndModules, 
  createRole, 
  updateRole, 
  deleteRole,
  assignModulesToRole 
} from '../../../queries/role/role';
import { Role, Module, RoleFormValues } from '../../../queries/role/role';

const RoleManagement: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State management
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [editFormValues, setEditFormValues] = useState<RoleFormValues>({ name: '', permissions: [] });
  const [permissionChanges, setPermissionChanges] = useState<Map<string, boolean>>(new Map());
  
  // Fetch roles and modules data
  const { 
    data: rolesData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["roles-and-modules"],
    queryFn: fetchRolesAndModules
  });

  // Mutations
  const createRoleMutation = useMutation({
    mutationFn: (values: RoleFormValues) => createRole(values.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles-and-modules"] });
      toast.success("Role created successfully");
      setIsAddRoleModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create role");
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: (values: RoleFormValues) => {
      if (!selectedRoleId) throw new Error("No role selected");
      return updateRole(selectedRoleId, values.name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles-and-modules"] });
      toast.success("Role updated successfully");
      setIsEditRoleModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update role");
    }
  });

  const deleteRoleMutation = useMutation({
    mutationFn: () => {
      if (!selectedRoleId) throw new Error("No role selected");
      return deleteRole(selectedRoleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles-and-modules"] });
      toast.success("Role deleted successfully");
      setIsDeleteRoleModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete role");
    }
  });

  const assignModulesMutation = useMutation({
    mutationFn: ({ roleId, moduleIds }: { roleId: number, moduleIds: number[] }) => 
      assignModulesToRole(roleId, moduleIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles-and-modules"] });
      toast.success("Permissions updated successfully");
      setPermissionChanges(new Map());
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update permissions");
    }
  });

  // Event handlers
  const handleAddRole = (values: RoleFormValues) => {
    createRoleMutation.mutate(values);
  };

  const handleEditRole = (roleId: number) => {
    const role = rolesData?.roles.find(r => r.role_id === roleId);
    if (role) {
      setSelectedRoleId(roleId);
      setEditFormValues({
        name: role.role_name,
        permissions: role.permissions
          .filter(p => p.has_permission)
          .map(p => p.module_id)
      });
      setIsEditRoleModalOpen(true);
    }
  };

  const handleUpdateRole = (values: RoleFormValues) => {
    updateRoleMutation.mutate(values);
  };

  const handleDeleteClick = (roleId: number) => {
    setSelectedRoleId(roleId);
    setIsDeleteRoleModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteRoleMutation.mutate();
  };

  const handleTogglePermission = (roleId: number, moduleId: number, newState: boolean) => {
    // Track changes in a map with composite key
    const key = `${roleId}-${moduleId}`;
    const newChanges = new Map(permissionChanges);
    newChanges.set(key, newState);
    setPermissionChanges(newChanges);
    
    // Create optimistic update
    const updatedRoles = rolesData?.roles.map(role => {
      if (role.role_id === roleId) {
        const updatedPermissions = role.permissions.map(perm => {
          if (perm.module_id === moduleId) {
            return { ...perm, has_permission: newState };
          }
          return perm;
        });
        return { ...role, permissions: updatedPermissions };
      }
      return role;
    });
    
    // Update the cache optimistically
    queryClient.setQueryData(["roles-and-modules"], {
      ...rolesData,
      roles: updatedRoles
    });
    
    // Send the update to the server
    const role = rolesData?.roles.find(r => r.role_id === roleId);
    if (role) {
      // Get current module IDs with permission
      const currentModuleIds = role.permissions
        .filter(p => p.has_permission)
        .map(p => p.module_id);
      
      // Calculate the new module IDs
      let newModuleIds: number[];
      if (newState) {
        // Add moduleId if it's not already there
        newModuleIds = [...new Set([...currentModuleIds, moduleId])];
      } else {
        // Remove moduleId
        newModuleIds = currentModuleIds.filter(id => id !== moduleId);
      }
      
      assignModulesMutation.mutate({ roleId, moduleIds: newModuleIds });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center my-10 text-red-600">Error loading roles and modules</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6 py-4">
            <span className="text-gray-400">Admin Management</span> / Role Management
          </h1>
        </HorizontalAlign>
      </div>
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Manage Roles & Permissions</h2>
          <button
            onClick={() => setIsAddRoleModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Create New Role
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Role Permissions</h3>
            
            {(!rolesData?.roles || rolesData.roles.length === 0) ? (
              <div className="text-center py-6 text-gray-500">
                No roles found. Create a new role to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Module
                      </th>
                      {rolesData?.roles.map((role) => (
                        <th key={role.role_id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <RoleCard
                            role={role}
                            onEdit={handleEditRole}
                            onDelete={handleDeleteClick}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rolesData?.modules.map((module ,index) => (
                      <tr key={module.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="px-6 py-4 capitalize whitespace-nowrap text-sm font-medium text-gray-900">
                          {module.name}
                        </td>
                        {rolesData?.roles.map((role) => {
                          const permission = role.permissions.find(
                            (p) => p.module_id === module.id
                          );
                          return (
                            <td key={`${role.role_id}-${module.id}`} className="px-6 py-4 whitespace-nowrap">
                              <ModuleCheckbox
                                moduleId={module.id}
                                roleId={role.role_id}
                                roleName={role.role_name}
                                isChecked={permission?.has_permission || false}
                                onTogglePermission={handleTogglePermission}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        onSubmit={handleAddRole}
      />
      
      <AddRoleModal
        isOpen={isEditRoleModalOpen}
        onClose={() => setIsEditRoleModalOpen(false)}
        onSubmit={handleUpdateRole}
        initialValues={editFormValues}
        title="Edit Role"
      />
      
      <DeleteRoleModal
        isOpen={isDeleteRoleModalOpen}
        onClose={() => setIsDeleteRoleModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        roleName={rolesData?.roles.find(r => r.role_id === selectedRoleId)?.role_name || ''}
      />
    </div>
  );
};

export default RoleManagement;