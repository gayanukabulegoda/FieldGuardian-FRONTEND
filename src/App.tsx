import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignInPage/>}/>
                <Route path="/" element={<Navigate to="/signin" replace/>}/>
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;