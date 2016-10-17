import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpModule } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';

import { GenericService } from './generic.service';
import { EntityWithID } from './entity_with_id';

@Component({
    selector: 'dummy',
    templateUrl: '../../html/tasks/tasks.component.html',
})
export abstract class GenericComponent<T extends EntityWithID<K>, K> implements OnInit, OnDestroy {
    Entities: T[];
    polling: Subscription;

    protected BeforeDataRetrieval() { }
    protected AfterDataRetrieval() { }

    constructor(private service: GenericService<T, K>, private pollingInterval: number) {
        console.log('creating GenericComponent with service: ' + this.service + '. pollingInterval == ' + this.pollingInterval);

        if (this.pollingInterval > 0) {
            this.polling = Observable.interval(this.pollingInterval)
                .subscribe(() => {
                    this.getData();
                });
        }
    }

    ngOnInit() {
        this.getData();
    }

    ngOnDestroy() {
        if (this.pollingInterval > 0 && this.polling !== undefined)
            this.polling.unsubscribe();
    }

    protected getData() {
        this.BeforeDataRetrieval();
        this.service.getFromREST()
            .then(r => {
                this.Entities = r;
                this.Entities.map(tsk => console.log(tsk));
                this.AfterDataRetrieval();
            })
            .catch((e) => console.log('Something went wrong: ' + e + '!'));
    }
}
