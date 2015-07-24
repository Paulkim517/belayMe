var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

describe('GET /', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /posts', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/api/posts', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('POST /api/users/current/posts', function() {
  it('should return statusCode 200', function(done) {
    request.post(
      {
        url: baseUrl + '/api/posts',
        form: {
          word: 'AJAX',
          definition: 'Asynchronous JavaScript and XML'
        }
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});

