import { Component } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
action :string = "https://formspree.io/f/xkndkvgg"


}
