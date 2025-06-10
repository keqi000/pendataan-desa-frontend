import { Card, Button, Badge } from "@/app/admin/components";
import {
  FaChartLine,
  FaBuilding,
  FaUsers,
  FaExclamationTriangle,
  FaFileAlt,
  FaMap,
  FaCog,
  FaCheckCircle,
  FaEye,
  FaClock,
  FaUpload,
  FaArrowUp,
  FaCalendarAlt,
  FaGraduationCap,
  FaIndustry,
  FaRoad,
  FaHome,
  FaMapMarkerAlt,
  FaChartBar,
  FaChartPie,
  FaArrowDown,
  FaMinus,
} from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Dashboard Admin Kecamatan Tibawa
            </h1>
            <p className="text-blue-100 text-lg">
              Sistem Informasi Pendataan Desa Terintegrasi
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Terakhir diperbarui:{" "}
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex space-x-3">
            <Button
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <FaFileAlt className="w-4 h-4 mr-2" />
              Lihat Laporan
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <FaUpload className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats Cards - 5 Kategori Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Data Umum Desa */}
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Desa
              </p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-blue-600 mt-1">
                <span className="inline-flex items-center">
                  <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                  3,245 Ha total
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBuilding className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Data Kependudukan */}
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Penduduk
              </p>
              <p className="text-3xl font-bold text-gray-900">45,231</p>
              <p className="text-xs text-green-600 mt-1">
                <span className="inline-flex items-center">
                  <FaArrowUp className="w-3 h-3 mr-1" />
                  +1.2% dari tahun lalu
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaUsers className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Data Pendidikan */}
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Fasilitas Pendidikan
              </p>
              <p className="text-3xl font-bold text-gray-900">47</p>
              <p className="text-xs text-purple-600 mt-1">
                <span className="inline-flex items-center">
                  <FaGraduationCap className="w-3 h-3 mr-1" />
                  PAUD-SMP
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaGraduationCap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Data Ekonomi */}
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                UMKM Aktif
              </p>
              <p className="text-3xl font-bold text-gray-900">234</p>
              <p className="text-xs text-yellow-600 mt-1">
                <span className="inline-flex items-center">
                  <FaIndustry className="w-3 h-3 mr-1" />
                  15 sektor usaha
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaIndustry className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        {/* Data Infrastruktur */}
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Infrastruktur
              </p>
              <p className="text-3xl font-bold text-gray-900">89%</p>
              <p className="text-xs text-red-600 mt-1">
                <span className="inline-flex items-center">
                  <FaRoad className="w-3 h-3 mr-1" />
                  Kondisi baik
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaRoad className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Stats Cards - Combined */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">
              Kepala Keluarga
            </h4>
            <FaHome className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12,456</p>
          <p className="text-xs text-gray-500 mt-1">Rata-rata 3.6 anggota/KK</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Warga Miskin</h4>
            <FaExclamationTriangle className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2,134</p>
          <p className="text-xs text-gray-500 mt-1">4.7% dari total penduduk</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Jalan Desa</h4>
            <FaRoad className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">156 Km</p>
          <p className="text-xs text-gray-500 mt-1">78% kondisi baik</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Luas Wilayah</h4>
            <FaMapMarkerAlt className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">3,245</p>
          <p className="text-xs text-gray-500 mt-1">Hektar total</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Dusun/RT/RW</h4>
            <FaHome className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-gray-500 mt-1">
            Total wilayah administratif
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Usia Sekolah</h4>
            <FaGraduationCap className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">8,234</p>
          <p className="text-xs text-gray-500 mt-1">Anak usia 7-18 tahun</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Sektor Usaha</h4>
            <FaIndustry className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <p className="text-xs text-gray-500 mt-1">Jenis bidang usaha</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Jembatan</h4>
            <FaRoad className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">23</p>
          <p className="text-xs text-gray-500 mt-1">Unit infrastruktur</p>
        </Card>
      </div>

      {/* Comprehensive Data Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Data Quality Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Kelengkapan Data per Kategori
            </h3>

            <div className="space-y-4">
              {[
                {
                  category: "Data Umum Desa",
                  completion: 95,
                  total: 12,
                  updated: "2 jam lalu",
                  icon: <FaBuilding className="w-5 h-5 text-blue-600" />,
                  color: "blue",
                },
                {
                  category: "Data Kependudukan",
                  completion: 87,
                  total: 45231,
                  updated: "4 jam lalu",
                  icon: <FaUsers className="w-5 h-5 text-green-600" />,
                  color: "green",
                },
                {
                  category: "Data Pendidikan",
                  completion: 92,
                  total: 47,
                  updated: "6 jam lalu",
                  icon: <FaGraduationCap className="w-5 h-5 text-purple-600" />,
                  color: "purple",
                },
                {
                  category: "Data Ekonomi",
                  completion: 78,
                  total: 234,
                  updated: "1 hari lalu",
                  icon: <FaIndustry className="w-5 h-5 text-yellow-600" />,
                  color: "yellow",
                },
                {
                  category: "Data Infrastruktur",
                  completion: 65,
                  total: 156,
                  updated: "2 hari lalu",
                  icon: <FaRoad className="w-5 h-5 text-red-600" />,
                  color: "red",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.category}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.total.toLocaleString()} records • Update:{" "}
                        {item.updated}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {item.completion}%
                      </p>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            item.completion >= 90
                              ? "bg-green-500"
                              : item.completion >= 80
                              ? "bg-blue-500"
                              : item.completion >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${item.completion}%` }}
                        ></div>
                      </div>
                    </div>

                    <Badge
                      variant={
                        item.completion >= 90
                          ? "success"
                          : item.completion >= 80
                          ? "info"
                          : item.completion >= 70
                          ? "warning"
                          : "danger"
                      }
                    >
                      {item.completion >= 90
                        ? "✨ Excellent"
                        : item.completion >= 80
                        ? "✅ Good"
                        : item.completion >= 70
                        ? "⚠️ Warning"
                        : "❌ Poor"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Trend Analysis */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Tren Data 6 Bulan Terakhir
            </h3>

            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
              <div className="text-center">
                <FaChartLine className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600 font-medium">
                  Tren Pertumbuhan Data Komprehensif
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Menampilkan tren semua kategori data
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-600">
                  <FaArrowUp className="w-3 h-3" />
                  <span className="text-sm font-medium">+5.2%</span>
                </div>
                <p className="text-xs text-gray-500">Desa</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-green-600">
                  <FaArrowUp className="w-3 h-3" />
                  <span className="text-sm font-medium">+1.2%</span>
                </div>
                <p className="text-xs text-gray-500">Penduduk</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-purple-600">
                  <FaArrowUp className="w-3 h-3" />
                  <span className="text-sm font-medium">+8.5%</span>
                </div>
                <p className="text-xs text-gray-500">Pendidikan</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-600">
                  <FaArrowUp className="w-3 h-3" />
                  <span className="text-sm font-medium">+12.3%</span>
                </div>
                <p className="text-xs text-gray-500">UMKM</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-red-600">
                  <FaArrowDown className="w-3 h-3" />
                  <span className="text-sm font-medium">-2.1%</span>
                </div>
                <p className="text-xs text-gray-500">Jalan Rusak</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Alert System - Data yang Perlu Perhatian */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Perlu Perhatian
            </h3>

            <div className="space-y-4">
              {[
                {
                  alert: "Data infrastruktur Desa Molosipat belum lengkap",
                  category: "Infrastruktur",
                  priority: "high",
                  time: "2 jam lalu",
                  icon: <FaRoad className="w-4 h-4 text-red-600" />,
                },
                {
                  alert: "Update data UMKM Desa Pentadio tertunda",
                  category: "Ekonomi",
                  priority: "medium",
                  time: "1 hari lalu",
                  icon: <FaIndustry className="w-4 h-4 text-yellow-600" />,
                },
                {
                  alert: "Verifikasi data penduduk Desa Hulawa",
                  category: "Kependudukan",
                  priority: "low",
                  time: "2 hari lalu",
                  icon: <FaUsers className="w-4 h-4 text-blue-600" />,
                },
                {
                  alert: "Data fasilitas pendidikan perlu update",
                  category: "Pendidikan",
                  priority: "medium",
                  time: "3 hari lalu",
                  icon: <FaGraduationCap className="w-4 h-4 text-purple-600" />,
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-l-gray-200"
                  style={{
                    borderLeftColor:
                      alert.priority === "high"
                        ? "#ef4444"
                        : alert.priority === "medium"
                        ? "#f59e0b"
                        : "#6b7280",
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {alert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.alert}
                    </p>
                    <p className="text-xs text-gray-500">{alert.category}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      alert.priority === "high"
                        ? "bg-red-500"
                        : alert.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button variant="ghost" size="sm" className="w-full">
                Lihat Semua Alert →
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Recent Data Updates by Category */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Update Data Terbaru per Kategori
          </h3>
          <Button variant="ghost" size="sm">
            Lihat Semua →
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Desa
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Kategori Data
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Jenis Update
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Jumlah Record
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Waktu Update
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                {
                  village: "Desa Tibawa",
                  category: "Kependudukan",
                  updateType: "Data Penduduk Baru",
                  records: 47,
                  status: "verified",
                  time: "2 jam lalu",
                  operator: "Ahmad Sari",
                  icon: <FaUsers className="w-4 h-4 text-green-600" />,
                  color: "green",
                },
                {
                  village: "Desa Bongomeme",
                  category: "Ekonomi",
                  updateType: "Data UMKM",
                  records: 12,
                  status: "pending",
                  time: "4 jam lalu",
                  operator: "Siti Nurhaliza",
                  icon: <FaIndustry className="w-4 h-4 text-yellow-600" />,
                  color: "yellow",
                },
                {
                  village: "Desa Hulawa",
                  category: "Infrastruktur",
                  updateType: "Kondisi Jalan",
                  records: 8,
                  status: "verified",
                  time: "6 jam lalu",
                  operator: "Budi Santoso",
                  icon: <FaRoad className="w-4 h-4 text-red-600" />,
                  color: "red",
                },
                {
                  village: "Desa Pentadio",
                  category: "Pendidikan",
                  updateType: "Fasilitas Sekolah",
                  records: 3,
                  status: "review",
                  time: "1 hari lalu",
                  operator: "Maria Ulfa",
                  icon: <FaGraduationCap className="w-4 h-4 text-purple-600" />,
                  color: "purple",
                },
                {
                  village: "Desa Molosipat",
                  category: "Umum Desa",
                  updateType: "Batas Wilayah",
                  records: 1,
                  status: "pending",
                  time: "2 hari lalu",
                  operator: "Andi Wijaya",
                  icon: <FaBuilding className="w-4 h-4 text-blue-600" />,
                  color: "blue",
                },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaBuilding className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.village}
                        </p>
                        <p className="text-xs text-gray-500">
                          Operator: {item.operator}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${item.color}-100 text-${item.color}-800`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {item.updateType}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {item.records} records
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        item.status === "verified"
                          ? "success"
                          : item.status === "pending"
                          ? "warning"
                          : "info"
                      }
                    >
                      {item.status === "verified" ? (
                        <>
                          <FaCheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </>
                      ) : item.status === "pending" ? (
                        <>
                          <FaClock className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      ) : (
                        <>
                          <FaEye className="w-3 h-3 mr-1" />
                          Review
                        </>
                      )}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {item.time}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FaEye className="w-4 h-4 mr-1" />
                        Lihat
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700"
                      >
                        <FaCheckCircle className="w-4 h-4 mr-1" />
                        Verifikasi
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Data Summary by Village */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Ringkasan Data per Desa
          </h3>
          <div className="flex space-x-2">
            <Button size="sm" variant="primary">
              Semua Kategori
            </Button>
            <Button size="sm" variant="ghost">
              Kependudukan
            </Button>
            <Button size="sm" variant="ghost">
              Ekonomi
            </Button>
            <Button size="sm" variant="ghost">
              Infrastruktur
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Desa Tibawa",
              population: 4567,
              area: 245,
              umkm: 23,
              schools: 5,
              roads: "89% baik",
              completion: 95,
              status: "excellent",
            },
            {
              name: "Desa Bongomeme",
              population: 3892,
              area: 312,
              umkm: 18,
              schools: 4,
              roads: "76% baik",
              completion: 87,
              status: "good",
            },
            {
              name: "Desa Hulawa",
              population: 4123,
              area: 289,
              umkm: 21,
              schools: 4,
              roads: "92% baik",
              completion: 92,
              status: "excellent",
            },
            {
              name: "Desa Pentadio",
              population: 3456,
              area: 198,
              umkm: 15,
              schools: 3,
              roads: "67% baik",
              completion: 78,
              status: "warning",
            },
            {
              name: "Desa Molosipat",
              population: 2987,
              area: 234,
              umkm: 12,
              schools: 3,
              roads: "54% baik",
              completion: 65,
              status: "poor",
            },
            {
              name: "Desa Lainnya",
              population: 26206,
              area: 1967,
              umkm: 145,
              schools: 28,
              roads: "81% baik",
              completion: 83,
              status: "good",
            },
          ].map((village, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{village.name}</h4>
                <Badge
                  variant={
                    village.status === "excellent"
                      ? "success"
                      : village.status === "good"
                      ? "info"
                      : village.status === "warning"
                      ? "warning"
                      : "danger"
                  }
                >
                  {village.completion}%
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <FaUsers className="w-3 h-3 text-green-600" />
                    <span className="text-gray-600">Penduduk</span>
                  </span>
                  <span className="font-medium text-gray-600">
                    {village.population.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-3 h-3 text-blue-600" />
                    <span className="text-gray-600">Luas</span>
                  </span>
                  <span className="font-medium text-gray-600">
                    {village.area} Ha
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <FaIndustry className="w-3 h-3 text-yellow-600" />
                    <span className="text-gray-600">UMKM</span>
                  </span>
                  <span className="font-medium text-gray-600">
                    {village.umkm}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <FaGraduationCap className="w-3 h-3 text-purple-600" />
                    <span className="text-gray-600">Sekolah</span>
                  </span>
                  <span className="font-medium text-gray-600">
                    {village.schools}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <FaRoad className="w-3 h-3 text-red-600" />
                    <span className="text-gray-600">Jalan</span>
                  </span>
                  <span className="font-medium text-gray-600">
                    {village.roads}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Kelengkapan Data</span>
                  <span className="font-medium text-gray-600">
                    {village.completion}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      village.completion >= 90
                        ? "bg-green-500"
                        : village.completion >= 80
                        ? "bg-blue-500"
                        : village.completion >= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${village.completion}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full text-blue-600 hover:text-blue-700"
                >
                  <FaEye className="w-3 h-3 mr-1" />
                  Lihat Detail
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
