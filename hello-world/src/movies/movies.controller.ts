import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des films' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (par défaut 1)' })
  async getMovies(@Query('page') page: number) {
    const pageNumber = Number(page) || 1;
    return this.moviesService.getMovies(pageNumber);
  }

  @Get('search/movie')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Rechercher un film par titre' })
  @ApiQuery({ name: 'query', required: true, type: String, description: 'Titre du film à rechercher' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (par défaut 1)' })
  async searchMovie(@Query('query') query: string, @Query('page') page: string) {
    if (!query) {
      return { error: "Le paramètre 'query' est obligatoire" };
    }
    const pageNumber = parseInt(page, 10) || 1;
    return this.moviesService.searchMovie(query, pageNumber);
  }

  @Get('movie/now_playing')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer les films actuellement en salle' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (par défaut 1)' })
  async getNowPlaying(@Query('page') page: string) {
    const pageNumber = parseInt(page, 10) || 1;
    return this.moviesService.getNowPlayingMovies(pageNumber);
  }

  @Get('movie/:movie_id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtenir les détails d’un film spécifique' })
  @ApiParam({ name: 'movie_id', required: true, type: Number, description: 'ID du film à récupérer' })
  async getMovieDetails(@Param('movie_id') movieId: string) {
    const movieIdNumber = parseInt(movieId, 10);
    if (isNaN(movieIdNumber)) {
      return { error: "Invalid movie ID!" };
    }
    return this.moviesService.getMovieDetails(movieIdNumber);
  }
  
  @Get('genre/movie/list')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtenir la liste des genres de films' })
  async getMovieGenres() {
    return this.moviesService.getMovieGenres();
  }
}
