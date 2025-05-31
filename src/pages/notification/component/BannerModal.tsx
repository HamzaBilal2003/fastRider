import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import ButtonLoader from '../../../components/ButtonLoader';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BannerFormData) => void;
  initialValues?: BannerFormData | null;
  mode: 'create' | 'edit';
  isPending:boolean;
}

interface BannerFormData {
  id?: string;
  subject: string;
  image: string | File; // Allow image to be a string or File
  location: string;
}

const BannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending,
  mode
}) => {
  const [formData, setFormData] = useState<BannerFormData>({
    subject: '',
    image: '',
    location: ''
  });
  const [errors, setErrors] = useState<Partial<BannerFormData>>({});
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
      setImagePreview(API_DOMAIN_Img + initialValues.image);
    }
  }, [initialValues, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BannerFormData> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
    } else if (formData.image instanceof File && !['image/jpeg', 'image/png'].includes(formData.image.type)) {
      newErrors.image = 'The image field must be an image (JPEG or PNG)';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Do not reset the form here; let the parent component handle success.
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file })); // Ensure image is a File object
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 p-4 flex items-start justify-end z-[1000] overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">
            {mode === 'create' ? 'New Banner' : 'Edit Banner'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter banner subject"
            />
            {errors.subject && (
              <p className="text-red-500 mt-1 text-sm">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Image</label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Banner preview"
                    className="max-h-48 mx-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="flex items-center justify-center">
                    <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            {errors.image && typeof errors.image === 'string' && (
              <p className="text-red-500 mt-1 text-sm">{errors.image}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter banner Location"
            />
            {errors.location && (
              <p className="text-red-500 mt-1 text-sm">{errors.location}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
            disabled={isPending}
              type="submit"
              className="px-6 py-2 bg-purple-600 cursor-pointer text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isPending ? <ButtonLoader/> : mode === 'create' ? 'Create Banner' : 'Update Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;