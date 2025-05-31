import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";

// Importing all pages
import Booking from "./pages/booking/Booking";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";
import Notification from "./pages/notification/Notification";
import Rating from "./pages/rating/Rating";
import RiderManagement from "./pages/riderManagement/RiderManagement";
import Setting from "./pages/setting/Setting";
import Support from "./pages/support/Support";
import Tracking from "./pages/tracking/Tracking";
import UserManagement from "./pages/userManagement/UserManagement";
import Profile from "./profile/Profile";
import AdminManagement from "./pages/setting/portions/AdminManagement";
import AdminDetail from "./pages/setting/adminDetail/AdminDetail";
import RoleManagement from "./pages/setting/portions/RoleManagement";
import InAppBanner from "./pages/notification/InAppBanner";
import Analytics from "./pages/analytics/Analytics";
import Localization from "./pages/tracking/Localization";
import Transaction from "./pages/transactions/Transaction";
import BookingDetail from "./pages/booking/component/BookingDetail";
import UserBooking from "./profile/portions/UserBooking";
import UserTransactions from "./profile/portions/UserTransactions";
import RiderProfile from "./pages/riderProfile/RiderProfile";
import RiderBooking from "./pages/riderProfile/portions/RiderBooking";
import RiderTransactions from "./pages/riderProfile/portions/RiderTransactions";
import RiderChat from "./pages/riderProfile/portions/RiderChat";
import Verification from "./pages/riderProfile/portions/Verification";
import TierManagement from "./pages/tierManagement/TierManagement";
import LoginPage from "./auth/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import UserChatMessage from "./profile/portions/UserChatMessage";
const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* Layout Wraps All Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="booking/" element={<Booking />} />
              <Route path="booking/:id/detail" element={<BookingDetail />} />
              <Route path="transactions" element={<Transaction />} />
              <Route path="earnings" element={<Earning />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="notifications/banners" element={<InAppBanner />} />
              <Route path="ratings" element={<Rating />} />

              <Route path="/settings/general" element={<Setting />} />
              <Route path="/settings/admin" element={<AdminManagement />} />
              <Route path="/settings/admin/:username/detail" element={<AdminDetail />} />
              <Route path="/settings/admin/management" element={<RoleManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="support" element={<Support />} />
              <Route path="tracking&location" element={<Tracking />} />
              <Route path="tracking&location/localization" element={<Localization />} />

              {/* user management */}
              <Route path="user/management" element={<UserManagement />} />
              <Route path="user/management/:username/customer/detail" element={<Profile />} />
              <Route path="user/management/:username/customer/bookings" element={<UserBooking />} />
              <Route path="user/management/:username/customer/transactions" element={<UserTransactions />} />
              <Route path="user/management/:username/customer/chat" element={<UserChatMessage />} />

              {/* Rider management */}
              <Route path="rider/management" element={<RiderManagement />} />
              <Route path="rider/management/tiers" element={<TierManagement />} />
              <Route path="rider/management/:username/customer/detail" element={<RiderProfile />} />
              <Route path="rider/management/:username/customer/bookings" element={<RiderBooking />} />
              <Route path="rider/management/:username/customer/transactions" element={<RiderTransactions />} />
              <Route path="rider/management/:username/customer/verification" element={<Verification />} />
              <Route path="rider/management/:username/customer/chat" element={<RiderChat />} />

            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
