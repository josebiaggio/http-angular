import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) { }

  @ViewChild('dogBreed', {static: false}) dogBreedInput!: ElementRef;
  @ViewChild('notFoundMessage', {static: false}) notFoundMessageDiv!: ElementRef;
  dogBreed: string = ''
  dogBreedFound: string = ''
  dogImages: any = {};
  loading: boolean = false;
  allDogBreeds: any = {}
  theFirstFiveImages: string[] = [];

  ngOnInit () {
    this.loading = false
  }

  checkIfDoBreedExists() {
    this.dogBreed = this.dogBreedInput.nativeElement.value
    this.appService.getAllDogBreeds().subscribe(x => {
      this.allDogBreeds = x
      Object.keys(this.allDogBreeds.message).forEach(key => {
        if(key === this.dogBreed) this.dogBreedFound = this.dogBreed
      })

      if(this.dogBreedFound) this.getDogBreed(this.dogBreed)
      else this.showNotFoundMessage()

    })
  }

  getDogBreed(dogBreed: string) {
    this.loading = true;
    this.appService.getDogBreed(dogBreed).subscribe(x => {
      this.dogImages = x
      console.log(this.dogImages)
      this.getTheFirstFiveImages()
      this.loading = false;
    });
  }

  getTheFirstFiveImages() {
    this.theFirstFiveImages = this.dogImages.message.filter((image: any, index: any) => {
      if(index < 5) return image
    })
  }

  showNotFoundMessage() {
    this.notFoundMessageDiv.nativeElement.style.display = 'flex'
  }

  hideNotFoundMessage() {
    this.notFoundMessageDiv.nativeElement.style.display = 'none'
  }
}
