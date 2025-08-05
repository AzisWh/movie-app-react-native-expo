import { Client, Databases, ID, Query } from "appwrite";
// track user search queries

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1') 
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try{
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query), 
        ])
        
        // check if record of search has already been store
        if(result.documents.length > 0) {
            const existMovie = result.documents[0];
            await databases.updateDocument(
                DATABASE_ID, COLLECTION_ID, existMovie.$id,{
                    count: (existMovie.count || 0) + 1,
                }
            )
        }else{
            await databases.createDocument(
                DATABASE_ID, COLLECTION_ID, ID.unique(), {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` ,
                }
            )
        }
        // console.log("appwrite : "+ result);
    }catch(error){
        console.log(error);
        throw error;
    }
    // if document not found, create a new one in appwrite database -> count 1
}

export const getTrendingMovies = async ():Promise<TrendingMovie[] |undefined> => {
    try{
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'), 
        ])
        return result.documents as unknown as TrendingMovie[];
    }catch(error){
        console.error("Error fetching trending movies:", error);
        return undefined;
    }
}