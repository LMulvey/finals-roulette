export const serializeLoadout = (items: Array<{ id: string }>) => {
  // Create a compact string of just the IDs
  const idString = items.map((item) => item.id).join(',');

  // Convert to base64 and make it URL safe
  return btoa(idString)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/[=]+$/u, '');
};

export const deserializeLoadout = (compressed: string): string[] => {
  try {
    // Restore base64 padding and characters
    const padded = compressed.replaceAll('-', '+').replaceAll('_', '/');

    // Add back padding if needed
    const padding = padded.length % 4;
    const withPadding = padding ? padded + '='.repeat(4 - padding) : padded;

    // Decode base64 and split into IDs
    const decoded = atob(withPadding);
    return decoded.split(',').filter(Boolean);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to decompress loadout:', error);
    return [];
  }
};
