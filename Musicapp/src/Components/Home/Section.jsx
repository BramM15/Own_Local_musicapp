import Card from './Card.jsx';

export default function Section({ title, items }) {
  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <Card key={index} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
  );
};