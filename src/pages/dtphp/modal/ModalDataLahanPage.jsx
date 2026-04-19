import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ModalDataLahanPage = () => {
  // --- States ---
  const [activeTab, setActiveTab] = useState('Data Lahan Produksi');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('Semua Kecamatan');
  const [expandedItems, setExpandedItems] = useState(['Kencong', 'Jagung', 'Padi']);
  const [isSearchTriggered, setIsSearchTriggered] = useState(true);
  const [komoditiSearch, setKomoditiSearch] = useState('');

  // --- Data Source Lengkap (2020 - 2025) ---
  const allData = {
    'Data Lahan Produksi': [
      // DATA 2025
      { kecamatan: 'Kencong', totalLuas: '5,000', tren: '+90%', tahun: '2025', desa: [{ nama: 'Paseban', luas: '1,000', tren: '+90%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }, { nama: 'Cakru', luas: '1,000', tren: '+80%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      { kecamatan: 'Gumukmas', totalLuas: '4,500', tren: '+10%', tahun: '2025', desa: [{ nama: 'Bagorejo', luas: '2,000', tren: '+5%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      // DATA 2024
      { kecamatan: 'Kencong', totalLuas: '4,200', tren: '+15%', tahun: '2024', desa: [{ nama: 'Paseban', luas: '900', tren: '+5%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      { kecamatan: 'Puger', totalLuas: '3,800', tren: '+8%', tahun: '2024', desa: [{ nama: 'Grenden', luas: '1,800', tren: '+4%', jenis: 'Sawah Tadah Hujan', status: 'Sewa', air: 'Pompa', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      // DATA 2023
      { kecamatan: 'Wuluhan', totalLuas: '4,100', tren: '+5%', tahun: '2023', desa: [{ nama: 'Dukuhdempit', luas: '1,500', tren: '+2%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      { kecamatan: 'Kencong', totalLuas: '3,900', tren: '+10%', tahun: '2023', desa: [{ nama: 'Kraton', luas: '1,200', tren: '+6%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      // DATA 2022
      { kecamatan: 'Ambulu', totalLuas: '3,500', tren: '+3%', tahun: '2022', desa: [{ nama: 'Sumberejo', luas: '1,100', tren: '+1%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      // DATA 2021
      { kecamatan: 'Gumukmas', totalLuas: '3,800', tren: '+2%', tahun: '2021', desa: [{ nama: 'Menampu', luas: '1,000', tren: '+1%', jenis: 'Sawah Irigasi', status: 'Milik Sendiri', air: 'Irigasi Teknis', pemanfaatan: 'Lahan Aktif Ditanami' }] },
      // DATA 2020
      { kecamatan: 'Puger', totalLuas: '3,000', tren: '+0%', tahun: '2020', desa: [{ nama: 'Puger Kulon', luas: '800', tren: '+0%', jenis: 'Sawah Tadah Hujan', status: 'Milik Sendiri', air: 'Pompa', pemanfaatan: 'Lahan Aktif Ditanami' }] },
    ],
    'Data Produksi Panen': [
      // DATA 2025
      { komoditi: 'Jagung', luasTanam: '6,246', panenKotor: '6,200', panenBersih: '6,100', produktivitas: '65.5', produksiTon: '6,246', tren: '+35%', tahun: '2025', kecamatans: [{ nama: 'Kencong', luas: '1,246', pKotor: '1,200', pBersih: '1,150', produktivitas: '62.0', produksi: '1,200', tren: '+35%' }] },
      { komoditi: 'Padi', luasTanam: '12,500', panenKotor: '12,000', panenBersih: '11,800', produktivitas: '72.1', produksiTon: '15,000', tren: '+12%', tahun: '2025', kecamatans: [{ nama: 'Puger', luas: '4,500', pKotor: '4,200', pBersih: '4,100', produktivitas: '70.5', produksi: '6,000', tren: '+14%' }] },
      // DATA 2024
      { komoditi: 'Jagung', luasTanam: '5,800', panenKotor: '5,500', panenBersih: '5,400', produktivitas: '60.2', produksiTon: '5,200', tren: '+20%', tahun: '2024', kecamatans: [{ nama: 'Gumukmas', luas: '1,000', pKotor: '950', pBersih: '900', produktivitas: '58.0', produksi: '1,000', tren: '+15%' }] },
      { komoditi: 'Kedelai', luasTanam: '2,000', panenKotor: '1,800', panenBersih: '1,750', produktivitas: '15.5', produksiTon: '800', tren: '+5%', tahun: '2024', kecamatans: [{ nama: 'Wuluhan', luas: '1,000', pKotor: '900', pBersih: '850', produktivitas: '16.0', produksi: '450', tren: '+8%' }] },
      // DATA 2023
      { komoditi: 'Padi', luasTanam: '11,200', panenKotor: '10,500', panenBersih: '10,200', produktivitas: '68.0', produksiTon: '13,500', tren: '+8%', tahun: '2023', kecamatans: [{ nama: 'Ambulu', luas: '3,000', pKotor: '2,800', pBersih: '2,700', produktivitas: '65.0', produksi: '4,000', tren: '+5%' }] },
      // DATA 2022
      { komoditi: 'Jagung', luasTanam: '5,200', panenKotor: '5,000', panenBersih: '4,900', produktivitas: '58.5', produksiTon: '4,800', tren: '+5%', tahun: '2022', kecamatans: [{ nama: 'Kencong', luas: '900', pKotor: '850', pBersih: '800', produktivitas: '55.0', produksi: '900', tren: '+2%' }] },
      // DATA 2021
      { komoditi: 'Padi', luasTanam: '10,800', panenKotor: '10,000', panenBersih: '9,800', produktivitas: '66.5', produksiTon: '12,000', tren: '+4%', tahun: '2021', kecamatans: [{ nama: 'Gumukmas', luas: '2,500', pKotor: '2,400', pBersih: '2,300', produktivitas: '64.0', produksi: '3,200', tren: '+3%' }] },
      // DATA 2020
      { komoditi: 'Jagung', luasTanam: '4,800', panenKotor: '4,500', panenBersih: '4,400', produktivitas: '55.0', produksiTon: '4,200', tren: '+0%', tahun: '2020', kecamatans: [{ nama: 'Puger', luas: '800', pKotor: '750', pBersih: '700', produktivitas: '52.0', produksi: '800', tren: '+0%' }] },
    ]
  };

  // --- Logic Filter ---
  const filteredData = useMemo(() => {
    const yearToFilter = selectedYear;
    if (!isSearchTriggered && activeTab === 'Data Produksi Panen') return allData[activeTab];

    return allData[activeTab].filter(item => {
      const matchYear = yearToFilter ? item.tahun === yearToFilter : true;
      const matchKec = selectedKecamatan === 'Semua Kecamatan' ? true :
        (activeTab === 'Data Lahan Produksi' ? item.kecamatan === selectedKecamatan : (item.kecamatans?.some(k => k.nama === selectedKecamatan) ?? false));
      const matchKomoditi = activeTab !== 'Data Produksi Panen' || !komoditiSearch.trim()
        ? true
        : item.komoditi?.toLowerCase().includes(komoditiSearch.trim().toLowerCase());
      return matchYear && matchKec && matchKomoditi;
    });
  }, [activeTab, selectedYear, selectedKecamatan, isSearchTriggered, komoditiSearch]);

  // --- Handlers ---
  const toggleExpand = (id) => {
    setExpandedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleResetFilter = () => {
    setSelectedYear('');
    setSelectedKecamatan('Semua Kecamatan');
    setKomoditiSearch('');
    setIsSearchTriggered(true);
  };

  return (
    <div className="w-full max-h-[600px] bg-[#F8FAFC] pb-10" >

      {/* Container Utama */}
      <div className="bg-white p-8  rounded-[16px]">

        {/* Top Section: Tab and Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start gap-4">
            <span className="bg-gray-500 text-white px-[12px] py-[1px] rounded-full text-[12px] font-semibold shadow-sm">
              Data Lahan Produksi
            </span>
            <h2 className="text-[18px] font-semibold text-gray-950">
              Luas, Status, dan Kepemilikan Lahan per Desa
            </h2>
          </div>

        </div>
        {/* Navigasi Tab & Filter Bar */}
        <div className="pb-2 border-b border-[#F1F5F9]">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {activeTab === 'Data Produksi Panen' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <input
                    value={komoditiSearch}
                    onChange={(e) => { setKomoditiSearch(e.target.value); setIsSearchTriggered(true); }}
                    type="text"
                    placeholder="Cari Komoditi"
                    className="pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-[14px] focus:ring-2 focus:ring-[#16A34A]/20 min-w-[200px]"
                  />
                </div>
              )}

              <div className="relative flex items-center group justify-between">


                {/* Select dengan padding-left (pl-10) untuk memberi ruang bagi ikon */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-white border text-[#334155] border-[#E2E8F0] pl-4 pr-4 py-2.5 text-[14px] font-normal min-w-[140px] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer transition-all"
                >
                  <option value="">Semua Tahun</option>
                  {['2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>

                <div className="absolute right-3 pointer-events-none text-[#94A3B8]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="relative flex items-center min-w-[200px]">
                {/* Ikon di Sebelah Kiri (Filter Icon) */}
                <div className="absolute left-3 pointer-events-none text-[#94A3B8]">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7501 2.3501C16.7501 1.79005 16.7497 1.50981 16.6407 1.2959C16.5449 1.10774 16.3925 0.954867 16.2043 0.858993C15.9904 0.75 15.7098 0.75 15.1497 0.75H2.34973C1.78968 0.75 1.50993 0.75 1.29602 0.858993C1.10786 0.954867 0.954989 1.10774 0.859116 1.2959C0.750122 1.50981 0.750122 1.79005 0.750122 2.3501V3.08736C0.750122 3.33195 0.750122 3.45433 0.777752 3.56942C0.802249 3.67146 0.842754 3.76893 0.897583 3.8584C0.959405 3.95928 1.04603 4.04591 1.21887 4.21875L6.28161 9.28149C6.45455 9.45443 6.54056 9.54044 6.6024 9.64135C6.65723 9.73082 6.69828 9.82863 6.72278 9.93066C6.75013 10.0446 6.75012 10.1655 6.75012 10.4052V15.161C6.75012 16.0182 6.75012 16.4471 6.93067 16.7052C7.08832 16.9306 7.33153 17.081 7.60364 17.1212C7.91526 17.1672 8.29883 16.9757 9.06555 16.5924L9.86555 16.1924C10.1866 16.0319 10.3468 15.9513 10.464 15.8315C10.5678 15.7256 10.6471 15.5985 10.6954 15.4584C10.7501 15.2999 10.7501 15.12 10.7501 14.761V10.4126C10.7501 10.168 10.7501 10.0458 10.7778 9.93066C10.8022 9.82863 10.8428 9.73082 10.8976 9.64135C10.959 9.54111 11.0448 9.45533 11.2154 9.28469L11.2189 9.28149L16.2816 4.21875C16.4546 4.0458 16.5406 3.95932 16.6024 3.8584C16.6572 3.76893 16.6983 3.67146 16.7228 3.56942C16.7501 3.45551 16.7501 3.33444 16.7501 3.0948V2.3501Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <select
                  value={selectedKecamatan}
                  onChange={(e) => setSelectedKecamatan(e.target.value)}
                  className="appearance-none bg-white text-[#334155] border border-[#E2E8F0] pl-10 pr-10 py-2.5 text-[14px] font-normal w-full focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer transition-all"
                >
                  <option value="Semua Kecamatan">Semua Kecamatan</option>
                  <option value="Kencong">Kencong</option>
                  <option value="Gumukmas">Gumukmas</option>
                  <option value="Puger">Puger</option>
                  <option value="Wuluhan">Wuluhan</option>
                  <option value="Ambulu">Ambulu</option>
                </select>

                <div className="absolute right-3 pointer-events-none text-[#94A3B8]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.25 10.75L12 14.25L8.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <button
                type="button"
                className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0]  hover:bg-slate-50 transition-colors shadow-sm"
              >
                {/* Icon Funnel/Filter */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5.6001C20 5.04005 19.9996 4.75981 19.8906 4.5459C19.7948 4.35774 19.6423 4.20487 19.4542 4.10899C19.2403 4 18.9597 4 18.3996 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7084C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9808 14.1475 12.8914C14.2089 12.7911 14.2947 12.7053 14.4653 12.5347L14.4688 12.5315L19.5315 7.46875C19.7044 7.2958 19.7904 7.20932 19.8523 7.1084C19.9071 7.01893 19.9482 6.92146 19.9727 6.81942C20 6.70551 20 6.58444 20 6.3448V5.6001Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                {/* Label Text */}
                <span className="text-[#334155] text-sm font-normal">
                  Filter
                </span>
              </button>

              {(selectedYear !== '' || selectedKecamatan !== 'Semua Kecamatan' || komoditiSearch.trim() !== '') && (
                <button type="button" onClick={handleResetFilter} className="text-[14px] text-black font-semibold ml-2 hover:text-red-600 transition-colors">Hapus Filter</button>
              )}
            </div>
          </div>
        </div>

        {/* Area Konten Dinamis */}
        {/* Content Area */}
        <div className="flex-grow flex flex-col overflow-hidden justify-start">
          <div className="w-full h-full overflow-auto scrollbar-hide">
            {/* min-w-max memastikan tabel tidak menciut dan teks tetap 1 baris */}
            <table className="w-full border-collapse min-w-max table-fixed ">
              <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9] sticky top-0 z-10">
                {/* Tambahkan font-normal di sini untuk menimpa bold bawaan <th> */}
                <tr className="text-[#121619] text-[12px] font-medium whitespace-nowrap">
                  <th className="py-5 px-6 text-left font-semibold">Komoditi</th>
                  <th className="py-5 px-6 text-left font-semibold">Kecamatan</th>
                  <th className="py-5 px-6 text-left font-semibold">Luas Lahan (Ha.)</th>
                  <th className="py-5 px-6 text-left font-semibold">Jenis Lahan</th>
                  <th className="py-5 px-6 text-left font-semibold">Status Kepemilikan</th>
                  <th className="py-5 px-6 text-left font-semibold">Ketersediaan Air</th>
                  <th className="py-5 px-6 text-left font-semibold">Status Pemanfaatan Lahan</th>
                  <th className="py-5 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredData.length > 0 ? filteredData.map((row, idx) => {
                  const rowId = activeTab === 'Data Lahan Produksi' ? row.kecamatan : row.komoditi;
                  const isExpanded = expandedItems.includes(rowId);
                  return (
                    <React.Fragment key={idx}>
                      {/* Gunakan whitespace-nowrap agar teks di body juga tidak turun ke bawah */}
                      <tr className="hover:bg-[#FDFDFD] group transition-colors whitespace-nowrap font-normal">
                        <td className="py-5 px-6 font-normal">
                          <button onClick={() => toggleExpand(rowId)} className="flex items-center gap-4 active:scale-95">
                            <div className={`p-1 rounded-md transition-all ${isExpanded ? '' : 'text-gray-400'}`}>
                              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                            <span className="bg-[#F2F4F8] px-[10px] py-1 rounded-full text-[13px] text-[#21272A] font-normal group-hover:bg-[#E2E8F0] min-w-max text-left">{rowId}</span>
                          </button>
                        </td>
                        <td className="py-5 px-6 text-gray-300 font-normal">—</td>
                        {activeTab === 'Data Lahan Produksi' ? (
                          <td className="py-5 px-6 font-normal">
                            <div className="flex items-center gap-2 text-[#111827] text-[12px] w-max">
                              {row.totalLuas}
                              <div className="flex items-center justify-center opacity-100 border bg-[#05C168]/20 text-green-600 border-[#05C168]/20 text-[10px] px-[2px] text-[10px] px-[2px]">
                                {row.tren} <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_1049_4157)">
                                    <path d="M1.33317 6.6665L6.6665 1.33317" stroke="#14CA74" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.6665 6.36133V1.33304H1.63822" stroke="#14CA74" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1049_4157">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>

                              </div>
                            </div>
                          </td>
                        ) : (
                          <>
                            {[row.luasTanam, row.panenKotor, row.panenBersih, row.produktivitas, row.produksiTon].map((val, i) => (
                              <td key={i} className="py-5 px-6 font-normal">
                                <div className="flex items-center gap-2 text-[#111827] text-[12px] w-max">
                                  {val}
                                  <div className="flex items-center justify-center opacity-100 border bg-[#05C168]/20 text-green-600 border-[#05C168]/20 text-[10px] px-[2px] text-[10px] px-[2px]">
                                    {row.tren} <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M7 17 17 7M7 7h10v10" /></svg>
                                  </div>
                                </div>
                              </td>
                            ))}
                          </>
                        )}
                        <td colSpan={activeTab === 'Data Lahan Produksi' ? 4 : 0}> </td>
                        <td className="py-5 px-6 text-right font-normal"><button className="text-[#697077] hover:text-gray-600 transition-colors" onClick={() => navigate(`/dtphp/pencatatan/pemantauan/detail/lahan`)}>
                          <svg
                            className="w-5 h-5 transform rotate-90"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"                        >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button></td>
                      </tr>

                      {isExpanded && (activeTab === 'Data Lahan Produksi' ? row.desa : row.kecamatans)?.map((child, cIdx) => (
                        <tr key={cIdx} className="bg-[#F8FAFC]/30 border-t border-[#F1F5F9]/50 whitespace-nowrap font-normal">
                          <td className="py-3 px-6"></td>
                          <td className="py-3 px-6 font-normal">
                            <span className="bg-[#F2F4F8] px-4 py-[1px] rounded-full text-[12px] text-[#21272A] font-normal border border-[#E2E8F0] shadow-sm inline-block min-w-max">
                              {child.nama}
                            </span>
                          </td>
                          {activeTab === 'Data Lahan Produksi' ? (
                            <>
                              <td className="py-3 px-6 font-normal">
                                <div className="flex items-center gap-2 min-w-max">
                                  <span className="text-[13px] font-normal">{child.luas}</span>
                                  <div className="flex items-center justify-center opacity-100 border bg-[#05C168]/20 text-green-600 border-[#05C168]/20 text-[10px] px-[2px] text-[10px] px-[2px]">{child.tren}</div>
                                </div>
                              </td>
                              <td className="py-3 px-6 font-normal"><span className="bg-[#F4EBFF] text-black text-[10px] px-2 py-[1px] rounded-lg font-normal  min-w-max inline-block">{child.jenis}</span></td>
                              <td className="py-3 px-6 font-normal"><span className="bg-[#FEF9C3] text-black text-[10px] px-2 py-[1px] rounded-lg font-normal  min-w-max inline-block">{child.status}</span></td>
                              <td className="py-3 px-6 font-normal"><span className="bg-[#E0F2FE] text-black text-[10px] px-2 py-[1px] rounded-lg font-normal  min-w-max inline-block">{child.air}</span></td>
                              <td className="py-3 px-6 font-normal"><span className="bg-[#FFE4E8] text-black text-[10px] px-2 py-[1px] rounded-lg font-normal  min-w-max inline-block">{child.pemanfaatan}</span></td>
                            </>
                          ) : (
                            <>
                              {[child.luas, child.pKotor, child.pBersih, child.produktivitas, child.produksi].map((val, i) => (
                                <td key={i} className="py-3 px-6 font-normal">
                                  <div className="flex items-center gap-2 min-w-max">
                                    <span className="text-[13px] font-normal">{val}</span>
                                    <div className="flex items-center justify-center opacity-100 border bg-[#05C168]/20 text-green-600 border-[#05C168]/20 text-[10px] px-[2px]">{child.tren}</div>
                                  </div>
                                </td>
                              ))}
                            </>
                          )}
                          <td className="py-3 px-6 text-right font-normal"><button className="text-[#697077] hover:text-gray-600 transition-colors" onClick={() => navigate(`/dtphp/pencatatan/pemantauan/detail/lahan`)}>
                            <svg
                              className="w-5 h-5 transform rotate-90"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"                        >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                              />
                            </svg>
                          </button></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                }) : (
                  <tr><td colSpan={10} className="py-20 text-center text-gray-400 font-normal italic tracking-wide">Data tidak tersedia untuk filter tahun ini.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDataLahanPage;