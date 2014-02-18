var request = require("request"),
    _ = require('underscore'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser({
        "trim" : true,
        "explicitRoot" : false
    });

/**
 * RDWSearch constructor
 * @param {[string]} apiKey - Azure market apiKey (not necessary for this service)
 */
function RDWSearch(apiKey) {
    this.api = {};
    this.api.url = "https://api.datamarket.azure.com/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT";
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
        throw new Error("No callback or plate provided");
    }

    if (typeof plate !== "string" || plate.length !== 6) {
        throw new Error("Parameter plate needs to be a string of 6 characters");
    }

    plate = plate.toUpperCase();

    var options = {
        'method': 'GET',
        'uri': this.api.url + "?$filter=Kenteken eq '" + plate + "'"
    };

    if (this.api.key) {
        options.headers = {
            'Authorization': 'Basic ' + new Buffer(this.api.key + ':' + this.api.key).toString('base64')
        };
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            parser.parseString(body, function (err, data) {
                if (err) {
                    callback("Error in parsing XML: " + err);
                    return false;
                }

                if (data['entry']) {
                    var rawData = data['entry'][0]['content'][0]['m:properties'][0],
                        vehicleProperties = {};
                    if (rawData) {
                        _.each(rawData, function (value, key) {
                            var val = value[0],
                                newKey = key.slice(2), // remove "d:" from key
                                type = null;

                            if (typeof value[0] === 'object') {
                                if (val["_"]) {
                                    type = val["$"]["m:type"].slice(4);
                                    if (type.indexOf("Int") === 0) {
                                        val = parseInt(val["_"]);
                                    } else if (type === "Decimal") {
                                        val = parseFloat(val["_"]);
                                    } else if (type === "DateTime") {
                                        val = new Date(val["_"]);
                                    } else {
                                        val = val["_"];
                                    }
                                } else {
                                    val = null;
                                }

                            }

                            vehicleProperties[newKey] = val; 
                        });

                        callback(null, vehicleProperties);
                    } else {
                        callback('Problem parsing vehicle properties');
                    }              
                } else {
                    callback(null, null);
                }            
            });      
        }
        else if (error) {
            console.log("error: " + error);
            callback('error, check console log');
        }
        else {
            console.log("Response code: " + response.statusCode + "\nContent: " + body);
            callback('error, check console log');
        }
    });

};

module.exports = RDWSearch;