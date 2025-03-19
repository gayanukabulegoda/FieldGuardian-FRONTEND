import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage.tsx';
import {SignUpPage} from "./pages/auth/SignUpPage.tsx";
import {ForgotPasswordPage} from "./pages/auth/ForgotPasswordPage.tsx";
import {OtpVerificationPage} from "./pages/auth/OtpVerificationPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {DashboardSection} from "./pages/sections/DashboardSection.tsx";
import {StaffSection} from "./pages/sections/StaffSection.tsx";
import {FieldSection} from "./pages/sections/FieldSection.tsx";
import {CropSection} from "./pages/sections/CropSection.tsx";
import {EquipmentSection} from "./pages/sections/EquipmentSection.tsx";
import {VehicleSection} from "./pages/sections/VehicleSection.tsx";
import {MonitoringSection} from "./pages/sections/MonitoringSection.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>,
            children: [
                {path: 'dashboard', element: <DashboardSection/>},
                {path: 'staff', element: <StaffSection/>},
                {path: 'field', element: <FieldSection/>},
                {path: 'crop', element: <CropSection/>},
                {path: 'equipment', element: <EquipmentSection/>},
                {path: 'vehicle', element: <VehicleSection/>},
                {path: 'monitoring', element: <MonitoringSection/>},
            ]
        },
        {path: '/signin', element: <SignInPage/>},
        {path: '/signup', element: <SignUpPage/>},
        {path: '/forgotpassword', element: <ForgotPasswordPage/>},
        {path: '/otpverification', element: <OtpVerificationPage/>},
    ]);

    return <RouterProvider router={routes}/>;
}

export default App;