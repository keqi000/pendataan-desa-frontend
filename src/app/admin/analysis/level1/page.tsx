"use client";

import React, { useState, useEffect } from "react";
import {
  FiBarChart,
  FiPieChart,
  FiTrendingUp,
  FiUsers,
  FiBook,
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiCalendar,
  FiTarget,
  FiActivity,
  FiDatabase,
  FiInfo,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../../components";

interface DesaStatistics {
  id: string;
  namaDesa: string;
  kecamatan: string;

  // Data Umum Desa
  dataUmum: {
    luasWilayah: number;
    jumlahDusun: number;
    jumlahRT: number;
    jumlahRW: number;
    koordinat: { lat: number; lng: number };
  };

  // Data Kependudukan
  kependudukan: {
    totalPenduduk: number;
    totalKK: number;
    jenisKelamin: {
      lakiLaki: number;
      perempuan: number;
    };
    kelompokUsia: {
      balita: number; // 0-5 tahun
      anak: number; // 6-12 tahun
      remaja: number; // 13-17 tahun
      dewasa: number; // 18-64 tahun
      lansia: number; // 65+ tahun
    };
    agama: {
      islam: number;
      kristen: number;
      katolik: number;
      hindu: number;
      buddha: number;
      konghucu: number;
    };
    tingkatPendidikan: {
      tidakSekolah: number;
      tidakTamatSD: number;
      tamatSD: number;
      tamatSMP: number;
      tamatSMA: number;
      tamatDiploma: number;
      tamatS1: number;
      tamatS2: number;
      tamatS3: number;
    };
    statusPernikahan: {
      belumKawin: number;
      kawin: number;
      ceraiHidup: number;
      ceraiMati: number;
    };
    jenisPekerjaan: {
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
    };
    migrasi: {
      datang: number;
      pergi: number;
    };
  };

  // Data Pendidikan
  pendidikan: {
    fasilitasPendidikan: {
      PAUD: number;
      TK: number;
      SD: number;
      SMP: number;
    };
    kapasitasPendidikan: {
      PAUD: number;
      TK: number;
      SD: number;
      SMP: number;
    };
  };

  // Data Ekonomi
  ekonomi: {
    mataPencaharian: {
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
    };
    jenisUsaha: {
      pertanian: number;
      peternakan: number;
      perikanan: number;
      perdagangan: number;
      jasa: number;
      industri: number;
    };
    hasilProduksi: {
      pertanian: number; // dalam ton
      peternakan: number; // dalam ekor
      perikanan: number; // dalam ton
    };
    pasar: {
      jumlahPasar: number;
      jenisKomoditas: string[];
    };
    wargaMiskin: {
      jumlahWargaMiskin: number;
      penerimaBantuan: number;
    };
  };

  // Data Infrastruktur
  infrastruktur: {
    jalan: {
      totalPanjang: number;
      kondisiBaik: number;
      kondisiSedang: number;
      kondisiRusak: number;
    };
    jembatan: {
      totalJembatan: number;
      kondisiBaik: number;
      kondisiRusak: number;
    };
  };

  lastUpdate: string;
}

interface GlobalStatistics {
  totalDesa: number;
  totalPenduduk: number;
  totalKK: number;
  luasWilayahTotal: number;

  // Analisis Tingkat 1 - Kependudukan
  kependudukan: {
    jumlahPendudukJenisKelamin: {
      lakiLaki: number;
      perempuan: number;
    };
    jumlahPendudukKelompokUsia: {
      balita: number;
      anak: number;
      remaja: number;
      dewasa: number;
      lansia: number;
    };
    jumlahPendudukAgama: {
      islam: number;
      kristen: number;
      katolik: number;
      hindu: number;
      buddha: number;
      konghucu: number;
    };
    jumlahPendudukTingkatPendidikan: {
      tidakSekolah: number;
      tidakTamatSD: number;
      tamatSD: number;
      tamatSMP: number;
      tamatSMA: number;
      tamatDiploma: number;
      tamatS1: number;
      tamatS2: number;
      tamatS3: number;
    };
    jumlahPendudukStatusPernikahan: {
      belumKawin: number;
      kawin: number;
      ceraiHidup: number;
      ceraiMati: number;
    };
    jumlahPendudukJenisPekerjaan: {
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
    };
    jumlahKepalaKeluarga: number;
  };

  // Analisis Tingkat 1 - Ekonomi
  ekonomi: {
    jumlahPendudukMataPencaharian: {
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
    };
    jumlahUMKMJenisUsaha: {
      pertanian: number;
      peternakan: number;
      perikanan: number;
      perdagangan: number;
      jasa: number;
      industri: number;
    };
    totalHasilPertanian: number;
    jumlahWargaMiskin: number;
    jumlahPenerimaBantuan: number;
    jumlahPasar: number;
  };

  // Analisis Tingkat 1 - Pendidikan
  pendidikan: {
    jumlahFasilitasPendidikan: {
      PAUD: number;
      TK: number;
      SD: number;
      SMP: number;
    };
    kapasitasTotalFasilitasPendidikan: {
      PAUD: number;
      TK: number;
      SD: number;
      SMP: number;
    };
  };

  // Analisis Tingkat 1 - Infrastruktur
  infrastruktur: {
    totalPanjangJalan: number;
    totalPanjangJalanKondisi: {
      baik: number;
      sedang: number;
      rusak: number;
    };
    totalJembatan: number;
    totalJembatanKondisi: {
      baik: number;
      rusak: number;
    };
  };

  // Analisis Spasial dan Geografis Tingkat 1
  spasial: {
    kepadatanPendudukPerDesa: number;
    jarakRataRataAntarDesa: number;
    jumlahFasilitasUmum: {
      pendidikan: number;
      ekonomi: number;
    };
  };
}

type AnalysisCategory =
  | "all"
  | "kependudukan"
  | "ekonomi"
  | "pendidikan"
  | "infrastruktur"
  | "spasial";

export default function AnalysisLevel1Page() {
  const [loading, setLoading] = useState(true);
  const [desaData, setDesaData] = useState<DesaStatistics[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStatistics | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<AnalysisCategory>("all");
  const [selectedDesa, setSelectedDesa] = useState<string>("all");

  // Mock data - dalam implementasi nyata akan diambil dari API Laravel
  useEffect(() => {
    const fetchAnalysisData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data desa
      const mockDesaData: DesaStatistics[] = [
        {
          id: "1",
          namaDesa: "Tibawa",
          kecamatan: "Tibawa",
          dataUmum: {
            luasWilayah: 15.5,
            jumlahDusun: 4,
            jumlahRT: 12,
            jumlahRW: 3,
            koordinat: { lat: 0.5547, lng: 123.0581 },
          },
          kependudukan: {
            totalPenduduk: 2850,
            totalKK: 720,
            jenisKelamin: {
              lakiLaki: 1450,
              perempuan: 1400,
            },
            kelompokUsia: {
              balita: 285, // 0-5 tahun
              anak: 342, // 6-12 tahun
              remaja: 228, // 13-17 tahun
              dewasa: 1710, // 18-64 tahun
              lansia: 285, // 65+ tahun
            },
            agama: {
              islam: 2565,
              kristen: 228,
              katolik: 42,
              hindu: 10,
              buddha: 3,
              konghucu: 2,
            },
            tingkatPendidikan: {
              tidakSekolah: 285,
              tidakTamatSD: 342,
              tamatSD: 855,
              tamatSMP: 570,
              tamatSMA: 456,
              tamatDiploma: 171,
              tamatS1: 142,
              tamatS2: 25,
              tamatS3: 4,
            },
            statusPernikahan: {
              belumKawin: 1140,
              kawin: 1425,
              ceraiHidup: 171,
              ceraiMati: 114,
            },
            jenisPekerjaan: {
              petani: 570,
              buruhTani: 285,
              nelayan: 114,
              pedagang: 171,
              pns: 85,
              swasta: 228,
              wiraswasta: 142,
              pensiunan: 57,
              ibuRumahTangga: 456,
              pelajar: 570,
              belumBekerja: 171,
            },
            migrasi: {
              datang: 45,
              pergi: 32,
            },
          },
          pendidikan: {
            fasilitasPendidikan: {
              PAUD: 2,
              TK: 1,
              SD: 3,
              SMP: 1,
            },
            kapasitasPendidikan: {
              PAUD: 120,
              TK: 60,
              SD: 540,
              SMP: 240,
            },
          },
          ekonomi: {
            mataPencaharian: {
              petani: 570,
              buruhTani: 285,
              nelayan: 114,
              pedagang: 171,
              pns: 85,
              swasta: 228,
              wiraswasta: 142,
              pensiunan: 57,
              ibuRumahTangga: 456,
              pelajar: 570,
              belumBekerja: 171,
            },
            jenisUsaha: {
              pertanian: 45,
              peternakan: 25,
              perikanan: 15,
              perdagangan: 35,
              jasa: 20,
              industri: 8,
            },
            hasilProduksi: {
              pertanian: 125.5,
              peternakan: 450,
              perikanan: 35.2,
            },
            pasar: {
              jumlahPasar: 2,
              jenisKomoditas: ["Beras", "Jagung", "Sayuran", "Ikan"],
            },
            wargaMiskin: {
              jumlahWargaMiskin: 228,
              penerimaBantuan: 185,
            },
          },
          infrastruktur: {
            jalan: {
              totalPanjang: 15.5,
              kondisiBaik: 8.5,
              kondisiSedang: 4.2,
              kondisiRusak: 2.8,
            },
            jembatan: {
              totalJembatan: 4,
              kondisiBaik: 3,
              kondisiRusak: 1,
            },
          },
          lastUpdate: "2025-01-15T10:30:00Z",
        },
        {
          id: "2",
          namaDesa: "Bulango Selatan",
          kecamatan: "Bulango Selatan",
          dataUmum: {
            luasWilayah: 22.3,
            jumlahDusun: 5,
            jumlahRT: 15,
            jumlahRW: 4,
            koordinat: { lat: 0.6123, lng: 122.9876 },
          },
          kependudukan: {
            totalPenduduk: 3420,
            totalKK: 855,
            jenisKelamin: {
              lakiLaki: 1710,
              perempuan: 1710,
            },
            kelompokUsia: {
              balita: 342, // 0-5 tahun
              anak: 410, // 6-12 tahun
              remaja: 274, // 13-17 tahun
              dewasa: 2052, // 18-64 tahun
              lansia: 342, // 65+ tahun
            },
            agama: {
              islam: 3078,
              kristen: 274,
              katolik: 51,
              hindu: 12,
              buddha: 3,
              konghucu: 2,
            },
            tingkatPendidikan: {
              tidakSekolah: 342,
              tidakTamatSD: 410,
              tamatSD: 1026,
              tamatSMP: 684,
              tamatSMA: 547,
              tamatDiploma: 205,
              tamatS1: 171,
              tamatS2: 30,
              tamatS3: 5,
            },
            statusPernikahan: {
              belumKawin: 1368,
              kawin: 1710,
              ceraiHidup: 205,
              ceraiMati: 137,
            },
            jenisPekerjaan: {
              petani: 684,
              buruhTani: 342,
              nelayan: 137,
              pedagang: 205,
              pns: 102,
              swasta: 274,
              wiraswasta: 171,
              pensiunan: 68,
              ibuRumahTangga: 547,
              pelajar: 684,
              belumBekerja: 206,
            },
            migrasi: {
              datang: 52,
              pergi: 38,
            },
          },
          pendidikan: {
            fasilitasPendidikan: {
              PAUD: 3,
              TK: 2,
              SD: 4,
              SMP: 2,
            },
            kapasitasPendidikan: {
              PAUD: 180,
              TK: 120,
              SD: 720,
              SMP: 480,
            },
          },
          ekonomi: {
            mataPencaharian: {
              petani: 684,
              buruhTani: 342,
              nelayan: 137,
              pedagang: 205,
              pns: 102,
              swasta: 274,
              wiraswasta: 171,
              pensiunan: 68,
              ibuRumahTangga: 547,
              pelajar: 684,
              belumBekerja: 206,
            },
            jenisUsaha: {
              pertanian: 55,
              peternakan: 30,
              perikanan: 18,
              perdagangan: 42,
              jasa: 25,
              industri: 10,
            },
            hasilProduksi: {
              pertanian: 150.8,
              peternakan: 540,
              perikanan: 42.5,
            },
            pasar: {
              jumlahPasar: 3,
              jenisKomoditas: ["Beras", "Jagung", "Sayuran", "Ikan", "Buah"],
            },
            wargaMiskin: {
              jumlahWargaMiskin: 274,
              penerimaBantuan: 220,
            },
          },
          infrastruktur: {
            jalan: {
              totalPanjang: 18.7,
              kondisiBaik: 9.8,
              kondisiSedang: 5.2,
              kondisiRusak: 3.7,
            },
            jembatan: {
              totalJembatan: 5,
              kondisiBaik: 3,
              kondisiRusak: 2,
            },
          },
          lastUpdate: "2025-01-14T14:20:00Z",
        },
        {
          id: "3",
          namaDesa: "Bone Pantai",
          kecamatan: "Bone Pantai",
          dataUmum: {
            luasWilayah: 18.9,
            jumlahDusun: 4,
            jumlahRT: 14,
            jumlahRW: 3,
            koordinat: { lat: 0.5234, lng: 123.1234 },
          },
          kependudukan: {
            totalPenduduk: 3150,
            totalKK: 788,
            jenisKelamin: {
              lakiLaki: 1575,
              perempuan: 1575,
            },
            kelompokUsia: {
              balita: 315, // 0-5 tahun
              anak: 378, // 6-12 tahun
              remaja: 252, // 13-17 tahun
              dewasa: 1890, // 18-64 tahun
              lansia: 315, // 65+ tahun
            },
            agama: {
              islam: 2835,
              kristen: 252,
              katolik: 47,
              hindu: 11,
              buddha: 3,
              konghucu: 2,
            },
            tingkatPendidikan: {
              tidakSekolah: 315,
              tidakTamatSD: 378,
              tamatSD: 945,
              tamatSMP: 630,
              tamatSMA: 504,
              tamatDiploma: 189,
              tamatS1: 157,
              tamatS2: 28,
              tamatS3: 4,
            },
            statusPernikahan: {
              belumKawin: 1260,
              kawin: 1575,
              ceraiHidup: 189,
              ceraiMati: 126,
            },
            jenisPekerjaan: {
              petani: 630,
              buruhTani: 315,
              nelayan: 189,
              pedagang: 189,
              pns: 94,
              swasta: 252,
              wiraswasta: 157,
              pensiunan: 63,
              ibuRumahTangga: 504,
              pelajar: 630,
              belumBekerja: 126,
            },
            migrasi: {
              datang: 48,
              pergi: 35,
            },
          },
          pendidikan: {
            fasilitasPendidikan: {
              PAUD: 2,
              TK: 2,
              SD: 3,
              SMP: 1,
            },
            kapasitasPendidikan: {
              PAUD: 120,
              TK: 120,
              SD: 540,
              SMP: 240,
            },
          },
          ekonomi: {
            mataPencaharian: {
              petani: 630,
              buruhTani: 315,
              nelayan: 189,
              pedagang: 189,
              pns: 94,
              swasta: 252,
              wiraswasta: 157,
              pensiunan: 63,
              ibuRumahTangga: 504,
              pelajar: 630,
              belumBekerja: 126,
            },
            jenisUsaha: {
              pertanian: 50,
              peternakan: 28,
              perikanan: 22,
              perdagangan: 38,
              jasa: 22,
              industri: 9,
            },
            hasilProduksi: {
              pertanian: 138.2,
              peternakan: 495,
              perikanan: 55.8,
            },
            pasar: {
              jumlahPasar: 2,
              jenisKomoditas: ["Beras", "Jagung", "Ikan", "Kelapa"],
            },
            wargaMiskin: {
              jumlahWargaMiskin: 252,
              penerimaBantuan: 202,
            },
          },
          infrastruktur: {
            jalan: {
              totalPanjang: 16.8,
              kondisiBaik: 10.1,
              kondisiSedang: 4.2,
              kondisiRusak: 2.5,
            },
            jembatan: {
              totalJembatan: 3,
              kondisiBaik: 2,
              kondisiRusak: 1,
            },
          },
          lastUpdate: "2025-01-13T09:15:00Z",
        },
      ];

      setDesaData(mockDesaData);

      // Hitung global statistics berdasarkan data desa
      const calculateGlobalStats = (
        data: DesaStatistics[]
      ): GlobalStatistics => {
        const totalDesa = data.length;
        const totalPenduduk = data.reduce(
          (sum, desa) => sum + desa.kependudukan.totalPenduduk,
          0
        );
        const totalKK = data.reduce(
          (sum, desa) => sum + desa.kependudukan.totalKK,
          0
        );
        const luasWilayahTotal = data.reduce(
          (sum, desa) => sum + desa.dataUmum.luasWilayah,
          0
        );

        // Analisis Tingkat 1 - Kependudukan
        const kependudukan = {
          jumlahPendudukJenisKelamin: {
            lakiLaki: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisKelamin.lakiLaki,
              0
            ),
            perempuan: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisKelamin.perempuan,
              0
            ),
          },
          jumlahPendudukKelompokUsia: {
            balita: data.reduce(
              (sum, desa) => sum + desa.kependudukan.kelompokUsia.balita,
              0
            ),
            anak: data.reduce(
              (sum, desa) => sum + desa.kependudukan.kelompokUsia.anak,
              0
            ),
            remaja: data.reduce(
              (sum, desa) => sum + desa.kependudukan.kelompokUsia.remaja,
              0
            ),
            dewasa: data.reduce(
              (sum, desa) => sum + desa.kependudukan.kelompokUsia.dewasa,
              0
            ),
            lansia: data.reduce(
              (sum, desa) => sum + desa.kependudukan.kelompokUsia.lansia,
              0
            ),
          },
          jumlahPendudukAgama: {
            islam: data.reduce(
              (sum, desa) => sum + desa.kependudukan.agama.islam,
              0
            ),
            kristen: data.reduce(
              (sum, desa) => sum + desa.kependudukan.agama.kristen,
              0
            ),
            katolik: data.reduce(
              (sum, desa) => sum + desa.kependudukan.agama.katolik,
              0
            ),
            hindu: data.reduce(
              (sum, desa) => sum + desa.kependudukan.agama.hindu,
              0
            ),
            buddha: data.reduce(
              (sum, desa) => sum + desa.kependudukan.agama.buddha,
              0
            ),
            konghucu: data.reduce(
              (sum, desa) => sum + desa.kependudukan.agama.konghucu,
              0
            ),
          },
          jumlahPendudukTingkatPendidikan: {
            tidakSekolah: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.tingkatPendidikan.tidakSekolah,
              0
            ),
            tidakTamatSD: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.tingkatPendidikan.tidakTamatSD,
              0
            ),
            tamatSD: data.reduce(
              (sum, desa) => sum + desa.kependudukan.tingkatPendidikan.tamatSD,
              0
            ),
            tamatSMP: data.reduce(
              (sum, desa) => sum + desa.kependudukan.tingkatPendidikan.tamatSMP,
              0
            ),
            tamatSMA: data.reduce(
              (sum, desa) => sum + desa.kependudukan.tingkatPendidikan.tamatSMA,
              0
            ),
            tamatDiploma: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.tingkatPendidikan.tamatDiploma,
              0
            ),
            tamatS1: data.reduce(
              (sum, desa) => sum + desa.kependudukan.tingkatPendidikan.tamatS1,
              0
            ),
            tamatS2: data.reduce(
              (sum, desa) => sum + desa.kependudukan.tingkatPendidikan.tamatS2,
              0
            ),
            tamatS3: data.reduce(
              (sum, desa) => sum + desa.kependudukan.tingkatPendidikan.tamatS3,
              0
            ),
          },
          jumlahPendudukStatusPernikahan: {
            belumKawin: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.statusPernikahan.belumKawin,
              0
            ),
            kawin: data.reduce(
              (sum, desa) => sum + desa.kependudukan.statusPernikahan.kawin,
              0
            ),
            ceraiHidup: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.statusPernikahan.ceraiHidup,
              0
            ),
            ceraiMati: data.reduce(
              (sum, desa) => sum + desa.kependudukan.statusPernikahan.ceraiMati,
              0
            ),
          },
          jumlahPendudukJenisPekerjaan: {
            petani: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.petani,
              0
            ),
            buruhTani: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.buruhTani,
              0
            ),
            nelayan: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.nelayan,
              0
            ),
            pedagang: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.pedagang,
              0
            ),
            pns: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.pns,
              0
            ),
            swasta: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.swasta,
              0
            ),
            wiraswasta: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.wiraswasta,
              0
            ),
            pensiunan: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.pensiunan,
              0
            ),
            ibuRumahTangga: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.jenisPekerjaan.ibuRumahTangga,
              0
            ),
            pelajar: data.reduce(
              (sum, desa) => sum + desa.kependudukan.jenisPekerjaan.pelajar,
              0
            ),
            belumBekerja: data.reduce(
              (sum, desa) =>
                sum + desa.kependudukan.jenisPekerjaan.belumBekerja,
              0
            ),
          },
          jumlahKepalaKeluarga: totalKK,
        };

        // Analisis Tingkat 1 - Ekonomi
        const ekonomi = {
          jumlahPendudukMataPencaharian: {
            petani: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.petani,
              0
            ),
            buruhTani: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.buruhTani,
              0
            ),
            nelayan: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.nelayan,
              0
            ),
            pedagang: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.pedagang,
              0
            ),
            pns: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.pns,
              0
            ),
            swasta: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.swasta,
              0
            ),
            wiraswasta: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.wiraswasta,
              0
            ),
            pensiunan: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.pensiunan,
              0
            ),
            ibuRumahTangga: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.ibuRumahTangga,
              0
            ),
            pelajar: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.pelajar,
              0
            ),
            belumBekerja: data.reduce(
              (sum, desa) => sum + desa.ekonomi.mataPencaharian.belumBekerja,
              0
            ),
          },
          jumlahUMKMJenisUsaha: {
            pertanian: data.reduce(
              (sum, desa) => sum + desa.ekonomi.jenisUsaha.pertanian,
              0
            ),
            peternakan: data.reduce(
              (sum, desa) => sum + desa.ekonomi.jenisUsaha.peternakan,
              0
            ),
            perikanan: data.reduce(
              (sum, desa) => sum + desa.ekonomi.jenisUsaha.perikanan,
              0
            ),
            perdagangan: data.reduce(
              (sum, desa) => sum + desa.ekonomi.jenisUsaha.perdagangan,
              0
            ),
            jasa: data.reduce(
              (sum, desa) => sum + desa.ekonomi.jenisUsaha.jasa,
              0
            ),
            industri: data.reduce(
              (sum, desa) => sum + desa.ekonomi.jenisUsaha.industri,
              0
            ),
          },
          totalHasilPertanian: data.reduce(
            (sum, desa) => sum + desa.ekonomi.hasilProduksi.pertanian,
            0
          ),
          jumlahWargaMiskin: data.reduce(
            (sum, desa) => sum + desa.ekonomi.wargaMiskin.jumlahWargaMiskin,
            0
          ),
          jumlahPenerimaBantuan: data.reduce(
            (sum, desa) => sum + desa.ekonomi.wargaMiskin.penerimaBantuan,
            0
          ),
          jumlahPasar: data.reduce(
            (sum, desa) => sum + desa.ekonomi.pasar.jumlahPasar,
            0
          ),
        };

        // Analisis Tingkat 1 - Pendidikan
        const pendidikan = {
          jumlahFasilitasPendidikan: {
            PAUD: data.reduce(
              (sum, desa) => sum + desa.pendidikan.fasilitasPendidikan.PAUD,
              0
            ),
            TK: data.reduce(
              (sum, desa) => sum + desa.pendidikan.fasilitasPendidikan.TK,
              0
            ),
            SD: data.reduce(
              (sum, desa) => sum + desa.pendidikan.fasilitasPendidikan.SD,
              0
            ),
            SMP: data.reduce(
              (sum, desa) => sum + desa.pendidikan.fasilitasPendidikan.SMP,
              0
            ),
          },
          kapasitasTotalFasilitasPendidikan: {
            PAUD: data.reduce(
              (sum, desa) => sum + desa.pendidikan.kapasitasPendidikan.PAUD,
              0
            ),
            TK: data.reduce(
              (sum, desa) => sum + desa.pendidikan.kapasitasPendidikan.TK,
              0
            ),
            SD: data.reduce(
              (sum, desa) => sum + desa.pendidikan.kapasitasPendidikan.SD,
              0
            ),
            SMP: data.reduce(
              (sum, desa) => sum + desa.pendidikan.kapasitasPendidikan.SMP,
              0
            ),
          },
        };

        // Analisis Tingkat 1 - Infrastruktur
        const infrastruktur = {
          totalPanjangJalan: data.reduce(
            (sum, desa) => sum + desa.infrastruktur.jalan.totalPanjang,
            0
          ),
          totalPanjangJalanKondisi: {
            baik: data.reduce(
              (sum, desa) => sum + desa.infrastruktur.jalan.kondisiBaik,
              0
            ),
            sedang: data.reduce(
              (sum, desa) => sum + desa.infrastruktur.jalan.kondisiSedang,
              0
            ),
            rusak: data.reduce(
              (sum, desa) => sum + desa.infrastruktur.jalan.kondisiRusak,
              0
            ),
          },
          totalJembatan: data.reduce(
            (sum, desa) => sum + desa.infrastruktur.jembatan.totalJembatan,
            0
          ),
          totalJembatanKondisi: {
            baik: data.reduce(
              (sum, desa) => sum + desa.infrastruktur.jembatan.kondisiBaik,
              0
            ),
            rusak: data.reduce(
              (sum, desa) => sum + desa.infrastruktur.jembatan.kondisiRusak,
              0
            ),
          },
        };

        // Analisis Spasial dan Geografis Tingkat 1
        const spasial = {
          kepadatanPendudukPerDesa: totalPenduduk / luasWilayahTotal,
          jarakRataRataAntarDesa: 12.5, // Mock data - dalam implementasi nyata dihitung dari koordinat
          jumlahFasilitasUmum: {
            pendidikan:
              pendidikan.jumlahFasilitasPendidikan.PAUD +
              pendidikan.jumlahFasilitasPendidikan.TK +
              pendidikan.jumlahFasilitasPendidikan.SD +
              pendidikan.jumlahFasilitasPendidikan.SMP,
            ekonomi: ekonomi.jumlahPasar,
          },
        };

        return {
          totalDesa,
          totalPenduduk,
          totalKK,
          luasWilayahTotal,
          kependudukan,
          ekonomi,
          pendidikan,
          infrastruktur,
          spasial,
        };
      };

      setGlobalStats(calculateGlobalStats(mockDesaData));
      setLoading(false);
    };

    fetchAnalysisData();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const formatPercentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredDesaData =
    selectedDesa === "all"
      ? desaData
      : desaData.filter((desa) => desa.id === selectedDesa);

  if (loading || !globalStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">
            Memuat analisis data tingkat 1...
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
                <FiBarChart className="w-8 h-8 mr-3 text-blue-600" />
                Analisis Data Tingkat 1 (Dasar)
              </h1>
              <p className="mt-2 text-gray-600">
                Statistik dasar semua kategori data desa untuk mendukung
                kebijakan pemerintah pusat di Kabupaten Gorontalo
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
        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter Analisis:
              </span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as AnalysisCategory)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Kategori</option>
              <option value="kependudukan">Kependudukan</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="infrastruktur">Infrastruktur</option>
              <option value="spasial">Spasial & Geografis</option>
            </select>

            <select
              value={selectedDesa}
              onChange={(e) => setSelectedDesa(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Desa</option>
              {desaData.map((desa) => (
                <option key={desa.id} value={desa.id}>
                  {desa.namaDesa}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FiClock className="w-4 h-4" />
              <span>
                Update terakhir: {new Date().toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Desa</p>
                <p className="text-2xl font-bold text-gray-900">
                  {globalStats.totalDesa}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiMapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">
                Luas Total: {formatNumber(globalStats.luasWilayahTotal)} km²
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Penduduk
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(globalStats.totalPenduduk)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <FiActivity className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600">
                Kepadatan:{" "}
                {formatNumber(
                  Math.round(globalStats.spasial.kepadatanPendudukPerDesa)
                )}{" "}
                jiwa/km²
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Kepala Keluarga
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(globalStats.totalKK)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiHome className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <FiTarget className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-purple-600">
                Rata-rata:{" "}
                {(globalStats.totalPenduduk / globalStats.totalKK).toFixed(1)}{" "}
                jiwa/KK
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Fasilitas Umum
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(
                    globalStats.spasial.jumlahFasilitasUmum.pendidikan +
                      globalStats.spasial.jumlahFasilitasUmum.ekonomi
                  )}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiDatabase className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <FiCheckCircle className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-600">
                Pendidikan: {globalStats.spasial.jumlahFasilitasUmum.pendidikan}{" "}
                | Ekonomi: {globalStats.spasial.jumlahFasilitasUmum.ekonomi}
              </span>
            </div>
          </div>
        </div>

        {/* Analisis Kependudukan */}
        {(selectedCategory === "all" ||
          selectedCategory === "kependudukan") && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiUsers className="w-6 h-6 mr-3 text-blue-600" />
                Analisis Tingkat 1 - Data Kependudukan
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Jenis Kelamin */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Jenis Kelamin
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Laki-laki</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-blue-600">
                          {formatNumber(
                            globalStats.kependudukan.jumlahPendudukJenisKelamin
                              .lakiLaki
                          )}
                        </span>
                        <Badge variant="info" size="sm">
                          {formatPercentage(
                            globalStats.kependudukan.jumlahPendudukJenisKelamin
                              .lakiLaki,
                            globalStats.totalPenduduk
                          )}
                          %
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${formatPercentage(
                            globalStats.kependudukan.jumlahPendudukJenisKelamin
                              .lakiLaki,
                            globalStats.totalPenduduk
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Perempuan</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-pink-600">
                          {formatNumber(
                            globalStats.kependudukan.jumlahPendudukJenisKelamin
                              .perempuan
                          )}
                        </span>
                        <Badge variant="warning" size="sm">
                          {formatPercentage(
                            globalStats.kependudukan.jumlahPendudukJenisKelamin
                              .perempuan,
                            globalStats.totalPenduduk
                          )}
                          %
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-pink-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${formatPercentage(
                            globalStats.kependudukan.jumlahPendudukJenisKelamin
                              .perempuan,
                            globalStats.totalPenduduk
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Kelompok Usia */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Kelompok Usia
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Balita (0-5 tahun)",
                        value:
                          globalStats.kependudukan.jumlahPendudukKelompokUsia
                            .balita,
                        color: "bg-green-500",
                      },
                      {
                        label: "Anak (6-12 tahun)",
                        value:
                          globalStats.kependudukan.jumlahPendudukKelompokUsia
                            .anak,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Remaja (13-17 tahun)",
                        value:
                          globalStats.kependudukan.jumlahPendudukKelompokUsia
                            .remaja,
                        color: "bg-purple-500",
                      },
                      {
                        label: "Dewasa (18-64 tahun)",
                        value:
                          globalStats.kependudukan.jumlahPendudukKelompokUsia
                            .dewasa,
                        color: "bg-orange-500",
                      },
                      {
                        label: "Lansia (65+ tahun)",
                        value:
                          globalStats.kependudukan.jumlahPendudukKelompokUsia
                            .lansia,
                        color: "bg-red-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-300`}
                              style={{
                                width: `${formatPercentage(
                                  item.value,
                                  globalStats.totalPenduduk
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-16 text-right">
                            {formatNumber(item.value)}
                          </span>
                          <Badge variant="default" size="sm">
                            {formatPercentage(
                              item.value,
                              globalStats.totalPenduduk
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agama */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Agama
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Islam",
                        value:
                          globalStats.kependudukan.jumlahPendudukAgama.islam,
                        color: "bg-green-500",
                      },
                      {
                        label: "Kristen",
                        value:
                          globalStats.kependudukan.jumlahPendudukAgama.kristen,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Katolik",
                        value:
                          globalStats.kependudukan.jumlahPendudukAgama.katolik,
                        color: "bg-purple-500",
                      },
                      {
                        label: "Hindu",
                        value:
                          globalStats.kependudukan.jumlahPendudukAgama.hindu,
                        color: "bg-orange-500",
                      },
                      {
                        label: "Buddha",
                        value:
                          globalStats.kependudukan.jumlahPendudukAgama.buddha,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Konghucu",
                        value:
                          globalStats.kependudukan.jumlahPendudukAgama.konghucu,
                        color: "bg-red-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-300`}
                              style={{
                                width: `${Math.max(
                                  formatPercentage(
                                    item.value,
                                    globalStats.totalPenduduk
                                  ),
                                  1
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-16 text-right">
                            {formatNumber(item.value)}
                          </span>
                          <Badge variant="default" size="sm">
                            {formatPercentage(
                              item.value,
                              globalStats.totalPenduduk
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tingkat Pendidikan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Tingkat Pendidikan
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Tidak Sekolah",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tidakSekolah,
                        color: "bg-red-500",
                      },
                      {
                        label: "Tidak Tamat SD",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tidakTamatSD,
                        color: "bg-orange-500",
                      },
                      {
                        label: "Tamat SD",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatSD,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Tamat SMP",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatSMP,
                        color: "bg-green-500",
                      },
                      {
                        label: "Tamat SMA",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatSMA,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Tamat Diploma",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatDiploma,
                        color: "bg-indigo-500",
                      },
                      {
                        label: "Tamat S1",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatS1,
                        color: "bg-purple-500",
                      },
                      {
                        label: "Tamat S2",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatS2,
                        color: "bg-pink-500",
                      },
                      {
                        label: "Tamat S3",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukTingkatPendidikan.tamatS3,
                        color: "bg-gray-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-300`}
                              style={{
                                width: `${Math.max(
                                  formatPercentage(
                                    item.value,
                                    globalStats.totalPenduduk
                                  ),
                                  1
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-16 text-right">
                            {formatNumber(item.value)}
                          </span>
                          <Badge variant="default" size="sm">
                            {formatPercentage(
                              item.value,
                              globalStats.totalPenduduk
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Pernikahan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Status Pernikahan
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Belum Kawin",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukStatusPernikahan.belumKawin,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Kawin",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukStatusPernikahan.kawin,
                        color: "bg-green-500",
                      },
                      {
                        label: "Cerai Hidup",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukStatusPernikahan.ceraiHidup,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Cerai Mati",
                        value:
                          globalStats.kependudukan
                            .jumlahPendudukStatusPernikahan.ceraiMati,
                        color: "bg-red-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{item.label}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-3">
                            <div
                              className={`${item.color} h-3 rounded-full transition-all duration-300`}
                              style={{
                                width: `${formatPercentage(
                                  item.value,
                                  globalStats.totalPenduduk
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-semibold text-gray-900 w-20 text-right">
                            {formatNumber(item.value)}
                          </span>
                          <Badge variant="info" size="sm">
                            {formatPercentage(
                              item.value,
                              globalStats.totalPenduduk
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jenis Pekerjaan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Jenis Pekerjaan
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Petani",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .petani,
                        color: "bg-green-500",
                      },
                      {
                        label: "Buruh Tani",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .buruhTani,
                        color: "bg-green-400",
                      },
                      {
                        label: "Nelayan",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .nelayan,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Pedagang",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .pedagang,
                        color: "bg-purple-500",
                      },
                      {
                        label: "PNS",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .pns,
                        color: "bg-indigo-500",
                      },
                      {
                        label: "Swasta",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .swasta,
                        color: "bg-orange-500",
                      },
                      {
                        label: "Wiraswasta",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .wiraswasta,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Pensiunan",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .pensiunan,
                        color: "bg-gray-500",
                      },
                      {
                        label: "Ibu Rumah Tangga",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .ibuRumahTangga,
                        color: "bg-pink-500",
                      },
                      {
                        label: "Pelajar",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .pelajar,
                        color: "bg-cyan-500",
                      },
                      {
                        label: "Belum Bekerja",
                        value:
                          globalStats.kependudukan.jumlahPendudukJenisPekerjaan
                            .belumBekerja,
                        color: "bg-red-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-300`}
                              style={{
                                width: `${Math.max(
                                  formatPercentage(
                                    item.value,
                                    globalStats.totalPenduduk
                                  ),
                                  1
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-16 text-right">
                            {formatNumber(item.value)}
                          </span>
                          <Badge variant="default" size="sm">
                            {formatPercentage(
                              item.value,
                              globalStats.totalPenduduk
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Kependudukan */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Ringkasan Analisis Kependudukan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">
                      Total Kepala Keluarga:
                    </span>
                    <span className="font-semibold text-blue-900 ml-2">
                      {formatNumber(
                        globalStats.kependudukan.jumlahKepalaKeluarga
                      )}{" "}
                      KK
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Rasio Jenis Kelamin:</span>
                    <span className="font-semibold text-blue-900 ml-2">
                      {(
                        (globalStats.kependudukan.jumlahPendudukJenisKelamin
                          .lakiLaki /
                          globalStats.kependudukan.jumlahPendudukJenisKelamin
                            .perempuan) *
                        100
                      ).toFixed(1)}{" "}
                      : 100
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">
                      Usia Produktif (18-64):
                    </span>
                    <span className="font-semibold text-blue-900 ml-2">
                      {formatPercentage(
                        globalStats.kependudukan.jumlahPendudukKelompokUsia
                          .dewasa,
                        globalStats.totalPenduduk
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analisis Ekonomi */}
        {(selectedCategory === "all" || selectedCategory === "ekonomi") && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiDollarSign className="w-6 h-6 mr-3 text-green-600" />
                Analisis Tingkat 1 - Data Ekonomi
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mata Pencaharian */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Penduduk Berdasarkan Mata Pencaharian
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Petani",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .petani,
                        color: "bg-green-500",
                      },
                      {
                        label: "Buruh Tani",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .buruhTani,
                        color: "bg-green-400",
                      },
                      {
                        label: "Nelayan",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .nelayan,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Pedagang",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .pedagang,
                        color: "bg-purple-500",
                      },
                      {
                        label: "PNS",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian.pns,
                        color: "bg-indigo-500",
                      },
                      {
                        label: "Swasta",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .swasta,
                        color: "bg-orange-500",
                      },
                      {
                        label: "Wiraswasta",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .wiraswasta,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Pensiunan",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .pensiunan,
                        color: "bg-gray-500",
                      },
                      {
                        label: "Ibu Rumah Tangga",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .ibuRumahTangga,
                        color: "bg-pink-500",
                      },
                      {
                        label: "Pelajar",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .pelajar,
                        color: "bg-cyan-500",
                      },
                      {
                        label: "Belum Bekerja",
                        value:
                          globalStats.ekonomi.jumlahPendudukMataPencaharian
                            .belumBekerja,
                        color: "bg-red-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-300`}
                              style={{
                                width: `${Math.max(
                                  formatPercentage(
                                    item.value,
                                    globalStats.totalPenduduk
                                  ),
                                  1
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-16 text-right">
                            {formatNumber(item.value)}
                          </span>
                          <Badge variant="default" size="sm">
                            {formatPercentage(
                              item.value,
                              globalStats.totalPenduduk
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UMKM Berdasarkan Jenis Usaha */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah UMKM Berdasarkan Jenis Usaha
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Pertanian",
                        value:
                          globalStats.ekonomi.jumlahUMKMJenisUsaha.pertanian,
                        color: "bg-green-500",
                      },
                      {
                        label: "Peternakan",
                        value:
                          globalStats.ekonomi.jumlahUMKMJenisUsaha.peternakan,
                        color: "bg-brown-500",
                      },
                      {
                        label: "Perikanan",
                        value:
                          globalStats.ekonomi.jumlahUMKMJenisUsaha.perikanan,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Perdagangan",
                        value:
                          globalStats.ekonomi.jumlahUMKMJenisUsaha.perdagangan,
                        color: "bg-purple-500",
                      },
                      {
                        label: "Jasa",
                        value: globalStats.ekonomi.jumlahUMKMJenisUsaha.jasa,
                        color: "bg-orange-500",
                      },
                      {
                        label: "Industri",
                        value:
                          globalStats.ekonomi.jumlahUMKMJenisUsaha.industri,
                        color: "bg-gray-500",
                      },
                    ].map((item, index) => {
                      const totalUMKM = Object.values(
                        globalStats.ekonomi.jumlahUMKMJenisUsaha
                      ).reduce((sum, val) => sum + val, 0);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{item.label}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-3">
                              <div
                                className={`${item.color} h-3 rounded-full transition-all duration-300`}
                                style={{
                                  width: `${formatPercentage(
                                    item.value,
                                    totalUMKM
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="font-semibold text-gray-900 w-16 text-right">
                              {formatNumber(item.value)}
                            </span>
                            <Badge variant="success" size="sm">
                              {formatPercentage(item.value, totalUMKM)}%
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        Total UMKM:
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {formatNumber(
                          Object.values(
                            globalStats.ekonomi.jumlahUMKMJenisUsaha
                          ).reduce((sum, val) => sum + val, 0)
                        )}{" "}
                        unit
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hasil Produksi */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Total Hasil Produksi
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            <FiTrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Hasil Pertanian
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                              {globalStats.ekonomi.totalHasilPertanian.toFixed(
                                1
                              )}{" "}
                              ton
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <FiMapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Jumlah Pasar
                            </p>
                            <p className="text-lg font-semibold text-blue-600">
                              {formatNumber(globalStats.ekonomi.jumlahPasar)}{" "}
                              unit
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Kemiskinan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Data Warga Miskin dan Bantuan Sosial
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="text-sm text-red-600">
                          Jumlah Warga Miskin
                        </p>
                        <p className="text-2xl font-bold text-red-700">
                          {formatNumber(globalStats.ekonomi.jumlahWargaMiskin)}
                        </p>
                        <p className="text-xs text-red-500">
                          {formatPercentage(
                            globalStats.ekonomi.jumlahWargaMiskin,
                            globalStats.totalPenduduk
                          )}
                          % dari total penduduk
                        </p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-full">
                        <FiAlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="text-sm text-green-600">
                          Penerima Bantuan
                        </p>
                        <p className="text-2xl font-bold text-green-700">
                          {formatNumber(
                            globalStats.ekonomi.jumlahPenerimaBantuan
                          )}
                        </p>
                        <p className="text-xs text-green-500">
                          {formatPercentage(
                            globalStats.ekonomi.jumlahPenerimaBantuan,
                            globalStats.ekonomi.jumlahWargaMiskin
                          )}
                          % dari warga miskin
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <FiCheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Coverage Bantuan:</span>
                        <Badge
                          variant={
                            formatPercentage(
                              globalStats.ekonomi.jumlahPenerimaBantuan,
                              globalStats.ekonomi.jumlahWargaMiskin
                            ) >= 80
                              ? "success"
                              : formatPercentage(
                                  globalStats.ekonomi.jumlahPenerimaBantuan,
                                  globalStats.ekonomi.jumlahWargaMiskin
                                ) >= 60
                              ? "warning"
                              : "danger"
                          }
                        >
                          {formatPercentage(
                            globalStats.ekonomi.jumlahPenerimaBantuan,
                            globalStats.ekonomi.jumlahWargaMiskin
                          )}
                          %
                        </Badge>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${formatPercentage(
                              globalStats.ekonomi.jumlahPenerimaBantuan,
                              globalStats.ekonomi.jumlahWargaMiskin
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Ekonomi */}
              <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  Ringkasan Analisis Ekonomi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-green-700">Sektor Dominan:</span>
                    <span className="font-semibold text-green-900 ml-2">
                      Pertanian
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Total UMKM:</span>
                    <span className="font-semibold text-green-900 ml-2">
                      {formatNumber(
                        Object.values(
                          globalStats.ekonomi.jumlahUMKMJenisUsaha
                        ).reduce((sum, val) => sum + val, 0)
                      )}{" "}
                      unit
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Tingkat Kemiskinan:</span>
                    <span className="font-semibold text-green-900 ml-2">
                      {formatPercentage(
                        globalStats.ekonomi.jumlahWargaMiskin,
                        globalStats.totalPenduduk
                      )}
                      %
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Coverage Bantuan:</span>
                    <span className="font-semibold text-green-900 ml-2">
                      {formatPercentage(
                        globalStats.ekonomi.jumlahPenerimaBantuan,
                        globalStats.ekonomi.jumlahWargaMiskin
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analisis Pendidikan */}
        {(selectedCategory === "all" || selectedCategory === "pendidikan") && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiBook className="w-6 h-6 mr-3 text-purple-600" />
                Analisis Tingkat 1 - Data Pendidikan
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fasilitas Pendidikan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Fasilitas Pendidikan Berdasarkan Jenjang
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "PAUD",
                        value:
                          globalStats.pendidikan.jumlahFasilitasPendidikan.PAUD,
                        color: "bg-pink-500",
                        icon: "🏫",
                      },
                      {
                        label: "TK",
                        value:
                          globalStats.pendidikan.jumlahFasilitasPendidikan.TK,
                        color: "bg-purple-500",
                        icon: "🎨",
                      },
                      {
                        label: "SD",
                        value:
                          globalStats.pendidikan.jumlahFasilitasPendidikan.SD,
                        color: "bg-blue-500",
                        icon: "📚",
                      },
                      {
                        label: "SMP",
                        value:
                          globalStats.pendidikan.jumlahFasilitasPendidikan.SMP,
                        color: "bg-green-500",
                        icon: "🎓",
                      },
                    ].map((item, index) => {
                      const totalFasilitas = Object.values(
                        globalStats.pendidikan.jumlahFasilitasPendidikan
                      ).reduce((sum, val) => sum + val, 0);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{item.icon}</span>
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-3">
                              <div
                                className={`${item.color} h-3 rounded-full transition-all duration-300`}
                                style={{
                                  width: `${formatPercentage(
                                    item.value,
                                    totalFasilitas
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="font-bold text-gray-900 w-12 text-right">
                              {formatNumber(item.value)}
                            </span>
                            <Badge variant="info" size="sm">
                              {formatPercentage(item.value, totalFasilitas)}%
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        Total Fasilitas:
                      </span>
                      <span className="text-xl font-bold text-purple-600">
                        {formatNumber(
                          Object.values(
                            globalStats.pendidikan.jumlahFasilitasPendidikan
                          ).reduce((sum, val) => sum + val, 0)
                        )}{" "}
                        unit
                      </span>
                    </div>
                  </div>
                </div>

                {/* Kapasitas Fasilitas Pendidikan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Kapasitas Total Fasilitas Pendidikan per Jenjang
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "PAUD",
                        value:
                          globalStats.pendidikan
                            .kapasitasTotalFasilitasPendidikan.PAUD,
                        color: "bg-pink-500",
                        icon: "👶",
                      },
                      {
                        label: "TK",
                        value:
                          globalStats.pendidikan
                            .kapasitasTotalFasilitasPendidikan.TK,
                        color: "bg-purple-500",
                        icon: "🧒",
                      },
                      {
                        label: "SD",
                        value:
                          globalStats.pendidikan
                            .kapasitasTotalFasilitasPendidikan.SD,
                        color: "bg-blue-500",
                        icon: "👦",
                      },
                      {
                        label: "SMP",
                        value:
                          globalStats.pendidikan
                            .kapasitasTotalFasilitasPendidikan.SMP,
                        color: "bg-green-500",
                        icon: "👧",
                      },
                    ].map((item, index) => {
                      const totalKapasitas = Object.values(
                        globalStats.pendidikan.kapasitasTotalFasilitasPendidikan
                      ).reduce((sum, val) => sum + val, 0);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{item.icon}</span>
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-3">
                              <div
                                className={`${item.color} h-3 rounded-full transition-all duration-300`}
                                style={{
                                  width: `${formatPercentage(
                                    item.value,
                                    totalKapasitas
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="font-bold text-gray-900 w-16 text-right">
                              {formatNumber(item.value)}
                            </span>
                            <Badge variant="success" size="sm">
                              {formatPercentage(item.value, totalKapasitas)}%
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        Total Kapasitas:
                      </span>
                      <span className="text-xl font-bold text-purple-600">
                        {formatNumber(
                          Object.values(
                            globalStats.pendidikan
                              .kapasitasTotalFasilitasPendidikan
                          ).reduce((sum, val) => sum + val, 0)
                        )}{" "}
                        siswa
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rasio Fasilitas vs Populasi */}
                <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Analisis Rasio Fasilitas Pendidikan vs Populasi Usia Sekolah
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800">
                        Rasio Fasilitas per 1000 Penduduk
                      </h4>
                      {[
                        {
                          label: "PAUD",
                          fasilitas:
                            globalStats.pendidikan.jumlahFasilitasPendidikan
                              .PAUD,
                          populasi:
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .balita,
                          color: "text-pink-600",
                        },
                        {
                          label: "TK",
                          fasilitas:
                            globalStats.pendidikan.jumlahFasilitasPendidikan.TK,
                          populasi:
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .balita,
                          color: "text-purple-600",
                        },
                        {
                          label: "SD",
                          fasilitas:
                            globalStats.pendidikan.jumlahFasilitasPendidikan.SD,
                          populasi:
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .anak,
                          color: "text-blue-600",
                        },
                        {
                          label: "SMP",
                          fasilitas:
                            globalStats.pendidikan.jumlahFasilitasPendidikan
                              .SMP,
                          populasi:
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .remaja,
                          color: "text-green-600",
                        },
                      ].map((item, index) => {
                        const rasio = (item.fasilitas / item.populasi) * 1000;
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                          >
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                            <div className="text-right">
                              <span
                                className={`text-lg font-bold ${item.color}`}
                              >
                                {rasio.toFixed(1)}
                              </span>
                              <p className="text-xs text-gray-500">
                                per 1000 anak
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800">
                        Kapasitas vs Kebutuhan
                      </h4>
                      {[
                        {
                          label: "PAUD",
                          kapasitas:
                            globalStats.pendidikan
                              .kapasitasTotalFasilitasPendidikan.PAUD,
                          kebutuhan: Math.round(
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .balita * 0.6
                          ), // Asumsi 60% balita masuk PAUD
                          color: "text-pink-600",
                        },
                        {
                          label: "TK",
                          kapasitas:
                            globalStats.pendidikan
                              .kapasitasTotalFasilitasPendidikan.TK,
                          kebutuhan: Math.round(
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .balita * 0.4
                          ), // Asumsi 40% balita masuk TK
                          color: "text-purple-600",
                        },
                        {
                          label: "SD",
                          kapasitas:
                            globalStats.pendidikan
                              .kapasitasTotalFasilitasPendidikan.SD,
                          kebutuhan:
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .anak,
                          color: "text-blue-600",
                        },
                        {
                          label: "SMP",
                          kapasitas:
                            globalStats.pendidikan
                              .kapasitasTotalFasilitasPendidikan.SMP,
                          kebutuhan:
                            globalStats.kependudukan.jumlahPendudukKelompokUsia
                              .remaja,
                          color: "text-green-600",
                        },
                      ].map((item, index) => {
                        const coverage =
                          (item.kapasitas / item.kebutuhan) * 100;
                        const isAdequate = coverage >= 100;
                        return (
                          <div
                            key={index}
                            className="p-3 bg-white rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">
                                {item.label}
                              </span>
                              <Badge
                                variant={
                                  isAdequate
                                    ? "success"
                                    : coverage >= 80
                                    ? "warning"
                                    : "danger"
                                }
                                size="sm"
                              >
                                {coverage.toFixed(1)}%
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              Kapasitas: {formatNumber(item.kapasitas)} |
                              Kebutuhan: {formatNumber(item.kebutuhan)}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  isAdequate
                                    ? "bg-green-500"
                                    : coverage >= 80
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${Math.min(coverage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Pendidikan */}
              <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Ringkasan Analisis Pendidikan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-purple-700">Total Fasilitas:</span>
                    <span className="font-semibold text-purple-900 ml-2">
                      {formatNumber(
                        Object.values(
                          globalStats.pendidikan.jumlahFasilitasPendidikan
                        ).reduce((sum, val) => sum + val, 0)
                      )}{" "}
                      unit
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-700">Total Kapasitas:</span>
                    <span className="font-semibold text-purple-900 ml-2">
                      {formatNumber(
                        Object.values(
                          globalStats.pendidikan
                            .kapasitasTotalFasilitasPendidikan
                        ).reduce((sum, val) => sum + val, 0)
                      )}{" "}
                      siswa
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-700">Jenjang Terbanyak:</span>
                    <span className="font-semibold text-purple-900 ml-2">
                      SD ({globalStats.pendidikan.jumlahFasilitasPendidikan.SD}{" "}
                      unit)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analisis Infrastruktur */}
        {(selectedCategory === "all" ||
          selectedCategory === "infrastruktur") && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiHome className="w-6 h-6 mr-3 text-orange-600" />
                Analisis Tingkat 1 - Data Infrastruktur
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Kondisi Jalan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Total Panjang Jalan Berdasarkan Kondisi
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-gray-900">
                        {globalStats.infrastruktur.totalPanjangJalan.toFixed(1)}{" "}
                        km
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Panjang Jalan
                      </p>
                    </div>

                    {[
                      {
                        label: "Kondisi Baik",
                        value:
                          globalStats.infrastruktur.totalPanjangJalanKondisi
                            .baik,
                        color: "bg-green-500",
                        textColor: "text-green-700",
                        bgColor: "bg-green-50",
                        borderColor: "border-green-200",
                      },
                      {
                        label: "Kondisi Sedang",
                        value:
                          globalStats.infrastruktur.totalPanjangJalanKondisi
                            .sedang,
                        color: "bg-yellow-500",
                        textColor: "text-yellow-700",
                        bgColor: "bg-yellow-50",
                        borderColor: "border-yellow-200",
                      },
                      {
                        label: "Kondisi Rusak",
                        value:
                          globalStats.infrastruktur.totalPanjangJalanKondisi
                            .rusak,
                        color: "bg-red-500",
                        textColor: "text-red-700",
                        bgColor: "bg-red-50",
                        borderColor: "border-red-200",
                      },
                    ].map((item, index) => {
                      const percentage = formatPercentage(
                        item.value,
                        globalStats.infrastruktur.totalPanjangJalan
                      );
                      return (
                        <div
                          key={index}
                          className={`p-4 ${item.bgColor} rounded-lg border ${item.borderColor}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${item.textColor}`}>
                              {item.label}
                            </span>
                            <Badge
                              variant={
                                index === 0
                                  ? "success"
                                  : index === 1
                                  ? "warning"
                                  : "danger"
                              }
                              size="sm"
                            >
                              {percentage}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-2xl font-bold ${item.textColor}`}
                            >
                              {item.value.toFixed(1)} km
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`${item.color} h-3 rounded-full transition-all duration-300`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kondisi Jembatan */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jumlah Jembatan Berdasarkan Kondisi
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-gray-900">
                        {formatNumber(globalStats.infrastruktur.totalJembatan)}
                      </p>
                      <p className="text-sm text-gray-600">Total Jembatan</p>
                    </div>

                    {[
                      {
                        label: "Kondisi Baik",
                        value:
                          globalStats.infrastruktur.totalJembatanKondisi.baik,
                        color: "bg-green-500",
                        textColor: "text-green-700",
                        bgColor: "bg-green-50",
                        borderColor: "border-green-200",
                        icon: "🌉",
                      },
                      {
                        label: "Kondisi Rusak",
                        value:
                          globalStats.infrastruktur.totalJembatanKondisi.rusak,
                        color: "bg-red-500",
                        textColor: "text-red-700",
                        bgColor: "bg-red-50",
                        borderColor: "border-red-200",
                        icon: "⚠️",
                      },
                    ].map((item, index) => {
                      const percentage = formatPercentage(
                        item.value,
                        globalStats.infrastruktur.totalJembatan
                      );
                      return (
                        <div
                          key={index}
                          className={`p-4 ${item.bgColor} rounded-lg border ${item.borderColor}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{item.icon}</span>
                              <span className={`font-medium ${item.textColor}`}>
                                {item.label}
                              </span>
                            </div>
                            <Badge
                              variant={index === 0 ? "success" : "danger"}
                              size="sm"
                            >
                              {percentage}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-2xl font-bold ${item.textColor}`}
                            >
                              {formatNumber(item.value)} unit
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`${item.color} h-3 rounded-full transition-all duration-300`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Indeks Kualitas Infrastruktur */}
                <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Indeks Kualitas Infrastruktur
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Kualitas Jalan
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Baik</span>
                          <span className="font-medium">
                            {formatPercentage(
                              globalStats.infrastruktur.totalPanjangJalanKondisi
                                .baik,
                              globalStats.infrastruktur.totalPanjangJalan
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-600">Sedang</span>
                          <span className="font-medium">
                            {formatPercentage(
                              globalStats.infrastruktur.totalPanjangJalanKondisi
                                .sedang,
                              globalStats.infrastruktur.totalPanjangJalan
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600">Rusak</span>
                          <span className="font-medium">
                            {formatPercentage(
                              globalStats.infrastruktur.totalPanjangJalanKondisi
                                .rusak,
                              globalStats.infrastruktur.totalPanjangJalan
                            )}
                            %
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-900">
                              Indeks Kualitas:
                            </span>
                            <Badge
                              variant={
                                formatPercentage(
                                  globalStats.infrastruktur
                                    .totalPanjangJalanKondisi.baik,
                                  globalStats.infrastruktur.totalPanjangJalan
                                ) >= 70
                                  ? "success"
                                  : formatPercentage(
                                      globalStats.infrastruktur
                                        .totalPanjangJalanKondisi.baik,
                                      globalStats.infrastruktur
                                        .totalPanjangJalan
                                    ) >= 50
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {(
                                (globalStats.infrastruktur
                                  .totalPanjangJalanKondisi.baik *
                                  100 +
                                  globalStats.infrastruktur
                                    .totalPanjangJalanKondisi.sedang *
                                    60 +
                                  globalStats.infrastruktur
                                    .totalPanjangJalanKondisi.rusak *
                                    20) /
                                globalStats.infrastruktur.totalPanjangJalan
                              ).toFixed(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Kualitas Jembatan
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Baik</span>
                          <span className="font-medium">
                            {formatPercentage(
                              globalStats.infrastruktur.totalJembatanKondisi
                                .baik,
                              globalStats.infrastruktur.totalJembatan
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600">Rusak</span>
                          <span className="font-medium">
                            {formatPercentage(
                              globalStats.infrastruktur.totalJembatanKondisi
                                .rusak,
                              globalStats.infrastruktur.totalJembatan
                            )}
                            %
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-900">
                              Indeks Kualitas:
                            </span>
                            <Badge
                              variant={
                                formatPercentage(
                                  globalStats.infrastruktur.totalJembatanKondisi
                                    .baik,
                                  globalStats.infrastruktur.totalJembatan
                                ) >= 80
                                  ? "success"
                                  : formatPercentage(
                                      globalStats.infrastruktur
                                        .totalJembatanKondisi.baik,
                                      globalStats.infrastruktur.totalJembatan
                                    ) >= 60
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {formatPercentage(
                                globalStats.infrastruktur.totalJembatanKondisi
                                  .baik,
                                globalStats.infrastruktur.totalJembatan
                              )}
                              %
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Prioritas Perbaikan
                      </h4>
                      <div className="space-y-3">
                        <div className="p-2 bg-red-50 rounded border border-red-200">
                          <p className="text-sm font-medium text-red-700">
                            Jalan Rusak
                          </p>
                          <p className="text-lg font-bold text-red-800">
                            {globalStats.infrastruktur.totalPanjangJalanKondisi.rusak.toFixed(
                              1
                            )}{" "}
                            km
                          </p>
                        </div>
                        <div className="p-2 bg-red-50 rounded border border-red-200">
                          <p className="text-sm font-medium text-red-700">
                            Jembatan Rusak
                          </p>
                          <p className="text-lg font-bold text-red-800">
                            {formatNumber(
                              globalStats.infrastruktur.totalJembatanKondisi
                                .rusak
                            )}{" "}
                            unit
                          </p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-sm font-medium text-yellow-700">
                            Jalan Sedang
                          </p>
                          <p className="text-lg font-bold text-yellow-800">
                            {globalStats.infrastruktur.totalPanjangJalanKondisi.sedang.toFixed(
                              1
                            )}{" "}
                            km
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Infrastruktur */}
              <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Ringkasan Analisis Infrastruktur
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-orange-700">Total Jalan:</span>
                    <span className="font-semibold text-orange-900 ml-2">
                      {globalStats.infrastruktur.totalPanjangJalan.toFixed(1)}{" "}
                      km
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-700">Jalan Baik:</span>
                    <span className="font-semibold text-orange-900 ml-2">
                      {formatPercentage(
                        globalStats.infrastruktur.totalPanjangJalanKondisi.baik,
                        globalStats.infrastruktur.totalPanjangJalan
                      )}
                      %
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-700">Total Jembatan:</span>
                    <span className="font-semibold text-orange-900 ml-2">
                      {formatNumber(globalStats.infrastruktur.totalJembatan)}{" "}
                      unit
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-700">Jembatan Baik:</span>
                    <span className="font-semibold text-orange-900 ml-2">
                      {formatPercentage(
                        globalStats.infrastruktur.totalJembatanKondisi.baik,
                        globalStats.infrastruktur.totalJembatan
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analisis Spasial dan Geografis */}
        {(selectedCategory === "all" || selectedCategory === "spasial") && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiMapPin className="w-6 h-6 mr-3 text-indigo-600" />
                Analisis Tingkat 1 - Spasial & Geografis
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kepadatan Penduduk */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Kepadatan Penduduk per Desa
                  </h3>
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-indigo-600">
                      {formatNumber(
                        Math.round(globalStats.spasial.kepadatanPendudukPerDesa)
                      )}
                    </p>
                    <p className="text-sm text-gray-600">jiwa per km²</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Total Penduduk
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatNumber(globalStats.totalPenduduk)} jiwa
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Total Luas Wilayah
                        </span>
                        <span className="font-semibold text-gray-900">
                          {globalStats.luasWilayahTotal.toFixed(1)} km²
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Jumlah Desa
                        </span>
                        <span className="font-semibold text-gray-900">
                          {globalStats.totalDesa} desa
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-xs text-indigo-700">
                      <strong>Kategori:</strong>{" "}
                      {globalStats.spasial.kepadatanPendudukPerDesa > 1000
                        ? "Kepadatan Tinggi"
                        : globalStats.spasial.kepadatanPendudukPerDesa > 500
                        ? "Kepadatan Sedang"
                        : "Kepadatan Rendah"}
                    </p>
                  </div>
                </div>

                {/* Jarak Rata-rata Antar Desa */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Jarak Rata-rata Antar Desa
                  </h3>
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-green-600">
                      {globalStats.spasial.jarakRataRataAntarDesa.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">kilometer</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Jarak Terdekat
                        </span>
                        <span className="font-semibold text-green-600">
                          {(
                            globalStats.spasial.jarakRataRataAntarDesa * 0.6
                          ).toFixed(1)}{" "}
                          km
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Jarak Terjauh
                        </span>
                        <span className="font-semibold text-red-600">
                          {(
                            globalStats.spasial.jarakRataRataAntarDesa * 1.8
                          ).toFixed(1)}{" "}
                          km
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700">
                      <strong>Aksesibilitas:</strong>{" "}
                      {globalStats.spasial.jarakRataRataAntarDesa < 5
                        ? "Sangat Baik"
                        : globalStats.spasial.jarakRataRataAntarDesa < 10
                        ? "Baik"
                        : globalStats.spasial.jarakRataRataAntarDesa < 15
                        ? "Sedang"
                        : "Perlu Perhatian"}
                    </p>
                  </div>
                </div>

                {/* Distribusi Fasilitas Umum */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Distribusi Fasilitas Umum
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FiBook className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="font-medium text-gray-900">
                            Fasilitas Pendidikan
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">
                          {formatNumber(
                            globalStats.spasial.jumlahFasilitasUmum.pendidikan
                          )}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Rasio:{" "}
                        {(
                          globalStats.spasial.jumlahFasilitasUmum.pendidikan /
                          globalStats.totalDesa
                        ).toFixed(1)}{" "}
                        per desa
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (globalStats.spasial.jumlahFasilitasUmum
                                .pendidikan /
                                globalStats.totalDesa) *
                                20,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FiDollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-medium text-gray-900">
                            Fasilitas Ekonomi
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {formatNumber(
                            globalStats.spasial.jumlahFasilitasUmum.ekonomi
                          )}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Rasio:{" "}
                        {(
                          globalStats.spasial.jumlahFasilitasUmum.ekonomi /
                          globalStats.totalDesa
                        ).toFixed(1)}{" "}
                        per desa
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (globalStats.spasial.jumlahFasilitasUmum.ekonomi /
                                globalStats.totalDesa) *
                                30,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Total Fasilitas
                        </span>
                        <span className="text-2xl font-bold text-indigo-600">
                          {formatNumber(
                            globalStats.spasial.jumlahFasilitasUmum.pendidikan +
                              globalStats.spasial.jumlahFasilitasUmum.ekonomi
                          )}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Rasio:{" "}
                        {(
                          (globalStats.spasial.jumlahFasilitasUmum.pendidikan +
                            globalStats.spasial.jumlahFasilitasUmum.ekonomi) /
                          globalStats.totalDesa
                        ).toFixed(1)}{" "}
                        per desa
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analisis Spasial Lanjutan */}
                <div className="lg:col-span-3 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Analisis Spasial Komprehensif
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <FiTarget className="w-4 h-4 mr-2 text-blue-600" />
                        Indeks Kepadatan
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Kepadatan Rata-rata
                          </span>
                          <Badge
                            variant={
                              globalStats.spasial.kepadatanPendudukPerDesa >
                              1000
                                ? "danger"
                                : globalStats.spasial.kepadatanPendudukPerDesa >
                                  500
                                ? "warning"
                                : "success"
                            }
                            size="sm"
                          >
                            {formatNumber(
                              Math.round(
                                globalStats.spasial.kepadatanPendudukPerDesa
                              )
                            )}{" "}
                            jiwa/km²
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Kategori
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {globalStats.spasial.kepadatanPendudukPerDesa > 1000
                              ? "Tinggi"
                              : globalStats.spasial.kepadatanPendudukPerDesa >
                                500
                              ? "Sedang"
                              : "Rendah"}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            Standar ideal: 200-800 jiwa/km² untuk wilayah
                            pedesaan
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <FiMapPin className="w-4 h-4 mr-2 text-green-600" />
                        Indeks Aksesibilitas
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Jarak Rata-rata
                          </span>
                          <Badge
                            variant={
                              globalStats.spasial.jarakRataRataAntarDesa < 5
                                ? "success"
                                : globalStats.spasial.jarakRataRataAntarDesa <
                                  10
                                ? "warning"
                                : "danger"
                            }
                            size="sm"
                          >
                            {globalStats.spasial.jarakRataRataAntarDesa.toFixed(
                              1
                            )}{" "}
                            km
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Kategori
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {globalStats.spasial.jarakRataRataAntarDesa < 5
                              ? "Sangat Baik"
                              : globalStats.spasial.jarakRataRataAntarDesa < 10
                              ? "Baik"
                              : globalStats.spasial.jarakRataRataAntarDesa < 15
                              ? "Sedang"
                              : "Perlu Perhatian"}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            Standar ideal: &lt;10 km untuk aksesibilitas yang
                            baik
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <FiDatabase className="w-4 h-4 mr-2 text-purple-600" />
                        Indeks Fasilitas
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Rasio per Desa
                          </span>
                          <Badge variant="info" size="sm">
                            {(
                              (globalStats.spasial.jumlahFasilitasUmum
                                .pendidikan +
                                globalStats.spasial.jumlahFasilitasUmum
                                  .ekonomi) /
                              globalStats.totalDesa
                            ).toFixed(1)}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Kategori
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {(globalStats.spasial.jumlahFasilitasUmum
                              .pendidikan +
                              globalStats.spasial.jumlahFasilitasUmum.ekonomi) /
                              globalStats.totalDesa >=
                            3
                              ? "Memadai"
                              : (globalStats.spasial.jumlahFasilitasUmum
                                  .pendidikan +
                                  globalStats.spasial.jumlahFasilitasUmum
                                    .ekonomi) /
                                  globalStats.totalDesa >=
                                2
                              ? "Cukup"
                              : "Kurang"}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            Standar minimal: 2-3 fasilitas per desa
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Spasial */}
              <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">
                  Ringkasan Analisis Spasial & Geografis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-indigo-700">
                      Kepadatan Rata-rata:
                    </span>
                    <span className="font-semibold text-indigo-900 ml-2">
                      {formatNumber(
                        Math.round(globalStats.spasial.kepadatanPendudukPerDesa)
                      )}{" "}
                      jiwa/km²
                    </span>
                  </div>
                  <div>
                    <span className="text-indigo-700">Jarak Antar Desa:</span>
                    <span className="font-semibold text-indigo-900 ml-2">
                      {globalStats.spasial.jarakRataRataAntarDesa.toFixed(1)} km
                    </span>
                  </div>
                  <div>
                    <span className="text-indigo-700">Total Fasilitas:</span>
                    <span className="font-semibold text-indigo-900 ml-2">
                      {formatNumber(
                        globalStats.spasial.jumlahFasilitasUmum.pendidikan +
                          globalStats.spasial.jumlahFasilitasUmum.ekonomi
                      )}{" "}
                      unit
                    </span>
                  </div>
                  <div>
                    <span className="text-indigo-700">Rasio per Desa:</span>
                    <span className="font-semibold text-indigo-900 ml-2">
                      {(
                        (globalStats.spasial.jumlahFasilitasUmum.pendidikan +
                          globalStats.spasial.jumlahFasilitasUmum.ekonomi) /
                        globalStats.totalDesa
                      ).toFixed(1)}{" "}
                      unit/desa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export dan Aksi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Export Hasil Analisis
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Unduh hasil analisis tingkat 1 dalam berbagai format untuk
                keperluan pelaporan dan dokumentasi
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="secondary" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <Button variant="primary" className="flex items-center">
                <FiTrendingUp className="w-4 h-4 mr-2" />
                Lanjut ke Analisis Tingkat 2
              </Button>
            </div>
          </div>
        </div>

        {/* Insight dan Rekomendasi */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiTarget className="w-5 h-5 mr-2 text-blue-600" />
            Insight dan Rekomendasi Berdasarkan Analisis Tingkat 1
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                <FiUsers className="w-4 h-4 mr-1 text-blue-600" />
                Demografis
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  • Struktur usia produktif dominan (
                  {formatPercentage(
                    globalStats.kependudukan.jumlahPendudukKelompokUsia.dewasa,
                    globalStats.totalPenduduk
                  )}
                  %)
                </li>
                <li>• Rasio jenis kelamin seimbang</li>
                <li>• Potensi bonus demografi tinggi</li>
                <li>• Perlu program pemberdayaan ekonomi</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                <FiDollarSign className="w-4 h-4 mr-1 text-green-600" />
                Ekonomi
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Sektor pertanian masih dominan</li>
                <li>• Diversifikasi ekonomi diperlukan</li>
                <li>
                  • Coverage bantuan sosial{" "}
                  {formatPercentage(
                    globalStats.ekonomi.jumlahPenerimaBantuan,
                    globalStats.ekonomi.jumlahWargaMiskin
                  )}
                  %
                </li>
                <li>• Potensi pengembangan UMKM besar</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                <FiBook className="w-4 h-4 mr-1 text-purple-600" />
                Pendidikan
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  • Fasilitas SD paling banyak (
                  {globalStats.pendidikan.jumlahFasilitasPendidikan.SD} unit)
                </li>
                <li>
                  • Kapasitas total{" "}
                  {formatNumber(
                    Object.values(
                      globalStats.pendidikan.kapasitasTotalFasilitasPendidikan
                    ).reduce((sum, val) => sum + val, 0)
                  )}{" "}
                  siswa
                </li>
                <li>• Perlu evaluasi distribusi fasilitas</li>
                <li>• Fokus pada peningkatan kualitas</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                <FiHome className="w-4 h-4 mr-1 text-orange-600" />
                Infrastruktur
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  • Jalan baik:{" "}
                  {formatPercentage(
                    globalStats.infrastruktur.totalPanjangJalanKondisi.baik,
                    globalStats.infrastruktur.totalPanjangJalan
                  )}
                  %
                </li>
                <li>
                  • Jalan rusak:{" "}
                  {globalStats.infrastruktur.totalPanjangJalanKondisi.rusak.toFixed(
                    1
                  )}{" "}
                  km
                </li>
                <li>
                  • Jembatan rusak:{" "}
                  {formatNumber(
                    globalStats.infrastruktur.totalJembatanKondisi.rusak
                  )}{" "}
                  unit
                </li>
                <li>• Prioritas perbaikan infrastruktur</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 rounded-lg border border-blue-300">
            <h4 className="font-semibold text-blue-900 mb-2">
              Rekomendasi Strategis untuk Kebijakan Pemerintah Pusat:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <strong>Prioritas Jangka Pendek:</strong>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>• Perbaikan infrastruktur jalan dan jembatan rusak</li>
                  <li>• Peningkatan coverage bantuan sosial</li>
                  <li>• Optimalisasi distribusi fasilitas pendidikan</li>
                </ul>
              </div>
              <div>
                <strong>Prioritas Jangka Panjang:</strong>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>• Diversifikasi ekonomi dari sektor pertanian</li>
                  <li>• Pengembangan program pemberdayaan masyarakat</li>
                  <li>• Peningkatan kualitas SDM melalui pendidikan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
