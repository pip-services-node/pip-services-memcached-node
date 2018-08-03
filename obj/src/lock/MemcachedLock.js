"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_components_node_2 = require("pip-services-components-node");
class MemcachedLock extends pip_services_components_node_2.Lock {
    constructor() {
        super(...arguments);
        this._connectionResolver = new pip_services_components_node_1.ConnectionResolver();
        this._maxKeySize = 250;
        this._maxExpiration = 2592000;
        this._maxValue = 1048576;
        this._poolSize = 5;
        this._reconnect = 10000;
        this._timeout = 5000;
        this._retries = 5;
        this._failures = 5;
        this._retry = 30000;
        this._remove = false;
        this._idle = 5000;
        this._client = null;
    }
    configure(config) {
        super.configure(config);
        this._connectionResolver.configure(config);
        this._maxKeySize = config.getAsIntegerWithDefault('options.max_key_size', this._maxKeySize);
        this._maxExpiration = config.getAsLongWithDefault('options.max_expiration', this._maxExpiration);
        this._maxValue = config.getAsLongWithDefault('options.max_value', this._maxValue);
        this._poolSize = config.getAsIntegerWithDefault('options.pool_size', this._poolSize);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
        this._retries = config.getAsIntegerWithDefault('options.retries', this._retries);
        this._failures = config.getAsIntegerWithDefault('options.failures', this._failures);
        this._retry = config.getAsIntegerWithDefault('options.retry', this._retry);
        this._remove = config.getAsBooleanWithDefault('options.remove', this._remove);
        this._idle = config.getAsIntegerWithDefault('options.idle', this._idle);
    }
    setReferences(references) {
        this._connectionResolver.setReferences(references);
    }
    isOpen() {
        return this._client;
    }
    open(correlationId, callback) {
        this._connectionResolver.resolveAll(correlationId, (err, connections) => {
            if (err == null && connections.length == 0)
                err = new pip_services_commons_node_2.ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');
            if (err != null) {
                callback(err);
                return;
            }
            let servers = [];
            for (let connection of connections) {
                let host = connection.getHost();
                let port = connection.getPort() || 11211;
                servers.push(host + ':' + port);
            }
            let options = {
                maxKeySize: this._maxKeySize,
                maxExpiration: this._maxExpiration,
                maxValue: this._maxValue,
                poolSize: this._poolSize,
                reconnect: this._reconnect,
                timeout: this._timeout,
                retries: this._retries,
                failures: this._failures,
                retry: this._retry,
                remove: this._remove,
                idle: this._idle
            };
            let Memcached = require('memcached');
            this._client = new Memcached(servers, options);
            if (callback)
                callback(null);
        });
    }
    close(correlationId, callback) {
        this._client = null;
        if (callback)
            callback(null);
    }
    checkOpened(correlationId, callback) {
        if (!this.isOpen()) {
            let err = new pip_services_commons_node_1.InvalidStateException(correlationId, 'NOT_OPENED', 'Connection is not opened');
            callback(err, null);
            return false;
        }
        return true;
    }
    tryAcquireLock(correlationId, key, ttl, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        let lifetimeInSec = ttl / 1000;
        this._client.add(key, 'lock', lifetimeInSec, (err) => {
            if (err && err.message && err.message.indexOf('not stored') >= 0)
                callback(null, false);
            else
                callback(err, err == null);
        });
    }
    releaseLock(correlationId, key, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        this._client.del(key, callback);
    }
}
exports.MemcachedLock = MemcachedLock;
//# sourceMappingURL=MemcachedLock.js.map