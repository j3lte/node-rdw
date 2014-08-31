'use strict';
var request = require('request'),
    util = require('util'),
    _ = require('underscore'),
    Q = require('Q');

/**
 * RDWSearch constructor
 * @param {[string]} apiKey - Azure market apiKey (not necessary for this service)
 */
function RDWSearch(apiKey) {
    this.api = {};
    this.api.url = 'https://api.datamarket.azure.com/Data.ashx/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT(\'%s\')?$format=json';
    this.api.key = apiKey || null;

    return this;
}

/**
 * searchPlate - Search a dutch license plate in the RDW database
 * @param  {[string]}   plate       [The license plate, without dashes. E.g. '1222XX' == '12-22-XX']
 * @param  {Function} callback      [Callback function]
 */
RDWSearch.prototype.searchPlate = function (plate, callback) {

    if (!callback || !plate) {
        throw new Error('No callback or plate provided');
    }

    if (typeof plate !== 'string' || plate.length !== 6) {
        throw new Error('Parameter plate needs to be a string of 6 characters');
    }

    plate = plate.toUpperCase();

    var options = {
        'method': 'GET',
        'uri': util.format(this.api.url, plate)
    };

    if (this.api.key) {
        options.headers = {
            'Authorization': 'Basic ' + new Buffer(this.api.key + ':' + this.api.key).toString('base64')
        };
    }

    request(options, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body),
                parsedData = {},
                floatRegExp = /^[-+]?[0-9]*\.?[0-9]+$/,
                dateRegExp = /(\/Date\()(\d+)(\)\/)/,
                dateVal;

            if (data.d) {
                _.each(data.d, function (value, key) {
                    parsedData[key] = value;
                    if (typeof value === 'string') {
                        if (dateRegExp.test(value)) {
                            dateVal = parseInt(value.replace(dateRegExp, '$2'), 10);
                            parsedData[key] = new Date(dateVal);
                        } else if (floatRegExp.test(value)) {
                            parsedData[key] = parseFloat(value);
                        }
                    }
                });
                callback(null, parsedData);
            } else {
                callback('data returned, error parsing: ' + JSON.stringify(data, true, 4));
            }

        }
        else if (error) {
            console.log('error: ' + error);
            callback('error, check console log');
        }
        else {
            console.log('Response code: ' + response.statusCode + '\nContent: ' + body);
            callback('error, check console log');
        }
    });

};

RDWSearch.prototype.searchPlateDeferred = function (plate) {
    var _this = this,
        deferred = Q.defer();

    _this.searchPlate(plate, function (err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;
};

module.exports = RDWSearch;
