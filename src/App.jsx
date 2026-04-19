import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';

// Kecamatan
import DashboardKecamatanPage from './pages/kecamatan/Dashboard';
import KecamatanModalDataPanenPage from './pages/kecamatan/modal/ModalDataPanenPage';
import KecamatanModalDataLahanPage from './pages/kecamatan/modal/ModalDataLahanPage';
import KecamatanBuatDataBaruPage from './pages/kecamatan/pencatatan/BuatDataBaruPage';
import KecamatanBuatDataBaruLahanPage from './pages/kecamatan/pencatatan/BuatDataBaruLahanPage';
import KecamatanBuatDataBaruPanenPage from './pages/kecamatan/pencatatan/BuatDataBaruPanenPage';
import KecamatanDatabasePage from './pages/kecamatan/database/DatabasePage';
import KecamatanPemantauanPage from './pages/kecamatan/pencatatan/PemantauanPage';
import KecamatanPerbaikiDataLahanPage from './pages/kecamatan/pencatatan/PerbaikiDataLahanPage';
import KecamatanPerbaikiDataPanenPage from './pages/kecamatan/pencatatan/PerbaikiDataPanenPage';
import KecamatanPenggunaPage from './pages/kecamatan/pengguna/PenggunaPage';
import KecamatanTambahPenggunaPage from './pages/kecamatan/pengguna/TambahPenggunaPage';
import KecamatanEditPenggunaPage from './pages/kecamatan/pengguna/EditPenggunaPage';
import KecamatanDetailDataLahanPage from './pages/kecamatan/pencatatan/DetailDataLahanPage';
import KecamatanDetailDataPanenPage from './pages/kecamatan/pencatatan/DetailDataPanenPage';

// DTPHP
import DashboardDtphpPage from './pages/dtphp/Dashboard';
import DtphpModalDataPanenPage from './pages/dtphp/modal/ModalDataPanenPage';
import DtphpModalDataLahanPage from './pages/dtphp/modal/ModalDataLahanPage';
import DtphpBuatDataBaruPage from './pages/dtphp/pencatatan/BuatDataBaruPage';
import DtphpBuatDataBaruLahanPage from './pages/dtphp/pencatatan/BuatDataBaruLahanPage';
import DtphpBuatDataBaruPanenPage from './pages/dtphp/pencatatan/BuatDataBaruPanenPage';
import DtphpDatabasePage from './pages/dtphp/database/DatabasePage';
import DtphpPemantauanPage from './pages/dtphp/pencatatan/PemantauanPage';
import DtphpPerbaikiDataLahanPage from './pages/dtphp/pencatatan/PerbaikiDataLahanPage';
import DtphpPerbaikiDataPanenPage from './pages/dtphp/pencatatan/PerbaikiDataPanenPage';
import DtphpPenggunaPage from './pages/dtphp/pengguna/PenggunaPage';
import DtphpTambahPenggunaPage from './pages/dtphp/pengguna/TambahPenggunaPage';
import DtphpEditPenggunaPage from './pages/dtphp/pengguna/EditPenggunaPage';
import DtphpDetailDataLahanPage from './pages/dtphp/pencatatan/DetailDataLahanPage';
import DtphpDetailDataPanenPage from './pages/dtphp/pencatatan/DetailDataPanenPage';


//Pimpinan
import DashboardPimpinanPage from './pages/pimpinan/Dashboard';
import PimpinanModalDataPanenPage from './pages/pimpinan/modal/ModalDataPanenPage';
import PimpinanModalDataLahanPage from './pages/pimpinan/modal/ModalDataLahanPage';
import PimpinanBuatDataBaruPage from './pages/pimpinan/pencatatan/BuatDataBaruPage';
import PimpinanBuatDataBaruLahanPage from './pages/pimpinan/pencatatan/BuatDataBaruLahanPage';
import PimpinanBuatDataBaruPanenPage from './pages/pimpinan/pencatatan/BuatDataBaruPanenPage';
import PimpinanDatabasePage from './pages/pimpinan/database/DatabasePage';
import PimpinanPemantauanPage from './pages/pimpinan/pencatatan/PemantauanPage';
import PimpinanProgressPage from './pages/pimpinan/pencatatan/ProgressPage';
import PimpinanPerbaikiDataLahanPage from './pages/pimpinan/pencatatan/PerbaikiDataLahanPage';
import PimpinanPerbaikiDataPanenPage from './pages/pimpinan/pencatatan/PerbaikiDataPanenPage';
import PimpinanPenggunaPage from './pages/pimpinan/pengguna/PenggunaPage';
import PimpinanTambahPenggunaPage from './pages/pimpinan/pengguna/TambahPenggunaPage';
import PimpinanEditPenggunaPage from './pages/pimpinan/pengguna/EditPenggunaPage';
import PimpinanDetailDataLahanPage from './pages/pimpinan/pencatatan/DetailDataLahanPage';
import PimpinanDetailDataPanenPage from './pages/pimpinan/pencatatan/DetailDataPanenPage';




import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with AuthLayout */}
        <Route path="/" element={<AuthLayout><HomePage /></AuthLayout>} />

        {/* Auth Routes without layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect helpers */}
        <Route path="/kecamatan" element={<Navigate to="/kecamatan/dashboard" replace />} />
        <Route path="/dtphp" element={<Navigate to="/dtphp/dashboard" replace />} />
        <Route path="/pimpinan" element={<Navigate to="/pimpinan/dashboard" replace />} />

        {/* Routes Kecamatan */}
        <Route path="/kecamatan/dashboard" element={<MainLayout><DashboardKecamatanPage /></MainLayout>} />
        <Route path="/kecamatan/dashboard/datapanen" element={<MainLayout><KecamatanModalDataPanenPage /></MainLayout>} />
        <Route path="/kecamatan/dashboard/datalahan" element={<MainLayout><KecamatanModalDataLahanPage /></MainLayout>} />

        <Route path="/kecamatan/pencatatan/buat-data-baru" element={<MainLayout><KecamatanBuatDataBaruPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/buat-data-baru-lahan" element={<MainLayout><KecamatanBuatDataBaruLahanPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/buat-data-baru-panen" element={<MainLayout><KecamatanBuatDataBaruPanenPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/pemantauan" element={<MainLayout><KecamatanPemantauanPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/pemantauan/detail/lahan" element={<MainLayout><KecamatanDetailDataLahanPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/pemantauan/detail/panen" element={<MainLayout><KecamatanDetailDataPanenPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/perbaiki-data-lahan" element={<MainLayout><KecamatanPerbaikiDataLahanPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/perbaiki-data-panen" element={<MainLayout><KecamatanPerbaikiDataPanenPage /></MainLayout>} />
        <Route path="/kecamatan/pencatatan/kelola-format" element={<MainLayout><KecamatanDatabasePage /></MainLayout>} />

        <Route path="/kecamatan/pengguna" element={<MainLayout><KecamatanPenggunaPage /></MainLayout>} />
        <Route path="/kecamatan/pengguna/tambah" element={<MainLayout><KecamatanTambahPenggunaPage /></MainLayout>} />
        <Route path="/kecamatan/pengguna/edit" element={<MainLayout><KecamatanEditPenggunaPage /></MainLayout>} />
        <Route path="/kecamatan/database" element={<MainLayout><KecamatanDatabasePage /></MainLayout>} />


        {/* Routes DTPHP */}
        <Route path="/dtphp/dashboard" element={<MainLayout><DashboardDtphpPage /></MainLayout>} />
        <Route path="/dtphp/dashboard/datapanen" element={<MainLayout><DtphpModalDataPanenPage /></MainLayout>} />
        <Route path="/dtphp/dashboard/datalahan" element={<MainLayout><DtphpModalDataLahanPage /></MainLayout>} />

        <Route path="/dtphp/pencatatan/buat-data-baru" element={<MainLayout><DtphpBuatDataBaruPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/buat-data-baru-lahan" element={<MainLayout><DtphpBuatDataBaruLahanPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/buat-data-baru-panen" element={<MainLayout><DtphpBuatDataBaruPanenPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/pemantauan" element={<MainLayout><DtphpPemantauanPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/pemantauan/detail/lahan" element={<MainLayout><DtphpDetailDataLahanPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/pemantauan/detail/panen" element={<MainLayout><DtphpDetailDataPanenPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/perbaiki-data-lahan" element={<MainLayout><DtphpPerbaikiDataLahanPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/perbaiki-data-panen" element={<MainLayout><DtphpPerbaikiDataPanenPage /></MainLayout>} />
        <Route path="/dtphp/pencatatan/kelola-format" element={<MainLayout><DtphpDatabasePage /></MainLayout>} />

        <Route path="/dtphp/pengguna" element={<MainLayout><DtphpPenggunaPage /></MainLayout>} />
        <Route path="/dtphp/pengguna/tambah" element={<MainLayout><DtphpTambahPenggunaPage /></MainLayout>} />
        <Route path="/dtphp/pengguna/edit" element={<MainLayout><DtphpEditPenggunaPage /></MainLayout>} />
        <Route path="/dtphp/database" element={<MainLayout><DtphpDatabasePage /></MainLayout>} />
        {/* <Route path="/dtphp/verifikasi-laporan" element={<MainLayout><VerifikasiLaporanPage /></MainLayout>} /> */}



        {/* Routes Pimpinan */}
        <Route path="/pimpinan/dashboard" element={<MainLayout><DashboardPimpinanPage /></MainLayout>} />
        <Route path="/pimpinan/dashboard/datapanen" element={<MainLayout><PimpinanModalDataPanenPage /></MainLayout>} />
        <Route path="/pimpinan/dashboard/datalahan" element={<MainLayout><PimpinanModalDataLahanPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/progress" element={<MainLayout><PimpinanProgressPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/buat-data-baru" element={<MainLayout><PimpinanBuatDataBaruPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/buat-data-baru-lahan" element={<MainLayout><PimpinanBuatDataBaruLahanPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/buat-data-baru-panen" element={<MainLayout><PimpinanBuatDataBaruPanenPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/pemantauan" element={<MainLayout><PimpinanPemantauanPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/pemantauan/detail/lahan" element={<MainLayout><PimpinanDetailDataLahanPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/pemantauan/detail/panen" element={<MainLayout><PimpinanDetailDataPanenPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/perbaiki-data-lahan" element={<MainLayout><PimpinanPerbaikiDataLahanPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/perbaiki-data-panen" element={<MainLayout><PimpinanPerbaikiDataPanenPage /></MainLayout>} />
        <Route path="/pimpinan/pencatatan/kelola-format" element={<MainLayout><PimpinanDatabasePage /></MainLayout>} />

        <Route path="/pimpinan/pengguna" element={<MainLayout><PimpinanPenggunaPage /></MainLayout>} />
        <Route path="/pimpinan/pengguna/tambah" element={<MainLayout><PimpinanTambahPenggunaPage /></MainLayout>} />
        <Route path="/pimpinan/pengguna/edit" element={<MainLayout><PimpinanEditPenggunaPage /></MainLayout>} />
        <Route path="/pimpinan/database" element={<MainLayout><PimpinanDatabasePage /></MainLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
