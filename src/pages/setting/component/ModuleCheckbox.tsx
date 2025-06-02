import React from 'react';

interface ModuleCheckboxProps {
  moduleId: number;
  roleName: string;
  roleId: number;
  isChecked: boolean;
  onTogglePermission: (roleId: number, moduleId: number, newState: boolean) => void;
}

const ModuleCheckbox: React.FC<ModuleCheckboxProps> = ({ 
  moduleId, 
  roleName,
  roleId, 
  isChecked, 
  onTogglePermission 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTogglePermission(roleId, moduleId, e.target.checked);
  };

  return (
    <div className="">
      <input
        type="checkbox"
        id={`permission-${roleId}-${moduleId}`}
        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-all cursor-pointer"
        checked={isChecked}
        onChange={handleChange}
        aria-label={`${roleName} permission for module ${moduleId}`}
      />
    </div>
  );
};

export default ModuleCheckbox;