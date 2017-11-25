const chai = require('chai');
const expect = chai.expect;

//sample tests
describe('chai.expect', () => {
  it('should work', function() {
    expect(10).to.be.a('number');
    expect('hello').to.be.a('string');
    expect(true).to.be.a('boolean');
  });
});
