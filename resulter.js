/**
 * Created by rodenis on 06.02.16.
 */

var Resulter = {};

require('./pubsub')(Resulter);

Resulter.connectToBus = function connectToBus() {
    return {
        publishes: [],
        subscribes: ['dataAggregate'],
        name: 'resulter'
    };
};

Resulter.subscribe('dataAggregate', function (message) {
    console.log(message);
});

module.exports = Resulter;