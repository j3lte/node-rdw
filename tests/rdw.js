var expect = require('chai').expect,
    nock = require('nock'),
    RDW = require('../lib/rdw');

describe('Create', function () {
    var rdw = new RDW();

    it('Create new RDWSearch', function () {
        expect(typeof rdw).to.equal('object');
    });

    it('Has search method', function () {
        expect(typeof rdw.search).to.equal('function');
    });

    it('Has a searchPlateDeferred method', function () {
        expect(typeof rdw.searchPlateDeferred).to.equal('function');
    });
});

describe('Search', function () {
    var rdw = new RDW();

    it('Do a blank search', function (done) {
        // use nock
        nock('https://api.datamarket.azure.com')
            .get('/Data.ashx/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT?$format=json')
            .replyWithFile(200, __dirname + '/replies/multiple.json');

        rdw
            .search()
            .then(function (data) {
                expect(typeof data).to.equal('object');
                expect(data.length).to.equal(3);
                done();
            });
    });

    nock.cleanAll();

})
