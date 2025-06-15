"use client";

import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiDollarSign,
  FiBook,
  FiHome,
  FiMapPin,
  FiTrendingUp,
  FiTrendingDown,
  FiAlertTriangle,
  FiCheckCircle,
  FiTarget,
  FiBarChart,
  FiPieChart,
  FiActivity,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiEye,
  FiArrowRight,
  FiInfo,
  FiDatabase,
  FiCalendar,
  FiPercent,
  FiLayers,
  FiZap,
  FiTrendingUp as FiGrowth,
  FiAlertCircle,
  FiAward,
  FiClock,
  FiNavigation,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import { Card, Button, Badge, LoadingSpinner } from "../../components";

interface AdvancedDemographicAnalysis {
  keluargaKepalaPerempuanAnakSekolah: {
    jumlah: number;
    persentase: number;
    distribusiUsia: {
      "7-12": number;
      "13-15": number;
      "16-18": number;
    };
    tingkatEkonomi: {
      miskin: number;
      menengah: number;
      mampu: number;
    };
  };
  pendudukProduktifTanpaPekerjaanTetap: {
    jumlah: number;
    persentase: number;
    distribusiPendidikan: {
      SD: number;
      SMP: number;
      SMA: number;
      Diploma: number;
      Sarjana: number;
    };
    jenisKelamin: {
      lakiLaki: number;
      perempuan: number;
    };
  };
  keluargaKepalaLansiaAnakTanggungan: {
    jumlah: number;
    persentase: number;
    distribusiUmurKepala: {
      "65-70": number;
      "71-75": number;
      "76+": number;
    };
    jumlahTanggungan: {
      "1-2": number;
      "3-4": number;
      "5+": number;
    };
  };
  rasioKetergantunganDesa: {
    nilai: number;
    kategori: "rendah" | "sedang" | "tinggi";
    perbandinganNasional: number;
    tren5Tahun: number[];
  };
  pendudukPendidikanTinggiTidakSesuai: {
    jumlah: number;
    persentase: number;
    distribusiPendidikan: {
      D3: number;
      S1: number;
      S2: number;
      S3: number;
    };
    bidangPendidikan: {
      teknik: number;
      ekonomi: number;
      pendidikan: number;
      kesehatan: number;
      pertanian: number;
      lainnya: number;
    };
  };
  polaMigrasiKeluar: {
    totalMigrasi: number;
    berdasarkanPendidikan: {
      SD: { jumlah: number; persentase: number };
      SMP: { jumlah: number; persentase: number };
      SMA: { jumlah: number; persentase: number };
      Diploma: { jumlah: number; persentase: number };
      Sarjana: { jumlah: number; persentase: number };
    };
    berdasarkanUsia: {
      remaja: { jumlah: number; persentase: number };
      dewasaMuda: { jumlah: number; persentase: number };
      dewasa: { jumlah: number; persentase: number };
    };
    tujuanMigrasi: {
      kotaBesar: number;
      luarNegeri: number;
      daerahLain: number;
    };
    alasanMigrasi: {
      pekerjaan: number;
      pendidikan: number;
      keluarga: number;
      lainnya: number;
    };
  };
}

interface AdvancedEconomicAnalysis {
  petaniLahanKecilTanpaBantuan: {
    jumlah: number;
    persentase: number;
    distribusiLuasLahan: {
      "0.1-0.25": number;
      "0.26-0.5": number;
    };
    jenisKomoditas: {
      padi: number;
      jagung: number;
      sayuran: number;
      buahBuahan: number;
    };
    tingkatPendapatan: {
      "<1juta": number;
      "1-2juta": number;
      "2-3juta": number;
    };
  };
  persentasePendapatanSektor: {
    pertanian: {
      nilai: number;
      tren: "naik" | "turun" | "stabil";
      perubahanPersentase: number;
    };
    nonPertanian: {
      nilai: number;
      tren: "naik" | "turun" | "stabil";
      perubahanPersentase: number;
    };
    rincianNonPertanian: {
      perdagangan: number;
      jasa: number;
      industri: number;
      konstruksi: number;
      lainnya: number;
    };
  };
  korelasiPendidikanPekerjaan: {
    koefisienKorelasi: number;
    tingkatSignifikansi: "sangat tinggi" | "tinggi" | "sedang" | "rendah";
    distribusi: {
      SD: { pertanian: number; nonPertanian: number; penghasilan: number };
      SMP: { pertanian: number; nonPertanian: number; penghasilan: number };
      SMA: { pertanian: number; nonPertanian: number; penghasilan: number };
      Tinggi: { pertanian: number; nonPertanian: number; penghasilan: number };
    };
  };
  kesenjanganEkonomiAntarDesa: {
    indeksGini: number;
    desaTertinggi: {
      nama: string;
      pendapatanRataRata: number;
    };
    desaTerendah: {
      nama: string;
      pendapatanRataRata: number;
    };
    selisihPersentase: number;
    faktorPenyebab: string[];
  };
}

interface IntegratedAnalysis {
  kependudukanEkonomi: {
    keluargaPendapatanRendahAnakSekolah: {
      jumlah: number;
      persentase: number;
      distribusiJenjang: {
        SD: number;
        SMP: number;
        SMA: number;
      };
      risikoDropout: {
        tinggi: number;
        sedang: number;
        rendah: number;
      };
    };
    pendudukProduktifPendidikanTinggiMiskin: {
      jumlah: number;
      persentase: number;
      faktorPenyebab: {
        keterbatasanLapanganKerja: number;
        ketidaksesuaianSkill: number;
        faktorGeografis: number;
        lainnya: number;
      };
    };
    rasioKetergantunganEkonomiPerKeluarga: {
      rataRata: number;
      distribusi: {
        "0-1": number;
        "1-2": number;
        "2-3": number;
        "3+": number;
      };
    };
  };
  kependudukanPendidikan: {
    anakUsiaSekolahTidakBersekolah: {
      jumlah: number;
      persentase: number;
      berdasarkanTingkatEkonomi: {
        miskin: { jumlah: number; persentase: number };
        menengah: { jumlah: number; persentase: number };
        mampu: { jumlah: number; persentase: number };
      };
      alasanTidakSekolah: {
        ekonomi: number;
        geografis: number;
        budaya: number;
        lainnya: number;
      };
    };
    anakPetaniBerhasilPendidikanTinggi: {
      jumlah: number;
      persentase: number;
      distribusiJenjang: {
        D3: number;
        S1: number;
        S2: number;
      };
      tingkatKembaliDesa: number;
      bidangStudi: {
        teknik: number;
        ekonomi: number;
        pendidikan: number;
        kesehatan: number;
        pertanian: number;
        lainnya: number;
      };
      statusSetelahLulus: {
        bekerja: number;
        kuliah: number;
        menganggur: number;
      };
    };
    korelasiPendidikanOrangTuaAnak: {
      koefisienKorelasi: number;
      kategori: "sangat kuat" | "kuat" | "sedang" | "lemah";
      matriksPendidikan: {
        orangTuaSD: {
          anakSD: number;
          anakSMP: number;
          anakSMA: number;
          anakTinggi: number;
        };
        orangTuaSMP: {
          anakSD: number;
          anakSMP: number;
          anakSMA: number;
          anakTinggi: number;
        };
        orangTuaSMA: {
          anakSD: number;
          anakSMP: number;
          anakSMA: number;
          anakTinggi: number;
        };
        orangTuaTinggi: {
          anakSD: number;
          anakSMP: number;
          anakSMA: number;
          anakTinggi: number;
        };
      };
      faktorPendukung: string[];
      hambatan: string[];
    };
    proyeksiKebutuhanFasilitas5Tahun: {
      PAUD: {
        kebutuhan: number;
        gap: number;
        prioritas: "tinggi" | "sedang" | "rendah";
      };
      TK: {
        kebutuhan: number;
        gap: number;
        prioritas: "tinggi" | "sedang" | "rendah";
      };
      SD: {
        kebutuhan: number;
        gap: number;
        prioritas: "tinggi" | "sedang" | "rendah";
      };
      SMP: {
        kebutuhan: number;
        gap: number;
        prioritas: "tinggi" | "sedang" | "rendah";
      };
    };
  };
  infrastrukturData: {
    jalanRusakKonsentrasiPendudukTinggi: {
      jumlahSegmen: number;
      panjangTotal: number;
      desaTerdampak: string[];
      estimasiPendudukTerdampak: number;
      dampakEkonomi: {
        kerugianTransportasi: number;
        penurunanAksesibilitas: number;
      };
    };
    persentasePendudukAksesJalanBuruk: {
      persentase: number;
      jumlahPenduduk: number;
      distribusiDesa: {
        [namaDesa: string]: number;
      };
    };
    dusunInfrastrukturBurukPotensiTinggi: {
      daftar: string[];
      potensiEkonomi: {
        pertanian: number;
        pariwisata: number;
        industri: number;
      };
      estimasiKerugianEkonomi: number;
    };
    aksesibilitasFasilitasPendidikan: {
      mudahDiakses: { jumlah: number; persentase: number };
      sulitDiakses: { jumlah: number; persentase: number };
      sangatSulitDiakses: { jumlah: number; persentase: number };
      dampakTerhadapPartisipasi: number;
    };
  };
  spasialAnalysis: {
    desaKepadatanTinggiMinimFasilitas: {
      daftar: string[];
      kepadatanRataRata: number;
      defisitFasilitas: {
        pendidikan: number;
        kesehatan: number;
        ekonomi: number;
      };
    };
    indeksAksesibilitasDesa: {
      [namaDesa: string]: {
        skor: number;
        kategori: "sangat baik" | "baik" | "sedang" | "buruk";
        komponenSkor: {
          jarakKeFasilitas: number;
          kualitasJalan: number;
          transportasiPublik: number;
        };
      };
    };
    potensiPengembanganWilayah: {
      prioritasTinggi: {
        desa: string[];
        alasan: string[];
        estimasiBiaya: number;
        dampakEkonomi: number;
      };
      prioritasSedang: {
        desa: string[];
        alasan: string[];
        estimasiBiaya: number;
      };
      prioritasRendah: {
        desa: string[];
        alasan: string[];
      };
    };
  };
  prediktifAnalysis: {
    strukturPenduduk5Tahun: {
      proyeksi: {
        balita: number;
        anak: number;
        remaja: number;
        dewasa: number;
        lansia: number;
      };
      perubahanPersentase: {
        balita: number;
        anak: number;
        remaja: number;
        dewasa: number;
        lansia: number;
      };
    };
    kebutuhanPembangunanPrioritas: {
      infrastruktur: {
        prioritas: string[];
        estimasiBiaya: number;
        timeline: string;
      };
      pendidikan: {
        prioritas: string[];
        estimasiBiaya: number;
        timeline: string;
      };
      ekonomi: {
        prioritas: string[];
        estimasiBiaya: number;
        timeline: string;
      };
      sosial: {
        prioritas: string[];
        estimasiBiaya: number;
        timeline: string;
      };
    };
    simulasiDampakProgram: {
      programInfrastruktur: {
        dampakEkonomi: number;
        dampakAksesibilitas: number;
        dampakSosial: number;
        roi: number;
      };
      programPendidikan: {
        dampakSDM: number;
        dampakEkonomi: number;
        dampakSosial: number;
        roi: number;
      };
      programEkonomi: {
        dampakKemiskinan: number;
        dampakPendapatan: number;
        dampakPenyerapanTenagaKerja: number;
        roi: number;
      };
    };
  };
  spasialGeografis: {
    desaKepadatanTinggiMinimFasilitas: Array<{
      nama: string;
      kecamatan: string;
      prioritas: string;
      kepadatan: number;
      indeksFasilitas: number;
      fasilitasKurang: string[];
      rekomendasi: string;
    }>;
    indeksAksesibilitasDesa: {
      rataRata: number;
      kategori: {
        baik: number;
        sedang: number;
        buruk: number;
      };
      faktorPenentu: {
        jarakKeFasilitas: number;
        kualitasJalan: number;
        transportasiPublik: number;
      };
    };
  };
  prediktifPerencanaan: {
    prediksiStrukturPenduduk: {
      totalPrediksi2030: number;
      tingkatPertumbuhan: number;
      proyeksiKelompokUsia: {
        [key: string]: {
          jumlah: number;
          tren: "naik" | "turun" | "stabil";
          perubahanPersentase: number;
        };
      };
    };
    kebutuhanPembangunanPrioritas: Array<{
      kategori: string;
      deskripsi: string;
      tingkatUrgensi: "tinggi" | "sedang" | "rendah";
      target: string;
      estimasiBiaya: number;
      timeline: string;
    }>;
    simulasiDampakProgram: Array<{
      namaProgram: string;
      targetPenerima: number;
      estimasiDampak: number;
      indikatorKeberhasilan: string;
      risikoKegagalan: string;
    }>;
  };
}

type AnalysisCategory =
  | "all"
  | "demografis"
  | "ekonomi"
  | "integrasi"
  | "prediktif";

export default function Level2AnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<AnalysisCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [demographicData, setDemographicData] =
    useState<AdvancedDemographicAnalysis | null>(null);
  const [economicData, setEconomicData] =
    useState<AdvancedEconomicAnalysis | null>(null);
  const [integratedData, setIntegratedData] =
    useState<IntegratedAnalysis | null>(null);

  // Mock data - dalam implementasi nyata akan diambil dari API Laravel
  useEffect(() => {
    const fetchAdvancedAnalysisData = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock demographic analysis data
      setDemographicData({
        keluargaKepalaPerempuanAnakSekolah: {
          jumlah: 127,
          persentase: 8.5,
          distribusiUsia: {
            "7-12": 68,
            "13-15": 35,
            "16-18": 24,
          },
          tingkatEkonomi: {
            miskin: 78,
            menengah: 32,
            mampu: 17,
          },
        },
        pendudukProduktifTanpaPekerjaanTetap: {
          jumlah: 892,
          persentase: 23.4,
          distribusiPendidikan: {
            SD: 345,
            SMP: 287,
            SMA: 198,
            Diploma: 42,
            Sarjana: 20,
          },
          jenisKelamin: {
            lakiLaki: 534,
            perempuan: 358,
          },
        },
        keluargaKepalaLansiaAnakTanggungan: {
          jumlah: 89,
          persentase: 5.9,
          distribusiUmurKepala: {
            "65-70": 45,
            "71-75": 28,
            "76+": 16,
          },
          jumlahTanggungan: {
            "1-2": 56,
            "3-4": 25,
            "5+": 8,
          },
        },
        rasioKetergantunganDesa: {
          nilai: 67.8,
          kategori: "sedang",
          perbandinganNasional: 49.2,
          tren5Tahun: [72.1, 70.5, 69.2, 68.1, 67.8],
        },
        pendudukPendidikanTinggiTidakSesuai: {
          jumlah: 156,
          persentase: 34.7,
          distribusiPendidikan: {
            D3: 67,
            S1: 78,
            S2: 9,
            S3: 2,
          },
          bidangPendidikan: {
            teknik: 45,
            ekonomi: 38,
            pendidikan: 32,
            kesehatan: 21,
            pertanian: 12,
            lainnya: 8,
          },
        },
        polaMigrasiKeluar: {
          totalMigrasi: 234,
          berdasarkanPendidikan: {
            SD: { jumlah: 45, persentase: 19.2 },
            SMP: { jumlah: 67, persentase: 28.6 },
            SMA: { jumlah: 89, persentase: 38.0 },
            Diploma: { jumlah: 21, persentase: 9.0 },
            Sarjana: { jumlah: 12, persentase: 5.1 },
          },
          berdasarkanUsia: {
            remaja: { jumlah: 78, persentase: 33.3 },
            dewasaMuda: { jumlah: 123, persentase: 52.6 },
            dewasa: { jumlah: 33, persentase: 14.1 },
          },
          tujuanMigrasi: {
            kotaBesar: 145,
            luarNegeri: 34,
            daerahLain: 55,
          },
          alasanMigrasi: {
            pekerjaan: 134,
            pendidikan: 67,
            keluarga: 23,
            lainnya: 10,
          },
        },
      });

      // Mock economic analysis data
      setEconomicData({
        petaniLahanKecilTanpaBantuan: {
          jumlah: 287,
          persentase: 42.3,
          distribusiLuasLahan: {
            "0.1-0.25": 178,
            "0.26-0.5": 109,
          },
          jenisKomoditas: {
            padi: 156,
            jagung: 89,
            sayuran: 67,
            buahBuahan: 34,
          },
          tingkatPendapatan: {
            "<1juta": 167,
            "1-2juta": 89,
            "2-3juta": 31,
          },
        },
        persentasePendapatanSektor: {
          pertanian: {
            nilai: 68.4,
            tren: "turun",
            perubahanPersentase: -5.2,
          },
          nonPertanian: {
            nilai: 31.6,
            tren: "naik",
            perubahanPersentase: 8.7,
          },
          rincianNonPertanian: {
            perdagangan: 12.3,
            jasa: 8.9,
            industri: 5.4,
            konstruksi: 3.2,
            lainnya: 1.8,
          },
        },
        korelasiPendidikanPekerjaan: {
          koefisienKorelasi: 0.73,
          tingkatSignifikansi: "tinggi",
          distribusi: {
            SD: { pertanian: 89.2, nonPertanian: 10.8, penghasilan: 1.2 },
            SMP: { pertanian: 76.5, nonPertanian: 23.5, penghasilan: 1.8 },
            SMA: { pertanian: 45.3, nonPertanian: 54.7, penghasilan: 2.9 },
            Tinggi: { pertanian: 23.1, nonPertanian: 76.9, penghasilan: 4.7 },
          },
        },
        kesenjanganEkonomiAntarDesa: {
          indeksGini: 0.42,
          desaTertinggi: {
            nama: "Tibawa",
            pendapatanRataRata: 3.8,
          },
          desaTerendah: {
            nama: "Bulango Selatan",
            pendapatanRataRata: 1.9,
          },
          selisihPersentase: 100.0,
          faktorPenyebab: [
            "Akses ke pasar yang berbeda",
            "Kualitas infrastruktur",
            "Tingkat pendidikan",
            "Diversifikasi ekonomi",
          ],
        },
      });

      // Mock integrated analysis data
      // Mock integrated analysis data
      setIntegratedData({
        kependudukanEkonomi: {
          keluargaPendapatanRendahAnakSekolah: {
            jumlah: 234,
            persentase: 15.6,
            distribusiJenjang: {
              SD: 134,
              SMP: 67,
              SMA: 33,
            },
            risikoDropout: {
              tinggi: 89,
              sedang: 98,
              rendah: 47,
            },
          },
          pendudukProduktifPendidikanTinggiMiskin: {
            jumlah: 67,
            persentase: 14.9,
            faktorPenyebab: {
              keterbatasanLapanganKerja: 34,
              ketidaksesuaianSkill: 21,
              faktorGeografis: 8,
              lainnya: 4,
            },
          },
          rasioKetergantunganEkonomiPerKeluarga: {
            rataRata: 1.8,
            distribusi: {
              "0-1": 234,
              "1-2": 456,
              "2-3": 189,
              "3+": 67,
            },
          },
        },
        kependudukanPendidikan: {
          anakUsiaSekolahTidakBersekolah: {
            jumlah: 89,
            persentase: 4.2,
            berdasarkanTingkatEkonomi: {
              miskin: { jumlah: 67, persentase: 75.3 },
              menengah: { jumlah: 18, persentase: 20.2 },
              mampu: { jumlah: 4, persentase: 4.5 },
            },
            alasanTidakSekolah: {
              ekonomi: 67,
              geografis: 12,
              budaya: 7,
              lainnya: 3,
            },
          },
          anakPetaniBerhasilPendidikanTinggi: {
            jumlah: 45,
            persentase: 6.7,
            distribusiJenjang: {
              D3: 23,
              S1: 19,
              S2: 3,
            },
            tingkatKembaliDesa: 31.1,
            bidangStudi: {
              teknik: 15,
              ekonomi: 12,
              pendidikan: 8,
              kesehatan: 5,
              pertanian: 3,
              lainnya: 2,
            },
            statusSetelahLulus: {
              bekerja: 28,
              kuliah: 12,
              menganggur: 5,
            },
          },
          korelasiPendidikanOrangTuaAnak: {
            koefisienKorelasi: 0.68,
            kategori: "kuat",
            matriksPendidikan: {
              orangTuaSD: {
                anakSD: 78.9,
                anakSMP: 18.2,
                anakSMA: 2.7,
                anakTinggi: 0.2,
              },
              orangTuaSMP: {
                anakSD: 45.6,
                anakSMP: 38.9,
                anakSMA: 14.2,
                anakTinggi: 1.3,
              },
              orangTuaSMA: {
                anakSD: 23.4,
                anakSMP: 34.5,
                anakSMA: 35.6,
                anakTinggi: 6.5,
              },
              orangTuaTinggi: {
                anakSD: 12.1,
                anakSMP: 23.4,
                anakSMA: 45.6,
                anakTinggi: 18.9,
              },
            },
            faktorPendukung: [
              "Dukungan keluarga yang kuat",
              "Akses ke informasi pendidikan",
              "Program beasiswa pemerintah",
              "Motivasi untuk mobilitas sosial",
            ],
            hambatan: [
              "Keterbatasan ekonomi keluarga",
              "Akses transportasi yang sulit",
              "Kurangnya fasilitas pendidikan",
              "Budaya prioritas kerja daripada sekolah",
            ],
          },
          proyeksiKebutuhanFasilitas5Tahun: {
            PAUD: { kebutuhan: 8, gap: 3, prioritas: "tinggi" },
            TK: { kebutuhan: 6, gap: 2, prioritas: "sedang" },
            SD: { kebutuhan: 12, gap: 1, prioritas: "rendah" },
            SMP: { kebutuhan: 7, gap: 4, prioritas: "tinggi" },
          },
        },
        infrastrukturData: {
          jalanRusakKonsentrasiPendudukTinggi: {
            jumlahSegmen: 23,
            panjangTotal: 15.7,
            desaTerdampak: ["Tibawa", "Bulango Selatan", "Bone Pantai"],
            estimasiPendudukTerdampak: 2847,
            dampakEkonomi: {
              kerugianTransportasi: 450,
              penurunanAksesibilitas: 23.4,
            },
          },
          persentasePendudukAksesJalanBuruk: {
            persentase: 34.7,
            jumlahPenduduk: 2156,
            distribusiDesa: {
              Tibawa: 567,
              "Bulango Selatan": 789,
              "Bone Pantai": 456,
              "Tibawa Tengah": 344,
            },
          },
          dusunInfrastrukturBurukPotensiTinggi: {
            daftar: ["Dusun Makmur", "Dusun Sejahtera", "Dusun Maju"],
            potensiEkonomi: {
              pertanian: 67.8,
              pariwisata: 23.4,
              industri: 8.8,
            },
            estimasiKerugianEkonomi: 1250,
          },
          aksesibilitasFasilitasPendidikan: {
            mudahDiakses: { jumlah: 1234, persentase: 58.9 },
            sulitDiakses: { jumlah: 678, persentase: 32.4 },
            sangatSulitDiakses: { jumlah: 182, persentase: 8.7 },
            dampakTerhadapPartisipasi: 15.6,
          },
        },
        spasialAnalysis: {
          desaKepadatanTinggiMinimFasilitas: {
            daftar: ["Tibawa", "Bone Pantai"],
            kepadatanRataRata: 1247,
            defisitFasilitas: {
              pendidikan: 5,
              kesehatan: 3,
              ekonomi: 7,
            },
          },
          indeksAksesibilitasDesa: {
            Tibawa: {
              skor: 78.5,
              kategori: "baik",
              komponenSkor: {
                jarakKeFasilitas: 82.3,
                kualitasJalan: 76.8,
                transportasiPublik: 76.4,
              },
            },
            "Bulango Selatan": {
              skor: 45.2,
              kategori: "buruk",
              komponenSkor: {
                jarakKeFasilitas: 52.1,
                kualitasJalan: 38.9,
                transportasiPublik: 44.6,
              },
            },
            "Bone Pantai": {
              skor: 67.8,
              kategori: "sedang",
              komponenSkor: {
                jarakKeFasilitas: 71.2,
                kualitasJalan: 65.4,
                transportasiPublik: 66.8,
              },
            },
            "Tibawa Tengah": {
              skor: 56.3,
              kategori: "sedang",
              komponenSkor: {
                jarakKeFasilitas: 61.7,
                kualitasJalan: 52.1,
                transportasiPublik: 55.1,
              },
            },
          },
          potensiPengembanganWilayah: {
            prioritasTinggi: {
              desa: ["Tibawa", "Bone Pantai"],
              alasan: ["Kepadatan tinggi", "Akses baik", "Potensi ekonomi"],
              estimasiBiaya: 2500,
              dampakEkonomi: 45.6,
            },
            prioritasSedang: {
              desa: ["Tibawa Tengah"],
              alasan: ["Potensi sedang", "Infrastruktur cukup"],
              estimasiBiaya: 1200,
            },
            prioritasRendah: {
              desa: ["Bulango Selatan"],
              alasan: ["Akses terbatas", "Infrastruktur buruk"],
            },
          },
        },
        prediktifAnalysis: {
          strukturPenduduk5Tahun: {
            proyeksi: {
              balita: 892,
              anak: 1456,
              remaja: 1234,
              dewasa: 4567,
              lansia: 1123,
            },
            perubahanPersentase: {
              balita: -2.3,
              anak: -1.8,
              remaja: 1.2,
              dewasa: -0.5,
              lansia: 12.7,
            },
          },
          kebutuhanPembangunanPrioritas: {
            infrastruktur: {
              prioritas: [
                "Perbaikan jalan rusak",
                "Pembangunan jembatan",
                "Sistem drainase",
              ],
              estimasiBiaya: 5600,
              timeline: "2025-2027",
            },
            pendidikan: {
              prioritas: [
                "Pembangunan SMP baru",
                "Renovasi SD",
                "Program PAUD",
              ],
              estimasiBiaya: 3400,
              timeline: "2025-2026",
            },
            ekonomi: {
              prioritas: [
                "Pengembangan UMKM",
                "Pasar modern",
                "Koperasi petani",
              ],
              estimasiBiaya: 2800,
              timeline: "2025-2028",
            },
            sosial: {
              prioritas: [
                "Program bantuan sosial",
                "Pelatihan keterampilan",
                "Posyandu",
              ],
              estimasiBiaya: 1200,
              timeline: "2025-2026",
            },
          },
          simulasiDampakProgram: {
            programInfrastruktur: {
              dampakEkonomi: 23.4,
              dampakAksesibilitas: 45.6,
              dampakSosial: 18.9,
              roi: 2.8,
            },
            programPendidikan: {
              dampakSDM: 34.7,
              dampakEkonomi: 15.6,
              dampakSosial: 28.9,
              roi: 3.2,
            },
            programEkonomi: {
              dampakKemiskinan: -18.7,
              dampakPendapatan: 28.4,
              dampakPenyerapanTenagaKerja: 15.3,
              roi: 4.1,
            },
          },
        },
        spasialGeografis: {
          desaKepadatanTinggiMinimFasilitas: [
            {
              nama: "Tibawa",
              kecamatan: "Tibawa",
              prioritas: "tinggi",
              kepadatan: 1247,
              indeksFasilitas: 45.2,
              fasilitasKurang: ["Puskesmas", "SMP", "Pasar"],
              rekomendasi:
                "Pembangunan fasilitas kesehatan dan pendidikan prioritas",
            },
            {
              nama: "Bone Pantai",
              kecamatan: "Bone Pantai",
              prioritas: "sedang",
              kepadatan: 892,
              indeksFasilitas: 52.8,
              fasilitasKurang: ["TK", "Bank", "Kantor Pos"],
              rekomendasi: "Peningkatan fasilitas ekonomi dan komunikasi",
            },
          ],
          indeksAksesibilitasDesa: {
            rataRata: 62.4,
            kategori: {
              baik: 2,
              sedang: 3,
              buruk: 1,
            },
            faktorPenentu: {
              jarakKeFasilitas: 35.0,
              kualitasJalan: 40.0,
              transportasiPublik: 25.0,
            },
          },
        },
        prediktifPerencanaan: {
          prediksiStrukturPenduduk: {
            totalPrediksi2030: 9272,
            tingkatPertumbuhan: 1.2,
            proyeksiKelompokUsia: {
              Balita: { jumlah: 892, tren: "turun", perubahanPersentase: -2.3 },
              Anak: { jumlah: 1456, tren: "turun", perubahanPersentase: -1.8 },
              Remaja: { jumlah: 1234, tren: "naik", perubahanPersentase: 1.2 },
              Dewasa: {
                jumlah: 4567,
                tren: "stabil",
                perubahanPersentase: -0.5,
              },
              Lansia: { jumlah: 1123, tren: "naik", perubahanPersentase: 12.7 },
            },
          },
          kebutuhanPembangunanPrioritas: [
            {
              kategori: "Infrastruktur",
              deskripsi:
                "Perbaikan jalan dan jembatan untuk meningkatkan aksesibilitas",
              tingkatUrgensi: "tinggi",
              target: "15 km jalan dan 3 jembatan",
              estimasiBiaya: 5.6,
              timeline: "2025-2027",
            },
            {
              kategori: "Pendidikan",
              deskripsi:
                "Pembangunan fasilitas pendidikan untuk mengurangi kesenjangan",
              tingkatUrgensi: "tinggi",
              target: "2 SMP dan 3 PAUD baru",
              estimasiBiaya: 3.4,
              timeline: "2025-2026",
            },
          ],
          simulasiDampakProgram: [
            {
              namaProgram: "Program Perbaikan Infrastruktur",
              targetPenerima: 2847,
              estimasiDampak: 78.5,
              indikatorKeberhasilan:
                "Waktu tempuh berkurang 30%, akses ekonomi meningkat",
              risikoKegagalan: "Sedang - tergantung cuaca dan anggaran",
            },
            {
              namaProgram: "Program Pengembangan UMKM",
              targetPenerima: 156,
              estimasiDampak: 92.3,
              indikatorKeberhasilan: "Pendapatan UMKM meningkat 25%",
              risikoKegagalan: "Rendah - antusiasme pelaku usaha tinggi",
            },
          ],
        },
      });

      setLoading(false);
    };

    fetchAdvancedAnalysisData();
  }, []);

  // Utility functions
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const formatPercentage = (value: number): string => {
    return value.toFixed(1) + "%";
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value * 1000000);
  };

  const getStatusColor = (category: string, value: number) => {
    switch (category) {
      case "rasio":
        return value < 50
          ? "text-green-600"
          : value < 70
          ? "text-yellow-600"
          : "text-red-600";
      case "korelasi":
        return value > 0.7
          ? "text-green-600"
          : value > 0.5
          ? "text-yellow-600"
          : "text-red-600";
      case "aksesibilitas":
        return value > 70
          ? "text-green-600"
          : value > 50
          ? "text-yellow-600"
          : "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: "naik" | "turun" | "stabil") => {
    switch (trend) {
      case "naik":
        return <FiTrendingUp className="w-4 h-4 text-green-600" />;
      case "turun":
        return <FiTrendingDown className="w-4 h-4 text-red-600" />;
      case "stabil":
        return <FiActivity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityBadge = (priority: "tinggi" | "sedang" | "rendah") => {
    const variants = {
      tinggi: "danger",
      sedang: "warning",
      rendah: "success",
    } as const;

    return (
      <Badge variant={variants[priority]} size="sm">
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">
            Memuat analisis tingkat lanjutan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold flex items-center">
                <FiLayers className="w-8 h-8 mr-3" />
                Analisis Tingkat 2 - Lanjutan & Korelasi
              </h1>
              <p className="mt-2 text-indigo-100 text-lg">
                Analisis mendalam dan korelasi antar kategori data untuk
                mendukung kebijakan pemerintah pusat
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Analisis
              </Button>
              <Button
                variant="primary"
                className="flex items-center bg-white text-indigo-600 hover:bg-gray-100"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter dan Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari analisis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as AnalysisCategory)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Semua Kategori</option>
                <option value="demografis">Analisis Demografis</option>
                <option value="ekonomi">Analisis Ekonomi</option>
                <option value="integrasi">Analisis Integrasi</option>
                <option value="prediktif">Analisis Prediktif</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter aktif</span>
            </div>
          </div>
        </div>

        {/* Analisis Kependudukan Tingkat 2 */}
        {(selectedCategory === "all" || selectedCategory === "demografis") &&
          demographicData && (
            <div className="mb-12">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiUsers className="w-6 h-6 mr-3 text-blue-600" />
                  Analisis Kependudukan Tingkat 2 (Lanjutan/Spesifik)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Keluarga Kepala Perempuan dengan Anak Sekolah */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6 border border-pink-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiUsers className="w-5 h-5 mr-2 text-pink-600" />
                      Keluarga Kepala Perempuan + Anak Sekolah
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-pink-600">
                        {formatNumber(
                          demographicData.keluargaKepalaPerempuanAnakSekolah
                            .jumlah
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPercentage(
                          demographicData.keluargaKepalaPerempuanAnakSekolah
                            .persentase
                        )}{" "}
                        dari total keluarga
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Distribusi Usia Anak:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            demographicData.keluargaKepalaPerempuanAnakSekolah
                              .distribusiUsia
                          ).map(([usia, jumlah]) => (
                            <div
                              key={usia}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600">
                                {usia} tahun
                              </span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-pink-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (jumlah /
                                          demographicData
                                            .keluargaKepalaPerempuanAnakSekolah
                                            .jumlah) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-pink-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-pink-200 pt-3">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Tingkat Ekonomi:
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-red-100 rounded">
                            <div className="font-semibold text-red-700">
                              {formatNumber(
                                demographicData
                                  .keluargaKepalaPerempuanAnakSekolah
                                  .tingkatEkonomi.miskin
                              )}
                            </div>
                            <div className="text-red-600">Miskin</div>
                          </div>
                          <div className="text-center p-2 bg-yellow-100 rounded">
                            <div className="font-semibold text-yellow-700">
                              {formatNumber(
                                demographicData
                                  .keluargaKepalaPerempuanAnakSekolah
                                  .tingkatEkonomi.menengah
                              )}
                            </div>
                            <div className="text-yellow-600">Menengah</div>
                          </div>
                          <div className="text-center p-2 bg-green-100 rounded">
                            <div className="font-semibold text-green-700">
                              {formatNumber(
                                demographicData
                                  .keluargaKepalaPerempuanAnakSekolah
                                  .tingkatEkonomi.mampu
                              )}
                            </div>
                            <div className="text-green-600">Mampu</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-pink-100 rounded-lg border border-pink-300">
                      <p className="text-xs text-pink-800">
                        <strong>Insight:</strong>{" "}
                        {formatPercentage(
                          (demographicData.keluargaKepalaPerempuanAnakSekolah
                            .tingkatEkonomi.miskin /
                            demographicData.keluargaKepalaPerempuanAnakSekolah
                              .jumlah) *
                            100
                        )}{" "}
                        keluarga ini berada dalam kategori miskin, memerlukan
                        perhatian khusus untuk program bantuan pendidikan.
                      </p>
                    </div>
                  </div>

                  {/* Penduduk Produktif Tanpa Pekerjaan Tetap */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiActivity className="w-5 h-5 mr-2 text-orange-600" />
                      Penduduk Produktif Tanpa Kerja Tetap
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-orange-600">
                        {formatNumber(
                          demographicData.pendudukProduktifTanpaPekerjaanTetap
                            .jumlah
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPercentage(
                          demographicData.pendudukProduktifTanpaPekerjaanTetap
                            .persentase
                        )}{" "}
                        dari usia produktif
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Berdasarkan Pendidikan:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            demographicData.pendudukProduktifTanpaPekerjaanTetap
                              .distribusiPendidikan
                          ).map(([pendidikan, jumlah]) => (
                            <div
                              key={pendidikan}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600">
                                {pendidikan}
                              </span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-orange-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (jumlah /
                                          demographicData
                                            .pendudukProduktifTanpaPekerjaanTetap
                                            .jumlah) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-orange-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-orange-200 pt-3">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Berdasarkan Jenis Kelamin:
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-100 rounded">
                            <div className="font-semibold text-blue-700">
                              {formatNumber(
                                demographicData
                                  .pendudukProduktifTanpaPekerjaanTetap
                                  .jenisKelamin.lakiLaki
                              )}
                            </div>
                            <div className="text-blue-600">Laki-laki</div>
                          </div>
                          <div className="text-center p-2 bg-pink-100 rounded">
                            <div className="font-semibold text-pink-700">
                              {formatNumber(
                                demographicData
                                  .pendudukProduktifTanpaPekerjaanTetap
                                  .jenisKelamin.perempuan
                              )}
                            </div>
                            <div className="text-pink-600">Perempuan</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-300">
                      <p className="text-xs text-orange-800">
                        <strong>Rekomendasi:</strong> Perlu program pelatihan
                        keterampilan dan pemberdayaan ekonomi, terutama untuk
                        lulusan SD dan SMP yang mendominasi.
                      </p>
                    </div>
                  </div>

                  {/* Keluarga Kepala Lansia dengan Anak Tanggungan */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiClock className="w-5 h-5 mr-2 text-purple-600" />
                      Kepala Keluarga Lansia + Tanggungan
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-purple-600">
                        {formatNumber(
                          demographicData.keluargaKepalaLansiaAnakTanggungan
                            .jumlah
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPercentage(
                          demographicData.keluargaKepalaLansiaAnakTanggungan
                            .persentase
                        )}{" "}
                        dari total keluarga
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Umur Kepala Keluarga:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            demographicData.keluargaKepalaLansiaAnakTanggungan
                              .distribusiUmurKepala
                          ).map(([umur, jumlah]) => (
                            <div
                              key={umur}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600">
                                {umur} tahun
                              </span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-purple-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (jumlah /
                                          demographicData
                                            .keluargaKepalaLansiaAnakTanggungan
                                            .jumlah) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-purple-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-purple-200 pt-3">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Jumlah Tanggungan:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            demographicData.keluargaKepalaLansiaAnakTanggungan
                              .jumlahTanggungan
                          ).map(([jumlah, keluarga]) => (
                            <div
                              key={jumlah}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600">
                                {jumlah} anak
                              </span>
                              <span className="text-sm font-medium text-purple-600">
                                {formatNumber(keluarga)} KK
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-300">
                      <p className="text-xs text-purple-800">
                        <strong>Perhatian:</strong> Keluarga ini memerlukan
                        bantuan sosial prioritas karena keterbatasan kemampuan
                        ekonomi kepala keluarga lansia.
                      </p>
                    </div>
                  </div>

                  {/* Rasio Ketergantungan Desa */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiBarChart className="w-5 h-5 mr-2 text-green-600" />
                      Rasio Ketergantungan Desa
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-green-600">
                        {demographicData.rasioKetergantunganDesa.nilai.toFixed(
                          1
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Kategori:{" "}
                        <span
                          className={`font-medium ${getStatusColor(
                            "rasio",
                            demographicData.rasioKetergantunganDesa.nilai
                          )}`}
                        >
                          {demographicData.rasioKetergantunganDesa.kategori}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white rounded border">
                        <span className="text-sm text-gray-600">Nasional</span>
                        <span className="text-sm font-medium text-blue-600">
                          {demographicData.rasioKetergantunganDesa.perbandinganNasional.toFixed(
                            1
                          )}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Tren 5 Tahun Terakhir:
                        </h4>
                        <div className="flex justify-between items-end h-16 bg-white rounded p-2 border">
                          {demographicData.rasioKetergantunganDesa.tren5Tahun.map(
                            (nilai, index) => (
                              <div
                                key={index}
                                className="flex flex-col items-center"
                              >
                                <div
                                  className="bg-green-600 rounded-t w-3"
                                  style={{ height: `${(nilai / 80) * 100}%` }}
                                ></div>
                                <span className="text-xs text-gray-500 mt-1">
                                  {2020 + index}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-xs text-green-800">
                        <strong>Analisis:</strong> Rasio ketergantungan{" "}
                        {demographicData.rasioKetergantunganDesa.nilai >
                        demographicData.rasioKetergantunganDesa
                          .perbandinganNasional
                          ? "di atas"
                          : "di bawah"}{" "}
                        rata-rata nasional, menunjukkan tren{" "}
                        {demographicData.rasioKetergantunganDesa.tren5Tahun[4] <
                        demographicData.rasioKetergantunganDesa.tren5Tahun[0]
                          ? "penurunan"
                          : "peningkatan"}
                        .
                      </p>
                    </div>
                  </div>

                  {/* Penduduk Pendidikan Tinggi Tidak Sesuai Bidang */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiBook className="w-5 h-5 mr-2 text-red-600" />
                      Pendidikan Tinggi Tidak Sesuai Bidang
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-red-600">
                        {formatNumber(
                          demographicData.pendudukPendidikanTinggiTidakSesuai
                            .jumlah
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPercentage(
                          demographicData.pendudukPendidikanTinggiTidakSesuai
                            .persentase
                        )}{" "}
                        dari berpendidikan tinggi
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Jenjang Pendidikan:
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(
                            demographicData.pendudukPendidikanTinggiTidakSesuai
                              .distribusiPendidikan
                          ).map(([jenjang, jumlah]) => (
                            <div
                              key={jenjang}
                              className="text-center p-2 bg-white rounded border"
                            >
                              <div className="font-semibold text-red-700">
                                {formatNumber(jumlah)}
                              </div>
                              <div className="text-red-600">{jenjang}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-red-200 pt-3">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Bidang Pendidikan:
                        </h4>
                        <div className="space-y-1">
                          {Object.entries(
                            demographicData.pendudukPendidikanTinggiTidakSesuai
                              .bidangPendidikan
                          )
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3)
                            .map(([bidang, jumlah]) => (
                              <div
                                key={bidang}
                                className="flex justify-between items-center"
                              >
                                <span className="text-sm text-gray-600 capitalize">
                                  {bidang}
                                </span>
                                <span className="text-sm font-medium text-red-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-300">
                      <p className="text-xs text-red-800">
                        <strong>Masalah:</strong> Tingginya ketidaksesuaian
                        menunjukkan perlunya program pelatihan ulang dan
                        pengembangan lapangan kerja sesuai kompetensi.
                      </p>
                    </div>
                  </div>

                  {/* Pola Migrasi Keluar */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiMapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Pola Migrasi Keluar
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-blue-600">
                        {formatNumber(
                          demographicData.polaMigrasiKeluar.totalMigrasi
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total migrasi keluar
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Berdasarkan Pendidikan:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            demographicData.polaMigrasiKeluar
                              .berdasarkanPendidikan
                          )
                            .sort(([, a], [, b]) => b.jumlah - a.jumlah)
                            .map(([pendidikan, data]) => (
                              <div
                                key={pendidikan}
                                className="flex justify-between items-center"
                              >
                                <span className="text-sm text-gray-600">
                                  {pendidikan}
                                </span>
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${data.persentase}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-blue-600">
                                    {formatNumber(data.jumlah)}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="border-t border-blue-200 pt-3">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Alasan Migrasi:
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(
                            demographicData.polaMigrasiKeluar.alasanMigrasi
                          )
                            .sort(([, a], [, b]) => b - a)
                            .map(([alasan, jumlah]) => (
                              <div
                                key={alasan}
                                className="text-center p-2 bg-white rounded border"
                              >
                                <div className="font-semibold text-blue-700">
                                  {formatNumber(jumlah)}
                                </div>
                                <div className="text-blue-600 capitalize">
                                  {alasan}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-300">
                      <p className="text-xs text-blue-800">
                        <strong>Insight:</strong> Migrasi didominasi lulusan SMA
                        untuk mencari pekerjaan, menunjukkan keterbatasan
                        lapangan kerja lokal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Analisis Ekonomi Tingkat 2 */}
        {(selectedCategory === "all" || selectedCategory === "ekonomi") &&
          economicData && (
            <div className="mb-12">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiDollarSign className="w-6 h-6 mr-3 text-green-600" />
                  Analisis Ekonomi Tingkat 2 (Lanjutan/Spesifik)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Petani Lahan Kecil Tanpa Bantuan */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiHome className="w-5 h-5 mr-2 text-yellow-600" />
                      Petani Lahan 0.5 Ha Tanpa Bantuan
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-yellow-600">
                        {formatNumber(
                          economicData.petaniLahanKecilTanpaBantuan.jumlah
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPercentage(
                          economicData.petaniLahanKecilTanpaBantuan.persentase
                        )}{" "}
                        dari total petani
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Distribusi Luas Lahan:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            economicData.petaniLahanKecilTanpaBantuan
                              .distribusiLuasLahan
                          ).map(([luas, jumlah]) => (
                            <div
                              key={luas}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600">
                                {luas} Ha
                              </span>
                              <div className="flex items-center">
                                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-yellow-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (jumlah /
                                          economicData
                                            .petaniLahanKecilTanpaBantuan
                                            .jumlah) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-yellow-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Jenis Komoditas:
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(
                            economicData.petaniLahanKecilTanpaBantuan
                              .jenisKomoditas
                          ).map(([komoditas, jumlah]) => (
                            <div
                              key={komoditas}
                              className="text-center p-2 bg-white rounded border border-yellow-300"
                            >
                              <div className="font-semibold text-yellow-700">
                                {formatNumber(jumlah)}
                              </div>
                              <div className="text-yellow-600 text-xs capitalize">
                                {komoditas}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Tingkat Pendapatan:
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            economicData.petaniLahanKecilTanpaBantuan
                              .tingkatPendapatan
                          ).map(([pendapatan, jumlah]) => (
                            <div
                              key={pendapatan}
                              className="flex justify-between items-center p-2 bg-white rounded border"
                            >
                              <span className="text-sm text-gray-600">
                                {pendapatan}
                              </span>
                              <span className="text-sm font-medium text-yellow-600">
                                {formatNumber(jumlah)} petani
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                      <p className="text-xs text-yellow-800">
                        <strong>Prioritas:</strong>{" "}
                        {formatPercentage(
                          (economicData.petaniLahanKecilTanpaBantuan
                            .tingkatPendapatan["<1juta"] /
                            economicData.petaniLahanKecilTanpaBantuan.jumlah) *
                            100
                        )}{" "}
                        petani berpendapatan 1 juta, perlu bantuan modal dan
                        teknologi pertanian.
                      </p>
                    </div>
                  </div>

                  {/* Persentase Pendapatan Sektor */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiPieChart className="w-5 h-5 mr-2 text-green-600" />
                      Persentase Pendapatan Sektor
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-4 bg-white rounded-lg border border-green-300">
                        <div className="flex items-center justify-center mb-2">
                          {getTrendIcon(
                            economicData.persentasePendapatanSektor.pertanian
                              .tren
                          )}
                          <span className="ml-2 text-2xl font-bold text-green-600">
                            {formatPercentage(
                              economicData.persentasePendapatanSektor.pertanian
                                .nilai
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Pertanian</p>
                        <p className="text-xs text-gray-500">
                          {economicData.persentasePendapatanSektor.pertanian
                            .perubahanPersentase > 0
                            ? "+"
                            : ""}
                          {economicData.persentasePendapatanSektor.pertanian.perubahanPersentase.toFixed(
                            1
                          )}
                          % dari tahun lalu
                        </p>
                      </div>

                      <div className="text-center p-4 bg-white rounded-lg border border-blue-300">
                        <div className="flex items-center justify-center mb-2">
                          {getTrendIcon(
                            economicData.persentasePendapatanSektor.nonPertanian
                              .tren
                          )}
                          <span className="ml-2 text-2xl font-bold text-blue-600">
                            {formatPercentage(
                              economicData.persentasePendapatanSektor
                                .nonPertanian.nilai
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Non-Pertanian</p>
                        <p className="text-xs text-gray-500">
                          {economicData.persentasePendapatanSektor.nonPertanian
                            .perubahanPersentase > 0
                            ? "+"
                            : ""}
                          {economicData.persentasePendapatanSektor.nonPertanian.perubahanPersentase.toFixed(
                            1
                          )}
                          % dari tahun lalu
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        Rincian Non-Pertanian:
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(
                          economicData.persentasePendapatanSektor
                            .rincianNonPertanian
                        )
                          .sort(([, a], [, b]) => b - a)
                          .map(([sektor, persentase]) => (
                            <div
                              key={sektor}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600 capitalize">
                                {sektor}
                              </span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (persentase /
                                          economicData
                                            .persentasePendapatanSektor
                                            .nonPertanian.nilai) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-blue-600">
                                  {formatPercentage(persentase)}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-xs text-green-800">
                        <strong>Tren:</strong> Sektor non-pertanian menunjukkan
                        pertumbuhan positif, menandakan diversifikasi ekonomi
                        yang baik.
                      </p>
                    </div>
                  </div>

                  {/* Korelasi Pendidikan-Pekerjaan */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiTarget className="w-5 h-5 mr-2 text-indigo-600" />
                      Korelasi Pendidikan-Pekerjaan
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-indigo-600">
                        {economicData.korelasiPendidikanPekerjaan.koefisienKorelasi.toFixed(
                          2
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tingkat:{" "}
                        <span
                          className={`font-medium ${getStatusColor(
                            "korelasi",
                            economicData.korelasiPendidikanPekerjaan
                              .koefisienKorelasi
                          )}`}
                        >
                          {
                            economicData.korelasiPendidikanPekerjaan
                              .tingkatSignifikansi
                          }
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Distribusi Pekerjaan per Pendidikan:
                      </h4>
                      {Object.entries(
                        economicData.korelasiPendidikanPekerjaan.distribusi
                      ).map(([pendidikan, data]) => (
                        <div
                          key={pendidikan}
                          className="p-3 bg-white rounded border border-indigo-200"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-800">
                              {pendidikan}
                            </span>
                            <span className="text-sm text-indigo-600">
                              Rata-rata: {formatCurrency(data.penghasilan)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center p-2 bg-green-100 rounded">
                              <div className="font-semibold text-green-700">
                                {formatPercentage(data.pertanian)}
                              </div>
                              <div className="text-green-600">Pertanian</div>
                            </div>
                            <div className="text-center p-2 bg-blue-100 rounded">
                              <div className="font-semibold text-blue-700">
                                {formatPercentage(data.nonPertanian)}
                              </div>
                              <div className="text-blue-600">Non-Pertanian</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-indigo-100 rounded-lg border border-indigo-300">
                      <p className="text-xs text-indigo-800">
                        <strong>Analisis:</strong> Korelasi{" "}
                        {economicData.korelasiPendidikanPekerjaan
                          .koefisienKorelasi > 0.7
                          ? "sangat kuat"
                          : "kuat"}{" "}
                        menunjukkan pendidikan tinggi cenderung bekerja di
                        sektor non-pertanian dengan penghasilan lebih baik.
                      </p>
                    </div>
                  </div>

                  {/* Kesenjangan Ekonomi Antar Desa */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiTrendingUp className="w-5 h-5 mr-2 text-red-600" />
                      Kesenjangan Ekonomi Antar Desa
                    </h3>

                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-red-600">
                        {economicData.kesenjanganEkonomiAntarDesa.indeksGini.toFixed(
                          2
                        )}
                      </p>
                      <p className="text-sm text-gray-600">Indeks Gini</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-100 rounded border border-green-300">
                          <div className="text-center">
                            <p className="text-sm text-green-700 font-medium">
                              Tertinggi
                            </p>
                            <p className="text-lg font-bold text-green-800">
                              {
                                economicData.kesenjanganEkonomiAntarDesa
                                  .desaTertinggi.nama
                              }
                            </p>
                            <p className="text-sm text-green-600">
                              {formatCurrency(
                                economicData.kesenjanganEkonomiAntarDesa
                                  .desaTertinggi.pendapatanRataRata
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-red-100 rounded border border-red-300">
                          <div className="text-center">
                            <p className="text-sm text-red-700 font-medium">
                              Terendah
                            </p>
                            <p className="text-lg font-bold text-red-800">
                              {
                                economicData.kesenjanganEkonomiAntarDesa
                                  .desaTerendah.nama
                              }
                            </p>
                            <p className="text-sm text-red-600">
                              {formatCurrency(
                                economicData.kesenjanganEkonomiAntarDesa
                                  .desaTerendah.pendapatanRataRata
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-100 rounded border border-yellow-300">
                        <p className="text-center text-yellow-800">
                          <strong>
                            Selisih:{" "}
                            {formatPercentage(
                              economicData.kesenjanganEkonomiAntarDesa
                                .selisihPersentase
                            )}
                          </strong>
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Faktor Penyebab:
                        </h4>
                        <div className="space-y-1">
                          {economicData.kesenjanganEkonomiAntarDesa.faktorPenyebab.map(
                            (faktor, index) => (
                              <div
                                key={index}
                                className="flex items-center p-2 bg-white rounded border"
                              >
                                <FiAlertCircle className="w-4 h-4 text-red-500 mr-2" />
                                <span className="text-sm text-gray-700">
                                  {faktor}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-300">
                      <p className="text-xs text-red-800">
                        <strong>Rekomendasi:</strong> Perlu program pemerataan
                        pembangunan dan peningkatan akses ekonomi untuk desa
                        tertinggal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Analisis Integrasi Data */}
        {(selectedCategory === "all" || selectedCategory === "integrasi") &&
          integratedData && (
            <div className="mb-12">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiLayers className="w-6 h-6 mr-3 text-purple-600" />
                  Analisis Integrasi Data Lintas Kategori
                </h2>

                {/* Integrasi Kependudukan-Ekonomi */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiUsers className="w-5 h-5 mr-2 text-blue-600" />
                    Integrasi Kependudukan & Ekonomi
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Keluarga Pendapatan Rendah dengan Anak Sekolah */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiAlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        Keluarga Miskin + Anak Sekolah
                      </h4>

                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-orange-600">
                          {formatNumber(
                            integratedData.kependudukanEkonomi
                              .keluargaPendapatanRendahAnakSekolah.jumlah
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPercentage(
                            integratedData.kependudukanEkonomi
                              .keluargaPendapatanRendahAnakSekolah.persentase
                          )}{" "}
                          dari total keluarga
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Distribusi Jenjang:
                          </h5>
                          <div className="space-y-2">
                            {Object.entries(
                              integratedData.kependudukanEkonomi
                                .keluargaPendapatanRendahAnakSekolah
                                .distribusiJenjang
                            ).map(([jenjang, jumlah]) => (
                              <div
                                key={jenjang}
                                className="flex justify-between items-center"
                              >
                                <span className="text-sm text-gray-600">
                                  {jenjang}
                                </span>
                                <span className="text-sm font-medium text-orange-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Risiko Dropout:
                          </h5>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {Object.entries(
                              integratedData.kependudukanEkonomi
                                .keluargaPendapatanRendahAnakSekolah
                                .risikoDropout
                            ).map(([risiko, jumlah]) => (
                              <div
                                key={risiko}
                                className={`text-center p-2 rounded ${
                                  risiko === "tinggi"
                                    ? "bg-red-100 text-red-700"
                                    : risiko === "sedang"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                <div className="font-semibold">
                                  {formatNumber(jumlah)}
                                </div>
                                <div className="capitalize">{risiko}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-300">
                        <p className="text-xs text-orange-800">
                          <strong>Urgensi:</strong>{" "}
                          {formatNumber(
                            integratedData.kependudukanEkonomi
                              .keluargaPendapatanRendahAnakSekolah.risikoDropout
                              .tinggi
                          )}{" "}
                          anak berisiko tinggi putus sekolah karena faktor
                          ekonomi.
                        </p>
                      </div>
                    </div>

                    {/* Penduduk Produktif Pendidikan Tinggi Miskin */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiBook className="w-5 h-5 mr-2 text-purple-600" />
                        Pendidikan Tinggi Tapi Miskin
                      </h4>

                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-purple-600">
                          {formatNumber(
                            integratedData.kependudukanEkonomi
                              .pendudukProduktifPendidikanTinggiMiskin.jumlah
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPercentage(
                            integratedData.kependudukanEkonomi
                              .pendudukProduktifPendidikanTinggiMiskin
                              .persentase
                          )}{" "}
                          dari berpendidikan tinggi
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">
                          Faktor Penyebab:
                        </h5>
                        <div className="space-y-2">
                          {Object.entries(
                            integratedData.kependudukanEkonomi
                              .pendudukProduktifPendidikanTinggiMiskin
                              .faktorPenyebab
                          )
                            .sort(([, a], [, b]) => b - a)
                            .map(([faktor, jumlah]) => (
                              <div
                                key={faktor}
                                className="flex justify-between items-center p-2 bg-white rounded border"
                              >
                                <span className="text-sm text-gray-600 capitalize">
                                  {faktor
                                    .replace(/([A-Z])/g, " $1")
                                    .toLowerCase()}
                                </span>
                                <span className="text-sm font-medium text-purple-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-300">
                        <p className="text-xs text-purple-800">
                          <strong>Solusi:</strong> Perlu program pelatihan ulang
                          dan penciptaan lapangan kerja sesuai kompetensi
                          pendidikan tinggi.
                        </p>
                      </div>
                    </div>

                    {/* Rasio Ketergantungan Ekonomi per Keluarga */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiBarChart className="w-5 h-5 mr-2 text-green-600" />
                        Rasio Ketergantungan Ekonomi
                      </h4>

                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-green-600">
                          {integratedData.kependudukanEkonomi.rasioKetergantunganEkonomiPerKeluarga.rataRata.toFixed(
                            1
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          Rata-rata per keluarga
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">
                          Distribusi Keluarga:
                        </h5>
                        <div className="space-y-2">
                          {Object.entries(
                            integratedData.kependudukanEkonomi
                              .rasioKetergantunganEkonomiPerKeluarga.distribusi
                          ).map(([rasio, jumlah]) => (
                            <div
                              key={rasio}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600">
                                {rasio} tanggungan
                              </span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (jumlah /
                                          Object.values(
                                            integratedData.kependudukanEkonomi
                                              .rasioKetergantunganEkonomiPerKeluarga
                                              .distribusi
                                          ).reduce((a, b) => a + b, 0)) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-green-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                        <p className="text-xs text-green-800">
                          <strong>Status:</strong> Rasio ketergantungan ekonomi{" "}
                          {integratedData.kependudukanEkonomi
                            .rasioKetergantunganEkonomiPerKeluarga.rataRata < 2
                            ? "relatif baik"
                            : "perlu perhatian"}{" "}
                          untuk stabilitas ekonomi keluarga.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integrasi Kependudukan-Pendidikan */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiBook className="w-5 h-5 mr-2 text-indigo-600" />
                    Integrasi Kependudukan & Pendidikan
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Anak Tidak Sekolah Berdasarkan Ekonomi */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
                        Anak Tidak Sekolah vs Ekonomi Keluarga
                      </h4>

                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-red-600">
                          {formatNumber(
                            integratedData.kependudukanPendidikan
                              .anakUsiaSekolahTidakBersekolah.jumlah
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPercentage(
                            integratedData.kependudukanPendidikan
                              .anakUsiaSekolahTidakBersekolah.persentase
                          )}{" "}
                          dari anak usia sekolah
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Berdasarkan Tingkat Ekonomi:
                          </h5>
                          <div className="space-y-2">
                            {Object.entries(
                              integratedData.kependudukanPendidikan
                                .anakUsiaSekolahTidakBersekolah
                                .berdasarkanTingkatEkonomi
                            )
                              .sort(
                                ([, a], [, b]) =>
                                  (b as any).jumlah - (a as any).jumlah
                              )
                              .map(([ekonomi, data]) => (
                                <div
                                  key={ekonomi}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-sm text-gray-600 capitalize">
                                    {ekonomi}
                                  </span>
                                  <div className="flex items-center">
                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                      <div
                                        className="bg-red-600 h-2 rounded-full"
                                        style={{
                                          width: `${
                                            ((data as any).jumlah /
                                              integratedData
                                                .kependudukanPendidikan
                                                .anakUsiaSekolahTidakBersekolah
                                                .jumlah) *
                                            100
                                          }%`,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium text-red-600">
                                      {formatNumber((data as any).jumlah)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Alasan Utama:
                          </h5>
                          <div className="space-y-1">
                            {Object.entries(
                              integratedData.kependudukanPendidikan
                                .anakUsiaSekolahTidakBersekolah
                                .alasanTidakSekolah
                            ).map(([alasan, jumlah]: [string, any], index) => (
                              <div
                                key={index}
                                className="flex items-center p-2 bg-white rounded border"
                              >
                                <FiAlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                                <span className="text-sm text-gray-700 capitalize">
                                  {alasan}
                                </span>
                                <span className="ml-auto text-sm font-medium text-red-600">
                                  {formatNumber(jumlah)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-300">
                        <p className="text-xs text-red-800">
                          <strong>Prioritas:</strong>{" "}
                          {formatPercentage(
                            (integratedData.kependudukanPendidikan
                              .anakUsiaSekolahTidakBersekolah
                              .berdasarkanTingkatEkonomi.miskin.jumlah /
                              integratedData.kependudukanPendidikan
                                .anakUsiaSekolahTidakBersekolah.jumlah) *
                              100
                          )}{" "}
                          kasus dari keluarga miskin, perlu bantuan pendidikan
                          segera.
                        </p>
                      </div>
                    </div>

                    {/* Anak Petani Pendidikan Tinggi */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiTrendingUp className="w-5 h-5 mr-2 text-green-600" />
                        Anak Petani → Pendidikan Tinggi
                      </h4>

                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-green-600">
                          {formatNumber(
                            integratedData.kependudukanPendidikan
                              .anakPetaniBerhasilPendidikanTinggi.jumlah
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPercentage(
                            integratedData.kependudukanPendidikan
                              .anakPetaniBerhasilPendidikanTinggi.persentase
                          )}{" "}
                          dari anak petani
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Jenjang Pendidikan:
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(
                              integratedData.kependudukanPendidikan
                                .anakPetaniBerhasilPendidikanTinggi
                                .distribusiJenjang
                            ).map(([jenjang, jumlah]) => (
                              <div
                                key={jenjang}
                                className="text-center p-2 bg-white rounded border border-green-300"
                              >
                                <div className="font-semibold text-green-700">
                                  {formatNumber(jumlah)}
                                </div>
                                <div className="text-green-600 text-xs">
                                  {jenjang}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Bidang Studi Populer:
                          </h5>
                          <div className="space-y-2">
                            {Object.entries(
                              integratedData.kependudukanPendidikan
                                .anakPetaniBerhasilPendidikanTinggi.bidangStudi
                            )
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 4)
                              .map(([bidang, jumlah]) => (
                                <div
                                  key={bidang}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-sm text-gray-600 capitalize">
                                    {bidang}
                                  </span>
                                  <span className="text-sm font-medium text-green-600">
                                    {formatNumber(jumlah)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Status Setelah Lulus:
                          </h5>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {Object.entries(
                              integratedData.kependudukanPendidikan
                                .anakPetaniBerhasilPendidikanTinggi
                                .statusSetelahLulus
                            ).map(([status, jumlah]) => (
                              <div
                                key={status}
                                className={`text-center p-2 rounded ${
                                  status === "bekerja"
                                    ? "bg-green-100 text-green-700"
                                    : status === "kuliah"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                <div className="font-semibold">
                                  {formatNumber(jumlah)}
                                </div>
                                <div className="capitalize">{status}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                        <p className="text-xs text-green-800">
                          <strong>Prestasi:</strong> Tingkat keberhasilan anak
                          petani mencapai pendidikan tinggi menunjukkan potensi
                          mobilitas sosial yang baik.
                        </p>
                      </div>
                    </div>

                    {/* Korelasi Pendidikan Orang Tua-Anak */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 lg:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiTarget className="w-5 h-5 mr-2 text-blue-600" />
                        Korelasi Pendidikan Orang Tua → Anak
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-center mb-4">
                            <p className="text-3xl font-bold text-blue-600">
                              {integratedData.kependudukanPendidikan.korelasiPendidikanOrangTuaAnak.koefisienKorelasi.toFixed(
                                2
                              )}
                            </p>
                            <p className="text-sm text-gray-600">
                              Koefisien Korelasi -{" "}
                              <span
                                className={`font-medium ${getStatusColor(
                                  "korelasi",
                                  integratedData.kependudukanPendidikan
                                    .korelasiPendidikanOrangTuaAnak
                                    .koefisienKorelasi
                                )}`}
                              >
                                {
                                  integratedData.kependudukanPendidikan
                                    .korelasiPendidikanOrangTuaAnak.kategori
                                }
                              </span>
                            </p>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">
                              Matriks Pendidikan:
                            </h5>
                            <div className="space-y-2">
                              {Object.entries(
                                integratedData.kependudukanPendidikan
                                  .korelasiPendidikanOrangTuaAnak
                                  .matriksPendidikan
                              ).map(([orangTua, data]) => (
                                <div
                                  key={orangTua}
                                  className="p-2 bg-white rounded border border-blue-200"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                      Orang Tua: {orangTua}
                                    </span>
                                    <span className="text-sm font-medium text-blue-600">
                                      Anak Tinggi:{" "}
                                      {formatPercentage(
                                        (data as any).anakTinggi
                                      )}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            Faktor Pendukung Mobilitas:
                          </h5>
                          <div className="space-y-2">
                            {integratedData.kependudukanPendidikan.korelasiPendidikanOrangTuaAnak.faktorPendukung.map(
                              (faktor, index) => (
                                <div
                                  key={index}
                                  className="flex items-center p-2 bg-white rounded border"
                                >
                                  <FiCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span className="text-sm text-gray-700">
                                    {faktor}
                                  </span>
                                </div>
                              )
                            )}
                          </div>

                          <div className="mt-4">
                            <h5 className="font-medium text-gray-800 mb-2">
                              Hambatan Mobilitas:
                            </h5>
                            <div className="space-y-2">
                              {integratedData.kependudukanPendidikan.korelasiPendidikanOrangTuaAnak.hambatan.map(
                                (hambatan, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center p-2 bg-white rounded border"
                                  >
                                    <FiAlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                                    <span className="text-sm text-gray-700">
                                      {hambatan}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-300">
                        <p className="text-xs text-blue-800">
                          <strong>Kesimpulan:</strong> Korelasi{" "}
                          {integratedData.kependudukanPendidikan
                            .korelasiPendidikanOrangTuaAnak.koefisienKorelasi >
                          0.7
                            ? "kuat"
                            : "sedang"}{" "}
                          menunjukkan pentingnya intervensi untuk memutus siklus
                          pendidikan rendah.
                        </p>
                      </div>
                    </div>

                    {/* Analisis Spasial dan Geografis */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FiMapPin className="w-5 h-5 mr-2 text-green-600" />
                        Analisis Spasial & Geografis
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Desa Kepadatan Tinggi Minim Fasilitas */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FiAlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                            Kepadatan Tinggi - Fasilitas Minim
                          </h4>

                          <div className="space-y-4">
                            {integratedData.spasialGeografis.desaKepadatanTinggiMinimFasilitas.map(
                              (desa, index) => (
                                <div
                                  key={index}
                                  className="p-4 bg-white rounded-lg border border-yellow-300"
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <h5 className="font-semibold text-gray-900">
                                        {desa.nama}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {desa.kecamatan}
                                      </p>
                                    </div>
                                    <Badge variant="warning" size="sm">
                                      Prioritas {desa.prioritas}
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="text-center p-2 bg-red-100 rounded">
                                      <div className="font-semibold text-red-700">
                                        {desa.kepadatan}
                                      </div>
                                      <div className="text-red-600 text-xs">
                                        jiwa/km²
                                      </div>
                                    </div>
                                    <div className="text-center p-2 bg-orange-100 rounded">
                                      <div className="font-semibold text-orange-700">
                                        {desa.indeksFasilitas.toFixed(1)}
                                      </div>
                                      <div className="text-orange-600 text-xs">
                                        Indeks Fasilitas
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h6 className="font-medium text-gray-800 mb-2 text-sm">
                                      Fasilitas yang Kurang:
                                    </h6>
                                    <div className="flex flex-wrap gap-1">
                                      {desa.fasilitasKurang.map(
                                        (fasilitas, idx) => (
                                          <span
                                            key={idx}
                                            className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded"
                                          >
                                            {fasilitas}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  </div>

                                  <div className="mt-3 p-2 bg-yellow-100 rounded border border-yellow-300">
                                    <p className="text-xs text-yellow-800">
                                      <strong>Rekomendasi:</strong>{" "}
                                      {desa.rekomendasi}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Indeks Aksesibilitas Desa */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FiNavigation className="w-5 h-5 mr-2 text-blue-600" />
                            Indeks Aksesibilitas Desa
                          </h4>

                          <div className="text-center mb-4">
                            <p className="text-3xl font-bold text-blue-600">
                              {integratedData.spasialGeografis.indeksAksesibilitasDesa.rataRata.toFixed(
                                1
                              )}
                            </p>
                            <p className="text-sm text-gray-600">
                              Rata-rata Indeks Aksesibilitas
                            </p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h5 className="font-medium text-gray-800 mb-2">
                                Kategori Aksesibilitas:
                              </h5>
                              <div className="space-y-2">
                                {Object.entries(
                                  integratedData.spasialGeografis
                                    .indeksAksesibilitasDesa.kategori
                                ).map(([kategori, jumlah]) => (
                                  <div
                                    key={kategori}
                                    className="flex justify-between items-center"
                                  >
                                    <span className="text-sm text-gray-600 capitalize">
                                      {kategori}
                                    </span>
                                    <div className="flex items-center">
                                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                        <div
                                          className={`h-2 rounded-full ${
                                            kategori === "baik"
                                              ? "bg-green-600"
                                              : kategori === "sedang"
                                              ? "bg-yellow-600"
                                              : "bg-red-600"
                                          }`}
                                          style={{
                                            width: `${
                                              (jumlah /
                                                Object.values(
                                                  integratedData
                                                    .spasialGeografis
                                                    .indeksAksesibilitasDesa
                                                    .kategori
                                                ).reduce((a, b) => a + b, 0)) *
                                              100
                                            }%`,
                                          }}
                                        ></div>
                                      </div>
                                      <span className="text-sm font-medium text-blue-600">
                                        {formatNumber(jumlah)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="font-medium text-gray-800 mb-2">
                                Faktor Penentu:
                              </h5>
                              <div className="space-y-2">
                                {Object.entries(
                                  integratedData.spasialGeografis
                                    .indeksAksesibilitasDesa.faktorPenentu
                                ).map(([faktor, bobot]) => (
                                  <div
                                    key={faktor}
                                    className="flex justify-between items-center p-2 bg-white rounded border"
                                  >
                                    <span className="text-sm text-gray-600 capitalize">
                                      {faktor
                                        .replace(/([A-Z])/g, " $1")
                                        .toLowerCase()}
                                    </span>
                                    <span className="text-sm font-medium text-blue-600">
                                      {formatPercentage(bobot)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-300">
                            <p className="text-xs text-blue-800">
                              <strong>Status:</strong>{" "}
                              {integratedData.spasialGeografis
                                .indeksAksesibilitasDesa.kategori.buruk > 0
                                ? `${integratedData.spasialGeografis.indeksAksesibilitasDesa.kategori.buruk} desa memerlukan perbaikan infrastruktur akses`
                                : "Aksesibilitas desa secara umum sudah baik"}
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analisis Prediktif dan Perencanaan */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FiTrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                        Analisis Prediktif & Perencanaan
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Prediksi Struktur Penduduk */}
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FiActivity className="w-5 h-5 mr-2 text-purple-600" />
                            Prediksi Struktur Penduduk 2030
                          </h4>

                          <div className="space-y-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-purple-600">
                                {formatNumber(
                                  integratedData.prediktifPerencanaan
                                    .prediksiStrukturPenduduk.totalPrediksi2030
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                Total Penduduk 2030
                              </p>
                              <p className="text-xs text-gray-500">
                                Pertumbuhan:{" "}
                                {integratedData.prediktifPerencanaan
                                  .prediksiStrukturPenduduk.tingkatPertumbuhan >
                                0
                                  ? "+"
                                  : ""}
                                {integratedData.prediktifPerencanaan.prediksiStrukturPenduduk.tingkatPertumbuhan.toFixed(
                                  1
                                )}
                                % per tahun
                              </p>
                            </div>

                            <div>
                              <h5 className="font-medium text-gray-800 mb-2">
                                Proyeksi Kelompok Usia:
                              </h5>
                              <div className="space-y-2">
                                {Object.entries(
                                  integratedData.prediktifPerencanaan
                                    .prediksiStrukturPenduduk
                                    .proyeksiKelompokUsia
                                ).map(([kelompok, data]) => (
                                  <div
                                    key={kelompok}
                                    className="p-2 bg-white rounded border border-purple-200"
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-gray-600">
                                        {kelompok}
                                      </span>
                                      <span className="text-sm font-medium text-purple-600">
                                        {formatNumber(data.jumlah)}
                                      </span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                      {getTrendIcon(data.tren)}
                                      <span className="text-xs text-gray-500 ml-1">
                                        {data.perubahanPersentase > 0
                                          ? "+"
                                          : ""}
                                        {data.perubahanPersentase.toFixed(1)}%
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-300">
                            <p className="text-xs text-purple-800">
                              <strong>Implikasi:</strong> Peningkatan populasi
                              lansia memerlukan persiapan fasilitas kesehatan
                              dan program lansia.
                            </p>
                          </div>
                        </div>

                        {/* Kebutuhan Pembangunan Prioritas */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FiTarget className="w-5 h-5 mr-2 text-green-600" />
                            Kebutuhan Pembangunan Prioritas
                          </h4>

                          <div className="space-y-3">
                            {integratedData.prediktifPerencanaan.kebutuhanPembangunanPrioritas.map(
                              (prioritas, index) => (
                                <div
                                  key={index}
                                  className="p-3 bg-white rounded-lg border border-green-300"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-semibold text-gray-900">
                                      {prioritas.kategori}
                                    </h5>
                                    <Badge
                                      variant={
                                        prioritas.tingkatUrgensi === "tinggi"
                                          ? "danger"
                                          : prioritas.tingkatUrgensi ===
                                            "sedang"
                                          ? "warning"
                                          : "info"
                                      }
                                      size="sm"
                                    >
                                      {prioritas.tingkatUrgensi}
                                    </Badge>
                                  </div>

                                  <p className="text-sm text-gray-600 mb-2">
                                    {prioritas.deskripsi}
                                  </p>

                                  <div className="text-xs text-gray-500">
                                    <strong>Target:</strong> {prioritas.target}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <strong>Estimasi Biaya:</strong>{" "}
                                    {formatCurrency(prioritas.estimasiBiaya)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <strong>Timeline:</strong>{" "}
                                    {prioritas.timeline}
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                            <p className="text-xs text-green-800">
                              <strong>Total Estimasi:</strong>{" "}
                              {formatCurrency(
                                integratedData.prediktifPerencanaan.kebutuhanPembangunanPrioritas.reduce(
                                  (total, item) => total + item.estimasiBiaya,
                                  0
                                )
                              )}{" "}
                              untuk 5 tahun ke depan.
                            </p>
                          </div>
                        </div>

                        {/* Simulasi Dampak Program */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FiBarChart className="w-5 h-5 mr-2 text-orange-600" />
                            Simulasi Dampak Program
                          </h4>

                          <div className="space-y-4">
                            {integratedData.prediktifPerencanaan.simulasiDampakProgram.map(
                              (program, index) => (
                                <div
                                  key={index}
                                  className="p-3 bg-white rounded-lg border border-orange-300"
                                >
                                  <h5 className="font-semibold text-gray-900 mb-2">
                                    {program.namaProgram}
                                  </h5>

                                  <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div className="text-center p-2 bg-blue-100 rounded">
                                      <div className="font-semibold text-blue-700">
                                        {formatNumber(program.targetPenerima)}
                                      </div>
                                      <div className="text-blue-600 text-xs">
                                        Target Penerima
                                      </div>
                                    </div>
                                    <div className="text-center p-2 bg-green-100 rounded">
                                      <div className="font-semibold text-green-700">
                                        {formatPercentage(
                                          program.estimasiDampak
                                        )}
                                      </div>
                                      <div className="text-green-600 text-xs">
                                        Estimasi Dampak
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-xs text-gray-600 space-y-1">
                                    <div>
                                      <strong>Indikator:</strong>{" "}
                                      {program.indikatorKeberhasilan}
                                    </div>
                                    <div>
                                      <strong>Risiko:</strong>{" "}
                                      {program.risikoKegagalan}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-300">
                            <p className="text-xs text-orange-800">
                              <strong>Rekomendasi:</strong> Prioritaskan program
                              dengan dampak tinggi dan risiko rendah untuk
                              optimalisasi anggaran pembangunan.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Summary dan Rekomendasi Strategis */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiTarget className="w-6 h-6 mr-3 text-blue-600" />
            Ringkasan Analisis & Rekomendasi Strategis
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Key Findings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Temuan Kunci
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiUsers className="w-4 h-4 mr-2 text-blue-600" />
                    Demografis
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      •{" "}
                      {formatNumber(
                        demographicData?.keluargaKepalaPerempuanAnakSekolah
                          .jumlah || 0
                      )}{" "}
                      keluarga dengan kepala keluarga perempuan memiliki anak
                      usia sekolah
                    </li>
                    <li>
                      •{" "}
                      {formatPercentage(
                        demographicData?.pendudukProduktifTanpaPekerjaanTetap
                          .persentase || 0
                      )}{" "}
                      penduduk usia produktif tanpa pekerjaan tetap
                    </li>
                    <li>
                      • Rasio ketergantungan:{" "}
                      {demographicData?.rasioKetergantunganDesa.nilai.toFixed(
                        1
                      ) || "0"}
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiDollarSign className="w-4 h-4 mr-2 text-green-600" />
                    Ekonomi
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      •{" "}
                      {formatNumber(
                        economicData?.petaniLahanKecilTanpaBantuan.jumlah || 0
                      )}{" "}
                      petani lahan 0.5 Ha tanpa bantuan
                    </li>
                    <li>
                      • Sektor non-pertanian:{" "}
                      {formatPercentage(
                        economicData?.persentasePendapatanSektor.nonPertanian
                          .nilai || 0
                      )}{" "}
                      dari total pendapatan
                    </li>
                    <li>
                      • Indeks Gini:{" "}
                      {economicData?.kesenjanganEkonomiAntarDesa.indeksGini.toFixed(
                        2
                      ) || "0"}
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiBook className="w-4 h-4 mr-2 text-indigo-600" />
                    Pendidikan & Sosial
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      •{" "}
                      {formatNumber(
                        integratedData?.kependudukanPendidikan
                          .anakUsiaSekolahTidakBersekolah.jumlah || 0
                      )}{" "}
                      anak tidak sekolah karena faktor ekonomi
                    </li>
                    <li>
                      •{" "}
                      {formatNumber(
                        integratedData?.kependudukanPendidikan
                          .anakPetaniBerhasilPendidikanTinggi.jumlah || 0
                      )}{" "}
                      anak petani berhasil mencapai pendidikan tinggi
                    </li>
                    <li>
                      • Korelasi pendidikan orang tua-anak:{" "}
                      {integratedData?.kependudukanPendidikan.korelasiPendidikanOrangTuaAnak.koefisienKorelasi.toFixed(
                        2
                      ) || "0.00"}{" "}
                      (
                      {integratedData?.kependudukanPendidikan
                        .korelasiPendidikanOrangTuaAnak.kategori ||
                        "tidak tersedia"}
                      )
                    </li>
                    <li>
                      • Proyeksi kebutuhan fasilitas pendidikan 5 tahun ke depan
                      telah diidentifikasi
                    </li>
                  </ul>
                </div>

                {/* Strategic Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiTarget className="w-5 h-5 mr-2 text-red-600" />
                    Rekomendasi Strategis
                  </h3>

                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-900 mb-2 flex items-center">
                        <FiAlertCircle className="w-4 h-4 mr-2" />
                        Prioritas Tinggi
                      </h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>
                          • Program bantuan pendidikan untuk keluarga miskin
                          dengan anak sekolah
                        </li>
                        <li>
                          • Pelatihan keterampilan untuk penduduk usia produktif
                          tanpa pekerjaan tetap
                        </li>
                        <li>
                          • Bantuan modal dan teknologi untuk petani lahan kecil
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                        <FiAlertTriangle className="w-4 h-4 mr-2" />
                        Prioritas Sedang
                      </h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>
                          • Diversifikasi ekonomi untuk mengurangi
                          ketergantungan pada pertanian
                        </li>
                        <li>
                          • Perbaikan infrastruktur akses untuk desa terpencil
                        </li>
                        <li>
                          • Program pemberdayaan perempuan kepala keluarga
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                        <FiInfo className="w-4 h-4 mr-2" />
                        Jangka Panjang
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                          • Pengembangan sektor industri dan jasa untuk menyerap
                          tenaga kerja terdidik
                        </li>
                        <li>
                          • Program beasiswa untuk anak dari keluarga petani
                        </li>
                        <li>
                          • Sistem monitoring dan evaluasi program pembangunan
                          berkelanjutan
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Action Plan */}
              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2 text-purple-600" />
                  Rencana Aksi 2025-2030
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="p-4 bg-green-100 rounded-lg mb-3">
                      <FiTarget className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-900">
                        2025-2026
                      </h4>
                      <p className="text-sm text-green-700">Fase Stabilisasi</p>
                    </div>
                    <ul className="text-sm text-gray-600 text-left space-y-1">
                      <li>• Implementasi program bantuan pendidikan</li>
                      <li>• Pelatihan keterampilan dasar</li>
                      <li>• Perbaikan infrastruktur prioritas</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="p-4 bg-blue-100 rounded-lg mb-3">
                      <FiTrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-blue-900">2027-2028</h4>
                      <p className="text-sm text-blue-700">Fase Pengembangan</p>
                    </div>
                    <ul className="text-sm text-gray-600 text-left space-y-1">
                      <li>• Diversifikasi ekonomi lokal</li>
                      <li>• Pengembangan UMKM</li>
                      <li>• Peningkatan akses pendidikan tinggi</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="p-4 bg-purple-100 rounded-lg mb-3">
                      <FiAward className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-900">
                        2029-2030
                      </h4>
                      <p className="text-sm text-purple-700">
                        Fase Konsolidasi
                      </p>
                    </div>
                    <ul className="text-sm text-gray-600 text-left space-y-1">
                      <li>• Evaluasi dan optimalisasi program</li>
                      <li>• Pengembangan inovasi lokal</li>
                      <li>• Sustainability planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiBarChart className="w-5 h-5 mr-2 text-indigo-600" />
                  Indikator Kinerja Utama (KPI) 2030
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">
                      Tingkat Partisipasi Sekolah
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl font-bold text-blue-600">70%</div>
                    <div className="text-sm text-gray-600">
                      Penduduk dengan Pekerjaan Tetap
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl font-bold text-purple-600">
                      40%
                    </div>
                    <div className="text-sm text-gray-600">
                      Kontribusi Sektor Non-Pertanian
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-2xl font-bold text-orange-600">
                      0.35
                    </div>
                    <div className="text-sm text-gray-600">
                      Target Indeks Gini
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
