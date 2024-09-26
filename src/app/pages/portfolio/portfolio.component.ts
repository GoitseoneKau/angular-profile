import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  //JS for sliding images
  @Output() nextImage = new EventEmitter<void>();
  @Output() prevImage = new EventEmitter<void>();

  @ViewChild('slide', { static: true })
  slide!: ElementRef;
  renderer!: Renderer2;


constructor(){

}

ngOnInit():void{
 
  this.nextImage.emit();
  this.prevImage.emit();
}


activeSlide = 0;
//Function to slide images or set the acvtive image
setImageSlide(){
  this.slide.nativeElement.querySelectorAll('.image').forEach((slides: any)=>slides.classList.remove("active"));//get all related elements as a list/array and clear the active class
 
  this.slide.nativeElement.querySelectorAll('.image')[this.activeSlide].classList.add("active");//get the specific element that needs to be shown from list and add active class
}

//Function to increase activeSlide and navigate to next image
//untill it reaches last index and change activeSlide to first index, to transition to next first image
nextSlide(){
  this.activeSlide++;
  if(this.activeSlide > this.slide.nativeElement.querySelectorAll('.image').length-1){
      this.activeSlide=0;
  }
}

//Function to decrease activeSlide and navigate to previous image
//untill it reaches first index and change activeSlide to last index, to transition to previous last image
prevSlide(){
  this.activeSlide--;
  if(this.activeSlide < 0){
      this.activeSlide= this.slide.nativeElement.querySelectorAll('.image').length-1;
  }
}

//add onclick event for the right button
//place nextSlide function-N.B must be before setImageSlide function to update the activeSlide vaariable for smooth transition
next(){
  this.nextSlide();
  this.setImageSlide();
}

//add onclick event for the left button
//place prevSlide function-N.B must be before setImageSlide function to update the activeSlide vaariable for smooth transition
previous(){
  this.prevSlide();
  this.setImageSlide();
};




}
