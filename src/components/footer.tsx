export const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-4 align-end absolute bottom-0">
      <div className="container mx-auto px-4 text-sm text-center">
        <p className="mb-2">
          Thanks to{' '}
          <a
            className="text-gray-100 hover:text-white underline"
            href="https://thefinals.wiki"
            rel="noopener noreferrer"
            target="_blank"
          >
            thefinals.wiki
          </a>{' '}
          for equipment content and data
        </p>
        <p className="text-gray-400">
          Created by jjjangus + <span className="line-through">yuri</span> yiru
        </p>
        <p className="text-gray-400">
          Thanks Embark for making the game. Let us save outfits.
        </p>
      </div>
    </footer>
  );
};
