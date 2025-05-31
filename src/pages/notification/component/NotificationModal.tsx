import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { X, Upload } from 'lucide-react';
import ButtonLoader from '../../../components/ButtonLoader';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NotificationFormValues) => void;
  initialValues?: NotificationFormValues;
  mode?: 'create' | 'edit';
  isPending?: boolean;
}

export interface NotificationFormValues {
  id?: string;
  title: string;
  content: string;
  location: string;
  image?: File | null;
  imageUrl?: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Subject is too short')
    .max(100, 'Subject is too long')
    .required('Subject is required'),
  content: Yup.string()
    .min(10, 'Message is too short')
    .max(1000, 'Message is too long')
    .required('Message is required'),
  location: Yup.string()
    .required('Location is required'),
  image: Yup.mixed()
    .test('fileSize', 'File too large', (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 5000000; // 5MB
    })
    .test('fileFormat', 'Unsupported format', (value) => {
      if (!value || !(value instanceof File)) return true;
      return ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    }),
});


const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  initialValues,
  mode = 'create'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.image || null);

  if (!isOpen) return null;

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000054] bg-opacity-50 flex items-start justify-end p-6 z-[1000] overflow-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg relative overflow-y-auto">
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {mode === 'create' ? 'New Notification' : 'Edit Notification'}
        </h2>

        <Formik
          initialValues={{
            title: initialValues?.title || '',
            content: initialValues?.content || '',
            location: initialValues?.location || '',
            image: null,
            ...initialValues
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Field
                  name="title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Message Subject"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Field
                  as="textarea"
                  name="content"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Type Message"
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Field
                  name="location"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Message Subject"
                />
                {errors.location && touched.location && (
                  <div className="text-red-500 text-sm mt-1">{errors.location}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {previewUrl && (
                    <div className="relative w-24 h-24">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setFieldValue('image', null);
                        }}
                        className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <label className="relative cursor-pointer bg-white border rounded-lg px-4 py-2 hover:bg-gray-50">
                    <span className="flex items-center space-x-2">
                      <Upload size={20} />
                      <span>Upload Image</span>
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </label>
                </div>
                {errors.image && touched.image && (
                  <div className="text-red-500 text-sm mt-1">{errors.image as string}</div>
                )}
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="cursor-pointer w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isPending ? <ButtonLoader /> : mode === 'create' ? 'Send' : 'Update'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NotificationModal;