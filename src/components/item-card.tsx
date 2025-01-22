import * as motion from 'motion/react-client';
import { type ReactNode, type Ref } from 'react';

type Item = {
  description?: string;
  icon: ReactNode;
  id: string;
  imageUrl?: string;
  label?: string;
  title: string;
};

export const ItemCard = (item: Item & { ref?: Ref<HTMLDivElement> }) => {
  return (
    <motion.div
      className="rounded-lg bg-gray-800 text-yellow-400 font-bold flex md:flex-col gap-4 items-center w-full md:w-60 h-60 bg-cover bg-no-repeat"
      key={item.id}
      ref={item.ref}
      style={{ backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : '' }}
      variants={{
        animate: { opacity: 1, scale: 1 },
        initial: { opacity: 0, scale: 0 },
      }}
    >
      <div className="flex flex-col justify-between gap-1 p-6 bg-finals-black/60 h-full w-full">
        <h2 className="text-md bg-gray-800 px-2 py-1 rounded-md text-yellow-400 flex flex-row items-center gap-2">
          {item.icon}
          {item.title}
        </h2>
        <div className="space-y-2 h-28">
          <p className="text-lg">{item.label}</p>
          <p className="text-sm font-normal italic text-white line-clamp-4 text-ellipsis">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
