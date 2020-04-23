const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("GET /", () => {
      it ("returns 200 OK", async (done) => {
          const response = await request(server).get("/");
          done();
          expect(response.status).toBe(200);
      });
      it("returns json", async (done) => {
          const response = await request(server).get("/");
          done();
          expect(response.type).toMatch(/text\/html/i);
      })
  });  
});