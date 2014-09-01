'use strict';

var _ = require('lodash');
/*

    ================= WORK IN PROGRESS, BELOW COMMENT FOR REFERENCE ==================

    http://www.bp-msbi.com/2011/10/range-queries-with-azure-datamarket-feeds/

    In OData we can also use other operators, not just = (or eq).
    For ranges these are gt (greater than), ge (greater than or equal to),
    lt (less than) and le (less than or equal to).
    We can also use 'and' and 'or' operators to combine different predicates.

    Things get more complicated if we include the datetime DateKey in the URL. For a single date (e.g. 1900-01-01), we have to use:
    https://api.datamarket.azure.com/Data.ashx/BoyanPenev/DateStream/BasicCalendarEnglish?

    $filter=DateKey = datetime’1900-01-01T00:00:00′

*/

/**
 * SearchUtils constructor
 * @class
 */
function SearchUtils () {
    var _this = this;

    /**
     * All the colors that you can choose from
     * @type {Array}
     * @memberOf SearchUtils
     * @alias SearchUtils.colors
     */
    _this.colors = ['ORANJE', 'ROZE', 'ROOD', 'WIT', 'BLAUW', 'GROEN', 'GEEL', 'GRIJS', 'BRUIN', 'CRÈME', 'PAARS', 'ZWART', 'DIVERSEN', 'NIET GEREGISTREERD', 'N.V.T'];

    /**
     * Available parameters to search with
     * @type {Object}
     * @memberOf SearchUtils
     * @alias SearchUtils.params
     */
    _this.params = {
        'BPM' : {
            type : 'number' // operators ['eq', 'lt', 'le', 'gt', 'ge']
        },
        'Catalogusprijs' : {
            type : 'number'
        },
        'CO2uitstootgecombineerd': {
            type : 'number'
        },
        'Datumaanvangtenaamstelling' : {
            type : 'Date' // eq datetime'2012-04-10T00:00:00'
        },
        'DatumeersteafgifteNederland' : {
            type : 'Date'
        },
        'Datumeerstetoelating' : {
            type : 'Date'
        },
        'Eerstekleur' : {
            type : 'string',
            choises : _this.colors
        },
        'Handelsbenaming' : {
            type : 'string'
        },
        'Hoofdbrandstof' : {
            type : 'string',
            choises : ['BENZINE', 'LNG', 'DIESEL', 'ELEKTRICITEIT', 'LPG', 'CNG', 'WATERSTOF', 'ALCOHOL', 'N.V.T.', 'NIET GEREGISTREERD']
        },
        'Inrichting' : {
            type : 'string'
        },
        'Kenteken' : {
            type : 'string'
        },
        'Merk' : {
            type : 'string'
        },
        'Milieuclassificatie' : {
            type : 'string'
        },
        'Nevenbrandstof' : {
            type : 'string'
        },
        'Retrofitroetfilter' : {
            type : 'string',
            choises : ['Ja', 'Nee']
        },
        'Tweedekleur' : {
            type : 'string',
            choises : _this.colors
        },
        'VervaldatumAPK' : {
            type : 'Date'
        },
        'Voertuigsoort' : {
            type : 'string'
        },
        'Zuinigheidslabel' : {
            type : 'string'
        }
    };

    /**
     * Create a filter object.
     * @memberOf SearchUtils
     * @alias SearchUtils.createFilterString
     * @param  {string[]} filterArray - Array with the filters
     * @return {object} The object containing either an error, or a filterString
     */
    _this.createFilterString = function (filterArray) {

        var returnObj = {};

        for (var i = 0; i < filterArray.length; i++) {
            var searchParams = filterArray[i].split(' '),
                keyWord = searchParams[0],
                operator = searchParams[1],
                value = searchParams[2].replace(/\'/g,''),
                filterKey;

            if (!_.has(_this.params, keyWord)) {
                return {
                    error : 'Parameter \'' + keyWord + '\' is unrecognized'
                };
            }

            filterKey = _this.params[keyWord];
            if (filterKey.choises && !_.contains(filterKey.choises, value.toUpperCase())) {
                return {
                    error : 'Parameter \'' + keyWord + '\' has a unrecognized value: ' + value + ', valid choises are : ' + filterKey.choises
                };
            }

        }
        return {
            filterString : filterArray.join(' and ')
        };
    };

    return _this;
}

module.exports = new SearchUtils();
