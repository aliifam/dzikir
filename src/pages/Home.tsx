import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  BookOpenIcon,
  ArrowDownTrayIcon,
  // ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid"; // Import ikon yang diperlukan
import Layout from "../components/Layout";
import { useThemeContext } from "../hooks/useThemeContext"; // Import ThemeContext
import { useEffect, useState } from "react";

// Definisikan tipe BeforeInstallPromptEvent jika belum ada
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const Home = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext(); // Mengambil tema dari context
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null); // State untuk menyimpan event beforeinstallprompt
  const [isInstallable, setIsInstallable] = useState(false); // Untuk mengontrol tampilan tombol install

  // Tangkap event 'beforeinstallprompt' dan simpan di state
  useEffect(() => {
    const handleBeforeInstallPrompt: EventListener = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      e.preventDefault(); // Cegah prompt otomatis
      setDeferredPrompt(event as BeforeInstallPromptEvent); // Simpan event di state
      setIsInstallable(true); // Tampilkan tombol install
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Fungsi untuk menampilkan prompt install
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Tampilkan prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null); // Hapus event setelah prompt ditampilkan
        setIsInstallable(false); // Sembunyikan tombol setelah install
      });
    }
  };

  // Data untuk tombol
  const buttons = [
    {
      label: "Dzikir Pagi",
      icon: <SunIcon className="h-12 w-12" />,
      path: "/pagi",
    },
    {
      label: "Dzikir Petang",
      icon: <MoonIcon className="h-12 w-12" />,
      path: "/petang",
    },
    // {
    //   label: "Dzikir Setelah Shalat",
    //   icon: <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />,
    //   path: "/setelah-shalat",
    // },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Dzikir Pagi Petang Online</title>
        <meta
          name="description"
          content="Dzikir Online adalah aplikasi untuk membantu membaca Dzikir setiap pagi dan petang"
        />
        <meta
          name="keywords"
          content="dzikir, pagi, petang, al-matsurat, al-ma'tsurat, al-mathurat, al-ma'thurat"
        />
      </Helmet>

      <div
        className={`w-full max-w-md text-center py-10 px-2 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {/* Heading with Book Icon */}
        <h1 className="text-3xl font-bold mb-4">
          <BookOpenIcon className="h-8 w-8 inline-block mr-2" />
          Dzikir Online
        </h1>
        <p className="text-sm mb-4">
          Biasakan membaca Dzikir setiap hari, pagi, dan, petang
        </p>

        {/* Install Button (small icon only) */}
        {isInstallable && (
          <button
            onClick={handleInstallClick}
            className="mb-4 inline-flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            aria-label="Install PWA"
          >
            <ArrowDownTrayIcon className="h-6 w-6" />
          </button>
        )}

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {buttons.map((button) => (
            <button
              key={button.label}
              onClick={() => navigate(button.path)}
              className={`border rounded-lg p-4 font-semibold flex flex-col items-center justify-center transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  : "bg-gray-50 border-gray-200 text-black hover:bg-gray-200"
              }`}
            >
              <div className="text-4xl mb-2">{button.icon}</div>
              <div>{button.label}</div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};
