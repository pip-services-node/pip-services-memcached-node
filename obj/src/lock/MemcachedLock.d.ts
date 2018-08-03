import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { Lock } from 'pip-services-components-node';
export declare class MemcachedLock extends Lock implements IConfigurable, IReferenceable, IOpenable {
    private _connectionResolver;
    private _maxKeySize;
    private _maxExpiration;
    private _maxValue;
    private _poolSize;
    private _reconnect;
    private _timeout;
    private _retries;
    private _failures;
    private _retry;
    private _remove;
    private _idle;
    private _client;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpen(): boolean;
    open(correlationId: string, callback: (err: any) => void): void;
    close(correlationId: string, callback: (err: any) => void): void;
    private checkOpened;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
