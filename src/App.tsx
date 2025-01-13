import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage.tsx';
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage.tsx";
import {OtpVerificationPage} from "./pages/OtpVerificationPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignInPage/>}/>
                <Route path="/" element={<Navigate to="/signin" replace/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/>
                <Route path="/otpverification" element={<OtpVerificationPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;