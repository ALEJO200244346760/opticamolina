import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "5493516797785"; // ← cambiá esto
  const message = "Hola! Me encontraba viendo la página y quiero más información";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white text-2xl shadow-lg transition-all duration-300 hover:scale-110"
    >
      <FaWhatsapp />
    </a>
  );
}