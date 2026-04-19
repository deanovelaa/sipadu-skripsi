import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

const BULAN_OPTIONS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const JENIS_KOMODITI = ['Pangan', 'Hortikultura', 'Kebun'];

const KOMODITI_BY_JENIS = {
  Pangan: ['Kedelai', 'Jagung', 'Padi'],
  Hortikultura: ['Bawang Putih', 'Bawang Merah'],
  Kebun: ['Kopi', 'Teh'],
};

const SEMUA_JENIS = 'Semua';
const JENIS_KOMODITI_DENGAN_SEMUA = [SEMUA_JENIS, ...JENIS_KOMODITI];

function getLatestYearFromRecords(records) {
  if (!records?.length) return '';
  const nums = records
    .map((r) => parseInt(r.tahun, 10))
    .filter((n) => Number.isFinite(n));
  if (!nums.length) return '';
  return String(Math.max(...nums));
}

const DatabasePage = () => {
  // --- States ---
  const [activeTab, setActiveTab] = useState('Data Lahan Produksi');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [jenisKomoditi, setJenisKomoditi] = useState(SEMUA_JENIS);
  const [komoditiSearch, setKomoditiSearch] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('Semua Kecamatan');
  const [expandedItems, setExpandedItems] = useState(['Kencong', 'Jagung', 'Padi']);

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
      // DATA 2025 — Pangan
      { komoditi: 'Jagung', bulan: 'Januari', luasTanam: '6,246', panenKotor: '6,200', panenBersih: '6,100', produktivitas: '65.5', produksiTon: '6,246', tren: '+35%', tahun: '2025', kecamatans: [{ nama: 'Kencong', luas: '1,246', pKotor: '1,200', pBersih: '1,150', produktivitas: '62.0', produksi: '1,200', tren: '+35%' }] },
      { komoditi: 'Padi', bulan: 'Februari', luasTanam: '12,500', panenKotor: '12,000', panenBersih: '11,800', produktivitas: '72.1', produksiTon: '15,000', tren: '+12%', tahun: '2025', kecamatans: [{ nama: 'Puger', luas: '4,500', pKotor: '4,200', pBersih: '4,100', produktivitas: '70.5', produksi: '6,000', tren: '+14%' }] },
      { komoditi: 'Kedelai', bulan: 'Maret', luasTanam: '1,800', panenKotor: '1,700', panenBersih: '1,650', produktivitas: '14.2', produksiTon: '720', tren: '+6%', tahun: '2025', kecamatans: [{ nama: 'Kencong', luas: '600', pKotor: '580', pBersih: '550', produktivitas: '13.5', produksi: '240', tren: '+4%' }] },
      // Hortikultura
      { komoditi: 'Bawang Merah', bulan: 'April', luasTanam: '420', panenKotor: '400', panenBersih: '390', produktivitas: '8.2', produksiTon: '95', tren: '+3%', tahun: '2025', kecamatans: [{ nama: 'Wuluhan', luas: '200', pKotor: '190', pBersih: '185', produktivitas: '8.0', produksi: '42', tren: '+2%' }] },
      { komoditi: 'Bawang Putih', bulan: 'Mei', luasTanam: '310', panenKotor: '295', panenBersih: '288', produktivitas: '7.5', produksiTon: '62', tren: '+2%', tahun: '2025', kecamatans: [{ nama: 'Ambulu', luas: '150', pKotor: '145', pBersih: '140', produktivitas: '7.2', produksi: '28', tren: '+1%' }] },
      // Kebun
      { komoditi: 'Kopi', bulan: 'Desember', luasTanam: '2,100', panenKotor: '2,000', panenBersih: '1,950', produktivitas: '4.2', produksiTon: '180', tren: '+4%', tahun: '2025', kecamatans: [{ nama: 'Gumukmas', luas: '900', pKotor: '860', pBersih: '840', produktivitas: '4.0', produksi: '78', tren: '+3%' }] },
      { komoditi: 'Teh', bulan: 'Oktober', luasTanam: '1,400', panenKotor: '1,350', panenBersih: '1,320', produktivitas: '3.8', produksiTon: '120', tren: '+2%', tahun: '2025', kecamatans: [{ nama: 'Puger', luas: '600', pKotor: '580', pBersih: '570', produktivitas: '3.6', produksi: '52', tren: '+1%' }] },
      // DATA 2024
      { komoditi: 'Jagung', bulan: 'September', luasTanam: '5,800', panenKotor: '5,500', panenBersih: '5,400', produktivitas: '60.2', produksiTon: '5,200', tren: '+20%', tahun: '2024', kecamatans: [{ nama: 'Gumukmas', luas: '1,000', pKotor: '950', pBersih: '900', produktivitas: '58.0', produksi: '1,000', tren: '+15%' }] },
      { komoditi: 'Kedelai', bulan: 'Agustus', luasTanam: '2,000', panenKotor: '1,800', panenBersih: '1,750', produktivitas: '15.5', produksiTon: '800', tren: '+5%', tahun: '2024', kecamatans: [{ nama: 'Wuluhan', luas: '1,000', pKotor: '900', pBersih: '850', produktivitas: '16.0', produksi: '450', tren: '+8%' }] },
      // DATA 2023
      { komoditi: 'Padi', bulan: 'Juli', luasTanam: '11,200', panenKotor: '10,500', panenBersih: '10,200', produktivitas: '68.0', produksiTon: '13,500', tren: '+8%', tahun: '2023', kecamatans: [{ nama: 'Ambulu', luas: '3,000', pKotor: '2,800', pBersih: '2,700', produktivitas: '65.0', produksi: '4,000', tren: '+5%' }] },
      // DATA 2022
      { komoditi: 'Jagung', bulan: 'Mei', luasTanam: '5,200', panenKotor: '5,000', panenBersih: '4,900', produktivitas: '58.5', produksiTon: '4,800', tren: '+5%', tahun: '2022', kecamatans: [{ nama: 'Kencong', luas: '900', pKotor: '850', pBersih: '800', produktivitas: '55.0', produksi: '900', tren: '+2%' }] },
      // DATA 2021
      { komoditi: 'Padi', bulan: 'Maret', luasTanam: '10,800', panenKotor: '10,000', panenBersih: '9,800', produktivitas: '66.5', produksiTon: '12,000', tren: '+4%', tahun: '2021', kecamatans: [{ nama: 'Gumukmas', luas: '2,500', pKotor: '2,400', pBersih: '2,300', produktivitas: '64.0', produksi: '3,200', tren: '+3%' }] },
      // DATA 2020
      { komoditi: 'Jagung', bulan: 'Januari', luasTanam: '4,800', panenKotor: '4,500', panenBersih: '4,400', produktivitas: '55.0', produksiTon: '4,200', tren: '+0%', tahun: '2020', kecamatans: [{ nama: 'Puger', luas: '800', pKotor: '750', pBersih: '700', produktivitas: '52.0', produksi: '800', tren: '+0%' }] },
    ]
  };

  const latestYearLahan = getLatestYearFromRecords(allData['Data Lahan Produksi']);
  const latestYearPanen = getLatestYearFromRecords(allData['Data Produksi Panen']);

  const effectiveYear =
    selectedYear ||
    (activeTab === 'Data Lahan Produksi' ? latestYearLahan : latestYearPanen);

  // --- Logic Filter ---
  const filteredData = useMemo(() => {
    if (!effectiveYear) return [];

    if (activeTab === 'Data Lahan Produksi') {
      return allData[activeTab].filter((item) => {
        const matchYear = item.tahun === effectiveYear;
        const matchKec =
          selectedKecamatan === 'Semua Kecamatan' ||
          item.kecamatan === selectedKecamatan;
        return matchYear && matchKec;
      }).sort((a, b) => a.kecamatan.localeCompare(b.kecamatan, 'id'));
    }

    return allData['Data Produksi Panen'].filter((item) => {
      if (jenisKomoditi !== SEMUA_JENIS) {
        const allowed = KOMODITI_BY_JENIS[jenisKomoditi] || [];
        if (!allowed.includes(item.komoditi)) return false;
      }
      if (item.tahun !== effectiveYear) return false;
      if (selectedMonth && item.bulan && item.bulan !== selectedMonth) return false;
      if (
        komoditiSearch.trim() &&
        !item.komoditi.toLowerCase().includes(komoditiSearch.trim().toLowerCase())
      ) {
        return false;
      }
      if (selectedKecamatan === 'Semua Kecamatan') return true;
      return (item.kecamatans || []).some((k) => k.nama === selectedKecamatan);
    }).sort((a, b) => a.komoditi.localeCompare(b.komoditi, 'id'));
  }, [
    activeTab,
    effectiveYear,
    selectedMonth,
    jenisKomoditi,
    komoditiSearch,
    selectedKecamatan,
  ]);

  // --- Handlers ---
  const toggleExpand = (id) => {
    setExpandedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleResetFilter = () => {
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedKecamatan('Semua Kecamatan');
    setJenisKomoditi(SEMUA_JENIS);
    setKomoditiSearch('');
  };

  const hasActiveFiltersLahan =
    selectedYear !== '' || selectedKecamatan !== 'Semua Kecamatan';

  const hasActiveFiltersPanen =
    selectedYear !== '' ||
    selectedMonth !== '' ||
    selectedKecamatan !== 'Semua Kecamatan' ||
    jenisKomoditi !== SEMUA_JENIS ||
    komoditiSearch.trim() !== '';

  const handleExport = () => {
    if (!filteredData || filteredData.length === 0) return;

    let rows = [];

    if (activeTab === 'Data Lahan Produksi') {
      rows = filteredData.flatMap((item) =>
        (item.desa || []).map((desaItem) => ({
          Tahun: item.tahun,
          Kecamatan: item.kecamatan,
          Desa: desaItem.nama,
          'Luas Lahan (Ha.)': desaItem.luas,
          'Jenis Lahan': desaItem.jenis,
          'Status Kepemilikan': desaItem.status,
          'Ketersediaan Air': desaItem.air,
          'Status Pemanfaatan Lahan': desaItem.pemanfaatan,
        }))
      );
    } else if (activeTab === 'Data Produksi Panen') {
        rows = filteredData.flatMap((item) =>
        (item.kecamatans || []).map((kec) => ({
          Tahun: item.tahun,
          Bulan: item.bulan || '—',
          Komoditi: item.komoditi,
          Kecamatan: kec.nama,
          'Luas Tanam (Ha.)': item.luasTanam,
          'Panen Kotor (Ha.)': item.panenKotor,
          'Panen Bersih (Ha.)': item.panenBersih,
          'Produktivitas (Ku/Ha)': item.produktivitas,
          'Produksi (Ton)': item.produksiTon,
        }))
      );
    }

    if (!rows.length) return;

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    const sheetName =
      activeTab === 'Data Lahan Produksi' ? 'Data Lahan' : 'Data Produksi Panen';

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const exportYear =
      selectedYear ||
      (activeTab === 'Data Lahan Produksi' ? latestYearLahan : latestYearPanen);

    const filename =
      activeTab === 'Data Lahan Produksi'
        ? `database-lahan-${exportYear || 'data'}.xlsx`
        : `database-panen-${exportYear || 'data'}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pb-10" >
      {/* style={{ fontFamily: '"Mona Sans", sans-serif' }} */}
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#111827] tracking-tight">Database</h1>
      </div>

      {/* Container Utama */}
      <div className="mx-8 bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden shadow-sm min-h-[650px] flex flex-col transition-all duration-500">

        {/* Navigasi Tab & Filter Bar */}
        <div className="p-6 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-6 mb-8">
            {['Data Lahan Produksi', 'Data Produksi Panen'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Data Lahan Produksi') {
                    setSelectedMonth('');
                    setKomoditiSearch('');
                  } else {
                    setJenisKomoditi(SEMUA_JENIS);
                  }
                }}
                className={`text-[14px] font-semibold pb-2 relative transition-all ${activeTab === tab ? 'text-[#16A34A]' : 'text-[#64748B]'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#16A34A] rounded-full" />}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {activeTab === 'Data Produksi Panen' ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <input
                      type="text"
                      value={komoditiSearch}
                      onChange={(e) => setKomoditiSearch(e.target.value)}
                      placeholder="Cari Komoditi"
                      className="pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-md bg-white text-[14px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 min-w-[200px]"
                    />
                  </div>

                  <div className="relative flex items-center min-w-[150px]">
                    <select
                      value={jenisKomoditi}
                      onChange={(e) => setJenisKomoditi(e.target.value)}
                      className="appearance-none w-full bg-white border border-[#E2E8F0] rounded-md text-[#334155] pl-4 pr-9 py-2.5 text-[14px] font-normal focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer"
                    >
                      {JENIS_KOMODITI_DENGAN_SEMUA.map((j) => (
                        <option key={j} value={j}>{j === SEMUA_JENIS ? 'Semua jenis' : j}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 pointer-events-none text-[#94A3B8]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative flex items-center min-w-[150px]">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="appearance-none w-full bg-white border border-[#E2E8F0] rounded-md text-[#334155] pl-4 pr-9 py-2.5 text-[14px] font-normal focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer"
                    >
                      <option value="">Semua Bulan</option>
                      {BULAN_OPTIONS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 pointer-events-none text-[#94A3B8]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative flex items-center min-w-[120px]">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="appearance-none w-full bg-white border border-[#E2E8F0] rounded-md text-[#334155] pl-4 pr-9 py-2.5 text-[14px] font-normal focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer"
                    >
                      <option value="">{` ${latestYearPanen || '—'}`}</option>
                      {[ '2024', '2023', '2022', '2021', '2020'].map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 pointer-events-none text-[#94A3B8]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative flex items-center min-w-[120px]">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none w-full bg-white border border-[#E2E8F0] rounded-md text-[#334155] pl-4 pr-9 py-2.5 text-[14px] font-normal focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer"
                  >
                    <option value="">{` ${latestYearLahan || '—'}`}</option>
                    {['2024', '2023', '2022', '2021', '2020'].map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 pointer-events-none text-[#94A3B8]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              )}

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

              {/* <button
                className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-md hover:bg-slate-50 transition-colors shadow-sm"
                onClick={() => console.log('Filter clicked')}
              > */}
              {/* Icon Funnel/Filter */}
              {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5.6001C20 5.04005 19.9996 4.75981 19.8906 4.5459C19.7948 4.35774 19.6423 4.20487 19.4542 4.10899C19.2403 4 18.9597 4 18.3996 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7084C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9808 14.1475 12.8914C14.2089 12.7911 14.2947 12.7053 14.4653 12.5347L14.4688 12.5315L19.5315 7.46875C19.7044 7.2958 19.7904 7.20932 19.8523 7.1084C19.9071 7.01893 19.9482 6.92146 19.9727 6.81942C20 6.70551 20 6.58444 20 6.3448V5.6001Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg> */}

              {/* Label Text */}
              {/* <span className="text-[#334155] text-sm font-normal">
                  Filter
                </span>
              </button> */}

              {(activeTab === 'Data Lahan Produksi'
                ? hasActiveFiltersLahan
                : hasActiveFiltersPanen) && (
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="text-[14px] text-[#0F172A] font-semibold ml-1 hover:text-red-600 transition-colors"
                >
                  Hapus Filter
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="flex w-[120px] items-center gap-2 px-4 py-3 bg-[#16A34A] text-white  text-[14px] font-semibold hover:bg-[#15803D] shadow-sm transition-all active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 20H18H6Z" fill="white" />
                <path d="M6 20H18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 16L8.5 12.5M12 4V16V4ZM12 16L15.5 12.5L12 16Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              Export
            </button>
          </div>
        </div>

        {/* Area Konten Dinamis */}
        {/* Content Area */}
        <div className="flex-grow flex flex-col overflow-hidden justify-start">
            <div className="w-full h-full overflow-auto scrollbar-hide">
              {/* min-w-max memastikan tabel tidak menciut dan teks tetap 1 baris */}
              <table className="w-full border-collapse min-w-max">
                <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9] sticky top-0 z-10">
                  {/* Tambahkan font-normal di sini untuk menimpa bold bawaan <th> */}
                  <tr className="text-[#121619] text-[12px] font-medium whitespace-nowrap">
                    {activeTab === 'Data Lahan Produksi' ? (
                      <>
                        <th className="py-5 px-6 text-left font-normal">
                          <div className="flex items-center gap-1.5 cursor-pointer group">
                            <span>Kecamatan</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#21272A]">
                              <path d="M8.16675 11.9998L12.1667 7.99984M8.16675 3.6665V11.9998V3.6665ZM8.16675 11.9998L4.16675 7.99984L8.16675 11.9998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </th>
                        {/* Pastikan setiap <th> memiliki font-normal */}
                        <th className="py-5 px-6 text-left font-normal">Desa</th>
                        <th className="py-5 px-6 text-left font-normal">Luas Lahan (Ha.)</th>
                        <th className="py-5 px-6 text-left font-normal">Jenis Lahan</th>
                        <th className="py-5 px-6 text-left font-normal">Status Kepemilikan</th>
                        <th className="py-5 px-6 text-left font-normal">Ketersediaan Air</th>
                        <th className="py-5 px-6 text-left font-normal">Status Pemanfaatan Lahan</th>
                      </>
                    ) : (
                      <>
                        <th className="py-5 px-6 text-left font-normal">Komoditi</th>
                        <th className="py-5 px-6 text-left font-normal">Kecamatan</th>
                        <th className="py-5 px-6 text-left font-normal whitespace-nowrap">Luas Tanam (Ha.)</th>
                        <th className="py-5 px-6 text-left font-normal whitespace-nowrap">Panen Kotor (Ha.)</th>
                        <th className="py-5 px-6 text-left font-normal whitespace-nowrap">Panen Bersih (Ha.)</th>
                        <th className="py-5 px-6 text-left font-normal whitespace-nowrap">Produktivitas (Ku/Ha)</th>
                        <th className="py-5 px-6 text-left font-normal whitespace-nowrap">Produksi (Ton)</th>
                      </>
                    )}
                    {/* <th className="py-5 px-6 text-left font-normal whitespace-nowrap"></th> */}
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
                              <div className={`p-1 rounded-md transition-all ${isExpanded ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'text-gray-400'}`}>
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
                                <div className="flex items-center justify-center opacity-100 border bg-[#05C168]/20 text-green-600 border-[#05C168]/20 text-[10px] px-[2px] ">
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
                          <td colSpan={activeTab === 'Data Lahan Produksi' ? 4 : 0}></td>
                          <td className="py-5 px-6 text-right font-normal"><button className="text-gray-300 hover:text-gray-600 font-normal px-2">···</button></td>
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
                            <td className="py-3 px-6 text-right font-normal"><button className="text-gray-300 hover:text-gray-600 font-normal px-2">···</button></td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  }) : (
                    <tr><td colSpan={10} className="py-20 text-center text-gray-400 font-normal italic tracking-wide">Tidak ada data untuk kombinasi filter yang dipilih.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;