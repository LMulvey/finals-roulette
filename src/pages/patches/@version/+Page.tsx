/* eslint-disable unicorn/no-array-reduce */
import { cvu } from '@/lib/cvu';
import { maybeGetItemById } from '@/lib/maybe-get-item-by-id';
import { type Patch, type PatchNote } from '@/lib/patch-notes/types';
import {
  ArrowFatDown,
  ArrowFatUp,
  LinkSimple,
  TriangleDashed,
  XCircle,
} from '@phosphor-icons/react';
import { ArrowLeftIcon } from 'lucide-react';
import { useData } from 'vike-react/useData';

const sectionClasses = cvu(
  'space-y-6 pb-8 border-b border-gray-700 last:border-b-0',
);
const categoryClasses = cvu('space-y-4');

type GroupedNotes = {
  [key in PatchNote['section']]: {
    [maybeKey in PatchNote['category']]?: {
      [key: string]: PatchNote[];
    };
  };
};

const AdjustmentIcon = ({
  type,
}: {
  readonly type: PatchNote['adjustmentType'];
}) => {
  switch (type) {
    case 'buff':
      return (
        <ArrowFatUp
          className="text-green-500"
          size={16}
          weight="fill"
        />
      );
    case 'nerf':
      return (
        <ArrowFatDown
          className="text-finals-red"
          size={16}
          weight="fill"
        />
      );
    case 'removal':
      return (
        <XCircle
          className="text-finals-red"
          size={16}
          weight="fill"
        />
      );
    default:
      return (
        <TriangleDashed
          className="text-gray-500"
          size={16}
          weight="fill"
        />
      );
  }
};

const groupPatchNotes = (notes: PatchNote[]): GroupedNotes => {
  return notes.reduce((accumulator, note) => {
    const section = note.section;
    const category = note.category;
    const target = note.target || 'general';

    if (!accumulator[section]) {
      accumulator[section] = {};
    }

    if (!accumulator[section][category]) {
      accumulator[section][category] = {};
    }

    if (!accumulator[section][category][target]) {
      accumulator[section][category][target] = [];
    }

    accumulator[section][category][target].push(note);
    return accumulator;
  }, {} as GroupedNotes);
};

export const Page = () => {
  const data = useData<{ patch: null | Patch }>();
  const { patch } = data;

  if (!patch) {
    return <h1>not found</h1>;
  }

  const groupedNotes = groupPatchNotes(patch.patchNotes);

  return (
    <div className="max-w-4xl mx-auto p-8 pb-80">
      <a
        className="text-finals-white flex flex-row items-center gap-2 mb-8"
        href="/patches"
      >
        <ArrowLeftIcon size={14} />
        Back to patches
      </a>
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold">
          Patch {patch.version}: {patch.title}
        </h1>
        <div className="flex flex-row gap-4 items-center">
          <time className="text-gray-400">
            {patch.date.toLocaleDateString()}
          </time>
          <div className="w-px h-4 bg-white flex-shrink-0" />
          <a
            className="flex flex-row items-center gap-2 text-white text-md"
            href={patch.originalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkSimple
              size={16}
              weight="fill"
            />
            Embark Patch Notes
          </a>
        </div>
        <p className="whitespace-pre-wrap text-lg">{patch.description}</p>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedNotes).map(([section, categories]) => (
          <div
            className={sectionClasses()}
            key={section}
          >
            <h2 className="text-2xl font-bold capitalize mb-6">
              {section.replaceAll('-', ' ')}
            </h2>

            <div className="space-y-8">
              {Object.entries(categories).map(([category, targets]) => (
                <div
                  className={categoryClasses()}
                  key={category}
                >
                  <h3 className="text-xl font-semibold capitalize">
                    {category.replaceAll('-', ' ')}
                  </h3>

                  <div className="space-y-6">
                    {Object.entries(targets).map(([target, notes]) => (
                      <div
                        className="space-y-2"
                        key={target}
                      >
                        {target !== 'general' && (
                          <h4 className="text-lg font-medium">
                            {maybeGetItemById(target)?.label ?? target}
                          </h4>
                        )}

                        {notes.map((note) => (
                          <div
                            className="flex gap-2"
                            key={`${note.category}-${note.note}`}
                          >
                            <div className="w-4 h-4 flex-shrink-0 mt-1">
                              <AdjustmentIcon type={note.adjustmentType} />
                            </div>
                            <div className="space-y-2">
                              <p>{note.note}</p>
                              {note.devNote && (
                                <p className="text-gray-400 text-sm whitespace-pre-wrap">
                                  Dev Note: {note.devNote}
                                </p>
                              )}
                              {note.sassyNote && (
                                <p className="text-yellow-400 text-sm italic">
                                  <span
                                    className="mr-2"
                                    role="img"
                                  >
                                    💁‍♂️
                                  </span>{' '}
                                  {note.sassyNote}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
