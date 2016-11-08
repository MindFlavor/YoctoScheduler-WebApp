import { EntityWithID } from '../entities/entity_with_id';

export interface BaseService<T> {
    getFromREST(): Promise<T[]>; 
}

export interface GenericService<T extends EntityWithID<K>, K> extends BaseService<T> {
    get(id: K): Promise<T>;
    save(t: T): Promise<T>;
    insertLocal(t: T) : void;
} 