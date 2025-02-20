import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Utility function for class names
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  // Get albums, fetch function, and loading state from the store
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  // Fetch albums when the component loads
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  console.log({ albums });

  return (
    // Main container with full height, flexbox for column layout, and spacing between elements
    <div className="h-full flex flex-col gap-2">
      {/*Navigation menu */}

      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >

            {/* Home icon with some margin for spacing */}
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          {/* Section only visible to signed-in users */}
          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              {/* Chat/Messages icon with some margin for spacing */}
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/*library */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        {/* Scrollable area for playlists */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {
              // if loading is true render a skeleton component
              isLoading ? (
                // this is a custom component created by us manually
                <PlaylistSkeleton />
              ) : (
                // if not loading show this
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                  >
                    <img
                      src={album.imageUrl}
                      alt="Playlist img"
                      className="size-12 rounded-md flex-shrink-0 object-cover"
                    />

                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="font-medium truncate">{album.title}</p>

                      <p className="text-sm text-zinc-400 truncate">
                        Album • {album.artist}
                      </p>
                    </div>
                  </Link>
                ))
              )
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;

// 2:25:52
