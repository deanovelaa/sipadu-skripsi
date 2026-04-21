import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoPemkab from "../../assets/images/logo-jember.png";
import LogoIcon from "../../assets/images/logo-icon.png";

const GlobalSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPencatatanOpen, setIsPencatatanOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Helper untuk menentukan prefix route berdasarkan posisi user
  const isDTPHP = location.pathname.startsWith("/dtphp");
  const isPimpinan = location.pathname.startsWith("/pimpinan");

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const rolePrefix = isDTPHP ? "/dtphp" : isPimpinan ? "/pimpinan" : "/kecamatan";

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setIsPencatatanOpen(false);
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <div
      className={`${isMinimized ? "w-[80px]" : "w-[280px]"
        } h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Top Section - Branding */}
      <div
        className={`${isMinimized ? "px-4" : "px-6"
          } py-6 border-b border-gray-200 flex ${isMinimized ? "justify-center" : ""
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={LogoIcon} alt="SIPADU Jember" className="w-[26.16922378540039px] h-[26.16922378540039px]" />
          </div>
          {!isMinimized && (
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              SIPADU Jember
            </h1>
          )}
        </div>
      </div>

      {/* Middle Section - Navigation */}
      <nav
        className={`flex-1 ${isMinimized ? "px-2" : "px-4"
          } py-4 overflow-y-auto`}
      >
        <ul className="space-y-1">
          {/* DASHBOARD - Dinamis ke role masing-masing */}
          <li>
            <Link
              to={`${rolePrefix}/dashboard`}
              className={`flex items-center ${isMinimized ? "justify-center px-2" : "gap-3 px-4"
                } py-3 rounded-lg transition-colors ${isActive("/kecamatan/dashboard") || isActive("/dtphp/dashboard") || isActive("/pimpinan/dashboard")
                  ? "bg-green-50 text-[#16A34A]"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              title={isMinimized ? "Dashboard" : ""}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="white" />
                <path
                  d="M4 11.4522V16.8002C4 17.9203 4 18.4807 4.21799 18.9086C4.40973 19.2849 4.71547 19.5906 5.0918 19.7823C5.5192 20.0001 6.07899 20.0001 7.19691 20.0001H16.8031C17.921 20.0001 18.48 20.0001 18.9074 19.7823C19.2837 19.5906 19.5905 19.2849 19.7822 18.9086C20 18.4811 20 17.9216 20 16.8037V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522Z"
                  fill={
                    isActive("/kecamatan/dashboard") ||
                      isActive("/dtphp/dashboard") ||
                      isActive("/pimpinan/dashboard")
                      ? "#16A34A"
                      : "#1F2937"
                  }
                />
              </svg>
              {!isMinimized && <span className="font-medium">Dashboard</span>}
            </Link>
          </li>

          {/* PENCATATAN - Expandable & Contextual based on Role */}
          <li>
            <button
              onClick={() =>
                !isMinimized && setIsPencatatanOpen(!isPencatatanOpen)
              }
              className={`w-full flex items-center ${isMinimized
                ? "justify-center px-2"
                : "justify-between gap-3 px-4"
                } py-3 rounded-lg transition-colors ${location.pathname.includes("/pencatatan") ||
                  location.pathname.includes("/pemantauan")
                  ? "bg-green-50 text-[#16A34A]"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              <div
                className={`flex items-center ${isMinimized ? "" : "gap-3"}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    d="M4 20.0001V16.0001L12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001L8 20.0001L4 20.0001Z"
                    fill={
                      location.pathname.includes("/pencatatan")
                        ? "#16A34A"
                        : "#1F2937"
                    }
                  />
                </svg>
                {!isMinimized && (
                  <span className="font-medium">Pencatatan</span>
                )}
              </div>
              {!isMinimized && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-300 ${isPencatatanOpen ? "rotate-180" : ""
                    }`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke={
                      location.pathname.includes("/pencatatan")
                        ? "#16A34A"
                        : "#6B7280"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Sub-menu dinamis */}
            {!isMinimized && isPencatatanOpen && (
              <ul className="mt-1 ml-8 space-y-1">
                <li>
                  <Link
                    to={
                      rolePrefix === "/pimpinan"
                        ? "/pimpinan/pencatatan/progress"
                        : `${rolePrefix}/pencatatan/buat-data-baru`
                    }
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${isActive(`${rolePrefix}/pencatatan/buat-data-baru`) ||
                        isActive(`${rolePrefix}/pencatatan/buat-data-baru-lahan`) ||
                        isActive(`${rolePrefix}/pencatatan/buat-data-baru-panen`) ||
                        isActive("/pimpinan/pencatatan/progress")
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {/* Perbaikan Logika Indikator Garis Hijau */}
                    {(isActive(`${rolePrefix}/pencatatan/buat-data-baru`) ||
                      isActive(`${rolePrefix}/pencatatan/buat-data-baru-lahan`) ||
                      isActive(`${rolePrefix}/pencatatan/buat-data-baru-panen`) ||
                      isActive("/pimpinan/pencatatan/progress")) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] rounded-r"></div>
                      )}

                    <span className="text-sm font-medium">
                      {rolePrefix === "/pimpinan" ? "Progress" : "Buat Data Baru"}
                    </span>
                  </Link>
                </li>

                {/* 2. Pemantauan (available for both roles) */}
                <li>
                  <Link
                    to={`${rolePrefix}/pencatatan/pemantauan`}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${isActive("/kecamatan/pencatatan/pemantauan") ||
                      isActive("/dtphp/pencatatan/pemantauan") ||
                      isActive("/pimpinan/pencatatan/pemantauan") ||
                      isActive("/kecamatan/pencatatan/perbaiki-data-lahan") ||
                      isActive("/dtphp/pencatatan/perbaiki-data-lahan") ||
                      isActive("/pimpinan/pencatatan/perbaiki-data-lahan") ||
                      isActive("/kecamatan/pencatatan/perbaiki-data-panen") ||
                      isActive("/dtphp/pencatatan/perbaiki-data-panen") ||
                      isActive("/pimpinan/pencatatan/perbaiki-data-panen")
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {(isActive("/kecamatan/pencatatan/pemantauan") ||
                      isActive("/dtphp/pencatatan/pemantauan") ||
                      isActive("/pimpinan/pencatatan/pemantauan")) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] rounded-r"></div>
                      )}
                    <span className="text-sm font-medium">Pemantauan</span>
                  </Link>
                </li>

                {/* 3. Kelola Format Pencatatan (available for both roles) */}

              </ul>
            )}
          </li>

          {/* DATABASE (available for both roles) */}
          <li>
            <Link
              to={`${rolePrefix}/database`}
              className={`flex items-center ${isMinimized ? "justify-center px-2" : "gap-3 px-4"
                } py-3 rounded-lg transition-colors ${isActive("/dtphp/database") || isActive("/kecamatan/database") || isActive("/pimpinan/database")
                  ? "bg-green-50 text-[#16A34A]"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              title={isMinimized ? "Database" : ""}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.46875 4.46875L11.5315 7.53149C11.7044 7.70444 11.7904 7.79044 11.8523 7.89135C11.9071 7.98082 11.9482 8.07863 11.9727 8.18066C12 8.29458 12 8.41553 12 8.65515V16V17.3999C12 17.9599 11.9996 18.24 11.8906 18.4539C11.7948 18.6421 11.6423 18.7952 11.4542 18.8911C11.2405 19 10.96 19 10.4011 19L2.598 19C2.03902 19 1.7596 19 1.5459 18.8911C1.35774 18.7952 1.20487 18.6419 1.10899 18.4537C1 18.2398 1 17.9601 1 17.4001V5.6001C1 5.04004 1 4.75981 1.10899 4.5459C1.20487 4.35774 1.35774 4.20487 1.5459 4.10899C1.75981 4 2.03956 4 2.59961 4H7H7.33687C7.58146 4 7.70385 4 7.81893 4.02763C7.92097 4.05213 8.01893 4.09263 8.1084 4.14746C8.20928 4.20928 8.29591 4.29591 8.46875 4.46875Z"
                  fill="#111827"
                />
                <path
                  d="M7 4H7.33687C7.58146 4 7.70385 4 7.81893 4.02763C7.92097 4.05213 8.01893 4.09263 8.1084 4.14746C8.20928 4.20928 8.29591 4.29591 8.46875 4.46875L11.5315 7.53149C11.7044 7.70444 11.7904 7.79044 11.8523 7.89135C11.9071 7.98082 11.9482 8.07863 11.9727 8.18066C12 8.29458 12 8.41553 12 8.65515V16M7 4H2.59961C2.03956 4 1.75981 4 1.5459 4.10899C1.35774 4.20487 1.20487 4.35774 1.10899 4.5459C1 4.75981 1 5.04004 1 5.6001V17.4001C1 17.9601 1 18.2398 1.10899 18.4537C1.20487 18.6419 1.35774 18.7952 1.5459 18.8911C1.7596 19 2.03902 19 2.598 19L10.4011 19C10.96 19 11.2405 19 11.4542 18.8911C11.6423 18.7952 11.7948 18.6421 11.8906 18.4539C11.9996 18.24 12 17.9599 12 17.3999V16M7 4V7.4C7 7.96005 7 8.23988 7.10899 8.4538C7.20487 8.64196 7.35774 8.79524 7.5459 8.89111C7.7596 9 8.03901 9 8.59797 9H11.9996M8 4.0001V2.6001C8 2.04005 8 1.75981 8.10899 1.5459C8.20487 1.35774 8.35774 1.20487 8.5459 1.10899C8.75981 1 9.03956 1 9.59961 1H14M14 1H14.3369C14.5815 1 14.7038 1 14.8189 1.02763C14.921 1.05213 15.0189 1.09263 15.1084 1.14746C15.2093 1.20928 15.2959 1.29592 15.4688 1.46875L18.5315 4.53149C18.7044 4.70444 18.7904 4.79044 18.8523 4.89135C18.9071 4.98082 18.9482 5.07863 18.9727 5.18066C19 5.29458 19 5.41552 19 5.65515V14.3999C19 14.9599 18.9996 15.24 18.8906 15.4539C18.7948 15.6421 18.6429 15.7952 18.4548 15.8911C18.2411 16 17.961 16 17.402 16H12M14 1V4.4C14 4.96005 14 5.23988 14.109 5.4538C14.2049 5.64196 14.3577 5.79524 14.5459 5.89111C14.7596 6 15.039 6 15.598 6H18.9996"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {!isMinimized && <span className="font-medium">Database</span>}
            </Link>
          </li>

          {/* PENGGUNA (available for both roles) */}
          <li>
            <Link
              to={`${rolePrefix}/pengguna`}
              className={`flex items-center ${isMinimized ? "justify-center px-2" : "gap-3 px-4"
                } py-3 rounded-lg transition-colors ${isActive("/dtphp/pengguna") || isActive("/kecamatan/pengguna") || isActive("/pimpinan/pengguna")
                  ? "bg-green-50 text-[#16A34A]"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              title={isMinimized ? "Pengguna" : ""}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.21289 15.6491C1.21289 12.9398 3.4092 10.7435 6.1185 10.7435H11.881C14.5902 10.7435 16.7866 12.9398 16.7866 15.6491V15.7647C16.7866 16.6678 16.0545 17.3999 15.1514 17.3999H2.84809C1.94499 17.3999 1.21289 16.6678 1.21289 15.7647V15.6491Z"
                  fill="#111827"
                />
                <path
                  d="M9.00204 9.47522C11.4529 9.47522 13.4396 7.48844 13.4396 5.03763C13.4396 2.58681 11.4529 0.600037 9.00204 0.600037C6.55123 0.600037 4.56445 2.58681 4.56445 5.03763C4.56445 7.48844 6.55123 9.47522 9.00204 9.47522Z"
                  fill="#111827"
                />
              </svg>
              {!isMinimized && (
                <span className="font-medium ml-1">Pengguna</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom Section */}
      <div
        className={`border-t border-gray-200 ${isMinimized ? "px-2" : "px-4"
          } py-4 space-y-4`}
      >
        {/* Pemkab Box */}
        <div
          className={`bg-red-50 border border-red-200 rounded-lg p-3 flex items-center ${isMinimized ? "justify-center" : "justify-between"
            }`}
        >
          {!isMinimized && (
            <span className="text-sm font-medium text-red-800">
              Pemkab Jember
            </span>
          )}
          <img src={logoPemkab} alt="Pemkab Jember" className="w-8 h-8" />
        </div>

        {/* Minimize Button */}
        <button
          onClick={toggleMinimize}
          className={`w-full flex items-center ${isMinimized ? "justify-center px-2" : "gap-3 px-4"
            } py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMinimized ? (
              <path
                d="M10 19H5V14M14 5H19V10"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M5 14H10V19M19 10H14V5"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
          {!isMinimized && (
            <span className="text-sm font-medium">Minimize</span>
          )}
        </button>

        

        {/* User Profile */}
        <div
          className={`flex items-center ${isMinimized ? "justify-center px-2" : "gap-3 px-2"
            } py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer`}
        >
          <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
            J
          </div>
          {!isMinimized && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {isDTPHP ? "Juan" : isPimpinan ? "Pimpinan" : "Affendi Kos"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isDTPHP ? "Operator DTPHP" : isPimpinan ? "Pimpinan" : "Kecamatan Kencong"}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          title={isMinimized ? "Keluar" : ""}
          className={`w-full flex justify-center items-center ${isMinimized ? "justify-center px-2" : "gap-3 px-4"
            } py-2.5 rounded-lg text-[#DC2626] hover:bg-red-50 transition-colors`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12L16 9M12 12H19H12ZM19 12L16 15L19 12Z"
              stroke="#DC2626"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
              stroke="#DC2626"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!isMinimized && (
            <span className="text-sm font-medium">Keluar</span>
          )}
        </button>
      </div>

      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsLogoutModalOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
          >
            <h2
              id="logout-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              Konfirmasi keluar
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Apakah Anda yakin ingin keluar dari SIPADU Jember?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="rounded-lg bg-[#DC2626] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#B91C1C] transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSidebar;
