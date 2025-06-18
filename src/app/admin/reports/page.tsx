"use client";

import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiDownload,
  FiCalendar,
  FiFilter,
  FiSettings,
  FiPrinter,
  FiShare2,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiBarChart,
  FiTrendingUp,
  FiShield,
  FiTarget,
  FiBook,
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiRefreshCw,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../components";
import * as XLSX from "xlsx";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category:
    | "demografis"
    | "ekonomi"
    | "pendidikan"
    | "infrastruktur"
    | "komprehensif";
  type: "standar" | "custom";
  sections: string[];
  frequency: "bulanan" | "triwulan" | "tahunan" | "custom";
  format: "pdf" | "excel" | "csv";
  lastGenerated?: string;
  isActive: boolean;
}

interface ReportHistory {
  id: string;
  templateName: string;
  generatedAt: string;
  period: string;
  format: string;
  size: string;
  status: "completed" | "processing" | "failed";
  downloadUrl?: string;
}

interface CustomReportBuilder {
  name: string;
  description: string;
  selectedSections: string[];
  dateRange: {
    start: string;
    end: string;
  };
  villages: string[];
  format: "pdf" | "excel" | "csv";
  includeCharts: boolean;
  includeComparison: boolean;
}

type ReportCategory =
  | "all"
  | "demografis"
  | "ekonomi"
  | "pendidikan"
  | "infrastruktur"
  | "komprehensif";
type ReportPeriod = "all" | "bulanan" | "triwulan" | "tahunan";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "templates" | "generator" | "history"
  >("templates");
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>([]);
  const [reportHistory, setReportHistory] = useState<ReportHistory[]>([]);
  const [customBuilder, setCustomBuilder] = useState<CustomReportBuilder>({
    name: "",
    description: "",
    selectedSections: [],
    dateRange: {
      start: "",
      end: "",
    },
    villages: [],
    format: "pdf",
    includeCharts: true,
    includeComparison: false,
  });

  const [categoryFilter, setCategoryFilter] = useState<ReportCategory>("all");
  const [periodFilter, setPeriodFilter] = useState<ReportPeriod>("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  // Available sections for custom report builder
  const availableSections = [
    {
      id: "data-umum",
      name: "Data Umum Desa",
      category: "umum",
      icon: FiMapPin,
    },
    {
      id: "kependudukan",
      name: "Data Kependudukan",
      category: "demografis",
      icon: FiUsers,
    },
    {
      id: "demografis-detail",
      name: "Analisis Demografis Detail",
      category: "demografis",
      icon: FiBarChart,
    },
    {
      id: "pendidikan",
      name: "Data Pendidikan",
      category: "pendidikan",
      icon: FiBook,
    },
    {
      id: "ekonomi",
      name: "Data Ekonomi",
      category: "ekonomi",
      icon: FiDollarSign,
    },
    {
      id: "infrastruktur",
      name: "Data Infrastruktur",
      category: "infrastruktur",
      icon: FiHome,
    },
    {
      id: "analisis-tingkat1",
      name: "Analisis Tingkat 1 (Dasar)",
      category: "analisis",
      icon: FiBarChart,
    },
    {
      id: "analisis-tingkat2",
      name: "Analisis Tingkat 2 (Lanjutan)",
      category: "analisis",
      icon: FiTrendingUp,
    },
    {
      id: "prediksi",
      name: "Analisis Prediktif",
      category: "prediksi",
      icon: FiTarget,
    },
    {
      id: "quality-check",
      name: "Validasi Kualitas Data",
      category: "validasi",
      icon: FiShield,
    },
    {
      id: "perbandingan",
      name: "Perbandingan Antar Desa",
      category: "perbandingan",
      icon: FiBarChart,
    },
  ];

  const availableVillages = [
    "Tibawa",
    "Bulango Selatan",
    "Bone Pantai",
    "Tibawa Tengah",
    "Bulango Utara",
    "Tibawa Utara",
    "Bone Raya",
    "Bulango Timur",
  ];

  // Mock data untuk Excel
  const getMockDataForTemplate = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId);
    if (!template) return {};

    const data: any = {};

    // Data Umum Desa
    if (template.sections.includes("data-umum")) {
      data["Data Umum Desa"] = [
        {
          "Nama Desa": "Tibawa",
          Kecamatan: "Bone Pantai",
          Kabupaten: "Bone Bolango",
          Provinsi: "Gorontalo",
        },
        {
          "Nama Desa": "Bulango Selatan",
          Kecamatan: "Bulango Selatan",
          Kabupaten: "Bone Bolango",
          Provinsi: "Gorontalo",
        },
        {
          "Nama Desa": "Bone Pantai",
          Kecamatan: "Bone Pantai",
          Kabupaten: "Bone Bolango",
          Provinsi: "Gorontalo",
        },
        {
          "Nama Desa": "Tibawa Tengah",
          Kecamatan: "Bone Pantai",
          Kabupaten: "Bone Bolango",
          Provinsi: "Gorontalo",
        },
        {
          "Nama Desa": "Bulango Utara",
          Kecamatan: "Bulango Utara",
          Kabupaten: "Bone Bolango",
          Provinsi: "Gorontalo",
        },
      ];
    }

    // Data Kependudukan
    if (template.sections.includes("kependudukan")) {
      data["Data Kependudukan"] = [
        {
          Desa: "Tibawa",
          "Jumlah Penduduk": 2450,
          "Laki-laki": 1230,
          Perempuan: 1220,
          KK: 650,
        },
        {
          Desa: "Bulango Selatan",
          "Jumlah Penduduk": 1890,
          "Laki-laki": 945,
          Perempuan: 945,
          KK: 485,
        },
        {
          Desa: "Bone Pantai",
          "Jumlah Penduduk": 3200,
          "Laki-laki": 1600,
          Perempuan: 1600,
          KK: 820,
        },
        {
          Desa: "Tibawa Tengah",
          "Jumlah Penduduk": 1750,
          "Laki-laki": 875,
          Perempuan: 875,
          KK: 450,
        },
        {
          Desa: "Bulango Utara",
          "Jumlah Penduduk": 2100,
          "Laki-laki": 1050,
          Perempuan: 1050,
          KK: 540,
        },
      ];
    }

    // Demografis Detail
    if (template.sections.includes("demografis-detail")) {
      data["Demografis Detail"] = [
        {
          Desa: "Tibawa",
          "Usia 0-14": 490,
          "Usia 15-64": 1715,
          "Usia 65+": 245,
          "Rasio Ketergantungan": 42.8,
        },
        {
          Desa: "Bulango Selatan",
          "Usia 0-14": 378,
          "Usia 15-64": 1323,
          "Usia 65+": 189,
          "Rasio Ketergantungan": 42.9,
        },
        {
          Desa: "Bone Pantai",
          "Usia 0-14": 640,
          "Usia 15-64": 2240,
          "Usia 65+": 320,
          "Rasio Ketergantungan": 42.9,
        },
        {
          Desa: "Tibawa Tengah",
          "Usia 0-14": 350,
          "Usia 15-64": 1225,
          "Usia 65+": 175,
          "Rasio Ketergantungan": 42.9,
        },
        {
          Desa: "Bulango Utara",
          "Usia 0-14": 420,
          "Usia 15-64": 1470,
          "Usia 65+": 210,
          "Rasio Ketergantungan": 42.9,
        },
      ];
    }

    // Data Pendidikan
    if (template.sections.includes("pendidikan")) {
      data["Data Pendidikan"] = [
        {
          Desa: "Tibawa",
          TK: 2,
          SD: 3,
          SMP: 1,
          SMA: 1,
          "Perguruan Tinggi": 0,
          "Angka Melek Huruf": 95.2,
        },
        {
          Desa: "Bulango Selatan",
          TK: 1,
          SD: 2,
          SMP: 1,
          SMA: 0,
          "Perguruan Tinggi": 0,
          "Angka Melek Huruf": 92.8,
        },
        {
          Desa: "Bone Pantai",
          TK: 3,
          SD: 4,
          SMP: 2,
          SMA: 1,
          "Perguruan Tinggi": 0,
          "Angka Melek Huruf": 96.5,
        },
        {
          Desa: "Tibawa Tengah",
          TK: 1,
          SD: 2,
          SMP: 1,
          SMA: 0,
          "Perguruan Tinggi": 0,
          "Angka Melek Huruf": 93.4,
        },
        {
          Desa: "Bulango Utara",
          TK: 2,
          SD: 3,
          SMP: 1,
          SMA: 1,
          "Perguruan Tinggi": 0,
          "Angka Melek Huruf": 94.8,
        },
      ];
    }

    // Data Ekonomi
    if (template.sections.includes("ekonomi")) {
      data["Data Ekonomi"] = [
        {
          Desa: "Tibawa",
          Pertanian: 450,
          Perikanan: 120,
          Perdagangan: 80,
          Jasa: 60,
          Lainnya: 40,
          Pengangguran: 5.2,
        },
        {
          Desa: "Bulango Selatan",
          Pertanian: 320,
          Perikanan: 90,
          Perdagangan: 50,
          Jasa: 35,
          Lainnya: 25,
          Pengangguran: 6.1,
        },
        {
          Desa: "Bone Pantai",
          Pertanian: 580,
          Perikanan: 200,
          Perdagangan: 120,
          Jasa: 90,
          Lainnya: 60,
          Pengangguran: 4.8,
        },
        {
          Desa: "Tibawa Tengah",
          Pertanian: 280,
          Perikanan: 70,
          Perdagangan: 40,
          Jasa: 30,
          Lainnya: 20,
          Pengangguran: 6.8,
        },
        {
          Desa: "Bulango Utara",
          Pertanian: 380,
          Perikanan: 100,
          Perdagangan: 70,
          Jasa: 50,
          Lainnya: 35,
          Pengangguran: 5.5,
        },
      ];
    }

    // Data Infrastruktur
    if (template.sections.includes("infrastruktur")) {
      data["Data Infrastruktur"] = [
        {
          Desa: "Tibawa",
          "Jalan Aspal (km)": 12.5,
          "Jalan Beton (km)": 8.2,
          "Jalan Tanah (km)": 15.3,
          Jembatan: 4,
          "Akses Listrik (%)": 98.5,
          "Akses Air Bersih (%)": 85.2,
        },
        {
          Desa: "Bulango Selatan",
          "Jalan Aspal (km)": 8.7,
          "Jalan Beton (km)": 5.4,
          "Jalan Tanah (km)": 12.1,
          Jembatan: 2,
          "Akses Listrik (%)": 95.8,
          "Akses Air Bersih (%)": 78.9,
        },
        {
          Desa: "Bone Pantai",
          "Jalan Aspal (km)": 18.2,
          "Jalan Beton (km)": 12.8,
          "Jalan Tanah (km)": 22.5,
          Jembatan: 6,
          "Akses Listrik (%)": 99.2,
          "Akses Air Bersih (%)": 92.1,
        },
        {
          Desa: "Tibawa Tengah",
          "Jalan Aspal (km)": 6.8,
          "Jalan Beton (km)": 4.2,
          "Jalan Tanah (km)": 9.5,
          Jembatan: 1,
          "Akses Listrik (%)": 94.2,
          "Akses Air Bersih (%)": 72.8,
        },
        {
          Desa: "Bulango Utara",
          "Jalan Aspal (km)": 10.5,
          "Jalan Beton (km)": 7.1,
          "Jalan Tanah (km)": 14.8,
          Jembatan: 3,
          "Akses Listrik (%)": 97.5,
          "Akses Air Bersih (%)": 82.4,
        },
      ];
    }

    // Analisis Tingkat 1
    if (template.sections.includes("analisis-tingkat1")) {
      data["Analisis Dasar"] = [
        {
          Desa: "Tibawa",
          "Kepadatan Penduduk (jiwa/km²)": 245,
          "Pertumbuhan Penduduk (%)": 1.2,
          IPM: 68.5,
          "Tingkat Kemiskinan (%)": 12.8,
        },
        {
          Desa: "Bulango Selatan",
          "Kepadatan Penduduk (jiwa/km²)": 189,
          "Pertumbuhan Penduduk (%)": 0.8,
          IPM: 65.2,
          "Tingkat Kemiskinan (%)": 15.4,
        },
        {
          Desa: "Bone Pantai",
          "Kepadatan Penduduk (jiwa/km²)": 320,
          "Pertumbuhan Penduduk (%)": 1.5,
          IPM: 71.2,
          "Tingkat Kemiskinan (%)": 10.2,
        },
        {
          Desa: "Tibawa Tengah",
          "Kepadatan Penduduk (jiwa/km²)": 175,
          "Pertumbuhan Penduduk (%)": 0.6,
          IPM: 63.8,
          "Tingkat Kemiskinan (%)": 18.1,
        },
        {
          Desa: "Bulango Utara",
          "Kepadatan Penduduk (jiwa/km²)": 210,
          "Pertumbuhan Penduduk (%)": 1.0,
          IPM: 66.9,
          "Tingkat Kemiskinan (%)": 13.5,
        },
      ];
    }

    // Analisis Tingkat 2
    if (template.sections.includes("analisis-tingkat2")) {
      data["Analisis Lanjutan"] = [
        {
          Indikator: "Rata-rata IPM",
          Nilai: 67.12,
          Target: 70.0,
          "Capaian (%)": 95.9,
          Status: "Mendekati Target",
        },
        {
          Indikator: "Rata-rata Tingkat Kemiskinan",
          Nilai: 14.0,
          Target: 12.0,
          "Capaian (%)": 85.7,
          Status: "Perlu Perbaikan",
        },
        {
          Indikator: "Akses Listrik",
          Nilai: 97.04,
          Target: 98.0,
          "Capaian (%)": 99.0,
          Status: "Mendekati Target",
        },
        {
          Indikator: "Akses Air Bersih",
          Nilai: 82.28,
          Target: 90.0,
          "Capaian (%)": 91.4,
          Status: "Perlu Perbaikan",
        },
        {
          Indikator: "Angka Melek Huruf",
          Nilai: 94.54,
          Target: 95.0,
          "Capaian (%)": 99.5,
          Status: "Mendekati Target",
        },
      ];
    }

    // Prediksi
    if (template.sections.includes("prediksi")) {
      data["Prediksi 2025-2030"] = [
        {
          Tahun: 2025,
          "Prediksi Populasi": 12500,
          "IPM Target": 69.0,
          "Kemiskinan Target (%)": 12.5,
          "Akses Air Bersih Target (%)": 85.0,
        },
        {
          Tahun: 2026,
          "Prediksi Populasi": 12750,
          "IPM Target": 70.0,
          "Kemiskinan Target (%)": 11.5,
          "Akses Air Bersih Target (%)": 87.0,
        },
        {
          Tahun: 2027,
          "Prediksi Populasi": 13000,
          "IPM Target": 71.0,
          "Kemiskinan Target (%)": 10.5,
          "Akses Air Bersih Target (%)": 89.0,
        },
        {
          Tahun: 2028,
          "Prediksi Populasi": 13250,
          "IPM Target": 72.0,
          "Kemiskinan Target (%)": 9.5,
          "Akses Air Bersih Target (%)": 91.0,
        },
        {
          Tahun: 2029,
          "Prediksi Populasi": 13500,
          "IPM Target": 73.0,
          "Kemiskinan Target (%)": 8.5,
          "Akses Air Bersih Target (%)": 93.0,
        },
        {
          Tahun: 2030,
          "Prediksi Populasi": 13750,
          "IPM Target": 74.0,
          "Kemiskinan Target (%)": 7.5,
          "Akses Air Bersih Target (%)": 95.0,
        },
      ];
    }

    // Quality Check
    if (template.sections.includes("quality-check")) {
      data["Validasi Kualitas Data"] = [
        {
          "Kategori Data": "Data Kependudukan",
          "Kelengkapan (%)": 98.5,
          "Konsistensi (%)": 96.2,
          "Akurasi (%)": 94.8,
          Status: "Baik",
        },
        {
          "Kategori Data": "Data Pendidikan",
          "Kelengkapan (%)": 95.2,
          "Konsistensi (%)": 93.1,
          "Akurasi (%)": 91.5,
          Status: "Baik",
        },
        {
          "Kategori Data": "Data Ekonomi",
          "Kelengkapan (%)": 89.8,
          "Konsistensi (%)": 87.4,
          "Akurasi (%)": 85.2,
          Status: "Cukup",
        },
        {
          "Kategori Data": "Data Infrastruktur",
          "Kelengkapan (%)": 92.1,
          "Konsistensi (%)": 90.5,
          "Akurasi (%)": 88.9,
          Status: "Baik",
        },
        {
          "Kategori Data": "Data Kesehatan",
          "Kelengkapan (%)": 87.3,
          "Konsistensi (%)": 84.7,
          "Akurasi (%)": 82.1,
          Status: "Cukup",
        },
      ];
    }

    // Perbandingan
    if (template.sections.includes("perbandingan")) {
      data["Perbandingan Antar Desa"] = [
        {
          Indikator: "Jumlah Penduduk",
          Tertinggi: "Bone Pantai (3200)",
          Terendah: "Tibawa Tengah (1750)",
          "Rata-rata": 2278,
          "Standar Deviasi": 612.5,
        },
        {
          Indikator: "IPM",
          Tertinggi: "Bone Pantai (71.2)",
          Terendah: "Tibawa Tengah (63.8)",
          "Rata-rata": 67.12,
          "Standar Deviasi": 2.8,
        },
        {
          Indikator: "Tingkat Kemiskinan (%)",
          Tertinggi: "Tibawa Tengah (18.1)",
          Terendah: "Bone Pantai (10.2)",
          "Rata-rata": 14.0,
          "Standar Deviasi": 3.2,
        },
        {
          Indikator: "Akses Listrik (%)",
          Tertinggi: "Bone Pantai (99.2)",
          Terendah: "Tibawa Tengah (94.2)",
          "Rata-rata": 97.04,
          "Standar Deviasi": 1.9,
        },
        {
          Indikator: "Akses Air Bersih (%)",
          Tertinggi: "Bone Pantai (92.1)",
          Terendah: "Tibawa Tengah (72.8)",
          "Rata-rata": 82.28,
          "Standar Deviasi": 7.8,
        },
      ];
    }

    return data;
  };

  const generateExcelReport = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const data = getMockDataForTemplate(templateId);
    const workbook = XLSX.utils.book_new();

    // Header Sheet dengan informasi laporan
    const headerData = [
      ["LAPORAN DESA KABUPATEN BONE BOLANGO"],
      ["PROVINSI GORONTALO"],
      [""],
      ["Nama Laporan:", template.name],
      ["Deskripsi:", template.description],
      ["Periode:", "Januari 2025"],
      ["Tanggal Dibuat:", new Date().toLocaleDateString("id-ID")],
      ["Format:", template.format.toUpperCase()],
      [
        "Kategori:",
        template.category.charAt(0).toUpperCase() + template.category.slice(1),
      ],
      [""],
      ["RINGKASAN EKSEKUTIF"],
      [
        "Laporan ini berisi data dan analisis komprehensif mengenai kondisi desa-desa",
      ],
      ["di Kabupaten Bone Bolango untuk mendukung pengambilan kebijakan"],
      ["pemerintah pusat dalam program pembangunan desa."],
      [""],
      ["Bagian yang disertakan:"],
      ...template.sections.map((section) => {
        const sectionInfo = availableSections.find((s) => s.id === section);
        return [`- ${sectionInfo?.name || section}`];
      }),
    ];

    const headerSheet = XLSX.utils.aoa_to_sheet(headerData);

    // Styling untuk header
    const headerRange = XLSX.utils.decode_range(headerSheet["!ref"] || "A1");
    for (let row = headerRange.s.r; row <= headerRange.e.r; row++) {
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (!headerSheet[cellAddress]) continue;

        if (row === 0 || row === 1) {
          headerSheet[cellAddress].s = {
            font: { bold: true, sz: 14 },
            alignment: { horizontal: "center" },
          };
        } else if (row >= 3 && row <= 8) {
          if (col === 0) {
            headerSheet[cellAddress].s = { font: { bold: true } };
          }
        } else if (row === 10) {
          headerSheet[cellAddress].s = { font: { bold: true, sz: 12 } };
        }
      }
    }

    headerSheet["!cols"] = [{ width: 30 }, { width: 50 }];
    XLSX.utils.book_append_sheet(workbook, headerSheet, "Informasi Laporan");

    // Tambahkan sheet untuk setiap bagian data
    Object.entries(data).forEach(([sheetName, sheetData]) => {
      if (Array.isArray(sheetData) && sheetData.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(sheetData);

        // Auto-width untuk kolom
        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
        const colWidths: any[] = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
          let maxWidth = 10;
          for (let row = range.s.r; row <= range.e.r; row++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (worksheet[cellAddress] && worksheet[cellAddress].v) {
              const cellValue = worksheet[cellAddress].v.toString();
              maxWidth = Math.max(maxWidth, cellValue.length + 2);
            }
          }
          colWidths.push({ width: Math.min(maxWidth, 30) });
        }
        worksheet["!cols"] = colWidths;

        // Styling untuk header row
        for (let col = range.s.c; col <= range.e.c; col++) {
          const headerCellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
          if (worksheet[headerCellAddress]) {
            worksheet[headerCellAddress].s = {
              font: { bold: true },
              fill: { fgColor: { rgb: "E3F2FD" } },
              alignment: { horizontal: "center" },
            };
          }
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
    });

    // Sheet Kesimpulan dan Rekomendasi
    const conclusionData = [
      ["KESIMPULAN DAN REKOMENDASI"],
      [""],
      ["KESIMPULAN UTAMA:"],
      [
        "1. Bone Pantai menunjukkan kinerja terbaik dalam sebagian besar indikator",
      ],
      [
        "2. Tibawa Tengah memerlukan perhatian khusus dalam pengentasan kemiskinan",
      ],
      ["3. Akses air bersih masih menjadi tantangan di beberapa desa"],
      ["4. Tingkat melek huruf sudah mencapai standar yang baik (>90%)"],
      ["5. Infrastruktur jalan perlu peningkatan di desa-desa terpencil"],
      [""],
      ["REKOMENDASI KEBIJAKAN:"],
      ["1. Program Pengentasan Kemiskinan:"],
      ["   - Fokus pada Tibawa Tengah dan Bulango Selatan"],
      ["   - Pengembangan UMKM dan koperasi desa"],
      ["   - Pelatihan keterampilan untuk meningkatkan produktivitas"],
      [""],
      ["2. Peningkatan Akses Air Bersih:"],
      ["   - Pembangunan sistem penyediaan air bersih di Tibawa Tengah"],
      ["   - Rehabilitasi infrastruktur air di Bulango Selatan"],
      ["   - Program bantuan teknis pengelolaan air desa"],
      [""],
      ["3. Pengembangan Infrastruktur:"],
      ["   - Peningkatan kualitas jalan penghubung antar desa"],
      ["   - Pembangunan jembatan di lokasi strategis"],
      ["   - Perbaikan akses transportasi umum"],
      [""],
      ["4. Peningkatan Kualitas Pendidikan:"],
      ["   - Penambahan fasilitas pendidikan di desa dengan akses terbatas"],
      [
        "   - Program beasiswa untuk siswa berprestasi dari keluarga kurang mampu",
      ],
      ["   - Pelatihan guru dan peningkatan kualitas pembelajaran"],
      [""],
      ["PRIORITAS PROGRAM 2025:"],
      ["1. Program air bersih di Tibawa Tengah (Prioritas Tinggi)"],
      ["2. Pengentasan kemiskinan di 3 desa tertinggal (Prioritas Tinggi)"],
      ["3. Peningkatan infrastruktur jalan (Prioritas Sedang)"],
      ["4. Pengembangan ekonomi kreatif (Prioritas Sedang)"],
      [""],
      ["INDIKATOR KEBERHASILAN:"],
      ["- Penurunan tingkat kemiskinan menjadi <12% di semua desa"],
      ["- Peningkatan akses air bersih menjadi >85% di semua desa"],
      ["- Peningkatan IPM rata-rata menjadi >70"],
      ["- Penambahan panjang jalan beraspal minimal 20 km"],
      [""],
      ["Laporan ini disusun berdasarkan data terkini dan analisis mendalam"],
      ["untuk mendukung pengambilan keputusan strategis pemerintah pusat"],
      ["dalam program pembangunan desa berkelanjutan."],
    ];

    const conclusionSheet = XLSX.utils.aoa_to_sheet(conclusionData);

    // Styling untuk conclusion sheet
    const conclusionRange = XLSX.utils.decode_range(
      conclusionSheet["!ref"] || "A1"
    );
    for (let row = conclusionRange.s.r; row <= conclusionRange.e.r; row++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
      if (!conclusionSheet[cellAddress]) continue;

      const cellValue = conclusionSheet[cellAddress].v?.toString() || "";

      if (row === 0) {
        conclusionSheet[cellAddress].s = {
          font: { bold: true, sz: 14 },
          alignment: { horizontal: "center" },
        };
      } else if (
        cellValue.includes("KESIMPULAN UTAMA:") ||
        cellValue.includes("REKOMENDASI KEBIJAKAN:") ||
        cellValue.includes("PRIORITAS PROGRAM 2025:") ||
        cellValue.includes("INDIKATOR KEBERHASILAN:")
      ) {
        conclusionSheet[cellAddress].s = {
          font: { bold: true, sz: 12 },
          fill: { fgColor: { rgb: "FFF3E0" } },
        };
      } else if (cellValue.match(/^\d+\./)) {
        conclusionSheet[cellAddress].s = { font: { bold: true } };
      }
    }

    conclusionSheet["!cols"] = [{ width: 80 }];
    XLSX.utils.book_append_sheet(
      workbook,
      conclusionSheet,
      "Kesimpulan & Rekomendasi"
    );

    // Generate dan download file
    const fileName = `${template.name.replace(/\s+/g, "_")}_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleDownloadFromHistory = (report: ReportHistory) => {
    if (report.status !== "completed") return;

    // Cari template berdasarkan nama laporan
    const template = reportTemplates.find(
      (t) =>
        report.templateName.includes(t.name) ||
        t.name.includes(report.templateName.replace("Laporan Custom - ", ""))
    );

    if (template && report.format.toLowerCase() === "excel") {
      generateExcelReport(template.id);
    } else if (report.format.toLowerCase() === "pdf") {
      // Untuk PDF, kita bisa buat mock download atau redirect
      alert(
        "Fitur download PDF akan segera tersedia. Saat ini hanya mendukung Excel."
      );
    } else {
      // Untuk format lain
      alert(`Download ${report.format} akan segera tersedia.`);
    }
  };

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock report templates
      setReportTemplates([
        {
          id: "1",
          name: "Laporan Kependudukan Bulanan",
          description:
            "Laporan data kependudukan dan demografis untuk pelaporan rutin ke pemerintah pusat",
          category: "demografis",
          type: "standar",
          sections: ["data-umum", "kependudukan", "demografis-detail"],
          frequency: "bulanan",
          format: "pdf",
          lastGenerated: "2025-01-15T10:30:00Z",
          isActive: true,
        },
        {
          id: "2",
          name: "Laporan Ekonomi Triwulan",
          description:
            "Laporan perkembangan ekonomi desa untuk evaluasi program pemerintah pusat",
          category: "ekonomi",
          type: "standar",
          sections: ["ekonomi", "analisis-tingkat1"],
          frequency: "triwulan",
          format: "excel",
          lastGenerated: "2025-01-01T09:00:00Z",
          isActive: true,
        },
        {
          id: "3",
          name: "Laporan Pendidikan Tahunan",
          description:
            "Evaluasi komprehensif sektor pendidikan untuk perencanaan kebijakan pendidikan",
          category: "pendidikan",
          type: "standar",
          sections: ["pendidikan", "analisis-tingkat2", "prediksi"],
          frequency: "tahunan",
          format: "pdf",
          lastGenerated: "2024-12-31T16:45:00Z",
          isActive: true,
        },
        {
          id: "4",
          name: "Laporan Infrastruktur Tahunan",
          description:
            "Status dan kebutuhan infrastruktur desa untuk program pembangunan pemerintah pusat",
          category: "infrastruktur",
          type: "standar",
          sections: ["infrastruktur", "analisis-tingkat1", "prediksi"],
          frequency: "tahunan",
          format: "pdf",
          lastGenerated: "2024-12-30T14:20:00Z",
          isActive: true,
        },
        {
          id: "5",
          name: "Laporan Komprehensif Tahunan",
          description:
            "Laporan lengkap semua aspek desa untuk evaluasi menyeluruh pemerintah pusat",
          category: "komprehensif",
          type: "standar",
          sections: [
            "data-umum",
            "kependudukan",
            "pendidikan",
            "ekonomi",
            "infrastruktur",
            "analisis-tingkat1",
            "analisis-tingkat2",
            "prediksi",
            "quality-check",
          ],
          frequency: "tahunan",
          format: "pdf",
          lastGenerated: "2024-12-31T18:00:00Z",
          isActive: true,
        },
        {
          id: "6",
          name: "Laporan Validasi Data Bulanan",
          description:
            "Laporan kualitas dan konsistensi data untuk memastikan akurasi pelaporan",
          category: "komprehensif",
          type: "standar",
          sections: ["quality-check", "perbandingan"],
          frequency: "bulanan",
          format: "excel",
          lastGenerated: "2025-01-15T11:15:00Z",
          isActive: true,
        },
      ]);

      // Mock report history
      setReportHistory([
        {
          id: "1",
          templateName: "Laporan Kependudukan Bulanan",
          generatedAt: "2025-01-15T10:30:00Z",
          period: "Januari 2025",
          format: "PDF",
          size: "2.4 MB",
          status: "completed",
          downloadUrl: "/reports/kependudukan-jan-2025.pdf",
        },
        {
          id: "2",
          templateName: "Laporan Validasi Data Bulanan",
          generatedAt: "2025-01-15T11:15:00Z",
          period: "Januari 2025",
          format: "Excel",
          size: "1.8 MB",
          status: "completed",
          downloadUrl: "/reports/validasi-jan-2025.xlsx",
        },
        {
          id: "3",
          templateName: "Laporan Ekonomi Triwulan",
          generatedAt: "2025-01-01T09:00:00Z",
          period: "Q4 2024",
          format: "Excel",
          size: "3.2 MB",
          status: "completed",
          downloadUrl: "/reports/ekonomi-q4-2024.xlsx",
        },
        {
          id: "4",
          templateName: "Laporan Komprehensif Tahunan",
          generatedAt: "2024-12-31T18:00:00Z",
          period: "2024",
          format: "PDF",
          size: "15.7 MB",
          status: "completed",
          downloadUrl: "/reports/komprehensif-2024.pdf",
        },
        {
          id: "5",
          templateName: "Laporan Custom - Analisis Prediktif",
          generatedAt: "2025-01-10T14:22:00Z",
          period: "2024-2030",
          format: "PDF",
          size: "8.9 MB",
          status: "completed",
          downloadUrl: "/reports/custom-prediksi-2025.pdf",
        },
        {
          id: "6",
          templateName: "Laporan Infrastruktur Tahunan",
          generatedAt: "2025-01-08T16:45:00Z",
          period: "2024",
          format: "PDF",
          size: "4.1 MB",
          status: "processing",
        },
      ]);

      setLoading(false);
    };

    fetchReportData();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "demografis":
        return <FiUsers className="w-5 h-5" />;
      case "ekonomi":
        return <FiDollarSign className="w-5 h-5" />;
      case "pendidikan":
        return <FiBook className="w-5 h-5" />;
      case "infrastruktur":
        return <FiHome className="w-5 h-5" />;
      case "komprehensif":
        return <FiBarChart className="w-5 h-5" />;
      default:
        return <FiFileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "demografis":
        return "text-blue-600 bg-blue-100";
      case "ekonomi":
        return "text-green-600 bg-green-100";
      case "pendidikan":
        return "text-purple-600 bg-purple-100";
      case "infrastruktur":
        return "text-orange-600 bg-orange-100";
      case "komprehensif":
        return "text-indigo-600 bg-indigo-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "processing":
        return "Sedang Diproses";
      case "failed":
        return "Gagal";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredTemplates = reportTemplates.filter((template) => {
    const matchesCategory =
      categoryFilter === "all" || template.category === categoryFilter;
    const matchesPeriod =
      periodFilter === "all" || template.frequency === periodFilter;
    return matchesCategory && matchesPeriod;
  });

  const handleGenerateReport = async (templateId: string) => {
    setIsGenerating(true);

    // Simulasi proses generate report
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Update history dengan report baru
    const template = reportTemplates.find((t) => t.id === templateId);
    if (template) {
      const newReport: ReportHistory = {
        id: Date.now().toString(),
        templateName: template.name,
        generatedAt: new Date().toISOString(),
        period: "Januari 2025",
        format: template.format.toUpperCase(),
        size: "2.1 MB",
        status: "completed",
        downloadUrl: `/reports/${template.name
          .toLowerCase()
          .replace(/\s+/g, "-")}.${template.format}`,
      };

      setReportHistory((prev) => [newReport, ...prev]);

      // Langsung generate Excel jika formatnya Excel
      if (template.format === "excel") {
        setTimeout(() => {
          generateExcelReport(templateId);
        }, 500);
      }
    }

    setIsGenerating(false);
  };

  const handleCustomReportGenerate = async () => {
    if (!customBuilder.name || customBuilder.selectedSections.length === 0) {
      alert("Mohon lengkapi nama laporan dan pilih minimal satu bagian");
      return;
    }

    setIsGenerating(true);

    // Simulasi proses generate custom report
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const newReport: ReportHistory = {
      id: Date.now().toString(),
      templateName: `Laporan Custom - ${customBuilder.name}`,
      generatedAt: new Date().toISOString(),
      period: `${customBuilder.dateRange.start} - ${customBuilder.dateRange.end}`,
      format: customBuilder.format.toUpperCase(),
      size: "3.7 MB",
      status: "completed",
      downloadUrl: `/reports/custom-${customBuilder.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.${customBuilder.format}`,
    };

    setReportHistory((prev) => [newReport, ...prev]);

    // Generate Excel untuk custom report
    if (customBuilder.format === "excel") {
      // Buat template sementara untuk custom report
      const customTemplate: ReportTemplate = {
        id: "custom-" + Date.now(),
        name: customBuilder.name,
        description: customBuilder.description,
        category: "komprehensif",
        type: "custom",
        sections: customBuilder.selectedSections,
        frequency: "custom",
        format: "excel",
        isActive: true,
      };

      setTimeout(() => {
        generateCustomExcelReport(customTemplate);
      }, 500);
    }

    setIsGenerating(false);
    setShowCustomBuilder(false);

    // Reset custom builder
    setCustomBuilder({
      name: "",
      description: "",
      selectedSections: [],
      dateRange: { start: "", end: "" },
      villages: [],
      format: "pdf",
      includeCharts: true,
      includeComparison: false,
    });
  };

  const generateCustomExcelReport = (template: ReportTemplate) => {
    const data = getMockDataForTemplate(template.id);
    const workbook = XLSX.utils.book_new();

    // Header Sheet untuk custom report
    const headerData = [
      ["LAPORAN CUSTOM DESA KABUPATEN BONE BOLANGO"],
      ["PROVINSI GORONTALO"],
      [""],
      ["Nama Laporan:", template.name],
      ["Deskripsi:", template.description || "Laporan custom sesuai kebutuhan"],
      [
        "Periode:",
        customBuilder.dateRange.start && customBuilder.dateRange.end
          ? `${customBuilder.dateRange.start} - ${customBuilder.dateRange.end}`
          : "Custom Period",
      ],
      ["Tanggal Dibuat:", new Date().toLocaleDateString("id-ID")],
      ["Format:", "EXCEL"],
      ["Tipe:", "Custom Report"],
      [""],
      ["DESA YANG DISERTAKAN:"],
      ...(customBuilder.villages.length > 0
        ? customBuilder.villages.map((village) => [`- ${village}`])
        : [["- Semua Desa (8 desa)"]]),
      [""],
      ["BAGIAN YANG DISERTAKAN:"],
      ...template.sections.map((section) => {
        const sectionInfo = availableSections.find((s) => s.id === section);
        return [`- ${sectionInfo?.name || section}`];
      }),
      [""],
      ["OPSI TAMBAHAN:"],
      [`- Sertakan Grafik: ${customBuilder.includeCharts ? "Ya" : "Tidak"}`],
      [
        `- Sertakan Perbandingan: ${
          customBuilder.includeComparison ? "Ya" : "Tidak"
        }`,
      ],
    ];

    const headerSheet = XLSX.utils.aoa_to_sheet(headerData);
    headerSheet["!cols"] = [{ width: 30 }, { width: 50 }];
    XLSX.utils.book_append_sheet(workbook, headerSheet, "Info Laporan Custom");

    // Tambahkan sheet data sesuai pilihan
    Object.entries(data).forEach(([sheetName, sheetData]) => {
      if (Array.isArray(sheetData) && sheetData.length > 0) {
        // Filter data berdasarkan desa yang dipilih jika ada
        let filteredData = sheetData;
        if (
          customBuilder.villages.length > 0 &&
          sheetData[0] &&
          "Desa" in sheetData[0]
        ) {
          filteredData = sheetData.filter((row: any) =>
            customBuilder.villages.includes(row.Desa)
          );
        }

        if (filteredData.length > 0) {
          const worksheet = XLSX.utils.json_to_sheet(filteredData);

          // Auto-width dan styling
          const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
          const colWidths: any[] = [];

          for (let col = range.s.c; col <= range.e.c; col++) {
            let maxWidth = 10;
            for (let row = range.s.r; row <= range.e.r; row++) {
              const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
              if (worksheet[cellAddress] && worksheet[cellAddress].v) {
                const cellValue = worksheet[cellAddress].v.toString();
                maxWidth = Math.max(maxWidth, cellValue.length + 2);
              }
            }
            colWidths.push({ width: Math.min(maxWidth, 30) });
          }
          worksheet["!cols"] = colWidths;

          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
      }
    });

    // Generate dan download
    const fileName = `Custom_${template.name.replace(/\s+/g, "_")}_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const toggleSection = (sectionId: string) => {
    setCustomBuilder((prev) => ({
      ...prev,
      selectedSections: prev.selectedSections.includes(sectionId)
        ? prev.selectedSections.filter((id) => id !== sectionId)
        : [...prev.selectedSections, sectionId],
    }));
  };

  const toggleVillage = (village: string) => {
    setCustomBuilder((prev) => ({
      ...prev,
      villages: prev.villages.includes(village)
        ? prev.villages.filter((v) => v !== village)
        : [...prev.villages, village],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Memuat data laporan...</p>
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
                <FiFileText className="w-8 h-8 mr-3 text-blue-600" />
                Generator Laporan Desa
              </h1>
              <p className="mt-2 text-gray-600">
                Buat dan kelola laporan untuk mendukung kebijakan pemerintah
                pusat
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                className="flex items-center"
                onClick={() => setShowCustomBuilder(true)}
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Buat Laporan Custom
              </Button>
              <Button variant="primary" className="flex items-center">
                <FiSettings className="w-4 h-4 mr-2" />
                Pengaturan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("templates")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "templates"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Template Laporan
              </button>
              <button
                onClick={() => setActiveTab("generator")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "generator"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Generator Custom
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "history"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Riwayat Laporan
              </button>
            </nav>
          </div>
        </div>

        {/* Template Laporan Tab */}
        {activeTab === "templates" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <FiFilter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Filter:
                  </span>
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value as ReportCategory)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="demografis">Demografis</option>
                  <option value="ekonomi">Ekonomi</option>
                  <option value="pendidikan">Pendidikan</option>
                  <option value="infrastruktur">Infrastruktur</option>
                  <option value="komprehensif">Komprehensif</option>
                </select>
                <select
                  value={periodFilter}
                  onChange={(e) =>
                    setPeriodFilter(e.target.value as ReportPeriod)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Periode</option>
                  <option value="bulanan">Bulanan</option>
                  <option value="triwulan">Triwulan</option>
                  <option value="tahunan">Tahunan</option>
                </select>
              </div>
            </div>

            {/* Template Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${getCategoryColor(
                          template.category
                        )}`}
                      >
                        {getCategoryIcon(template.category)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={template.type === "standar" ? "success" : "info"}
                      size="sm"
                    >
                      {template.type === "standar" ? "Standar" : "Custom"}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Periode:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {template.frequency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium text-gray-900 uppercase">
                        {template.format}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Terakhir dibuat:</span>
                      <span className="font-medium text-gray-900">
                        {template.lastGenerated
                          ? formatDate(template.lastGenerated)
                          : "Belum pernah"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Bagian yang disertakan:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.slice(0, 3).map((section) => {
                        const sectionInfo = availableSections.find(
                          (s) => s.id === section
                        );
                        return (
                          <span
                            key={section}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                          >
                            {sectionInfo?.name || section}
                          </span>
                        );
                      })}
                      {template.sections.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          +{template.sections.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleGenerateReport(template.id)}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Membuat...
                        </>
                      ) : (
                        <>
                          <FiDownload className="w-4 h-4 mr-2" />
                          Buat Laporan
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FiEye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FiEdit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Generator Tab */}
        {activeTab === "generator" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiSettings className="w-6 h-6 mr-3 text-blue-600" />
                Pembuat Laporan Custom
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Laporan
                    </label>
                    <input
                      type="text"
                      value={customBuilder.name}
                      onChange={(e) =>
                        setCustomBuilder((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama laporan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={customBuilder.description}
                      onChange={(e) =>
                        setCustomBuilder((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Deskripsi laporan (opsional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        value={customBuilder.dateRange.start}
                        onChange={(e) =>
                          setCustomBuilder((prev) => ({
                            ...prev,
                            dateRange: {
                              ...prev.dateRange,
                              start: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Selesai
                      </label>
                      <input
                        type="date"
                        value={customBuilder.dateRange.end}
                        onChange={(e) =>
                          setCustomBuilder((prev) => ({
                            ...prev,
                            dateRange: {
                              ...prev.dateRange,
                              end: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format Output
                    </label>
                    <select
                      value={customBuilder.format}
                      onChange={(e) =>
                        setCustomBuilder((prev) => ({
                          ...prev,
                          format: e.target.value as "pdf" | "excel" | "csv",
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeCharts"
                        checked={customBuilder.includeCharts}
                        onChange={(e) =>
                          setCustomBuilder((prev) => ({
                            ...prev,
                            includeCharts: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="includeCharts"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Sertakan grafik dan visualisasi
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeComparison"
                        checked={customBuilder.includeComparison}
                        onChange={(e) =>
                          setCustomBuilder((prev) => ({
                            ...prev,
                            includeComparison: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="includeComparison"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Sertakan perbandingan antar desa
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section Selection */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pilih Bagian Laporan
                    </label>
                    <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {availableSections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <div key={section.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={section.id}
                              checked={customBuilder.selectedSections.includes(
                                section.id
                              )}
                              onChange={() => toggleSection(section.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={section.id}
                              className="ml-3 flex items-center text-sm text-gray-700"
                            >
                              <Icon className="w-4 h-4 mr-2 text-gray-500" />
                              {section.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pilih Desa (Kosongkan untuk semua desa)
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {availableVillages.map((village) => (
                        <div key={village} className="flex items-center">
                          <input
                            type="checkbox"
                            id={village}
                            checked={customBuilder.villages.includes(village)}
                            onChange={() => toggleVillage(village)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={village}
                            className="ml-3 text-sm text-gray-700"
                          >
                            {village}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <Button variant="secondary">
                  <FiSave className="w-4 h-4 mr-2" />
                  Simpan Template
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCustomReportGenerate}
                  disabled={
                    isGenerating ||
                    !customBuilder.name ||
                    customBuilder.selectedSections.length === 0
                  }
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Membuat Laporan...
                    </>
                  ) : (
                    <>
                      <FiDownload className="w-4 h-4 mr-2" />
                      Buat Laporan
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Preview Section */}
            {customBuilder.selectedSections.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Preview Laporan
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nama:</span>
                      <span className="font-medium">
                        {customBuilder.name || "Belum diisi"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Periode:</span>
                      <span className="font-medium">
                        {customBuilder.dateRange.start &&
                        customBuilder.dateRange.end
                          ? `${customBuilder.dateRange.start} - ${customBuilder.dateRange.end}`
                          : "Belum dipilih"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium uppercase">
                        {customBuilder.format}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bagian:</span>
                      <span className="font-medium">
                        {customBuilder.selectedSections.length} bagian
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Desa:</span>
                      <span className="font-medium">
                        {customBuilder.villages.length === 0
                          ? "Semua desa"
                          : `${customBuilder.villages.length} desa`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FiClock className="w-5 h-5 mr-2 text-blue-600" />
                  Riwayat Laporan
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Laporan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Periode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dibuat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ukuran
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportHistory.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {report.templateName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.period}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(report.generatedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.format}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.size}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={getStatusColor(report.status)}
                            size="sm"
                          >
                            {getStatusLabel(report.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {report.status === "completed" && (
                              <div title="Download">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDownloadFromHistory(report)
                                  }
                                >
                                  <FiDownload className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            <div title="Lihat Detail">
                              <Button variant="ghost" size="sm">
                                <FiEye className="w-4 h-4" />
                              </Button>
                            </div>
                            <div title="Bagikan">
                              <Button variant="ghost" size="sm">
                                <FiShare2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div title="Hapus">
                              <Button variant="ghost" size="sm">
                                <FiTrash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Custom Report Builder Modal */}
        {showCustomBuilder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Pembuat Laporan Custom
                </h2>
                <button
                  onClick={() => setShowCustomBuilder(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Templates */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Template Cepat
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setCustomBuilder((prev) => ({
                            ...prev,
                            name: "Laporan Demografis Lengkap",
                            selectedSections: [
                              "data-umum",
                              "kependudukan",
                              "demografis-detail",
                              "analisis-tingkat1",
                            ],
                            format: "pdf",
                          }));
                        }}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          Laporan Demografis Lengkap
                        </div>
                        <div className="text-sm text-gray-600">
                          Data umum, kependudukan, dan analisis demografis
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setCustomBuilder((prev) => ({
                            ...prev,
                            name: "Laporan Ekonomi & Prediksi",
                            selectedSections: [
                              "ekonomi",
                              "analisis-tingkat2",
                              "prediksi",
                            ],
                            format: "excel",
                          }));
                        }}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          Laporan Ekonomi & Prediksi
                        </div>
                        <div className="text-sm text-gray-600">
                          Data ekonomi dengan analisis prediktif
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setCustomBuilder((prev) => ({
                            ...prev,
                            name: "Laporan Validasi Kualitas",
                            selectedSections: ["quality-check", "perbandingan"],
                            format: "excel",
                          }));
                        }}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          Laporan Validasi Kualitas
                        </div>
                        <div className="text-sm text-gray-600">
                          Validasi data dan perbandingan antar desa
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setCustomBuilder((prev) => ({
                            ...prev,
                            name: "Laporan Komprehensif Semua Data",
                            selectedSections: availableSections.map(
                              (s) => s.id
                            ),
                            format: "pdf",
                          }));
                        }}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          Laporan Komprehensif Semua Data
                        </div>
                        <div className="text-sm text-gray-600">
                          Semua data dan analisis untuk evaluasi menyeluruh
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Manual Configuration */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Konfigurasi Manual
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Laporan
                        </label>
                        <input
                          type="text"
                          value={customBuilder.name}
                          onChange={(e) =>
                            setCustomBuilder((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Masukkan nama laporan"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dari Tanggal
                          </label>
                          <input
                            type="date"
                            value={customBuilder.dateRange.start}
                            onChange={(e) =>
                              setCustomBuilder((prev) => ({
                                ...prev,
                                dateRange: {
                                  ...prev.dateRange,
                                  start: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sampai Tanggal
                          </label>
                          <input
                            type="date"
                            value={customBuilder.dateRange.end}
                            onChange={(e) =>
                              setCustomBuilder((prev) => ({
                                ...prev,
                                dateRange: {
                                  ...prev.dateRange,
                                  end: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Format Output
                        </label>
                        <select
                          value={customBuilder.format}
                          onChange={(e) =>
                            setCustomBuilder((prev) => ({
                              ...prev,
                              format: e.target.value as "pdf" | "excel" | "csv",
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="pdf">
                            PDF - Untuk laporan formal
                          </option>
                          <option value="excel">
                            Excel - Untuk analisis data
                          </option>
                          <option value="csv">CSV - Untuk data mentah</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Sections Preview */}
                {customBuilder.selectedSections.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Bagian yang Dipilih:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {customBuilder.selectedSections.map((sectionId) => {
                        const section = availableSections.find(
                          (s) => s.id === sectionId
                        );
                        return (
                          <span
                            key={sectionId}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                          >
                            {section?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={() => setShowCustomBuilder(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCustomReportGenerate}
                  disabled={
                    isGenerating ||
                    !customBuilder.name ||
                    customBuilder.selectedSections.length === 0
                  }
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Membuat...
                    </>
                  ) : (
                    <>
                      <FiDownload className="w-4 h-4 mr-2" />
                      Buat Laporan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiFileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Template
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportTemplates.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Laporan Selesai
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportHistory.filter((r) => r.status === "completed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Sedang Diproses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    reportHistory.filter((r) => r.status === "processing")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiDownload className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    reportHistory.filter((r) => {
                      const reportDate = new Date(r.generatedAt);
                      const currentDate = new Date();
                      return (
                        reportDate.getMonth() === currentDate.getMonth() &&
                        reportDate.getFullYear() === currentDate.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <FiTarget className="w-5 h-5 mr-2" />
            Panduan Penggunaan Generator Laporan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiFileText className="w-4 h-4 mr-2 text-blue-600" />
                Template Standar
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Gunakan template standar untuk laporan rutin yang sesuai dengan
                format pemerintah pusat.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Laporan Demografis Bulanan</li>
                <li>• Laporan Ekonomi Triwulan</li>
                <li>• Laporan Komprehensif Tahunan</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiSettings className="w-4 h-4 mr-2 text-green-600" />
                Generator Custom
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Buat laporan sesuai kebutuhan khusus dengan memilih bagian dan
                periode tertentu.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Pilih bagian yang diinginkan</li>
                <li>• Tentukan periode laporan</li>
                <li>• Pilih format output</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiDownload className="w-4 h-4 mr-2 text-purple-600" />
                Format Export
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Pilih format yang sesuai dengan kebutuhan penggunaan laporan.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• PDF: Laporan formal dan presentasi</li>
                <li>• Excel: Analisis dan perhitungan</li>
                <li>• CSV: Data mentah untuk import</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-start">
              <FiCheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Tips Penggunaan:
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  Untuk laporan yang akan dikirim ke pemerintah pusat, gunakan
                  template standar. Untuk analisis internal atau kebutuhan
                  khusus, gunakan generator custom dengan memilih bagian yang
                  relevan saja untuk menghemat waktu pemrosesan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiRefreshCw className="w-5 h-5 mr-2 text-green-600" />
            Aktivitas Terbaru
          </h3>

          <div className="space-y-4">
            {reportHistory.slice(0, 5).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status === "completed" && (
                      <FiCheckCircle className="w-4 h-4" />
                    )}
                    {report.status === "processing" && (
                      <FiClock className="w-4 h-4" />
                    )}
                    {report.status === "failed" && <FiX className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {report.templateName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(report.generatedAt)} • {report.format} •{" "}
                      {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(report.status)} size="sm">
                    {getStatusLabel(report.status)}
                  </Badge>
                  {report.status === "completed" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadFromHistory(report)}
                    >
                      <FiDownload className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Generator Laporan Desa - Sistem Pendataan Desa Kabupaten Bone
            Bolango
          </p>
          <p className="mt-1">
            Mendukung pengambilan keputusan strategis pemerintah pusat melalui
            data yang akurat dan terpercaya
          </p>
        </div>
      </div>
    </div>
  );
}
