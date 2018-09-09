import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @Input() feedbackEnabled: boolean;
  @Input() error: string;
  @Input() processing: boolean;
  @Input() movie: any;

  @Output() submitdata: EventEmitter<any> = new EventEmitter();

  constructor(private movieService: MovieService, private router: Router) {
    this.movie = {};
  }

  ngOnInit() {
  }

  submitForm(form) { // validation of the form
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.submitdata.emit(this.movie);
      // yo page, there was a submit action!
    }
  }
}
