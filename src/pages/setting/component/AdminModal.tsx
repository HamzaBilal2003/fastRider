import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { X, Eye, EyeOff, Upload } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchRolesAndModules, Role } from '../../../queries/role/role';
import ButtonLoader from '../../../components/ButtonLoader';
import { API_DOMAIN_Img } from '../../../apiConfig';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .when('isEditing', {
      is: false,
      then: () => Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      otherwise: () => Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .nullable()
    }),
  role: Yup.string().required('Role is required'),
  phone: Yup.string()
    .matches(/^\d{10,12}$/, 'Phone number must be between 10 and 12 digits')
    .required('Phone number is required'),
  profile_picture: Yup.mixed()
    .when('isEditing', {
      is: false,
      then: () => Yup.mixed().required('Profile image is required'),
      otherwise: () => Yup.mixed()
    })
});

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  isCreating: boolean;
  initialValues?: {
    name?: string;
    email?: string;
    role?: string;
    phone?: string;
    profile_picture?: string;
  };
  mode: 'add' | 'edit';
}

const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isCreating,
  initialValues,
  mode
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    data: rolesData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["roles-and-modules"],
    queryFn: fetchRolesAndModules
  });

  useEffect(() => {
    if (initialValues?.profile_picture) {
      setPreviewImage(API_DOMAIN_Img + initialValues.profile_picture);
    }
  }, [initialValues]);

  if (!isOpen) return null;

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    role: '',
    is_active: 1,
    phone: '',
    profile_picture: null,
    isEditing: mode === 'edit',
    ...initialValues
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000053] bg-opacity-50 flex items-start justify-end p-8 z-[1000] overflow-auto min-h-[100vh]">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {mode === 'add' ? 'Add New Admin' : 'Edit Admin'}
        </h2>

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (value !== null && value !== undefined && key !== 'isEditing') {
                if (key === 'profile_picture' && typeof value === 'string') {
                  // Skip appending profile_picture if it's a string (URL)
                  return;
                }
                formData.append(key, value);
              }
            });
            console.log('Submitting profile update with values:', values); // Debugging
            console.log('FormData:', formData);
            onSubmit(formData);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center mb-4">
                <label htmlFor="profile_picture" className="cursor-pointer relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <Upload size={24} className="text-gray-500" />
                    </div>
                  )}
                </label>
                <input
                  id="profile_picture"
                  name="profile_picture"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue('profile_picture', file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {errors.profile_picture && touched.profile_picture && (
                  <div className="text-red-500 text-sm mt-1">{errors.profile_picture}</div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Field
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter full name"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter email address"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Field
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter phone number"
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                )}
              </div>

              {/* Password - Only show in add mode or optionally in edit mode */}
              {(mode === 'add' || mode === 'edit') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {mode === 'add' ? 'Password' : 'New Password (Optional)'}
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      placeholder={mode === 'add' ? 'Enter password' : 'Enter new password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select a role</option>
                  {rolesData?.roles.map((role: Role) => (
                    <option
                      key={role.role_id}
                      value={role.role_name}
                    >
                      {role.role_name}
                    </option>
                  ))}
                </Field>
                {errors.role && touched.role && (
                  <div className="text-red-500 text-sm mt-1">{errors.role}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Field
                  as="select"
                  name="is_active"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Field>
                {errors.is_active && touched.is_active && (
                  <div className="text-red-500 text-sm mt-1">{errors.is_active}</div>
                )}
              </div>

              <button
                disabled={isLoading || isCreating}
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isLoading || isCreating ? <ButtonLoader /> : mode === 'add' ? 'Add Admin' : 'Update Admin'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminModal;