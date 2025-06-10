"use client";

import { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaBuilding,
  FaUsers,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUser,
  FaTimes,
  FaBars,
} from "react-icons/fa";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Data Desa Tibawa telah diperbarui",
      time: "5 menit lalu",
      type: "info",
    },
    {
      id: 2,
      message: "Laporan bulanan siap diunduh",
      time: "1 jam lalu",
      type: "success",
    },
    {
      id: 3,
      message: "Perlu verifikasi data Desa Bongomeme",
      time: "2 jam lalu",
      type: "warning",
    },
  ];

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:text-blue-600 transition-colors"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-5 h-5" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" />

      {/* Search */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            className="block w-full rounded-lg border-0 bg-gray-50 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 sm:text-sm"
            placeholder="Cari desa, data, atau laporan..."
            type="search"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* Quick Stats */}
        <div className="hidden lg:flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaBuilding className="w-4 h-4 text-blue-600" />
            <span className="font-medium">12 Desa</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaUsers className="w-4 h-4 text-green-600" />
            <span className="font-medium">45,231 Penduduk</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            className="relative rounded-full bg-white p-2 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="sr-only">View notifications</span>
            <FaBell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">
                  Notifikasi
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          notification.type === "info"
                            ? "bg-blue-500"
                            : notification.type === "success"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center space-x-2 rounded-full bg-white p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-50 transition-colors"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-sm font-medium text-gray-900">
                Admin Kecamatan
              </div>
              <div className="text-xs text-gray-500">Kec. Tibawa</div>
            </div>
            <span className="text-gray-400">⌄</span>
          </button>

          {/* Profile dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  Admin Kecamatan
                </p>
                <p className="text-sm text-gray-500">admin@kec-tibawa.go.id</p>
              </div>

              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaUser className="w-4 h-4 mr-3 text-gray-500" />
                  Profil Saya
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaCog className="w-4 h-4 mr-3 text-gray-500" />
                  Pengaturan
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaQuestionCircle className="w-4 h-4 mr-3 text-gray-500" />
                  Bantuan
                </a>
              </div>

              <div className="border-t border-gray-100 py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3 text-red-500" />
                  Keluar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
