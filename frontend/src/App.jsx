import { useState } from 'react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/sonner';

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <>
      {/* Header with Navigation */}
      <Header>
        {isSignedIn && (
          <div className="header-user-info">
            <span>Welcome, {user.firstName}!</span>
            <img
              src={user.profileImageUrl}
              alt="User Avatar"
              className="user-avatar"
            />
          </div>
        )}
      </Header>

      {/* Main Content */}
      <main className="main-container">
        <div className="content-wrapper">
          <Outlet />
          <Toaster />

        </div>
      </main> 

      {/* Footer
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </footer> */}
    </>
  );
}

export default App;
