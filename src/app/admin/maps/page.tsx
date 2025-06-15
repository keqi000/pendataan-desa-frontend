"use client";

import React, { useState, useEffect } from "react";
import {
  FiMap,
  FiLayers,
  FiUsers,
  FiDollarSign,
  FiHome,
  FiBook,
  FiMapPin,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiInfo,
  FiEye,
  FiEyeOff,
  FiSettings,
  FiDownload,
  FiRefreshCw,
  FiTarget,
  FiBarChart,
  FiTrendingUp,
  FiNavigation,
  FiCompass,
  FiGrid,
  FiFilter,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../components";

interface VillageData {
  id: string;
  name: string;
  kecamatan: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  area: number; // km²
  population: {
    total: number;
    male: number;
    female: number;
    density: number; // jiwa/km²
  };
  economy: {
    umkm: number;
    poorFamilies: number;
    mainLivelihood: string;
    agricultureProduction: number;
  };
  education: {
    schools: {
      paud: number;
      tk: number;
      sd: number;
      smp: number;
    };
    totalFacilities: number;
  };
  infrastructure: {
    roads: {
      good: number; // km
      fair: number; // km
      poor: number; // km
      total: number; // km
    };
    bridges: number;
    accessibilityIndex: number; // 1-10
  };
  generalInfo: {
    dusun: number;
    rt: number;
    rw: number;
    lastUpdate: string;
  };
}

interface MapLayer {
  id: string;
  name: string;
  category: "demografis" | "ekonomi" | "pendidikan" | "infrastruktur" | "umum";
  icon: React.ComponentType<any>;
  color: string;
  isVisible: boolean;
  description: string;
}

interface AnalysisResult {
  type: "kepadatan" | "aksesibilitas" | "distribusi";
  title: string;
  description: string;
  villages: {
    name: string;
    value: number;
    category: "tinggi" | "sedang" | "rendah";
  }[];
}

type MapView = "satellite" | "terrain" | "roadmap";

export default function MapsPage() {
  const [loading, setLoading] = useState(true);
  const [villageData, setVillageData] = useState<VillageData[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<VillageData | null>(
    null
  );
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [mapView, setMapView] = useState<MapView>("roadmap");
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<
    "kepadatan" | "aksesibilitas" | "distribusi"
  >("kepadatan");
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapCenter, setMapCenter] = useState({ lat: 0.5435, lng: 123.0595 }); // Gorontalo coordinates

  useEffect(() => {
    const fetchMapData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock village data
      setVillageData([
        {
          id: "1",
          name: "Tibawa",
          kecamatan: "Tibawa",
          coordinates: { lat: 0.5435, lng: 123.0595 },
          area: 45.2,
          population: {
            total: 7045,
            male: 3522,
            female: 3523,
            density: 155.8,
          },
          economy: {
            umkm: 89,
            poorFamilies: 234,
            mainLivelihood: "Pertanian",
            agricultureProduction: 1250,
          },
          education: {
            schools: { paud: 3, tk: 2, sd: 5, smp: 2 },
            totalFacilities: 12,
          },
          infrastructure: {
            roads: { good: 25.4, fair: 18.2, poor: 12.8, total: 56.4 },
            bridges: 8,
            accessibilityIndex: 7.2,
          },
          generalInfo: {
            dusun: 8,
            rt: 24,
            rw: 12,
            lastUpdate: "2025-01-15T10:30:00Z",
          },
        },
        {
          id: "2",
          name: "Bulango Selatan",
          kecamatan: "Bulango Selatan",
          coordinates: { lat: 0.52, lng: 123.04 },
          area: 62.8,
          population: {
            total: 4832,
            male: 2416,
            female: 2416,
            density: 76.9,
          },
          economy: {
            umkm: 56,
            poorFamilies: 189,
            mainLivelihood: "Perikanan",
            agricultureProduction: 890,
          },
          education: {
            schools: { paud: 2, tk: 1, sd: 4, smp: 1 },
            totalFacilities: 8,
          },
          infrastructure: {
            roads: { good: 18.5, fair: 22.3, poor: 19.7, total: 60.5 },
            bridges: 5,
            accessibilityIndex: 6.1,
          },
          generalInfo: {
            dusun: 6,
            rt: 18,
            rw: 9,
            lastUpdate: "2025-01-14T14:20:00Z",
          },
        },
        {
          id: "3",
          name: "Bone Pantai",
          kecamatan: "Bone Pantai",
          coordinates: { lat: 0.56, lng: 123.08 },
          area: 38.9,
          population: {
            total: 5234,
            male: 2617,
            female: 2617,
            density: 134.5,
          },
          economy: {
            umkm: 72,
            poorFamilies: 156,
            mainLivelihood: "Perdagangan",
            agricultureProduction: 670,
          },
          education: {
            schools: { paud: 4, tk: 2, sd: 6, smp: 2 },
            totalFacilities: 14,
          },
          infrastructure: {
            roads: { good: 28.9, fair: 15.6, poor: 8.2, total: 52.7 },
            bridges: 12,
            accessibilityIndex: 8.4,
          },
          generalInfo: {
            dusun: 7,
            rt: 21,
            rw: 10,
            lastUpdate: "2025-01-13T09:15:00Z",
          },
        },
        {
          id: "4",
          name: "Tibawa Tengah",
          kecamatan: "Tibawa",
          coordinates: { lat: 0.53, lng: 123.07 },
          area: 29.4,
          population: {
            total: 3456,
            male: 1728,
            female: 1728,
            density: 117.6,
          },
          economy: {
            umkm: 34,
            poorFamilies: 198,
            mainLivelihood: "Pertanian",
            agricultureProduction: 780,
          },
          education: {
            schools: { paud: 2, tk: 1, sd: 3, smp: 1 },
            totalFacilities: 7,
          },
          infrastructure: {
            roads: { good: 12.3, fair: 14.8, poor: 16.2, total: 43.3 },
            bridges: 4,
            accessibilityIndex: 5.8,
          },
          generalInfo: {
            dusun: 5,
            rt: 15,
            rw: 7,
            lastUpdate: "2024-12-20T16:45:00Z",
          },
        },
        {
          id: "5",
          name: "Bulango Utara",
          kecamatan: "Bulango Utara",
          coordinates: { lat: 0.57, lng: 123.03 },
          area: 71.2,
          population: {
            total: 2890,
            male: 1445,
            female: 1445,
            density: 40.6,
          },
          economy: {
            umkm: 28,
            poorFamilies: 145,
            mainLivelihood: "Peternakan",
            agricultureProduction: 1120,
          },
          education: {
            schools: { paud: 1, tk: 1, sd: 2, smp: 1 },
            totalFacilities: 5,
          },
          infrastructure: {
            roads: { good: 15.2, fair: 18.9, poor: 22.4, total: 56.5 },
            bridges: 3,
            accessibilityIndex: 4.9,
          },
          generalInfo: {
            dusun: 4,
            rt: 12,
            rw: 6,
            lastUpdate: "2025-01-10T11:30:00Z",
          },
        },
      ]);

      // Mock map layers
      setMapLayers([
        {
          id: "population",
          name: "Kepadatan Penduduk",
          category: "demografis",
          icon: FiUsers,
          color: "#3B82F6",
          isVisible: true,
          description: "Menampilkan kepadatan penduduk per km² di setiap desa",
        },
        {
          id: "economy",
          name: "Aktivitas Ekonomi",
          category: "ekonomi",
          icon: FiDollarSign,
          color: "#10B981",
          isVisible: false,
          description: "Menampilkan jumlah UMKM dan mata pencaharian utama",
        },
        {
          id: "education",
          name: "Fasilitas Pendidikan",
          category: "pendidikan",
          icon: FiBook,
          color: "#8B5CF6",
          isVisible: false,
          description: "Menampilkan sebaran fasilitas pendidikan",
        },
        {
          id: "infrastructure",
          name: "Kondisi Infrastruktur",
          category: "infrastruktur",
          icon: FiHome,
          color: "#F59E0B",
          isVisible: false,
          description: "Menampilkan kondisi jalan dan aksesibilitas",
        },
        {
          id: "general",
          name: "Batas Administratif",
          category: "umum",
          icon: FiMapPin,
          color: "#6B7280",
          isVisible: true,
          description: "Menampilkan batas desa dan informasi umum",
        },
      ]);

      // Mock analysis results
      setAnalysisResults([
        {
          type: "kepadatan",
          title: "Analisis Kepadatan Penduduk",
          description:
            "Distribusi kepadatan penduduk per km² di wilayah Kabupaten Gorontalo",
          villages: [
            { name: "Tibawa", value: 155.8, category: "tinggi" },
            { name: "Bone Pantai", value: 134.5, category: "tinggi" },
            { name: "Tibawa Tengah", value: 117.6, category: "sedang" },
            { name: "Bulango Selatan", value: 76.9, category: "sedang" },
            { name: "Bulango Utara", value: 40.6, category: "rendah" },
          ],
        },
        {
          type: "aksesibilitas",
          title: "Indeks Aksesibilitas",
          description:
            "Tingkat kemudahan akses berdasarkan kondisi infrastruktur dan jarak",
          villages: [
            { name: "Bone Pantai", value: 8.4, category: "tinggi" },
            { name: "Tibawa", value: 7.2, category: "tinggi" },
            { name: "Bulango Selatan", value: 6.1, category: "sedang" },
            { name: "Tibawa Tengah", value: 5.8, category: "sedang" },
            { name: "Bulango Utara", value: 4.9, category: "rendah" },
          ],
        },
        {
          type: "distribusi",
          title: "Distribusi Fasilitas Umum",
          description:
            "Sebaran fasilitas pendidikan dan ekonomi per 1000 penduduk",
          villages: [
            { name: "Bone Pantai", value: 2.67, category: "tinggi" },
            { name: "Tibawa Tengah", value: 2.03, category: "sedang" },
            { name: "Bulango Utara", value: 1.73, category: "sedang" },
            { name: "Tibawa", value: 1.7, category: "sedang" },
            { name: "Bulango Selatan", value: 1.66, category: "rendah" },
          ],
        },
      ]);

      setLoading(false);
    };

    fetchMapData();
  }, []);

  const toggleLayer = (layerId: string) => {
    setMapLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, isVisible: !layer.isVisible } : layer
      )
    );
  };

  const getVillageMarkerColor = (
    village: VillageData,
    activeLayerId: string
  ) => {
    const activeLayer = mapLayers.find(
      (l) => l.id === activeLayerId && l.isVisible
    );
    if (!activeLayer) return "#6B7280";

    switch (activeLayerId) {
      case "population":
        if (village.population.density > 130) return "#EF4444"; // Red - High
        if (village.population.density > 80) return "#F59E0B"; // Orange - Medium
        return "#10B981"; // Green - Low
      case "economy":
        if (village.economy.umkm > 70) return "#10B981"; // Green - High
        if (village.economy.umkm > 40) return "#F59E0B"; // Orange - Medium
        return "#EF4444"; // Red - Low
      case "education":
        if (village.education.totalFacilities > 10) return "#10B981"; // Green - High
        if (village.education.totalFacilities > 7) return "#F59E0B"; // Orange - Medium
        return "#EF4444"; // Red - Low
      case "infrastructure":
        if (village.infrastructure.accessibilityIndex > 7) return "#10B981"; // Green - High
        if (village.infrastructure.accessibilityIndex > 5) return "#F59E0B"; // Orange - Medium
        return "#EF4444"; // Red - Low
      default:
        return activeLayer.color;
    }
  };

  const getCategoryColor = (category: "tinggi" | "sedang" | "rendah") => {
    switch (category) {
      case "tinggi":
        return "text-green-600 bg-green-100";
      case "sedang":
        return "text-yellow-600 bg-yellow-100";
      case "rendah":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryLabel = (category: "tinggi" | "sedang" | "rendah") => {
    switch (category) {
      case "tinggi":
        return "Tinggi";
      case "sedang":
        return "Sedang";
      case "rendah":
        return "Rendah";
      default:
        return "Unknown";
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getActiveAnalysisData = () => {
    return analysisResults.find((result) => result.type === activeAnalysis);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Memuat peta dan data desa...</p>
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
                <FiMap className="w-8 h-8 mr-3 text-blue-600" />
                Peta Interaktif Desa
              </h1>
              <p className="mt-2 text-gray-600">
                Visualisasi data spasial untuk mendukung kebijakan pemerintah
                pusat di Kabupaten Gorontalo
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                className="flex items-center"
                onClick={() => setShowAnalysisPanel(!showAnalysisPanel)}
              >
                <FiBarChart className="w-4 h-4 mr-2" />
                {showAnalysisPanel ? "Sembunyikan" : "Tampilkan"} Analisis
              </Button>
              <Button variant="primary" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Peta
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Layer Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiLayers className="w-5 h-5 mr-2 text-blue-600" />
                Layer Data
              </h3>

              <div className="space-y-3">
                {mapLayers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={layer.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleLayer(layer.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            layer.isVisible
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {layer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {layer.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleLayer(layer.id)}
                        className={`w-10 h-6 rounded-full transition-colors ${
                          layer.isVisible ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            layer.isVisible ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map View Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiSettings className="w-5 h-5 mr-2 text-blue-600" />
                Tampilan Peta
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Peta
                  </label>
                  <select
                    value={mapView}
                    onChange={(e) => setMapView(e.target.value as MapView)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="roadmap">Peta Jalan</option>
                    <option value="satellite">Satelit</option>
                    <option value="terrain">Topografi</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setZoomLevel((prev) => Math.min(prev + 1, 18))
                    }
                  >
                    <FiZoomIn className="w-4 h-4 mr-1" />
                    Zoom In
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setZoomLevel((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    <FiZoomOut className="w-4 h-4 mr-1" />
                    Zoom Out
                  </Button>
                </div>

                <Button variant="secondary" size="sm" className="w-full">
                  <FiTarget className="w-4 h-4 mr-2" />
                  Reset Posisi
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiTrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Statistik Cepat
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Desa</span>
                  <span className="text-lg font-bold text-gray-900">
                    {villageData.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Penduduk</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatNumber(
                      villageData.reduce(
                        (sum, v) => sum + v.population.total,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Luas Wilayah</span>
                  <span className="text-lg font-bold text-gray-900">
                    {villageData.reduce((sum, v) => sum + v.area, 0).toFixed(1)}{" "}
                    km²
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total UMKM</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatNumber(
                      villageData.reduce((sum, v) => sum + v.economy.umkm, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-[600px] relative bg-gradient-to-br from-blue-50 to-green-50">
                {/* Map Placeholder - In real implementation, this would be Google Maps or Leaflet */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FiMap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Peta Interaktif Kabupaten Gorontalo
                    </p>
                    <p className="text-sm text-gray-500">
                      Zoom Level: {zoomLevel} | View: {mapView}
                    </p>
                  </div>
                </div>

                {/* Village Markers Simulation */}
                <div className="absolute inset-0">
                  {villageData.map((village, index) => {
                    const activeLayer = mapLayers.find((l) => l.isVisible);
                    const markerColor = activeLayer
                      ? getVillageMarkerColor(village, activeLayer.id)
                      : "#6B7280";

                    return (
                      <div
                        key={village.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`,
                        }}
                        onClick={() => setSelectedVillage(village)}
                      >
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                          style={{ backgroundColor: markerColor }}
                        />
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                          {village.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button variant="secondary" size="sm">
                    <FiMaximize className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <FiCompass className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <FiNavigation className="w-4 h-4" />
                  </Button>
                </div>

                {/* Legend */}
                {mapLayers.some((l) => l.isVisible) && (
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Legenda
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Tinggi</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Sedang</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Rendah</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Village Detail Panel */}
            {selectedVillage && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <FiMapPin className="w-6 h-6 mr-2 text-blue-600" />
                    {selectedVillage.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedVillage(null)}
                  >
                    <FiEyeOff className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Data Umum */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <FiGrid className="w-4 h-4 mr-2 text-gray-600" />
                      Data Umum
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kecamatan:</span>
                        <span className="font-medium">
                          {selectedVillage.kecamatan}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Luas Wilayah:</span>
                        <span className="font-medium">
                          {selectedVillage.area} km²
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah Dusun:</span>
                        <span className="font-medium">
                          {selectedVillage.generalInfo.dusun}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah RT:</span>
                        <span className="font-medium">
                          {selectedVillage.generalInfo.rt}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah RW:</span>
                        <span className="font-medium">
                          {selectedVillage.generalInfo.rw}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Update Terakhir:</span>
                        <span className="font-medium text-xs">
                          {formatDate(selectedVillage.generalInfo.lastUpdate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Data Kependudukan */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <FiUsers className="w-4 h-4 mr-2 text-blue-600" />
                      Kependudukan
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Penduduk:</span>
                        <span className="font-medium">
                          {formatNumber(selectedVillage.population.total)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Laki-laki:</span>
                        <span className="font-medium">
                          {formatNumber(selectedVillage.population.male)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Perempuan:</span>
                        <span className="font-medium">
                          {formatNumber(selectedVillage.population.female)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kepadatan:</span>
                        <span className="font-medium">
                          {selectedVillage.population.density.toFixed(1)}{" "}
                          jiwa/km²
                        </span>
                      </div>
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        <Badge
                          className={getCategoryColor(
                            selectedVillage.population.density > 130
                              ? "tinggi"
                              : selectedVillage.population.density > 80
                              ? "sedang"
                              : "rendah"
                          )}
                          size="sm"
                        >
                          Kepadatan{" "}
                          {getCategoryLabel(
                            selectedVillage.population.density > 130
                              ? "tinggi"
                              : selectedVillage.population.density > 80
                              ? "sedang"
                              : "rendah"
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Data Ekonomi */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <FiDollarSign className="w-4 h-4 mr-2 text-green-600" />
                      Ekonomi
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mata Pencaharian:</span>
                        <span className="font-medium">
                          {selectedVillage.economy.mainLivelihood}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah UMKM:</span>
                        <span className="font-medium">
                          {selectedVillage.economy.umkm}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Keluarga Miskin:</span>
                        <span className="font-medium">
                          {selectedVillage.economy.poorFamilies}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hasil Pertanian:</span>
                        <span className="font-medium">
                          {selectedVillage.economy.agricultureProduction} ton
                        </span>
                      </div>
                      <div className="mt-2 p-2 bg-green-50 rounded">
                        <Badge
                          className={getCategoryColor(
                            selectedVillage.economy.umkm > 70
                              ? "tinggi"
                              : selectedVillage.economy.umkm > 40
                              ? "sedang"
                              : "rendah"
                          )}
                          size="sm"
                        >
                          Aktivitas Ekonomi{" "}
                          {getCategoryLabel(
                            selectedVillage.economy.umkm > 70
                              ? "tinggi"
                              : selectedVillage.economy.umkm > 40
                              ? "sedang"
                              : "rendah"
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Data Pendidikan & Infrastruktur */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <FiBook className="w-4 h-4 mr-2 text-purple-600" />
                      Pendidikan & Infrastruktur
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">PAUD:</span>
                          <span className="font-medium">
                            {selectedVillage.education.schools.paud}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">SD:</span>
                          <span className="font-medium">
                            {selectedVillage.education.schools.sd}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">SMP:</span>
                          <span className="font-medium">
                            {selectedVillage.education.schools.smp}
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Jalan Baik:</span>
                          <span className="font-medium">
                            {selectedVillage.infrastructure.roads.good.toFixed(
                              1
                            )}{" "}
                            km
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Jalan Rusak:</span>
                          <span className="font-medium">
                            {selectedVillage.infrastructure.roads.poor.toFixed(
                              1
                            )}{" "}
                            km
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Jembatan:</span>
                          <span className="font-medium">
                            {selectedVillage.infrastructure.bridges}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-orange-50 rounded">
                        <Badge
                          className={getCategoryColor(
                            selectedVillage.infrastructure.accessibilityIndex >
                              7
                              ? "tinggi"
                              : selectedVillage.infrastructure
                                  .accessibilityIndex > 5
                              ? "sedang"
                              : "rendah"
                          )}
                          size="sm"
                        >
                          Aksesibilitas{" "}
                          {getCategoryLabel(
                            selectedVillage.infrastructure.accessibilityIndex >
                              7
                              ? "tinggi"
                              : selectedVillage.infrastructure
                                  .accessibilityIndex > 5
                              ? "sedang"
                              : "rendah"
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Panel */}
            {showAnalysisPanel && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <FiBarChart className="w-6 h-6 mr-2 text-blue-600" />
                    Analisis Spasial
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant={
                        activeAnalysis === "kepadatan" ? "primary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setActiveAnalysis("kepadatan")}
                    >
                      Kepadatan
                    </Button>
                    <Button
                      variant={
                        activeAnalysis === "aksesibilitas" ? "primary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setActiveAnalysis("aksesibilitas")}
                    >
                      Aksesibilitas
                    </Button>
                    <Button
                      variant={
                        activeAnalysis === "distribusi" ? "primary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setActiveAnalysis("distribusi")}
                    >
                      Distribusi
                    </Button>
                  </div>
                </div>

                {getActiveAnalysisData() && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {getActiveAnalysisData()!.title}
                      </h4>
                      <p className="text-gray-600">
                        {getActiveAnalysisData()!.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getActiveAnalysisData()!.villages.map(
                        (village, index) => (
                          <div
                            key={village.name}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900">
                                {village.name}
                              </h5>
                              <Badge
                                className={getCategoryColor(village.category)}
                                size="sm"
                              >
                                {getCategoryLabel(village.category)}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                {activeAnalysis === "kepadatan" && "Kepadatan"}
                                {activeAnalysis === "aksesibilitas" && "Indeks"}
                                {activeAnalysis === "distribusi" && "Rasio"}
                              </span>
                              <span className="text-lg font-bold text-gray-900">
                                {village.value.toFixed(
                                  activeAnalysis === "distribusi" ? 2 : 1
                                )}
                                {activeAnalysis === "kepadatan" && " jiwa/km²"}
                                {activeAnalysis === "aksesibilitas" && "/10"}
                                {activeAnalysis === "distribusi" && "/1000"}
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    village.category === "tinggi"
                                      ? "bg-green-600"
                                      : village.category === "sedang"
                                      ? "bg-yellow-600"
                                      : "bg-red-600"
                                  }`}
                                  style={{
                                    width: `${
                                      activeAnalysis === "kepadatan"
                                        ? (village.value / 200) * 100
                                        : activeAnalysis === "aksesibilitas"
                                        ? (village.value / 10) * 100
                                        : (village.value / 3) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Analysis Insights */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <FiTarget className="w-5 h-5 mr-2" />
                        Insight Analisis {getActiveAnalysisData()!.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-medium text-gray-900 mb-2">
                            Temuan Utama
                          </h5>
                          <div className="text-sm text-gray-600 space-y-1">
                            {activeAnalysis === "kepadatan" && (
                              <>
                                <p>
                                  • Tibawa memiliki kepadatan tertinggi (155.8
                                  jiwa/km²)
                                </p>
                                <p>
                                  • Bulango Utara memiliki kepadatan terendah
                                  (40.6 jiwa/km²)
                                </p>
                                <p>• Rata-rata kepadatan: 105.1 jiwa/km²</p>
                              </>
                            )}
                            {activeAnalysis === "aksesibilitas" && (
                              <>
                                <p>
                                  • Bone Pantai memiliki aksesibilitas terbaik
                                  (8.4/10)
                                </p>
                                <p>
                                  • Bulango Utara perlu perbaikan infrastruktur
                                  (4.9/10)
                                </p>
                                <p>• Rata-rata indeks aksesibilitas: 6.5/10</p>
                              </>
                            )}
                            {activeAnalysis === "distribusi" && (
                              <>
                                <p>
                                  • Bone Pantai memiliki distribusi fasilitas
                                  terbaik (2.67/1000)
                                </p>
                                <p>
                                  • Bulango Selatan perlu penambahan fasilitas
                                  (1.66/1000)
                                </p>
                                <p>
                                  • Rata-rata distribusi: 1.96 fasilitas per
                                  1000 penduduk
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-medium text-gray-900 mb-2">
                            Rekomendasi Kebijakan
                          </h5>
                          <div className="text-sm text-gray-600 space-y-1">
                            {activeAnalysis === "kepadatan" && (
                              <>
                                <p>
                                  • Prioritaskan pengembangan infrastruktur di
                                  desa dengan kepadatan tinggi
                                </p>
                                <p>
                                  • Pertimbangkan program transmigrasi lokal
                                  untuk pemerataan
                                </p>
                                <p>
                                  • Tingkatkan kapasitas pelayanan publik di
                                  area padat
                                </p>
                              </>
                            )}
                            {activeAnalysis === "aksesibilitas" && (
                              <>
                                <p>
                                  • Perbaiki infrastruktur jalan di Bulango
                                  Utara dan Tibawa Tengah
                                </p>
                                <p>• Bangun jembatan penghubung antar desa</p>
                                <p>
                                  • Prioritaskan akses ke fasilitas kesehatan
                                  dan pendidikan
                                </p>
                              </>
                            )}
                            {activeAnalysis === "distribusi" && (
                              <>
                                <p>
                                  • Tambah fasilitas pendidikan di Bulango
                                  Selatan
                                </p>
                                <p>
                                  • Optimalkan pemanfaatan fasilitas yang ada
                                </p>
                                <p>
                                  • Pertimbangkan fasilitas mobile untuk desa
                                  terpencil
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Kepadatan Rata-rata
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    villageData.reduce(
                      (sum, v) => sum + v.population.density,
                      0
                    ) / villageData.length
                  ).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">jiwa per km²</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  UMKM per Desa
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    villageData.reduce((sum, v) => sum + v.economy.umkm, 0) /
                      villageData.length
                  )}
                </p>
                <p className="text-xs text-gray-500">rata-rata</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiBook className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Fasilitas Pendidikan
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {villageData.reduce(
                    (sum, v) => sum + v.education.totalFacilities,
                    0
                  )}
                </p>
                <p className="text-xs text-gray-500">total fasilitas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <FiHome className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Aksesibilitas Rata-rata
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    villageData.reduce(
                      (sum, v) => sum + v.infrastructure.accessibilityIndex,
                      0
                    ) / villageData.length
                  ).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">dari skala 10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiInfo className="w-5 h-5 mr-2 text-blue-600" />
            Panduan Penggunaan Peta Interaktif
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiLayers className="w-4 h-4 mr-2 text-blue-600" />
                Layer Data
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Aktifkan atau nonaktifkan layer data untuk melihat informasi
                spesifik pada peta.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>
                  • Kepadatan Penduduk: Warna marker menunjukkan tingkat
                  kepadatan
                </li>
                <li>
                  • Aktivitas Ekonomi: Berdasarkan jumlah UMKM dan mata
                  pencaharian
                </li>
                <li>
                  • Fasilitas Pendidikan: Sebaran dan ketersediaan fasilitas
                </li>
                <li>
                  • Kondisi Infrastruktur: Indeks aksesibilitas dan kondisi
                  jalan
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiBarChart className="w-4 h-4 mr-2 text-green-600" />
                Analisis Spasial
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Gunakan panel analisis untuk melihat perbandingan antar desa
                berdasarkan berbagai indikator.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Analisis Kepadatan: Distribusi penduduk per wilayah</li>
                <li>• Indeks Aksesibilitas: Kemudahan akses infrastruktur</li>
                <li>• Distribusi Fasilitas: Ketersediaan fasilitas umum</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiTarget className="w-4 h-4 mr-2 text-purple-600" />
                Detail Desa
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Klik pada marker desa untuk melihat informasi detail dan
                statistik lengkap.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Data Umum: Luas wilayah, jumlah dusun, RT, RW</li>
                <li>• Kependudukan: Total penduduk, komposisi, kepadatan</li>
                <li>• Ekonomi: UMKM, mata pencaharian, hasil pertanian</li>
                <li>
                  • Pendidikan & Infrastruktur: Fasilitas dan kondisi jalan
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-start">
              <FiInfo className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Catatan Penting:
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  Data yang ditampilkan pada peta ini merupakan hasil pengolahan
                  dari sistem informasi pendataan desa yang terintegrasi.
                  Informasi ini dapat digunakan untuk mendukung pengambilan
                  keputusan dan implementasi kebijakan pemerintah pusat di
                  tingkat desa dan kecamatan. Pastikan data selalu diperbarui
                  secara berkala untuk menjaga akurasi analisis spasial.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality Indicator */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiRefreshCw className="w-5 h-5 mr-2 text-blue-600" />
            Status Data Peta
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {villageData.map((village) => {
              const daysSinceUpdate = Math.floor(
                (new Date().getTime() -
                  new Date(village.generalInfo.lastUpdate).getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              const isRecent = daysSinceUpdate <= 30;

              return (
                <div
                  key={village.id}
                  className="text-center p-3 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900 mb-2">
                    {village.name}
                  </h4>
                  <Badge
                    className={
                      isRecent
                        ? "text-green-600 bg-green-100"
                        : "text-yellow-600 bg-yellow-100"
                    }
                    size="sm"
                  >
                    {isRecent ? "Data Terkini" : "Perlu Update"}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {daysSinceUpdate} hari lalu
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <Button variant="primary" className="flex items-center">
              <FiRefreshCw className="w-4 h-4 mr-2" />
              Refresh Data Peta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
