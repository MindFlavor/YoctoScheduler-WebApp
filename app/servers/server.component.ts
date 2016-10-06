import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericHTTPService } from '../generic_http.service';
import { HttpModule } from '@angular/http';

import {Observable, Subscription } from 'rxjs/Rx';

import { Server } from './server';
import { ServerService } from './server.service';

import { GenericComponent } from '../generic.component';

@Component({
    selector: 'yocto-servers',
    templateUrl: '../html/servers/server.component.html',
    providers: [ServerService]
})
export class ServerComponent extends GenericComponent<Server, number> {
    constructor(private serverService: ServerService) {
        super(serverService, 0);
     }
}
// export class ServerComponent  {
//     constructor() {
//         console.log('prova');
//     }
// }