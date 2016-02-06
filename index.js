/**
 * Created by rodenis on 06.02.16.
 */

var src = require('./source'),
    agg = require('./aggregator'),
    res = require('./resulter'),
    log = require('./logger');

function connect(components) {
    var _components = Object.create(null),
        connections = {
        publishers: Object.create(null),
        subscribers: Object.create(null)
    };

    components.forEach(function (component) {
        var connector = component.connectToBus(),
            name = connector.name;

        if (_components[name]) {
            throw new Error('Duplication in components name: ' + name);
        }

        _components[name] = component;

        connector.publishes.forEach(function (topic) {
            var pubs = connections.publishers[topic] = connections.publishers[topic] || [];
            pubs.push(name);
        });

        connector.subscribes.forEach(function (topic) {
            var subs = connections.subscribers[topic] = connections.subscribers[topic] || [];
            subs.push(name);
        });
    });

    for (var topic in connections.publishers) {
        //noinspection JSUnfilteredForInLoop
        (function (topic, publishers, subscribers) {
            if (!subscribers) return;

            var f = function (message) {
                subscribers.forEach(function (subscriber) {
                    _components[subscriber].publish(topic, message)
                });
            };

            publishers.forEach(function (publisher) {
                _components[publisher].subscribe(topic, f);
            });
        })(topic, connections.publishers[topic], connections.subscribers[topic]);
    }
}

connect([log, src, agg, res]);
src.do();