import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BuatDataBaruPage = () => {
  const navigate = useNavigate();
  const [isJudulOpen, setIsJudulOpen] = useState(false);
  const [selectedJudul, setSelectedJudul] = useState('');
  const [judulSearch, setJudulSearch] = useState('');
  const judulDropdownRef = useRef(null);
  const judulSearchRef = useRef(null);

  const judulOptions = [
    'Data Lahan Panen',
    'Data Produksi Panen',
  ];

  const filteredJudul = judulOptions.filter(option =>
    option.toLowerCase().includes(judulSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (judulDropdownRef.current && !judulDropdownRef.current.contains(event.target)) {
        setIsJudulOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* Input Judul Pencatatan (Dropdown) */}
        <div className="relative mb-3" ref={judulDropdownRef}>
          <div
            className="flex items-center justify-between px-6 py-4 border border-gray-200 rounded-lg bg-[#F8FAFC] cursor-pointer hover:border-gray-300 transition-all"
            onClick={() => setIsJudulOpen(!isJudulOpen)}
          >
            <input
              ref={judulSearchRef}
              type="text"
              placeholder="Judul Pencatatan.."
              value={judulSearch !== '' ? judulSearch : selectedJudul}
              onChange={(e) => setJudulSearch(e.target.value)}
              className="w-full text-[16px] font-weight-400 font-medium font-mona-sans bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400"
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.75 20.0625L15.9338 14.2453C16.8711 12.9572 17.3753 11.4049 17.3738 9.81188C17.3738 5.64234 13.9814 2.25 9.81188 2.25C5.64234 2.25 2.25 5.64234 2.25 9.81188C2.25 13.9814 5.64234 17.3738 9.81188 17.3738C11.4049 17.3753 12.9572 16.8711 14.2453 15.9338L20.0625 21.75L21.75 20.0625ZM9.81188 14.9855C8.7885 14.9856 7.78809 14.6822 6.93714 14.1137C6.0862 13.5452 5.42296 12.7371 5.03129 11.7917C4.63961 10.8462 4.53711 9.80583 4.73674 8.80211C4.93637 7.7984 5.42916 6.87643 6.15279 6.15279C6.87643 5.42916 7.7984 4.93637 8.80211 4.73674C9.80583 4.53711 10.8462 4.63961 11.7917 5.03129C12.7371 5.42296 13.5452 6.0862 14.1137 6.93714C14.6822 7.78809 14.9856 8.7885 14.9855 9.81188C14.9839 11.1835 14.4383 12.4985 13.4684 13.4684C12.4985 14.4383 11.1835 14.9839 9.81188 14.9855Z" fill="#697077" />
            </svg>
          </div>

          {isJudulOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto py-2">
              {filteredJudul.length > 0 ? (
                filteredJudul.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedJudul(option);
                      setJudulSearch('');
                      setIsJudulOpen(false);
                    }}
                    className="px-6 py-3 cursor-pointer hover:bg-gray-50 text-gray-700 text-sm font-medium"
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-[14px] font-weight-400 font-medium font-mona-sans text-gray-400 italic">Hasil tidak ditemukan</div>
              )}
            </div>
          )}
        </div>

        {/* Format Data Cards */}
        <div className="space-y-1">
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
              onClick={() => navigate(getNavigationPath(format.id))}
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