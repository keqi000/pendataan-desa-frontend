"use client";

import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiTrendingUp,
  FiDatabase,
  FiShield,
  FiTarget,
  FiActivity,
  FiBarChart,
  FiUsers,
  FiBook,
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiClock,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../../components";

interface QualityMetrics {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  validity: number;
  overall: number;
}

interface DataQualityIssue {
  id: string;
  type: "error" | "warning" | "info";
  category: "demografis" | "pendidikan" | "ekonomi" | "infrastruktur" | "umum";
  field: string;
  description: string;
  desaAffected: string[];
  severity: "high" | "medium" | "low";
  suggestion: string;
  count: number;
}

interface DesaQualityStatus {
  id: string;
  namaDesa: string;
  kecamatan: string;
  lastUpdate: string;
  operator: string;
  metrics: QualityMetrics;
  issues: DataQualityIssue[];
  status: "excellent" | "good" | "fair" | "poor";
}

type QualityFilter = "all" | "excellent" | "good" | "fair" | "poor";
type CategoryFilter =
  | "all"
  | "demografis"
  | "pendidikan"
  | "ekonomi"
  | "infrastruktur"
  | "umum";

export default function DataQualityPage() {
  const [loading, setLoading] = useState(true);
  const [desaQualityData, setDesaQualityData] = useState<DesaQualityStatus[]>(
    []
  );
  const [globalMetrics, setGlobalMetrics] = useState<QualityMetrics>({
    completeness: 0,
    accuracy: 0,
    consistency: 0,
    timeliness: 0,
    validity: 0,
    overall: 0,
  });
  const [qualityIssues, setQualityIssues] = useState<DataQualityIssue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [qualityFilter, setQualityFilter] = useState<QualityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [selectedDesa, setSelectedDesa] = useState<string | null>(null);

  // Mock data - dalam implementasi nyata akan diambil dari API Laravel
  // Ganti bagian useEffect dengan kode berikut:

  useEffect(() => {
    const fetchQualityData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock global metrics
      setGlobalMetrics({
        completeness: 87.5,
        accuracy: 92.3,
        consistency: 89.1,
        timeliness: 78.6,
        validity: 94.2,
        overall: 88.3,
      });

      // Mock quality issues - definisikan dulu
      const mockQualityIssues: DataQualityIssue[] = [
        {
          id: "1",
          type: "error",
          category: "demografis",
          field: "Jumlah Penduduk",
          description:
            "Jumlah penduduk tidak sesuai dengan penjumlahan laki-laki dan perempuan",
          desaAffected: ["Tibawa", "Bulango Selatan"],
          severity: "high",
          suggestion:
            "Periksa kembali data input jumlah penduduk berdasarkan jenis kelamin",
          count: 2,
        },
        {
          id: "2",
          type: "warning",
          category: "pendidikan",
          field: "Fasilitas Pendidikan",
          description:
            "Rasio fasilitas pendidikan per 1000 penduduk di bawah standar nasional",
          desaAffected: ["Bone Pantai", "Bulango Selatan", "Tibawa Tengah"],
          severity: "medium",
          suggestion: "Evaluasi kebutuhan penambahan fasilitas pendidikan",
          count: 3,
        },
        {
          id: "3",
          type: "error",
          category: "ekonomi",
          field: "Mata Pencaharian",
          description:
            "Total mata pencaharian melebihi jumlah penduduk usia kerja",
          desaAffected: ["Tibawa"],
          severity: "high",
          suggestion:
            "Verifikasi data mata pencaharian dengan jumlah penduduk usia kerja",
          count: 1,
        },
        {
          id: "4",
          type: "warning",
          category: "infrastruktur",
          field: "Kondisi Jalan",
          description: "Persentase jalan rusak melebihi 30% dari total jalan",
          desaAffected: ["Bulango Selatan", "Bone Pantai"],
          severity: "medium",
          suggestion: "Prioritaskan program perbaikan infrastruktur jalan",
          count: 2,
        },
        {
          id: "5",
          type: "info",
          category: "umum",
          field: "Update Data",
          description: "Data belum diupdate dalam 30 hari terakhir",
          desaAffected: ["Tibawa Tengah", "Bulango Utara"],
          severity: "low",
          suggestion: "Lakukan update data secara berkala sesuai jadwal",
          count: 2,
        },
        {
          id: "6",
          type: "warning",
          category: "demografis",
          field: "Struktur Usia",
          description:
            "Rasio ketergantungan penduduk di atas rata-rata nasional",
          desaAffected: ["Bone Pantai"],
          severity: "medium",
          suggestion:
            "Analisis lebih lanjut untuk program pemberdayaan ekonomi",
          count: 1,
        },
      ];

      // Set quality issues
      setQualityIssues(mockQualityIssues);

      // Mock desa quality data - sekarang bisa menggunakan mockQualityIssues
      setDesaQualityData([
        {
          id: "1",
          namaDesa: "Tibawa",
          kecamatan: "Tibawa",
          lastUpdate: "2025-01-15T10:30:00Z",
          operator: "Ahmad Fauzi",
          metrics: {
            completeness: 95.2,
            accuracy: 88.5,
            consistency: 92.1,
            timeliness: 85.3,
            validity: 96.8,
            overall: 91.6,
          },
          issues: [
            mockQualityIssues.find((issue) => issue.id === "1")!,
            mockQualityIssues.find((issue) => issue.id === "3")!,
          ],
          status: "good",
        },
        {
          id: "2",
          namaDesa: "Bulango Selatan",
          kecamatan: "Bulango Selatan",
          lastUpdate: "2025-01-14T14:20:00Z",
          operator: "Siti Nurhaliza",
          metrics: {
            completeness: 78.3,
            accuracy: 85.2,
            consistency: 81.7,
            timeliness: 72.1,
            validity: 89.4,
            overall: 81.3,
          },
          issues: [
            mockQualityIssues.find((issue) => issue.id === "1")!,
            mockQualityIssues.find((issue) => issue.id === "2")!,
            mockQualityIssues.find((issue) => issue.id === "4")!,
          ],
          status: "fair",
        },
        {
          id: "3",
          namaDesa: "Bone Pantai",
          kecamatan: "Bone Pantai",
          lastUpdate: "2025-01-13T09:15:00Z",
          operator: "Muhammad Rizki",
          metrics: {
            completeness: 92.7,
            accuracy: 94.8,
            consistency: 90.3,
            timeliness: 88.9,
            validity: 93.1,
            overall: 91.9,
          },
          issues: [
            mockQualityIssues.find((issue) => issue.id === "2")!,
            mockQualityIssues.find((issue) => issue.id === "4")!,
            mockQualityIssues.find((issue) => issue.id === "6")!,
          ],
          status: "good",
        },
        {
          id: "4",
          namaDesa: "Tibawa Tengah",
          kecamatan: "Tibawa",
          lastUpdate: "2024-12-20T16:45:00Z",
          operator: "Fatimah Zahra",
          metrics: {
            completeness: 68.9,
            accuracy: 76.3,
            consistency: 74.1,
            timeliness: 45.2,
            validity: 82.7,
            overall: 69.4,
          },
          issues: [
            mockQualityIssues.find((issue) => issue.id === "2")!,
            mockQualityIssues.find((issue) => issue.id === "5")!,
          ],
          status: "poor",
        },
      ]);

      setLoading(false);
    };

    fetchQualityData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "fair":
        return "text-yellow-600 bg-yellow-100";
      case "poor":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excellent":
        return "Sangat Baik";
      case "good":
        return "Baik";
      case "fair":
        return "Cukup";
      case "poor":
        return "Perlu Perbaikan";
      default:
        return "Unknown";
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <FiAlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <FiAlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <FiCheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <FiCheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "demografis":
        return <FiUsers className="w-4 h-4" />;
      case "pendidikan":
        return <FiBook className="w-4 h-4" />;
      case "ekonomi":
        return <FiDollarSign className="w-4 h-4" />;
      case "infrastruktur":
        return <FiHome className="w-4 h-4" />;
      case "umum":
        return <FiDatabase className="w-4 h-4" />;
      default:
        return <FiDatabase className="w-4 h-4" />;
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return "text-green-600";
    if (value >= 80) return "text-blue-600";
    if (value >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredDesaData = desaQualityData.filter((desa) => {
    const matchesSearch =
      desa.namaDesa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desa.kecamatan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuality =
      qualityFilter === "all" || desa.status === qualityFilter;
    return matchesSearch && matchesQuality;
  });

  const filteredIssues = qualityIssues.filter((issue) => {
    return categoryFilter === "all" || issue.category === categoryFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Memuat data kualitas...</p>
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
                <FiShield className="w-8 h-8 mr-3 text-blue-600" />
                Data Quality Check
              </h1>
              <p className="mt-2 text-gray-600">
                Validasi dan konsistensi data desa untuk mendukung implementasi
                kebijakan pemerintah pusat
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Laporan
              </Button>
              <Button variant="primary" className="flex items-center">
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Global Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Kelengkapan</p>
                <p
                  className={`text-2xl font-bold ${getMetricColor(
                    globalMetrics.completeness
                  )}`}
                >
                  {globalMetrics.completeness.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiDatabase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${globalMetrics.completeness}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Akurasi</p>
                <p
                  className={`text-2xl font-bold ${getMetricColor(
                    globalMetrics.accuracy
                  )}`}
                >
                  {globalMetrics.accuracy.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiTarget className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${globalMetrics.accuracy}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Konsistensi</p>
                <p
                  className={`text-2xl font-bold ${getMetricColor(
                    globalMetrics.consistency
                  )}`}
                >
                  {globalMetrics.consistency.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiBarChart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${globalMetrics.consistency}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Ketepatan Waktu
                </p>
                <p
                  className={`text-2xl font-bold ${getMetricColor(
                    globalMetrics.timeliness
                  )}`}
                >
                  {globalMetrics.timeliness.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${globalMetrics.timeliness}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Validitas</p>
                <p
                  className={`text-2xl font-bold ${getMetricColor(
                    globalMetrics.validity
                  )}`}
                >
                  {globalMetrics.validity.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <FiCheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${globalMetrics.validity}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Kualitas Keseluruhan
                </p>
                <p
                  className={`text-2xl font-bold ${getMetricColor(
                    globalMetrics.overall
                  )}`}
                >
                  {globalMetrics.overall.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${globalMetrics.overall}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quality Issues */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issues Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Masalah Kualitas Data
                </h2>
                <div className="flex space-x-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) =>
                      setCategoryFilter(e.target.value as CategoryFilter)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="demografis">Demografis</option>
                    <option value="pendidikan">Pendidikan</option>
                    <option value="ekonomi">Ekonomi</option>
                    <option value="infrastruktur">Infrastruktur</option>
                    <option value="umum">Umum</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getCategoryIcon(issue.category)}
                            <h3 className="font-medium text-gray-900">
                              {issue.field}
                            </h3>
                            <Badge
                              variant={
                                issue.severity === "high"
                                  ? "danger"
                                  : issue.severity === "medium"
                                  ? "warning"
                                  : "info"
                              }
                              size="sm"
                            >
                              {issue.severity === "high"
                                ? "Tinggi"
                                : issue.severity === "medium"
                                ? "Sedang"
                                : "Rendah"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {issue.description}
                          </p>
                          <div className="text-xs text-gray-500 mb-2">
                            <strong>Desa terdampak:</strong>{" "}
                            {issue.desaAffected.join(", ")} ({issue.count} desa)
                          </div>
                          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                            <strong>Saran:</strong> {issue.suggestion}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desa Quality Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Status Kualitas Data per Desa
                </h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Cari desa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={qualityFilter}
                    onChange={(e) =>
                      setQualityFilter(e.target.value as QualityFilter)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Semua Status</option>
                    <option value="excellent">Sangat Baik</option>
                    <option value="good">Baik</option>
                    <option value="fair">Cukup</option>
                    <option value="poor">Perlu Perbaikan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredDesaData.map((desa) => (
                  <div
                    key={desa.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {desa.namaDesa}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {desa.kecamatan} • Operator: {desa.operator}
                        </p>
                        <p className="text-xs text-gray-400">
                          Update terakhir: {formatDate(desa.lastUpdate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={getStatusColor(desa.status)}
                          size="sm"
                        >
                          {getStatusLabel(desa.status)}
                        </Badge>
                        <p
                          className={`text-lg font-bold ${getMetricColor(
                            desa.metrics.overall
                          )}`}
                        >
                          {desa.metrics.overall.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Kelengkapan</p>
                        <p
                          className={`text-sm font-medium ${getMetricColor(
                            desa.metrics.completeness
                          )}`}
                        >
                          {desa.metrics.completeness.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Akurasi</p>
                        <p
                          className={`text-sm font-medium ${getMetricColor(
                            desa.metrics.accuracy
                          )}`}
                        >
                          {desa.metrics.accuracy.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Konsistensi</p>
                        <p
                          className={`text-sm font-medium ${getMetricColor(
                            desa.metrics.consistency
                          )}`}
                        >
                          {desa.metrics.consistency.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Ketepatan</p>
                        <p
                          className={`text-sm font-medium ${getMetricColor(
                            desa.metrics.timeliness
                          )}`}
                        >
                          {desa.metrics.timeliness.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Validitas</p>
                        <p
                          className={`text-sm font-medium ${getMetricColor(
                            desa.metrics.validity
                          )}`}
                        >
                          {desa.metrics.validity.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {desa.issues.length > 0 && (
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-xs text-gray-500 mb-2">
                          Masalah yang ditemukan:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {desa.issues.map((issue) => (
                            <span
                              key={issue.id}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 text-red-700"
                            >
                              {getIssueIcon(issue.type)}
                              <span className="ml-1">{issue.field}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDesa(desa.id)}
                        className="flex items-center"
                      >
                        <FiEye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Quality Insights */}
          <div className="space-y-6">
            {/* Quality Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ringkasan Kualitas
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <FiCheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      Data Berkualitas Baik
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {
                      desaQualityData.filter(
                        (d) => d.status === "excellent" || d.status === "good"
                      ).length
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <FiAlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      Perlu Perhatian
                    </span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">
                    {desaQualityData.filter((d) => d.status === "fair").length}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <FiAlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">
                      Perlu Perbaikan
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-600">
                    {desaQualityData.filter((d) => d.status === "poor").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Issue Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kategori Masalah
              </h3>

              <div className="space-y-3">
                {[
                  {
                    category: "demografis",
                    label: "Demografis",
                    icon: FiUsers,
                    count: qualityIssues.filter(
                      (i) => i.category === "demografis"
                    ).length,
                  },
                  {
                    category: "pendidikan",
                    label: "Pendidikan",
                    icon: FiBook,
                    count: qualityIssues.filter(
                      (i) => i.category === "pendidikan"
                    ).length,
                  },
                  {
                    category: "ekonomi",
                    label: "Ekonomi",
                    icon: FiDollarSign,
                    count: qualityIssues.filter((i) => i.category === "ekonomi")
                      .length,
                  },
                  {
                    category: "infrastruktur",
                    label: "Infrastruktur",
                    icon: FiHome,
                    count: qualityIssues.filter(
                      (i) => i.category === "infrastruktur"
                    ).length,
                  },
                  {
                    category: "umum",
                    label: "Umum",
                    icon: FiDatabase,
                    count: qualityIssues.filter((i) => i.category === "umum")
                      .length,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.category}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <Badge
                        variant={item.count > 0 ? "warning" : "success"}
                        size="sm"
                      >
                        {item.count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiTarget className="w-5 h-5 mr-2 text-blue-600" />
                Rekomendasi Perbaikan
              </h3>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Prioritas Tinggi
                  </h4>
                  <p className="text-xs text-gray-600">
                    Perbaiki inkonsistensi data demografis dan ekonomi yang
                    dapat mempengaruhi akurasi analisis kebijakan pemerintah
                    pusat.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Pelatihan Operator
                  </h4>
                  <p className="text-xs text-gray-600">
                    Lakukan pelatihan berkala untuk operator desa dalam validasi
                    dan input data yang akurat.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Sistem Validasi
                  </h4>
                  <p className="text-xs text-gray-600">
                    Implementasikan sistem validasi otomatis untuk mencegah
                    kesalahan input data di masa depan.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Monitoring Berkala
                  </h4>
                  <p className="text-xs text-gray-600">
                    Lakukan monitoring kualitas data secara berkala untuk
                    memastikan konsistensi dan akurasi data.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Completeness Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tren Kelengkapan Data
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minggu ini</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      87%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minggu lalu</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      82%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bulan lalu</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">
                      78%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <FiTrendingUp className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800 font-medium">
                    Peningkatan 5% dari minggu lalu
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Aksi Cepat
              </h3>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiRefreshCw className="w-4 h-4 mr-2" />
                  Validasi Ulang Semua Data
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  Export Laporan Kualitas
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FiActivity className="w-4 h-4 mr-2" />
                  Lihat Log Aktivitas
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Standards Info */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiDatabase className="w-5 h-5 mr-2 text-blue-600" />
            Standar Kualitas Data untuk Kebijakan Pemerintah Pusat
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Kelengkapan Data
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Minimal 85% field data harus terisi untuk mendukung analisis
                kebijakan yang akurat.
              </p>
              <div className="text-xs text-blue-600">
                Target: ≥85% • Saat ini: {globalMetrics.completeness.toFixed(1)}
                %
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Akurasi Data</h4>
              <p className="text-sm text-gray-600 mb-2">
                Data harus sesuai dengan kondisi riil di lapangan untuk
                validitas kebijakan.
              </p>
              <div className="text-xs text-blue-600">
                Target: ≥90% • Saat ini: {globalMetrics.accuracy.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Konsistensi Data
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Data antar kategori harus konsisten dan tidak bertentangan satu
                sama lain.
              </p>
              <div className="text-xs text-blue-600">
                Target: ≥88% • Saat ini: {globalMetrics.consistency.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Ketepatan Waktu
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Data harus diupdate secara berkala sesuai jadwal untuk relevansi
                kebijakan.
              </p>
              <div className="text-xs text-blue-600">
                Target: ≥80% • Saat ini: {globalMetrics.timeliness.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Validitas Data
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Data harus memenuhi format dan aturan validasi yang telah
                ditetapkan.
              </p>
              <div className="text-xs text-blue-600">
                Target: ≥92% • Saat ini: {globalMetrics.validity.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
