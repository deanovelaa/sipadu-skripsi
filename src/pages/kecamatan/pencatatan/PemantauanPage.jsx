import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PemantauanPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Data Lahan Produksi');
  const [isRevisiModalOpen, setIsRevisiModalOpen] = useState(false);
  const [revisiYear, setRevisiYear] = useState('');
  const [revisiKecamatan, setRevisiKecamatan] = useState('');
  const [revisiKomoditas, setRevisiKomoditas] = useState('');
  const [revisiNote, setRevisiNote] = useState('Data mencurigakan, tolong periksa kembali');

  // Data untuk tab \"Data Lahan Produksi\" (per Tahun)
  const tahunLahan = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const [selectedLahanYear, setSelectedLahanYear] = useState('2020');

  // Daftar kecamatan per tahun untuk Data Lahan Produksi
  const dataPemantauan = [
    // 2020
    {
      tahun: '2020',
      kecamatan: 'Kencong',
      status: 'Diajukan',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Gumukmas',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Puger',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Wuluhan',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Ambulu',
      status: 'Revisi',
      terakhirUpdate: '12 Des 2020',
    },
    // 2021
    {
      tahun: '2021',
      kecamatan: 'Kencong',
      status: 'Revisi',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Gumukmas',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Puger',
      status: 'Diajukan',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Wuluhan',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Ambulu',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2021',
    },
    // 2022
    {
      tahun: '2022',
      kecamatan: 'Kencong',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Gumukmas',
      status: 'Diajukan',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Puger',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Wuluhan',
      status: 'Revisi',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Ambulu',
      status: 'Diajukan',
      terakhirUpdate: '12 Des 2022',
    },
    // 2023
    {
      tahun: '2023',
      kecamatan: 'Kencong',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Gumukmas',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Puger',
      status: 'Diterima',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Wuluhan',
      status: 'Diajukan',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Ambulu',
      status: 'Revisi',
      terakhirUpdate: '12 Des 2023',
    },
    // 2024
    {
      tahun: '2024',
      kecamatan: 'Kencong',
      status: 'Diajukan',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Gumukmas',
      status: 'Diterima',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Puger',
      status: 'Revisi',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Wuluhan',
      status: 'Diterima',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Ambulu',
      status: 'Diajukan',
      terakhirUpdate: '13 Des 2024',
    },
    // 2025
    {
      tahun: '2025',
      kecamatan: 'Kencong',
      status: 'Diterima',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Gumukmas',
      status: 'Diajukan',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Puger',
      status: 'Diterima',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Wuluhan',
      status: 'Diterima',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Ambulu',
      status: 'Revisi',
      terakhirUpdate: '13 Des 2025',
    },
  ];

  // Data & state untuk tab \"Data Produksi Panen\"
  const tahunProduksi = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const [selectedProduksiYear, setSelectedProduksiYear] = useState('2020');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [komoditasFilter, setKomoditasFilter] = useState('Pangan');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isKomoditasDropdownOpen, setIsKomoditasDropdownOpen] = useState(false);
  const [expandedProduksiKecamatan, setExpandedProduksiKecamatan] = useState([]);

  const bulanList = [
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

  const getMonthlyStatuses = (row) => {
    // Default: semua Diterima
    const statuses = bulanList.map(() => 'Diterima');

    // Pola khusus per tahun/kecamatan agar tampilan terasa dinamis
    if (row.tahun === '2020' && row.kecamatan === 'Kencong') {
      statuses[0] = 'Diajukan';
    }
    if (row.tahun === '2020' && row.kecamatan === 'Ambulu') {
      statuses[0] = 'Revisi';
      statuses[5] = 'Revisi';
    }
    if (row.tahun === '2022' && row.kecamatan === 'Wuluhan') {
      statuses[2] = 'Revisi';
      statuses[7] = 'Revisi';
    }
    if (row.tahun === '2024' && row.kecamatan === 'Puger') {
      statuses[3] = 'Ditolak';
    }
    if (row.tahun === '2025' && row.kecamatan === 'Ambulu') {
      statuses[4] = 'Revisi';
      statuses[8] = 'Ditolak';
    }

    // Konsistensikan dengan status terakhir jika diperlukan
    if (row.statusTerakhir === 'Diajukan' && !statuses.includes('Diajukan')) {
      statuses[0] = 'Diajukan';
    }
    if (row.statusTerakhir === 'Revisi' && !statuses.includes('Revisi')) {
      statuses[1] = 'Revisi';
    }

    return statuses;
  };

  const dataProduksiPanen = [
    // 2020
    {
      tahun: '2020',
      kecamatan: 'Kencong',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Gumukmas',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Puger',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Wuluhan',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2020',
    },
    {
      tahun: '2020',
      kecamatan: 'Ambulu',
      statusTerakhir: 'Revisi',
      terakhirUpdate: '12 Des 2020',
    },
    // 2021
    {
      tahun: '2021',
      kecamatan: 'Kencong',
      statusTerakhir: 'Revisi',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Gumukmas',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Puger',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Wuluhan',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2021',
    },
    {
      tahun: '2021',
      kecamatan: 'Ambulu',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2021',
    },
    // 2022
    {
      tahun: '2022',
      kecamatan: 'Kencong',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Gumukmas',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Puger',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Wuluhan',
      statusTerakhir: 'Revisi',
      terakhirUpdate: '12 Des 2022',
    },
    {
      tahun: '2022',
      kecamatan: 'Ambulu',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '12 Des 2022',
    },
    // 2023
    {
      tahun: '2023',
      kecamatan: 'Kencong',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Gumukmas',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Puger',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Wuluhan',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '12 Des 2023',
    },
    {
      tahun: '2023',
      kecamatan: 'Ambulu',
      statusTerakhir: 'Revisi',
      terakhirUpdate: '12 Des 2023',
    },
    // 2024
    {
      tahun: '2024',
      kecamatan: 'Kencong',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Gumukmas',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Puger',
      statusTerakhir: 'Revisi',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Wuluhan',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '13 Des 2024',
    },
    {
      tahun: '2024',
      kecamatan: 'Ambulu',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '13 Des 2024',
    },
    // 2025
    {
      tahun: '2025',
      kecamatan: 'Kencong',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Gumukmas',
      statusTerakhir: 'Diajukan',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Puger',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Wuluhan',
      statusTerakhir: 'Diterima',
      terakhirUpdate: '13 Des 2025',
    },
    {
      tahun: '2025',
      kecamatan: 'Ambulu',
      statusTerakhir: 'Revisi',
      terakhirUpdate: '13 Des 2025',
    },
  ];

  const openRevisiModal = (tahun) => {
    setRevisiYear(tahun || '');
    // Untuk sekarang kecamatan diisi default, bisa dihubungkan dengan data sebenarnya nanti
    setRevisiKecamatan('Ambulu');
    setRevisiKomoditas('Padi');
    setRevisiNote('Data mencurigakan, tolong periksa kembali');
    setIsRevisiModalOpen(true);
  };

  const renderStatus = (status, tahun) => {
    switch (status) {
      case 'Diterima':
        return (
          <div className="flex w-fit items-center gap-1.5 bg-green-100 text-green-600 px-2 rounded-full text-[12px] font-normal">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4.00016L3.41421 5.41438L6.24234 2.58594" stroke="#16A34A" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            Diterima
          </div>
        );
      case 'Revisi':
        return (
          <div className="flex flex-row gap-2">
            <div className="flex w-fit items-center gap-2 bg-red-100 text-red-600 px-2 rounded-full text-[12px] font-normal">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33365 5.33365L4.00033 4.00033M4.00033 4.00033L2.66699 2.66699M4.00033 4.00033L5.33367 2.66699M4.00033 4.00033L2.66699 5.33367" stroke="#DC2626" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span>Revisi</span>
            </div>
            <button
              type="button"
              onClick={() => openRevisiModal(tahun)}
              className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.3335C5 4.00016 11 4.00016 13 8.3335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.99984 10.6667C7.26344 10.6667 6.6665 10.0697 6.6665 9.33333C6.6665 8.59693 7.26344 8 7.99984 8C8.73624 8 9.33317 8.59693 9.33317 9.33333C9.33317 10.0697 8.73624 10.6667 7.99984 10.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>

        );
      case 'Diajukan':
        return (
          <div className="flex w-fit items-center gap-1.5 bg-yellow-100 text-yellow-600 px-2 rounded-full text-[12px] font-normal">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33301 5.33333H1.66634V7M4.66634 2.66667H6.33301V1M1.52734 3.00113C1.71424 2.53855 2.02715 2.13768 2.43052 1.84408C2.8339 1.55047 3.31196 1.37584 3.80959 1.34017C4.30723 1.3045 4.80459 1.40913 5.24571 1.6422C5.68683 1.87527 6.05342 2.22751 6.30438 2.65871M6.47219 4.99902C6.2853 5.4616 5.97238 5.86248 5.56901 6.15608C5.16564 6.44969 4.68806 6.6241 4.19043 6.65977C3.6928 6.69544 3.19503 6.59082 2.75391 6.35775C2.31278 6.12468 1.94595 5.7725 1.69499 5.34131" stroke="#CA8A04" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <span>Diajukan</span>
          </div>
        );
      case 'Ditolak':
        return (
          <div className="flex w-fit items-center gap-1.5 bg-red-100 text-red-600 px-2 rounded-full text-[12px] font-normal">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.33365 5.33365L4.00033 4.00033M4.00033 4.00033L2.66699 2.66699M4.00033 4.00033L5.33367 2.66699M4.00033 4.00033L2.66699 5.33367" stroke="#DC2626" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span>Ditolak</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Dark Header */}
      <div className="bg-white px-8 py-6">
        <h1 className="text-gray-950 text-[24px] font-semibold">
          Pemantauan
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-t-[20px] min-h-[calc(100vh-120px)] p-8">
        {/* Tabs Section */}
        <div className="flex items-center gap-4 mb-6  border-gray-200">
          <button
            onClick={() => setActiveTab('Data Lahan Produksi')}
            className={`py-2 px-3 rounded-lg text-[14px] font-medium transition-colors relative ${activeTab === 'Data Lahan Produksi'
              ? 'text-green-600'
              : 'text-[#64748B]'
              }`}
          >
            Data Lahan Produksi
            {activeTab === 'Data Lahan Produksi' && (
              <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-green-600 rounded-full" />

            )}
          </button>
          <button
            onClick={() => setActiveTab('Data Produksi Panen')}
            className={`py-2 px-3 rounded-lg text-[14px] font-medium transition-colors relative ${activeTab === 'Data Produksi Panen'
              ? 'text-green-600 '
              : 'text-[#64748B]'
              }`}
          >
            Data Produksi Panen
            {activeTab === 'Data Produksi Panen' && (
              <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-green-600 rounded-full" />
            )}
          </button>
          {/* <button className="text-gray-400 text-[20px] font-bold tracking-widest pb-3">
            •••
          </button> */}
        </div>

        {/* Content Section */}
        {activeTab === 'Data Lahan Produksi' ? (
          <>
            {/* Filter Bar: Tahun + Status & Komoditas */}


            <div className="overflow-x-auto border border-gray-200 rounded-lg mt-2">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619] ">
                      Tahun
                    </th>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619] ">
                      Status
                    </th>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619] ">
                      Terakhir Update
                    </th>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {dataPemantauan
                    .filter((item) => item.kecamatan === 'Kencong')
                    .filter((item) => statusFilter === 'Semua Status' || item.status === statusFilter)
                    .map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors" >
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-normal text-[#121619]">
                            {item.tahun}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {renderStatus(item.status, item.tahun)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[14px] text-[#121619]">
                            {item.terakhirUpdate}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center gap-3 justify-start">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => navigate(`/kecamatan/pencatatan/pemantauan/detail/lahan`)}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.60254 2.29395H6.26855C6.29044 2.29395 6.31279 2.29827 6.33301 2.30664C6.35305 2.31501 6.37136 2.32741 6.38672 2.34277C6.40209 2.35821 6.41452 2.37636 6.42285 2.39648C6.43118 2.41662 6.43552 2.43817 6.43555 2.45996C6.43555 2.48185 6.43123 2.50419 6.42285 2.52441C6.41448 2.54448 6.4021 2.56275 6.38672 2.57812C6.37132 2.59351 6.3531 2.60589 6.33301 2.61426C6.31279 2.62263 6.29044 2.62695 6.26855 2.62695H3.60254C3.11631 2.62695 2.64948 2.82025 2.30566 3.16406C1.96203 3.50781 1.76861 3.97391 1.76855 4.45996V12.46C1.76855 12.9462 1.96185 13.413 2.30566 13.7568C2.64948 14.1006 3.11633 14.2939 3.60254 14.2939H11.6025C12.0885 14.2939 12.5547 14.1004 12.8984 13.7568C13.2423 13.413 13.4355 12.9462 13.4355 12.46V9.79395C13.4355 9.74977 13.4532 9.70703 13.4844 9.67578C13.5156 9.64452 13.5583 9.62695 13.6025 9.62695C13.6466 9.62704 13.6886 9.64467 13.7197 9.67578C13.751 9.70704 13.7686 9.74974 13.7686 9.79395V12.46C13.7686 13.0345 13.5409 13.5859 13.1348 13.9922C12.7285 14.3984 12.1771 14.6269 11.6025 14.627H3.60254C3.02793 14.627 2.47664 14.3985 2.07031 13.9922C1.66398 13.5859 1.43555 13.0346 1.43555 12.46V4.45996C1.4356 3.8854 1.66404 3.33401 2.07031 2.92773C2.47662 2.52158 3.02803 2.29395 3.60254 2.29395ZM12.7305 1.52539C13.2396 1.01685 13.8799 1.04844 14.1719 1.34082L14.5742 1.74316C14.8583 2.04039 14.8836 2.67245 14.3809 3.1748V3.17578L6.34766 11.208L3.82324 12.1318H3.82227C3.79676 12.1412 3.77916 12.1422 3.76855 12.1416C3.76741 12.1245 3.7682 12.107 3.77441 12.0908L3.77734 12.085L4.71875 9.53613L12.7305 1.52539Z" stroke="#2563EB" />
                              </svg>

                            </button>
                            <button className="text-[#697077] hover:text-gray-600 transition-colors" onClick={() => navigate(`/kecamatan/pencatatan/pemantauan/detail/lahan`)}>
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
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Filter Bar: Tahun + Dropdown */}


            {/* Tabel Data Produksi Panen */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619]">
                      Tahun
                    </th>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619]">
                      Status
                    </th>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619]">
                      Terakhir Update
                    </th>
                    <th className="py-4 px-6 text-[12px] font-semibold text-[#121619] text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {dataProduksiPanen
                    .filter((row) => row.kecamatan === 'Kencong')
                    .filter((row) => statusFilter === 'Semua Status' || row.statusTerakhir === statusFilter)
                    .map((row, idx) => {
                      const key = `${row.tahun}-${row.kecamatan}-${idx}`;
                      const isExpanded = expandedProduksiKecamatan.includes(key);

                      const monthlyStatuses = getMonthlyStatuses(row);
                      const hasRevisi = monthlyStatuses.includes('Revisi');
                      const hasDitolak = monthlyStatuses.includes('Ditolak');
                      const hasDiajukan = monthlyStatuses.includes('Diajukan');

                      let overallStatus = 'Diterima';
                      if (hasRevisi) overallStatus = 'Revisi';
                      else if (hasDitolak) overallStatus = 'Ditolak';
                      else if (hasDiajukan) overallStatus = 'Diajukan';

                      return (
                        <React.Fragment key={key}>
                          <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                              <button
                                type="button"
                                onClick={() => {
                                  setExpandedProduksiKecamatan((prev) =>
                                    prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
                                  );
                                }}
                                className="flex items-center gap-2 text-left w-full"
                              >
                                <svg
                                  className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-[14px] text-[#121619]">
                                  {row.tahun}
                                </span>
                              </button>
                            </td>
                            <td className="py-4 px-6">
                              {renderStatus(overallStatus, row.tahun)}
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-[14px] text-[#121619]">
                                {row.terakhirUpdate}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-end gap-3">
                                <button className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors" onClick={() => navigate(`/kecamatan/pencatatan/pemantauan/detail/panen`)}>
                                  <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6025 18.2939H18.2686C18.2904 18.2939 18.3128 18.2983 18.333 18.3066C18.3531 18.315 18.3714 18.3274 18.3867 18.3428C18.4021 18.3582 18.4145 18.3764 18.4229 18.3965C18.4312 18.4166 18.4355 18.4382 18.4355 18.46C18.4355 18.4818 18.4312 18.5042 18.4229 18.5244C18.4145 18.5445 18.4021 18.5627 18.3867 18.5781C18.3713 18.5935 18.3531 18.6059 18.333 18.6143C18.3128 18.6226 18.2904 18.627 18.2686 18.627H15.6025C15.1163 18.627 14.6495 18.8202 14.3057 19.1641C13.962 19.5078 13.7686 19.9739 13.7686 20.46V28.46C13.7686 28.9462 13.9618 29.413 14.3057 29.7568C14.6495 30.1006 15.1163 30.2939 15.6025 30.2939H23.6025C24.0885 30.2939 24.5547 30.1004 24.8984 29.7568C25.2423 29.413 25.4355 28.9462 25.4355 28.46V25.7939C25.4355 25.7498 25.4532 25.707 25.4844 25.6758C25.5156 25.6445 25.5583 25.627 25.6025 25.627C25.6466 25.627 25.6886 25.6447 25.7197 25.6758C25.751 25.707 25.7686 25.7497 25.7686 25.7939V28.46C25.7686 29.0345 25.5409 29.5859 25.1348 29.9922C24.7285 30.3984 24.1771 30.6269 23.6025 30.627H15.6025C15.0279 30.627 14.4766 30.3985 14.0703 29.9922C13.664 29.5859 13.4355 29.0346 13.4355 28.46V20.46C13.4356 19.8854 13.664 19.334 14.0703 18.9277C14.4766 18.5216 15.028 18.2939 15.6025 18.2939ZM24.7305 17.5254C25.2396 17.0168 25.8799 17.0484 26.1719 17.3408L26.5742 17.7432C26.8583 18.0404 26.8836 18.6725 26.3809 19.1748V19.1758L18.3477 27.208L15.8232 28.1318H15.8223C15.7968 28.1412 15.7792 28.1422 15.7686 28.1416C15.7674 28.1245 15.7682 28.107 15.7744 28.0908L15.7773 28.085L16.7188 25.5361L24.7305 17.5254Z" stroke="#2563EB" />
                                  </svg>
                                </button>
                                <button className="text-[#697077] hover:text-gray-600 transition-colors" onClick={() => navigate(`/kecamatan/pencatatan/pemantauan/detail/lahan`)}>
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
                                </button>
                              </div>
                            </td>
                          </tr>

                          {isExpanded && (
                            monthlyStatuses.map((status, bulanIdx) => (
                              <tr key={`${key}-bulan-${bulanIdx}`} className="border-b border-gray-50 bg-white">
                                <td className="py-3 px-8">
                                  <span className="text-[14px] text-[#4B5563]">{bulanList[bulanIdx]}</span>
                                </td>
                                <td className="py-3 px-6">
                                  <div className="flex">
                                    {renderStatus(status, row.tahun)}
                                  </div>
                                </td>
                                <td className="py-3 px-6">
                                  <span className="text-[14px] text-[#4B5563]">
                                    {row.terakhirUpdate}
                                  </span>
                                </td>
                                <td className="py-3 px-6 text-right">
                                  <button className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors" onClick={() => navigate(`/kecamatan/pencatatan/pemantauan/detail/panen`)}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                      <path d="M3 8.3335C5 4.00016 11 4.00016 13 8.3335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M7.99984 10.6667C7.26344 10.6667 6.6665 10.0697 6.6665 9.33333C6.6665 8.59693 7.26344 8 7.99984 8C8.73624 8 9.33317 8.59693 9.33317 9.33333C9.33317 10.0697 8.73624 10.6667 7.99984 10.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Modal Catatan Revisi */}
        {isRevisiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] px-10 py-8 relative">
              {/* Tombol Close */}
              <button
                type="button"
                onClick={() => setIsRevisiModalOpen(false)}
                className="absolute top-6 right-6 text-[#6B7280] hover:text-[#111827]"
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

              <div>
                <h2 className="text-[22px] font-bold text-[#181D27] mb-2">
                  Catatan Revisi
                </h2>
                <p className="text-[14px] text-[#535862] mb-6">
                  Pastikan data yang terkutip dicek kembali kesesuaiannya
                </p>

                {/* Tahun & Kecamatan */}
                <div className="grid grid-cols-3 gap-0 mb-6">
                  <div className="border border-gray-200 rounded-l-xl px-4 py-3 bg-[#FFFFFF] text-[14px] text-[#111827]">
                    {revisiYear || '-'}
                  </div>
                  <div className="border border-gray-200 border-l-0  px-4 py-3 bg-[#FFFFFF] text-[14px] text-[#111827]">
                    {revisiKecamatan || '-'}
                  </div>
                  <div className="border border-gray-200 border-l-0 rounded-r-xl px-4 py-3 bg-[#FFFFFF] text-[14px] text-[#111827]">
                    <div className="flex w-fit items-center gap-1.5 bg-[#F2F4F8] text-[#21272A] px-2 rounded-full text-[12px] font-normal">
                      {revisiKomoditas || '-'}
                    </div>
                  </div>
                </div>

                {/* Masukan */}
                <div className="mb-6">
                  <label className="block text-[14px] font-medium text-[#111827] mb-2">
                    Masukan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={revisiNote}
                    readOnly
                    onChange={(e) => setRevisiNote(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-[#111827] resize-none focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRevisiModalOpen(false);
                      if (activeTab === 'Data Lahan Produksi') {
                        navigate('/kecamatan/pencatatan/perbaiki-data-lahan');
                      } else {
                        navigate('/kecamatan/pencatatan/perbaiki-data-panen');
                      }
                    }}
                    className="flex items-center gap-2 text-[14px] text-[#4B5563] hover:text-[#111827] transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-[#4B5563]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Perbaiki</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsRevisiModalOpen(false)}
                      className="px-5 py-2.5  border border-gray-300 bg-white text-[14px] text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRevisiModalOpen(false)}
                      className="px-6 py-2.5  bg-[#16A34A] text-white text-[14px] font-medium hover:bg-[#15803D] transition-colors"
                    >
                      Simpan
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

export default PemantauanPage;
