import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {

  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  listAll(): Promise<any> { // f on homepage
    const options = {
      withCredentials: true // the client will send cookies, because cors doesn't do it automatically
    };
    return this.httpClient.get(`${this.baseUrl}/movies`, options) // /movies is the model from express
      .toPromise();
  }

  getOne(id: string): Promise<any> { //f on detail and update pages
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/movies/${id}`, options)
      .toPromise();
  }

  create(movie): Promise<any> {  // f on create page
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/movies`, movie, options)
      .toPromise();
  }


  update(movie): Promise<any> {  // f on update page
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/movies/${movie._id}`, movie, options)
      .toPromise();
  }

  deletetOne(id: string): Promise<any> {  //f on detail page
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/movies/${id}`, options)
      .toPromise();
  }
}
