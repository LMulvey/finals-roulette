import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { deleteSavedLoadout } from '@/lib/saved-loadouts';
import { type ContestantLoadout } from '@/lib/schema';
import { ShareFat, Trash } from '@phosphor-icons/react';
import * as motion from 'motion/react-client';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';

export const LoadoutCard = ({
  loadout,
}: {
  readonly loadout: ContestantLoadout;
}) => {
  const pageContext = usePageContext();
  const loadoutKey = pageContext.routeParams.loadout;
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        description:
          "Post to Reddit, Discord, Friendster, Bluesky, whatever. I don't give a shit I'm not your dad.",
        title: 'Copied shareable URL to clipboard',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy URL:', error);
      toast({
        description: 'Worked fine on my machine so I am blaming you.',
        title: 'Failed to copy',
      });
    }
  };

  const deleteLoadout = async () => {
    deleteSavedLoadout(loadoutKey);
    navigate(`/saved`);
  };

  return (
    <motion.div
      className="rounded-lg bg-gray-800 text-yellow-400 font-bold flex md:flex-col gap-4 items-center w-full md:w-60 h-40 bg-cover bg-no-repeat"
      key={loadoutKey}
      style={{
        backgroundImage: loadout.contestant.imageUrl
          ? `url(${loadout.contestant.imageUrl})`
          : '',
      }}
      variants={{
        animate: { opacity: 1, scale: 1 },
        initial: { opacity: 0, scale: 0 },
      }}
    >
      <div className="flex flex-col justify-between gap-1 p-6 bg-finals-black/70 h-full w-full rounded-lg">
        <p className="text-xl">{loadout.loadoutName ?? 'Saved Loadout'}</p>
        <div className="rounded-md flex flex-row items-center justify-center px-2 py-1 gap-8 bg-finals-black/90">
          <button
            className="rounded-full h-6 w-6 text-finals-black bg-white flex items-center justify-center hover:bg-gray-500"
            onClick={copyToClipboard}
            type="button"
          >
            <ShareFat
              size={18}
              weight="fill"
            />
          </button>
          <AlertDialog>
            <AlertDialogTrigger className="rounded-full h-6 w-6 bg-finals-red text-white flex items-center justify-center hover:bg-red-500">
              <Trash
                size={18}
                weight="fill"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will remove this loadout
                  from your saved list. If you save the code, you'll be able to
                  recover but otherwise you'll have to roll it again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="text-white bg-finals-red"
                  onClick={deleteLoadout}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
};
