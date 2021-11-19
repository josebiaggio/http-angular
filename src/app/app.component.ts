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
  dogBreed: string = ''
  dogData: any = {};
  loading: boolean = false;
  theFirstFiveImages: any = [];

  ngOnInit () {
    this.loading = false
  }

  getDogBreed() {
    this.dogBreed = this.dogBreedInput.nativeElement.value
    this.appService.getDogBreed(this.dogBreed)
    this.loading = true;
    this.appService.getDog().subscribe(x => {
      this.dogData = x
      console.log(this.dogData)
      this.getTheFirstFiveImages()
      this.loading = false;
    });
  }

  getTheFirstFiveImages() {
    this.theFirstFiveImages = this.dogData.message.filter((image: any, index: any) => {
      if(index < 5) return image
    })
  }
}
