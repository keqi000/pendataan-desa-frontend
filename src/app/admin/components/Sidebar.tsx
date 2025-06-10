"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBuilding,
  FaChartLine,
  FaFileAlt,
  FaMap,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/Dashboard",
    icon: <FaTachometerAlt className="w-5 h-5" />,
    description: "Overview & Statistics",
  },
  {
    title: "Monitoring Desa",
    href: "/admin/monitoring",
    icon: <FaBuilding className="w-5 h-5" />,
    description: "Village Monitoring",
    submenu: [
      { title: "Daftar Desa", href: "/admin/monitoring/villages" },
      { title: "Perbandingan", href: "/admin/monitoring/comparison" },
      { title: "Quality Check", href: "/admin/monitoring/quality" },
    ],
  },
  {
    title: "Analisis Data",
    href: "/admin/analysis",
    icon: <FaChartLine className="w-5 h-5" />,
    description: "Data Analysis",
    submenu: [
      { title: "Analisis Tingkat 1", href: "/admin/analysis/level1" },
      { title: "Analisis Tingkat 2", href: "/admin/analysis/level2" },
      { title: "Prediksi", href: "/admin/analysis/prediction" },
    ],
  },
  {
    title: "Laporan",
    href: "/admin/reports",
    icon: <FaFileAlt className="w-5 h-5" />,
    description: "Reports & Export",
  },
  {
    title: "Peta & Geografis",
    href: "/admin/maps",
    icon: <FaMap className="w-5 h-5" />,
    description: "Geographic Data",
  },
  {
    title: "Pengaturan",
    href: "/admin/settings",
    icon: <FaCog className="w-5 h-5" />,
    description: "System Settings",
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 shadow-xl">
          {/* Logo & Header */}
          <div className="flex h-16 shrink-0 items-center px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FaBuilding className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">
                  Admin Kecamatan
                </h1>
                <p className="text-blue-100 text-sm">Kabupaten Gorontalo</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col px-4 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <div>
                    {item.submenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={`group flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                          pathname.startsWith(item.href)
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">{item.icon}</div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <FaChevronDown
                          className={`transform transition-transform duration-200 ${
                            expandedMenu === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`group flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                          pathname === item.href
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Submenu */}
                    {item.submenu && expandedMenu === item.title && (
                      <ul className="mt-2 space-y-1 pl-8">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                                pathname === subitem.href
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-600"
                              }`}
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 shadow-xl">
          {/* Mobile Header */}
          <div className="flex h-20 shrink-0 items-center justify-between px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FaBuilding className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">
                  Admin Kecamatan
                </h1>
                <p className="text-blue-100 text-sm">Kabupaten Gorontalo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>

          {/* Mobile Navigation - Same as desktop */}
          <nav className="flex flex-1 flex-col px-4 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <div>
                    {item.submenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={`group flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                          pathname.startsWith(item.href)
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">{item.icon}</div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <FaChevronDown
                          className={`transform transition-transform duration-200 ${
                            expandedMenu === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                          pathname === item.href
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )}

                    {item.submenu && expandedMenu === item.title && (
                      <ul className="mt-2 space-y-1 pl-8">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              onClick={onClose}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                                pathname === subitem.href
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-600"
                              }`}
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
