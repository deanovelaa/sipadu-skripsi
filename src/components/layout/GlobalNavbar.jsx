import logo from "../../assets/images/sipadu-logo.png";
import { useNavigate } from "react-router-dom";

const GlobalNavbar = () => {
  const navigate = useNavigate();
  const handleExportPDF = () => {
    window.print();
  };
  return (
    <nav className="w-full h-[128px] bg-white px-[44px] py-[44px]">
      <div className="h-full flex items-center justify-between">
        {/* Logo Section */}
        <div className="h-[44px] flex items-center gap-3">
          <div className="flex items-center gap-1">
            {/* Logo Icon Placeholder */}
            <img
              src={logo}
              alt="SIPADU Jember"
              className=" w-auto h-[32px]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={handleExportPDF} className="px-4 py-2 w-[100px] h-[40px] bg-[#000000] text-white text-[14px] font-semibold hover:bg-gray-800 transition-colors">
            Export
          </button>
          <button onClick={() => navigate('/login')} className="px-4 py-2 w-[100px] h-[40px] bg-[#16A34A] text-white text-[14px] font-semibold hover:bg-green-800 transition-colors">
            Masuk
          </button>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
