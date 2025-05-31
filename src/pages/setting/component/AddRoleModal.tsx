import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; permissions: string[] }) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Role name is too short')
    .max(50, 'Role name is too long')
    .required('Role name is required')
});

const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004c] bg-opacity-50 flex items-start justify-end p-6" style={{ zIndex: 1000 }}>
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New Role</h2>

        <Formik
          initialValues={{
            name: '',
            permissions: [] as string[]
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <Field
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter role name"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Role
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRoleModal;