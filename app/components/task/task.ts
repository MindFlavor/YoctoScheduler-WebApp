import { EntityWithID } from '../../generics/entity_with_id';

export interface Task {
    ID: number,
    Name: string,
    ConcurrencyLimitGlobal: number,
    ConcurrencyLimitLocal: number,
    Description: string,
    ReenqueueOnDead: boolean,
    Type: string,
    Payload: string
}
