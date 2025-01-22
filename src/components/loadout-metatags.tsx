import { type ContestantLoadout } from '@/lib/schema';

export const LoadoutMetaTags = ({
  loadout,
}: {
  readonly loadout: ContestantLoadout | null;
}) => {
  const title = loadout?.loadoutName ?? 'Loadout Details';
  const titleWithTemplate = `${title} | THE FINALS Roulette`;
  const imageUrl =
    loadout?.contestant?.imageUrl ?? '/default-loadout-image.jpg';
  const description = loadout
    ? `Try ${loadout.loadoutName} in THE FINALS`
    : 'Try this fancy shitter contestant build in THE FINALS';

  return (
    <>
      <title>{titleWithTemplate}</title>
      <meta
        content={description}
        name="description"
      />

      {/* Open Graph */}
      <meta
        content={title}
        property="og:title"
      />
      <meta
        content={description}
        property="og:description"
      />
      <meta
        content={imageUrl}
        property="og:image"
      />
      <meta
        content="website"
        property="og:type"
      />

      {/* Twitter */}
      <meta
        content="summary_large_image"
        name="twitter:card"
      />
      <meta
        content={title}
        name="twitter:title"
      />
      <meta
        content={description}
        name="twitter:description"
      />
      <meta
        content={imageUrl}
        name="twitter:image"
      />
    </>
  );
};
