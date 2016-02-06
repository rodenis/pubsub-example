/**
 * Created by rodenis on 06.02.16.
 */
function createDeliveryFunction(message, callbacks) {
    return function deliver() {
        var i, len;

        for (i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i](message);
        }
    }
}

var PubSub = {
    publish: function(topic, message, sync) {
        var callbacks = this.__topics[topic], deliver;

        if (!callbacks) {
            return;
        }

        deliver = createDeliveryFunction(message, callbacks);

        if (sync) {
            deliver();
        } else {
            setTimeout(deliver, 0)
        }
    },

    subscribe: function(topic, callback) {
        var callbacks, index;

        callbacks = this.__topics[topic] = this.__topics[topic] || [];
        callbacks.push(callback);

        index = callbacks.length -1;
        return function fastUnSubscribe() {
            callbacks.splice(index, 1);
        };
    },

    unSubscribe: function(topic, callback) {
        var i, len, callbacks;

        callbacks = this.__topics[topic];
        if (!callbacks) {
            return;
        }

        for (i = 0, len = callbacks.length; i < len; i++) {
            if (callbacks[i] === callback) {
                callbacks.splice(i, 1);
                return;
            }
        }
    }
};

function assign(target) {
    var totalArgs = arguments.length,
        source, i, totalKeys, keys, key, j;

    for (i = 1; i < totalArgs; i++) {
        source = arguments[i];
        keys = Object.keys(source);
        totalKeys = keys.length;

        for (j = 0; j < totalKeys; j++) {
            key = keys[j];
            target[key] = source[key];
        }
    }
    return target;
}

module.exports = function (target) {
    target.__topics = {};
    return assign(target, PubSub);
};