import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const EditPenggunaPage = () => {
    const navigate = useNavigate();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isConfirmUploadOpen, setIsConfirmUploadOpen] = useState(false);

    const [formData, setFormData] = useState({
        nama: 'Affendi Kos',
        kecamatan: 'Sumbersari',
        email: 'Desa@gmail.com',
        noHp: '085956767897',
        peran: 'Kecamatan Sumbersari',
        password: '12345678'
    });

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] pb-10">
            {/* Header Utama */}
            <div className="bg-[#F8FAFC] px-8 py-10">
                <h1 className="text-[#111827] text-[24px] font-semibold">Edit Pengguna</h1>
            </div>

            {/* Kontainer Form Putih */}
            <div className="bg-white mx-8 border border-[#E2E8F0] rounded-[16px] overflow-hidden shadow-sm">
                <div className="p-10">
                    {/* Header Form */}
                    <div className="mb-8">
                        <h2 className="text-[#111827] text-[16px] font-semibold font-mona-sans">Isi Formulir Data Pengguna </h2>
                        <p className="text-[#64748B] text-[14px] mt-1 font-mona-sans">
                            Pastikan data pengguna sesuai sebelum mengkonfirmasi perubahan data pengguna
                        </p>
                    </div>

                    {/* Grid Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

                        {/* Nama Pengguna */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#64748B] text-[14px] font-medium">Nama Pengguna</label>
                            <input
                                type="text"
                                value={formData.nama}
                                placeholder="Nama Pengguna"
                                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#16A34A] text-[14px]"
                            />
                        </div>

                        {/* Kecamatan */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#64748B] text-[14px] font-medium">Kecamatan</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] appearance-none focus:outline-none bg-white text-[14px] text-[#111827]">
                                    <option>Sumbersari</option>
                                    <option>Kencong</option>
                                    <option>Pusat</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#64748B] text-[14px] font-medium">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#16A34A] text-[14px]"
                                />
                            </div>
                        </div>

                        {/* No Hp Aktif */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#64748B] text-[14px] font-medium">No. Hp Aktif</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="No. Hp Aktif"
                                    value={formData.noHp}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#16A34A] text-[14px]"
                                />
                            </div>
                        </div>

                        {/* Peran (Full Width) */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[#64748B] text-[14px] font-medium">Peran</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] appearance-none focus:outline-none bg-white text-[14px] text-[#111827]">
                                    <option>{formData.peran}</option>
                                    <option>Verifikator DTPHP</option>
                                    <option>Pimpinan</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password (Full Width dengan Ikon Refresh) */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[#64748B] text-[14px] font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#16A34A] text-[14px]"
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-[#16A34A]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 4v6h-6"></path>
                                        <path d="M1 20v-6h6"></path>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-10 flex justify-end gap-4">
                        <button 
                        onClick={() => navigate('/dtphp/pengguna')}
                        className="px-10 py-2.5 border border-[#E2E8F0]  text-[#111827] text-[14px] font-normal hover:bg-gray-50 transition-colors">
                            Batal
                        </button>
                        <button
                            onClick={() => {
                                setIsConfirmUploadOpen(false);
                                setIsSuccessModalOpen(true);
                            }}
                            className="px-8 py-2.5 bg-[#16A34A] text-white text-[14px] font-normal hover:bg-[#15803D] transition-colors flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12.0005L10.2426 16.2431L18.727 7.75781" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Simpan
                        </button>
                    </div>
                    {/* Modal Sukses */}
                    {isSuccessModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[400px] max-h-[280px] px-10 py-8 relative">
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
                                        <h3 className="text-[20px] font-semibold text-[#181D27] mb-2">
                                        Data Berhasil Diperbarui
                                        </h3>
                                        <p className="text-[14px] text-[##1272A] leading-relaxed">
                                        Data pengguna baru telah berhasil disimpan dan dapat diakses.
                                        </p>

                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={() => {
                                                    setIsSuccessModalOpen(false);
                                                    navigate('/dtphp/pengguna');
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
            </div>
        </div>
    );
};

export default EditPenggunaPage;