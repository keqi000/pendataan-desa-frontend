"use client";

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiBarChart,
  FiTrendingUp,
  FiUsers,
  FiMapPin,
  FiBook,
  FiDollarSign,
  FiHome,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiTarget,
  FiAlertTriangle,
  FiCheckCircle,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";

interface DesaData {
  id: string;
  namaDesa: string;
  kecamatan: string;
  luasWilayah: number;
  jumlahPenduduk: number;
  totalKK: number;
  jumlahDusun: number;
  jumlahRT: number;
  jumlahRW: number;
  koordinat: { lat: number; lng: number };
  lastUpdate: string;

  // Data Kependudukan Detail
  demografis: {
    lakiLaki: number;
    perempuan: number;
    usia0_14: number;
    usia15_64: number;
    usia65Plus: number;
    islam: number;
    kristen: number;
    katolik: number;
    hindu: number;
    buddha: number;
    konghucu: number;
    belumKawin: number;
    kawin: number;
    ceraiHidup: number;
    ceraiMati: number;
  };

  // Data Pendidikan
  pendidikan: {
    tidakSekolah: number;
    tidakTamatSD: number;
    tamatSD: number;
    tamatSMP: number;
    tamatSMA: number;
    tamatDiploma: number;
    tamatS1: number;
    tamatS2: number;
    tamatS3: number;
    fasilitasPAUD: number;
    fasilitasSD: number;
    fasilitasSMP: number;
  };

  // Data Ekonomi
  ekonomi: {
    petani: number;
    buruhTani: number;
    nelayan: number;
    pedagang: number;
    pns: number;
    swasta: number;
    wiraswasta: number;
    pensiunan: number;
    ibuRumahTangga: number;
    pelajar: number;
    belumBekerja: number;
    jumlahUMKM: number;
    hasilPertanian: number; // dalam ton
    hasilPerikanan: number; // dalam ton
    hasilPerternakan: number; // dalam ekor
    jumlahPasar: number;
    wargaMiskin: number;
  };

  // Data Infrastruktur
  infrastruktur: {
    jalanBaik: number; // km
    jalanSedang: number; // km
    jalanRusak: number; // km
    jembatanBaik: number;
    jembatanRusak: number;
  };

  operator: string;
  completenessPercentage: number;
}

const PerbandinganDesaPage = () => {
  const [allDesa, setAllDesa] = useState<DesaData[]>([]);
  const [selectedDesa, setSelectedDesa] = useState<DesaData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [comparisonMode, setComparisonMode] = useState<
    "overview" | "demografis" | "pendidikan" | "ekonomi" | "infrastruktur"
  >("overview");

  // Mock data yang lebih lengkap sesuai proposal
  const mockDesaData: DesaData[] = [
    {
      id: "1",
      namaDesa: "Tibawa",
      kecamatan: "Tibawa",
      luasWilayah: 15.5,
      jumlahPenduduk: 2450,
      totalKK: 650,
      jumlahDusun: 4,
      jumlahRT: 12,
      jumlahRW: 4,
      koordinat: { lat: 0.5547, lng: 123.0581 },
      lastUpdate: "2025-01-15T10:30:00Z",
      demografis: {
        lakiLaki: 1225,
        perempuan: 1225,
        usia0_14: 490,
        usia15_64: 1715,
        usia65Plus: 245,
        islam: 2205,
        kristen: 147,
        katolik: 73,
        hindu: 15,
        buddha: 7,
        konghucu: 3,
        belumKawin: 980,
        kawin: 1225,
        ceraiHidup: 147,
        ceraiMati: 98,
      },
      pendidikan: {
        tidakSekolah: 245,
        tidakTamatSD: 294,
        tamatSD: 735,
        tamatSMP: 490,
        tamatSMA: 441,
        tamatDiploma: 147,
        tamatS1: 73,
        tamatS2: 20,
        tamatS3: 5,
        fasilitasPAUD: 2,
        fasilitasSD: 3,
        fasilitasSMP: 1,
      },
      ekonomi: {
        petani: 735,
        buruhTani: 294,
        nelayan: 147,
        pedagang: 196,
        pns: 98,
        swasta: 245,
        wiraswasta: 294,
        pensiunan: 49,
        ibuRumahTangga: 343,
        pelajar: 490,
        belumBekerja: 147,
        jumlahUMKM: 45,
        hasilPertanian: 1250,
        hasilPerikanan: 180,
        hasilPerternakan: 850,
        jumlahPasar: 2,
        wargaMiskin: 98,
      },
      infrastruktur: {
        jalanBaik: 12.5,
        jalanSedang: 8.3,
        jalanRusak: 3.2,
        jembatanBaik: 5,
        jembatanRusak: 1,
      },
      operator: "Ahmad Sutrisno",
      completenessPercentage: 95,
    },
    {
      id: "2",
      namaDesa: "Bulango Selatan",
      kecamatan: "Bulango Selatan",
      luasWilayah: 22.3,
      jumlahPenduduk: 3200,
      totalKK: 850,
      jumlahDusun: 5,
      jumlahRT: 15,
      jumlahRW: 5,
      koordinat: { lat: 0.6123, lng: 123.1234 },
      lastUpdate: "2025-01-14T15:45:00Z",
      demografis: {
        lakiLaki: 1600,
        perempuan: 1600,
        usia0_14: 640,
        usia15_64: 2240,
        usia65Plus: 320,
        islam: 2880,
        kristen: 192,
        katolik: 96,
        hindu: 20,
        buddha: 8,
        konghucu: 4,
        belumKawin: 1280,
        kawin: 1600,
        ceraiHidup: 192,
        ceraiMati: 128,
      },
      pendidikan: {
        tidakSekolah: 320,
        tidakTamatSD: 384,
        tamatSD: 960,
        tamatSMP: 640,
        tamatSMA: 576,
        tamatDiploma: 192,
        tamatS1: 96,
        tamatS2: 26,
        tamatS3: 6,
        fasilitasPAUD: 3,
        fasilitasSD: 4,
        fasilitasSMP: 2,
      },
      ekonomi: {
        petani: 960,
        buruhTani: 384,
        nelayan: 96,
        pedagang: 256,
        pns: 128,
        swasta: 320,
        wiraswasta: 384,
        pensiunan: 64,
        ibuRumahTangga: 448,
        pelajar: 640,
        belumBekerja: 192,
        jumlahUMKM: 62,
        hasilPertanian: 1680,
        hasilPerikanan: 95,
        hasilPerternakan: 1120,
        jumlahPasar: 3,
        wargaMiskin: 128,
      },
      infrastruktur: {
        jalanBaik: 18.7,
        jalanSedang: 12.4,
        jalanRusak: 5.8,
        jembatanBaik: 7,
        jembatanRusak: 2,
      },
      operator: "Siti Rahmawati",
      completenessPercentage: 72,
    },
    {
      id: "3",
      namaDesa: "Batudaa Pantai",
      kecamatan: "Batudaa Pantai",
      luasWilayah: 18.7,
      jumlahPenduduk: 1890,
      totalKK: 480,
      jumlahDusun: 3,
      jumlahRT: 9,
      jumlahRW: 3,
      koordinat: { lat: 0.4987, lng: 123.2456 },
      lastUpdate: "2025-01-13T09:20:00Z",
      demografis: {
        lakiLaki: 945,
        perempuan: 945,
        usia0_14: 378,
        usia15_64: 1323,
        usia65Plus: 189,
        islam: 1701,
        kristen: 113,
        katolik: 57,
        hindu: 12,
        buddha: 5,
        konghucu: 2,
        belumKawin: 756,
        kawin: 945,
        ceraiHidup: 113,
        ceraiMati: 76,
      },
      pendidikan: {
        tidakSekolah: 189,
        tidakTamatSD: 227,
        tamatSD: 567,
        tamatSMP: 378,
        tamatSMA: 340,
        tamatDiploma: 113,
        tamatS1: 57,
        tamatS2: 15,
        tamatS3: 4,
        fasilitasPAUD: 1,
        fasilitasSD: 2,
        fasilitasSMP: 1,
      },
      ekonomi: {
        petani: 378,
        buruhTani: 189,
        nelayan: 378,
        pedagang: 151,
        pns: 76,
        swasta: 189,
        wiraswasta: 227,
        pensiunan: 38,
        ibuRumahTangga: 264,
        pelajar: 378,
        belumBekerja: 113,
        jumlahUMKM: 28,
        hasilPertanian: 650,
        hasilPerikanan: 420,
        hasilPerternakan: 380,
        jumlahPasar: 1,
        wargaMiskin: 76,
      },
      infrastruktur: {
        jalanBaik: 8.5,
        jalanSedang: 6.2,
        jalanRusak: 4.8,
        jembatanBaik: 3,
        jembatanRusak: 2,
      },
      operator: "Budi Santoso",
      completenessPercentage: 45,
    },
    {
      id: "4",
      namaDesa: "Limboto Barat",
      kecamatan: "Limboto Barat",
      luasWilayah: 12.8,
      jumlahPenduduk: 2780,
      totalKK: 720,
      jumlahDusun: 4,
      jumlahRT: 14,
      jumlahRW: 4,
      koordinat: { lat: 0.5789, lng: 123.3678 },
      lastUpdate: "2025-01-15T14:15:00Z",
      demografis: {
        lakiLaki: 1390,
        perempuan: 1390,
        usia0_14: 556,
        usia15_64: 1946,
        usia65Plus: 278,
        islam: 2502,
        kristen: 167,
        katolik: 83,
        hindu: 17,
        buddha: 8,
        konghucu: 3,
        belumKawin: 1112,
        kawin: 1390,
        ceraiHidup: 167,
        ceraiMati: 111,
      },
      pendidikan: {
        tidakSekolah: 278,
        tidakTamatSD: 334,
        tamatSD: 834,
        tamatSMP: 556,
        tamatSMA: 500,
        tamatDiploma: 167,
        tamatS1: 83,
        tamatS2: 22,
        tamatS3: 6,
        fasilitasPAUD: 2,
        fasilitasSD: 3,
        fasilitasSMP: 1,
      },
      ekonomi: {
        petani: 556,
        buruhTani: 278,
        nelayan: 56,
        pedagang: 222,
        pns: 111,
        swasta: 278,
        wiraswasta: 334,
        pensiunan: 56,
        ibuRumahTangga: 389,
        pelajar: 556,
        belumBekerja: 167,
        jumlahUMKM: 38,
        hasilPertanian: 980,
        hasilPerikanan: 45,
        hasilPerternakan: 720,
        jumlahPasar: 2,
        wargaMiskin: 111,
      },
      infrastruktur: {
        jalanBaik: 10.2,
        jalanSedang: 7.8,
        jalanRusak: 2.5,
        jembatanBaik: 4,
        jembatanRusak: 1,
      },
      operator: "Dewi Kusuma",
      completenessPercentage: 88,
    },
    {
      id: "5",
      namaDesa: "Telaga Biru",
      kecamatan: "Telaga Biru",
      luasWilayah: 25.4,
      jumlahPenduduk: 4150,
      totalKK: 1100,
      jumlahDusun: 6,
      jumlahRT: 18,
      jumlahRW: 6,
      koordinat: { lat: 0.6234, lng: 123.4567 },
      lastUpdate: "2025-01-12T11:30:00Z",
      demografis: {
        lakiLaki: 2075,
        perempuan: 2075,
        usia0_14: 830,
        usia15_64: 2905,
        usia65Plus: 415,
        islam: 3735,
        kristen: 249,
        katolik: 125,
        hindu: 25,
        buddha: 12,
        konghucu: 4,
        belumKawin: 1660,
        kawin: 2075,
        ceraiHidup: 249,
        ceraiMati: 166,
      },
      pendidikan: {
        tidakSekolah: 415,
        tidakTamatSD: 498,
        tamatSD: 1245,
        tamatSMP: 830,
        tamatSMA: 747,
        tamatDiploma: 249,
        tamatS1: 125,
        tamatS2: 33,
        tamatS3: 8,
        fasilitasPAUD: 4,
        fasilitasSD: 5,
        fasilitasSMP: 2,
      },
      ekonomi: {
        petani: 1245,
        buruhTani: 498,
        nelayan: 83,
        pedagang: 332,
        pns: 166,
        swasta: 415,
        wiraswasta: 498,
        pensiunan: 83,
        ibuRumahTangga: 580,
        pelajar: 830,
        belumBekerja: 249,
        jumlahUMKM: 78,
        hasilPertanian: 2180,
        hasilPerikanan: 65,
        hasilPerternakan: 1450,
        jumlahPasar: 4,
        wargaMiskin: 166,
      },
      infrastruktur: {
        jalanBaik: 22.1,
        jalanSedang: 15.8,
        jalanRusak: 8.5,
        jembatanBaik: 9,
        jembatanRusak: 3,
      },
      operator: "Andi Pratama",
      completenessPercentage: 25,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setAllDesa(mockDesaData);
      setLoading(false);
    }, 1000);
  }, []);

  const addDesaToComparison = (desa: DesaData) => {
    if (
      selectedDesa.length < 4 &&
      !selectedDesa.find((d) => d.id === desa.id)
    ) {
      setSelectedDesa([...selectedDesa, desa]);
    }
  };

  const removeDesaFromComparison = (desaId: string) => {
    setSelectedDesa(selectedDesa.filter((d) => d.id !== desaId));
  };

  const filteredDesa = allDesa.filter(
    (desa) =>
      !selectedDesa.find((selected) => selected.id === desa.id) &&
      (desa.namaDesa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desa.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getComparisonIcon = (value1: number, value2: number) => {
    if (value1 > value2)
      return <FiArrowUp className="w-4 h-4 text-green-600" />;
    if (value1 < value2)
      return <FiArrowDown className="w-4 h-4 text-red-600" />;
    return <FiMinus className="w-4 h-4 text-gray-400" />;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("id-ID");
  };

  const formatPercentage = (num: number, total: number) => {
    return ((num / total) * 100).toFixed(1) + "%";
  };

  const calculateRatio = (numerator: number, denominator: number) => {
    return denominator > 0 ? (numerator / denominator).toFixed(2) : "0";
  };

  const renderOverviewComparison = () => (
    <div className="space-y-6">
      {/* Data Umum Desa */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiMapPin className="w-5 h-5 mr-2 text-blue-600" />
          Data Umum Desa
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Indikator
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Luas Wilayah (km²)
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {desa.luasWilayah}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Jumlah Dusun</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {desa.jumlahDusun}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Jumlah RW</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {desa.jumlahRW}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Jumlah RT</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {desa.jumlahRT}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Kepadatan (jiwa/km²)
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {Math.round(desa.jumlahPenduduk / desa.luasWilayah)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Kependudukan Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiUsers className="w-5 h-5 mr-2 text-green-600" />
          Data Kependudukan
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Indikator
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td className="py-3 text-sm text-gray-900">Total Penduduk</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {formatNumber(desa.jumlahPenduduk)} jiwa
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Total KK</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {formatNumber(desa.totalKK)} KK
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Rata-rata per KK</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {calculateRatio(desa.jumlahPenduduk, desa.totalKK)} jiwa
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Rasio Jenis Kelamin
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {calculateRatio(
                      desa.demografis.lakiLaki,
                      desa.demografis.perempuan
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDemografisComparison = () => (
    <div className="space-y-6">
      {/* Struktur Usia */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Struktur Usia Penduduk
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Kelompok Usia
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td className="py-3 text-sm text-gray-900">0-14 tahun</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div>{formatNumber(desa.demografis.usia0_14)}</div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.demografis.usia0_14,
                        desa.jumlahPenduduk
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">15-64 tahun</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div>{formatNumber(desa.demografis.usia15_64)}</div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.demografis.usia15_64,
                        desa.jumlahPenduduk
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">65+ tahun</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div>{formatNumber(desa.demografis.usia65Plus)}</div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.demografis.usia65Plus,
                        desa.jumlahPenduduk
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Agama */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Komposisi Agama
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Agama
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {[
                "islam",
                "kristen",
                "katolik",
                "hindu",
                "buddha",
                "konghucu",
              ].map((agama) => (
                <tr key={agama}>
                  <td className="py-3 text-sm text-gray-900 capitalize">
                    {agama}
                  </td>
                  {selectedDesa.map((desa) => (
                    <td key={desa.id} className="py-3 text-center text-sm">
                      <div>
                        {formatNumber(
                          desa.demografis[
                            agama as keyof typeof desa.demografis
                          ] as number
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        (
                        {formatPercentage(
                          desa.demografis[
                            agama as keyof typeof desa.demografis
                          ] as number,
                          desa.jumlahPenduduk
                        )}
                        )
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Pernikahan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Status Pernikahan
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Status
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {[
                { key: "belumKawin", label: "Belum Kawin" },
                { key: "kawin", label: "Kawin" },
                { key: "ceraiHidup", label: "Cerai Hidup" },
                { key: "ceraiMati", label: "Cerai Mati" },
              ].map((status) => (
                <tr key={status.key}>
                  <td className="py-3 text-sm text-gray-900">{status.label}</td>
                  {selectedDesa.map((desa) => (
                    <td key={desa.id} className="py-3 text-center text-sm">
                      <div>
                        {formatNumber(
                          desa.demografis[
                            status.key as keyof typeof desa.demografis
                          ] as number
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        (
                        {formatPercentage(
                          desa.demografis[
                            status.key as keyof typeof desa.demografis
                          ] as number,
                          desa.jumlahPenduduk
                        )}
                        )
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPendidikanComparison = () => (
    <div className="space-y-6">
      {/* Tingkat Pendidikan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiBook className="w-5 h-5 mr-2 text-purple-600" />
          Tingkat Pendidikan Penduduk
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Tingkat Pendidikan
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {[
                { key: "tidakSekolah", label: "Tidak Sekolah" },
                { key: "tidakTamatSD", label: "Tidak Tamat SD" },
                { key: "tamatSD", label: "Tamat SD" },
                { key: "tamatSMP", label: "Tamat SMP" },
                { key: "tamatSMA", label: "Tamat SMA" },
                { key: "tamatDiploma", label: "Tamat Diploma" },
                { key: "tamatS1", label: "Tamat S1" },
                { key: "tamatS2", label: "Tamat S2" },
                { key: "tamatS3", label: "Tamat S3" },
              ].map((pendidikan) => (
                <tr key={pendidikan.key}>
                  <td className="py-3 text-sm text-gray-900">
                    {pendidikan.label}
                  </td>
                  {selectedDesa.map((desa) => (
                    <td key={desa.id} className="py-3 text-center text-sm">
                      <div>
                        {formatNumber(
                          desa.pendidikan[
                            pendidikan.key as keyof typeof desa.pendidikan
                          ] as number
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        (
                        {formatPercentage(
                          desa.pendidikan[
                            pendidikan.key as keyof typeof desa.pendidikan
                          ] as number,
                          desa.jumlahPenduduk
                        )}
                        )
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fasilitas Pendidikan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fasilitas Pendidikan
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Jenis Fasilitas
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {[
                { key: "fasilitasPAUD", label: "PAUD" },
                { key: "fasilitasSD", label: "SD/MI" },
                { key: "fasilitasSMP", label: "SMP/MTs" },
              ].map((fasilitas) => (
                <tr key={fasilitas.key}>
                  <td className="py-3 text-sm text-gray-900">
                    {fasilitas.label}
                  </td>
                  {selectedDesa.map((desa) => (
                    <td
                      key={desa.id}
                      className="py-3 text-center text-sm font-medium"
                    >
                      {
                        desa.pendidikan[
                          fasilitas.key as keyof typeof desa.pendidikan
                        ]
                      }{" "}
                      unit
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analisis Pendidikan */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiTrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Analisis Tingkat Pendidikan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedDesa.map((desa) => {
            const totalPenduduk = desa.jumlahPenduduk;
            const pendidikanTinggi =
              desa.pendidikan.tamatDiploma +
              desa.pendidikan.tamatS1 +
              desa.pendidikan.tamatS2 +
              desa.pendidikan.tamatS3;
            const pendidikanRendah =
              desa.pendidikan.tidakSekolah + desa.pendidikan.tidakTamatSD;

            return (
              <div
                key={desa.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {desa.namaDesa}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pendidikan Tinggi:</span>
                    <span className="font-medium text-green-600">
                      {formatPercentage(pendidikanTinggi, totalPenduduk)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pendidikan Rendah:</span>
                    <span className="font-medium text-red-600">
                      {formatPercentage(pendidikanRendah, totalPenduduk)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Rasio Fasilitas/1000 penduduk:
                    </span>
                    <span className="font-medium text-gray-600">
                      {(
                        ((desa.pendidikan.fasilitasPAUD +
                          desa.pendidikan.fasilitasSD +
                          desa.pendidikan.fasilitasSMP) /
                          totalPenduduk) *
                        1000
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderEkonomiComparison = () => (
    <div className="space-y-6">
      {/* Mata Pencaharian */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiDollarSign className="w-5 h-5 mr-2 text-green-600" />
          Mata Pencaharian Penduduk
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Jenis Pekerjaan
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {[
                { key: "petani", label: "Petani" },
                { key: "buruhTani", label: "Buruh Tani" },
                { key: "nelayan", label: "Nelayan" },
                { key: "pedagang", label: "Pedagang" },
                { key: "pns", label: "PNS" },
                { key: "swasta", label: "Karyawan Swasta" },
                { key: "wiraswasta", label: "Wiraswasta" },
                { key: "pensiunan", label: "Pensiunan" },
                { key: "ibuRumahTangga", label: "Ibu Rumah Tangga" },
                { key: "pelajar", label: "Pelajar/Mahasiswa" },
                { key: "belumBekerja", label: "Belum Bekerja" },
              ].map((pekerjaan) => (
                <tr key={pekerjaan.key}>
                  <td className="py-3 text-sm text-gray-900">
                    {pekerjaan.label}
                  </td>
                  {selectedDesa.map((desa) => (
                    <td key={desa.id} className="py-3 text-center text-sm">
                      <div>
                        {formatNumber(
                          desa.ekonomi[
                            pekerjaan.key as keyof typeof desa.ekonomi
                          ] as number
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        (
                        {formatPercentage(
                          desa.ekonomi[
                            pekerjaan.key as keyof typeof desa.ekonomi
                          ] as number,
                          desa.jumlahPenduduk
                        )}
                        )
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Potensi Ekonomi */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Potensi Ekonomi Desa
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Indikator
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td className="py-3 text-sm text-gray-900">Jumlah UMKM</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {formatNumber(desa.ekonomi.jumlahUMKM)} unit
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Hasil Pertanian (ton/tahun)
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {formatNumber(desa.ekonomi.hasilPertanian)} ton
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Hasil Perikanan (ton/tahun)
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {formatNumber(desa.ekonomi.hasilPerikanan)} ton
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Hasil Peternakan (ekor)
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {formatNumber(desa.ekonomi.hasilPerternakan)} ekor
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Jumlah Pasar</td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium"
                  >
                    {desa.ekonomi.jumlahPasar} unit
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Warga Miskin</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div>{formatNumber(desa.ekonomi.wargaMiskin)} jiwa</div>
                    <div className="text-xs text-red-500">
                      (
                      {formatPercentage(
                        desa.ekonomi.wargaMiskin,
                        desa.jumlahPenduduk
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analisis Ekonomi */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiTrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Analisis Potensi Ekonomi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedDesa.map((desa) => {
            const totalPenduduk = desa.jumlahPenduduk;
            const sektorPertanian =
              desa.ekonomi.petani + desa.ekonomi.buruhTani;
            const sektorFormal = desa.ekonomi.pns + desa.ekonomi.swasta;
            const tingkatKemiskinan =
              (desa.ekonomi.wargaMiskin / totalPenduduk) * 100;

            return (
              <div
                key={desa.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {desa.namaDesa}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sektor Pertanian:</span>
                    <span className="font-medium text-green-600">
                      {formatPercentage(sektorPertanian, totalPenduduk)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sektor Formal:</span>
                    <span className="font-medium text-blue-600">
                      {formatPercentage(sektorFormal, totalPenduduk)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tingkat Kemiskinan:</span>
                    <span
                      className={`font-medium ${
                        tingkatKemiskinan > 10
                          ? "text-red-600"
                          : tingkatKemiskinan > 5
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {tingkatKemiskinan.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      UMKM per 1000 penduduk:
                    </span>
                    <span className="font-medium text-gray-600">
                      {(
                        (desa.ekonomi.jumlahUMKM / totalPenduduk) *
                        1000
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderInfrastrukturComparison = () => (
    <div className="space-y-6">
      {/* Kondisi Jalan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiHome className="w-5 h-5 mr-2 text-orange-600" />
          Kondisi Infrastruktur Jalan
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Kondisi Jalan
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 text-sm text-gray-900">Jalan Baik (km)</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div className="font-medium text-green-600">
                      {desa.infrastruktur.jalanBaik} km
                    </div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.infrastruktur.jalanBaik,
                        desa.infrastruktur.jalanBaik +
                          desa.infrastruktur.jalanSedang +
                          desa.infrastruktur.jalanRusak
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">
                  Jalan Sedang (km)
                </td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div className="font-medium text-yellow-600">
                      {desa.infrastruktur.jalanSedang} km
                    </div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.infrastruktur.jalanSedang,
                        desa.infrastruktur.jalanBaik +
                          desa.infrastruktur.jalanSedang +
                          desa.infrastruktur.jalanRusak
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Jalan Rusak (km)</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div className="font-medium text-red-600">
                      {desa.infrastruktur.jalanRusak} km
                    </div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.infrastruktur.jalanRusak,
                        desa.infrastruktur.jalanBaik +
                          desa.infrastruktur.jalanSedang +
                          desa.infrastruktur.jalanRusak
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900 font-medium">
                  Total Jalan (km)
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium text-gray-600"
                  >
                    {(
                      desa.infrastruktur.jalanBaik +
                      desa.infrastruktur.jalanSedang +
                      desa.infrastruktur.jalanRusak
                    ).toFixed(1)}{" "}
                    km
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Kondisi Jembatan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Kondisi Infrastruktur Jembatan
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Kondisi Jembatan
                </th>
                {selectedDesa.map((desa) => (
                  <th
                    key={desa.id}
                    className="text-center py-2 text-sm font-medium text-gray-600 min-w-32"
                  >
                    {desa.namaDesa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 text-sm text-gray-900">Jembatan Baik</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div className="font-medium text-green-600">
                      {desa.infrastruktur.jembatanBaik} unit
                    </div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.infrastruktur.jembatanBaik,
                        desa.infrastruktur.jembatanBaik +
                          desa.infrastruktur.jembatanRusak
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Jembatan Rusak</td>
                {selectedDesa.map((desa) => (
                  <td key={desa.id} className="py-3 text-center text-sm">
                    <div className="font-medium text-red-600">
                      {desa.infrastruktur.jembatanRusak} unit
                    </div>
                    <div className="text-xs text-gray-500">
                      (
                      {formatPercentage(
                        desa.infrastruktur.jembatanRusak,
                        desa.infrastruktur.jembatanBaik +
                          desa.infrastruktur.jembatanRusak
                      )}
                      )
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900 font-medium">
                  Total Jembatan
                </td>
                {selectedDesa.map((desa) => (
                  <td
                    key={desa.id}
                    className="py-3 text-center text-sm font-medium text-gray-600"
                  >
                    {desa.infrastruktur.jembatanBaik +
                      desa.infrastruktur.jembatanRusak}{" "}
                    unit
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analisis Infrastruktur */}
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiTarget className="w-5 h-5 mr-2 text-orange-600" />
          Analisis Kondisi Infrastruktur
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedDesa.map((desa) => {
            const totalJalan =
              desa.infrastruktur.jalanBaik +
              desa.infrastruktur.jalanSedang +
              desa.infrastruktur.jalanRusak;
            const totalJembatan =
              desa.infrastruktur.jembatanBaik +
              desa.infrastruktur.jembatanRusak;
            const persentaseJalanBaik =
              (desa.infrastruktur.jalanBaik / totalJalan) * 100;
            const persentaseJembatanBaik =
              (desa.infrastruktur.jembatanBaik / totalJembatan) * 100;
            const kepadatanJalan = totalJalan / desa.luasWilayah;

            return (
              <div
                key={desa.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {desa.namaDesa}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jalan Baik:</span>
                    <span
                      className={`font-medium ${
                        persentaseJalanBaik >= 70
                          ? "text-green-600"
                          : persentaseJalanBaik >= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {persentaseJalanBaik.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jembatan Baik:</span>
                    <span
                      className={`font-medium ${
                        persentaseJembatanBaik >= 80
                          ? "text-green-600"
                          : persentaseJembatanBaik >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {persentaseJembatanBaik.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kepadatan Jalan:</span>
                    <span className="font-medium text-gray-600">
                      {kepadatanJalan.toFixed(2)} km/km²
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status Infrastruktur:</span>
                    <span
                      className={`font-medium flex items-center ${
                        persentaseJalanBaik >= 70 &&
                        persentaseJembatanBaik >= 80
                          ? "text-green-600"
                          : persentaseJalanBaik >= 50 &&
                            persentaseJembatanBaik >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {persentaseJalanBaik >= 70 &&
                      persentaseJembatanBaik >= 80 ? (
                        <>
                          <FiCheckCircle className="w-4 h-4 mr-1" />
                          Baik
                        </>
                      ) : persentaseJalanBaik >= 50 &&
                        persentaseJembatanBaik >= 60 ? (
                        <>
                          <FiAlertTriangle className="w-4 h-4 mr-1" />
                          Sedang
                        </>
                      ) : (
                        <>
                          <FiAlertTriangle className="w-4 h-4 mr-1" />
                          Perlu Perbaikan
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderComparisonContent = () => {
    switch (comparisonMode) {
      case "demografis":
        return renderDemografisComparison();
      case "pendidikan":
        return renderPendidikanComparison();
      case "ekonomi":
        return renderEkonomiComparison();
      case "infrastruktur":
        return renderInfrastrukturComparison();
      default:
        return renderOverviewComparison();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat data perbandingan desa...</p>
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
                <FiBarChart className="w-8 h-8 mr-3 text-blue-600" />
                Perbandingan Antar Desa
              </h1>
              <p className="mt-2 text-gray-600">
                Analisis komparatif data desa untuk mendukung pengambilan
                keputusan dan implementasi kebijakan pemerintah pusat
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Laporan
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Pilih Desa */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pilih Desa untuk Dibandingkan
              </h2>

              {/* Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari nama desa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Selected Desa */}
              {selectedDesa.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Desa Terpilih ({selectedDesa.length}/4)
                  </h3>
                  <div className="space-y-2">
                    {selectedDesa.map((desa) => (
                      <div
                        key={desa.id}
                        className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {desa.namaDesa}
                          </div>
                          <div className="text-xs text-gray-500">
                            {desa.kecamatan}
                          </div>
                        </div>
                        <button
                          onClick={() => removeDesaFromComparison(desa.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Desa */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Desa Tersedia
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredDesa.map((desa) => (
                    <div
                      key={desa.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {desa.namaDesa}
                          </div>
                          <div className="text-xs text-gray-500">
                            {desa.kecamatan}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatNumber(desa.jumlahPenduduk)} jiwa •{" "}
                            {desa.luasWilayah} km²
                          </div>
                          <div className="flex items-center mt-1">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                desa.completenessPercentage >= 80
                                  ? "bg-green-500"
                                  : desa.completenessPercentage >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-xs text-gray-500">
                              {desa.completenessPercentage}% lengkap
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => addDesaToComparison(desa)}
                          disabled={selectedDesa.length >= 4}
                          className="ml-2 p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedDesa.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FiBarChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pilih Desa untuk Memulai Perbandingan
                </h3>
                <p className="text-gray-500 mb-6">
                  Pilih minimal 2 desa dari sidebar untuk melihat perbandingan
                  data demografis, pendidikan, ekonomi, dan infrastruktur.
                </p>
                <div className="text-sm text-gray-400">
                  Maksimal 4 desa dapat dibandingkan sekaligus
                </div>
              </div>
            ) : selectedDesa.length === 1 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FiActivity className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pilih Satu Desa Lagi
                </h3>
                <p className="text-gray-500 mb-6">
                  Anda telah memilih <strong>{selectedDesa[0].namaDesa}</strong>
                  . Pilih minimal satu desa lagi untuk memulai perbandingan.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Comparison Mode Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "overview", label: "Ringkasan", icon: FiPieChart },
                      { key: "demografis", label: "Demografis", icon: FiUsers },
                      { key: "pendidikan", label: "Pendidikan", icon: FiBook },
                      { key: "ekonomi", label: "Ekonomi", icon: FiDollarSign },
                      {
                        key: "infrastruktur",
                        label: "Infrastruktur",
                        icon: FiHome,
                      },
                    ].map((mode) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.key}
                          onClick={() => setComparisonMode(mode.key as any)}
                          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            comparisonMode === mode.key
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comparison Content */}
                {renderComparisonContent()}

                {/* Summary Insights */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiTarget className="w-5 h-5 mr-2 text-blue-600" />
                    Insight Perbandingan untuk Kebijakan Pemerintah Pusat
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Desa dengan Potensi Tertinggi
                      </h4>
                      {(() => {
                        const desaTerbaik = selectedDesa.reduce(
                          (prev, current) => {
                            const scorePrev =
                              (prev.completenessPercentage +
                                ((prev.pendidikan.tamatS1 +
                                  prev.pendidikan.tamatS2 +
                                  prev.pendidikan.tamatS3) /
                                  prev.jumlahPenduduk) *
                                  100 +
                                (prev.ekonomi.jumlahUMKM /
                                  prev.jumlahPenduduk) *
                                  1000) /
                              3;
                            const scoreCurrent =
                              (current.completenessPercentage +
                                ((current.pendidikan.tamatS1 +
                                  current.pendidikan.tamatS2 +
                                  current.pendidikan.tamatS3) /
                                  current.jumlahPenduduk) *
                                  100 +
                                (current.ekonomi.jumlahUMKM /
                                  current.jumlahPenduduk) *
                                  1000) /
                              3;
                            return scoreCurrent > scorePrev ? current : prev;
                          }
                        );
                        return (
                          <div className="text-sm text-gray-600">
                            <div className="font-medium text-green-600">
                              {desaTerbaik.namaDesa}
                            </div>
                            <div>
                              Kelengkapan data:{" "}
                              {desaTerbaik.completenessPercentage}%
                            </div>
                            <div>
                              Pendidikan tinggi:{" "}
                              {formatPercentage(
                                desaTerbaik.pendidikan.tamatS1 +
                                  desaTerbaik.pendidikan.tamatS2 +
                                  desaTerbaik.pendidikan.tamatS3,
                                desaTerbaik.jumlahPenduduk
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Desa yang Perlu Prioritas
                      </h4>
                      {(() => {
                        const desaPrioritas = selectedDesa.reduce(
                          (prev, current) => {
                            const tingkatKemiskinanPrev =
                              (prev.ekonomi.wargaMiskin / prev.jumlahPenduduk) *
                              100;
                            const tingkatKemiskinanCurrent =
                              (current.ekonomi.wargaMiskin /
                                current.jumlahPenduduk) *
                              100;
                            const infrastrukturPrev =
                              (prev.infrastruktur.jalanRusak /
                                (prev.infrastruktur.jalanBaik +
                                  prev.infrastruktur.jalanSedang +
                                  prev.infrastruktur.jalanRusak)) *
                              100;
                            const infrastrukturCurrent =
                              (current.infrastruktur.jalanRusak /
                                (current.infrastruktur.jalanBaik +
                                  current.infrastruktur.jalanSedang +
                                  current.infrastruktur.jalanRusak)) *
                              100;

                            const scorePrev =
                              tingkatKemiskinanPrev + infrastrukturPrev;
                            const scoreCurrent =
                              tingkatKemiskinanCurrent + infrastrukturCurrent;

                            return scoreCurrent > scorePrev ? current : prev;
                          }
                        );

                        const tingkatKemiskinan =
                          (desaPrioritas.ekonomi.wargaMiskin /
                            desaPrioritas.jumlahPenduduk) *
                          100;
                        const jalanRusak =
                          (desaPrioritas.infrastruktur.jalanRusak /
                            (desaPrioritas.infrastruktur.jalanBaik +
                              desaPrioritas.infrastruktur.jalanSedang +
                              desaPrioritas.infrastruktur.jalanRusak)) *
                          100;

                        return (
                          <div className="text-sm text-gray-600">
                            <div className="font-medium text-red-600">
                              {desaPrioritas.namaDesa}
                            </div>
                            <div>
                              Tingkat kemiskinan: {tingkatKemiskinan.toFixed(1)}
                              %
                            </div>
                            <div>Jalan rusak: {jalanRusak.toFixed(1)}%</div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-100 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Rekomendasi Kebijakan
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Fokus program pengentasan kemiskinan pada desa dengan
                        tingkat kemiskinan tertinggi
                      </li>
                      <li>
                        • Prioritaskan perbaikan infrastruktur jalan dan
                        jembatan yang rusak
                      </li>
                      <li>
                        • Tingkatkan fasilitas pendidikan di desa dengan akses
                        pendidikan terbatas
                      </li>
                      <li>
                        • Kembangkan program UMKM untuk meningkatkan
                        perekonomian desa
                      </li>
                      <li>
                        • Implementasikan program digitalisasi data untuk desa
                        dengan kelengkapan data rendah
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerbandinganDesaPage;
