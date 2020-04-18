import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-site-v2';

  constructor() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}