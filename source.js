/**
 * Created by rodenis on 06.02.16.
 */

var Source = {};

require('./pubsub')(Source);

Source.connectToBus = function connectToBus() {
    return {
        publishes: ['dataChange'],
        subscribes: [],
        name: 'source'
    };
};

Source.do = function () {
    this.publish('dataChange', {
        foo: 1,
        bar: 2
    });
};

module.exports = Source;