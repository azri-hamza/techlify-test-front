import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test - Techlify';
  constructor(private meta: Meta){
    this.meta.addTag({ httpEquiv: 'Content-Security-Policy' , content: 'upgrade-insecure-requests' });
  }
}
