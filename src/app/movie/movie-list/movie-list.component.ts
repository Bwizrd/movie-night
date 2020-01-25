import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { RouterState } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-50px)'}),
          stagger(
            '50ms',
            animate('500ms ease-in',
             style({ opacity: 1, transform: 'translateY(0px)'}),
             ),
          ),
        ], {optional: true},
        ),
        query('leave', [animate('500ms', style({ opacity: 0, transform: 'rotate(90deg)'}))],
        { optional: true })
      ])
    ])
  ]
})
export class MovieListComponent implements OnInit {

  movies$: Observable<Movie[]>;
  // movies = [{
  //   id: 1,
  //   name: "The Terminator",
  //   genre: "Sci-fi",
  //   image: "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY999_CR0,0,672,999_AL_.jpg",
  //   releaseYear: "1984"
  // },
  // {
  //   id: 2,
  //   image: "https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
  //   name: "Terminator 2: Judgement Day",
  //   genre: "Sci-fi",
  //   releaseYear: "1991"
  // }];
  movies = [];
  loadingMovies: Array<number>;

  constructor(private movieService: MovieService, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loadingMovies = new Array(10).fill(0)
    .map((n, index) => index);
    // this.movies$ = this.movieService.getMovies();
    this.movieService.getMoviesFromHttp().subscribe( val => this.movies = val);
    // this.movies$ = this.movieService.getMoviesFromHttp();
    this.navbarService.title.next('MovieNight');
  }

  deleteMovie(id) {
    this.movieService.deleteMovie(id).subscribe(res => console.log('Movie Deleted'));
    // this.movies$ = this.movieService.getMoviesFromHttp();
  }

  deleteMovieFromArray(id) {
    // console.log(id);
    console.log(this.movies);
    const index = this.movies.findIndex(obj => obj.id === id);
    console.log(index);
    this.movies = [
    ...this.movies.slice(0, index),
    ...this.movies.slice(index + 1)
]

    // this.movies.splice(id, 1);
    console.log(this.movies);
    // this.movies = [...this.movies];
  }

  trackByFn(i: number) {
    return i;
  }

}
