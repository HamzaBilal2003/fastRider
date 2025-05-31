import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ButtonLoader from '../../../components/ButtonLoader';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
  userData?: UserFormValues; // Optional for update
  isPending: boolean;
}

interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  password?: string; // Optional for updates
  profile_picture?: File | string; // Can be a file or URL for updates
  is_active: string | number;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Full name is required'),
  is_active: Yup.string()
    .required('status is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]\d{1,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  profile_picture: Yup.mixed()
    .test('fileSize', 'File too large', (value) => {
      if (!value || typeof value === 'string') return true;
      return value instanceof File && value.size <= 5000000; // 5MB
    })
    .test('fileFormat', 'Unsupported format', (value) => {
      if (!value || typeof value === 'string') return true;
      return value instanceof File && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    }),
});

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit, userData,isPending }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string>(
    typeof userData?.profile_picture === 'string' ? userData.profile_picture : ''
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const initialValues: UserFormValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    password: '',
    profile_picture: undefined,
    is_active : userData?.is_active || 0,
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue('profile_picture', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-50 flex items-start justify-end z-[100] p-4 overflow-auto">
      <div className="bg-white rounded-lg p-4 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">{userData ? 'Update User' : 'Add New User'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className='bi bi-x-circle text-[20px]'></i>
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="bi bi-person text-[48px] text-gray-400"></i>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <ErrorMessage name="profile_picture" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                  placeholder="Enter full name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                  placeholder="Enter email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {!userData && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <i className="bi bi-eye text-[20px]"></i> : <i className="bi bi-eye-slash text-[20px]"></i>}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              )}
              <div>
                <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Field
                  as={"select"}
                  name="is_active"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                >
                  <option value="1">Active</option>
                  <option value="0">Block</option>
                </Field>
                <ErrorMessage name="is_active" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer flex justify-center items-center w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isPending ? <ButtonLoader /> : userData ? 'Update User' : 'Add User'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserModal;