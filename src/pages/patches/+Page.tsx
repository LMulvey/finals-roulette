import { ALL_PATCHES } from '@/lib/patch-notes/patches';

export const Page = () => {
  const patches = [...ALL_PATCHES].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  if (!patches.length) {
    return <div>No patches found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Patch Notes</h1>
      <div className="space-y-4">
        {patches.map((patch) => (
          <a
            className="block p-4 border rounded-lg hover:bg-yellow-300/40 transition-colors"
            href={`/patches/${patch.version.replaceAll('.', '')}`}
            key={patch.version}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-300">
                {patch.version}
              </h2>
              <span className="text-finals-white/80">
                {patch.date.toLocaleDateString()}
              </span>
            </div>
            {patch.title && (
              <p className="text-finals-white mt-2">{patch.title}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};
