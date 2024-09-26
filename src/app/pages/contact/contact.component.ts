import { Component, OnInit, ViewChild} from '@angular/core';
import { FormsModule,NgForm,NgModel,ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  //form processing api
  url: string = 'https://formspree.io/f/xkndkvgg';
  
//get form element
  @ViewChild('myForm')
  myForm!: NgForm;
//data model object
  data = {
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  };
clientMessage:string=""
  isFormValid: boolean = false;

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  // Method to handle form submission
  onSubmit(form:NgForm) {
    if (form.control.valid) {
      const formData = form.control.value;

      // Send the form data to the API
      this.http.post(this.url, formData).subscribe({
        next: (response) => {
          this.clientMessage ="Thank You, You'll be contacted shortly";
        },
        error: (error) => {
          this.clientMessage="Oops, Seems the message did'nt get sent.\n\n Please try again ";
        },
      });
    } else {
      this.clientMessage='Looks like not everything you put in is valid ';
    }
  }

  Validate(e: Event, input: NgModel): void {
    console.log(input.control.valid, e);
  }
}
