'use strict';
var request = require('request'),
    util = require('util'),
    _ = require('lodash'),
    Q = require('Q'),
    searchUtils = require('./searchutils.js');

/**
 * RDWSearch constructor
 * @class
 * @param {string} apiKey - Azure market apiKey (not necessary for this service)
 */
function RDWSearch(apiKey) {
    this.api = {};

    this.api.url = 'https://api.datamarket.azure.com/Data.ashx/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT';
    this.api.plateUrl = 'https://api.datamarket.azure.com/Data.ashx/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT(\'%s\')?$format=json';

    this.api.key = apiKey || null;

    return this;
}

/**
 * Parses a single result, converts them to proper objects based on the output
 * @private
 * @param  {object} data - Single result
 * @return {object} Parsed object
 */
function parseResult(data) {

    var parsed = {},
        floatRegExp = /^[-+]?[0-9]*\.?[0-9]+$/,
        dateRegExp = /(\/Date\()(-?\d+)(\)\/)/,
        dateVal;

    _.each(data, function (value, key) {
        parsed[key] = value;
        if (typeof value === 'string') {
            if (dateRegExp.test(value)) {
                dateVal = parseInt(value.replace(dateRegExp, '$2'), 10);
                parsed[key] = new Date(dateVal);
            } else if (floatRegExp.test(value)) {
                parsed[key] = parseFloat(value);
            } else if (value === "Ja") {
                parsed[key] = true;
            } else if (value === "Nee") {
                parsed[key] = false;
            }
        }
    });

    return parsed;
}

/**
 * Main search method
 * @public
 * @param  {string|string[]} filterParams - The parameters for filtering. This can either be a String, or an Array
 * @returns {Object} - Promise
 */
RDWSearch.prototype.search = function (filterParams) {
    var _this = this,
        deferred = Q.defer(),
        filter = {};

    var uri = _this.api.url;

    if (!filterParams) {
        uri += '?$format=json';
    } else if (typeof filterParams === 'string') {
        uri += '?$filter=';
        uri += filterParams;
        uri += '&$format=json';
    } else if (_.isArray(filterParams)) {

        filter = searchUtils.createFilterString(filterParams);

        if (filter.error) {
            deferred.reject(filter.error);
        } else {
            uri += '?$filter=';
            uri += filter.filterString;
            uri += '&$format=json';
        }

    }

    var options = {
        'method': 'GET',
        'uri': uri
    };

    if (_this.api.key) {
        options.headers = {
            'Authorization': 'Basic ' + new Buffer(this.api.key + ':' + this.api.key).toString('base64')
        };
    }

    if (!filter.error) {
        request(options, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var data = JSON.parse(body);

                if (data.d) {

                    if (data.d.results.length === 0) {
                        deferred.reject([]);
                    } else if (data.d.results.length === 1) {
                        deferred.resolve(parseResult(data.d.results[0]));
                    } else {
                        var results = [];
                        _.each(data.d.results, function (res) {
                            results.push(parseResult(res));
                        });
                        deferred.resolve(results);
                    }
                    deferred.resolve(data.d);

                } else {
                    deferred.reject('data returned, error parsing: ' + JSON.stringify(data, true, 4));
                }

            }
            else if (error) {
                deferred.reject(error);
            }
            else {
                deferred.reject('Response code: ' + response.statusCode + '\nContent: ' + body);
            }
        });
    }


    return deferred.promise;
};

/**
 * searchPlate - Search a dutch license plate in the RDW database
 * @public
 * @param  {string}   plate - The license plate, without dashes. E.g. '1222XX' == '12-22-XX'
 * @param  {Function} callback - Callback function
 * @deprecated
 */
RDWSearch.prototype.searchPlate = function (plate, callback) {

    /*
        This method will become deprecated, leaving it in for now
    */

    var _this = this;

    if (!callback || !plate) {
        throw new Error('No callback or plate provided');
    }

    if (typeof plate !== 'string' || plate.length !== 6) {
        throw new Error('Parameter plate needs to be a string of 6 characters');
    }

    plate = plate.toUpperCase();

    _this
        .search('Kenteken eq \'' + plate + '\'')
        .then(function (data) {
            callback(null, data);
        })
        .fail(function (error) {
            callback(error);
        });

};

/**
 * searchPlateDeferred - Searches a dutch license plate, Promise style.
 * @public
 * @param  {string} plate
 * @return {object}
 */
RDWSearch.prototype.searchPlateDeferred = function (plate) {
    var _this = this;
    return _this.search('Kenteken eq \'' + plate + '\'');
};

module.exports = RDWSearch;
