import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.css']
})
export class MovieDetailPageComponent implements OnInit {

  movie: Object;
  idMovie: string;
  user: Object;

  constructor(private authService: AuthService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.activatedRoute.params.subscribe((params) => {
      this.idMovie = params.id;
     // const id = params.id;  // this params.id comes from the app movie/:id
      this.movieService.getOne(this.idMovie)
        .then((data) => {
          setTimeout(() => {
            this.movie = data;
          }, 1500)
        });
    });

  }

  handleDeleteClick() {
  this.movieService.deletetOne(this.idMovie)
  .then(() => {
    this.router.navigate(['/']);
  })
  .catch(err => {
    console.log(err);
  })
  }
 
}
