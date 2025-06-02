import React, { useState, useEffect } from 'react';
import { TierResponse } from '../../../queries/tier';

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<TierResponse>) => void;
  initialValues?: Partial<TierResponse> | null;
  isPending: boolean;
}

const TierModal: React.FC<TierModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending,
}) => {
  const [formData, setFormData] = useState<Partial<TierResponse>>({
    tier: 0,
    no_of_rides: 0,
    commission: '',
    tier_amount: '',
    status: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 flex items-start justify-end z-[1000]  p-8 min-h-screen overflow-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialValues ? 'Edit Tier' : 'Add New Tier'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tier Number</label>
            <input
              type="number"
              name="tier"
              value={formData.tier || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Rides</label>
            <input
              type="number"
              name="no_of_rides"
              value={formData.no_of_rides || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Commission</label>
            <input
              type="text"
              name="commission"
              value={formData.commission || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tier Amount</label>
            <input
              type="text"
              name="tier_amount"
              value={formData.tier_amount || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TierModal;
