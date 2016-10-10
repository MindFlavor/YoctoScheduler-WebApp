import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { AppComponent }                     from './app.component';
import { routing, routedComponents }        from './app.routing';
import { ServerDetailComponent } from './servers/server-detail.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, routedComponents, ServerDetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }