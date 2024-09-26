import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { trigger, transition, animate } from '@angular/animations';




@Component({
  selector: 'app-root',
  standalone: true,
  animations:  [
    trigger('openClose', [
      transition('* => closed', [animate('5s')]),
      transition('* => open', [animate('5s')]),
    ]),
  ],
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-profile';
}
