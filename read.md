src/
├── assets/
│   ├── images/                # Logo, peta (maps.png), icon statis
│   └── styles/                # Global CSS jika diperlukan
├── components/
│   ├── common/                # UI Dasar (Button, Input, Modal, Badge)
│   ├── dashboard/             # Widget grafik, kartu statistik
│   ├── forms/                 # Komponen input khusus pencatatan
│   ├── layout/                # AppLayout, Sidebar, Navbar
│   └── tables/                # Komponen tabel data produksi/lahan
├── layouts/
│   ├── MainLayout.jsx         # Layout utama dengan Sidebar & Navbar
│   └── AuthLayout.jsx         # Layout khusus halaman Login
├── pages/
│   ├── auth/                  # Login, Lupa Password
│   ├── umum/                  # Landing page, Dashboard Publik (Landing Page)
│   ├── kecamatan/
│   │   ├── Dashboard.jsx      # Dashboard khusus staff kecamatan
│   │   ├── pencatatan/        # Halaman Buat Data Baru, Input Lahan, Input Produksi
│   │   └── riwayat/           # Status pengiriman laporan kecamatan
│   ├── dtphp/
│   │   ├── Dashboard.jsx      # Dashboard utama DTPHP
│   │   ├── pemantauan/        # Tabel status laporan semua kecamatan
│   │   ├── database/          # Kelola format pencatatan (Database Page)
│   │   ├── verifikasi/        # Halaman Verifikasi Laporan & VerifikasiModal
│   │   └── pengguna/          # Kelola user/akun
│   └── error/                 # 404 Not Found, 403 Forbidden
├── routes/
│   ├── AppRoutes.jsx          # Konfigurasi rute (React Router)
│   └── ProtectedRoute.jsx     # Logic pengecekan role (Kecamatan/DTPHP)
├── utils/
│   ├── chartConfigs.js        # Konfigurasi Highcharts (getOptions...)
│   └── helpers.js             # Fungsi format angka (Rp, Ton, Ha)
├── App.jsx
└── main.jsx