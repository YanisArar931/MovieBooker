import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor() {
  }

  async getMovies(page: number = 1): Promise<any> {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    return await fetch(url, 
        {
            method: "GET",
            headers: {
                accept:"application/json", 
                Authorization: `Bearer ${apiKey}`}
            }).then((res) => res.json ()
        ).then((data) => data)
    }

    async searchMovie(query: string, page: number = 1): Promise<any> {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
          throw new Error("API_KEY is missing! Please check your .env file.");
        }
    
        if (!query) {
          throw new Error("Search query is required!");
        }
    
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
          return await response.json();
        } catch (error) {
          console.error("Error searching movie:", error.message);
          throw new Error("Failed to search movie");
        }
      }
      
      async getNowPlayingMovies(page: number = 1): Promise<any> {
        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
        return this.fetchMovies(url);
      }

      
      async getMovieDetails(movieId: number): Promise<any> {
        const apiKey = process.env.API_KEY;
    
        if (!movieId) {
          throw new Error("Movie ID is required");
        }
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
    
          if (response.status === 404) {
            throw new NotFoundException("Film introuvable.");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching movie details:", error.message);
          throw new Error("Failed to fetch movie details");
        }
      }

      async getMovieGenres(): Promise<any> {
        const apiKey = process.env.API_KEY;
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
    
        console.log("Fetching movie genres from:", url);
    
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
    
          const data = await response.json();    
          return data.genres; 
        } catch (error) {
          console.error("Error fetching movie genres:", error.message);
          throw new Error("Failed to fetch movie genres");
        }
      }

      private async fetchMovies(url: string): Promise<any> {
        const apiKey = process.env.API_KEY;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          return {
            page: data.page,
            total_pages: data.total_pages,
            total_results: data.total_results,
            movies: data.results,
          };
        } catch (error) {
          console.error("Error fetching movies:", error.message);
          throw new Error("Failed to fetch movies");
        }
      }
}