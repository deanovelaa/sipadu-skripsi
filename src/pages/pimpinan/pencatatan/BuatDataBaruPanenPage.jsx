import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BuatDataBaruPanenPage = () => {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedKomoditi, setSelectedKomoditi] = useState('Pangan');
  const [selectedBulan, setSelectedBulan] = useState('Desember');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedLocation, setSelectedLocation] = useState('Kencong');
  const [desaSearch, setDesaSearch] = useState('');
  const [isKomoditiOpen, setIsKomoditiOpen] = useState(false);
  const [isBulanOpen, setIsBulanOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [expandedDesa, setExpandedDesa] = useState([]);
  const [showPercentage, setShowPercentage] = useState(true);
  const [desaEntriesByYear, setDesaEntriesByYear] = useState({});
  const [desaTotalsByYear, setDesaTotalsByYear] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isConfirmUploadOpen, setIsConfirmUploadOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const komoditiDropdownRef = useRef(null);
  const bulanDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const komoditiOptions = ['Pangan', 'Hortikultura', 'Perkebunan'];
  const bulanOptions = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  const locationOptions = ['Kencong', 'Paseban', 'Sumberejo', 'Kemuningsari', 'Jember'];
  const komoditiRowOptions = ['Padi', 'Jagung', 'Kedelai', 'Cabai', 'Tomat', 'Teh'];

  const desaDataByYear = {
    '2020': [
      { name: 'Paseban', produksi: 4500 },
      { name: 'Cakru', produksi: 4200 },
      { name: 'Kraton', produksi: 4400 },
      { name: 'Wonorejo', produksi: 4000 },
      { name: 'Kencong', produksi: 4300 },
    ],
    '2021': [
      { name: 'Paseban', produksi: 4700 },
      { name: 'Cakru', produksi: 4380 },
      { name: 'Kraton', produksi: 4580 },
      { name: 'Wonorejo', produksi: 4180 },
      { name: 'Kencong', produksi: 4480 },
    ],
    '2022': [
      { name: 'Paseban', produksi: 4900 },
      { name: 'Cakru', produksi: 4550 },
      { name: 'Kraton', produksi: 4760 },
      { name: 'Wonorejo', produksi: 4350 },
      { name: 'Kencong', produksi: 4650 },
    ],
    '2023': [
      { name: 'Paseban', produksi: 5100 },
      { name: 'Cakru', produksi: 4720 },
      { name: 'Kraton', produksi: 4940 },
      { name: 'Wonorejo', produksi: 4520 },
      { name: 'Kencong', produksi: 4820 },
    ],
    '2024': [
      { name: 'Paseban', produksi: 5300 },
      { name: 'Cakru', produksi: 4900 },
      { name: 'Kraton', produksi: 5120 },
      { name: 'Wonorejo', produksi: 4700 },
      { name: 'Kencong', produksi: 5000 },
    ],
    '2025': [
      { name: 'Paseban', produksi: 5500 },
      { name: 'Cakru', produksi: 5080 },
      { name: 'Kraton', produksi: 5300 },
      { name: 'Wonorejo', produksi: 4880 },
      { name: 'Kencong', produksi: 5180 },
    ],
    '2026': [
      { name: 'Paseban', produksi: 5700 },
      { name: 'Cakru', produksi: 5260 },
      { name: 'Kraton', produksi: 5480 },
      { name: 'Wonorejo', produksi: 5060 },
      { name: 'Kencong', produksi: 5360 },
    ],
  };

  const parseNum = (v) => {
    const n = parseFloat(String(v).replace(/[^0-9.,]/g, '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
  };

  const toggleDesa = (desaName) => {
    setExpandedDesa((prev) =>
      prev.includes(desaName) ? prev.filter((n) => n !== desaName) : [...prev, desaName]
    );
    const currentYearEntries = desaEntriesByYear[selectedYear] || {};
    if (!currentYearEntries[desaName]) {
      setDesaEntriesByYear((prev) => ({
        ...prev,
        [selectedYear]: {
          ...prev[selectedYear],
          [desaName]: [
            {
              id: Date.now(),
              komoditi: '',
              luasTanam: '',
              panenKotor: '',
              panenBersih: '',
              produktivitas: '',
              produksi: '',
            },
          ],
        },
      }));
    }
  };

  const addNewEntry = (desaName) => {
    setDesaEntriesByYear((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        [desaName]: [
          ...((prev[selectedYear] || {})[desaName] || []),
          {
            id: Date.now(),
            komoditi: '',
            luasTanam: '',
            panenKotor: '',
            panenBersih: '',
            produktivitas: '',
            produksi: '',
          },
        ],
      },
    }));
  };

  const removeEntry = (desaName, entryId) => {
    setDesaEntriesByYear((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        [desaName]: ((prev[selectedYear] || {})[desaName] || []).filter((e) => e.id !== entryId),
      },
    }));
  };

  const updateEntry = (desaName, entryId, field, value) => {
    setDesaEntriesByYear((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        [desaName]: ((prev[selectedYear] || {})[desaName] || []).map((entry) =>
          entry.id === entryId ? { ...entry, [field]: value } : entry
        ),
      },
    }));
  };

  const toggleDropdown = (desaName, entryId, field) => {
    const key = `${desaName}_${entryId}_${field}`;
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectDropdownOption = (desaName, entryId, field, value) => {
    updateEntry(desaName, entryId, field, value);
    setOpenDropdowns((prev) => ({ ...prev, [`${desaName}_${entryId}_${field}`]: false }));
  };

  const handleSimpanDraft = () => {
    const currentYearEntries = desaEntriesByYear[selectedYear] || {};
    const newTotals = {};
    Object.keys(currentYearEntries).forEach((desaName) => {
      const entries = currentYearEntries[desaName] || [];
      newTotals[desaName] = {
        luasTanam: entries.reduce((s, e) => s + parseNum(e.luasTanam), 0),
        panenKotor: entries.reduce((s, e) => s + parseNum(e.panenKotor), 0),
        panenBersih: entries.reduce((s, e) => s + parseNum(e.panenBersih), 0),
        produktivitas: entries.reduce((s, e) => s + parseNum(e.produktivitas), 0),
        produksi: entries.reduce((s, e) => s + parseNum(e.produksi), 0),
      };
    });
    setDesaTotalsByYear((prev) => ({ ...prev, [selectedYear]: newTotals }));
  };

  const getDesaChangeInfo = (desaName) => {
    if (!showPercentage) return null;
    const previousYear = String(Number(selectedYear) - 1);
    const previousYearData = desaDataByYear[previousYear];
    if (!previousYearData) return null;
    const base = previousYearData.find((d) => d.name === desaName);
    const previousValue = base?.produksi;
    const currentYearTotals = desaTotalsByYear[selectedYear] || {};
    const tot = currentYearTotals[desaName];
    const currentValue = tot && typeof tot === 'object' ? tot.produksi : tot;
    if (!previousValue || currentValue === undefined || currentValue === null) return null;
    const diffPercent = ((currentValue - previousValue) / previousValue) * 100;
    if (!isFinite(diffPercent) || diffPercent === 0) return null;
    const isPositive = diffPercent >= 0;
    return { label: `${isPositive ? '+' : ''}${diffPercent.toFixed(0)}%`, isPositive };
  };

  const renderPercentBadge = (label, isPositive, clipId) => (
    <div
      className={`flex items-center justify-center border ${isPositive ? 'bg-[#05C168]/20 text-green-600 border-[#05C168]/20' : 'bg-[#FCA5A5]/20 text-[#DC2626] border-[#FCA5A5]/40'
        }`}
      style={{ minWidth: '46px', height: '18px', gap: '4px', padding: '2px 4px', borderRadius: '2px', borderWidth: '0.6px', borderStyle: 'solid' }}
    >
      <span className="text-[10px] font-semibold leading-none whitespace-nowrap">{label}</span>
      <svg className="flex-shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ transform: isPositive ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        <g clipPath={`url(#${clipId})`}>
          <path d="M1.33335 6.66667L6.66669 1.33334" stroke={isPositive ? '#14CA74' : '#DC2626'} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.66669 6.36162V1.33333H1.6384" stroke={isPositive ? '#14CA74' : '#DC2626'} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id={clipId}><rect width="8" height="8" fill="white" /></clipPath>
        </defs>
      </svg>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (komoditiDropdownRef.current && !komoditiDropdownRef.current.contains(e.target)) setIsKomoditiOpen(false);
      if (bulanDropdownRef.current && !bulanDropdownRef.current.contains(e.target)) setIsBulanOpen(false);
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(e.target)) setIsYearOpen(false);
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(e.target)) setIsLocationOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideDropdowns = (e) => {
      if (!e.target.closest('.dropdown-container')) setOpenDropdowns({});
    };
    document.addEventListener('mousedown', handleClickOutsideDropdowns);
    return () => document.removeEventListener('mousedown', handleClickOutsideDropdowns);
  }, []);

  useEffect(() => {
    setExpandedDesa([]);
  }, [selectedYear]);

  const currentDesaList = desaDataByYear[selectedYear] || [];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#F8FAFC] px-8 py-6">
        <h1 className="text-black text-[24px] font-semibold">Buat Data Baru</h1>
      </div>

      <div className="bg-white p-8 border border-[#E2E8F0] m-[40px] rounded-[16px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start gap-4">
            <span className="bg-[#6B7280] text-white px-[12px] py-1 rounded-full text-[12px] font-semibold shadow-sm">
              Data Produksi Panen
            </span>
            <h2 className="text-[18px] font-semibold text-gray-800">
              Luas Panen, Produktivitas, dan Produksi Per Desa
            </h2>
          </div>
          <Link to="/dtphp/pencatatan/buat-data-baru" className="text-[#3B82F6] text-[15px] font-bold hover:underline">
            Ubah
          </Link>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex mr-4">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#21272A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari.."
              value={desaSearch}
              onChange={(e) => setDesaSearch(e.target.value)}
              onClick={() => setIsFilterApplied(true)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
            />
          </div>

          <div className="relative" ref={komoditiDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsKomoditiOpen(!isKomoditiOpen);
                setIsFilterApplied(true); // Tambahkan ini
              }}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-gray-300 transition-all shadow-sm text-sm font-normal"
            >
              <span>{selectedKomoditi}</span>
              <svg className={`w-4 h-4 text-[#21272A] transition-transform ${isKomoditiOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isKomoditiOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg">
                {komoditiOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setSelectedKomoditi(opt); setIsKomoditiOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm ${selectedKomoditi === opt ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={bulanDropdownRef}>
            <button
              type="button"
              onClick={() => setIsBulanOpen(!isBulanOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-gray-300 transition-all shadow-sm text-sm font-normal"
            >
              <span>{selectedBulan}</span>
              <svg className={`w-4 h-4 text-[#21272A] transition-transform ${isBulanOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isBulanOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[140px] max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                {bulanOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setSelectedBulan(opt); setIsBulanOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm ${selectedBulan === opt ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={yearDropdownRef}>
            <button
              type="button"
              onClick={() => setIsYearOpen(!isYearOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-gray-300 transition-all shadow-sm text-sm font-normal"
            >
              <span>{selectedYear}</span>
              <svg className={`w-4 h-4 text-[#21272A] transition-transform ${isYearOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isYearOpen && (
              <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => { setSelectedYear(y); setIsYearOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm ${selectedYear === y ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative ml-auto" ref={locationDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-gray-300 transition-all shadow-sm text-sm font-normal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 6V21M15 6L21 3V18L15 21M15 6L9 3M15 21L9 18M9 18L3 21V6L9 3M9 18V3" stroke="#94A3B8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{selectedLocation}</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLocationOpen && (
              <div className="absolute z-50 top-full right-0 mt-1 w-full min-w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg">
                {locationOptions.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => { setSelectedLocation(loc); setIsLocationOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm ${selectedLocation === loc ? 'bg-gray-50 text-gray-900 font-normal' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">Desa</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-center">Komoditi</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-center">Luas Tanam (Ha.)</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-center">Panen Kotor (Ha.)</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-center">Panen Bersih (Ha.)</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-center">Produktivitas (Ku/Ha)</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-center">Produksi (Ton)</th>
                <th className="py-4 px-6 w-12"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {!isFilterApplied ? (
                /* Tampilan Kosong Awal */
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm">Silahkan pilih filter atau cari desa untuk menampilkan data.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentDesaList
                  .filter((d) => d.name.toLowerCase().includes(desaSearch.toLowerCase()))
                  .map((desa, idx) => {
                    const changeInfo = getDesaChangeInfo(desa.name);
                    const clipId = `clip_panen_${desa.name.replace(/\s+/g, '_')}_${idx}`;
                    const entries = (desaEntriesByYear[selectedYear] || {})[desa.name] || [];
                    const totalDisplay = desaTotalsByYear[selectedYear]?.[desa.name];
                    const isTotalObj = totalDisplay && typeof totalDisplay === 'object';
                    const hasTotal = isTotalObj
                      ? totalDisplay.produksi !== undefined && (totalDisplay.produksi !== 0 || totalDisplay.luasTanam !== 0)
                      : totalDisplay !== undefined && totalDisplay !== null && totalDisplay !== 0;
                    const fmt = (v) => (v !== undefined && v !== null && v !== 0 ? Number(v).toLocaleString('id-ID') : '-');

                    return (
                      <React.Fragment key={desa.name}>
                        {/* Parent row */}
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => toggleDesa(desa.name)} className="focus:outline-none">
                                <svg
                                  className={`w-4 h-4 text-[#21272A] transition-transform ${expandedDesa.includes(desa.name) ? 'rotate-90' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                              <span className="text-[14px] font-medium text-[#21272A] bg-[#F2F4F8] px-[10px] py-[2px] rounded-full">
                                {desa.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">—</td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              <span className="text-[13px] text-[#111827]">
                                {hasTotal ? fmt(isTotalObj ? totalDisplay.luasTanam : totalDisplay) : '-'}
                              </span>
                              {changeInfo && renderPercentBadge(changeInfo.label, changeInfo.isPositive, clipId)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-[13px] text-[#111827]">{hasTotal ? fmt(isTotalObj ? totalDisplay.panenKotor : totalDisplay) : '-'}</span>
                              {changeInfo && renderPercentBadge(changeInfo.label, changeInfo.isPositive, `${clipId}_2`)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-[13px] text-[#111827]">{hasTotal ? fmt(isTotalObj ? totalDisplay.panenBersih : totalDisplay) : '-'}</span>
                              {changeInfo && renderPercentBadge(changeInfo.label, changeInfo.isPositive, `${clipId}_3`)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-[13px] text-[#111827]">{hasTotal ? fmt(isTotalObj ? totalDisplay.produktivitas : totalDisplay) : '-'}</span>
                              {changeInfo && renderPercentBadge(changeInfo.label, changeInfo.isPositive, `${clipId}_4`)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-[13px] text-[#111827]">{hasTotal ? fmt(isTotalObj ? totalDisplay.produksi : totalDisplay) : '-'}</span>
                              {changeInfo && renderPercentBadge(changeInfo.label, changeInfo.isPositive, `${clipId}_5`)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button type="button" className="text-[#697077] hover:text-gray-600">
                              <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </td>
                        </tr>

                        {/* Child rows */}
                        {expandedDesa.includes(desa.name) &&
                          entries.map((entry) => {
                            const dk = (f) => `${desa.name}_${entry.id}_${f}`;
                            const isOpen = (f) => openDropdowns[dk(f)] || false;
                            return (
                              <tr key={entry.id} className="border-b border-gray-100 bg-gray-50/50">
                                <td className="py-4 px-6">
                                  <div className="pl-6 text-[14px] text-gray-500">—</div>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="relative dropdown-container flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => toggleDropdown(desa.name, entry.id, 'komoditi')}
                                      className="flex items-center justify-center rounded-full px-2 py-[1px] border border-gray-200 bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 text-[12px] font-normal"
                                    >
                                      {entry.komoditi || '+ Pilih'}
                                    </button>
                                    {isOpen('komoditi') && (
                                      <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                        {komoditiRowOptions.map((opt) => (
                                          <button
                                            key={opt}
                                            type="button"
                                            onClick={() => selectDropdownOption(desa.name, entry.id, 'komoditi', opt)}
                                            className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                                          >
                                            {opt}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="flex items-center justify-center gap-1">
                                    <input
                                      type="text"
                                      value={entry.luasTanam}
                                      onChange={(e) => updateEntry(desa.name, entry.id, 'luasTanam', e.target.value)}
                                      placeholder="..."
                                      className="w-[38px] text-[14px] text-[#121619] border-none outline-none text-center font-medium bg-transparent"
                                    />

                                    <div className="text-[#21272A] px-3 py-2 rounded-sm bg-[#cfd0d0]/30"></div>
                                  </div>
                                </td>
                                {/* Kolom Panen Kotor */}
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <input
                                      type="text"
                                      value={entry.panenKotor}
                                      onChange={(e) => updateEntry(desa.name, entry.id, 'panenKotor', e.target.value)}
                                      placeholder="..."
                                      className="w-[38px] text-[14px] text-[#121619] border-none outline-none text-center font-medium bg-transparent"
                                    />
                                    <div className="text-[#21272A] px-3 py-2 rounded-sm bg-[#cfd0d0]/30"></div>
                                  </div>
                                </td>

                                {/* Kolom Panen Bersih */}
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <input
                                      type="text"
                                      value={entry.panenBersih}
                                      onChange={(e) => updateEntry(desa.name, entry.id, 'panenBersih', e.target.value)}
                                      placeholder="..."
                                      className="w-[38px] text-[14px] text-[#121619] border-none outline-none text-center font-medium bg-transparent"
                                    />
                                    <div className="text-[#21272A] px-3 py-2 rounded-sm bg-[#cfd0d0]/30"></div>
                                  </div>
                                </td>

                                {/* Kolom Produktivitas */}
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <input
                                      type="text"
                                      value={entry.produktivitas}
                                      onChange={(e) => updateEntry(desa.name, entry.id, 'produktivitas', e.target.value)}
                                      placeholder="..."
                                      className="w-[38px] text-[14px] text-[#121619] border-none outline-none text-center font-medium bg-transparent"
                                    />
                                    <div className="text-[#21272A] px-3 py-2 rounded-sm bg-[#cfd0d0]/30"></div>
                                  </div>
                                </td>

                                {/* Kolom Produksi */}
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <input
                                      type="text"
                                      value={entry.produksi}
                                      onChange={(e) => updateEntry(desa.name, entry.id, 'produksi', e.target.value)}
                                      placeholder="..."
                                      className="w-[38px] text-[14px] text-[#121619] border-none outline-none text-center font-medium bg-transparent"
                                    />
                                    <div className="text-[#21272A] px-3 py-2 rounded-sm bg-[#cfd0d0]/30"></div>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <button type="button" onClick={() => removeEntry(desa.name, entry.id)} className="text-[#697077] hover:text-red-600">
                                    <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}

                        {expandedDesa.includes(desa.name) && (
                          <tr>
                            <td colSpan={8} className="py-4 px-6">
                              <div className="flex justify-center">
                                <button
                                  type="button"
                                  onClick={() => addNewEntry(desa.name)}
                                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                >
                                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPercentage}
              onChange={(e) => setShowPercentage(e.target.checked)}
              className="w-4 h-4 text-[#16A34A] border-gray-300 rounded focus:ring-[#16A34A]"
            />
            <span className="text-[14px] text-gray-700">
              Tampilkan persentase perbedaan data dengan tahun sebelumnya
            </span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSimpanDraft}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#16A34A] text-green-600 hover:bg-gray-100 transition-colors text-sm font-medium rounded-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 20H18" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16L8.5 12.5M12 4V16V4ZM12 16L15.5 12.5L12 16Z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Simpan Draft
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmUploadOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] border-2 border-[#16A34A] text-white hover:bg-[#15803D] transition-colors text-sm font-medium rounded-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 18V12M12 12L9 14M12 12L15 14M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Unggah Laporan
            </button>
          </div>
        </div>

        {/* Modal Konfirmasi Unggah */}
        {isConfirmUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] px-10 py-8 relative">
              <button type="button" onClick={() => setIsConfirmUploadOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-start gap-6">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEF0C7" />
                  <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FFFAEB" stroke-width="8" />
                  <path d="M24 24C24 23.2044 24.3687 22.4413 25.0251 21.8787C25.6815 21.3161 26.5717 21 27.5 21H28.5C29.4283 21 30.3185 21.3161 30.9749 21.8787C31.6313 22.4413 32 23.2044 32 24C32.0368 24.6493 31.8617 25.2929 31.501 25.834C31.1402 26.3751 30.6135 26.7843 30 27C29.3865 27.2876 28.8598 27.8333 28.499 28.5547C28.1383 29.2761 27.9632 30.1343 28 31" stroke="#D89818" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M28 35V35.01" stroke="#D89818" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold text-[#111827] mb-2">Unggah Laporan?</h3>
                  <p className="text-[14px] text-[#4B5563] leading-relaxed">
                    Laporan yang dibuat akan diunggah ke database. Anda dapat mengubahnya di halaman Database.
                  </p>
                  <div className="mt-8 flex justify-end gap-4">
                    <button type="button" onClick={() => setIsConfirmUploadOpen(false)} className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-[14px] text-[#111827] font-medium hover:bg-gray-50">
                      Batalkan
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsConfirmUploadOpen(false); setIsSuccessModalOpen(true); }}
                      className="px-6 py-2.5 rounded-lg bg-[#111827] text-white text-[14px] font-medium hover:bg-black"
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] px-10 py-8 relative">
              <button type="button" onClick={() => setIsSuccessModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#717680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex flex-col items-start">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#D1FADF]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#039855" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-semibold text-[#181D27] mt-4 mb-2">Laporan Telah Dikirim</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Laporan telah diajukan dan tidak dapat diubah. Perubahan hanya tersedia jika laporan berstatus Revisi.
                </p>
                <div className="mt-4 flex justify-end w-full">
                  <button type="button" onClick={() => setIsSuccessModalOpen(false)} className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-[14px] text-[#111827] font-medium hover:bg-gray-50">
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuatDataBaruPanenPage;
