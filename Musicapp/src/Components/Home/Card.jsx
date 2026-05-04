export default function Card({ title, subtitle }) {
  return (
    <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] cursor-pointer transition">
      <div className="w-full h-32 bg-gray-700 rounded mb-4"></div>
      <div className="text-white font-semibold">{title}</div>
      <div className="text-gray-400 text-sm">{subtitle}</div>
    </div>
  );
};