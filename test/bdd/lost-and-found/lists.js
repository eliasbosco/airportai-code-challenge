const { describe, it } = require("mocha");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require('../../../app');
const expect = chai.expect;
const uri = "/api/v1/lost-and-found";
chai.use(chaiHttp);

describe('Lost And Found', () => {
    it('As an agent, list searching by keywords (type, brand, color)', () => {
        return new Promise((done, reject) => {
            chai
                .request(server)
                .get(uri + '?brand=samsung')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'agent')
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(200);

                    const jsonRes = JSON.parse(res.text.trim());
                    if (err !== null) {
                        reject(err);
                    }
                    expect(jsonRes[0]?.name).to.be.equal('Samsung S4');
                    expect(jsonRes[0]?.details).to.be.equal('Colorful cover with a little mark on top right edge');
                    expect(jsonRes[0]?.type).to.be.equal('Phone');
                    expect(jsonRes[0]?.brand).to.be.equal('Samsung');
                    expect(jsonRes[0]?.color).to.be.equal('White');
                    done();
                });
        });
    });

    it(`As an user, search endpoint to use a message instead of keywords (e.g. 'I lost my Samsung S4 phone')`, () => {
        return new Promise((done, reject) => {
            chai
                .request(server)
                .get(uri + '/list-text-search?search=I lost my Samsung S4')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'user')
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(200);

                    const jsonRes = JSON.parse(res.text.trim());
                    if (err !== null) {
                        reject(err);
                    }
                    expect(jsonRes[0]?.name).to.be.equal('Samsung S4');
                    expect(jsonRes[0]?.details).to.be.equal('Colorful cover with a little mark on top right edge');
                    expect(jsonRes[0]?.type).to.be.equal('Phone');
                    expect(jsonRes[0]?.brand).to.be.equal('Samsung');
                    expect(jsonRes[0]?.color).to.be.equal('White');
                    done();
                });
        });
    });

    it('As an agent, list searching by unexisting product', () => {
        return new Promise((done, reject) => {
            chai
                .request(server)
                .get(uri + '?brand=samsungblablabla')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'agent')
                .send()
                .end((_, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    it('Unauthorised request', () => {
        return new Promise((done, reject) => {
            chai
                .request(server)
                .get(uri + '?brand=samsung')
                .set('Content-Type', 'application/json')
                .send()
                .end((_, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
});
