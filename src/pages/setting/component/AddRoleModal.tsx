import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { RoleFormValues } from '../../../queries/role/role';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: RoleFormValues) => void;
  initialValues?: RoleFormValues;
  title?: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Role name is too short')
    .max(50, 'Role name is too long')
    .required('Role name is required')
});

const AddRoleModal: React.FC<AddRoleModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialValues = { name: '', permissions: [] },
  title = 'Add New Role'
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

        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <Field
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter role name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : title === 'Add New Role' ? 'Add Role' : 'Update Role'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRoleModal;