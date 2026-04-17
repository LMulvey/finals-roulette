import { type Patch } from '../types';

export const patch730: Patch = {
  date: new Date('2025-07-03T11:00:00'),
  description: `This update brings balance changes to gadgets and weapons, as well as a wide range of bug fixes and quality-of-life improvements across animation, audio, gameplay, maps, UI, and more.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/730',
  patchNotes: [
    // Gadgets
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      devNote:
        'The flat healing per second on stationary targets during a Cashout steal has been more impactful than we expected. This change will address that specific use case, while ensuring the H+ is still valuable.',
      note: 'H+ Infuser: Decreased health given per shot from 20 to 15.',
      section: 'balance',
      target: 'hplus-infuser',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Healing Emitter: Cooldown now begins when the Emitter is destroyed, not on deployment.',
      section: 'balance',
      target: 'healing-emitter',
    },
    {
      adjustmentType: 'buff',
      category: 'gadget',
      note: 'Healing Emitter: Cooldown reduced from 35s to 30s.',
      section: 'balance',
      target: 'healing-emitter',
    },
    {
      adjustmentType: 'addition',
      category: 'gadget',
      devNote:
        'These changes make smart placement more important and bring the Emitter in line with other deployables.',
      note: 'Healing Emitter: Can now be retrieved via the control tablet (15s cooldown) or manual interaction (3s cooldown).',
      section: 'balance',
      target: 'healing-emitter',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      note: 'Gateway: Increased cooldown on items that travel through the gateway before they can re-enter from 0.5s to 1s.',
      section: 'balance',
      target: 'gateway',
    },

    // Weapons - Equip/Unequip Times
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: '93R: Decreased equip and unequip time from 0.2s to 0.15s.',
      section: 'balance',
      target: '93r',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'AKM: Increased equip time from 0.23s to 0.3s; decreased unequip time from 0.23s to 0.2s.',
      section: 'balance',
      target: 'akm',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'ARN-220: Increased equip time from 0.2s to 0.3s.',
      section: 'balance',
      target: 'arn-220',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'CB-01 Repeater: Increased equip time from 0.2s to 0.3s.',
      section: 'balance',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Cerberus 12GA: Increased equip time from 0.2s to 0.3s.',
      section: 'balance',
      target: 'cerberus',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote:
        'CL-40 is now slightly less effective at close range and requires more accuracy for max damage.',
      note: 'CL-40: Increased self-damage multiplier from 1.25 to 1.35. Decreased inner blast radius from 60cm to 50cm.',
      section: 'balance',
      target: 'cl-40',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'FAMAS: Increased equip time from 0.2s to 0.3s; decreased unequip time from 0.23s to 0.2s.',
      section: 'balance',
      target: 'famas',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'FCAR: Increased equip time from 0.2s to 0.3s; decreased unequip time from 0.23s to 0.2s.',
      section: 'balance',
      target: 'fcar',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'KS-23: Increased equip time from 0.2s to 0.3s.',
      section: 'balance',
      target: 'ks-23',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Lewis Gun: Increased equip time from 0.23s to 0.35s; decreased unequip time from 0.3s to 0.25s.',
      section: 'balance',
      target: 'lewis-gun',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'LH1: Increased equip time from 0.15s to 0.3s; increased unequip time from 0.15s to 0.2s.',
      section: 'balance',
      target: 'lh1',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'M134 Minigun: Increased unequip time from 0.2s to 0.25s.',
      section: 'balance',
      target: 'm134-minigun',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Model 1887: Increased equip time from 0.15s to 0.3s; increased unequip time from 0.15s to 0.2s.',
      section: 'balance',
      target: 'model-1887',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Pike-556: Increased equip time from 0.2s to 0.3s.',
      section: 'balance',
      target: 'pike-556',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'SA1216: Increased equip time from 0.15s to 0.3s; increased unequip time from 0.15s to 0.2s.',
      section: 'balance',
      target: 'sa1216',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'SH1900: Increased equip and unequip time from 0.15s to 0.2s.',
      section: 'balance',
      target: 'sh1900',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'ShAK-50: Increased equip time from 0.2s to 0.3s.',
      section: 'balance',
      target: 'shak-50',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'This update addresses melee hit detection and sweep accuracy for the Sledgehammer.',
      note: 'Sledgehammer: Increased height of primary attack hit sweep from 15cm to 25cm, making attacks more reliable.',
      section: 'balance',
      target: 'sledgehammer',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'XP-54: Decreased equip time from 0.23s to 0.2s; decreased unequip time from 0.23s to 0.2s.',
      section: 'balance',
      target: 'xp-54',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'SR-84: Increased equip time from 0.15s to 0.3s; increased unequip time from 0.15s to 0.2s.',
      section: 'balance',
      target: 'sr-84',
    },

    // New Weapon System
    {
      adjustmentType: 'removal',
      category: 'weapons',
      devNote:
        'This removes the delay but may reintroduce some older issues. The new system will return once fixed.',
      note: 'Temporarily disabled the new weapon system for automatic weapons to fix major bugs causing delayed hit feedback.',
      section: 'balance',
      target: 'general',
    },

    // Animation
    {
      adjustmentType: 'addition',
      category: 'animation',
      note: 'New animation customization slot: You can now customize your cycle action animations.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Improved animations when dashing while charging with the Sword or holding Grenades.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed a minor visual issue during the Double Up Reload from Empty Animation for the ARN-220.',
      section: 'content-and-bug-fixes',
      target: 'arn-220',
    },

    // Audio
    {
      adjustmentType: 'neutral',
      category: 'audio',
      note: 'Re-mastered some player voice-over content.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'addition',
      category: 'audio',
      note: 'Added Scotty and June commentary for when a team has two Cashouts in progress simultaneously.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'addition',
      category: 'audio',
      note: "Added voice-over lines from the player's respawn statue, audible to their Squad when requesting a revive.",
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Characters
    {
      adjustmentType: 'buff',
      category: 'characters',
      note: 'Heavy muscular body types have been given more defined anatomy/muscles.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Controller
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Fixed a bug where controller would rumble from far away explosions.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Cosmetics
    {
      adjustmentType: 'addition',
      category: 'cosmetics',
      note: "You can now select your Contestant’s intro and winner's emotes separately!",
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Closed Beta Chic shoes now display correctly on Heavy and Medium contestants.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: "Campsite Creeper facewear no longer clips with Sal's Halo and Orbital Witness headwear.",
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Synapse Coreframe and Termiframe chassis no longer clip with Cursed soles and Memento Pumps.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: "Fixed an issue where the Outfit Creation Inspect screen only allowed zooming on the Contestant's face.",
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed decals being mirrored upside down on the ISEUL-T Blueprint Bloom CB-01 skin.',
      section: 'content-and-bug-fixes',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed Kanji being mirrored on the grips of the Shinjuku Slicer Revolver skin.',
      section: 'content-and-bug-fixes',
      target: 'revolver',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fix for The Freeze Frame Emote so the bullets do not appear in the wrong location when viewed from certain perspectives.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Contracts
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed an issue that prevented the contract “Set 5 opponents on fire with the Pyro Mine or Pyro Grenade” from progressing.',
      section: 'content-and-bug-fixes',
      target: 'contracts',
    },

    // Gadgets (Bug Fixes)
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Data Reshaper: Improved its visual effect for the Healing Emitter and Breaching Drill.',
      section: 'content-and-bug-fixes',
      target: 'data-reshaper',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'H+ Infuser: Fixed issue where it would look like it was out of ammo while it was not.',
      section: 'content-and-bug-fixes',
      target: 'hplus-infuser',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: "Healing Emitter: Fixed an issue where it wouldn't connect to players who stood below it when placed on a platform or ledge.",
      section: 'content-and-bug-fixes',
      target: 'healing-emitter',
    },

    // Game Modes
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Upgraded the winners sequence for all modes!',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Cashout: Fixed an issue that could cause Vaults to occasionally spawn within 10m of a Cashout station.',
      section: 'content-and-bug-fixes',
      target: 'cashout',
    },

    // Practice Range: Dojo Challenges
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Added Easy and Hard difficulties to the Big Box Challenge.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Improved bot accuracy across difficulty settings for more consistent results.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Added more behavior profiles so bots act more nuanced based on weapon type.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed incorrect naming of the middle difficulty in Shooting Gallery from Medium to Standard.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed an issue where damage received from a sparring bot in a previous challenge attempt was shown in a new attempt.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Resolved navigation issues on the challenge selection screen when using a controller.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed a minor UI issue where the back button on the challenge selection widget would distort when hovered.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },

    // Gameplay
    {
      adjustmentType: 'buff',
      category: 'gameplay',
      note: 'Made doors more responsive by reducing interaction delay.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      devNote:
        'Scanning devices should now see through smoke as intended, acting as a hard-counter.',
      note: 'Fixed an issue where detected enemies would not appear if they were inside Smoke, when detected by the Tracking Dart, Sonar Grenade, or Proximity Sensor.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Maps
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Bernal: Fixed a zipline that was slightly floating above the ground next to the Chapel.',
      section: 'content-and-bug-fixes',
      target: 'bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Suspended Structures: Adjusted cover placement on the top floor of the ISEUL-T suspended structure for better cover.',
      section: 'content-and-bug-fixes',
      target: 'iseul-t',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'General: Improved visuals for partially destroyed structures and made them more consistent and easier to see.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'General: Fixed inconsistency of lamp bulb assets not being breakable across maps.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Monaco: Fixed floating rubble piles in “Duck and Cover” variation.',
      section: 'content-and-bug-fixes',
      target: 'monaco',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Nozomi/Citadel: Moved the map border in a bit behind the Operations Center and Cybercafe for better clarity.',
      section: 'content-and-bug-fixes',
      target: 'nozomi-citadel',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Kyoto: The Pagoda has received a new destruction pass and now behaves more realistically when collapsing.',
      section: 'content-and-bug-fixes',
      target: 'kyoto',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Seoul: Fixed an issue with a building floor having no collision and a gap in the Data Center floor.',
      section: 'content-and-bug-fixes',
      target: 'seoul',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'SYS$HORIZON: Fixed a spot on a facade to prevent players from hiding in semi-transparent cubes.',
      section: 'content-and-bug-fixes',
      target: 'sys-horizon',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Skyway Stadium: Fixed a rendering issue for the elevator shaft on the rooftop hospital building. Destruction upgraded for more reliable and realistic effects.',
      section: 'content-and-bug-fixes',
      target: 'skyway-stadium',
    },

    // Private Matches
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed an issue where the player tile drag-and-drop action could be continued all the way into the match.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Added the limited mode “Blast Off!” to private matches while the game mode is active.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },

    // Rendering
    {
      adjustmentType: 'buff',
      category: 'rendering',
      note: 'Increased main menu and intro sequence reflection quality.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Social
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed an issue where the system menu could appear when closing the text chat using the ESC key.',
      section: 'content-and-bug-fixes',
      target: 'chat',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Pending friend requests can no longer join voice chat if your privacy setting is set to Friends Only.',
      section: 'content-and-bug-fixes',
      target: 'voice-chat',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed an issue where the option to send a Rise & Shine recruitment request was possible to players that are not eligible to be a prospect.',
      section: 'content-and-bug-fixes',
      target: 'rise-and-shine',
    },

    // Specializations
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: "Fixed an issue where Charge 'N Slam running speed would be slowed down if initiated while firing.",
      section: 'content-and-bug-fixes',
      target: 'charge-n-slam',
    },

    // Spectator
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed the player Team list overflowing the Private Match spectator UI when playing with three Teams.',
      section: 'content-and-bug-fixes',
      target: 'spectator',
    },

    // UI
    {
      adjustmentType: 'addition',
      category: 'ui',
      note: 'You can now spawn into the Practice Range with a selected Weapon from the equipment screen.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Users not yet connected to a game are now visible on the scoreboard until they abandon the session.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'addition',
      category: 'ui',
      note: 'Added support for filters in the Charms/Stickers screens.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue allowing players to ping objects through walls at slight angles.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed the Weapon Sights menu not showing which Contestants already had the Sights equipped.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where the team respawn countdown timer could show a very large number.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where the currently selected Weapon customization reset after returning from the Inspect menu.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed Career progression rewards so they no longer sometimes had a locked icon when they were unlocked.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed purchase prompt always appearing after exiting Inspect in the Legacy Battlepass purchase screen.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed Contestants not loading with correct items equipped when returning to the customization menu after opening a bundle preview.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue which would randomly open the Contestant selection menu after unlocking the Light Build.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
  ],
  title: 'Season 7 Update 7.3.0',
  version: '7.3.0',
};
