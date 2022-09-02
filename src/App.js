import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './pages/AddPost';
import ProtectedRoute from './components/ProtectedRoute/ProtectcedRoute';
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Post from "./pages/Post";
import SharePost from './pages/SharePost';
import Shares from './pages/Shares';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/addpost" element={<ProtectedRoute><AddPost /></ProtectedRoute>}></Route>
          <Route exact path="/post/:postId" element={<ProtectedRoute><Post/></ProtectedRoute>}></Route>
          <Route exact path="/share/:postId" element={<ProtectedRoute><SharePost/></ProtectedRoute>}></Route>
          <Route exact path="/shares" element={<ProtectedRoute><Shares/></ProtectedRoute>}></Route>
          <Route exact path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        </Routes>

      </AuthProvider>
    </Router>
  );
}

export default App;
