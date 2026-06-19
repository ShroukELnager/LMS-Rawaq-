import { Plus } from "lucide-react";

export default function FloatingButton() {
  return (
    <button
    style={{
  position: "fixed",
  bottom: "32px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  backgroundColor: "var(--primary, #006d77)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
  border: "none",
  cursor: "pointer",
}}
    >
      <Plus size={24} />
    </button>
  );
}