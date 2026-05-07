// IMPORTS
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// KOMPONEN UTAMA
const BuatDataBaruPage = () => {
  // INISIALISASI NAVIGATE
  const navigate = useNavigate();
  // STATE
  const [_isJudulOpen, setIsJudulOpen] = useState(false);
  const [judulSearch, _setJudulSearch] = useState('');
  
  // USEREF SEARCH BAR
  const judulDropdownRef = useRef(null);
  const _judulSearchRef = useRef(null);

  // DATA DROPDOWN
  const judulOptions = [
    'Data Lahan Panen',
    'Data Produksi Panen',
  ];

  // FILTERING DROPDOWN DI SEARCH BAR
  const _filteredJudul = judulOptions.filter(option =>
    option.toLowerCase().includes(judulSearch.toLowerCase())
  );

  // USEEFFECT
  useEffect(() => {
    // MENUTUP DROPDOWN SAAT KLIK DI LUAR AREA
    const handleClickOutside = (event) => {
      if (judulDropdownRef.current && !judulDropdownRef.current.contains(event.target)) {
        setIsJudulOpen(false);
      }
    };
    // ARTINYA: SAAT USER KLIK MOUSE -> JALANKAN handleClickOutside
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // DATA FORMAT
  const formatData = [
    {
      id: 1,
      title: "Data Lahan Panen",
      subtitle: "Luas, Status, dan Kepemilikan Lahan per Desa",
      description: "Digunakan untuk mengoleksi data lengkap per desa setiap kecamatan Kabupaten Jember"
    },
    {
      id: 2,
      title: "Data Produksi Panen",
      subtitle: "Luas Panen, Produktivitas, dan Produksi per Desa",
      description: "Digunakan untuk menyimpan data lengkap komoditi utama Kabupaten Jember"
    }
  ];

  return (
    // CONTAINER UTAMA: TAILWIND CSS
    <div className="w-full min-h-screen bg-white p-12">
      {/* Page Title */}
      <h1 className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900 mb-5">
        Buat Data Baru
      </h1>

      {/* Main Container */}
      <div className="rounded-[20px] border border-gray-100 shadow-sm p-5 bg-white">
        <h2 className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900 mb-8">
          Pilih Format Data
        </h2>

        {/* Format Data Cards */}
        <div className="space-y-1">
          {/* LOOPING ARRAY JADI UI (MAPPING DATA) */}
          {formatData.map((format) => {
            const getNavigationPath = (id) => {
              if (id === 1) {
                return '/dtphp/pencatatan/buat-data-baru-lahan';
              } else if (id === 2) {
                return '/dtphp/pencatatan/buat-data-baru-panen';
              }
              return '/dtphp/pencatatan/buat-data-baru';
            };

            return (
            <div
              key={format.id}
              // DYNAMIC NAVIGATION UNTUK MENENTUKAN ROUTE BERDASARKAN ID
              onClick={() => navigate(getNavigationPath(format.id))}S
              className="block w-full text-left p-8 border border-gray-100 rounded-xl bg-white hover:border-green-700 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="mb-2">
                <span className="text-[15px] font-weight-400 font-[16px] font-mona-sans text-[#21272A]">
                  {format.title}
                </span>
              </div>
              <h3 className="text-[22px] font-semibold font-mona-sans text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                {format.subtitle}
              </h3>
              <p className="text-[16px] font-weight-400 font-[16px] font-mona-sans text-[#21272A] max-w-3xl">
                {format.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuatDataBaruPage;