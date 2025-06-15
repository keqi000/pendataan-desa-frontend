"use client";

import React, { useState, useEffect } from "react";
import {
  FiSettings,
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiBell,
  FiDatabase,
  FiShield,
  FiHelpCircle,
  FiBook,
  FiSave,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiTrash2,
  FiCheck,
  FiX,
  FiInfo,
  FiAlertTriangle,
  FiCheckCircle,
  FiMessageSquare,
  FiFileText,
  FiVideo,
  FiHeadphones,
  FiMonitor,
  FiSmartphone,
  FiWifi,
  FiHardDrive,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiHome,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../components";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin_kecamatan" | "operator_desa";
  village: string;
  kecamatan: string;
  lastLogin: string;
  profilePicture?: string;
  isActive: boolean;
}

interface SystemSettings {
  autoBackup: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
  emailNotifications: boolean;
  smsNotifications: boolean;
  dataRetentionDays: number;
  maxFileSize: number; // MB
  allowedFileTypes: string[];
  maintenanceMode: boolean;
  systemLanguage: "id" | "en";
  timezone: string;
}

interface NotificationSettings {
  dataUpdate: boolean;
  systemMaintenance: boolean;
  securityAlerts: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  emailDigest: boolean;
}

interface FAQItem {
  id: string;
  category: "umum" | "data_entry" | "laporan" | "teknis" | "keamanan";
  question: string;
  answer: string;
  isExpanded?: boolean;
}

interface HelpGuide {
  id: string;
  title: string;
  description: string;
  category: "pemula" | "lanjutan" | "troubleshooting";
  steps: string[];
  videoUrl?: string;
}

type SettingsTab =
  | "profile"
  | "system"
  | "notifications"
  | "security"
  | "faq"
  | "help";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(
    null
  );
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings | null>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [helpGuides, setHelpGuides] = useState<HelpGuide[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [searchFAQ, setSearchFAQ] = useState("");
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>("all");

  useEffect(() => {
    const fetchSettingsData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user profile
      setUserProfile({
        id: "1",
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@tibawa.go.id",
        phone: "081234567890",
        role: "operator_desa",
        village: "Tibawa",
        kecamatan: "Tibawa",
        lastLogin: "2025-01-15T10:30:00Z",
        isActive: true,
      });

      // Mock system settings
      setSystemSettings({
        autoBackup: true,
        backupFrequency: "daily",
        emailNotifications: true,
        smsNotifications: false,
        dataRetentionDays: 365,
        maxFileSize: 10,
        allowedFileTypes: [
          ".pdf",
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".jpg",
          ".png",
        ],
        maintenanceMode: false,
        systemLanguage: "id",
        timezone: "Asia/Makassar",
      });

      // Mock notification settings
      setNotificationSettings({
        dataUpdate: true,
        systemMaintenance: true,
        securityAlerts: true,
        weeklyReports: true,
        monthlyReports: true,
        emailDigest: false,
      });

      // Mock FAQ items
      setFaqItems([
        {
          id: "1",
          category: "umum",
          question: "Apa itu Sistem Informasi Pendataan Desa Terintegrasi?",
          answer:
            "Sistem Informasi Pendataan Desa Terintegrasi adalah platform berbasis web yang dirancang untuk mengelola data desa secara digital dan terpusat. Sistem ini memungkinkan pemerintah desa untuk menginput, mengolah, dan menganalisis data kependudukan, ekonomi, pendidikan, dan infrastruktur untuk mendukung implementasi kebijakan pemerintah pusat di Kabupaten Gorontalo.",
        },
        {
          id: "2",
          category: "data_entry",
          question: "Bagaimana cara menginput data penduduk baru?",
          answer:
            "Untuk menginput data penduduk baru: 1) Masuk ke menu 'Data Kependudukan', 2) Klik tombol 'Tambah Penduduk Baru', 3) Isi formulir dengan lengkap (nama, NIK, jenis kelamin, usia, agama, pekerjaan, pendidikan, status pernikahan), 4) Pastikan data sudah benar, 5) Klik 'Simpan'. Data akan otomatis tersinkronisasi dengan sistem kecamatan.",
        },
        {
          id: "3",
          category: "data_entry",
          question: "Bagaimana cara mengupdate data ekonomi desa?",
          answer:
            "Untuk mengupdate data ekonomi: 1) Buka menu 'Data Ekonomi', 2) Pilih kategori yang ingin diupdate (UMKM, Mata Pencaharian, Hasil Pertanian, dll), 3) Klik 'Edit' pada data yang ingin diubah, 4) Masukkan data terbaru, 5) Simpan perubahan. Sistem akan otomatis menghitung ulang statistik dan analisis terkait.",
        },
        {
          id: "4",
          category: "laporan",
          question: "Bagaimana cara membuat laporan bulanan?",
          answer:
            "Untuk membuat laporan bulanan: 1) Masuk ke menu 'Laporan', 2) Pilih 'Laporan Bulanan', 3) Tentukan bulan dan tahun, 4) Pilih kategori data yang ingin dilaporkan, 5) Klik 'Generate Laporan', 6) Laporan akan otomatis dibuat dalam format PDF dan dapat diunduh atau dikirim langsung ke kecamatan.",
        },
        {
          id: "5",
          category: "teknis",
          question: "Mengapa data tidak tersimpan?",
          answer:
            "Jika data tidak tersimpan, periksa: 1) Koneksi internet stabil, 2) Semua field wajib sudah diisi, 3) Format data sudah benar (contoh: NIK 16 digit), 4) Ukuran file tidak melebihi batas maksimal, 5) Browser sudah diperbarui. Jika masalah berlanjut, hubungi admin kecamatan atau tim teknis.",
        },
        {
          id: "6",
          category: "teknis",
          question: "Bagaimana cara backup data?",
          answer:
            "Backup data dilakukan otomatis setiap hari. Untuk backup manual: 1) Masuk ke menu 'Pengaturan', 2) Pilih tab 'Sistem', 3) Klik 'Backup Data Sekarang', 4) Tunggu proses selesai, 5) File backup akan tersimpan di server dan dapat diunduh jika diperlukan. Backup otomatis dapat diatur frekuensinya di pengaturan sistem.",
        },
        {
          id: "7",
          category: "keamanan",
          question: "Bagaimana cara mengganti password?",
          answer:
            "Untuk mengganti password: 1) Masuk ke menu 'Pengaturan', 2) Pilih tab 'Keamanan', 3) Klik 'Ubah Password', 4) Masukkan password lama, 5) Masukkan password baru (minimal 8 karakter, kombinasi huruf dan angka), 6) Konfirmasi password baru, 7) Klik 'Simpan'. Password akan langsung aktif dan Anda perlu login ulang.",
        },
        {
          id: "8",
          category: "keamanan",
          question: "Apa yang harus dilakukan jika lupa password?",
          answer:
            "Jika lupa password: 1) Di halaman login, klik 'Lupa Password', 2) Masukkan email yang terdaftar, 3) Cek email untuk link reset password, 4) Klik link dan masukkan password baru, 5) Jika tidak menerima email, hubungi admin kecamatan untuk reset manual. Pastikan email yang digunakan masih aktif dan cek folder spam.",
        },
        {
          id: "9",
          category: "umum",
          question: "Siapa yang dapat mengakses data desa?",
          answer:
            "Akses data desa dibatasi berdasarkan peran: 1) Operator Desa: dapat menginput, mengedit, dan melihat data desanya sendiri, 2) Admin Kecamatan: dapat melihat dan menganalisis data semua desa di kecamatannya, 3) Data sensitif dilindungi dengan enkripsi, 4) Semua aktivitas tercatat dalam log sistem untuk audit keamanan.",
        },
        {
          id: "10",
          category: "laporan",
          question: "Bagaimana cara melihat analisis data tingkat lanjutan?",
          answer:
            "Untuk melihat analisis tingkat lanjutan: 1) Masuk ke menu 'Analisis Data', 2) Pilih 'Analisis Tingkat 2', 3) Pilih kategori analisis (demografis, ekonomi, pendidikan, infrastruktur), 4) Sistem akan menampilkan analisis korelasi, proyeksi, dan rekomendasi kebijakan, 5) Hasil analisis dapat diekspor untuk presentasi atau laporan ke tingkat yang lebih tinggi.",
        },
      ]);

      // Mock help guides
      setHelpGuides([
        {
          id: "1",
          title: "Panduan Dasar Penggunaan Sistem",
          description:
            "Pelajari cara menggunakan sistem informasi desa dari awal",
          category: "pemula",
          steps: [
            "Login ke sistem menggunakan username dan password yang diberikan",
            "Familiarisasi dengan menu utama dan navigasi",
            "Pelajari cara menginput data dasar penduduk",
            "Memahami cara menyimpan dan mengupdate data",
            "Belajar membuat laporan sederhana",
          ],
        },
        {
          id: "2",
          title: "Mengelola Data Kependudukan",
          description: "Cara lengkap mengelola data penduduk desa",
          category: "lanjutan",
          steps: [
            "Buka menu Data Kependudukan dari dashboard utama",
            "Gunakan tombol 'Tambah Penduduk' untuk data baru",
            "Isi semua field yang diperlukan dengan teliti",
            "Gunakan fitur pencarian untuk menemukan data yang sudah ada",
            "Manfaatkan fitur import Excel untuk data dalam jumlah besar",
            "Verifikasi data sebelum menyimpan",
            "Gunakan fitur analisis untuk melihat statistik penduduk",
          ],
        },
        {
          id: "3",
          title: "Membuat Laporan dan Analisis",
          description: "Panduan membuat berbagai jenis laporan",
          category: "lanjutan",
          steps: [
            "Akses menu Laporan dari sidebar",
            "Pilih jenis laporan yang diinginkan",
            "Tentukan periode waktu laporan",
            "Pilih kategori data yang akan dilaporkan",
            "Kustomisasi format laporan sesuai kebutuhan",
            "Generate laporan dan review hasilnya",
            "Download atau kirim laporan ke kecamatan",
          ],
        },
        {
          id: "4",
          title: "Mengatasi Masalah Umum",
          description: "Solusi untuk masalah yang sering terjadi",
          category: "troubleshooting",
          steps: [
            "Periksa koneksi internet jika sistem lambat",
            "Refresh halaman jika data tidak muncul",
            "Clear cache browser jika tampilan bermasalah",
            "Pastikan browser sudah versi terbaru",
            "Logout dan login kembali jika ada error",
            "Hubungi admin jika masalah berlanjut",
          ],
        },
        {
          id: "5",
          title: "Keamanan Data dan Password",
          description: "Menjaga keamanan akun dan data",
          category: "pemula",
          steps: [
            "Gunakan password yang kuat (minimal 8 karakter)",
            "Jangan bagikan password kepada orang lain",
            "Logout setelah selesai menggunakan sistem",
            "Ganti password secara berkala",
            "Laporkan aktivitas mencurigakan ke admin",
            "Backup data penting secara rutin",
          ],
        },
      ]);

      setLoading(false);
    };

    fetchSettingsData();
  }, []);

  const handleSaveProfile = async () => {
    setSaveStatus("saving");

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaveStatus("success");
    setIsEditing(false);

    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const handleSaveSystemSettings = async () => {
    setSaveStatus("saving");

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaveStatus("success");

    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const toggleFAQExpansion = (id: string) => {
    setFaqItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchFAQ.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchFAQ.toLowerCase());
    const matchesCategory =
      selectedFAQCategory === "all" || item.category === selectedFAQCategory;
    return matchesSearch && matchesCategory;
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin_kecamatan":
        return "Admin Kecamatan";
      case "operator_desa":
        return "Operator Desa";
      default:
        return "Unknown";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "umum":
        return <FiInfo className="w-4 h-4" />;
      case "data_entry":
        return <FiDatabase className="w-4 h-4" />;
      case "laporan":
        return <FiFileText className="w-4 h-4" />;
      case "teknis":
        return <FiSettings className="w-4 h-4" />;
      case "keamanan":
        return <FiShield className="w-4 h-4" />;
      default:
        return <FiHelpCircle className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "umum":
        return "Umum";
      case "data_entry":
        return "Input Data";
      case "laporan":
        return "Laporan";
      case "teknis":
        return "Teknis";
      case "keamanan":
        return "Keamanan";
      default:
        return "Lainnya";
    }
  };

  const getGuideIcon = (category: string) => {
    switch (category) {
      case "pemula":
        return <FiBook className="w-4 h-4" />;
      case "lanjutan":
        return <FiMonitor className="w-4 h-4" />;
      case "troubleshooting":
        return <FiAlertTriangle className="w-4 h-4" />;
      default:
        return <FiHelpCircle className="w-4 h-4" />;
    }
  };

  const getGuideLabel = (category: string) => {
    switch (category) {
      case "pemula":
        return "Pemula";
      case "lanjutan":
        return "Lanjutan";
      case "troubleshooting":
        return "Troubleshooting";
      default:
        return "Lainnya";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Memuat pengaturan...</p>
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
                <FiSettings className="w-8 h-8 mr-3 text-blue-600" />
                Pengaturan Sistem
              </h1>
              <p className="mt-2 text-gray-600">
                Kelola profil, pengaturan sistem, dan akses bantuan penggunaan
              </p>
            </div>
            {saveStatus === "success" && (
              <div className="flex items-center text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                <FiCheckCircle className="w-5 h-5 mr-2" />
                Pengaturan berhasil disimpan
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Menu Pengaturan
              </h3>

              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profil Pengguna", icon: FiUser },
                  {
                    id: "system",
                    label: "Pengaturan Sistem",
                    icon: FiSettings,
                  },
                  { id: "notifications", label: "Notifikasi", icon: FiBell },
                  { id: "security", label: "Keamanan", icon: FiShield },
                  { id: "faq", label: "FAQ", icon: FiHelpCircle },
                  { id: "help", label: "Panduan", icon: FiBook },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as SettingsTab)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Info */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                Informasi Sistem
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Versi:</span>
                  <span className="font-medium">v1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Update Terakhir:</span>
                  <span className="font-medium">15 Jan 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge className="text-green-600 bg-green-100" size="sm">
                    Online
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && userProfile && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Profil Pengguna
                    </h2>
                    <Button
                      variant={isEditing ? "secondary" : "primary"}
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center"
                    >
                      <FiEdit className="w-4 h-4 mr-2" />
                      {isEditing ? "Batal" : "Edit Profil"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peran
                      </label>
                      <input
                        type="text"
                        value={getRoleLabel(userProfile.role)}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Desa
                      </label>
                      <input
                        type="text"
                        value={userProfile.village}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kecamatan
                      </label>
                      <input
                        type="text"
                        value={userProfile.kecamatan}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-lg"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Batal
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSaveProfile}
                        disabled={saveStatus === "saving"}
                        className="flex items-center"
                      >
                        {saveStatus === "saving" ? (
                          <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                          <FiSave className="w-4 h-4 mr-2" />
                        )}
                        Simpan Perubahan
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Login History */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Riwayat Login
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FiClock className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Login Terakhir
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(userProfile.lastLogin)}
                          </p>
                        </div>
                      </div>
                      <Badge className="text-green-600 bg-green-100" size="sm">
                        Aktif
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* System Settings Tab */}
            {activeTab === "system" && systemSettings && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Pengaturan Sistem
                    </h2>
                    <Button
                      variant="primary"
                      onClick={handleSaveSystemSettings}
                      disabled={saveStatus === "saving"}
                      className="flex items-center"
                    >
                      {saveStatus === "saving" ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <FiSave className="w-4 h-4 mr-2" />
                      )}
                      Simpan Pengaturan
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Backup Settings */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiHardDrive className="w-5 h-5 mr-2 text-blue-600" />
                        Pengaturan Backup Data
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Backup Otomatis
                            </p>
                            <p className="text-sm text-gray-600">
                              Backup data secara otomatis sesuai jadwal
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={systemSettings.autoBackup}
                              onChange={(e) =>
                                setSystemSettings({
                                  ...systemSettings,
                                  autoBackup: e.target.checked,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frekuensi Backup
                          </label>
                          <select
                            value={systemSettings.backupFrequency}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                backupFrequency: e.target.value as
                                  | "daily"
                                  | "weekly"
                                  | "monthly",
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          >
                            <option value="daily">Harian</option>
                            <option value="weekly">Mingguan</option>
                            <option value="monthly">Bulanan</option>
                          </select>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            variant="secondary"
                            className="flex items-center"
                          >
                            <FiDownload className="w-4 h-4 mr-2" />
                            Backup Sekarang
                          </Button>
                          <Button variant="ghost" className="flex items-center">
                            <FiUpload className="w-4 h-4 mr-2" />
                            Restore Data
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Data Retention */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiDatabase className="w-5 h-5 mr-2 text-green-600" />
                        Penyimpanan Data
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lama Penyimpanan Data (hari)
                          </label>
                          <input
                            type="number"
                            value={systemSettings.dataRetentionDays}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                dataRetentionDays: parseInt(e.target.value),
                              })
                            }
                            min="30"
                            max="3650"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Data akan disimpan selama{" "}
                            {systemSettings.dataRetentionDays} hari
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ukuran File Maksimal (MB)
                          </label>
                          <input
                            type="number"
                            value={systemSettings.maxFileSize}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                maxFileSize: parseInt(e.target.value),
                              })
                            }
                            min="1"
                            max="100"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* System Language */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiMonitor className="w-5 h-5 mr-2 text-purple-600" />
                        Pengaturan Tampilan
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bahasa Sistem
                          </label>
                          <select
                            value={systemSettings.systemLanguage}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                systemLanguage: e.target.value as "id" | "en",
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          >
                            <option value="id">Bahasa Indonesia</option>
                            <option value="en">English</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Zona Waktu
                          </label>
                          <select
                            value={systemSettings.timezone}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                timezone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          >
                            <option value="Asia/Makassar">
                              WITA (Makassar)
                            </option>
                            <option value="Asia/Jakarta">WIB (Jakarta)</option>
                            <option value="Asia/Jayapura">
                              WIT (Jayapura)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Maintenance Mode */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiSettings className="w-5 h-5 mr-2 text-orange-600" />
                        Mode Pemeliharaan
                      </h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            Aktifkan Mode Pemeliharaan
                          </p>
                          <p className="text-sm text-gray-600">
                            Sistem akan tidak dapat diakses oleh pengguna selama
                            pemeliharaan
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemSettings.maintenanceMode}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                maintenanceMode: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && notificationSettings && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Pengaturan Notifikasi
                    </h2>
                    <Button
                      variant="primary"
                      onClick={handleSaveSystemSettings}
                      disabled={saveStatus === "saving"}
                      className="flex items-center"
                    >
                      {saveStatus === "saving" ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <FiSave className="w-4 h-4 mr-2" />
                      )}
                      Simpan Pengaturan
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiMail className="w-5 h-5 mr-2 text-blue-600" />
                        Notifikasi Email
                      </h3>

                      <div className="space-y-4">
                        {[
                          {
                            key: "dataUpdate",
                            label: "Update Data",
                            desc: "Notifikasi saat ada perubahan data penting",
                          },
                          {
                            key: "systemMaintenance",
                            label: "Pemeliharaan Sistem",
                            desc: "Pemberitahuan jadwal pemeliharaan sistem",
                          },
                          {
                            key: "securityAlerts",
                            label: "Peringatan Keamanan",
                            desc: "Alert untuk aktivitas mencurigakan",
                          },
                          {
                            key: "weeklyReports",
                            label: "Laporan Mingguan",
                            desc: "Ringkasan data dan aktivitas mingguan",
                          },
                          {
                            key: "monthlyReports",
                            label: "Laporan Bulanan",
                            desc: "Laporan komprehensif bulanan",
                          },
                          {
                            key: "emailDigest",
                            label: "Ringkasan Email",
                            desc: "Kumpulan notifikasi dalam satu email",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.desc}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={
                                  notificationSettings[
                                    item.key as keyof NotificationSettings
                                  ] as boolean
                                }
                                onChange={(e) =>
                                  setNotificationSettings({
                                    ...notificationSettings,
                                    [item.key]: e.target.checked,
                                  })
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SMS Notifications */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiSmartphone className="w-5 h-5 mr-2 text-green-600" />
                        Notifikasi SMS
                      </h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            Aktifkan SMS
                          </p>
                          <p className="text-sm text-gray-600">
                            Terima notifikasi penting melalui SMS
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemSettings?.smsNotifications}
                            onChange={(e) =>
                              systemSettings &&
                              setSystemSettings({
                                ...systemSettings,
                                smsNotifications: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Pengaturan Keamanan
                  </h2>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiLock className="w-5 h-5 mr-2 text-red-600" />
                        Ubah Password
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Lama
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg pr-12"
                              placeholder="Masukkan password lama"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? (
                                <FiEyeOff className="w-5 h-5" />
                              ) : (
                                <FiEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Baru
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                            placeholder="Masukkan password baru"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Konfirmasi Password Baru
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                            placeholder="Konfirmasi password baru"
                          />
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Syarat Password:
                          </h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Minimal 8 karakter</li>
                            <li>• Kombinasi huruf besar dan kecil</li>
                            <li>• Minimal 1 angka</li>
                            <li>• Minimal 1 karakter khusus (!@#$%^&*)</li>
                          </ul>
                        </div>

                        <Button variant="danger" className="flex items-center">
                          <FiLock className="w-4 h-4 mr-2" />
                          Ubah Password
                        </Button>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiShield className="w-5 h-5 mr-2 text-green-600" />
                        Pengaturan Keamanan Lainnya
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Auto Logout
                            </p>
                            <p className="text-sm text-gray-600">
                              Logout otomatis setelah tidak aktif selama 30
                              menit
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Log Aktivitas
                            </p>
                            <p className="text-sm text-gray-600">
                              Catat semua aktivitas login dan perubahan data
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiMonitor className="w-5 h-5 mr-2 text-purple-600" />
                        Sesi Aktif
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center">
                            <FiMonitor className="w-5 h-5 text-green-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Sesi Saat Ini
                              </p>
                              <p className="text-sm text-gray-600">
                                Chrome - Windows • IP: 192.168.1.100
                              </p>
                            </div>
                          </div>
                          <Badge
                            className="text-green-600 bg-green-100"
                            size="sm"
                          >
                            Aktif
                          </Badge>
                        </div>

                        <Button
                          variant="danger"
                          size="sm"
                          className="flex items-center"
                        >
                          <FiX className="w-4 h-4 mr-2" />
                          Logout Semua Sesi
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Pertanyaan yang Sering Diajukan (FAQ)
                    </h2>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Cari pertanyaan..."
                          value={searchFAQ}
                          onChange={(e) => setSearchFAQ(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <FiHelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      </div>
                      <select
                        value={selectedFAQCategory}
                        onChange={(e) => setSelectedFAQCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Semua Kategori</option>
                        <option value="umum">Umum</option>
                        <option value="data_entry">Input Data</option>
                        <option value="laporan">Laporan</option>
                        <option value="teknis">Teknis</option>
                        <option value="keamanan">Keamanan</option>
                      </select>
                    </div>
                  </div>

                  {/* FAQ Categories */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {[
                      {
                        key: "umum",
                        label: "Umum",
                        count: faqItems.filter((f) => f.category === "umum")
                          .length,
                      },
                      {
                        key: "data_entry",
                        label: "Input Data",
                        count: faqItems.filter(
                          (f) => f.category === "data_entry"
                        ).length,
                      },
                      {
                        key: "laporan",
                        label: "Laporan",
                        count: faqItems.filter((f) => f.category === "laporan")
                          .length,
                      },
                      {
                        key: "teknis",
                        label: "Teknis",
                        count: faqItems.filter((f) => f.category === "teknis")
                          .length,
                      },
                      {
                        key: "keamanan",
                        label: "Keamanan",
                        count: faqItems.filter((f) => f.category === "keamanan")
                          .length,
                      },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedFAQCategory(cat.key)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedFAQCategory === cat.key
                            ? "bg-blue-100 border-blue-300 text-blue-700"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {getCategoryIcon(cat.key)}
                        </div>
                        <p className="text-sm font-medium">{cat.label}</p>
                        <p className="text-xs text-gray-500">{cat.count} FAQ</p>
                      </button>
                    ))}
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-gray-200 rounded-lg"
                      >
                        <button
                          onClick={() => toggleFAQExpansion(faq.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="flex items-center mr-3">
                              {getCategoryIcon(faq.category)}
                              <Badge
                                className="ml-2 text-xs"
                                variant="default"
                                size="sm"
                              >
                                {getCategoryLabel(faq.category)}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-gray-900 text-lg">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="text-gray-400">
                            {faq.isExpanded ? (
                              <FiX className="w-5 h-5" />
                            ) : (
                              <FiHelpCircle className="w-5 h-5" />
                            )}
                          </div>
                        </button>

                        {faq.isExpanded && (
                          <div className="px-6 pb-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <p className="text-gray-700 leading-relaxed text-base">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <FiHelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Tidak ada FAQ yang ditemukan
                      </p>
                      <p className="text-sm text-gray-500">
                        Coba ubah kata kunci pencarian atau kategori
                      </p>
                    </div>
                  )}
                </Card>

                {/* Contact Support */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <FiMessageSquare className="w-5 h-5 mr-2" />
                    Butuh Bantuan Lebih Lanjut?
                  </h3>
                  <p className="text-blue-800 mb-4">
                    Jika Anda tidak menemukan jawaban yang dicari, hubungi tim
                    dukungan kami.
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="primary" className="flex items-center">
                      <FiMail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                    <Button variant="secondary" className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-2" />
                      Telepon Support
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === "help" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Panduan Penggunaan Sistem
                  </h2>

                  {/* Quick Start */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                      <FiCheckCircle className="w-5 h-5 mr-2" />
                      Panduan Cepat untuk Pemula
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          step: "1",
                          title: "Login Sistem",
                          desc: "Masuk dengan akun yang diberikan",
                        },
                        {
                          step: "2",
                          title: "Kenali Menu",
                          desc: "Pelajari navigasi dan menu utama",
                        },
                        {
                          step: "3",
                          title: "Input Data",
                          desc: "Mulai memasukkan data desa",
                        },
                        {
                          step: "4",
                          title: "Buat Laporan",
                          desc: "Generate laporan untuk kecamatan",
                        },
                      ].map((item) => (
                        <div
                          key={item.step}
                          className="bg-white p-4 rounded-lg border border-gray-200"
                        >
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
                            {item.step}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Help Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      {
                        category: "pemula",
                        label: "Panduan Pemula",
                        color: "blue",
                        count: helpGuides.filter((g) => g.category === "pemula")
                          .length,
                      },
                      {
                        category: "lanjutan",
                        label: "Panduan Lanjutan",
                        color: "green",
                        count: helpGuides.filter(
                          (g) => g.category === "lanjutan"
                        ).length,
                      },
                      {
                        category: "troubleshooting",
                        label: "Troubleshooting",
                        color: "red",
                        count: helpGuides.filter(
                          (g) => g.category === "troubleshooting"
                        ).length,
                      },
                    ].map((cat) => (
                      <div
                        key={cat.category}
                        className={`bg-${cat.color}-50 border border-${cat.color}-200 rounded-lg p-4`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold text-${cat.color}-900`}>
                            {cat.label}
                          </h3>
                          <Badge
                            className={`text-${cat.color}-600 bg-${cat.color}-100`}
                            size="sm"
                          >
                            {cat.count} panduan
                          </Badge>
                        </div>
                        <p className={`text-sm text-${cat.color}-700`}>
                          {cat.category === "pemula" &&
                            "Panduan dasar untuk pengguna baru"}
                          {cat.category === "lanjutan" &&
                            "Fitur lanjutan dan tips penggunaan"}
                          {cat.category === "troubleshooting" &&
                            "Solusi masalah umum"}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Help Guides */}
                  <div className="space-y-6">
                    {helpGuides.map((guide) => (
                      <div
                        key={guide.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start">
                            <div className="p-2 bg-blue-100 rounded-lg mr-4">
                              {getGuideIcon(guide.category)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {guide.title}
                              </h3>
                              <p className="text-gray-600 mb-2">
                                {guide.description}
                              </p>
                              <Badge
                                variant={
                                  guide.category === "pemula"
                                    ? "success"
                                    : guide.category === "lanjutan"
                                    ? "info"
                                    : "warning"
                                }
                                size="sm"
                              >
                                {getGuideLabel(guide.category)}
                              </Badge>
                            </div>
                          </div>
                          {guide.videoUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center"
                            >
                              <FiVideo className="w-4 h-4 mr-2" />
                              Video
                            </Button>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Langkah-langkah:
                          </h4>
                          <ol className="space-y-2">
                            {guide.steps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center mr-3 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* System Requirements */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiMonitor className="w-5 h-5 mr-2 text-purple-600" />
                    Persyaratan Sistem
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Perangkat Keras Minimum:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <FiMonitor className="w-4 h-4 mr-2 text-gray-400" />
                          Resolusi layar: 1024x768 px
                        </li>
                        <li className="flex items-center">
                          <FiHardDrive className="w-4 h-4 mr-2 text-gray-400" />
                          RAM: 2GB minimum
                        </li>
                        <li className="flex items-center">
                          <FiWifi className="w-4 h-4 mr-2 text-gray-400" />
                          Koneksi internet stabil
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Browser yang Didukung:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Google Chrome 90+ (Direkomendasikan)</li>
                        <li>• Mozilla Firefox 88+</li>
                        <li>• Microsoft Edge 90+</li>
                        <li>• Safari 14+ (macOS)</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Contact Information */}
                <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
                    <FiHeadphones className="w-5 h-5 mr-2" />
                    Kontak Dukungan Teknis
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-indigo-900 mb-3">
                        Tim Dukungan Kecamatan:
                      </h4>
                      <div className="space-y-2 text-sm text-indigo-800">
                        <div className="flex items-center">
                          <FiMail className="w-4 h-4 mr-2" />
                          support@tibawa.go.id
                        </div>
                        <div className="flex items-center">
                          <FiPhone className="w-4 h-4 mr-2" />
                          (0435) 123-4567
                        </div>
                        <div className="flex items-center">
                          <FiClock className="w-4 h-4 mr-2" />
                          Senin - Jumat, 08:00 - 16:00 WITA
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-indigo-900 mb-3">
                        Alamat Kantor:
                      </h4>
                      <div className="space-y-2 text-sm text-indigo-800">
                        <div className="flex items-start">
                          <FiMapPin className="w-4 h-4 mr-2 mt-0.5" />
                          <span>
                            Kantor Kecamatan Tibawa
                            <br />
                            Jl. Raya Tibawa No. 123
                            <br />
                            Kabupaten Gorontalo, 96181
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="primary" className="flex items-center">
                      <FiMail className="w-4 h-4 mr-2" />
                      Kirim Email
                    </Button>
                    <Button variant="secondary" className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-2" />
                      Hubungi Telepon
                    </Button>
                    <Button variant="ghost" className="flex items-center">
                      <FiDownload className="w-4 h-4 mr-2" />
                      Download Manual PDF
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
