"use client";

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiMapPin,
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiEye,
  FiEdit,
} from "react-icons/fi";

interface DesaData {
  id: string;
  namaDesa: string;
  kecamatan: string;
  luasWilayah: number;
  jumlahPenduduk: number;
  koordinat: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
  status: "complete" | "incomplete" | "pending" | "error";
  completenessPercentage: number;
  dataModules: {
    dataUmum: number;
    kependudukan: number;
    pendidikan: number;
    ekonomi: number;
    infrastruktur: number;
  };
  operator: string;
  totalKK: number;
  jumlahDusun: number;
  jumlahRT: number;
  jumlahRW: number;
}

const DaftarDesaPage = () => {
  const [desaList, setDesaList] = useState<DesaData[]>([]);
  const [filteredDesa, setFilteredDesa] = useState<DesaData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("nama");
  const [loading, setLoading] = useState(true);
  const [selectedDesa, setSelectedDesa] = useState<DesaData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data sesuai dengan proposal - data desa di Kabupaten Gorontalo
  const mockDesaData: DesaData[] = [
    {
      id: "1",
      namaDesa: "Tibawa",
      kecamatan: "Tibawa",
      luasWilayah: 15.5,
      jumlahPenduduk: 2450,
      koordinat: { lat: 0.5547, lng: 123.0581 },
      lastUpdate: "2025-01-15T10:30:00Z",
      status: "complete",
      completenessPercentage: 95,
      dataModules: {
        dataUmum: 100,
        kependudukan: 98,
        pendidikan: 90,
        ekonomi: 85,
        infrastruktur: 92,
      },
      operator: "Ahmad Sutrisno",
      totalKK: 650,
      jumlahDusun: 4,
      jumlahRT: 12,
      jumlahRW: 4,
    },
    {
      id: "2",
      namaDesa: "Bulango Selatan",
      kecamatan: "Bulango Selatan",
      luasWilayah: 22.3,
      jumlahPenduduk: 3200,
      koordinat: { lat: 0.6123, lng: 123.1234 },
      lastUpdate: "2025-01-14T15:45:00Z",
      status: "incomplete",
      completenessPercentage: 72,
      dataModules: {
        dataUmum: 100,
        kependudukan: 85,
        pendidikan: 60,
        ekonomi: 70,
        infrastruktur: 45,
      },
      operator: "Siti Rahmawati",
      totalKK: 850,
      jumlahDusun: 5,
      jumlahRT: 15,
      jumlahRW: 5,
    },
    {
      id: "3",
      namaDesa: "Batudaa Pantai",
      kecamatan: "Batudaa Pantai",
      luasWilayah: 18.7,
      jumlahPenduduk: 1890,
      koordinat: { lat: 0.4987, lng: 123.2456 },
      lastUpdate: "2025-01-13T09:20:00Z",
      status: "pending",
      completenessPercentage: 45,
      dataModules: {
        dataUmum: 80,
        kependudukan: 50,
        pendidikan: 30,
        ekonomi: 40,
        infrastruktur: 25,
      },
      operator: "Budi Santoso",
      totalKK: 480,
      jumlahDusun: 3,
      jumlahRT: 9,
      jumlahRW: 3,
    },
    {
      id: "4",
      namaDesa: "Limboto Barat",
      kecamatan: "Limboto Barat",
      luasWilayah: 12.8,
      jumlahPenduduk: 2780,
      koordinat: { lat: 0.5789, lng: 123.3678 },
      lastUpdate: "2025-01-15T14:15:00Z",
      status: "complete",
      completenessPercentage: 88,
      dataModules: {
        dataUmum: 100,
        kependudukan: 95,
        pendidikan: 80,
        ekonomi: 85,
        infrastruktur: 80,
      },
      operator: "Dewi Kusuma",
      totalKK: 720,
      jumlahDusun: 4,
      jumlahRT: 14,
      jumlahRW: 4,
    },
    {
      id: "5",
      namaDesa: "Telaga Biru",
      kecamatan: "Telaga Biru",
      luasWilayah: 25.4,
      jumlahPenduduk: 4150,
      koordinat: { lat: 0.6234, lng: 123.4567 },
      lastUpdate: "2025-01-12T11:30:00Z",
      status: "error",
      completenessPercentage: 25,
      dataModules: {
        dataUmum: 60,
        kependudukan: 20,
        pendidikan: 15,
        ekonomi: 30,
        infrastruktur: 0,
      },
      operator: "Andi Pratama",
      totalKK: 1100,
      jumlahDusun: 6,
      jumlahRT: 18,
      jumlahRW: 6,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDesaList(mockDesaData);
      setFilteredDesa(mockDesaData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = desaList.filter(
      (desa) =>
        desa.namaDesa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desa.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desa.operator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter((desa) => desa.status === statusFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "nama":
          return a.namaDesa.localeCompare(b.namaDesa);
        case "completeness":
          return b.completenessPercentage - a.completenessPercentage;
        case "lastUpdate":
          return (
            new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
          );
        case "penduduk":
          return b.jumlahPenduduk - a.jumlahPenduduk;
        default:
          return 0;
      }
    });

    setFilteredDesa(filtered);
  }, [searchTerm, statusFilter, sortBy, desaList]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      complete: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: FiCheckCircle,
        text: "Lengkap",
      },
      incomplete: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: FiAlertCircle,
        text: "Tidak Lengkap",
      },
      pending: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: FiClock,
        text: "Menunggu",
      },
      error: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: FiXCircle,
        text: "Error",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}
      >
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const getCompletenessColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    if (percentage >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleViewDetail = (desa: DesaData) => {
    setSelectedDesa(desa);
    setShowDetailModal(true);
  };

  const exportData = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat data desa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Monitoring Desa
            </h1>
            <p className="text-gray-600 mt-2">
              Sistem Informasi Pendataan Desa Terintegrasi - Kabupaten Gorontalo
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiDownload className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiMapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Desa</p>
              <p className="text-2xl font-bold text-gray-900">
                {desaList.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Data Lengkap</p>
              <p className="text-2xl font-bold text-gray-900">
                {desaList.filter((d) => d.status === "complete").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Perlu Update</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  desaList.filter(
                    (d) => d.status === "incomplete" || d.status === "pending"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Penduduk
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {desaList
                  .reduce((sum, desa) => sum + desa.jumlahPenduduk, 0)
                  .toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari desa, kecamatan, atau operator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="complete">Lengkap</option>
                <option value="incomplete">Tidak Lengkap</option>
                <option value="pending">Menunggu</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="nama">Nama Desa</option>
              <option value="completeness">Kelengkapan Data</option>
              <option value="lastUpdate">Update Terakhir</option>
              <option value="penduduk">Jumlah Penduduk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desa / Kecamatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Penduduk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Kelengkapan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modul Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Terakhir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDesa.map((desa) => (
                <tr
                  key={desa.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {desa.namaDesa}
                      </div>
                      <div className="text-sm text-gray-500">
                        Kec. {desa.kecamatan}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        <FiMapPin className="inline w-3 h-3 mr-1" />
                        {desa.luasWilayah} km² • {desa.jumlahDusun} Dusun •{" "}
                        {desa.jumlahRW} RW • {desa.jumlahRT} RT
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <FiUsers className="w-4 h-4 mr-2 text-gray-400" />
                        {desa.jumlahPenduduk.toLocaleString("id-ID")} jiwa
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {desa.totalKK.toLocaleString("id-ID")} KK
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      {getStatusBadge(desa.status)}
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getCompletenessColor(
                              desa.completenessPercentage
                            )}`}
                            style={{ width: `${desa.completenessPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {desa.completenessPercentage}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Umum:</span>
                        <span
                          className={`font-medium ${
                            desa.dataModules.dataUmum >= 90
                              ? "text-green-600"
                              : desa.dataModules.dataUmum >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {desa.dataModules.dataUmum}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Penduduk:</span>
                        <span
                          className={`font-medium ${
                            desa.dataModules.kependudukan >= 90
                              ? "text-green-600"
                              : desa.dataModules.kependudukan >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {desa.dataModules.kependudukan}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Pendidikan:</span>
                        <span
                          className={`font-medium ${
                            desa.dataModules.pendidikan >= 90
                              ? "text-green-600"
                              : desa.dataModules.pendidikan >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {desa.dataModules.pendidikan}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Ekonomi:</span>
                        <span
                          className={`font-medium ${
                            desa.dataModules.ekonomi >= 90
                              ? "text-green-600"
                              : desa.dataModules.ekonomi >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {desa.dataModules.ekonomi}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between col-span-2">
                        <span className="text-gray-600">Infrastruktur:</span>
                        <span
                          className={`font-medium ${
                            desa.dataModules.infrastruktur >= 90
                              ? "text-green-600"
                              : desa.dataModules.infrastruktur >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {desa.dataModules.infrastruktur}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(desa.lastUpdate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{desa.operator}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewDetail(desa)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                        title="Lihat Detail"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                        title="Edit Data"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDesa.length === 0 && (
          <div className="text-center py-12">
            <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada data desa yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedDesa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedDesa.namaDesa}
                  </h2>
                  <p className="text-gray-600">
                    Kecamatan {selectedDesa.kecamatan}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Data Umum Desa */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Data Umum Desa
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Luas Wilayah:</span>
                      <span className="font-medium">
                        {selectedDesa.luasWilayah} km²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah Dusun:</span>
                      <span className="font-medium">
                        {selectedDesa.jumlahDusun}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah RW:</span>
                      <span className="font-medium">
                        {selectedDesa.jumlahRW}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah RT:</span>
                      <span className="font-medium">
                        {selectedDesa.jumlahRT}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Koordinat:</span>
                      <span className="font-medium">
                        {selectedDesa.koordinat.lat},{" "}
                        {selectedDesa.koordinat.lng}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Data Kependudukan */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Data Kependudukan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Penduduk:</span>
                      <span className="font-medium">
                        {selectedDesa.jumlahPenduduk.toLocaleString("id-ID")}{" "}
                        jiwa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total KK:</span>
                      <span className="font-medium">
                        {selectedDesa.totalKK.toLocaleString("id-ID")} KK
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rata-rata per KK:</span>
                      <span className="font-medium">
                        {Math.round(
                          selectedDesa.jumlahPenduduk / selectedDesa.totalKK
                        )}{" "}
                        jiwa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kepadatan:</span>
                      <span className="font-medium">
                        {Math.round(
                          selectedDesa.jumlahPenduduk / selectedDesa.luasWilayah
                        )}{" "}
                        jiwa/km²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Kelengkapan Data */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Status Kelengkapan Data
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Status Keseluruhan:
                      </span>
                      {getStatusBadge(selectedDesa.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Kelengkapan:
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getCompletenessColor(
                              selectedDesa.completenessPercentage
                            )}`}
                            style={{
                              width: `${selectedDesa.completenessPercentage}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {selectedDesa.completenessPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operator & Update */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Informasi Pengelola
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operator:</span>
                      <span className="font-medium">
                        {selectedDesa.operator}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Update Terakhir:</span>
                      <span className="font-medium">
                        {formatDate(selectedDesa.lastUpdate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Modul Data */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Detail Kelengkapan Modul Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedDesa.dataModules).map(
                    ([key, value]) => {
                      const moduleNames = {
                        dataUmum: "Data Umum Desa",
                        kependudukan: "Data Kependudukan",
                        pendidikan: "Data Pendidikan",
                        ekonomi: "Data Ekonomi",
                        infrastruktur: "Data Infrastruktur",
                      };

                      const moduleDescriptions = {
                        dataUmum:
                          "Nama, luas wilayah, koordinat geografis, jumlah dusun/RT/RW",
                        kependudukan:
                          "Jenis kelamin, usia, agama, pekerjaan, pendidikan, status pernikahan, migrasi, kepala keluarga",
                        pendidikan: "Fasilitas pendidikan PAUD hingga SMP",
                        ekonomi:
                          "Mata pencaharian, UMKM, hasil pertanian, warga miskin, pasar",
                        infrastruktur: "Kondisi jalan dan jembatan",
                      };

                      return (
                        <div
                          key={key}
                          className="bg-white p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {moduleNames[key as keyof typeof moduleNames]}
                            </h4>
                            <span
                              className={`text-sm font-bold ${
                                value >= 90
                                  ? "text-green-600"
                                  : value >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {value}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${getCompletenessColor(
                                value
                              )}`}
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">
                            {
                              moduleDescriptions[
                                key as keyof typeof moduleDescriptions
                              ]
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Analisis Data */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiTrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Analisis & Rekomendasi
                </h3>
                <div className="space-y-2 text-sm">
                  {selectedDesa.completenessPercentage >= 90 && (
                    <div className="flex items-start space-x-2">
                      <FiCheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">
                        Data desa sudah sangat lengkap dan siap mendukung
                        implementasi kebijakan pemerintah pusat.
                      </p>
                    </div>
                  )}

                  {selectedDesa.completenessPercentage < 90 &&
                    selectedDesa.completenessPercentage >= 70 && (
                      <div className="flex items-start space-x-2">
                        <FiAlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">
                          Data desa cukup lengkap, namun perlu melengkapi
                          beberapa modul untuk optimalisasi analisis demografis
                          dan proyeksi kebutuhan pembangunan.
                        </p>
                      </div>
                    )}

                  {selectedDesa.completenessPercentage < 70 && (
                    <div className="flex items-start space-x-2">
                      <FiXCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">
                        Data desa masih kurang lengkap. Diperlukan upaya
                        intensif untuk melengkapi data guna mendukung
                        pengambilan keputusan dan implementasi kebijakan
                        pemerintah pusat.
                      </p>
                    </div>
                  )}

                  {/* Rekomendasi berdasarkan modul yang kurang */}
                  {Object.entries(selectedDesa.dataModules).filter(
                    ([_, value]) => value < 80
                  ).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="font-medium text-gray-900 mb-2">
                        Prioritas Perbaikan:
                      </p>
                      <ul className="space-y-1">
                        {Object.entries(selectedDesa.dataModules)
                          .filter(([_, value]) => value < 80)
                          .sort(([_, a], [__, b]) => a - b)
                          .map(([key, value]) => {
                            const moduleNames = {
                              dataUmum: "Data Umum Desa",
                              kependudukan: "Data Kependudukan",
                              pendidikan: "Data Pendidikan",
                              ekonomi: "Data Ekonomi",
                              infrastruktur: "Data Infrastruktur",
                            };
                            return (
                              <li
                                key={key}
                                className="text-gray-600 text-xs flex items-center"
                              >
                                <span className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></span>
                                {moduleNames[key as keyof typeof moduleNames]} (
                                {value}%)
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <FiEdit className="w-4 h-4 mr-2" />
                  Edit Data
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
                  <FiDownload className="w-4 h-4 mr-2" />
                  Export Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>
              Menampilkan {filteredDesa.length} dari {desaList.length} desa
            </span>
            <span>•</span>
            <span>Update terakhir: {formatDate(new Date().toISOString())}</span>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="text-xs">
              Sistem Informasi Pendataan Desa Terintegrasi - Kabupaten Gorontalo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarDesaPage;
