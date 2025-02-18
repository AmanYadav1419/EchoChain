import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";


const AlbumsTabContent = () => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50'>
			<CardHeader>
				<div className='flex items-center justify-between'>

          {/* Section title and description */}
					<div>
						<CardTitle className='flex items-center gap-2'>
							<Library className='h-5 w-5 text-violet-500' />
							Albums Library
						</CardTitle>
						<CardDescription>Manage your album collection</CardDescription>
					</div>
          {/* Button to open the "Add Album" dialog */}
          <AddAlbumDialog />
				</div>
			</CardHeader>
    
    
	    {/* Card content displaying the list of albums */}
			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
	);
};
export default AlbumsTabContent;
