import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import EnterLocationManually from './components/auth/EnterLocationManually';
import Landing from './components/auth/Landing';
import ProfileSteps from './components/auth/ProfileSteps';
import RegisterLogin from './components/auth/RegisterLogin';
import EnterLocation from './components/auth/EnterLocation';
import Layout from './layout/Layout';
import DashboardComponent from './pages/DashboardComponent';
import Inquiries from './pages/Inquiries';
import Reviews from './pages/Reviews';
import Cuisines from './pages/Cuisines';
import Occasions from './pages/Occasions';
import Packages from './pages/Packages';
import BusinesssProfile from './pages/BusinesssProfile';
import PhotoGallery from './pages/PhotoGallery';
import Branches from './pages/Branches';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';
import SubscriptionPlan from './pages/SubscriptionPlan';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import Notification from './pages/Notification';
import RaiseTicket from './pages/RaiseTicket';
import { Toaster } from 'react-hot-toast';
import PhotoGalleryTest from "./pages/PhotoGalleryTest";
import SubscriptionPlanDetails from "./pages/SubscriptionPlanDetails";
import SubscriptionDetails from "./pages/SubscriptionDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/create-account" element={<RegisterLogin />} />
          <Route path="/enter-location" element={<EnterLocation />} />
          <Route path="/enter-location-manually" element={<EnterLocationManually />} />
          <Route path="/profile-steps" element={<ProfileSteps />} />
          <Route path="*" element={<NoPage />} />

          <Route path="/" element={<Layout />}>

            <Route index element={<DashboardComponent />} />
            <Route path='/dashboard/inquiries' element={<Inquiries />} />
            <Route path='/dashboard/reviews' element={<Reviews />} />

            <Route path='/dashboard/cuisines' element={<Cuisines />} />
            <Route path='/dashboard/occasions' element={<Occasions />} />
            <Route path='/dashboard/packages' element={<Packages />} />

            <Route path='/dashboard/businesss-profile' element={<BusinesssProfile />} />
            <Route path='/dashboard/photo-gallery' element={<PhotoGallery />} />
            <Route path='/dashboard/photo-gallery-test' element={<PhotoGalleryTest />} />
            <Route path='/dashboard/branches' element={<Branches />} />

            <Route path='/dashboard/subscription' element={<Subscription />} />
            <Route path='/dashboard/subscription-details' element={<SubscriptionDetails />} />
            <Route path='/dashboard/subscription-plan' element={<SubscriptionPlan />} />
            <Route path='/dashboard/subscription-plan-details' element={<SubscriptionPlanDetails />} />
            <Route path='/dashboard/settings' element={<Settings />} />
            <Route path='/dashboard/about-us' element={<AboutUs />} />
            <Route path='/dashboard/faq' element={<Faq />} />
            <Route path='/dashboard/notification' element={<Notification />} />
            <Route path='/dashboard/raise-ticket' element={<RaiseTicket />} />

          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
