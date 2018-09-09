import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  movies: Array<any>;
  user: Object;

  constructor(private authService: AuthService, private movieService: MovieService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.movieService.listAll()
      .then((data) => {
        this.movies = data;
      });
  }

}
