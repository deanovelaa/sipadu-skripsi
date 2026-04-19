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

  const [isConfirmUploadOpen, setIsConfirmUploadOpen] = useState(false);
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

  const handleSimpanDraft = () => {
    setIsFilterApplied(true);
  };

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
            onClick={() => navigate('/kecamatan/pencatatan/pemantauan')}
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
              disabled
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
                {/* <th className="py-4 px-4 w-[60px] text-center align-middle border-r border-transparent">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] rounded border-gray-300 accent-blue-600 cursor-pointer"
                    checked={isAllChecked}
                    ref={input => { if (input) input.indeterminate = isSomeChecked; }}
                    onChange={toggleAll}
                  />
                </th> */}
                <th className="py-4 px-2 pl-6 text-[13px] font-semibold text-[#111827] w-[25%]">Desa</th>
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
                      {/* <td className="py-3 px-4 text-center align-middle">
                        <input
                          type="checkbox"
                          className="w-[18px] h-[18px] rounded border-gray-300 cursor-pointer"
                          checked={isAllParentChecked}
                          ref={input => { if (input) input.indeterminate = isSomeParentChecked; }}
                          onChange={() => toggleParent(row)}
                        />
                      </td> */}
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
                        {/* <td className="py-4 px-4 text-center align-middle border-t border-transparent">
                          <input
                            type="checkbox"
                            className="w-[18px] h-[18px] rounded border-gray-300 cursor-pointer"
                            checked={selectedRows.includes(child.id)}
                            onChange={() => toggleRow(child.id)}
                          />
                        </td> */}
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
              onClick={handleSimpanDraft}
              className="flex items-center gap-2 px-5 py-2.5 bg-none border-[2px] border-[#16A34A] text-green-600 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 20H18" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16L8.5 12.5M12 4V16V4ZM12 16L15.5 12.5L12 16Z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Simpan Draft
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmUploadOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] border-[2px] border-[#16A34A] text-white hover:bg-[#15803D] transition-colors text-sm font-medium"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V12M12 12L9 14M12 12L15 14M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Unggah Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Unggah */}
      {isConfirmUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] px-10 py-8 relative">
            <button
              type="button"
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
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEF0C7" />
                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FFFAEB" strokeWidth="8" />
                <path d="M24 24C24 23.2044 24.3687 22.4413 25.0251 21.8787C25.6815 21.3161 26.5717 21 27.5 21H28.5C29.4283 21 30.3185 21.3161 30.9749 21.8787C31.6313 22.4413 32 23.2044 32 24C32.0368 24.6493 31.8617 25.2929 31.501 25.834C31.1402 26.3751 30.6135 26.7843 30 27C29.3865 27.2876 28.8598 27.8333 28.499 28.5547C28.1383 29.2761 27.9632 30.1343 28 31" stroke="#D89818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28 35V35.01" stroke="#D89818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="flex-1">
                <h3 className="text-[16px] font-semibold text-[#111827] mb-2">
                  Unggah Laporan?
                </h3>
                <p className="text-[14px] text-[#4B5563] leading-relaxed">
                  Laporan yang dibuat akan diunggah ke database. Anda dapat mengubahnya di halaman Database.
                </p>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsConfirmUploadOpen(false)}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-[14px] text-[#111827] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batalkan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsConfirmUploadOpen(false);
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
              type="button"
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate('/kecamatan/pencatatan/pemantauan/detail/lahan');
              }}
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
                    type="button"
                    onClick={() => {
                      setIsSuccessModalOpen(false);
                      navigate('/kecamatan/pencatatan/pemantauan/detail/lahan');
                    }}
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
    </div>
  );
};

export default DetailDataLahanPage;