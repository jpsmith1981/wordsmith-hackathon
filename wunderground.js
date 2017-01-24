/**
 * Created by scottbrenton on 1/24/17.
 */
var Wunderground = require("node-weatherunderground");

function WunderApi() {
    this._apikey = "c6f4ef5f6e50920c";
    this._api = new Wunderground(this._apikey);
}

WunderApi.prototype.getWeatherConditions = function( city, state, callback ) {

    var opts = {'city': city, 'state': state};

    this._api.forecast(opts, function(err, data) {

        if (err) throw err;
        else {
            var weather = [{
                    conditions:data['simpleforecast']['forecastday'][0]['conditions'],
                    high: data['simpleforecast']['forecastday'][0]['high']['fahrenheit'],
                    low: data['simpleforecast']['forecastday'][0]['low']['fahrenheit']},{
                    conditions:data['simpleforecast']['forecastday'][1]['conditions'],
                    high: data['simpleforecast']['forecastday'][1]['high']['fahrenheit'],
                    low: data['simpleforecast']['forecastday'][1]['low']['fahrenheit']},{
                    conditions:data['simpleforecast']['forecastday'][2]['conditions'],
                    high: data['simpleforecast']['forecastday'][2]['high']['fahrenheit'],
                    low: data['simpleforecast']['forecastday'][2]['low']['fahrenheit']
                }];

            callback(weather);
        }

    });
}

var sut = new WunderApi();
var data = sut.getWeatherConditions("San Diego", "CA", console.log);