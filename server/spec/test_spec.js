var request = require("request");

describe("Hello World Server", function() {
  describe("GET /", function() {

    it("returns status code 200", function(done) {
      request.get("http://localhost:4000/api/generator", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns Hello World array", function(done) {
      request.get("http://localhost:3000?number=3", function(error, response, body) {
        expect(body).toBe(JSON.stringify(["Hello World", "Hello World", "Hello World"]));
        done();
      });
    });
  });
});