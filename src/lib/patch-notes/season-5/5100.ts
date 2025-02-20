import { type Patch } from '../types';

export const patch5100: Patch = {
  date: new Date('2025-02-19'),
  description: `In this update, the Stun Gun has been temporarily removed as we begin a full rework to refine its role as a true crowd control tool. This change is aimed at improving gameplay balance, especially for new players. Check the attached dev note for more details!

Also of note, we’ve been closely investigating server performance for some time, recognizing that it hasn’t been meeting expectations. After thorough analysis, we believe we’ve identified a key issue, and this fix should significantly improve the experience for a large number of players.

That said, our work isn’t done. We’re committed to making ongoing improvements and will continue rolling out fixes as we identify further opportunities for optimization.

Thank you for your feedback and reports, community input has been invaluable in helping us refine the experience. Please keep sharing your observations, and let us know if you experience a difference after this update. `,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/5100',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'gadget',
      devNote:
        "With the change to three ammo, the Charge's priming time now feels a bit slow for its projectile count. This adjustment aims to improve that.",
      note: 'Decreased priming time from 1.9s to 1.5s',
      sassyNote: 'Pocket sand reigns supreme',
      section: 'balance',
      target: 'breach-charge',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      note: 'Decreased ammo from 2 to 1',
      section: 'balance',
      target: 'frag-grenade',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      note: 'Decreased damage from 150 to 140',
      section: 'balance',
      target: 'frag-grenade',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      devNote:
        "Frag Grenades have been outperforming the RPG-7 in damage, ammo, and cooldown, which isn't ideal. We also recognize that grenades can be a pain point for players. These adjustments aim to bring grenades more in line with other explosives while slightly buffing their impact on the environment.\nAdditionally, our goal is to increase the readability of grenades in the future, which should help alleviate some of the frustration. When that update arrives, we'll revisit these changes and make any necessary adjustments.",
      note: 'Increased environmental damage from 600 to 900',
      section: 'balance',
      target: 'frag-grenade',
    },
    {
      adjustmentType: 'removal',
      category: 'gadget',
      devNote:
        "The Stun Gun has long been a major pain point for players. Despite multiple adjustments, it remains overly punishing for those on the receiving end.\n\nThe gadget was always intended to be primarily for crowd control. However, it instead functions too often as a tool to secure a kill, leaving little room for counterplay. This is especially problematic for new players, as early encounters with the Stun Gun can be frustrating enough to impact their experience and desire to continue playing. To keep the game engaging and fair for all, we need to fix this.\n\nAfter careful evaluation, we've made the call to fully rework the Stun Gun. Our goal is to refine its mechanics, visuals, and overall clarity so that when encountered in the Arena, its role is clear, fair, and impactful. To do this properly, we're temporarily removing the Stun Gun while we work on delivering a better version that matches our vision.\n\nAll progression, skins and unlocks will carry over to the new version of the Stun Gun when it returns. For now, the gadget will be unavailable while we build a true crowd control tool that benefits the whole team and enables clutch plays, without the frustrations that held it back.\n\nWe hope to be able to put an improved Stun Gun back into your hands as soon as possible.",
      note: 'Temporarily disabled the Stun Gun, pending a re-work that will release some time during season 6',
      section: 'balance',
      target: 'stun-gun',
    },
    {
      adjustmentType: 'buff',
      category: 'animation',
      devNote:
        "Our fix for the manual action cancel exploit unintentionally made these weapons feel less responsive. This update should help improve that. We're still reviewing manual actions and looking for ways to make them smoother while keeping them balanced.",
      note: "We've improved animation timing so that manual actions (such as lever-action or pump-action sequences) now play more quickly after a quick melee attack, reducing dead time between actions. The impact of this change varies depending on the weapon's specific animation set",
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed a rare case where contestants would be stuck in a T-pose when emoting',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'audio',
      note: 'Added headshot elimination sound',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: "We've updated the hand model to a new, improved version that looks significantly more realistic and detailed, enhancing the overall immersion",
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Fixed an issue where controller navigation would stop working in the main menu for party members who were not the party leader',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Fixed an issue where controller navigation was broken in the Recently Played With tab',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed hairstyle compatibility with the following cosmetics: Cabalgata Bolero, Ballad Brim Headwear, Multi-Mood Mask',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue where destroying certain friendly gadgets incorrectly granted combat score',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Resolved issues preventing item use, including weapons not dealing damage and grenades failing to explode',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Doors now open automatically at lower sprint speeds, making movement smoother',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Cashouts can now be vaulted and climbed on',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue where some grenades and projectiles (e.g., Dome Shield, Anti-Gravity Grenade, Goo Projectiles) were larger than intended',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed a bug that could cause extreme respawn timer values for teams',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed an issue where, upon elimination in later tournament rounds, loadout changes could sometimes be overwritten',
      section: 'content-and-bug-fixes',
      target: 'Tournament',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed dark reflections in the foggy weather setting',
      section: 'content-and-bug-fixes',
      target: 'Bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Adjusted the angle of a rooftop tile that appeared walkable but was too steep to climb',
      section: 'content-and-bug-fixes',
      target: 'Bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed two instances where multiple doors were overlapping in the same location',
      section: 'content-and-bug-fixes',
      target: 'Bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Kyoto destruction fix. Increased the floor’s resistance to impulse damage',
      section: 'content-and-bug-fixes',
      target: 'Kyoto',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Power Shift: Fixed an issue where players on the Bamboo Forest side would sometimes spawn in the wrong location at the start of the round',
      section: 'content-and-bug-fixes',
      target: 'Kyoto',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed the floating props in the market',
      section: 'content-and-bug-fixes',
      target: 'Skyway Stadium',
    },
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Updated AMD FSR resolution scaling method to version 3.1.3 (not including Frame Generation which is still being worked on)',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: 'Updated the underlying physics of pulled objects, which should make their behaviour more consistent when dragged by the Winch Claw',
      section: 'content-and-bug-fixes',
      target: 'winch-claw',
    },
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      devNote:
        "We've seen players creatively using the Winch Claw to launch objects, sometimes sending Cashout Stations hundreds of meters across the map. While we love the ingenuity, this can disrupt game pacing and make stealing nearly impossible. These changes retain the core gameplay but limit how far objectives can be launched, keeping the flow of the game mode balanced.",
      note: 'Reduced the amount of physics force-pulled objects can apply to world objects, preventing them from launching items like Cashout Stations across long distances',
      section: 'content-and-bug-fixes',
      target: 'winch-claw',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed a case where some world textures would remain blurry even though there was enough video memory to stream in higher quality',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Server performance enhancement',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where some elements of the player cards were not rendered correctly',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where chat messages from club members displayed with double brackets',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Updated the gamepad inventory layout for the following presets: Equipment Wheel, Modifier Button Equipping, and Directional Equipping. The new layout better matches the actual gamepad controls. If customized bindings no longer align with the new layout, it will revert to the previous horizontal layout',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where the Play button incorrectly displayed "World Tour" when matchmaking into a different mode',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'vfx',
      note: 'Fixed an issue where particle effects such as masks could persist on the ground after a contestant was eliminated',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'vfx',
      note: 'Fixed an issue where indestructible objects did not display a visual effect on melee impact to indicate their indestructibility',
      section: 'content-and-bug-fixes',
    },
    // Security and Anti-cheat Section
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Resolved EAC and OBS incompatibility issue for versions 30.1 and above',
      sassyNote:
        'One-week warning bans still giving. Pretty please do not cheat.',
      section: 'security-and-anti-cheat',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Resolved EAC and Windows 24H2 incompatibility',
      section: 'security-and-anti-cheat',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'General improvements and detections enhancements',
      section: 'security-and-anti-cheat',
    },
  ],
  title: 'Balance changes and an AMA ',
  version: '5.10.0',
};
