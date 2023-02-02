import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { repeat, delay, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  score: any;
  interval: any;
  endpoint: string = "http://localhost:3000/live-scores/1";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Option #1: Using XHR and setInterval()
    /* this.getScore();
    this.interval = setInterval(() => this.getScore(), 3000); */

    // Option #2: Using XHR and setTimeout()
    /* let xhr: any = new XMLHttpRequest();
    xhr.onload = () => {
      this.score = JSON.parse(xhr.response);
      if (!this.score.completed) {
        this.retry(xhr);
      }
    }
    this.send(xhr); */

    // Option #3: Using Fetch API, Promise and setInterval()
    /* const fetchScore = () => fetch(this.endpoint)
      .then(response => response.json())
      .then(data => {
        this.score = data;
        if (this.score.completed) {
          clearInterval(this.interval);
        }
      });
      fetchScore();
      this.interval = setInterval(() => fetchScore(), 3000); */

    // Option #4: Using rxjs Observable
    /* let observable = new Observable<any>((observer) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = () => {
        observer.next(JSON.parse(xhr.responseText))
        observer.complete();
      };
      xhr.open("GET", this.endpoint);
      xhr.send();
    });
    observable.subscribe((data) => this.score = data);
    observable.pipe(
      delay(3000), 
      repeat(), 
      takeWhile(data => !data.completed)
    ).subscribe((data) => this.score = data); */

    // Option #5: Using HttpClient and Observable
    this.http.get(this.endpoint).subscribe(data => this.score = data);

    this.http.get<any>(this.endpoint).pipe(
      delay(3000),
      repeat(),
      takeWhile(data => !data.completed)
    ).subscribe(data => this.score = data);
  }

  getScore() {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      this.score = JSON.parse(xhr.response);
      if (this.score.completed) {
        clearInterval(this.interval);
      }
    }
    xhr.open("GET", this.endpoint);
    xhr.send();
  }

  retry(xhr: any) {
    setTimeout(() => this.send(xhr), 3000);
  }

  send(xhr: any) {
    xhr.open("GET", this.endpoint);
    xhr.send();
  }
}
