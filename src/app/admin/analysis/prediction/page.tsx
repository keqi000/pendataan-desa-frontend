"use client";

import React, { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
  FiPieChart,
  FiMap,
  FiCalendar,
  FiUsers,
  FiBook,
  FiDollarSign,
  FiHome,
  FiTarget,
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiMaximize2,
  FiFilter,
  FiInfo,
  FiSettings,
  FiShare2,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../../components";

// Interfaces untuk data prediksi
interface PrediksiDemografi {
  tahun: number;
  totalPenduduk: number;
  lakiLaki: number;
  perempuan: number;
  kelompokUsia: {
    balita: number;
    anak: number;
    remaja: number;
    dewasa: number;
    lansia: number;
  };
  rasioKetergantungan: number;
  tingkatPertumbuhan: number;
}

interface PrediksiEkonomi {
  tahun: number;
  mataPencaharian: {
    petani: number;
    pedagang: number;
    buruh: number;
    pns: number;
    wirausaha: number;
  };
  jumlahUMKM: number;
  hasilPertanian: {
    padi: number;
    jagung: number;
    sayuran: number;
  };
  tingkatKemiskinan: number;
  pendapatanPerKapita: number;
}

interface PrediksiPendidikan {
  tahun: number;
  anakUsiaSekolah: {
    paud: number;
    tk: number;
    sd: number;
    smp: number;
  };
  kebutuhanFasilitas: {
    paud: number;
    tk: number;
    sd: number;
    smp: number;
  };
  tingkatPartisipasi: number;
  angkaPutusSekolah: number;
}

interface PrediksiInfrastruktur {
  tahun: number;
  kondisiJalan: {
    baik: number;
    sedang: number;
    rusak: number;
  };
  kebutuhanPerbaikan: {
    jalan: number;
    jembatan: number;
  };
  estimasiBiaya: number;
}

interface VisualisasiData {
  trendDemografi: PrediksiDemografi[];
  trendEkonomi: PrediksiEkonomi[];
  trendPendidikan: PrediksiPendidikan[];
  trendInfrastruktur: PrediksiInfrastruktur[];
  indikatorKunci: {
    pertumbuhanPenduduk: number;
    pertumbuhanEkonomi: number;
    tingkatPendidikan: number;
    kualitasInfrastruktur: number;
  };
}

interface AnalisisPrediktif {
  proyeksi5Tahun: {
    demografi: PrediksiDemografi;
    ekonomi: PrediksiEkonomi;
    pendidikan: PrediksiPendidikan;
    infrastruktur: PrediksiInfrastruktur;
  };
  skenarioAnalisis: {
    optimis: any;
    realistis: any;
    pesimis: any;
  };
  kebutuhanPembangunan: {
    prioritas: string[];
    estimasiBiaya: number;
    timeline: string;
  };
  dampakKebijakan: {
    program: string;
    targetPenerima: number;
    estimasiDampak: number;
    indikatorKeberhasilan: string[];
  }[];
}

type ViewMode = "charts" | "maps" | "trends" | "prediction";
type TimeRange = "1tahun" | "3tahun" | "5tahun";
type DataCategory =
  | "all"
  | "demografi"
  | "ekonomi"
  | "pendidikan"
  | "infrastruktur";

export default function PredictionAnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("charts");
  const [timeRange, setTimeRange] = useState<TimeRange>("5tahun");
  const [dataCategory, setDataCategory] = useState<DataCategory>("all");
  const [visualisasiData, setVisualisasiData] =
    useState<VisualisasiData | null>(null);
  const [analisisPrediktif, setAnalisisPrediktif] =
    useState<AnalisisPrediktif | null>(null);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictionData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data visualisasi dari analisis level 1 & 2
      setVisualisasiData({
        trendDemografi: [
          {
            tahun: 2025,
            totalPenduduk: 8456,
            lakiLaki: 4234,
            perempuan: 4222,
            kelompokUsia: {
              balita: 678,
              anak: 1234,
              remaja: 1456,
              dewasa: 4567,
              lansia: 521,
            },
            rasioKetergantungan: 0.67,
            tingkatPertumbuhan: 1.2,
          },
          {
            tahun: 2026,
            totalPenduduk: 8567,
            lakiLaki: 4289,
            perempuan: 4278,
            kelompokUsia: {
              balita: 689,
              anak: 1245,
              remaja: 1467,
              dewasa: 4634,
              lansia: 532,
            },
            rasioKetergantungan: 0.65,
            tingkatPertumbuhan: 1.3,
          },
          {
            tahun: 2027,
            totalPenduduk: 8689,
            lakiLaki: 4356,
            perempuan: 4333,
            kelompokUsia: {
              balita: 701,
              anak: 1267,
              remaja: 1489,
              dewasa: 4712,
              lansia: 520,
            },
            rasioKetergantungan: 0.63,
            tingkatPertumbuhan: 1.4,
          },
          {
            tahun: 2028,
            totalPenduduk: 8823,
            lakiLaki: 4423,
            perempuan: 4400,
            kelompokUsia: {
              balita: 712,
              anak: 1289,
              remaja: 1512,
              dewasa: 4798,
              lansia: 512,
            },
            rasioKetergantungan: 0.61,
            tingkatPertumbuhan: 1.5,
          },
          {
            tahun: 2029,
            totalPenduduk: 8967,
            lakiLaki: 4498,
            perempuan: 4469,
            kelompokUsia: {
              balita: 724,
              anak: 1312,
              remaja: 1534,
              dewasa: 4889,
              lansia: 508,
            },
            rasioKetergantungan: 0.59,
            tingkatPertumbuhan: 1.6,
          },
          {
            tahun: 2030,
            totalPenduduk: 9123,
            lakiLaki: 4578,
            perempuan: 4545,
            kelompokUsia: {
              balita: 736,
              anak: 1334,
              remaja: 1567,
              dewasa: 4987,
              lansia: 499,
            },
            rasioKetergantungan: 0.57,
            tingkatPertumbuhan: 1.7,
          },
        ],
        trendEkonomi: [
          {
            tahun: 2025,
            mataPencaharian: {
              petani: 3456,
              pedagang: 1234,
              buruh: 2345,
              pns: 567,
              wirausaha: 854,
            },
            jumlahUMKM: 234,
            hasilPertanian: { padi: 1234, jagung: 567, sayuran: 890 },
            tingkatKemiskinan: 12.4,
            pendapatanPerKapita: 15600000,
          },
          {
            tahun: 2026,
            mataPencaharian: {
              petani: 3523,
              pedagang: 1289,
              buruh: 2398,
              pns: 578,
              wirausaha: 879,
            },
            jumlahUMKM: 256,
            hasilPertanian: { padi: 1289, jagung: 598, sayuran: 923 },
            tingkatKemiskinan: 11.8,
            pendapatanPerKapita: 16800000,
          },
          {
            tahun: 2027,
            mataPencaharian: {
              petani: 3598,
              pedagang: 1345,
              buruh: 2456,
              pns: 589,
              wirausaha: 901,
            },
            jumlahUMKM: 278,
            hasilPertanian: { padi: 1345, jagung: 629, sayuran: 956 },
            tingkatKemiskinan: 11.2,
            pendapatanPerKapita: 18200000,
          },
          {
            tahun: 2028,
            mataPencaharian: {
              petani: 3678,
              pedagang: 1402,
              buruh: 2518,
              pns: 601,
              wirausaha: 924,
            },
            jumlahUMKM: 301,
            hasilPertanian: { padi: 1402, jagung: 661, sayuran: 989 },
            tingkatKemiskinan: 10.6,
            pendapatanPerKapita: 19800000,
          },
          {
            tahun: 2029,
            mataPencaharian: {
              petani: 3762,
              pedagang: 1461,
              buruh: 2583,
              pns: 613,
              wirausaha: 948,
            },
            jumlahUMKM: 325,
            hasilPertanian: { padi: 1461, jagung: 694, sayuran: 1023 },
            tingkatKemiskinan: 10.0,
            pendapatanPerKapita: 21600000,
          },
          {
            tahun: 2030,
            mataPencaharian: {
              petani: 3851,
              pedagang: 1522,
              buruh: 2651,
              pns: 625,
              wirausaha: 974,
            },
            jumlahUMKM: 350,
            hasilPertanian: { padi: 1522, jagung: 728, sayuran: 1058 },
            tingkatKemiskinan: 9.4,
            pendapatanPerKapita: 23600000,
          },
        ],
        trendPendidikan: [
          {
            tahun: 2025,
            anakUsiaSekolah: { paud: 234, tk: 345, sd: 1234, smp: 567 },
            kebutuhanFasilitas: { paud: 3, tk: 4, sd: 8, smp: 3 },
            tingkatPartisipasi: 87.5,
            angkaPutusSekolah: 4.2,
          },
          {
            tahun: 2026,
            anakUsiaSekolah: { paud: 245, tk: 356, sd: 1267, smp: 578 },
            kebutuhanFasilitas: { paud: 3, tk: 4, sd: 8, smp: 3 },
            tingkatPartisipasi: 89.2,
            angkaPutusSekolah: 3.8,
          },
          {
            tahun: 2027,
            anakUsiaSekolah: { paud: 256, tk: 367, sd: 1301, smp: 589 },
            kebutuhanFasilitas: { paud: 4, tk: 4, sd: 9, smp: 3 },
            tingkatPartisipasi: 90.8,
            angkaPutusSekolah: 3.4,
          },
          {
            tahun: 2028,
            anakUsiaSekolah: { paud: 267, tk: 378, sd: 1336, smp: 601 },
            kebutuhanFasilitas: { paud: 4, tk: 5, sd: 9, smp: 4 },
            tingkatPartisipasi: 92.3,
            angkaPutusSekolah: 3.0,
          },
          {
            tahun: 2029,
            anakUsiaSekolah: { paud: 278, tk: 389, sd: 1372, smp: 613 },
            kebutuhanFasilitas: { paud: 4, tk: 5, sd: 9, smp: 4 },
            tingkatPartisipasi: 93.7,
            angkaPutusSekolah: 2.6,
          },
          {
            tahun: 2030,
            anakUsiaSekolah: { paud: 289, tk: 401, sd: 1409, smp: 625 },
            kebutuhanFasilitas: { paud: 4, tk: 5, sd: 10, smp: 4 },
            tingkatPartisipasi: 95.0,
            angkaPutusSekolah: 2.2,
          },
        ],
        trendInfrastruktur: [
          {
            tahun: 2025,
            kondisiJalan: { baik: 45.2, sedang: 32.8, rusak: 22.0 },
            kebutuhanPerbaikan: { jalan: 15.6, jembatan: 3.2 },
            estimasiBiaya: 2400000000,
          },
          {
            tahun: 2026,
            kondisiJalan: { baik: 52.1, sedang: 31.4, rusak: 16.5 },
            kebutuhanPerbaikan: { jalan: 12.3, jembatan: 2.8 },
            estimasiBiaya: 1800000000,
          },
          {
            tahun: 2027,
            kondisiJalan: { baik: 58.7, sedang: 29.8, rusak: 11.5 },
            kebutuhanPerbaikan: { jalan: 9.2, jembatan: 2.3 },
            estimasiBiaya: 1350000000,
          },
          {
            tahun: 2028,
            kondisiJalan: { baik: 64.8, sedang: 28.1, rusak: 7.1 },
            kebutuhanPerbaikan: { jalan: 6.5, jembatan: 1.9 },
            estimasiBiaya: 980000000,
          },
          {
            tahun: 2029,
            kondisiJalan: { baik: 70.3, sedang: 26.2, rusak: 3.5 },
            kebutuhanPerbaikan: { jalan: 4.1, jembatan: 1.4 },
            estimasiBiaya: 650000000,
          },
          {
            tahun: 2030,
            kondisiJalan: { baik: 75.2, sedang: 24.1, rusak: 0.7 },
            kebutuhanPerbaikan: { jalan: 1.8, jembatan: 0.9 },
            estimasiBiaya: 350000000,
          },
        ],
        indikatorKunci: {
          pertumbuhanPenduduk: 1.5,
          pertumbuhanEkonomi: 4.2,
          tingkatPendidikan: 8.7,
          kualitasInfrastruktur: 6.8,
        },
      });

      // Mock data analisis prediktif
      setAnalisisPrediktif({
        proyeksi5Tahun: {
          demografi: {
            tahun: 2030,
            totalPenduduk: 9123,
            lakiLaki: 4578,
            perempuan: 4545,
            kelompokUsia: {
              balita: 736,
              anak: 1334,
              remaja: 1567,
              dewasa: 4987,
              lansia: 499,
            },
            rasioKetergantungan: 0.57,
            tingkatPertumbuhan: 1.7,
          },
          ekonomi: {
            tahun: 2030,
            mataPencaharian: {
              petani: 3851,
              pedagang: 1522,
              buruh: 2651,
              pns: 625,
              wirausaha: 974,
            },
            jumlahUMKM: 350,
            hasilPertanian: { padi: 1522, jagung: 728, sayuran: 1058 },
            tingkatKemiskinan: 9.4,
            pendapatanPerKapita: 23600000,
          },
          pendidikan: {
            tahun: 2030,
            anakUsiaSekolah: { paud: 289, tk: 401, sd: 1409, smp: 625 },
            kebutuhanFasilitas: { paud: 4, tk: 5, sd: 10, smp: 4 },
            tingkatPartisipasi: 95.0,
            angkaPutusSekolah: 2.2,
          },
          infrastruktur: {
            tahun: 2030,
            kondisiJalan: { baik: 75.2, sedang: 24.1, rusak: 0.7 },
            kebutuhanPerbaikan: { jalan: 1.8, jembatan: 0.9 },
            estimasiBiaya: 350000000,
          },
        },
        skenarioAnalisis: {
          optimis: {
            pertumbuhanEkonomi: 5.8,
            penurunanKemiskinan: 7.2,
            peningkatanPendidikan: 97.5,
          },
          realistis: {
            pertumbuhanEkonomi: 4.2,
            penurunanKemiskinan: 9.4,
            peningkatanPendidikan: 95.0,
          },
          pesimis: {
            pertumbuhanEkonomi: 2.8,
            penurunanKemiskinan: 11.8,
            peningkatanPendidikan: 92.1,
          },
        },
        kebutuhanPembangunan: {
          prioritas: [
            "Pembangunan 2 fasilitas SD baru",
            "Perbaikan 15.6 km jalan desa",
            "Program pemberdayaan UMKM",
            "Peningkatan akses pendidikan tinggi",
            "Modernisasi pertanian",
          ],
          estimasiBiaya: 8500000000,
          timeline: "2025-2030",
        },
        dampakKebijakan: [
          {
            program: "Program Bantuan Pendidikan",
            targetPenerima: 1245,
            estimasiDampak: 85.2,
            indikatorKeberhasilan: [
              "Peningkatan partisipasi sekolah",
              "Penurunan angka putus sekolah",
              "Peningkatan literasi",
            ],
          },
          {
            program: "Program Pemberdayaan UMKM",
            targetPenerima: 350,
            estimasiDampak: 78.6,
            indikatorKeberhasilan: [
              "Peningkatan pendapatan",
              "Penciptaan lapangan kerja",
              "Diversifikasi ekonomi",
            ],
          },
          {
            program: "Program Infrastruktur Desa",
            targetPenerima: 9123,
            estimasiDampak: 92.4,
            indikatorKeberhasilan: [
              "Perbaikan akses jalan",
              "Peningkatan mobilitas",
              "Konektivitas antar desa",
            ],
          },
        ],
      });

      setLoading(false);
    };

    fetchPredictionData();
  }, [timeRange, dataCategory]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(1)}%`;
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous)
      return <FiArrowUp className="w-4 h-4 text-green-500" />;
    if (current < previous)
      return <FiArrowDown className="w-4 h-4 text-red-500" />;
    return <FiMinus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return "text-green-600";
    if (current < previous) return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">
            Memuat data prediksi dan proyeksi...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FiTrendingUp className="w-8 h-8 mr-3 text-blue-600" />
                Prediksi & Proyeksi Desa
              </h1>
              <p className="mt-2 text-gray-600">
                Analisis prediktif 5 tahun untuk mendukung perencanaan kebijakan
                pemerintah pusat di Kabupaten Gorontalo
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Prediksi
              </Button>
              <Button variant="primary" className="flex items-center">
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Update Model
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode Tampilan
                </label>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  {[
                    { key: "charts", label: "Grafik", icon: FiBarChart },
                    { key: "maps", label: "Peta", icon: FiMap },
                    { key: "trends", label: "Tren", icon: FiActivity },
                    {
                      key: "prediction",
                      label: "Prediksi",
                      icon: FiTrendingUp,
                    },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.key}
                        onClick={() => setViewMode(mode.key as ViewMode)}
                        className={`px-4 py-2 text-sm font-medium flex items-center ${
                          viewMode === mode.key
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rentang Waktu
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1tahun">1 Tahun</option>
                  <option value="3tahun">3 Tahun</option>
                  <option value="5tahun">5 Tahun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori Data
                </label>
                <select
                  value={dataCategory}
                  onChange={(e) =>
                    setDataCategory(e.target.value as DataCategory)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="demografi">Demografi</option>
                  <option value="ekonomi">Ekonomi</option>
                  <option value="pendidikan">Pendidikan</option>
                  <option value="infrastruktur">Infrastruktur</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <FiFilter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="ghost" size="sm">
                <FiSettings className="w-4 h-4 mr-2" />
                Pengaturan
              </Button>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pertumbuhan Penduduk
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPercentage(
                    visualisasiData?.indikatorKunci.pertumbuhanPenduduk || 0
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">Proyeksi 2030</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(1.7, 1.2)}
              <span className={`text-sm ml-1 ${getTrendColor(1.7, 1.2)}`}>
                +0.5% dari 2025
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pertumbuhan Ekonomi
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercentage(
                    visualisasiData?.indikatorKunci.pertumbuhanEkonomi || 0
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">Proyeksi 2030</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(4.2, 3.1)}
              <span className={`text-sm ml-1 ${getTrendColor(4.2, 3.1)}`}>
                +1.1% dari baseline
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tingkat Pendidikan
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPercentage(
                    visualisasiData?.indikatorKunci.tingkatPendidikan || 0
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">Partisipasi 2030</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiBook className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(95.0, 87.5)}
              <span className={`text-sm ml-1 ${getTrendColor(95.0, 87.5)}`}>
                +7.5% dari 2025
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Kualitas Infrastruktur
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatPercentage(
                    visualisasiData?.indikatorKunci.kualitasInfrastruktur || 0
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">Indeks 2030</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiHome className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(75.2, 45.2)}
              <span className={`text-sm ml-1 ${getTrendColor(75.2, 45.2)}`}>
                +30% dari 2025
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Based on View Mode */}
        {viewMode === "charts" && (
          <div className="space-y-8">
            {/* Visualisasi Interaktif Charts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiBarChart className="w-6 h-6 mr-3 text-blue-600" />
                Visualisasi Interaktif Data Desa
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Demografi */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiUsers className="w-5 h-5 mr-2 text-blue-600" />
                    Tren Demografi 2025-2030
                  </h3>
                  <div className="space-y-4">
                    {visualisasiData?.trendDemografi.map((data, index) => (
                      <div
                        key={data.tahun}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600">
                          {data.tahun}
                        </span>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(data.totalPenduduk / 10000) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-16">
                            {formatNumber(data.totalPenduduk)}
                          </span>
                          {index > 0 &&
                            getTrendIcon(
                              data.totalPenduduk,
                              visualisasiData.trendDemografi[index - 1]
                                .totalPenduduk
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Proyeksi:</strong> Pertumbuhan penduduk stabil
                      1.5-1.7% per tahun dengan total 9,123 jiwa pada 2030
                    </p>
                  </div>
                </div>

                {/* Chart Ekonomi */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiDollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Tren Ekonomi 2025-2030
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Tingkat Kemiskinan
                        </span>
                        <span className="font-medium">12.4% → 9.4%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "9.4%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Jumlah UMKM</span>
                        <span className="font-medium">234 → 350</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Pendapatan Per Kapita
                        </span>
                        <span className="font-medium">
                          {formatCurrency(15600000)} →{" "}
                          {formatCurrency(23600000)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Proyeksi:</strong> Penurunan kemiskinan 3% dan
                      peningkatan UMKM 49.6% dalam 5 tahun
                    </p>
                  </div>
                </div>

                {/* Chart Pendidikan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiBook className="w-5 h-5 mr-2 text-purple-600" />
                    Tren Pendidikan 2025-2030
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Tingkat Partisipasi
                        </span>
                        <span className="font-medium">87.5% → 95.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Angka Putus Sekolah
                        </span>
                        <span className="font-medium">4.2% → 2.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-400 h-2 rounded-full"
                          style={{ width: "2.2%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Kebutuhan Fasilitas Baru
                        </span>
                        <span className="font-medium">+5 unit</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="w-full bg-gray-200 rounded h-8 flex items-center justify-center">
                            <span className="font-medium">4</span>
                          </div>
                          <span className="text-gray-600">PAUD</span>
                        </div>
                        <div className="text-center">
                          <div className="w-full bg-gray-200 rounded h-8 flex items-center justify-center">
                            <span className="font-medium">5</span>
                          </div>
                          <span className="text-gray-600">TK</span>
                        </div>
                        <div className="text-center">
                          <div className="w-full bg-gray-200 rounded h-8 flex items-center justify-center">
                            <span className="font-medium">10</span>
                          </div>
                          <span className="text-gray-600">SD</span>
                        </div>
                        <div className="text-center">
                          <div className="w-full bg-gray-200 rounded h-8 flex items-center justify-center">
                            <span className="font-medium">4</span>
                          </div>
                          <span className="text-gray-600">SMP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Proyeksi:</strong> Peningkatan partisipasi
                      pendidikan 7.5% dengan kebutuhan 5 fasilitas baru
                    </p>
                  </div>
                </div>

                {/* Chart Infrastruktur */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiHome className="w-5 h-5 mr-2 text-orange-600" />
                    Tren Infrastruktur 2025-2030
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Kondisi Jalan Baik
                        </span>
                        <span className="font-medium">45.2% → 75.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "75.2%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Jalan Rusak</span>
                        <span className="font-medium">22.0% → 0.7%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "0.7%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Estimasi Biaya Perbaikan
                        </span>
                        <span className="font-medium">
                          {formatCurrency(2400000000)} →{" "}
                          {formatCurrency(350000000)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Proyeksi:</strong> Peningkatan kualitas jalan 30%
                      dengan pengurangan biaya perbaikan 85%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "trends" && (
          <div className="space-y-8">
            {/* Analisis Tren Komprehensif */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiActivity className="w-6 h-6 mr-3 text-green-600" />
                Analisis Tren Komprehensif
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tren Demografis Detail */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Tren Demografis
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">
                          Struktur Usia Produktif
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-900">
                            54.7% → 54.6%
                          </span>
                          <FiMinus className="w-4 h-4 text-gray-500 ml-2" />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">
                          Rasio Ketergantungan
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-900">
                            0.67 → 0.57
                          </span>
                          <FiArrowDown className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">
                          Populasi Lansia
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-900">
                            6.2% → 5.5%
                          </span>
                          <FiArrowDown className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">
                          Migrasi Keluar
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-900">
                            2.3% → 1.8%
                          </span>
                          <FiArrowDown className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>Insight:</strong> Bonus demografi dengan
                        penurunan rasio ketergantungan mendukung pertumbuhan
                        ekonomi
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">
                      Tren Ekonomi
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">
                          Diversifikasi Ekonomi
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-900">
                            65% → 78%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">
                          Ketergantungan Pertanian
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-900">
                            68% → 58%
                          </span>
                          <FiArrowDown className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">
                          Produktivitas UMKM
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-900">
                            +45%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">
                          Akses Permodalan
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-900">
                            23% → 67%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                      <p className="text-xs text-green-800">
                        <strong>Insight:</strong> Transformasi ekonomi dari
                        pertanian tradisional ke ekonomi diversifikasi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">
                      Tren Pendidikan
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">
                          Akses Pendidikan Tinggi
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-purple-900">
                            12% → 28%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">
                          Literasi Digital
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-purple-900">
                            34% → 78%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">
                          Kesesuaian Skill-Kerja
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-purple-900">
                            45% → 72%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">
                          Program Vokasi
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-purple-900">
                            18% → 42%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                      <p className="text-xs text-purple-800">
                        <strong>Insight:</strong> Peningkatan kualitas SDM
                        melalui pendidikan yang relevan dengan kebutuhan ekonomi
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 mb-4">
                      Tren Infrastruktur
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-700">
                          Konektivitas Digital
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-orange-900">
                            45% → 89%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-700">
                          Akses Air Bersih
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-orange-900">
                            67% → 92%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-700">
                          Elektrifikasi
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-orange-900">
                            78% → 98%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-700">
                          Transportasi Publik
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-orange-900">
                            23% → 56%
                          </span>
                          <FiArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                      <p className="text-xs text-orange-800">
                        <strong>Insight:</strong> Modernisasi infrastruktur
                        mendukung transformasi ekonomi dan sosial
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "prediction" && (
          <div className="space-y-8">
            {/* Analisis Prediktif 5 Tahun */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiTrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Analisis Prediktif 5 Tahun (2025-2030)
              </h2>

              {/* Proyeksi Utama */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <FiUsers className="w-5 h-5 mr-2" />
                    Proyeksi Demografis 2030
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total Penduduk</span>
                      <span className="font-bold text-blue-900">
                        {formatNumber(
                          analisisPrediktif?.proyeksi5Tahun.demografi
                            .totalPenduduk || 0
                        )}{" "}
                        jiwa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">
                        Rasio Ketergantungan
                      </span>
                      <span className="font-bold text-blue-900">
                        {analisisPrediktif?.proyeksi5Tahun.demografi.rasioKetergantungan.toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Usia Produktif</span>
                      <span className="font-bold text-blue-900">
                        {formatNumber(
                          analisisPrediktif?.proyeksi5Tahun.demografi
                            .kelompokUsia.dewasa || 0
                        )}{" "}
                        jiwa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Tingkat Pertumbuhan</span>
                      <span className="font-bold text-blue-900">
                        {formatPercentage(
                          analisisPrediktif?.proyeksi5Tahun.demografi
                            .tingkatPertumbuhan || 0
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <FiCheckCircle className="w-4 h-4 inline mr-1" />
                      Bonus demografi optimal dengan 54.6% penduduk usia
                      produktif
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <FiDollarSign className="w-5 h-5 mr-2" />
                    Proyeksi Ekonomi 2030
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">
                        Pendapatan Per Kapita
                      </span>
                      <span className="font-bold text-green-900">
                        {formatCurrency(
                          analisisPrediktif?.proyeksi5Tahun.ekonomi
                            .pendapatanPerKapita || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Tingkat Kemiskinan</span>
                      <span className="font-bold text-green-900">
                        {formatPercentage(
                          analisisPrediktif?.proyeksi5Tahun.ekonomi
                            .tingkatKemiskinan || 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Jumlah UMKM</span>
                      <span className="font-bold text-green-900">
                        {formatNumber(
                          analisisPrediktif?.proyeksi5Tahun.ekonomi
                            .jumlahUMKM || 0
                        )}{" "}
                        unit
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Sektor Pertanian</span>
                      <span className="font-bold text-green-900">
                        {formatNumber(
                          analisisPrediktif?.proyeksi5Tahun.ekonomi
                            .mataPencaharian.petani || 0
                        )}{" "}
                        orang
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      <FiCheckCircle className="w-4 h-4 inline mr-1" />
                      Transformasi ekonomi dengan peningkatan UMKM 49.6%
                    </p>
                  </div>
                </div>
              </div>

              {/* Skenario Analisis */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiTarget className="w-5 h-5 mr-2 text-indigo-600" />
                  Skenario Analisis Kebijakan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-100 rounded-lg p-4 border border-green-300">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <FiArrowUp className="w-4 h-4 mr-1" />
                      Skenario Optimis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">
                          Pertumbuhan Ekonomi
                        </span>
                        <span className="font-medium text-green-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.optimis
                              .pertumbuhanEkonomi || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">
                          Penurunan Kemiskinan
                        </span>
                        <span className="font-medium text-green-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.optimis
                              .penurunanKemiskinan || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">
                          Partisipasi Pendidikan
                        </span>
                        <span className="font-medium text-green-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.optimis
                              .peningkatanPendidikan || 0
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-green-200 rounded text-xs text-green-800">
                      Dengan implementasi optimal semua program kebijakan
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4 border border-blue-300">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <FiMinus className="w-4 h-4 mr-1" />
                      Skenario Realistis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">
                          Pertumbuhan Ekonomi
                        </span>
                        <span className="font-medium text-blue-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.realistis
                              .pertumbuhanEkonomi || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">
                          Penurunan Kemiskinan
                        </span>
                        <span className="font-medium text-blue-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.realistis
                              .penurunanKemiskinan || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">
                          Partisipasi Pendidikan
                        </span>
                        <span className="font-medium text-blue-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.realistis
                              .peningkatanPendidikan || 0
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-blue-200 rounded text-xs text-blue-800">
                      Dengan implementasi standar program kebijakan
                    </div>
                  </div>

                  <div className="bg-red-100 rounded-lg p-4 border border-red-300">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                      <FiArrowDown className="w-4 h-4 mr-1" />
                      Skenario Pesimis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-red-700">
                          Pertumbuhan Ekonomi
                        </span>
                        <span className="font-medium text-red-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.pesimis
                              .pertumbuhanEkonomi || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700">
                          Penurunan Kemiskinan
                        </span>
                        <span className="font-medium text-red-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.pesimis
                              .penurunanKemiskinan || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700">
                          Partisipasi Pendidikan
                        </span>
                        <span className="font-medium text-red-900">
                          {formatPercentage(
                            analisisPrediktif?.skenarioAnalisis.pesimis
                              .peningkatanPendidikan || 0
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-red-200 rounded text-xs text-red-800">
                      Dengan hambatan implementasi program kebijakan
                    </div>
                  </div>
                </div>
              </div>

              {/* Kebutuhan Pembangunan Prioritas */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiHome className="w-5 h-5 mr-2 text-orange-600" />
                  Kebutuhan Pembangunan Prioritas 2025-2030
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Daftar Prioritas
                    </h4>
                    <div className="space-y-3">
                      {analisisPrediktif?.kebutuhanPembangunan.prioritas.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-700">
                              {item}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Estimasi Anggaran
                    </h4>
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <div className="text-center mb-4">
                        <p className="text-2xl font-bold text-orange-600">
                          {formatCurrency(
                            analisisPrediktif?.kebutuhanPembangunan
                              .estimasiBiaya || 0
                          )}
                        </p>
                        <p className="text-sm text-orange-700">
                          Total Investasi 5 Tahun
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-orange-700">
                            Infrastruktur Pendidikan
                          </span>
                          <span className="font-medium">
                            {formatCurrency(3400000000)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">
                            Perbaikan Jalan
                          </span>
                          <span className="font-medium">
                            {formatCurrency(2800000000)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">Program UMKM</span>
                          <span className="font-medium">
                            {formatCurrency(1500000000)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">
                            Modernisasi Pertanian
                          </span>
                          <span className="font-medium">
                            {formatCurrency(800000000)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-orange-100 rounded text-xs text-orange-800">
                        Timeline:{" "}
                        {analisisPrediktif?.kebutuhanPembangunan.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dampak Kebijakan Pemerintah Pusat */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Proyeksi Dampak Kebijakan Pemerintah Pusat
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {analisisPrediktif?.dampakKebijakan.map((program, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {program.program}
                      </h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Target Penerima</span>
                          <span className="font-medium">
                            {formatNumber(program.targetPenerima)} orang
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimasi Dampak</span>
                          <span className="font-medium text-green-600">
                            {formatPercentage(program.estimasiDampak)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2">
                          Indikator Keberhasilan:
                        </p>
                        <div className="space-y-1">
                          {program.indikatorKeberhasilan.map(
                            (indikator, idx) => (
                              <div
                                key={idx}
                                className="flex items-center text-xs text-gray-700"
                              >
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                {indikator}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analisis Prediktif Spesifik */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiActivity className="w-6 h-6 mr-3 text-purple-600" />
                Analisis Prediktif Spesifik Berdasarkan Data Desa
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Prediksi Demografis Spesifik */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Prediksi Demografis Spesifik
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Keluarga dengan Kepala Keluarga Perempuan & Anak
                          Sekolah
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 234 keluarga → 2030: 289 keluarga
                          </span>
                          <Badge variant="info" size="sm">
                            +23.5%
                          </Badge>
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                          Memerlukan program bantuan pendidikan khusus dan
                          pemberdayaan ekonomi perempuan
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Penduduk Usia Produktif Tanpa Pekerjaan Tetap
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 1,456 orang → 2030: 1,123 orang
                          </span>
                          <Badge variant="success" size="sm">
                            -22.9%
                          </Badge>
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                          Penurunan signifikan melalui program pelatihan
                          keterampilan dan pengembangan UMKM
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Keluarga Lansia dengan Tanggungan Anak
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 89 keluarga → 2030: 67 keluarga
                          </span>
                          <Badge variant="success" size="sm">
                            -24.7%
                          </Badge>
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                          Penurunan beban ketergantungan melalui program bantuan
                          sosial tertarget dan pemberdayaan ekonomi keluarga
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">
                      Prediksi Ekonomi Spesifik
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Petani dengan Lahan 0.5 Ha Tanpa Bantuan
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 567 petani → 2030: 234 petani
                          </span>
                          <Badge variant="success" size="sm">
                            -58.7%
                          </Badge>
                        </div>
                        <p className="text-xs text-green-700 mt-2">
                          Penurunan drastis melalui program redistribusi lahan
                          dan bantuan pertanian
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Keluarga Pendapatan UMR dengan Anak Sekolah
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 892 keluarga → 2030: 456 keluarga
                          </span>
                          <Badge variant="success" size="sm">
                            -48.9%
                          </Badge>
                        </div>
                        <p className="text-xs text-green-700 mt-2">
                          Penurunan signifikan melalui program bantuan
                          pendidikan dan peningkatan ekonomi
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Lulusan SMA+ Masih Kategori Miskin
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 234 orang → 2030: 89 orang
                          </span>
                          <Badge variant="success" size="sm">
                            -62.0%
                          </Badge>
                        </div>
                        <p className="text-xs text-green-700 mt-2">
                          Penurunan melalui program pelatihan keterampilan dan
                          akses permodalan UMKM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prediksi Pendidikan & Infrastruktur */}
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">
                      Prediksi Pendidikan Spesifik
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Anak Usia Sekolah Tidak Bersekolah (Keluarga Miskin)
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 156 anak → 2030: 34 anak
                          </span>
                          <Badge variant="success" size="sm">
                            -78.2%
                          </Badge>
                        </div>
                        <p className="text-xs text-purple-700 mt-2">
                          Penurunan drastis melalui program bantuan pendidikan
                          dan beasiswa
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Anak Petani Melanjutkan Pendidikan Tinggi
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 67 anak → 2030: 234 anak
                          </span>
                          <Badge variant="success" size="sm">
                            +249.3%
                          </Badge>
                        </div>
                        <p className="text-xs text-purple-700 mt-2">
                          Peningkatan akses pendidikan tinggi melalui program
                          beasiswa dan fasilitas
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Proyeksi Kebutuhan Fasilitas Pendidikan
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-purple-100 rounded">
                            <div className="font-bold text-purple-900">+4</div>
                            <div className="text-purple-700">PAUD</div>
                          </div>
                          <div className="text-center p-2 bg-purple-100 rounded">
                            <div className="font-bold text-purple-900">+5</div>
                            <div className="text-purple-700">TK</div>
                          </div>
                          <div className="text-center p-2 bg-purple-100 rounded">
                            <div className="font-bold text-purple-900">+10</div>
                            <div className="text-purple-700">SD</div>
                          </div>
                          <div className="text-center p-2 bg-purple-100 rounded">
                            <div className="font-bold text-purple-900">+4</div>
                            <div className="text-purple-700">SMP</div>
                          </div>
                        </div>
                        <p className="text-xs text-purple-700 mt-2">
                          Berdasarkan proyeksi pertumbuhan anak usia sekolah
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-900 mb-4">
                      Prediksi Infrastruktur Spesifik
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Penduduk di Area Akses Jalan Buruk
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 2,134 orang → 2030: 456 orang
                          </span>
                          <Badge variant="success" size="sm">
                            -78.6%
                          </Badge>
                        </div>
                        <p className="text-xs text-orange-700 mt-2">
                          Perbaikan akses jalan prioritas ke area berpenduduk
                          padat
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Desa dengan Infrastruktur Buruk & Potensi Ekonomi
                          Tinggi
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: 3 desa → 2030: 0 desa
                          </span>
                          <Badge variant="success" size="sm">
                            -100%
                          </Badge>
                        </div>
                        <p className="text-xs text-orange-700 mt-2">
                          Prioritas pembangunan infrastruktur untuk mendukung
                          potensi ekonomi
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Estimasi Kerugian Ekonomi Infrastruktur Buruk
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            2025: {formatCurrency(1200000000)} → 2030:{" "}
                            {formatCurrency(150000000)}
                          </span>
                          <Badge variant="success" size="sm">
                            -87.5%
                          </Badge>
                        </div>
                        <p className="text-xs text-orange-700 mt-2">
                          Pengurangan kerugian ekonomi melalui perbaikan
                          infrastruktur strategis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "maps" && (
          <div className="space-y-8">
            {/* Visualisasi Peta Interaktif */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiMap className="w-6 h-6 mr-3 text-green-600" />
                Peta Interaktif Prediksi Pembangunan Desa
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map Placeholder */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <FiMap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">
                        Peta Interaktif Desa
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Visualisasi geografis prediksi pembangunan dan proyeksi
                        data desa
                      </p>
                      <Button variant="primary" className="mt-4">
                        <FiMapPin className="w-4 h-4 mr-2" />
                        Aktifkan Peta
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Map Legend & Controls */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Legenda Peta
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-700">
                          Desa Berkembang Pesat
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-700">
                          Desa Berkembang Stabil
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-700">
                          Desa Perlu Perhatian
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-700">
                          Desa Prioritas Pembangunan
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Filter Peta
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategori Data
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                          <option>Semua Kategori</option>
                          <option>Demografi</option>
                          <option>Ekonomi</option>
                          <option>Pendidikan</option>
                          <option>Infrastruktur</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tahun Proyeksi
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                          <option>2030</option>
                          <option>2029</option>
                          <option>2028</option>
                          <option>2027</option>
                          <option>2026</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Indikator
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                          <option>Indeks Pembangunan</option>
                          <option>Tingkat Kemiskinan</option>
                          <option>Akses Pendidikan</option>
                          <option>Kualitas Infrastruktur</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">
                      Statistik Peta
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Total Desa</span>
                        <span className="font-medium text-blue-900">
                          12 desa
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Desa Prioritas</span>
                        <span className="font-medium text-blue-900">
                          3 desa
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Total Penduduk</span>
                        <span className="font-medium text-blue-900">
                          9,123 jiwa
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Luas Wilayah</span>
                        <span className="font-medium text-blue-900">
                          234.5 km²
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analisis Spasial */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <FiMapPin className="w-5 h-5 mr-2" />
                    Analisis Kepadatan & Distribusi
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">
                        Kepadatan Rata-rata
                      </span>
                      <span className="font-bold text-green-900">
                        38.9 jiwa/km²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Desa Terpadat</span>
                      <span className="font-bold text-green-900">
                        Tibawa (156 jiwa/km²)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Desa Tersebar</span>
                      <span className="font-bold text-green-900">
                        Bulango Utara (12 jiwa/km²)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">
                        Indeks Aksesibilitas
                      </span>
                      <span className="font-bold text-green-900">7.2/10</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      <FiCheckCircle className="w-4 h-4 inline mr-1" />
                      Distribusi penduduk relatif merata dengan akses yang
                      memadai
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                    <FiTarget className="w-5 h-5 mr-2" />
                    Prioritas Pengembangan Wilayah
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">
                          Tibawa Tengah
                        </span>
                        <Badge variant="danger" size="sm">
                          Prioritas 1
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        Kepadatan tinggi, infrastruktur kurang, potensi ekonomi
                        besar
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">
                          Bulango Selatan
                        </span>
                        <Badge variant="warning" size="sm">
                          Prioritas 2
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        Akses pendidikan terbatas, perlu fasilitas tambahan
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">
                          Bone Pantai
                        </span>
                        <Badge variant="info" size="sm">
                          Prioritas 3
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        Perbaikan jalan untuk akses ekonomi dan pendidikan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3">
            {/* Ringkasan Eksekutif */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
                <FiFileText className="w-6 h-6 mr-3" />
                Ringkasan Eksekutif Prediksi 2030
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-3">
                    Pencapaian Utama
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-indigo-800">
                        Penurunan kemiskinan 24.2% (12.4% → 9.4%)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-indigo-800">
                        Peningkatan partisipasi pendidikan 8.6%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-indigo-800">
                        Pertumbuhan UMKM 49.6% (234 → 350 unit)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-indigo-800">
                        Perbaikan infrastruktur jalan 66.3%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-3">
                    Tantangan & Risiko
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <FiAlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-indigo-800">
                        Kebutuhan investasi {formatCurrency(8500000000)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiAlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-indigo-800">
                        Koordinasi antar instansi pemerintah
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiAlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-indigo-800">
                        Kapasitas SDM untuk implementasi
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiAlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-indigo-800">
                        Sustainability program jangka panjang
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistik Cepat
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Akurasi Model</span>
                  <span className="text-sm font-bold text-green-600">
                    94.2%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Confidence Level
                  </span>
                  <span className="text-sm font-bold text-blue-600">87.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Data Points</span>
                  <span className="text-sm font-bold text-purple-600">
                    15,234
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Update</span>
                  <span className="text-sm font-bold text-gray-600">
                    15 Jan 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Aksi Prioritas
              </h3>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  Export Laporan Prediksi
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiShare2 className="w-4 h-4 mr-2" />
                  Bagikan ke Stakeholder
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiSettings className="w-4 h-4 mr-2" />
                  Konfigurasi Model
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiRefreshCw className="w-4 h-4 mr-2" />
                  Update Data
                </Button>
              </div>
            </div>

            {/* Model Information */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiInfo className="w-5 h-5 mr-2 text-blue-600" />
                Info Model
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Algoritma:</span>
                  <span className="font-medium text-gray-900 ml-2">
                    Linear Regression + Time Series
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Training Data:</span>
                  <span className="font-medium text-gray-900 ml-2">
                    2020-2024 (5 tahun)
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Validation:</span>
                  <span className="font-medium text-gray-900 ml-2">
                    Cross-validation 80/20
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Update Frequency:</span>
                  <span className="font-medium text-gray-900 ml-2">
                    Bulanan
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-xs text-blue-800">
                  <FiCheckCircle className="w-3 h-3 inline mr-1" />
                  Model telah divalidasi dengan data historis dan menunjukkan
                  akurasi tinggi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
