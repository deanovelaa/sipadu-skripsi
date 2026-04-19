import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const defaultProgress = [
    { id: 1, namaFormatPencatatan: 'Data Produksi Panen', totalLaporanTerverifikasi: 10, totalLaporanBelumTerverifikasi: 5, kontribusiKecamatan: '100%', tren: '+10' },
    { id: 2, namaFormatPencatatan: 'Data Lahan Produksi', totalLaporanTerverifikasi: 10, totalLaporanBelumTerverifikasi: 5, kontribusiKecamatan: '100%', tren: '+10' },

];

const loadProgress = () => {
    try {
        const s = localStorage.getItem(defaultProgress);
        return s ? JSON.parse(s) : defaultProgress;
    } catch {
        return defaultProgress;
    }
};

const ProgressPage = () => {
    const [progress, setProgress] = useState(loadProgress);
    const navigate = useNavigate();


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



    return (
        <div className="w-full min-h-screen bg-[#F8FAFC]">
            {/* Header Section */}
            <div className="bg-[#F8FAFC] px-8 py-6 flex items-center justify-between">
                <h1 className="text-black text-[24px] font-semibold">Progress</h1>

            </div>

            {/* Main Content Card */}
            <div className="bg-white p-8 border border-[#E2E8F0] m-[40px] rounded-[16px]">

                {/* Table Section */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F8FAFC] border-b border-gray-200">
                            <tr>
                                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                                    Nama Format Pencatatan
                                </th>
                                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                                    <div className="flex items-center justify-between gap-1">
                                        Total Laporan Terverifikasi
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.16699 11.9998L12.167 7.99984M8.16699 3.6665V11.9998V3.6665ZM8.16699 11.9998L4.16699 7.99984L8.16699 11.9998Z" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                                    <div className="flex items-center justify-between gap-1">
                                        Total Laporan Belum Terverifikasi
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.16699 11.9998L12.167 7.99984M8.16699 3.6665V11.9998V3.6665ZM8.16699 11.9998L4.16699 7.99984L8.16699 11.9998Z" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                                    <div className="flex items-center justify-between gap-1">
                                        Kontribusi Kecamatan
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.16699 11.9998L12.167 7.99984M8.16699 3.6665V11.9998V3.6665ZM8.16699 11.9998L4.16699 7.99984L8.16699 11.9998Z" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[12px] font-semibold text-[#111827] text-left">
                                </th>
                                <th className="py-4 px-6 w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {progress.map((progress, idx) => (
                                <tr
                                    key={progress.id}
                                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/30' : ''
                                        }`}
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="w-fit flex items-center justify-center rounded-full px-1 border border-gray-200  bg-[#F2F4F8] text-[#121619] hover:bg-gray-200 transition-colors text-[12px] font-normal">
                                                {progress.namaFormatPencatatan}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-[14px] text-[#121619]">
                                            {progress.totalLaporanTerverifikasi}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[14px] text-[#121619]">
                                                {progress.totalLaporanBelumTerverifikasi}
                                            </span>
                                            <div className="flex items-center justify-center opacity-100 border bg-[#05C168]/20 text-green-600 border-[#05C168]/20 text-[10px] px-[2px] ">
                                                <div className="flex items-center gap-[2px]">
                                                    {progress.tren} <span className="text-[10px] mr-1 font-medium leading-none whitespace-nowrap">New</span> </div>
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-3 py-1 text-[12px] text-[#121619]">
                                            {progress.kontribusiKecamatan}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => navigate(`/pimpinan/pencatatan/pemantauan`)} className="text-[#0F62FE] hover:text-[#0F62FE]/80 font-medium px-2 text-[12px] underline">Detail</button>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="text-[#697077] hover:text-gray-600 transition-colors"><svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
                                    </td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProgressPage;
