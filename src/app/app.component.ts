import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Warehouse';
  ngOnInit() {
    console.log('%c Please hire me!❤️ ', 'background: #AA00FF; color: white; display: block;');
  }
}

