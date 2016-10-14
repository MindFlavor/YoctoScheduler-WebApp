import { Component } from '@angular/core';
@Component({
  selector: 'sample-comp',
  template: 
    `<h1>Sample</h1>
    <h2>{{testo}}</h2>
    <input [(ngModel)]="testo" placeholder="test me!">
    <button (click)="testme()">Test!</button>
    `
})
export class SampleComponent { 
    public testo: string;    

    public testme() {
      console.log(this.testo);
    }
}