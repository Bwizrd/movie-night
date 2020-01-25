import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  constructor(
    private navbarService: NavbarService,
    private movieService: MovieService,
    private router: Router
    ) { }

  movieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    releaseYear: new FormControl('', [Validators.required]),

  });

  ngOnInit() {
    this.navbarService.title.next('Add Movie');
  }

  addMovie() {
    if (this.movieForm.valid) {
      this.movieService.addMovie(this.movieForm.value)
        .subscribe(res => {
          this.movieForm.reset();
          this.router.navigate(["/"]);
        })
    }
  }

}
