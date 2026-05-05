import Card from './Card.jsx';

export default function Section({ title, items, showImage, onSelectSong, onLike, onAdd }) {
  return (
    <div className="mb-8">
      <h2 className="text-white text-lg md:text-xl font-bold mb-4">
        {title}
      </h2>    

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            item={item}
            showImage={showImage}
            onClick={() => onSelectSong(item)}
            onLike={onLike}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
};