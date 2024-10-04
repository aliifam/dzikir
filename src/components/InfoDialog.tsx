import { useEffect } from "react"; // Import useEffect
import { useThemeContext } from "../hooks/useThemeContext"; // Import the ThemeContext
import { XMarkIcon } from "@heroicons/react/24/solid";

interface InfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  faedah?: string;
  sumber?: string;
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  isOpen,
  onClose,
  faedah,
  sumber,
}) => {
  const { theme } = useThemeContext(); // Get the theme from context

  // Menonaktifkan scrollbar saat dialog dibuka
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Membersihkan efek saat komponen unmounted
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div
        className={`mx-auto max-w-md rounded-lg p-6 shadow-lg transition-transform transform ${
          isOpen ? "scale-100" : "scale-95"
        } ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Info</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-2 text-sm">
          {faedah && (
            <p>
              <strong>Faedah:</strong> {faedah}
            </p>
          )}
          {sumber && (
            <p>
              <br />
              <strong>Sumber:</strong> {sumber}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoDialog;
