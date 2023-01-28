import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { repeat, delay, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  score: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Option #1: Using setInterval()
    /*var self = this;
    this.getScore(self);
    setInterval(() => this.getScore(self), 3000);*/

    // Option #2: Using setTimeout()
    /*let xhr: any = new XMLHttpRequest();
    xhr.onload = () => {
      this.score = JSON.parse(xhr.response);
      this.retry(xhr);
    }
    this.send(xhr);*/

    // Option #3: Using rxjs Observable
    this.http.get("http://localhost:3000/live-scores/1").subscribe(data => this.score = data);

    this.http.get<any>("http://localhost:3000/live-scores/1").pipe(
      delay(3000),
      repeat(),
      takeWhile(data => !data.completed)
    ).subscribe(data => this.score = data);
  }

  // Uncomment for Option #1
  /*getScore(component: any) {
    console.log(this.score);
    let xhr = new XMLHttpRequest();
    xhr.onload = () => component.score = JSON.parse(xhr.response);
    xhr.open("GET", "http://localhost:3000/live-scores/1");
    xhr.send();
  }*/

  /* Uncomment for Option #2
  retry(xhr: any) {
    setTimeout(() => this.send(xhr), 3000);
  }*/

  /* Uncomment for Option #2
  send(xhr: any) {
    console.log("send()");
    xhr.open("GET", "http://localhost:3000/live-scores/1");
    xhr.send();
  }*/
}
