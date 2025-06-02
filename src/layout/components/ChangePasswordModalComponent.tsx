import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_DOMAIN } from '../../apiConfig';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

export const ChangePasswordModalComponent: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const userCookie = Cookies.get('user');
    const getUser = userCookie ? JSON.parse(userCookie) : null;
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const tokenn = Cookies.get('authToken')?.toString();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(6, 'New password must be at least 6 characters')
      .required('New password is required'),
  });

  const handleSubmit = async (values: { oldPassword: string; newPassword: string }) => {
    setError('');
    try {
      const response = await fetch(API_DOMAIN + 'auth/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // add token 
          Authorization: `Bearer ${tokenn}`,
        },
        body: JSON.stringify({
          email: getUser.email,
          password: values.oldPassword,
          password_confirmation: values.newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      onSubmit(values.oldPassword, values.newPassword);

      toast.success('Password Change Successful');
      navigate('/')
      onClose();
    } catch (err) {
      toast.error('Failed to change password. Please try again.')
      setError('Failed to change password. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-start justify-end z-[1000] p-8">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold ">Change Password</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Old Password */}
              <div>
                <label className="block  mb-2" htmlFor="oldPassword">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    id="oldPassword"
                    name="oldPassword"
                    type={showOldPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent border-gray-300 text-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-2" htmlFor="newPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent border-gray-300 text-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-black cursor-pointer hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
                >
                  {isSubmitting ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
