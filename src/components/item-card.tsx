type Item = {
  description?: string;
  id: string;
  imageUrl?: string;
  label?: string;
  title: string;
};

export const ItemCard = (item: Item) => {
  return (
    <div
      className="p-6 rounded-lg bg-gray-800 text-yellow-400 font-bold flex md:flex-col gap-4 items-center w-full md:w-60"
      key={item.id}
    >
      {item.imageUrl ? (
        <img
          className="w-24 h-24 md:w-48 md:h-48 rounded-lg shadow-md border border-yellow-300"
          src={item.imageUrl}
        />
      ) : (
        <div className="w-24 h-24 md:w-48 md:h-48 rounded-lg shadow-md border border-yellow-300 bg-gray-600" />
      )}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl">{item.title}</h2>
        <p className="text-lg">{item.label}</p>
        <p className="text-md italic text-white">{item.description}</p>
      </div>
    </div>
  );
};
