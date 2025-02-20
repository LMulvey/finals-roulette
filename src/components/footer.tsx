import {
  heavyClass,
  heavySpecializations,
  heavyWeapons,
} from '@/lib/contestants/heavy';
import {
  lightClass,
  lightSpecializations,
  lightWeapons,
} from '@/lib/contestants/light';
import {
  mediumClass,
  mediumSpecializations,
  mediumWeapons,
} from '@/lib/contestants/medium';
import { ALL_GADGETS } from '@/lib/gadgets';
import * as motion from 'motion/react-client';

const ALL_ITEMS = [
  ...heavyWeapons,
  ...mediumWeapons,
  ...lightWeapons,
  ...heavySpecializations,
  ...mediumSpecializations,
  ...lightSpecializations,
  heavyClass,
  mediumClass,
  lightClass,
  ...ALL_GADGETS,
];

const generateBalanceRequest = (type: 'BUFF' | 'NERF') => {
  const randomItem = ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
  return `Love the game Embark but PLEASE ${type.toLowerCase()} the ${randomItem.label}`;
};

export const Footer = () => {
  const embarkRequests = [
    'Thanks Embark for making the game. Let us save outfits.',
    'Embark please add more dance emotes.',
    'Hey Embark, can I have a Twister event so I can be like Glenn Powell in Twisters but in THE FINALS?',
    'Embark, please add an event that spawns a giant turtle that you can ride and flips over to reveal a whole island',
    'EMBARK, ICE ZONE WHEN?',
    'Embark, allow us to set more rules in private matches',
    'Embark, add a replay system',
    () => generateBalanceRequest('BUFF'),
    () => generateBalanceRequest('NERF'),
  ];

  const randomRequest = (() => {
    const request =
      embarkRequests[Math.floor(Math.random() * embarkRequests.length)];
    return typeof request === 'function' ? request() : request;
  })();

  return (
    <motion.footer
      animate="animate"
      className="w-full bg-black text-gray-300 py-4 align-end absolute bottom-0"
      initial="initial"
      transition={{ duration: 1 }}
      variants={{
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: 100 },
      }}
    >
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
        <p className="text-gray-400">{randomRequest}</p>
      </div>
    </motion.footer>
  );
};
