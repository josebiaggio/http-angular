import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) { }

  url: string = 'https://dog.ceo/api/breeds/list/all'
  dogUrl: string = ''

  getAllDogBreeds() {
    return this.http.get(this.url)
  }

  getDogBreed(dogBreed: string) {
    this.dogUrl = `https://dog.ceo/api/breed/${dogBreed}/images`;
    return this.http.get(this.dogUrl).pipe(
      catchError((x) => {
        console.log(x)
        throw 'Deu erro'
      })
    );
  }
}
