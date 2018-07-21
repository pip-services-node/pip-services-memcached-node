import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class DefaultOssFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly ElasticSearchLoggerDescriptor: Descriptor;
    static readonly FluentdLoggerDescriptor: Descriptor;
    static readonly MemcachedCacheDescriptor: Descriptor;
    static readonly MemcachedLockDescriptor: Descriptor;
    static readonly MqttQueueDescriptor: Descriptor;
    static readonly PrometheusCountersDescriptor: Descriptor;
    static readonly PrometheusMetricsServiceDescriptor: Descriptor;
    static readonly RedisCacheDescriptor: Descriptor;
    static readonly RedisLockDescriptor: Descriptor;
    constructor();
}
