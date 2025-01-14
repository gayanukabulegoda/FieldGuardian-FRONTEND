import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage.tsx';
import {SignUpPage} from "./pages/auth/SignUpPage.tsx";
import {ForgotPasswordPage} from "./pages/auth/ForgotPasswordPage.tsx";
import {OtpVerificationPage} from "./pages/auth/OtpVerificationPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {RootLayout} from "./components/navigation/RootLayout.tsx";
import {DashboardPage} from "./pages/sections/DashboardPage.tsx";
import {StaffPage} from "./pages/sections/StaffPage.tsx";
import {FieldPage} from "./pages/sections/FieldPage.tsx";
import {CropPage} from "./pages/sections/CropPage.tsx";
import {EquipmentPage} from "./pages/sections/EquipmentPage.tsx";
import {VehiclePage} from "./pages/sections/VehiclePage.tsx";
import {MonitoringPage} from "./pages/sections/MonitoringPage.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                { path: 'dashboard', element: <DashboardPage /> },
                { path: 'staff', element: <StaffPage /> },
                { path: 'field', element: <FieldPage /> },
                { path: 'crop', element: <CropPage /> },
                { path: 'equipment', element: <EquipmentPage /> },
                { path: 'vehicle', element: <VehiclePage /> },
                { path: 'monitoring', element: <MonitoringPage /> },
                // { path: '', element: <HomePage /> }
            ]
        },
        { path: '/signin', element: <SignInPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/forgotpassword', element: <ForgotPasswordPage /> },
        { path: '/otpverification', element: <OtpVerificationPage /> },
        {path: '/home', element: <HomePage/>},
    ]);

    return <RouterProvider router={routes} />;
}

export default App;