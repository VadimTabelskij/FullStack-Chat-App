import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AllUsersPage from './pages/AllUsersPage';
import ConversationsPage from './pages/ConversationsPage';
import UserProfilePage from './pages/UserProfilePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar className="toolbar" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/allusers" element={<AllUsersPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route path="/user/:username" element={<UserProfilePage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
