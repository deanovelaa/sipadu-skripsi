import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailDataLahanPage = () => {
  const navigate = useNavigate();
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2020');
  const [selectedLocation, setSelectedLocation] = useState('Kencong');
  const [desaSearch, setDesaSearch] = useState('');
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]); // Menyimpan ID data (child) yang dicentang
  const [expandedDesa, setExpandedDesa] = useState([]);
  const [showPercentage, setShowPercentage] = useState(true);

  const [isLaporkanModalOpen, setIsLaporkanModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isConfirmVerifikasiOpen, setIsConfirmVerifikasiOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const yearDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const locations = ['Kencong', 'Gumukmas', 'Puger', 'Wuluhan', 'Ambulu'];

  // STRUKTUR DATA DIPERBARUI: Ditambahkan 'children' untuk menampung rincian data
  const [rows, setRows] = useState([
    {
      id: 1,
      desa: 'Paseban',
      location: 'Kencong',
      luasLahan: 6500,
      children: [
        {
          id: 'c1-1',
          luasLahan: 2500,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c1-2',
          luasLahan: 1500,
          jenisLahan: 'Sawah Tadah Hujan',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c1-3',
          luasLahan: 2500,
          jenisLahan: 'Tegalan',
          statusKepemilikan: 'Bagi Hasil',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Alih Fungsi',
        },
      ],
    },
    {
      id: 2,
      desa: 'Cakru',
      location: 'Kencong',
      luasLahan: 5200,
      children: [
        {
          id: 'c2-1',
          luasLahan: 3200,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c2-2',
          luasLahan: 2000,
          jenisLahan: 'Kebun',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Rencana Pengembangan',
        },
      ],
    },
    {
      id: 3,
      desa: 'Kraton',
      location: 'Kencong',
      luasLahan: 4800,
      children: [
        {
          id: 'c3-1',
          luasLahan: 1800,
          jenisLahan: 'Sawah Tadah Hujan',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c3-2',
          luasLahan: 3000,
          jenisLahan: 'Tegalan',
          statusKepemilikan: 'Bagi Hasil',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Tidak Aktif',
        },
      ],
    },
    {
      id: 4,
      desa: 'Wonorejo',
      location: 'Kencong',
      luasLahan: 7300,
      children: [
        {
          id: 'c4-1',
          luasLahan: 3300,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c4-2',
          luasLahan: 2000,
          jenisLahan: 'Kebun',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c4-3',
          luasLahan: 2000,
          jenisLahan: 'Tegalan',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Rencana Pengembangan',
        },
      ],
    },
    {
      id: 5,
      desa: 'Kencong',
      location: 'Kencong',
      luasLahan: 6100,
      children: [
        {
          id: 'c5-1',
          luasLahan: 3100,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c5-2',
          luasLahan: 1500,
          jenisLahan: 'Sawah Tadah Hujan',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Tidak Aktif',
        },
        {
          id: 'c5-3',
          luasLahan: 1500,
          jenisLahan: 'Kebun',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Alih Fungsi',
        },
      ],
    },
    {
      id: 6,
      desa: 'Sumberejo',
      location: 'Kencong',
      luasLahan: 5400,
      children: [
        {
          id: 'c6-1',
          luasLahan: 2400,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c6-2',
          luasLahan: 3000,
          jenisLahan: 'Tegalan',
          statusKepemilikan: 'Bagi Hasil',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
      ],
    },
    {
      id: 7,
      desa: 'Kemuningsari',
      location: 'Kencong',
      luasLahan: 5900,
      children: [
        {
          id: 'c7-1',
          luasLahan: 2900,
          jenisLahan: 'Sawah Tadah Hujan',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'c7-2',
          luasLahan: 3000,
          jenisLahan: 'Kebun',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Rencana Pengembangan',
        },
      ],
    },
    // Data tambahan untuk kecamatan Gumukmas
    {
      id: 8,
      desa: 'Karanganyar',
      location: 'Gumukmas',
      luasLahan: 4800,
      children: [
        {
          id: 'g1-1',
          luasLahan: 2200,
          jenisLahan: 'Sawah Tadah Hujan',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'g1-2',
          luasLahan: 2600,
          jenisLahan: 'Tegalan',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Rencana Pengembangan',
        },
      ],
    },
    {
      id: 9,
      desa: 'Mayangan',
      location: 'Gumukmas',
      luasLahan: 5300,
      children: [
        {
          id: 'g2-1',
          luasLahan: 3000,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'g2-2',
          luasLahan: 2300,
          jenisLahan: 'Kebun',
          statusKepemilikan: 'Bagi Hasil',
          ketersediaanAir: 'Irigasi Semi Teknis',
          statusPemanfaatan: 'Tidak Aktif',
        },
      ],
    },
    {
      id: 10,
      desa: 'Tembokrejo',
      location: 'Gumukmas',
      luasLahan: 4100,
      children: [
        {
          id: 'g3-1',
          luasLahan: 2100,
          jenisLahan: 'Sawah Irigasi',
          statusKepemilikan: 'Sewa',
          ketersediaanAir: 'Irigasi Teknis',
          statusPemanfaatan: 'Lahan Aktif Ditanami',
        },
        {
          id: 'g3-2',
          luasLahan: 2000,
          jenisLahan: 'Tegalan',
          statusKepemilikan: 'Milik Sendiri',
          ketersediaanAir: 'Tadah Hujan',
          statusPemanfaatan: 'Alih Fungsi',
        },
      ],
    },
  ]);

  const filteredRows = rows.filter(
    (row) =>
      row.location === selectedLocation &&
      row.desa.toLowerCase().includes(desaSearch.toLowerCase())
  );

  // LOGIKA CHECKBOX
  const allChildIds = filteredRows.flatMap(row => row.children.map(c => c.id));
  const isAllChecked = allChildIds.length > 0 && selectedRows.length === allChildIds.length;
  const isSomeChecked = selectedRows.length > 0 && selectedRows.length < allChildIds.length;

  const toggleAll = () => {
    if (isAllChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allChildIds);
    }
  };

  const toggleParent = (row) => {
    const childIds = row.children.map(c => c.id);
    const isAllSelected = childIds.every(id => selectedRows.includes(id));

    if (isAllSelected) {
      // Hapus semua child dari selectedRows
      setSelectedRows(prev => prev.filter(id => !childIds.includes(id)));
    } else {
      // Tambahkan semua child ke selectedRows
      setSelectedRows(prev => [...new Set([...prev, ...childIds])]);
    }
  };

  const toggleRow = (childId) => {
    setSelectedRows((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]
    );
  };

  const toggleDesa = (desaName) => {
    setExpandedDesa((prev) =>
      prev.includes(desaName) ? prev.filter((n) => n !== desaName) : [...prev, desaName]
    );
  };

  const handleLaporkan = () => {
    if (selectedRows.length === 0) {
      setIsWarningModalOpen(true);
      return;
    }
    setIsLaporkanModalOpen(true);
  };

  // Mendapatkan nama desa pertama dari data yang dicentang untuk ditampilkan di Modal
  const getSelectedDesaNames = () => {
    const names = new Set();
    rows.forEach(row => {
      row.children.forEach(c => {
        if (selectedRows.includes(c.id)) names.add(row.desa);
      });
    });
    return Array.from(names);
  };
  const firstSelectedDesa = getSelectedDesaNames()[0] || '-';

  const renderTrendBadge = (clipId, label = '+90%', isPositive = true) => (
    <div
      className={`flex items-center justify-center opacity-100 border ${isPositive
        ? 'bg-[#05C168]/20 text-green-600 border-[#05C168]/20'
        : 'bg-[#FCA5A5]/20 text-[#DC2626] border-[#FCA5A5]/40'
        }`}
      style={{
        minWidth: '46px',
        height: '18px',
        gap: '4px',
        padding: '2px 4px',
        borderRadius: '2px',
        borderWidth: '0.6px',
        borderStyle: 'solid',
        transform: 'rotate(0deg)',
      }}
    >
      <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
        {label}
      </span>
      <svg
        className="flex-shrink-0"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isPositive ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M1.33335 6.66667L6.66669 1.33334"
            stroke={isPositive ? '#14CA74' : '#DC2626'}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66669 6.36162V1.33333H1.6384"
            stroke={isPositive ? '#14CA74' : '#DC2626'}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );


  const getParentTrend = (rowId, year) => {
    const y = parseInt(year, 10) || 0;
    let val = ((rowId * 17 + y * 13) % 41) - 20; // -20 .. 20
    if (val === 0) val = 8;
    const isPositive = val > 0;
    const label = `${isPositive ? '+' : ''}${val}%`;
    return { label, isPositive };
  };

  const getChildTrend = (childId, year) => {
    const base = childId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    const y = parseInt(year, 10) || 0;
    let val = ((base + y * 7) % 31) - 15; // -15 .. 15
    if (val === 0) val = -6;
    const isPositive = val > 0;
    const label = `${isPositive ? '+' : ''}${val}%`;
    return { label, isPositive };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) setIsYearOpen(false);
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) setIsLocationOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-mona-sans">
      <div className="bg-[#F8FAFC] px-8 py-6">
        <h1 className="text-black text-[24px] font-semibold">Pemantauan</h1>
      </div>

      <div className="bg-white p-8 border border-[#E2E8F0] m-[40px] rounded-[16px] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start gap-4">
            <span className="bg-[#6B7280] text-white px-[12px] py-1 rounded-full text-[12px] font-medium shadow-sm">
              Data Lahan Produksi
            </span>
            <h2 className="text-[18px] font-semibold text-gray-800">
              Luas, Status, dan Kepemilikan Lahan per Desa
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/dtphp/pencatatan/pemantauan')}
            className="text-[#3B82F6] text-[14px] font-semibold hover:underline"
          >
            Ubah
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-3 mb-6 justify-between">
          <div className="flex">
            <div className="relative flex mr-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari.."
                value={desaSearch}
                onChange={(e) => {
                  setDesaSearch(e.target.value);
                  setIsFilterApplied(true);
                }}
                className="w-[280px] pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
              />
            </div>

            <div className="relative mr-3" ref={yearDropdownRef}>
              <button
                type="button"
                onClick={() => setIsYearOpen((prev) => !prev)}
                className="flex items-center justify-between w-[120px] px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:border-gray-300 transition-all text-[14px]"
              >
                <span>{selectedYear}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isYearOpen && (
                <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setSelectedYear(year);
                        setIsYearOpen(false);
                        setIsFilterApplied(true);
                      }}
                      className={`w-full text-left px-4 py-2 text-[14px] transition-colors ${selectedYear === year ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative" ref={locationDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLocationOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:border-gray-300 transition-all text-[14px]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6V21M15 6L21 3V18L15 21M15 6L9 3M15 21L9 18M9 18L3 21V6L9 3M9 18V3" />
              </svg>
              <span>{selectedLocation}</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ml-4 ${isLocationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLocationOpen && (
              <div className="absolute z-50 top-full right-0 mt-1 w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsLocationOpen(false);
                      setIsFilterApplied(true);
                    }}
                    className={`w-full text-left px-4 py-2 text-[14px] transition-colors ${selectedLocation === loc ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed bg-white">
            <thead className="bg-[#F9FAFB] border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 w-[60px] text-center align-middle border-r border-transparent">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] rounded border-gray-300 accent-blue-600 cursor-pointer"
                    checked={isAllChecked}
                    ref={input => { if (input) input.indeterminate = isSomeChecked; }}
                    onChange={toggleAll}
                  />
                </th>
                <th className="py-4 px-2 text-[13px] font-semibold text-[#111827] w-[25%]">Desa</th>
                <th className="py-4 px-2 text-[13px] font-semibold text-[#111827] text-left w-[12%]">Luas Lahan (Ha.)</th>
                <th className="py-4 px-2 text-[13px] font-semibold text-[#111827] text-left w-[15%]">Jenis Lahan</th>
                <th className="py-4 px-2 text-[13px] font-semibold text-[#111827] text-left w-[12%]">Status Kepemilikan</th>
                <th className="py-4 px-2 text-[13px] font-semibold text-[#111827] text-left w-[13%]">Ketersediaan Air</th>
                <th className="py-4 px-2 text-[13px] font-semibold text-[#111827] text-left w-[16%]">Status Pemanfaatan Lahan</th>
                <th className="py-4 px-4 w-[60px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRows.map((row) => {
                const childIds = row.children.map(c => c.id);
                const isAllParentChecked = childIds.length > 0 && childIds.every(id => selectedRows.includes(id));
                const isSomeParentChecked = childIds.some(id => selectedRows.includes(id)) && !isAllParentChecked;

                return (
                  <React.Fragment key={row.id}>
                    {/* Parent Row (Desa) */}
                    <tr className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 px-4 text-center align-middle">
                        <input
                          type="checkbox"
                          className="w-[18px] h-[18px] rounded border-gray-300 cursor-pointer"
                          checked={isAllParentChecked}
                          ref={input => { if (input) input.indeterminate = isSomeParentChecked; }}
                          onChange={() => toggleParent(row)}
                        />
                      </td>
                      <td className="py-3 px-2 pr-6 " onClick={() => toggleDesa(row.desa)}>
                        <div className="flex items-center gap-2">
                          <svg className={`w-4 h-4 text-gray-500 transition-transform ${expandedDesa.includes(row.desa) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <div
                            className="text-[14px] font-medium font-mona-sans text-[#21272A] bg-[#F2F4F8] w-full px-[10px] py-[2px] rounded-full"
                          >
                            <span className="text-[13px] font-normal text-[#111827]">{row.desa}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 align-middle">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full ">
                            {row.luasLahan.toLocaleString('id-ID')}
                          </span>
                          {showPercentage && (() => {
                            const trend = getParentTrend(row.id, selectedYear);
                            return renderTrendBadge(`trend_parent_${row.id}_${selectedYear}`, trend.label, trend.isPositive);
                          })()}
                        </div>
                      </td>
                      <td colSpan={4} className="py-3 px-2"></td>
                      <td className="py-3 px-4 text-right align-middle">
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {/* Child Rows (Hanya muncul jika Desa di klik) */}
                    {expandedDesa.includes(row.desa) && row.children.map((child) => (
                      <tr key={child.id} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-center align-middle border-t border-transparent">
                          <input
                            type="checkbox"
                            className="w-[18px] h-[18px] rounded border-gray-300 cursor-pointer"
                            checked={selectedRows.includes(child.id)}
                            onChange={() => toggleRow(child.id)}
                          />
                        </td>
                        <td className="py-4 px-2"></td>
                        <td className="py-4 px-2 align-middle">
                          <div className="flex items-center">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full ">
                              {child.luasLahan.toLocaleString('id-ID')}
                            </span>
                            {showPercentage && (() => {
                              const trend = getChildTrend(child.id, selectedYear);
                              return renderTrendBadge(`trend_child_${child.id}_${selectedYear}`, trend.label, trend.isPositive);
                            })()}
                          </div>
                        </td>
                        <td className="py-4 px-2 align-middle">
                          <span className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal">
                            {child.jenisLahan}
                          </span>
                        </td>
                        <td className="py-4 px-2 align-middle">
                          <span className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal">
                            {child.statusKepemilikan}
                          </span>
                        </td>
                        <td className="py-4 px-2 align-middle">
                          <span className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal">
                            {child.ketersediaanAir}
                          </span>
                        </td>
                        <td className="py-4 px-2 align-middle">
                          <span className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal">
                            {child.statusPemanfaatan}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right align-middle">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer"
              checked={showPercentage}
              onChange={(e) => setShowPercentage(e.target.checked)}
            />
            <span className="text-[13px] text-gray-700 font-medium">
              Tampilkan persentase perbedaan data dengan tahun sebelumnya
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLaporkan}
              className="flex items-center gap-2 px-6 py-2.5 border border-[#DC2626] bg-white text-[#DC2626] text-[14px] font-semibold hover:bg-red-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Laporkan
            </button>
            <button
              onClick={() => setIsConfirmVerifikasiOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] text-white text-[14px] font-semibold hover:bg-[#04a055] transition-colors shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Verifikasi Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Modal Verifikasi */}
      {isConfirmVerifikasiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] px-6 py-8 relative">
            {/* Tombol Close */}
            <button
              onClick={() => setIsConfirmUploadOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-start gap-6">
              {/* Icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEF0C7" />
                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FFFAEB" stroke-width="8" />
                <path d="M24 24C24 23.2044 24.3687 22.4413 25.0251 21.8787C25.6815 21.3161 26.5717 21 27.5 21H28.5C29.4283 21 30.3185 21.3161 30.9749 21.8787C31.6313 22.4413 32 23.2044 32 24C32.0368 24.6493 31.8617 25.2929 31.501 25.834C31.1402 26.3751 30.6135 26.7843 30 27C29.3865 27.2876 28.8598 27.8333 28.499 28.5547C28.1383 29.2761 27.9632 30.1343 28 31" stroke="#D89818" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M28 35V35.01" stroke="#D89818" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>


              <div className="flex-1">
                <h3 className="text-[16px] font-semibold text-[#111827] mb-2">
                  Verifikasi Laporan?
                </h3>
                <p className="text-[14px] text-[#4B5563] leading-relaxed">
                  Laporan yang terverifikasi akan diunggah dan terverifikasi ke dalam database
                </p>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setIsConfirmUploadOpen(false)}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-[14px] text-[#111827] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batalkan
                  </button>
                  <button
                    onClick={() => {
                      setIsConfirmVerifikasiOpen(false);
                      setIsSuccessModalOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-lg bg-[#111827] text-white text-[14px] font-medium hover:bg-black transition-colors"
                  >
                    Unggah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}

      {/* Modal Sukses */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] max-h-[280px] px-10 py-8 relative">
            {/* Tombol Close */}
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#717680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div className="flex flex-col items-start">
              {/* Icon */}
              <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF" />
                  <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8" />
                  <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <div className="flex flex-col">
                <h3 className="text-[22px] font-semibold text-[#181D27] mb-2">
                  Laporan Telah Dikirim
                </h3>
                <p className="text-[15px] text-[##1272A] leading-relaxed">
                  Laporan telah diajukan dan tidak dapat diubah. Perubahan hanya tersedia jika
                  laporan berstatus Revisi.
                </p>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => setIsSuccessModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-[14px] text-[#111827] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Peringatan Laporkan */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWarningModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex gap-4 items-start mt-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE2E2" />
                  <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF2F2" stroke-width="8" />
                  <path d="M28 35V35.01" stroke="#B91C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M28 31V21" stroke="#B91C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </div>
              <div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">Pilih Data Terlebih Dahulu</h3>
                <p className="text-[14px] text-gray-500">
                  Kamu belum memilih data yang ingin dilaporkan. Silakan pilih minimal satu data pada tabel sebelum melanjutkan proses pelaporan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Isi Laporkan */}
      {isLaporkanModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[550px] p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsLaporkanModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-[20px] font-bold text-gray-900 mb-1">Laporkan Data</h2>
            <p className="text-[14px] text-gray-500 mb-6">Pastikan data yang dipilih benar dan sertakan masukan komentar.</p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
              <span className="text-[14px] text-gray-800 font-medium">Data Terpilih: {selectedRows.length} Data Lahan ({firstSelectedDesa}, dll)</span>
            </div>

            <div className="mb-8">
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Masukan <span className="text-red-500">*</span></label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-[100px]"
                defaultValue="Data mencurigakan, tolong periksa kembali"
              />
            </div>

            <div className="flex justify-end gap-3 w-full">
              <button
                onClick={() => setIsLaporkanModalOpen(false)}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setIsLaporkanModalOpen(false);
                  setIsSuccessModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#DC2626] text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Laporkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDataLahanPage;