import React, { useState } from 'react';
import { Bell, Edit } from 'lucide-react';
import EditRiderModal from './EditRiderModal';

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  ninNumber: string;
}

export interface VehicleDetails {
  vehicleType: string;
  plateNumber: string;
  permitNumber: string;
  color: string;
}

export interface RiderProfileProps {
  tier: number;
  balance: number;
  completionPercentage: number;
  personalDetails: PersonalDetails;
  vehicleDetails: VehicleDetails;
  isApproved: boolean;
  completedSteps: {
    personalInformation: boolean;
    vehicleInformation: boolean;
    uploads: boolean;
    tierPayment: boolean;
  };
}

const ProgressCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#FFA500"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
};

const RiderProfile: React.FC<RiderProfileProps> = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<RiderProfileProps>(props);

  const handleSave = (newData: RiderProfileProps) => {
    setProfileData(newData);
  };

  const {
    tier,
    balance,
    completionPercentage,
    personalDetails,
    vehicleDetails,
    isApproved,
    completedSteps,
  } = profileData;

  return (
    <>
      <div className="flex bg-[#4A1D1D] rounded-3xl overflow-hidden text-white p-8 pr-4">
        {/* Left Section */}
        <div className="flex-1 pr-8 border-r border-white/20">
          <div className="mb-8">
            <h2 className="text-xl mb-2">Tier Wallet Balance</h2>
            <div className="inline-block px-6 py-2 rounded-full border border-white/30 mb-4">
              Tier {tier}
            </div>
            <div className="text-5xl font-bold mb-6">
              ₦{balance.toLocaleString()}
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-[#4A1D1D] px-6 py-2 rounded-lg font-medium">
                Topup
              </button>
              <button className="bg-transparent border border-white px-6 py-2 rounded-lg font-medium">
                Withdraw
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl mb-6">Completion Status</h2>
            <div className="flex flex-col gap-12">
              <ProgressCircle percentage={completionPercentage} />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      completedSteps.personalInformation
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {completedSteps.personalInformation ? '✓' : '✗'}
                  </span>
                  <span>1. Personal Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      completedSteps.vehicleInformation
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {completedSteps.vehicleInformation ? '✓' : '✗'}
                  </span>
                  <span>2. Vehicle Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      completedSteps.uploads ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {completedSteps.uploads ? '✓' : '✗'}
                  </span>
                  <span>3. Uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      completedSteps.tierPayment
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {completedSteps.tierPayment ? '✓' : '✗'}
                  </span>
                  <span>4. Tier Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 pl-8 pr-0">
          <div className="mb-8">
            <h2 className="text-2xl mb-6">Personal Details</h2>
            <div className="space-y-4">
              <div>
                <div className="text-white/60 mb-1">First Name</div>
                <div>{personalDetails.firstName}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Last Name</div>
                <div>{personalDetails.lastName}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Email</div>
                <div>{personalDetails.email}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Phone Number</div>
                <div>{personalDetails.phoneNumber}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Address</div>
                <div>{personalDetails.address}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">NIN Number</div>
                <div>{personalDetails.ninNumber}</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-6">Vehicle Details</h2>
            <div className="space-y-4">
              <div>
                <div className="text-white/60 mb-1">Vehicle Type</div>
                <div>{vehicleDetails.vehicleType}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Plate Number</div>
                <div>{vehicleDetails.plateNumber}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Permit Number</div>
                <div>{vehicleDetails.permitNumber}</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Color</div>
                <div>{vehicleDetails.color}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center gap-4 mt-6">
            <div className="flex items-center gap-2 p-3 rounded-lg border border-white/30">
              <div className="w-5 h-5 rounded-full bg-red-500"></div>
              <span>{isApproved ? 'Approved' : 'Not Approved'}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-3 rounded-lg border border-white/30"
              >
                <Edit size={20} />
              </button>
              <button className="p-3 rounded-lg border border-white/30">
                <Bell size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditRiderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={profileData}
        onSave={handleSave}
      />
    </>
  );
};

export default RiderProfile;