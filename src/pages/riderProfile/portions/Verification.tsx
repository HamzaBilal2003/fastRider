import React from 'react'
import RiderProfile from '../component/RiderProfile';
import DocumentViewer from '../component/DocumentViewer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchUsersDetail } from '../../../queries/user/UserDetail';
import { fetchRidersDetail } from '../../../queries/rider/riderDetail';
import Loader from '../../../components/Loader';
import { API_DOMAIN_Img } from '../../../apiConfig';
import ProfileHeader from '../component/ProfileHeader';

const Verification : React.FC = () => {
    const handleDetailsClick = (e: any) => {
        console.log(e.target.value);
    }
    const {username} = useParams();
    const {data:verificationData,isLoading,error} = useQuery({
        queryKey: ['verification'],
        queryFn: ()=> fetchRidersDetail(Number(username))
    })
    console.log(verificationData?.data.rider_verification);
    const verificationDocumentData = verificationData?.data.rider_verification;
    const profileData = {
        tier: 3,
        balance: verificationData?.data.wallet.balance,
        completionPercentage: (() => {
            const steps = {
                personalInformation: verificationDocumentData?.first_name && verificationDocumentData?.last_name && verificationDocumentData?.email_address && verificationDocumentData?.phone && verificationDocumentData?.address && verificationDocumentData?.nin_number,
                vehicleInformation: verificationDocumentData?.vehicle_type && verificationDocumentData?.plate_number && verificationDocumentData?.riders_permit_number && verificationDocumentData?.color,
                uploads: verificationDocumentData?.passport_photo && verificationDocumentData?.rider_permit_upload && verificationDocumentData?.vehicle_video,
                tierPayment: false,
            };
            const totalSteps = Object.keys(steps).length;
            const completedSteps = Object.values(steps).filter(Boolean).length;
            return Math.round((completedSteps / totalSteps) * 100);
        })(),
        personalDetails: {
            firstName: verificationDocumentData?.first_name,
            lastName: verificationDocumentData?.last_name,
            email: verificationDocumentData?.email_address,
            phoneNumber: verificationDocumentData?.phone,
            address: verificationDocumentData?.address,
            ninNumber: verificationDocumentData?.nin_number,
        },
        vehicleDetails: {
            vehicleType: verificationDocumentData?.vehicle_type,
            plateNumber: verificationDocumentData?.plate_number,
            permitNumber: verificationDocumentData?.riders_permit_number,
            color: verificationDocumentData?.color,
        },
        isApproved: true,
        completedSteps: {
            personalInformation: verificationDocumentData?.first_name && verificationDocumentData?.last_name && verificationDocumentData?.email_address && verificationDocumentData?.phone && verificationDocumentData?.address && verificationDocumentData?.nin_number,
            vehicleInformation: verificationDocumentData?.vehicle_type && verificationDocumentData?.plate_number && verificationDocumentData?.riders_permit_number && verificationDocumentData?.color,
            uploads: verificationDocumentData?.passport_photo && verificationDocumentData?.rider_permit_upload && verificationDocumentData?.vehicle_video,
            tierPayment: false,
        },
    };

    const documents = [
        {
            type: 'image' as const,
            title: 'Passport',
            url: API_DOMAIN_Img+ verificationDocumentData?.passport_photo,
        },
        {
            type: 'image' as const,
            title: 'Riders Permit',
            url: API_DOMAIN_Img+ verificationDocumentData?.rider_permit_upload,
        },
        {
            type: 'video' as const,
            title: 'Vehicle Video',
            url: API_DOMAIN_Img+ verificationDocumentData?.vehicle_video,
        },
    ];
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    if (!verificationData?.data.rider_verification) {
        return <div>No data found</div>
    }
    return (
        <>
            <ProfileHeader url='verification' username={username} handlePeriod={handleDetailsClick} />
            <div className='p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                    <div className='lg:col-span-8'>
                        <RiderProfile {...profileData} />
                    </div>
                    <div className='lg:col-span-4'>
                        <DocumentViewer documents={documents} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verification