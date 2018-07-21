import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class DefaultMemcachedFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemcachedCacheDescriptor: Descriptor;
    static readonly MemcachedLockDescriptor: Descriptor;
    constructor();
}
