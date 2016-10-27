import { EntityWithID } from '../entities/entity_with_id';

export interface GenericService<T extends EntityWithID<K>, K> {
    getFromREST(): Promise<T[]>;
    get(id: K): Promise<T>;
    save(t: T): Promise<T>;
    insertLocal(t: T) : void;
} 