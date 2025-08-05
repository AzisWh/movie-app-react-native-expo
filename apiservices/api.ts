export const tmdb_config = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWM1ZjY4NmZlYTJkMDNlOTE1ZDVhMzkxNzBiYmZkMiIsIm5iZiI6MTcwNDIwODQzMC4xMjUsInN1YiI6IjY1OTQyODJlY2U0ZGRjNmQzODdmMGIxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvdwlKeaPoh3-HawCqfxKPciFLk96yGwbvUnhXcUpjc'
    }
}

export const fetchMovie = async ({query}: {query:string}) => {
    const endpoint = query 
    ? `${tmdb_config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    : `${tmdb_config.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: tmdb_config.headers,
        });
    
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
          }
    
        const data = await response.json();
        return data.results || [];
      } catch (err) {
        console.error("Fetch Movie Error:", err);
        throw err;
      }

    // const response = await fetch(endpoint, {
    //     method: 'GET',
    //     headers: tmdb_config.headers
    // })

    // if (!response.ok) {
    //     const errorText = await response.text();
    //     console.error("TMDB Error:", errorText);
    //     throw new Error(`Failed to fetch movies: ${response.status} - ${response.statusText}`);
    //   }
      

    // const data = await response.json();

    // return data.results;
}

// expor

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWM1ZjY4NmZlYTJkMDNlOTE1ZDVhMzkxNzBiYmZkMiIsIm5iZiI6MTcwNDIwODQzMC4xMjUsInN1YiI6IjY1OTQyODJlY2U0ZGRjNmQzODdmMGIxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvdwlKeaPoh3-HawCqfxKPciFLk96yGwbvUnhXcUpjc'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));