
import { trigger, state, style, transition, animate } from '@angular/animations';
import {  ApplicationRef, Component, OnInit, signal } from '@angular/core';
import { first } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  animations:  [
    trigger('openClose', [
      transition('* => closed', [animate('5s')]),
      transition('* => open', [animate('5s')]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  ProfessionText = signal("DEVELOPER") //Text that is currently displayed
  professionRoots:string[] = ["DEVELOPER","DESIGNER"]      // Array of texts to type and delete
  textIndex: number = 0             // Current text in the array

  app:ApplicationRef; //initialize Application reference
  charIndex: any;
  
    constructor(appRef : ApplicationRef){//inject Apllication Reference
        this.app = appRef
    }
      
    ngOnInit():void{
      this.app.isStable.pipe(
          first((isStable) => isStable))
        .subscribe(() => { this.startTyping(); });
    }

    startTyping() {
      const currentString = this.professionRoots[this.textIndex];
  
      if (this.charIndex < currentString.length) {
        this.ProfessionText.update(value=>value += currentString[this.charIndex]);
        this.charIndex++;
        setTimeout(() => this.startTyping(), 200); // Typing speed
      } else {
        setTimeout(() => this.deleteText(), 1500); // Pause before deleting
      }
    }
  
    deleteText() {
      if (this.ProfessionText().length > 0) {
        this.ProfessionText.set( this.ProfessionText().slice(0, -1));
        setTimeout(() => this.deleteText(), 100); // Deleting speed
      } else {
        // Move to the next text
        this.textIndex = (this.textIndex + 1) % this.professionRoots.length;
        this.charIndex = 0;
        setTimeout(() => this.startTyping(), 500); // Pause before typing again
      }
    }


scrollTo(element:HTMLElement){
  element.scrollIntoView({ behavior: "smooth",  inline: "nearest" })
}

}
