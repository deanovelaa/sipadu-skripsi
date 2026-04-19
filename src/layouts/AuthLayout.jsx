import GlobalNavbar from '../components/layout/GlobalNavbar';
import '../App.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB]">
      <GlobalNavbar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

