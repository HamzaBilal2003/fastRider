import React, { useState } from 'react';
import { X } from 'lucide-react';
import { RiderProfileProps } from './RiderProfile';

interface EditRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RiderProfileProps;
  onSave: (data: RiderProfileProps) => void;
}

const EditRiderModal: React.FC<EditRiderModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<RiderProfileProps>(data);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (
    section: 'personalDetails' | 'vehicleDetails',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end pt-8 pb-8 overflow-y-auto z-[1000]">
      <div className="bg-white rounded-3xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Rider Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.personalDetails.firstName}
                  onChange={(e) =>
                    handleChange('personalDetails', 'firstName', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.personalDetails.lastName}
                  onChange={(e) =>
                    handleChange('personalDetails', 'lastName', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.personalDetails.email}
                  onChange={(e) =>
                    handleChange('personalDetails', 'email', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.personalDetails.phoneNumber}
                  onChange={(e) =>
                    handleChange('personalDetails', 'phoneNumber', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  value={formData.personalDetails.address}
                  onChange={(e) =>
                    handleChange('personalDetails', 'address', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">NIN Number</label>
                <input
                  type="text"
                  value={formData.personalDetails.ninNumber}
                  onChange={(e) =>
                    handleChange('personalDetails', 'ninNumber', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Vehicle Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Vehicle Type</label>
                <select
                  value={formData.vehicleDetails.vehicleType}
                  onChange={(e) =>
                    handleChange('vehicleDetails', 'vehicleType', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none bg-white"
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Plate Number</label>
                <input
                  type="text"
                  value={formData.vehicleDetails.plateNumber}
                  onChange={(e) =>
                    handleChange('vehicleDetails', 'plateNumber', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">Permit Number</label>
                <input
                  type="text"
                  value={formData.vehicleDetails.permitNumber}
                  onChange={(e) =>
                    handleChange('vehicleDetails', 'permitNumber', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-2">Color</label>
                <select
                  value={formData.vehicleDetails.color}
                  onChange={(e) =>
                    handleChange('vehicleDetails', 'color', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none bg-white"
                >
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Approval Status</h3>
            <select
              value={formData.isApproved ? 'Approved' : 'Not Approved'}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isApproved: e.target.value === 'Approved',
                }))
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none bg-white"
            >
              <option value="Approved">Approved</option>
              <option value="Not Approved">Pending</option>
              <option value="Not Approved">Reject</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#4A1D1D] cursor-pointer text-white rounded-xl hover:bg-[#331d1d] transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRiderModal;