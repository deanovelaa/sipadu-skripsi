import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'sipadu_pengguna_list';
const defaultUsers = [
  { id: 1, nama: 'Afendi Kosasih', kecamatan: 'Pusat', noHp: '085956767897', peran: 'Verifikator DTPHP', status: 'Online' },
  { id: 2, nama: 'Azril', kecamatan: 'Pusat', noHp: '085956767897', peran: 'Pimpinan DTPHP', status: 'Nonaktif' },
  { id: 3, nama: 'Juan', kecamatan: 'Pusat', noHp: '085956767897', peran: 'Operator DTPHP', status: 'Offline' },
  { id: 4, nama: 'Agil', kecamatan: 'Kencong', noHp: '085956767897', peran: 'Kecamatan Kencong', status: 'Offline' },
];

const loadUsers = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : defaultUsers;
  } catch {
    return defaultUsers;
  }
};

const PenggunaPage = () => {
  const [users, setUsers] = useState(loadUsers);
  const [isConfirmNonaktifOpen, setIsConfirmNonaktifOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const actionMenuRef = useRef(null);

  const filteredUsers = users.filter(user =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.kecamatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.peran.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleActionMenu = (userId) => {
    setOpenActionMenu(openActionMenu === userId ? null : userId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openNonaktifModal = (userId) => {
    setOpenActionMenu(null);
    setSelectedUserId(userId);
    setIsConfirmNonaktifOpen(true);
  };

  const confirmNonaktif = () => {
    if (!selectedUserId) return;
    const selectedUser = users.find(u => u.id === selectedUserId);
    const newStatus = selectedUser?.status === 'Nonaktif' ? 'Offline' : 'Nonaktif';
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUserId ? { ...u, status: newStatus } : u))
    );
    setSelectedUserId(null);
    setIsConfirmNonaktifOpen(false);
  };

  useEffect(() => {
    if (users.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="bg-[#F8FAFC] px-8 py-6 flex items-center justify-between">
        <h1 className="text-black text-[24px] font-semibold">Pengguna</h1>
        <button
          onClick={() => navigate('/dtphp/pengguna/tambah')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] text-white text-[14px] font-medium hover:bg-[#15803D] transition-colors rounded-lg"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tambah Pengguna Baru
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white p-8 border border-[#E2E8F0] m-[40px] rounded-[16px]">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative flex">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-[#21272A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left w-[35%]">
                  Pengguna
                </th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                  Kecamatan
                </th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                  No Hp
                </th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                  Peran
                </th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                  <div className="flex items-center gap-1">
                    Status
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th className="py-4 px-6 w-12"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/30' : ''
                    }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span className="text-[14px] font-normal text-[#121619]">
                        {user.nama}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] text-[#121619]">
                      {user.kecamatan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] text-[#121619]">
                      {user.noHp}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F2F4F8] text-[12px] text-[#121619]">
                      {user.peran}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {user.status === 'Online' ? (
                      <div className="flex items-center gap-1.5 bg-green-100 px-2 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                        <span className="text-[12px] font-medium text-[#16A34A]">Online</span>
                      </div>
                    ) : user.status === 'Nonaktif' ? (
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-[12px] font-medium bg-[#FEE2E2] text-[#DC2626]">
                        Nonaktif
                      </span>
                    ) : (
                      <span className="text-[12px] text-gray-600 bg-gray-100 px-2 py-1 rounded-full">Offline</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right relative" ref={openActionMenu === user.id ? actionMenuRef : null}>
                    <button
                      onClick={() => toggleActionMenu(user.id)}
                      className="text-[#697077] hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 transform rotate-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    {openActionMenu === user.id && (
                      <div className="absolute right-6 top-full mt-1 w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => {
                            navigate('/dtphp/pengguna/edit');
                            setOpenActionMenu(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit Profil
                        </button>
                        <button
                          onClick={() => openNonaktifModal(user.id)}
                          className={`w-full text-left px-2 py-3 text-[13px] transition-colors flex items-center gap-2 ${
                            user.status === 'Nonaktif'
                              ? 'text-[#2563EB] hover:bg-blue-50'
                              : 'text-[#DC2626] hover:bg-red-50'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                          {user.status === 'Nonaktif' ? 'Aktifkan Pengguna' : 'Nonaktifkan Pengguna'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Konfirmasi Nonaktifkan/Aktifkan Pengguna */}
      {isConfirmNonaktifOpen && (() => {
        const selectedUser = users.find(u => u.id === selectedUserId);
        const isNonaktif = selectedUser?.status === 'Nonaktif';
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] px-8 py-8 relative">
              <button
                type="button"
                onClick={() => {
                  setIsConfirmNonaktifOpen(false);
                  setSelectedUserId(null);
                }}
                className="absolute top-6 right-6 text-[#6B7280] hover:text-[#111827]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-start gap-4">
                {isNonaktif ? (
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="48" height="48" rx="24" fill="#DBEAFE" />
                    <rect x="4" y="4" width="48" height="48" rx="24" stroke="#EFF6FF" strokeWidth="8" />
                    <g transform="translate(16, 16)">
                      <path d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                ) : (
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="48" height="48" rx="24" fill="#FECACA" />
                    <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF2F2" strokeWidth="8" />
                    <path d="M24 24C24 23.2044 24.3687 22.4413 25.0251 21.8787C25.6815 21.3161 26.5717 21 27.5 21H28.5C29.4283 21 30.3185 21.3161 30.9749 21.8787C31.6313 22.4413 32 23.2044 32 24C32.0368 24.6493 31.8617 25.2929 31.501 25.834C31.1402 26.3751 30.6135 26.7843 30 27C29.3865 27.2876 28.8598 27.8333 28.499 28.5547C28.1383 29.2761 27.9632 30.1343 28 31" stroke="#B43C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M28 35V35.01" stroke="#B43C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}

                <div className="flex-1">
                  <h3 className="text-[18px] font-semibold text-[#111827] mb-2">
                    {isNonaktif ? 'Aktifkan Pengguna?' : 'Nonaktifkan Pengguna?'}
                  </h3>
                  <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6">
                    {isNonaktif
                      ? 'Pengguna yang diaktifkan akan dapat mengakses sistem kembali.'
                      : 'Pengguna yang dinonaktifkan tidak akan dapat mengakses sistem hingga diaktifkan kembali.'}
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsConfirmNonaktifOpen(false);
                        setSelectedUserId(null);
                      }}
                      className="px-5 py-2.5 border border-gray-300 bg-white text-[14px] text-[#111827] hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={confirmNonaktif}
                      className={`px-5 py-2.5 text-white text-[14px] font-medium transition-colors rounded-xl ${
                        isNonaktif
                          ? 'bg-[#2563EB] hover:bg-[#1D4ED8]'
                          : 'bg-[#DC2626] hover:bg-[#B91C1C]'
                      }`}
                    >
                      {isNonaktif ? 'Aktifkan' : 'Nonaktifkan'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default PenggunaPage;
