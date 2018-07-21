"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ElasticSearchLogger_1 = require("../elasticsearch/ElasticSearchLogger");
const FluentdLogger_1 = require("../fluentd/FluentdLogger");
const MemcachedCache_1 = require("../memcached/MemcachedCache");
const MemcachedLock_1 = require("../memcached/MemcachedLock");
const MqttMessageQueue_1 = require("../mqtt/MqttMessageQueue");
const PrometheusCounters_1 = require("../prometheus/PrometheusCounters");
const PrometheusMetricsService_1 = require("../prometheus/PrometheusMetricsService");
const RedisCache_1 = require("../redis/RedisCache");
const RedisLock_1 = require("../redis/RedisLock");
class DefaultOssFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(DefaultOssFactory.ElasticSearchLoggerDescriptor, ElasticSearchLogger_1.ElasticSearchLogger);
        this.registerAsType(DefaultOssFactory.FluentdLoggerDescriptor, FluentdLogger_1.FluentdLogger);
        this.registerAsType(DefaultOssFactory.MemcachedCacheDescriptor, MemcachedCache_1.MemcachedCache);
        this.registerAsType(DefaultOssFactory.MemcachedLockDescriptor, MemcachedLock_1.MemcachedLock);
        this.registerAsType(DefaultOssFactory.PrometheusCountersDescriptor, PrometheusCounters_1.PrometheusCounters);
        this.registerAsType(DefaultOssFactory.PrometheusMetricsServiceDescriptor, PrometheusMetricsService_1.PrometheusMetricsService);
        this.registerAsType(DefaultOssFactory.RedisCacheDescriptor, RedisCache_1.RedisCache);
        this.registerAsType(DefaultOssFactory.RedisLockDescriptor, RedisLock_1.RedisLock);
        this.register(DefaultOssFactory.MqttQueueDescriptor, (locator) => {
            return new MqttMessageQueue_1.MqttMessageQueue(locator.getName());
        });
    }
}
DefaultOssFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services", "factory", "oss", "default", "1.0");
DefaultOssFactory.ElasticSearchLoggerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "logger", "elasticsearch", "*", "1.0");
DefaultOssFactory.FluentdLoggerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "logger", "fluentd", "*", "1.0");
DefaultOssFactory.MemcachedCacheDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "cache", "memcached", "*", "1.0");
DefaultOssFactory.MemcachedLockDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "lock", "memcached", "*", "1.0");
DefaultOssFactory.MqttQueueDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "message-queue", "mqtt", "*", "1.0");
DefaultOssFactory.PrometheusCountersDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "counters", "prometheus", "*", "1.0");
DefaultOssFactory.PrometheusMetricsServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "metrics-service", "prometheus", "*", "1.0");
DefaultOssFactory.RedisCacheDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "cache", "redis", "*", "1.0");
DefaultOssFactory.RedisLockDescriptor = new pip_services_commons_node_2.Descriptor("pip-services", "lock", "redis", "*", "1.0");
exports.DefaultOssFactory = DefaultOssFactory;
//# sourceMappingURL=DefaultOssFactory.js.map