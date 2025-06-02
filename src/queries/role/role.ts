import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
export interface Permission {
  module_id: number;
  module_name: string;
  has_permission: boolean;
}

export interface Role {
  role_id: number;
  role_name: string;
  permissions: Permission[];
}

export interface Module {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface RoleResponse {
  roles: Role[];
  modules: Module[];
}

export interface RoleFormValues {
  name: string;
  permissions: number[];
}

const getToken = () => Cookies.get('authToken')?.toString();

export const fetchRolesAndModules = async (): Promise<RoleResponse> => {
  try {
    const response = await apiCall({ 
      url: API_ENDPOINT.adminEndpoint.Modules, 
      method: 'GET', 
      data: undefined, 
      token: getToken() 
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch roles and modules');
  }
};

export const createRole = async (roleName: string): Promise<any> => {
  try {
    const response = await apiCall({
      url: API_ENDPOINT.adminEndpoint.Createrole,
      method: 'POST',
      data: { name: roleName },
      token: getToken()
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to create role');
  }
};

export const updateRole = async (roleId: number, roleName: string): Promise<any> => {
  try {
    const response = await apiCall({
      url: `${API_ENDPOINT.adminEndpoint.UpdateRole}${roleId}`,
      method: 'PUT',
      data: { name: roleName },
      token: getToken()
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to update role');
  }
};

export const deleteRole = async (roleId: number): Promise<any> => {
  try {
    const response = await apiCall({
      url: `${API_ENDPOINT.adminEndpoint.deleteRole}${roleId}`,
      method: 'DELETE',
      data: undefined,
      token: getToken()
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to delete role');
  }
};

export const assignModulesToRole = async (roleId: number, moduleIds: number[]): Promise<any> => {
  try {
    const response = await apiCall({
      url: `${API_ENDPOINT.adminEndpoint.assignmodule + roleId}/assign-modules`,
      method: 'POST',
      data: { module_ids: moduleIds.map(id => id.toString()) },
      token: getToken()
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to assign modules to role');
  }
};