// Click-to-chat link to the Fantintstic WhatsApp line, pre-filled with an
// enquiry message. Shared by every "Get Yours" CTA across the site so the
// number and message only ever live in one place.
const WHATSAPP_NUMBER = "6583990179"; // +65 8399 0179 — digits only for wa.me
const WHATSAPP_MESSAGE = "Hi there Fantintstic! I am interested in your tints.";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
