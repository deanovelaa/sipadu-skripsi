import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Map from "../../assets/images/maps.png";
import ModalDataPanen from "./modal/ModalDataPanenPage";
import ModalDataLahan from "./modal/ModalDataLahanPage";

const DashboardDtphpPage = () => {

  const navigate = useNavigate();


  const getDonutOptions = (data, colors) => ({
    chart: {
      type: 'pie',
      height: 140,
      backgroundColor: 'transparent',
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
    },
    title: { text: '' },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    accessibility: { enabled: false },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '60%',
        size: '100%',
        borderWidth: 0,
        borderRadius: 0,
        dataLabels: {
          enabled: true,

          distance: -12,
          format: '{point.percentage:.0f}%',
          style: {
            color: 'white',
            textOutline: 'none',
            fontSize: '8px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
          },
          connectorWidth: 0,
          // Pastikan teks tidak tumpang tindih
          padding: 0,
          overflow: 'none',
          crop: false
        },
        showInLegend: false,
      },
    },
    colors: colors,
    series: [{
      name: 'Persentase',
      data: data,
    }],
  });

  // Data untuk Card 1
  const lahanData = [
    { name: 'Kebun', y: 35 },
    { name: 'Tegalan', y: 25 },
    { name: 'Sawah Tadah Hujan', y: 15 },
    { name: 'Sawah Irigasi', y: 25 },
  ];
  const lahanColors = ['#15803D', '#22C55E', '#2563EB', '#60A5FA'];

  // Data untuk Card 2
  const pemanfaatanData = [
    { name: 'Rencana Pengembangan', y: 35 },
    { name: 'Alih Fungsi', y: 25 },
    { name: 'Tidak Aktif', y: 15 },
    { name: 'Aktif Ditanami', y: 25 },
  ];
  const pemanfaatanColors = ['#15803D', '#22C55E', '#2563EB', '#60A5FA'];

  // State untuk dropdown komoditas
  const [isKomoditasOpen, setIsKomoditasOpen] = useState(false);
  const [selectedKomoditas, setSelectedKomoditas] = useState("Pilih Komoditas");
  const [komoditasSearch, setKomoditasSearch] = useState("");
  const komoditasDropdownRef = useRef(null);
  const komoditasSearchRef = useRef(null);

  // State untuk dropdown lainnya
  const [isMusimanOpen, setIsMusimanOpen] = useState(false);
  const [selectedMusiman, setSelectedMusiman] = useState("2026");
  const musimanDropdownRef = useRef(null);
  const [tahun, setTahun] = useState("2025");

  const [isPadiOpen, setIsPadiOpen] = useState(false);
  const [selectedPadi, setSelectedPadi] = useState("Padi");
  const padiDropdownRef = useRef(null);

  const [isPadiTableOpen, setIsPadiTableOpen] = useState(false);
  const [tahunTableOpen, setTahunTableOpen] = useState(false);
  const [selectedPadiTable, setSelectedPadiTable] = useState("Padi");
  const padiTableDropdownRef = useRef(null);

  // State untuk dropdown bulan di header "Grafik Komoditas"
  const [isBulanOpen, setIsBulanOpen] = useState(false);
  const [selectedBulan, setSelectedBulan] = useState("Januari");
  const bulanDropdownRef = useRef(null);

  // State dropdown tahun kecil (filter di kartu kiri bawah peta)
  const [isTahunFilterOpen, setIsTahunFilterOpen] = useState(false);
  const tahunFilterDropdownRef = useRef(null);

  // State untuk modal data lengkap
  const [isModalDataPanenOpen, setIsModalDataPanenOpen] = useState(false);
  const [isModalDataLahanOpen, setIsModalDataLahanOpen] = useState(false);


  // Data komoditas
  const komoditasOptions = [
    "Padi",
    "Jagung",
    "Kedelai",
    "Cabe Rawit",
    "Cabe Besar",
    "Tomat",
    "Bawang Merah",
    "Kopi Robusta",
  ];

  // Filter komoditas berdasarkan search
  const filteredKomoditas = komoditasOptions.filter((option) =>
    option.toLowerCase().includes(komoditasSearch.toLowerCase())
  );

  const musimanOptions = ["2026", "2025", "2024", "2023", "2022", "2021"];

  const padiOptions = ["Padi", "Jagung", "Kedelai"];

  const tahunOptions = ["2025", "2024", "2023", "2022", "2021"];

  // Opsi bulan untuk dropdown bulan di header "Grafik Komoditas"
  const bulanOptions = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Focus search input ketika dropdown dibuka
  useEffect(() => {
    if (isKomoditasOpen && komoditasSearchRef.current) {
      komoditasSearchRef.current.focus();
    }
  }, [isKomoditasOpen]);

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        komoditasDropdownRef.current &&
        !komoditasDropdownRef.current.contains(event.target)
      ) {
        setIsKomoditasOpen(false);
        // Reset search jika sudah ada pilihan
        if (selectedKomoditas !== "Pilih Komoditas") {
          setKomoditasSearch("");
        }
      }
      if (
        musimanDropdownRef.current &&
        !musimanDropdownRef.current.contains(event.target)
      ) {
        setIsMusimanOpen(false);
      }
      if (
        padiDropdownRef.current &&
        !padiDropdownRef.current.contains(event.target)
      ) {
        setIsPadiOpen(false);
      }
      if (
        padiTableDropdownRef.current &&
        !padiTableDropdownRef.current.contains(event.target)
      ) {
        setIsPadiTableOpen(false);
      }
      if (
        tahunFilterDropdownRef.current &&
        !tahunFilterDropdownRef.current.contains(event.target)
      ) {
        setIsTahunFilterOpen(false);
      }
      if (bulanDropdownRef.current && !bulanDropdownRef.current.contains(event.target)) {
        setIsBulanOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedKomoditas]);

  // Data Statistik Cards
  const statCards = [
    {
      title: "Total Hasil",
      value: "3,207,560",
      change: "+28.4%",
      changeType: "positive",
      icon: (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 6.99998V9.91665C10.5 10.8831 8.933 11.6666 7 11.6666C5.067 11.6666 3.5 10.8831 3.5 9.91665V6.99998M10.5 6.99998V4.08331M10.5 6.99998C10.5 7.96648 8.933 8.74998 7 8.74998C5.067 8.74998 3.5 7.96648 3.5 6.99998M10.5 4.08331C10.5 3.11681 8.933 2.33331 7 2.33331C5.067 2.33331 3.5 3.11681 3.5 4.08331M10.5 4.08331C10.5 5.04981 8.933 5.83331 7 5.83331C5.067 5.83331 3.5 5.04981 3.5 4.08331M3.5 6.99998V4.08331"
              stroke="#64748B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      ),
    },
    {
      title: "Pangan",
      value: "2,962,853",
      change: "-12.6%",
      changeType: "negative",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.98363 9.9637C8.10842 12.4386 11.4082 9.13871 10.9958 2.95157C4.80871 2.53909 1.50902 5.83902 3.98363 9.9637ZM3.98363 9.9637C3.98358 9.96362 3.98368 9.96378 3.98363 9.9637ZM3.98363 9.9637L2.91666 11.0303M3.98363 9.9637L6.21649 7.73046"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Hortikultura",
      value: "174,397",
      change: "+28.4%",
      changeType: "positive",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.33344 7.8078C9.33344 8.52185 9.05688 9.20664 8.5646 9.71155C8.28512 9.99819 7.94902 10.2136 7.58335 10.3463M11.0834 7.9872C11.0834 4.15066 7.00002 1.16669 7.00002 1.16669C7.00002 1.16669 2.91669 4.15066 2.91669 7.9872C2.91669 9.11777 3.34689 10.2021 4.11267 11.0016C4.87844 11.801 5.9171 12.2497 7.00007 12.2497C8.08304 12.2497 9.12158 11.8008 9.88735 11.0013C10.6531 10.2019 11.0834 9.11777 11.0834 7.9872Z"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Perkebunan",
      value: "70,310",
      change: null,
      changeType: null,
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_135_28697)">
            <path
              d="M2.33337 11.6667H6.38362M6.38362 11.6667H6.4498M6.38362 11.6667C6.39464 11.6668 6.40567 11.6668 6.41671 11.6668C6.42775 11.6668 6.43878 11.6668 6.4498 11.6667M6.38362 11.6667C4.14369 11.6489 2.33337 9.82732 2.33337 7.5832V5.205C2.33337 4.90761 2.57432 4.66667 2.8717 4.66667H9.96145C10.2588 4.66667 10.5 4.90761 10.5 5.205V5.25M6.4498 11.6667H10.5M6.4498 11.6667C8.68973 11.6489 10.5 9.82732 10.5 7.5832M10.5 5.25H11.375C12.1805 5.25 12.8334 5.90292 12.8334 6.70833C12.8334 7.51375 12.1805 8.16667 11.375 8.16667H10.5V7.5832M10.5 5.25V7.5832M8.75004 1.75L8.16671 2.91667M7.00004 1.75L6.41671 2.91667M5.25004 1.75L4.66671 2.91667"
              stroke="#64748B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_135_28697">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];



  const kecamatanChartOptions = {
    chart: {
      type: "bar",
      height: 380, // Sesuaikan agar pas dengan container kiri
      backgroundColor: "transparent",
      marginRight: 50, // Memberi ruang untuk label angka di kanan
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: [
        "Sumbersari",
        "Patrang",
        "Kaliwates",
        "Rambipuji",
        "Ambulu",
        "Arjasa",
        "Tempurejo",
        "Tanggul",
      ],
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        align: "left",
        x: 0,
        y: -15, // Posisi teks di atas bar
        style: {
          fontSize: "12px",
          fontWeight: "500",
          color: "#4B5563", // gray-600
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    yAxis: {
      visible: false,
      min: 0,
      max: 100,
    },
    plotOptions: {
      series: {
        borderRadius: 4,
        pointWidth: 4, // Membuat bar menjadi garis tipis
        groupPadding: 0.5,
        dataLabels: {
          enabled: true,
          align: "right",
          inside: false,
          x: 45, // Menjorok ke kanan luar bar
          format: "{point.label}", // Menggunakan field custom 'label' (misal: 12K atau 20%)
          style: {
            fontSize: "11px",
            color: "#9CA3AF", // gray-400
            fontWeight: "normal",
            textOutline: "none",
          },
        },
      },
    },
    series: [
      {
        // Gunakan data sesuai dengan panjang bar di gambar
        data: [
          { y: 95, color: "#064E3B", label: "12K" }, // Sumbersari (Hijau Sangat Tua)
          { y: 85, color: "#064E3B", label: "10K" }, // Patrang
          { y: 70, color: "#14532D", label: "20%" }, // Kaliwates
          { y: 65, color: "#15803D", label: "20%" }, // Rambipuji
          { y: 45, color: "#22C55E", label: "15%" }, // Ambulu
          { y: 35, color: "#22C55E", label: "15%" }, // Arjasa
          { y: 25, color: "#4ADE80", label: "15%" }, // Tempurejo
          { y: 25, color: "#4ADE80", label: "15%" }, // Tanggul
        ],
      },
    ],
  };


  const getGrafikKomoditasOptions = (
    categories,
    dataMusimLalu,
    dataMusimIni
  ) => ({
    chart: {
      type: "column",
      height: 250,
      backgroundColor: "transparent",
      spacingTop: 20,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: categories,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: { color: "#9CA3AF", fontSize: "10px", fontFamily: "sans-serif" },
      },
    },
    yAxis: {
      title: { text: null },
      gridLineColor: "#F3F4F6",
      labels: {
        style: { color: "#9CA3AF", fontSize: "11px" },
        formatter: function () {
          return this.value >= 1000 ? this.value / 1000 + "k" : this.value;
        },
      },
      tickInterval: 20000,
      min: 0,
      max: 120000,
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        borderWidth: 0,
        groupPadding: 0.15,
        pointPadding: 0.05,
        states: { hover: { enabled: false } },
      },
    },
    series: [
      {
        name: "2024",
        data: dataMusimLalu,
        color: "#E5E7EB", // Warna abu-abu Musim Lalu
      },
      {
        name: "2025",
        data: dataMusimIni,
        color: "#16A34A", // Warna hijau Musim Ini
      },
    ],
    tooltip: {
      shared: true,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E5E7EB",
      shadow: false,
      borderRadius: 8,
    },
  });

  const petaPersebaranData = [
    {
      value: "12,120,000",
      change: "+28.5%",
      changeType: "positive",
    },
  ];

  const tableData = [
    {
      kecamatan: "Kencong",
      luasTanam: "1,041",
      panenKotor: "1,041",
      panenBersih: "1,011",
      produktivitas: "21.74",
      produksi: "24,133",
    },
    {
      kecamatan: "Gumukmas",
      luasTanam: "1,041",
      panenKotor: "1,041",
      panenBersih: "1,011",
      produktivitas: "21.74",
      produksi: "24,133",
    },
    {
      kecamatan: "Puger",
      luasTanam: "1,041",
      panenKotor: "1,041",
      panenBersih: "1,011",
      produktivitas: "21.74",
      produksi: "24,133",
    },
    {
      kecamatan: "Wuluhan",
      luasTanam: "1,041",
      panenKotor: "1,041",
      panenBersih: "1,011",
      produktivitas: "21.74",
      produksi: "24,133",
    },
    {
      kecamatan: "Ambulu",
      luasTanam: "1,041",
      panenKotor: "1,041",
      panenBersih: "1,011",
      produktivitas: "21.74",
      produksi: "24,133",
    },
  ];

  // Konfigurasi Highcharts untuk Grafik Komoditas
  const getGrafikKomoditasOptions2 = (grafik) => {
    const categories = grafik.items.map((item) => item.name);
    const musimLaluData = grafik.items.map((item) => item.musimLalu);
    const musimIniData = grafik.items.map((item) => item.musimIni);

    return {
      chart: {
        type: "column",
        height: 250,
        backgroundColor: "transparent",
        spacing: [10, 10, 10, 10],
      },
      title: {
        text: null,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: "12px",
            color: "#6B7280",
            fontFamily: "Mona Sans, Roboto, sans-serif",
          },
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      yAxis: {
        title: {
          text: null,
        },
        min: 0,
        max: 120,
        tickInterval: 40,
        labels: {
          enabled: false,
        },
        gridLineWidth: 0,
      },
      plotOptions: {
        column: {
          grouping: false,
          pointPadding: 0.2,
          groupPadding: 0.3,
          borderRadius: 4,
          borderWidth: 0,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      series: [
        {
          name: "2024",
          data: musimLaluData,
          color: "#E5E7EB",
        },
        {
          name: "2025",
          data: musimIniData,
          color: "#16A34A",
        },
      ],
      tooltip: {
        enabled: false,
      },
    };
  };

  // Konfigurasi Chart Utama (Harga Komoditas)
  const hargaKomoditasChartOptions = {
    chart: {
      type: "areaspline",
      height: 450,
      // width: 950, 
      backgroundColor: "transparent",
      // Memberi sedikit margin agar bulatan marker tidak terpotong di tepi
      // marginRight: 10,
      spacingRight: 0
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: [
        "2015", "2016", "2017", "2018", "2019", "2020",
        "2021", "2022", "2023", "2024", "2025", "2026",
      ],
      minPadding: 0,
      maxPadding: 0,
      endOnTick: false,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: { color: "#9CA3AF", fontSize: "12px" },
        overflow: 'justify'
      },
    },
    yAxis: {
      title: { text: null },
      gridLineColor: "#F3F4F6",
      max: 30000,
      tickInterval: 5000,
      labels: {
        formatter: function () {
          return this.value === 0 ? "0" : this.value / 1000 + "K";
        },
        style: { color: "#9CA3AF", fontSize: "12px" },
      },
    },
    tooltip: {
      useHTML: true, // Mengizinkan penggunaan HTML & Tailwind
      backgroundColor: 'transparent', // Hilangkan background bawaan
      borderWidth: 0, // Hilangkan border bawaan
      shadow: false, // Hilangkan shadow bawaan
      padding: 0,
      formatter: function () {
        // Format angka (misal: 10000 menjadi 10.000)
        const valueFormatted = Highcharts.numberFormat(this.y, 0, ',', '.');
        const tahun = this.series.chart.xAxis[0].categories[this.x];

        // Return desain HTML sesuai gambar
        return `
          <div class="px-4 py-3 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-gray-100 font-sans min-w-[140px]">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-[16px] font-bold text-[#334155] leading-none">${valueFormatted} Ha</span>
              
              <div class="flex items-center justify-center bg-[#05C168]/20 text-green-600 border border-[#05C168]/20 px-1 py-0.5 rounded gap-1">
                <span class="text-[10px] font-semibold">+10,5%</span>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33317 6.66675L6.6665 1.33341" stroke="#22C55E" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.6665 6.36182V1.33353H1.63822" stroke="#22C55E" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>

            </div>
            <div class="text-[12px] text-[#64748B] font-medium leading-none mt-2">
              ${tahun}
            </div>
          </div>
        `;
      }
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.1,
        lineWidth: 2,
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidthPlus: 0

          }
        }
      },
    },
    series: [
      {
        name: "2025",
        data: [
          1000, 2500, 7000, 12000, 14000, 14500, 15000, 18000, 23000, 26000, 27000, 27500,
        ],
        color: "#22C55E",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(34, 197, 94, 0.2)"],
            [1, "rgba(34, 197, 94, 0)"],
          ],
        },
        zoneAxis: "x",
        zones: [
          {
            // Nilai value disesuaikan agar marker hanya aktif di index terakhir (2026)
            value: 10.5,
            marker: {
              enabled: false,
            },
          },
          {
            marker: {
              enabled: true,
              radius: 6,
              fillColor: "#16A34A",
              lineWidth: 3,
              lineColor: "#FFFFFF",
              symbol: "circle",
            },
          },
        ],
      },
    ],
  };

  // Konfigurasi Volume Penjualan (Bar Chart)
  const volumePenjualanChartOptions = {
    chart: {
      type: "column",
      height: 120,
      backgroundColor: "transparent",
      margin: [10, 0, 25, 0],
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: [
        "12 AM",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "8 AM",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "4 PM",
        "",
        "",
        "",
        "",
        "",
        "",
        "11 PM",
      ],
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: { color: "#9CA3AF", fontSize: "10px", fontWeight: "500" },
      },
    },
    yAxis: {
      visible: false, // Sesuai gambar, yAxis tidak ditampilkan
      gridLineWidth: 0,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        borderRadius: 1, // Batang sedikit melengkung di ujung
        pointPadding: 0.1,
        groupPadding: 0.2,
      },
    },
    series: [
      {
        name: "Hari Ini",
        color: "#16A34A",
        data: [
          60, 50, 60, 45, 55, 40, 58, 62, 75, 55, 78, 48, 52, 65, 42, 68, 58,
          45, 55, 38, 62, 55, 48, 52,
        ],
      },
      {
        name: "Kemarin",
        color: "#3B82F6",
        data: [
          55, 45, 38, 40, 32, 25, 50, 68, 60, 52, 58, 45, 35, 48, 55, 62, 50,
          65, 52, 58, 60, 55, 52, 60,
        ],
      },
    ],
    tooltip: { enabled: false }, // Tooltip biasanya tidak terlihat di dashboard overview statis
  };

  // Konfigurasi Pola Permintaan (Line Chart Hijau)
  const polaPermintaanChartOptions = {
    chart: {
      type: 'line',
      height: 160,
      backgroundColor: 'transparent',
      margin: [10, 10, 30, 10], // Atur margin agar label jam tidak terpotong
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: ['12 AM', '', '', '', '', '', '', '', '8 AM', '', '', '', '', '', '', '', '4 PM', '', '', '', '', '', '', '11 PM'],
      lineWidth: 0.5,
      lineColor: '#e2e8f0',
      tickWidth: 0,
      labels: {
        style: { color: '#64748b', fontSize: '10px', fontWeight: '600' },
      },
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      gridLineColor: '#f1f5f9',
    },
    yAxis: {
      title: { text: null },
      min: 0,
      max: 500,
      tickInterval: 250,
      gridLineColor: '#f1f5f9',
      labels: {
        style: { color: '#64748b', fontSize: '10px', fontWeight: '500' },
      }
    },
    plotOptions: {
      line: {
        color: '#22c55e', // Warna hijau garis tajam
        lineWidth: 1.5,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    series: [
      {
        name: 'Permintaan',
        data: [20, 40, 80, 150, 100, 40, 80, 180, 120, 80, 50, 100, 200, 380, 250, 150, 40, 40, 40, 80, 150, 80, 40, 10],
      }
    ],
    tooltip: { enabled: false }
  };



  return (
    <div className="w-full px-[44px] py-10 space-y-10 bg-[#F9FAFB] min-h-screen">
      {/* Header dengan Statistik Data Jenis Komoditas */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start  mb-8">
          <h2 className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900">
            Selamat Datang, Juan
          </h2>
          <p className="text-gray-400 text-[12px]">
            Catat dan pantau perkembangan komoditi pangan Jember
          </p>
        </div>
        <div className="flex">
          <div className="flex items-center w-full">
            <button className="mr-4 px-4 py-2.5 bg-black text-white text-[14px] font-bold  hover:bg-gray-800 transition-colors">
              Export
            </button>
            <button
              onClick={() => navigate('/dtphp/pencatatan/buat-data-baru')}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-[14px] font-bold hover:bg-green-700 transition-colors">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V6H1C0.734784 6 0.48043 6.10536 0.292893 6.29289C0.105357 6.48043 0 6.73478 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89464 0.734784 8 1 8H6V13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13V8H13C13.2652 8 13.5196 7.89464 13.7071 7.70711C13.8946 7.51957 14 7.26522 14 7C14 6.73478 13.8946 6.48043 13.7071 6.29289C13.5196 6.10536 13.2652 6 13 6H8Z" fill="white" />
              </svg>
              <span>Buat Data Baru</span>
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900">
        Statistik Data Jenis Komoditas
      </h2>

      {/* Statistik Cards */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center text-xl">
                  {card.icon}
                </div>
                <p className="text-[16px] font-medium text-slate-500">
                  {card.title}
                </p>
              </div>
              <div className="flex  justify-start items-center gap-2">
                <p className="text-[24px] font-weight-600 font-semibold text-gray-900 leading-tight ">
                  {card.value}
                </p>
                {card.change && (
                  <div
                    className={`flex items-center justify-center opacity-100 ${card.changeType === "positive"
                      ? "bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
                      : "bg-red-50 text-red-600 border-[#EF4444]/20"
                      }`}
                    style={{
                      minWidth: "46px",
                      height: "18px",
                      gap: "4px",
                      padding: "2px 4px",
                      borderRadius: "2px",
                      borderWidth: "0.6px",
                      borderStyle: "solid",
                      transform: "rotate(0deg)",
                    }}
                  >
                    <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                      {card.change}
                    </span>

                    <svg
                      className={`flex-shrink-0 ${card.changeType === "positive" ? "" : "rotate-90"
                        }`}
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        clipPath={`url(#clip0_142_6949_${card.title?.replace(/\s+/g, "_") || "card"
                          })`}
                      >
                        <path
                          d="M1.33335 6.66667L6.66669 1.33334"
                          stroke={
                            card.changeType === "positive"
                              ? "#14CA74"
                              : "#EF4444"
                          }
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66669 6.36162V1.33333H1.6384"
                          stroke={
                            card.changeType === "positive"
                              ? "#14CA74"
                              : "#EF4444"
                          }
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath
                          id={`clip0_142_6949_${card.title?.replace(/\s+/g, "_") || "card"
                            }`}
                        >
                          <rect width="8" height="8" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peta Persebaran Sentra Pertanian */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Kiri - Info & List Kecamatan */}
          <div className="w-full lg:w-[320px] p-6 border-r border-gray-100 flex flex-col h-full">
            {/* Judul */}
            <div className="mb-4">
              <h3 className="text-[14px] font-medium text-gray-500 leading-tight">
                Peta Persebaran Sentra Pertanian
                <br />
                Kab. Jember
              </h3>
            </div>

            {/* Nilai Utama & Tomat Default */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex justify-start items-center gap-2">
                <p className="text-[24px] font-weight-600 font-semibold text-gray-900 leading-tight">
                  12,120,000
                </p>
                {(() => {
                  const changeType = "positive"; // bisa diubah ke "negative" jika perlu
                  const changeValue = "+28.5%";
                  return (
                    <div
                      className={`flex items-center justify-center opacity-100 ${changeType === "positive"
                        ? "bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
                        : "bg-red-50 text-red-600 border-[#EF4444]/20"
                        }`}
                      style={{
                        minWidth: "46px",
                        height: "18px",
                        gap: "4px",
                        padding: "2px 4px",
                        borderRadius: "2px",
                        borderWidth: "0.6px",
                        borderStyle: "solid",
                        transform: "rotate(0deg)",
                      }}
                    >
                      <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                        {changeValue}
                      </span>
                      <svg
                        className={`flex-shrink-0 ${changeType === "positive" ? "" : "rotate-90"
                          }`}
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_295_6155_nilai_utama)">
                          <path
                            d="M1.33335 6.66667L6.66669 1.33334"
                            stroke={
                              changeType === "positive" ? "#14CA74" : "#EF4444"
                            }
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66669 6.36162V1.33333H1.6384"
                            stroke={
                              changeType === "positive" ? "#14CA74" : "#EF4444"
                            }
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_295_6155_nilai_utama">
                            <rect width="8" height="8" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  );
                })()}
              </div>


            </div>

            {/* Dropdown Komoditas (kiri) dan Tahun (kanan) */}
            <div className="flex gap-2 mb-6">
              {/* Dropdown Komoditas */}
              <div className="relative flex-1" ref={komoditasDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsKomoditasOpen(!isKomoditasOpen)}
                  className="w-full flex items-center justify-between px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <span className="font-medium">
                    {selectedKomoditas === "Pilih Komoditas"
                      ? "Pangan"
                      : selectedKomoditas}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isKomoditasOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isKomoditasOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {filteredKomoditas.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedKomoditas(option);
                          setIsKomoditasOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2 text-sm transition-colors ${selectedKomoditas === option
                          ? "bg-gray-50 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Tahun */}
              <div className="relative w-[120px]" ref={tahunFilterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsTahunFilterOpen(!isTahunFilterOpen)}
                  className="w-full flex items-center justify-between px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all"
                >
                  <span className="font-medium">{tahun}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isTahunFilterOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isTahunFilterOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {tahunOptions.map((itemTahun) => (
                      <button
                        key={itemTahun}
                        type="button"
                        onClick={() => {
                          setTahun(itemTahun);
                          setIsTahunFilterOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2 text-sm transition-colors ${tahun === itemTahun
                          ? "bg-gray-50 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {itemTahun}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* List Progress Bar (Highcharts) */}
            <div className="flex-1 bg-gray-50/50 rounded-xl p-2 border border-gray-50">
              <HighchartsReact
                highcharts={Highcharts}
                options={kecamatanChartOptions}
              />
            </div>
          </div>

          {/* Area Peta (Kanan) */}
          <div className="flex-1 bg-[#FDF4E3] relative min-h-[500px]">
            {/* Background peta sesuai gambar Anda */}
            <img
              src={Map}
              alt="Peta Jember"
              className="w-full h-full object-cover mix-blend-multiply"
            />

            {/* Overlay Warna Biru Air di pojok kiri bawah */}
            <div
              className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#CCEEFF] rounded-tr-[100px] -z-0 opacity-80"
              style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Grafik Komoditas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900 tracking-tight">
              Grafik Komoditas
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Pantau perkembangan komoditas per-musim atau per-tahunnya.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Dropdown Bulan */}
            <div className="relative" ref={bulanDropdownRef}>
              <button
                onClick={() => setIsBulanOpen(!isBulanOpen)}
                className="flex items-center gap-8 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 bg-white hover:bg-gray-50 transition-all font-medium text-sm"
              >
                {selectedBulan}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isBulanOpen ? "rotate-180" : ""
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
              {isBulanOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                  {bulanOptions.map((bulan) => (
                    <button
                      key={bulan}
                      onClick={() => {
                        setSelectedBulan(bulan);
                        setIsBulanOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${selectedBulan === bulan
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {bulan}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Musiman (periode) */}
            <div className="relative" ref={musimanDropdownRef}>
              <button
                onClick={() => setIsMusimanOpen(!isMusimanOpen)}
                className="flex items-center gap-8 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 bg-white hover:bg-gray-50 transition-all font-medium text-sm"
              >
                {selectedMusiman}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isMusimanOpen ? "rotate-180" : ""
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
              {isMusimanOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  {musimanOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedMusiman(option);
                        setIsMusimanOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${selectedMusiman === option
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
          {/* Kolom 1: Pangan */}
          <div className="p-8 border-r border-gray-100">
            <div className="flex flex-col gap-2 justify-between items-start mb-6">
              <h3 className="text-[14px] font-medium text-gray-800">Pangan</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gray-200"></span>{" "}
                  2024
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-600"></span>{" "}
                  2025
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900 mb-1 tracking-tight">
                2,962,853
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center opacity-100 bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
                  style={{
                    minWidth: "46px",
                    height: "18px",
                    gap: "4px",
                    padding: "2px 4px",
                    borderRadius: "2px",
                    borderWidth: "0.6px",
                    borderStyle: "solid",
                    transform: "rotate(0deg)",
                  }}
                >
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.74777 0C10.1576 0.000183153 10.4978 0.34011 10.4978 0.75V2.75C10.4978 3.15989 10.1576 3.49982 9.74777 3.5C9.33777 3.5 8.99777 3.16 8.99777 2.75V2.5498L6.06711 5.48047C5.90718 5.64019 5.69728 5.72016 5.4675 5.7002C5.24758 5.6802 5.0477 5.56 4.9177 5.37012L3.82785 3.73047L1.27707 6.28027C1.12721 6.42996 0.937527 6.49992 0.747773 6.5C0.557843 6.5 0.367474 6.43016 0.2175 6.28027C-0.0725 5.99027 -0.0725 5.50973 0.2175 5.21973L3.4177 2.01953C3.57761 1.85981 3.78754 1.77987 4.0173 1.7998C4.23721 1.8198 4.43711 1.94002 4.56711 2.12988L5.65793 3.76953L7.92746 1.5H7.74777C7.33777 1.5 6.99777 1.16 6.99777 0.75C6.99777 0.34 7.33777 0 7.74777 0H9.74777Z" fill="#16A34A" />
                  </svg>
                  <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                    +12.3%
                  </span>

                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  from last year
                </span>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={getGrafikKomoditasOptions(
                ["Padi", "Jagung", "Kedelai"],
                [22000, 62000, 25000],
                [58000, 88000, 52000]
              )}
            />
          </div>

          {/* Kolom 2: Hortikultura */}
          <div className="p-8 border-r border-gray-100">
            <div className="flex flex-col gap-2 justify-between items-start mb-6">
              <h3 className="text-[14px] font-medium text-gray-800">Hortikultura</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gray-200"></span>{" "}
                  2024
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-600"></span>{" "}
                  2025
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900 mb-1 tracking-tight">
                174,397
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center opacity-100 bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
                  style={{
                    minWidth: "46px",
                    height: "18px",
                    gap: "4px",
                    padding: "2px 4px",
                    borderRadius: "2px",
                    borderWidth: "0.6px",
                    borderStyle: "solid",
                    transform: "rotate(0deg)",
                  }}
                >
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.74777 0C10.1576 0.000183153 10.4978 0.34011 10.4978 0.75V2.75C10.4978 3.15989 10.1576 3.49982 9.74777 3.5C9.33777 3.5 8.99777 3.16 8.99777 2.75V2.5498L6.06711 5.48047C5.90718 5.64019 5.69728 5.72016 5.4675 5.7002C5.24758 5.6802 5.0477 5.56 4.9177 5.37012L3.82785 3.73047L1.27707 6.28027C1.12721 6.42996 0.937527 6.49992 0.747773 6.5C0.557843 6.5 0.367474 6.43016 0.2175 6.28027C-0.0725 5.99027 -0.0725 5.50973 0.2175 5.21973L3.4177 2.01953C3.57761 1.85981 3.78754 1.77987 4.0173 1.7998C4.23721 1.8198 4.43711 1.94002 4.56711 2.12988L5.65793 3.76953L7.92746 1.5H7.74777C7.33777 1.5 6.99777 1.16 6.99777 0.75C6.99777 0.34 7.33777 0 7.74777 0H9.74777Z" fill="#16A34A" />
                  </svg>
                  <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                    +12.3%
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  from last year
                </span>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={getGrafikKomoditasOptions(
                ["Cabe Rawit", "Cabe Besar", "Tomat", "B. Merah"],
                [25000, 65000, 25000, 25000],
                [58000, 85000, 58000, 58000]
              )}
            />
          </div>

          {/* Kolom 3: Perkebunan */}
          <div className="p-8">
            <div className="flex flex-col gap-2 justify-between items-start mb-6">
              <h3 className="text-[14px] font-medium text-gray-800">Perkebunan</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gray-200"></span>{" "}
                  2024
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-600"></span>{" "}
                  2025
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900 mb-1 tracking-tight">
                70,310
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center opacity-100 bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
                  style={{
                    minWidth: "46px",
                    height: "18px",
                    gap: "4px",
                    padding: "2px 4px",
                    borderRadius: "2px",
                    borderWidth: "0.6px",
                    borderStyle: "solid",
                    transform: "rotate(0deg)",
                  }}
                >
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.74777 0C10.1576 0.000183153 10.4978 0.34011 10.4978 0.75V2.75C10.4978 3.15989 10.1576 3.49982 9.74777 3.5C9.33777 3.5 8.99777 3.16 8.99777 2.75V2.5498L6.06711 5.48047C5.90718 5.64019 5.69728 5.72016 5.4675 5.7002C5.24758 5.6802 5.0477 5.56 4.9177 5.37012L3.82785 3.73047L1.27707 6.28027C1.12721 6.42996 0.937527 6.49992 0.747773 6.5C0.557843 6.5 0.367474 6.43016 0.2175 6.28027C-0.0725 5.99027 -0.0725 5.50973 0.2175 5.21973L3.4177 2.01953C3.57761 1.85981 3.78754 1.77987 4.0173 1.7998C4.23721 1.8198 4.43711 1.94002 4.56711 2.12988L5.65793 3.76953L7.92746 1.5H7.74777C7.33777 1.5 6.99777 1.16 6.99777 0.75C6.99777 0.34 7.33777 0 7.74777 0H9.74777Z" fill="#16A34A" />
                  </svg>
                  <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                    +12.3%
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  from last year
                </span>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={getGrafikKomoditasOptions(
                ["Kopi Robusta"],
                [25000],
                [58000]
              )}
            />
          </div>
        </div>
      </div>

      {/* Rata-rata Harga Komoditas Strategis */}
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-6 bg-white p-4 md:p-6">
        {/* KOLOM KIRI */}
        <div className="border border-gray-100 rounded-xl p-4 md:p-6 shadow-sm relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-[14px] font-medium text-gray-500">
                Perkembangan Luas Lahan Produksi (Ha)
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[24px] font-weight-600 font-semibold font-mona-sans text-gray-900">
                  12.450 Ha
                </span>
                <div
                  className="flex items-center justify-center opacity-100 bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
                  style={{
                    minWidth: "46px",
                    height: "18px",
                    gap: "4px",
                    padding: "2px 4px",
                    borderRadius: "2px",
                    borderWidth: "0.6px",
                    borderStyle: "solid",
                    transform: "rotate(0deg)",
                  }}
                >
                  <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                    +24.6%
                  </span>
                  <svg
                    className="flex-shrink-0"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_harga_komoditas)">
                      <path
                        d="M1.33335 6.66667L6.66669 1.33334"
                        stroke="#14CA74"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66669 6.36162V1.33333H1.6384"
                        stroke="#14CA74"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_harga_komoditas">
                        <rect width="8" height="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
              <option>Sawah Irigasi</option>
              <option>Sawah Tadah Hujan</option>
              <option>Tegalan</option>
              <option>Kebun</option>
            </select>
          </div>

          <HighchartsReact
            highcharts={Highcharts}
            options={hargaKomoditasChartOptions}
          />

          {/* Floating Info Box */}
          {/* <div className="absolute top-[55%] left-[28%] bg-white/90 border border-gray-100 shadow-lg rounded-lg p-3 flex items-center gap-3">
            <span className="text-sm font-bold">Rp13,000/kg</span>
            <div
              className="flex items-center justify-center opacity-100 bg-[#05C168]/20 text-green-600 border-[#05C168]/20"
              style={{
                minWidth: "46px",
                height: "18px",
                gap: "4px",
                padding: "2px 4px",
                borderRadius: "2px",
                borderWidth: "0.6px",
                borderStyle: "solid",
                transform: "rotate(0deg)",
              }}
            >
              <span className="text-[10px] font-semibold leading-none whitespace-nowrap">
                +12.5%
              </span>
              <svg
                className="flex-shrink-0"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_floating_info)">
                  <path
                    d="M1.33335 6.66667L6.66669 1.33334"
                    stroke="#14CA74"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66669 6.36162V1.33333H1.6384"
                    stroke="#14CA74"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_floating_info">
                    <rect width="8" height="8" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="text-[10px] text-gray-400">May 21, 2025</span>
          </div> */}
        </div>

        {/* KOLOM KANAN - Dua kartu donut seperti desain */}
        <div className="flex flex-col gap-4 ">
          {/* Card 1: Distribusi Luas Lahan Berdasarkan Jenis */}
          <div className="border border-gray-100 rounded-xl p-4 md:p-6 shadow-sm bg-white">
            <div className="flex items-center gap-2 mb-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.6156C12 10.7381 11.9514 10.8555 11.8648 10.942C11.7783 11.0286 11.6609 11.0772 11.5385 11.0772H0.461538C0.339131 11.0772 0.221737 11.0286 0.135181 10.942C0.0486262 10.8555 0 10.7381 0 10.6156V1.38488C0 1.26247 0.0486262 1.14508 0.135181 1.05852C0.221737 0.971966 0.339131 0.92334 0.461538 0.92334C0.583946 0.92334 0.70134 0.971966 0.787895 1.05852C0.874451 1.14508 0.923077 1.26247 0.923077 1.38488V7.65603L3.825 4.74834C3.9125 4.66167 4.03069 4.61305 4.15385 4.61305C4.27701 4.61305 4.39519 4.66167 4.48269 4.74834L6 6.27142L8.80962 3.4618L7.97885 2.6368C7.91623 2.57007 7.8738 2.48697 7.85644 2.39713C7.83908 2.30728 7.84752 2.21436 7.88077 2.12911C7.9167 2.04555 7.97623 1.9743 8.05207 1.92409C8.1279 1.87387 8.21674 1.84688 8.30769 1.84642H10.6154C10.7378 1.84642 10.8552 1.89504 10.9417 1.9816C11.0283 2.06815 11.0769 2.18555 11.0769 2.30796V4.61565C11.0772 4.70677 11.0505 4.79593 11.0002 4.87191C10.9499 4.94788 10.8782 5.00726 10.7942 5.04257C10.7373 5.06518 10.6766 5.07692 10.6154 5.07719C10.4928 5.07667 10.3751 5.02918 10.2865 4.94449L9.46154 4.11372L6.32885 7.25219C6.24134 7.33885 6.12316 7.38747 6 7.38747C5.87684 7.38747 5.75866 7.33885 5.67115 7.25219L4.15385 5.72911L0.923077 8.95988V10.1541H11.5385C11.6609 10.1541 11.7783 10.2027 11.8648 10.2893C11.9514 10.3758 12 10.4932 12 10.6156Z" fill="#52525B" />
              </svg>

              <h3 className="text-[14px] font-semibold text-gray-800 tracking-tight">
                Distribusi Luas Lahan Berdasarkan Jenis
              </h3>
            </div>

            <div className="grid grid-cols-[1.4fr,1.6fr] gap-3 md:gap-4 items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-none">2024</span>
                  <div className="flex items-center justify-center bg-[#05C168]/20 text-green-600 border border-[#05C168]/20 px-1.5 py-0.5 rounded gap-1">
                    <span className="text-[9px] md:text-[10px] font-semibold leading-none">28.5%</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.33335 6.66667L6.66669 1.33334M6.66669 1.33334H1.6384M6.66669 1.33334V6.36162" stroke="#14CA74" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Highcharts Donut */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={getDonutOptions(lahanData, lahanColors, 120)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center h-full">
                <div className="space-y-0.5 max-h-[72px] overflow-hidden">
                  {[
                    { label: "Sawah Irigasi", color: "#60A5FA" },
                    { label: "Sawah Tadah Hujan", color: "#2563EB" },
                    { label: "Tegalan", color: "#22C55E" },
                    { label: "Kebun", color: "#15803D" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] text-gray-700 leading-tight">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      {/* Font weight medium dengan ukuran teks 11px */}
                      <span className="font-medium truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[12px] font-medium text-green-500">
              <button className="underline">Ubah Tahun</button>
              <button onClick={() => setIsModalDataLahanOpen(true)} className="underline">Lihat Data</button>
            </div>
          </div>

          {/* Card 2: Status Pemanfaatan Lahan Produksi */}
          <div className="flex-1 border border-gray-100 rounded-xl p-3 md:p-4 shadow-sm bg-white flex flex-col justify-between overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.71544 0.857149H7.28689C7.40055 0.857149 7.50956 0.811996 7.58993 0.731622C7.67031 0.651249 7.71546 0.542239 7.71546 0.428574C7.71546 0.314909 7.67031 0.2059 7.58993 0.125527C7.50956 0.0451533 7.40055 0 7.28689 0L4.71544 0C4.60177 0 4.49277 0.0451533 4.41239 0.125527C4.33202 0.2059 4.28687 0.314909 4.28687 0.428574C4.28687 0.542239 4.33202 0.651249 4.41239 0.731622C4.49277 0.811996 4.60177 0.857149 4.71544 0.857149V0.857149Z" fill="#334155" />
                <path d="M6.00129 1.71411C4.98413 1.71411 3.9898 2.01574 3.14406 2.58084C2.29831 3.14595 1.63913 3.94916 1.24988 4.8889C0.860627 5.82864 0.75878 6.86271 0.95722 7.86033C1.15566 8.85796 1.64547 9.77433 2.36472 10.4936C3.08397 11.2128 4.00034 11.7026 4.99797 11.9011C5.99559 12.0995 7.02965 11.9977 7.96939 11.6084C8.90913 11.2192 9.71234 10.56 10.2775 9.71424C10.8426 8.8685 11.1442 7.87417 11.1442 6.857C11.1414 5.49389 10.5986 4.18742 9.63474 3.22356C8.67087 2.25969 7.3644 1.71694 6.00129 1.71411V1.71411ZM8.4281 5.04092L6.30665 7.16236C6.22473 7.24157 6.11524 7.28585 6.00129 7.28585C5.88734 7.28585 5.77785 7.24157 5.69593 7.16236C5.61546 7.08111 5.57031 6.97137 5.57031 6.857C5.57031 6.74264 5.61546 6.6329 5.69593 6.55164L7.81738 4.4302C7.8558 4.38338 7.90361 4.34512 7.95771 4.31789C8.01181 4.29066 8.07102 4.27506 8.13152 4.27208C8.19201 4.26911 8.25246 4.27884 8.30898 4.30064C8.36549 4.32244 8.41681 4.35583 8.45964 4.39866C8.50247 4.44149 8.53586 4.49281 8.55766 4.54932C8.57946 4.60583 8.58918 4.66628 8.58621 4.72678C8.58324 4.78728 8.56764 4.84648 8.54041 4.90059C8.51317 4.95469 8.47492 5.00249 8.4281 5.04092V5.04092Z" fill="#334155" />
              </svg>

              <h3 className="text-[13px] font-semibold text-gray-800 tracking-tight">
                Distribusi Luas Lahan Berdasarkan Produksi
              </h3>
            </div>

            <div className="grid grid-cols-[1.4fr,1.6fr] gap-3 md:gap-4 items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-none">2024</span>
                  <div className="flex items-center justify-center bg-[#05C168]/20 text-green-600 border border-[#05C168]/20 px-1.5 py-0.5 rounded gap-1">
                    <span className="text-[9px] md:text-[10px] font-semibold leading-none">28.5%</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.33335 6.66667L6.66669 1.33334M6.66669 1.33334H1.6384M6.66669 1.33334V6.36162" stroke="#14CA74" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Highcharts Donut */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={getDonutOptions(pemanfaatanData, pemanfaatanColors)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center h-full">
                <div className="space-y-0.5 max-h-[72px] overflow-hidden">
                  {[
                    { label: "Aktif Ditanami", color: "#60A5FA" },
                    { label: "Tidak Aktif", color: "#2563EB" },
                    { label: "Alih Fungsi", color: "#22C55E" },
                    { label: "Rencana Pengembangan", color: "#15803D" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] text-gray-700 leading-tight">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      {/* Teks label dengan font medium dan ukuran 11px */}
                      <span className="font-medium truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[12px] font-medium text-green-500">
              <button className="underline">Ubah Tahun</button>
              <button onClick={() => setIsModalDataLahanOpen(true)} className="underline">Lihat Data</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Luas Panen */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6">
        {/* Header Section dengan Dropdown */}
        <div className=" flex items-center justify-between pb-3">
          <h3 className="text-[16px] font-weight-600 font-semibold font-mona-sans text-gray-900 tracking-tight">
            Luas Panen, Produktivitas, Produksi
          </h3>
          <div className="flex items-center gap-2">
            {/* Dropdown Tahun */}
            <div className="relative">
              <div
                onClick={() => setTahunTableOpen(!tahunTableOpen)}
                className="flex items-center gap-10 px-4 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-gray-300 transition-all shadow-sm"
              >
                <span className="text-[14px] font-medium text-gray-500">
                  {tahun}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${tahunTableOpen ? "rotate-180" : ""
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
              </div>
              {tahunTableOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {["2025", "2024", "2023", "2022", "2021"].map((itemTahun) => (
                    <button
                      key={itemTahun}
                      onClick={() => {
                        setTahun(itemTahun);
                        setTahunTableOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[14px] font-medium transition-colors ${tahun === itemTahun
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {itemTahun}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Komoditas (Padi/Jagung/Kedelai) */}
            <div className="relative">
              <div
                onClick={() => setIsPadiTableOpen(!isPadiTableOpen)}
                className="flex items-center gap-10 px-4 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-gray-300 transition-all shadow-sm"
              >
                <span className="text-[14px] font-medium text-gray-500">
                  {selectedPadiTable}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isPadiTableOpen ? "rotate-180" : ""
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
              </div>
              {isPadiTableOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {padiOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedPadiTable(option);
                        setIsPadiTableOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[14px] font-medium transition-colors ${selectedPadiTable === option
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F2F4F8] border-y border-gray-100">
              <tr>
                <th className="py-4 px-4 text-[12px] font-medium text-black ">No.</th>
                <th className="py-4 px-4 pr-48">
                  <div className="flex items-center gap-1.5 cursor-pointer group">
                    <span className="text-[12px] font-medium text-black ">
                      Kecamatan
                    </span>
                    <svg
                      className="w-3 h-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-4 px-4 text-[12px] font-medium text-black ">
                  Luas Tanam (Ha.)
                </th>
                <th className="py-4 px-4 text-[12px] font-medium text-black ">
                  Panen Kotor (Ha.)
                </th>
                <th className="py-4 px-4 text-[12px] font-medium text-black ">
                  Panen Bersih (Ha.)
                </th>
                <th className="py-4 px-4 text-[12px] font-medium text-black text-center">
                  Produktivitas (Ku/Ha)
                </th>
                <th className="py-4 px-4 text-[12px] font-medium text-black ">
                  Produksi (Ton)
                </th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-5 px-4">
                    {index + 1}
                  </td>
                  <td className="py-5 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-black text-[11px] font-medium">
                      {row.kecamatan}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-[12px] font-medium text-black">
                    {row.luasTanam}
                  </td>
                  <td className="py-5 px-4 text-[12px] font-medium text-black">
                    {row.panenKotor}
                  </td>
                  <td className="py-5 px-4 text-[12px] font-medium text-black">
                    {row.panenBersih}
                  </td>
                  <td className="py-5 px-4 text-[12px] font-medium text-black text-center">
                    {row.produktivitas}
                  </td>
                  <td className="py-5 px-4 text-[12px] font-medium text-black">
                    {row.produksi}
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="p-6 flex items-center justify-end bg-white border-t border-gray-100">
          {/* <span className="text-xs font-medium text-gray-400">
            12 Bulan Terakhir
          </span> */}
          <button
            onClick={() => setIsModalDataPanenOpen(true)}
            className="text-[12px] font-medium text-green-500 hover:text-green-700 underline transition-all"
          >
            Lihat Data Lengkap
          </button>
        </div>
      </div>

      {/* Modal Data Lengkap Panen */}
      {isModalDataPanenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-[1181px] max-h-[95vh] my-8 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsModalDataPanenOpen(false)}
              className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 6.81984L17.1802 5.25L12 10.4302L6.81984 5.25L5.25 6.81984L10.4302 12L5.25 17.1802L6.81984 18.75L12 13.5698L17.1802 18.75L18.75 17.1802L13.5698 12L18.75 6.81984Z" fill="#21272A" />
              </svg>

            </button>
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="[&>div]:!min-h-0 [&>div]:!m-0 [&>div>div]:!m-4">
                <ModalDataPanen />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Data Lengkap Lahan */}
      {isModalDataLahanOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-[1181px] max-h-[95vh] my-8 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsModalDataLahanOpen(false)}
              className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 6.81984L17.1802 5.25L12 10.4302L6.81984 5.25L5.25 6.81984L10.4302 12L5.25 17.1802L6.81984 18.75L12 13.5698L17.1802 18.75L18.75 17.1802L13.5698 12L18.75 6.81984Z" fill="#21272A" />
              </svg>
            </button>
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="[&>div]:!min-h-0 [&>div]:!m-0 [&>div>div]:!m-4">
                <ModalDataLahan />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDtphpPage;