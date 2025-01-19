import { type ContestantGadget } from './schema';

export const GADGETS: ContestantGadget[] = [
  {
    classType: ['light'],
    description: 'A lower-powered version of C4.',
    id: 'breach-charge',
    imageUrl: '/images/gadgets/breach-charge.png',
    label: 'Breach Charge',
  },
  {
    classType: ['light'],
    description:
      'A throwable two-way portal for contestants and other throwable.s',
    id: 'gateway',
    imageUrl: '/images/gadgets/gateway.png',
    label: 'Gateway',
  },
  {
    classType: ['light'],
    description:
      'A throwable for temporarily disabling gadgets and specializations within vicinity.',
    id: 'glitch-grenade',
    imageUrl: '/images/gadgets/glitch-grenade.png',
    label: 'Glitch Grenade',
  },
  {
    classType: ['light'],
    description:
      'Creates a small vortex that sucks all contestants and items towards it for a brief duration.',
    id: 'gravity-vortex',
    imageUrl: '/images/gadgets/gravity-vortex.png',
    label: 'Gravity Vortex',
  },
  {
    classType: ['light'],
    description:
      'A grenade that pings every few seconds and detects/marks enemy contestants.',
    id: 'sonar-grenade',
    imageUrl: '/images/gadgets/sonar-grenade.png',
    label: 'Sonar Grenade',
  },
  {
    classType: ['light'],
    description:
      'Fires a stunning projectile that reduces movement speed and disables specializations and gadgets on the target for a brief duration.',
    id: 'stun-gun',
    imageUrl: '/images/gadgets/stun-gun.png',
    label: 'Stun Gun',
  },
  {
    classType: ['light'],
    description:
      'A gadget that fires a small exploding bore for easily destroying walls and other environmental structures from a distance.',
    id: 'thermal-bore',
    imageUrl: '/images/gadgets/thermal-bore.png',
    label: 'Thermal Bore',
  },
  {
    classType: ['light'],
    description:
      'Formerly a specialization, this gadget allows the user to easily identify other contestants for a short duration.',
    id: 'thermal-vision',
    imageUrl: '/images/gadgets/thermal-vision.png',
    label: 'Thermal Vision',
  },
  {
    classType: ['light'],
    description:
      'Fires a small tracking dart that sticks into other contestants and marks their locations for your team for a short duration.',
    id: 'tracking-dart',
    imageUrl: '/images/gadgets/tracking-dart.png',
    label: 'Tracking Dart',
  },
  {
    classType: ['light'],
    description:
      'A throwable that makes all friendly contestants within the aera-of-effect invisible for a short duration.',
    id: 'vanishing-bomb',
    imageUrl: '/images/gadgets/vanishing-bomb.png',
    label: 'Vanishing Bomb',
  },
  {
    classType: ['medium'],
    description:
      'A deployable that destroys incoming projectiles – but self-damages every time.',
    id: 'aps-turret',
    imageUrl: '/images/gadgets/aps-turret.png',
    label: 'APS Turret',
  },
  {
    classType: ['medium'],
    description:
      'A gadget that changes any deployed gadgets into arena throwables or other items – effectively removing enemy gadgets from the arena.',
    id: 'data-reshaper',
    imageUrl: '/images/gadgets/data-reshaper.png',
    label: 'Data Reshaper',
  },
  {
    classType: ['medium'],
    description:
      'A gadget that allows the user to revive enemy targets instantly after a short charge. Causes revive sickness in the target that disables their gadgets and specialization for 5 seconds after revive.',
    id: 'defibrillator',
    imageUrl: '/images/gadgets/defibrillator.png',
    label: 'Defibrillator',
  },
  {
    classType: ['medium', 'heavy'],
    description:
      'A deployable mine that arms 1.5 seconds after landing on a flat surface and detonates via proximity or other explosions.',
    id: 'explosive-mine',
    imageUrl: '/images/gadgets/explosive-mine.png',
    label: 'Explosive Mine',
  },
  {
    classType: ['medium'],
    description:
      'A deployable gas mine that arms 1.5 seconds after landing on a flat surface and detonates via proximity or other explosions.',
    id: 'gas-mine',
    imageUrl: '/images/gadgets/gas-mine.png',
    label: 'Gas Mine',
  },
  {
    classType: ['medium'],
    description:
      'A deployable mine-like item that causes the glitch effect to any enemy contestants with a line of sight to it.',
    id: 'glitch-trap',
    imageUrl: '/images/gadgets/glitch-trap.png',
    label: 'Glitch Trap',
  },
  {
    classType: ['medium'],
    description:
      'A deployable arena jump pad to help you boing your way to new heights. Once deployed, anyone can use it.',
    id: 'jump-pad',
    imageUrl: '/images/gadgets/jump-pad.png',
    label: 'Jump Pad',
  },
  {
    classType: ['medium'],
    description:
      "A deployable arena zipline. Sponsored by Zipline 'N Co. Once deployed, anyone can use it.",
    id: 'zipline',
    imageUrl: '/images/gadgets/zipline.png',
    label: 'Zipline',
  },
  {
    classType: ['medium', 'heavy'],
    description:
      'A deployable object that pings and tracks nearby opponents through walls within range.',
    id: 'proximity-sensor',
    imageUrl: '/images/gadgets/proximity-sensor.png',
    label: 'Proximity Sensor',
  },
  {
    classType: ['heavy'],
    description:
      'A deployable that removes gravity within a circle area-of-effect an causes items nearby to float upward for a time.',
    id: 'anti-gravity-cube',
    imageUrl: '/images/gadgets/anti-gravity-cube.png',
    label: 'Anti-Gravity Cube',
  },
  {
    classType: ['heavy'],
    description:
      'A deployable metal barricade that blocks gunfire, projectiles, but allows things like the Flamethrower and Spear to pass through for reasons unbeknownst to players.',
    id: 'barricade',
    imageUrl: '/images/gadgets/barricade.png',
    label: 'Barricade',
  },
  {
    classType: ['heavy'],
    description: 'C4 go boom.',
    id: 'c4',
    imageUrl: '/images/gadgets/c4.png',
    label: 'C4',
  },
  {
    classType: ['heavy'],
    description:
      'A deployable dome shield that used to be more useful but its duration was recently heavily nerfed.',
    id: 'dome-shield',
    imageUrl: '/images/gadgets/dome-shield.png',
    label: 'Dome Shield',
  },
  {
    classType: ['heavy'],
    description:
      "A deployable gadget that shoots a locking mechanism to the ground and traps nearby enemy contestants, kinda. It's more like a leash and contestants can drag it around.",
    id: 'lockbolt-launcher',
    imageUrl: '/images/gadgets/lockbolt-launcher.png',
    label: 'Lockbolt Launcher',
  },
  {
    classType: ['heavy'],
    description:
      'A deployable fire mine that arms 1.5 seconds after landing on a flat surface and detonates via proximity or other explosions.',
    id: 'pyro-mine',
    imageUrl: '/images/gadgets/pyro-mine.png',
    label: 'Pyro Mine',
  },
  {
    classType: ['heavy'],
    description:
      'A rocket-propelled grenade launcher that shoots a hilariously weak projectile that does little physical damage and even less environmental/structure damage.',
    id: 'rpg-7',
    imageUrl: '/images/gadgets/rpg-7.png',
    label: 'RPG-7',
  },
  {
    classType: ['light', 'medium', 'heavy'],
    description: 'Use these on your teammates to be an annoying little shit.',
    id: 'flashbang',
    imageUrl: '/images/gadgets/flashbang.png',
    label: 'Flashbang',
  },
  {
    classType: ['light', 'medium', 'heavy'],
    description:
      'A throwable frag grenade that explodes a few seconds after throwing. Cannot be cooked. Does not actually fire out shrapnel.',
    id: 'frag-grenade',
    imageUrl: '/images/gadgets/frag-grenade.png',
    label: 'Frag Grenade',
  },
  {
    classType: ['light', 'medium', 'heavy'],
    description:
      'A throwable that creates a stinky gas cloud in the area in which it detonates. It can be put out with fire.',
    id: 'gas-grenade',
    imageUrl: '/images/gadgets/gas-grenade.png',
    label: 'Gas Grenade',
  },
  {
    classType: ['light', 'medium', 'heavy'],
    description:
      'A throwable that creates a wall of goo in a random direction upon opening – never in the place that you want or need it.',
    id: 'goo-grenade',
    imageUrl: '/images/gadgets/goo-grenade.png',
    label: 'Goo Grenade',
  },
  {
    classType: ['light', 'medium', 'heavy'],
    description:
      'A throwable that breaks and shoots fire and liquid gas in an area of effect, lighting nearby contestants and objects on fire for a short duration. Fire does damage over time.',
    id: 'pyro-grenade',
    imageUrl: '/images/gadgets/pyro-grenade.png',
    label: 'Pyro Grenade',
  },
  {
    classType: ['light', 'medium', 'heavy'],
    description:
      'A throwable that creates a cloud of smoke. Most notably, smoke hides contestant outlines while inside it - great for disappearing temporarily.',
    id: 'smoke-grenade',
    imageUrl: '/images/gadgets/smoke-grenade.png',
    label: 'Smoke Grenade',
  },
];
