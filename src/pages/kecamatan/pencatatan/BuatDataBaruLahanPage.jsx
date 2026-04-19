import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BuatDataBaruLahanPage = () => {
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedLocation, setSelectedLocation] = useState('Kencong');
    const [desaSearch, setDesaSearch] = useState('');
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [expandedDesa, setExpandedDesa] = useState([]);
    const [showPercentage, setShowPercentage] = useState(true);
    const [desaEntriesByYear, setDesaEntriesByYear] = useState({});
    const [desaTotalsByYear, setDesaTotalsByYear] = useState({});
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [isConfirmUploadOpen, setIsConfirmUploadOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const yearDropdownRef = useRef(null);
    const locationDropdownRef = useRef(null);

    // Options untuk dropdown
    const jenisLahanOptions = ['Sawah Irigasi', 'Sawah Tadah Hujan', 'Tegalan', 'Kebun'];
    const statusKepemilikanOptions = ['Milik Sendiri', 'Sewa', 'Bagi Hasil', 'Lainnya'];
    const ketersediaanAirOptions = ['Irigasi Teknis', 'Irigasi Semi Teknis', 'Tadah Hujan', 'Lainnya'];
    const statusPemanfaatanOptions = ['Aktif Ditanami', 'Tidak Aktif', 'Alih Fungsi', 'Rencana Pengembangan'];

    const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    const locationOptions = ['Kencong', 'Paseban', 'Sumberejo', 'Kemuningsari', 'Jember'];

    // Contoh data luas lahan per tahun per desa
    const desaDataByYear = {
        '2020': [
            { name: 'Paseban', luasLahan: 4200 },
            { name: 'Cakru', luasLahan: 3900 },
            { name: 'Kraton', luasLahan: 4100 },
            { name: 'Wonorejo', luasLahan: 3800 },
            { name: 'Kencong', luasLahan: 4000 },
        ],
        '2021': [
            { name: 'Paseban', luasLahan: 4350 },
            { name: 'Cakru', luasLahan: 3980 },
            { name: 'Kraton', luasLahan: 4175 },
            { name: 'Wonorejo', luasLahan: 3920 },
            { name: 'Kencong', luasLahan: 4125 },
        ],
        '2022': [
            { name: 'Paseban', luasLahan: 4480 },
            { name: 'Cakru', luasLahan: 4050 },
            { name: 'Kraton', luasLahan: 4250 },
            { name: 'Wonorejo', luasLahan: 4010 },
            { name: 'Kencong', luasLahan: 4200 },
        ],
        '2023': [
            { name: 'Paseban', luasLahan: 4550 },
            { name: 'Cakru', luasLahan: 4125 },
            { name: 'Kraton', luasLahan: 4320 },
            { name: 'Wonorejo', luasLahan: 4090 },
            { name: 'Kencong', luasLahan: 4290 },
        ],
        '2024': [
            { name: 'Paseban', luasLahan: 4620 },
            { name: 'Cakru', luasLahan: 4200 },
            { name: 'Kraton', luasLahan: 4385 },
            { name: 'Wonorejo', luasLahan: 4160 },
            { name: 'Kencong', luasLahan: 4375 },
        ],
        '2025': [
            { name: 'Paseban', luasLahan: 4700 },
            { name: 'Cakru', luasLahan: 4280 },
            { name: 'Kraton', luasLahan: 4460 },
            { name: 'Wonorejo', luasLahan: 4235 },
            { name: 'Kencong', luasLahan: 4450 },
        ],
        '2026': [
            { name: 'Paseban', luasLahan: 4780 },
            { name: 'Cakru', luasLahan: 4360 },
            { name: 'Kraton', luasLahan: 4540 },
            { name: 'Wonorejo', luasLahan: 4310 },
            { name: 'Kencong', luasLahan: 4525 },
        ],
    };

    const toggleDesa = (desaName) => {
        setExpandedDesa(prev =>
            prev.includes(desaName)
                ? prev.filter(n => n !== desaName)
                : [...prev, desaName]
        );
        // Inisialisasi entries jika belum ada untuk tahun yang dipilih
        const currentYearEntries = desaEntriesByYear[selectedYear] || {};
        if (!currentYearEntries[desaName]) {
            setDesaEntriesByYear(prev => ({
                ...prev,
                [selectedYear]: {
                    ...prev[selectedYear],
                    [desaName]: [{
                        id: Date.now(),
                        luasLahan: '',
                        jenisLahan: '',
                        statusKepemilikan: '',
                        ketersediaanAir: '',
                        statusPemanfaatan: ''
                    }]
                }
            }));
        }
    };

    const addNewEntry = (desaName) => {
        setDesaEntriesByYear(prev => ({
            ...prev,
            [selectedYear]: {
                ...prev[selectedYear],
                [desaName]: [
                    ...((prev[selectedYear] || {})[desaName] || []),
                    {
                        id: Date.now(),
                        luasLahan: '',
                        jenisLahan: '',
                        statusKepemilikan: '',
                        ketersediaanAir: '',
                        statusPemanfaatan: ''
                    }
                ]
            }
        }));
    };

    const removeEntry = (desaName, entryId) => {
        setDesaEntriesByYear(prev => ({
            ...prev,
            [selectedYear]: {
                ...prev[selectedYear],
                [desaName]: ((prev[selectedYear] || {})[desaName] || []).filter(entry => entry.id !== entryId)
            }
        }));
    };

    const updateEntry = (desaName, entryId, field, value) => {
        setDesaEntriesByYear(prev => ({
            ...prev,
            [selectedYear]: {
                ...prev[selectedYear],
                [desaName]: ((prev[selectedYear] || {})[desaName] || []).map(entry =>
                    entry.id === entryId ? { ...entry, [field]: value } : entry
                )
            }
        }));
    };

    const toggleDropdown = (desaName, entryId, field) => {
        const key = `${desaName}_${entryId}_${field}`;
        setOpenDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const selectDropdownOption = (desaName, entryId, field, value) => {
        updateEntry(desaName, entryId, field, value);
        const key = `${desaName}_${entryId}_${field}`;
        setOpenDropdowns(prev => ({
            ...prev,
            [key]: false
        }));
    };

    const handleSimpanDraft = () => {
        const currentYearEntries = desaEntriesByYear[selectedYear] || {};
        const newTotals = {};

        Object.keys(currentYearEntries).forEach((desaName) => {
            const entries = currentYearEntries[desaName] || [];
            const total = entries.reduce((sum, entry) => {
                const value = parseFloat(String(entry.luasLahan).replace(/[^0-9.,]/g, '').replace(',', '.'));
                if (isNaN(value)) return sum;
                return sum + value;
            }, 0);
            newTotals[desaName] = total;
        });

        setDesaTotalsByYear(prev => ({
            ...prev,
            [selectedYear]: newTotals
        }));
    };

    const getDesaChangeInfo = (desaName) => {
        if (!showPercentage) return null;

        const previousYear = String(Number(selectedYear) - 1);
        const previousYearData = desaDataByYear[previousYear];
        if (!previousYearData) return null;

        const baseData = previousYearData.find((d) => d.name === desaName);
        const previousValue = baseData?.luasLahan;
        const currentYearTotals = desaTotalsByYear[selectedYear] || {};
        const currentValue = currentYearTotals[desaName];

        if (!previousValue || currentValue === undefined || currentValue === null) return null;

        const diffPercent = ((currentValue - previousValue) / previousValue) * 100;
        if (!isFinite(diffPercent) || diffPercent === 0) return null;

        const isPositive = diffPercent >= 0;
        const label = `${isPositive ? '+' : ''}${diffPercent.toFixed(1)}%`;

        return { label, isPositive };
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setIsYearOpen(false);
            }
            if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
                setIsLocationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutsideDropdowns = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setOpenDropdowns({});
            }
        };
        document.addEventListener('mousedown', handleClickOutsideDropdowns);
        return () => document.removeEventListener('mousedown', handleClickOutsideDropdowns);
    }, []);

    // Reset expanded desa ketika tahun berubah
    useEffect(() => {
        setExpandedDesa([]);
    }, [selectedYear]);

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC]">
            {/* Dark Header */}
            <div className="bg-[#F8FAFC] px-8 py-6 ">
                <h1 className="text-black text-[24px] font-semibold">
                    Buat Data Baru
                </h1>
            </div>

            {/* Main Content Card */}
            <div className="bg-white p-8 border-[#E2E8F0] border m-[40px] rounded-[16px]">
                {/* Top Section: Tab and Title */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col items-start gap-4">
                        <span className="bg-[#6B7280] text-white px-[12px] py-[1px] rounded-full text-[12px] font-semibold shadow-sm">
                            Data Lahan Produksi
                        </span>
                        <h2 className="text-[18px] font-semibold text-gray-800">
                            Luas, Status, dan Kepemilikan Lahan per Desa
                        </h2>
                    </div>
                    <Link
                        to="/kecamatan/pencatatan/buat-data-baru"
                        className="text-[#3B82F6] text-[15px] font-bold hover:underline"
                    >
                        Ubah
                    </Link>
                </div>

                {/* Filter Section */}
                <div className="flex items-center gap-3 mb-6 flex-row justify-between">
                    <div className="flex">
                        {/* Search Input */}
                        <div className="relative flex mr-4 ">
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
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                onClick={() => {
                                    setIsFilterApplied(true);
                                }}
                                type="text"
                                placeholder="Cari.."
                                value={desaSearch}
                                onChange={(e) => {
                                    setDesaSearch(e.target.value);
                                    if (e.target.value !== '') setIsFilterApplied(true);
                                }}
                                className="w-max-[372px] pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-sm text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
                            />
                        </div>

                        {/* Year Dropdown */}
                        <div className="relative" ref={yearDropdownRef}>
                            <button
                                onClick={() => setIsYearOpen(!isYearOpen)}
                                className="flex items-center gap-2 pr-3 pl-3 py-2.5 border border-gray-200 rounded-sm bg-white text-gray-500 hover:border-gray-300 transition-all shadow-sm text-sm font-normal"
                            >
                                <span>{selectedYear}</span>
                                <svg
                                    className={`w-4 h-4 ml-20 text-gray-500 transition-transform ${isYearOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isYearOpen && (
                                <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                setIsYearOpen(false);
                                                setIsFilterApplied(true);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedYear === year
                                                ? 'bg-gray-50 text-gray-900 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location Dropdown */}
                    <div className="relative" ref={locationDropdownRef}>
                        <button
                        disabled
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-gray-300 transition-all shadow-sm text-sm font-normal"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 6V21M15 6L21 3V18L15 21M15 6L9 3M15 21L9 18M9 18L3 21V6L9 3M9 18V3" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span>{selectedLocation}</span>
                            <svg
                                className={`w-4 h-4 text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isLocationOpen && (
                            <div className="absolute z-50 top-full right-0 mt-1 w-full min-w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                {locationOptions.map((location) => (
                                    <button
                                        key={location}
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            setIsLocationOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedLocation === location
                                            ? 'bg-gray-50 text-gray-900 font-normal'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {location}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead className="bg-[#F8FAFC] border-b border-gray-200 items-center">
                            <tr>
                                <th className="py-4 px-6 text-[12px] text-[#121619] font-medium text-left w-[35%]" >
                                    Desa
                                </th>
                                <th className="py-4 px-6 text-[12px] font-medium text-center w-[12%]">
                                    Luas Lahan (Ha.)
                                </th>
                                <th className="py-4 px-6 text-[12px] font-medium text-center w-[15%]">
                                    Jenis Lahan
                                </th>
                                <th className="py-4 px-6 text-[12px] font-medium text-center w-[13%]">
                                    Status Kepemilikan
                                </th>
                                <th className="py-4 px-6 text-[12px] font-medium text-center w-[17%]">
                                    Ketersediaan Air
                                </th>
                                <th className="py-4 px-6 text-[12px] font-medium text-center w-[15%]">
                                    Status Pemanfaatan Lahan
                                </th>
                                <th className="py-4 px-6 w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {!isFilterApplied ? (
                                <tr>
                                    <td colSpan={7} className="py-20 pr-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <p className="text-sm">Silahkan pilih tahun atau cari nama desa untuk menampilkan data.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (

                                (desaDataByYear[selectedYear] || [])
                                    .filter(desa =>
                                        desa.name.toLowerCase().includes(desaSearch.toLowerCase())
                                    )
                                    .map((desa, idx) => {
                                        const changeInfo = getDesaChangeInfo(desa.name);
                                        const clipId = `clip0_lahan_${desa.name.replace(/\s+/g, '_')}`;

                                        return (
                                            <React.Fragment key={idx}>
                                                {/* Parent Row */}
                                                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 w-full " onClick={() => toggleDesa(desa.name)}>

                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                // onClick={() => toggleDesa(desa.name)}
                                                                className="focus:outline-none"
                                                            >
                                                                <svg
                                                                    className={`w-4 h-4 text-[#21272A] transition-transform ${expandedDesa.includes(desa.name) ? 'rotate-90' : ''
                                                                        }`}
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M9 5l7 7-7 7"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span className="text-[14px] font-medium font-mona-sans text-[#21272A] bg-[#F2F4F8] w-full px-[10px] py-[2px] rounded-full">
                                                                {desa.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full ">
                                                                {(() => {
                                                                    const currentYearTotals = desaTotalsByYear[selectedYear] || {};
                                                                    const total = currentYearTotals[desa.name];
                                                                    return total !== undefined && total !== null && total !== 0 ? total : '-';
                                                                })()}
                                                            </span>
                                                            {changeInfo && (
                                                                <div className="flex items-center gap-2">
                                                                    <div
                                                                        className={`flex items-center justify-center opacity-100 border ${changeInfo.isPositive
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
                                                                            {changeInfo.label}
                                                                        </span>
                                                                        <svg
                                                                            className="flex-shrink-0"
                                                                            width="8"
                                                                            height="8"
                                                                            viewBox="0 0 8 8"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            style={{
                                                                                transform: changeInfo.isPositive
                                                                                    ? 'rotate(0deg)'
                                                                                    : 'rotate(180deg)',
                                                                            }}
                                                                        >
                                                                            <g clipPath={`url(#${clipId})`}>
                                                                                <path
                                                                                    d="M1.33335 6.66667L6.66669 1.33334"
                                                                                    stroke={
                                                                                        changeInfo.isPositive
                                                                                            ? '#14CA74'
                                                                                            : '#DC2626'
                                                                                    }
                                                                                    strokeWidth="0.8"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M6.66669 6.36162V1.33333H1.6384"
                                                                                    stroke={
                                                                                        changeInfo.isPositive
                                                                                            ? '#14CA74'
                                                                                            : '#DC2626'
                                                                                    }
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
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6"></td>
                                                    <td className="py-4 px-6"></td>
                                                    <td className="py-4 px-6"></td>
                                                    <td className="py-4 px-6"></td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button className="text-[#21272A] hover:text-gray-600">
                                                            <svg
                                                                className="w-5 h-5 rotate-90"
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
                                                    </td>
                                                </tr>

                                                {/* Expanded Child Rows */}
                                                {expandedDesa.includes(desa.name) && ((desaEntriesByYear[selectedYear] || {})[desa.name] || []).map((entry, entryIdx) => {
                                                    const dropdownKey = (field) => `${desa.name}_${entry.id}_${field}`;
                                                    const isOpen = (field) => openDropdowns[dropdownKey(field)] || false;

                                                    return (
                                                        <tr key={entry.id} className="border-b border-gray-100 bg-gray-50/50">
                                                            <td className="py-4 px-6 w-[450px]" >
                                                                <div className="pl-6 text-[14px] text-gray-600">
                                                                    {/* Indented content */}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <div className="flex items-center rounded-sm bg-none">
                                                                        <input
                                                                            type="text"
                                                                            value={entry.luasLahan}
                                                                            onChange={(e) => updateEntry(desa.name, entry.id, 'luasLahan', e.target.value)}
                                                                            placeholder="..."
                                                                            className="w-[38px] text-[14px] text-[#121619] border-none outline-none text-center text-medium"
                                                                        />
                                                                        <button
                                                                            onClick={() => removeEntry(desa.name, entry.id)}
                                                                            className="text-[#21272A] hover:text-gray-600"
                                                                        >
                                                                            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                    </svg> */}
                                                                        </button>
                                                                    </div>
                                                                    <div className="text-[#21272A] text-[9px] px-[8px] py-[1px] rounded-sm bg-[#cfd0d0]">-</div>

                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-2 ">
                                                                <div className="relative dropdown-container">
                                                                    <button
                                                                        onClick={() => toggleDropdown(desa.name, entry.id, 'jenisLahan')}
                                                                        className="flex w-fit items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal"
                                                                    >
                                                                        {entry.jenisLahan || '+ Pilih'}
                                                                        {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg> */}
                                                                    </button>
                                                                    {isOpen('jenisLahan') && (
                                                                        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                                                            {jenisLahanOptions.map((option) => (
                                                                                <button
                                                                                    key={option}
                                                                                    onClick={() => selectDropdownOption(desa.name, entry.id, 'jenisLahan', option)}
                                                                                    className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                                                                >
                                                                                    {option}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <div className="relative dropdown-container">
                                                                    <button
                                                                        onClick={() => toggleDropdown(desa.name, entry.id, 'statusKepemilikan')}
                                                                        className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal"
                                                                    >
                                                                        {entry.statusKepemilikan || '+ Pilih'}
                                                                        {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg> */}
                                                                    </button>
                                                                    {isOpen('statusKepemilikan') && (
                                                                        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                                                            {statusKepemilikanOptions.map((option) => (
                                                                                <button
                                                                                    key={option}
                                                                                    onClick={() => selectDropdownOption(desa.name, entry.id, 'statusKepemilikan', option)}
                                                                                    className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                                                                >
                                                                                    {option}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <div className="relative dropdown-container">
                                                                    <button
                                                                        onClick={() => toggleDropdown(desa.name, entry.id, 'ketersediaanAir')}
                                                                        className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal"
                                                                    >
                                                                        {entry.ketersediaanAir || '+ Pilih'}
                                                                        {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg> */}
                                                                    </button>
                                                                    {isOpen('ketersediaanAir') && (
                                                                        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                                                            {ketersediaanAirOptions.map((option) => (
                                                                                <button
                                                                                    key={option}
                                                                                    onClick={() => selectDropdownOption(desa.name, entry.id, 'ketersediaanAir', option)}
                                                                                    className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                                                                >
                                                                                    {option}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <div className="relative dropdown-container">
                                                                    <button
                                                                        onClick={() => toggleDropdown(desa.name, entry.id, 'statusPemanfaatan')}
                                                                        className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal"
                                                                    >
                                                                        {entry.statusPemanfaatan || '+ Pilih'}
                                                                        {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg> */}
                                                                    </button>
                                                                    {isOpen('statusPemanfaatan') && (
                                                                        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                                                            {statusPemanfaatanOptions.map((option) => (
                                                                                <button
                                                                                    key={option}
                                                                                    onClick={() => selectDropdownOption(desa.name, entry.id, 'statusPemanfaatan', option)}
                                                                                    className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                                                                >
                                                                                    {option}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6 text-right rotate-90">
                                                                <button className="text-[#21272A] hover:text-gray-600">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}

                                                {/* Add New Entry Button */}
                                                {expandedDesa.includes(desa.name) && (
                                                    <tr>
                                                        <td colSpan={7} className="py-4 px-6">
                                                            <div className="flex justify-center">
                                                                <button
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

                {/* Footer Section */}
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
                            onClick={handleSimpanDraft}
                            className="flex items-center gap-2 px-5 py-2.5 bg-none border-[2px] border-[#16A34A] text-green-600 hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 20H18" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 16L8.5 12.5M12 4V16V4ZM12 16L15.5 12.5L12 16Z" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Simpan Draft
                        </button>
                        <button
                            onClick={() => setIsConfirmUploadOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] border-[2px] border-[#16A34A] text-white hover:bg-[#15803D] transition-colors text-sm font-medium"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 18V12M12 12L9 14M12 12L15 14M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Unggah Laporan
                        </button>
                    </div>
                </div>

                {/* Modal Konfirmasi Unggah */}
                {isConfirmUploadOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] px-10 py-8 relative">
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
                                        Unggah Laporan?
                                    </h3>
                                    <p className="text-[14px] text-[#4B5563] leading-relaxed">
                                        Laporan yang dibuat akan diunggah ke database. Anda dapat mengubahnya di halaman Database.
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
            </div>
        </div>
    );
};

export default BuatDataBaruLahanPage;
