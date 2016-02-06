/**
 * Created by rodenis on 06.02.16.
 */

var Aggregator = {};

require('./pubsub')(Aggregator);

Aggregator.connectToBus = function connectToBus() {
    return {
        publishes: ['dataAggregate'],
        subscribes: ['dataChange'],
        name: 'aggregator'
    };
};

Aggregator.subscribe('dataChange', function (data) {
    var result = data.foo + data.bar,
        message = 'Your result is ' + result;

    setTimeout(function () {
        Aggregator.publish('dataAggregate', message);
    }, 2000);
});

module.exports = Aggregator;