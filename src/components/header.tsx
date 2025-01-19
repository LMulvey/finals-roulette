// eslint-disable-next-line import/extensions
import finalsLogoHorizontal from 'public/images/logos/the-finals-logo-horizontal.crop.png';

export const Header = () => {
  return (
    <header className="w-full max-w-2xl p-8">
      <div className=" w-full flex flex-col items-center gap-2 text-white ">
        <img
          alt="THE FINALS logo"
          className="w-full"
          src={finalsLogoHorizontal}
        />
        <h2 className="italic text-4xl ml-4 text-left w-full">Roulette!</h2>
      </div>
    </header>
  );
};
