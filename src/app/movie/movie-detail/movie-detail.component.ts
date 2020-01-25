import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/navbar/navbar.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  id: number;
  movie: Movie;
  movieSub$: Subscription; // set up a Subscription instead of using an async pipe in the template

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private navbarService: NavbarService
    ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    /**
     * Call this.MovieService.movie with the id from the service and subscribe to it,
     * every time a movie is received set it to this.move
     */
    this.movieSub$ = this.movieService.movieFromHttp(this.id).subscribe(movie => {
      this.movie = movie;
      this.navbarService.title.next(movie.name);
    });
  }

  /**
   * Because we are using a Subscription in the component it needs to be unsubscribed
   * when the component is closed to avoid memory leaks.
   */
  ngOnDestroy(): void{
    this.movieSub$.unsubscribe();
  }

}
