"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import AIAssistant from "./AIAssistant";
import { Toaster } from "react-hot-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User";
    const role = localStorage.getItem("userRole") || "";
    setUserName(name);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    router.push("/");
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "bagian-umum":
        return "Bagian Umum";
      case "adc":
        return "ADC";
      case "direktur":
        return "Direktur";
      default:
        return "User";
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
    { name: "Surat Masuk", href: "/surat-masuk", icon: Mail, current: false },
    {
      name: "Surat Keluar",
      href: "/surat-keluar",
      icon: FileText,
      current: false,
    },
    { name: "Kontak", href: "/kontak", icon: Users, current: false },
    { name: "Pengaturan", href: "/pengaturan", icon: Settings, current: false },
  ];

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-800">Sispurat</h1>
                <p className="text-xs text-neutral-600">Digital Mail</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">
                  {userName}
                </p>
                <p className="text-xs text-neutral-600">
                  {getRoleTitle(userRole)}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? "bg-blue-50 text-blue-700"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-neutral-200 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-neutral-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-neutral-400 hover:text-neutral-600"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari surat atau dokumen..."
                    className="w-64 px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-neutral-400 hover:text-neutral-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
      <Toaster position="top-right" />
    </div>
  );
}
