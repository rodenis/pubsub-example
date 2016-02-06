/**
 * Created by rodenis on 06.02.16.
 */

var Logger = {};

require('./pubsub')(Logger);

var topics = ['dataChange', 'dataAggregate'];

Logger.connectToBus = function connectToBus() {
    return {
        publishes: [],
        subscribes: topics,
        name: 'logger'
    };
};

function logger(topic) {
    return function (message) {
        console.log(':::', topic, '>', message);
    };
}

topics.forEach(function (topic) {
    Logger.subscribe(topic, logger(topic));
});

module.exports = Logger;