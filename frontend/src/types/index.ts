// Represents a song in the system
export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

// Represents an album, which contains multiple songs
export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
}

// Represents statistics related to the music database
export interface Stats{
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;

}

// Represents a message exchanged between users
export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    }

    // Represents a user in the system
export interface User {
    _id: string;
    clerkId: string;
    fullName: string;
    imageUrl: string;
}