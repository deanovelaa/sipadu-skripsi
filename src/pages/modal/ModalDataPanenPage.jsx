import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalDataPanen = () => {
    const navigate = useNavigate();
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [selectedKomoditi, setSelectedKomoditi] = useState('Semua Komoditi');
    const [selectedBulan, setSelectedBulan] = useState('Semua Bulan');
    const [selectedYear, setSelectedYear] = useState('2020');
    const [selectedLocation, setSelectedLocation] = useState('Semua Kecamatan');
    const [desaSearch, setDesaSearch] = useState('');
    const [isKomoditiOpen, setIsKomoditiOpen] = useState(false);
    const [isBulanOpen, setIsBulanOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Menyimpan ID data (child) yang dicentang
    const [expandedDesa, setExpandedDesa] = useState([]);
    const [showPercentage, setShowPercentage] = useState(true);

    const [isLaporkanModalOpen, setIsLaporkanModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [isConfirmVerifikasiOpen, setIsConfirmVerifikasiOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const komoditiDropdownRef = useRef(null);
    const bulanDropdownRef = useRef(null);
    const yearDropdownRef = useRef(null);
    const locationDropdownRef = useRef(null);

    const komoditiOptions = ['Semua Komoditi', 'Pangan', 'Hortikultura', 'Perkebunan'];
    const bulanOptions = [
        'Semua Bulan',
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const locationOptions = ['Semua Kecamatan','Kencong', 'Gumukmas', 'Puger', 'Wuluhan', 'Ambulu'];

    // STRUKTUR DATA: Komoditi sebagai parent, kecamatan sebagai child
    const [rows, setRows] = useState([
        {
            id: 1,
            komoditi: 'Padi',
            children: [
                {
                    id: 'c1-1',
                    kecamatan: 'Kencong',
                    luasLahan: 2500,
                    panenKotor: 2400,
                    panenBersih: 2300,
                    produktivitas: 92,
                    produksi: 2116,
                },
                {
                    id: 'c1-2',
                    kecamatan: 'Gumukmas',
                    luasLahan: 3000,
                    panenKotor: 2900,
                    panenBersih: 2800,
                    produktivitas: 93,
                    produksi: 2604,
                },
                {
                    id: 'c1-3',
                    kecamatan: 'Puger',
                    luasLahan: 1800,
                    panenKotor: 1750,
                    panenBersih: 1700,
                    produktivitas: 94,
                    produksi: 1598,
                },
            ],
        },
        {
            id: 2,
            komoditi: 'Jagung',
            children: [
                {
                    id: 'c2-1',
                    kecamatan: 'Kencong',
                    luasLahan: 1500,
                    panenKotor: 1450,
                    panenBersih: 1400,
                    produktivitas: 93,
                    produksi: 1302,
                },
                {
                    id: 'c2-2',
                    kecamatan: 'Gumukmas',
                    luasLahan: 2200,
                    panenKotor: 2150,
                    panenBersih: 2100,
                    produktivitas: 95,
                    produksi: 1995,
                },
                {
                    id: 'c2-3',
                    kecamatan: 'Wuluhan',
                    luasLahan: 1800,
                    panenKotor: 1750,
                    panenBersih: 1700,
                    produktivitas: 94,
                    produksi: 1598,
                },
            ],
        },
        {
            id: 3,
            komoditi: 'Kedelai',
            children: [
                {
                    id: 'c3-1',
                    kecamatan: 'Kencong',
                    luasLahan: 2500,
                    panenKotor: 2400,
                    panenBersih: 2350,
                    produktivitas: 94,
                    produksi: 2209,
                },
                {
                    id: 'c3-2',
                    kecamatan: 'Gumukmas',
                    luasLahan: 2600,
                    panenKotor: 2500,
                    panenBersih: 2450,
                    produktivitas: 94,
                    produksi: 2303,
                },
                {
                    id: 'c3-3',
                    kecamatan: 'Ambulu',
                    luasLahan: 2000,
                    panenKotor: 1950,
                    panenBersih: 1900,
                    produktivitas: 95,
                    produksi: 1805,
                },
            ],
        },
        {
            id: 4,
            komoditi: 'Teh',
            children: [
                {
                    id: 'c4-1',
                    kecamatan: 'Kencong',
                    luasLahan: 2000,
                    panenKotor: 1950,
                    panenBersih: 1900,
                    produktivitas: 95,
                    produksi: 1805,
                },
                {
                    id: 'c4-2',
                    kecamatan: 'Gumukmas',
                    luasLahan: 2300,
                    panenKotor: 2250,
                    panenBersih: 2200,
                    produktivitas: 96,
                    produksi: 2112,
                },
                {
                    id: 'c4-3',
                    kecamatan: 'Puger',
                    luasLahan: 1800,
                    panenKotor: 1750,
                    panenBersih: 1700,
                    produktivitas: 94,
                    produksi: 1598,
                },
            ],
        },
    ]);

    const filteredRows = rows
        .map((row) => {
            // Filter anak berdasarkan kategori komoditi (jika dipilih)
            if (selectedKomoditi === 'Semua Komoditi') {
                return row;
            }

            const kategoriMap = {
                Pangan: ['Padi', 'Jagung', 'Kedelai'],
                Hortikultura: ['Cabai', 'Tomat'],
                Perkebunan: ['Teh', 'Kopi', 'Cengkeh', 'Tembakau'],
            };

            const allowed = kategoriMap[selectedKomoditi] || [];
            if (!allowed.includes(row.komoditi)) {
                return null;
            }
            return row;
        })
        .filter((row) => row !== null)
        .map((row) => {
            // Filter children berdasarkan lokasi
            let filteredChildren = row.children;
            
            if (selectedLocation !== 'Semua Kecamatan') {
                filteredChildren = row.children.filter((child) => child.kecamatan === selectedLocation);
            }

            // Filter berdasarkan bulan (jika diperlukan di masa depan)
            // Untuk sekarang, bulan filter belum digunakan

            return { ...row, children: filteredChildren };
        })
        .filter(
            (row) =>
                row.children.length > 0 &&
                row.komoditi.toLowerCase().includes(desaSearch.toLowerCase())
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

    // Mendapatkan nama komoditi pertama dari data yang dicentang untuk ditampilkan di Modal
    const getSelectedKomoditiNames = () => {
        const names = new Set();
        rows.forEach(row => {
            row.children.forEach(c => {
                if (selectedRows.includes(c.id)) names.add(row.komoditi);
            });
        });
        return Array.from(names);
    };
    const firstSelectedKomoditi = getSelectedKomoditiNames()[0] || '-';

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
            <span className="text-[10px] font-medium leading-none whitespace-nowrap">
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
            if (komoditiDropdownRef.current && !komoditiDropdownRef.current.contains(event.target)) setIsKomoditiOpen(false);
            if (bulanDropdownRef.current && !bulanDropdownRef.current.contains(event.target)) setIsBulanOpen(false);
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) setIsYearOpen(false);
            if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) setIsLocationOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full h-[600px] bg-[#F8FAFC] font-mona-sans">

            <div className="bg-white p-8  rounded-[16px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col items-start gap-4">
                        <span className="bg-gray-500 text-white px-[12px] py-[1px] rounded-full text-[12px] font-normal shadow-sm">
                            Data Produksi Panen
                        </span>
                        <h2 className="text-[18px] font-semibold text-gray-950">
                            Luas Panen, Produktivitas, dan Produksi Per Desa
                        </h2>
                    </div>
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

                    <div className="relative" ref={locationDropdownRef}>
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
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedKomoditi('Semua Komoditi');
                            setSelectedBulan('Semua Bulan');
                            setSelectedYear('2020');
                            setSelectedLocation('Semua Kecamatan');
                            setDesaSearch('');
                            setIsFilterApplied(false);
                        }}
                        className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                    >
                        Hapus Filter
                    </button>
                </div>
                {/* Table Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse table-fixed bg-white">
                        <thead className="bg-[#F9FAFB] border-b border-gray-200">
                            <tr>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] ">Komoditi</th>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] ">Kecamatan</th>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] text-left ">Luas Lahan (Ha.)</th>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] text-left ">Panen Kotor (Ha.)</th>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] text-left ">Panen Bersih (Ha.)</th>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] text-left ">Produktivitas (Ku/Ha)</th>
                                <th className="py-4 px-2 text-[13px] font-medium text-[#111827] text-left ">Produksi (Ton)</th>
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
                                        {/* Parent Row (Komoditi) */}
                                        <tr className="hover:bg-gray-50 transition-colors group">
                                            <td className="py-3 px-2 pr-6" onClick={() => toggleDesa(row.komoditi)}>
                                                <div className="flex items-center gap-2">
                                                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${expandedDesa.includes(row.komoditi) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    <div className="text-[14px] font-medium font-mona-sans text-[#21272A] bg-[#F2F4F8] w-full px-[10px] py-[2px] rounded-full">
                                                        <span className="text-[13px] font-normal text-[#111827]">{row.komoditi}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 align-middle">
                                                <span className="text-[13px] text-[#111827]">—</span>
                                            </td>
                                            <td className="py-3 px-2 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                        {row.children.reduce((sum, c) => sum + c.luasLahan, 0).toLocaleString('id-ID')}
                                                    </span>
                                                    {showPercentage && (() => {
                                                        const trend = getParentTrend(row.id, selectedYear);
                                                        return renderTrendBadge(`trend_parent_${row.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                        {row.children.reduce((sum, c) => sum + c.panenKotor, 0).toLocaleString('id-ID')}
                                                    </span>
                                                    {showPercentage && (() => {
                                                        const trend = getParentTrend(row.id, selectedYear);
                                                        return renderTrendBadge(`trend_panen_kotor_${row.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                        {row.children.reduce((sum, c) => sum + c.panenBersih, 0).toLocaleString('id-ID')}
                                                    </span>
                                                    {showPercentage && (() => {
                                                        const trend = getParentTrend(row.id, selectedYear);
                                                        return renderTrendBadge(`trend_panen_bersih_${row.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                        {Math.round(row.children.reduce((sum, c) => sum + c.produktivitas, 0) / row.children.length).toLocaleString('id-ID')}
                                                    </span>
                                                    {showPercentage && (() => {
                                                        const trend = getParentTrend(row.id, selectedYear);
                                                        return renderTrendBadge(`trend_produktivitas_${row.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                        {row.children.reduce((sum, c) => sum + c.produksi, 0).toLocaleString('id-ID')}
                                                    </span>
                                                    {showPercentage && (() => {
                                                        const trend = getParentTrend(row.id, selectedYear);
                                                        return renderTrendBadge(`trend_produksi_${row.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-right align-middle">
                                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                                    <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Child Rows (Hanya muncul jika Komoditi di klik) */}
                                        {expandedDesa.includes(row.komoditi) && row.children.map((child) => (
                                            <tr key={child.id} className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-2 align-middle">
                                                    <div className="pl-6">
                                                        <span className="text-[13px] text-[#111827]">—</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 align-middle">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                        {child.kecamatan}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                            {child.luasLahan.toLocaleString('id-ID')}
                                                        </span>
                                                        {showPercentage && (() => {
                                                            const trend = getChildTrend(child.id, selectedYear);
                                                            return renderTrendBadge(`trend_child_luas_${child.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                        })()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                            {child.panenKotor.toLocaleString('id-ID')}
                                                        </span>
                                                        {showPercentage && (() => {
                                                            const trend = getChildTrend(child.id, selectedYear);
                                                            return renderTrendBadge(`trend_child_panen_kotor_${child.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                        })()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                            {child.panenBersih.toLocaleString('id-ID')}
                                                        </span>
                                                        {showPercentage && (() => {
                                                            const trend = getChildTrend(child.id, selectedYear);
                                                            return renderTrendBadge(`trend_child_panen_bersih_${child.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                        })()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                            {child.produktivitas.toLocaleString('id-ID')}
                                                        </span>
                                                        {showPercentage && (() => {
                                                            const trend = getChildTrend(child.id, selectedYear);
                                                            return renderTrendBadge(`trend_child_produktivitas_${child.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                        })()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center justify-center px-3 py-1 text-[13px] text-[#111827] min-w-[64px] rounded-full">
                                                            {child.produksi.toLocaleString('id-ID')}
                                                        </span>
                                                        {showPercentage && (() => {
                                                            const trend = getChildTrend(child.id, selectedYear);
                                                            return renderTrendBadge(`trend_child_produksi_${child.id}_${selectedYear}`, trend.label, trend.isPositive);
                                                        })()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right align-middle">
                                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                                        <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
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
            </div>

            {/* Modal Verifikasi */}
            

            {/* Modal Sukses */}
            

            {/* Modal Peringatan Laporkan */}
            

            {/* Modal Isi Laporkan */}
            
        </div>
    );
};

export default ModalDataPanen;