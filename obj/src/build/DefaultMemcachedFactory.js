"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const MemcachedCache_1 = require("../cache/MemcachedCache");
const MemcachedLock_1 = require("../lock/MemcachedLock");
class DefaultMemcachedFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(DefaultMemcachedFactory.MemcachedCacheDescriptor, MemcachedCache_1.MemcachedCache);
        this.registerAsType(DefaultMemcachedFactory.MemcachedLockDescriptor, MemcachedLock_1.MemcachedLock);
    }
}
DefaultMemcachedFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "memcached", "default", "1.0");
DefaultMemcachedFactory.MemcachedCacheDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "cache", "memcached", "*", "1.0");
DefaultMemcachedFactory.MemcachedLockDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "lock", "memcached", "*", "1.0");
exports.DefaultMemcachedFactory = DefaultMemcachedFactory;
//# sourceMappingURL=DefaultMemcachedFactory.js.map