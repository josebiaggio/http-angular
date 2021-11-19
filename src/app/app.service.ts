import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) { }

  dogUrl: string = ''

  getDogBreed(dogBreed: string) {
    this.dogUrl = `https://dog.ceo/api/breed/${dogBreed}/images`;
  }

  getDog() {
    return this.http.get(this.dogUrl).pipe(
      catchError((x) => {
        console.log(x)
        throw 'Deu erro'
      })
    );
  }
}
