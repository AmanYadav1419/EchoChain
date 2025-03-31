import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play, ShoppingCart } from "lucide-react";
import {buyMusic} from "../../../../Context/ContractContext"
import { useState } from "react";
import toast from "react-hot-toast";

const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;
	const [isOwned, setIsOwned] = useState(false);
	const [isBuying, setIsBuying] = useState(false);

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};

	const handleBuy = async () => {
		try {
			setIsBuying(true);
			await buyMusic(song.tokenId, song.price);
			setIsOwned(true);
			toast.success("Song purchased successfully!");
		} catch (error: any) {
			toast.error(error.message || "Failed to purchase song");
		} finally {
			setIsBuying(false);
		}
	};

	return (
		<div className="absolute bottom-3 right-2 flex gap-2">
			{!isOwned ? (
				<Button
					size={"icon"}
					onClick={handleBuy}
					disabled={isBuying}
					className="bg-blue-500 hover:bg-blue-400 hover:scale-105 transition-all 
						opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100"
				>
					<ShoppingCart className="size-5 text-black" />
				</Button>
			) : (
				<Button
					size={"icon"}
					onClick={handlePlay}
					className={`bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
						opacity-0 translate-y-2 group-hover:translate-y-0 ${
							isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
						}`}
				>
					{isCurrentSong && isPlaying ? (
						<Pause className="size-5 text-black" />
					) : (
						<Play className="size-5 text-black" />
					)}
				</Button>
			)}
		</div>
	);
};

export default PlayButton;