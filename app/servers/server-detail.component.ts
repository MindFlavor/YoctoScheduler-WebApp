import { Component, Input } from '@angular/core';
import { Server } from './server';

@Component({
    selector: 'server-detail',
    templateUrl: '../html/servers/server-detail.component.html',
})
export class ServerDetailComponent {
    @Input()
    server: Server;

    public classByStatus(status: number): string {
        if (status > 0)
            return "label label-success"
        else if (status < 0)
            return "label label-danger";
    }
}