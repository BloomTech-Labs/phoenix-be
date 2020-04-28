const request = require('supertest');
const server = require('../../server.js');
const Model = require('./calendar-model.js');
const db = require('../../database/config.js');

describe('calendar testing', () => {
  describe('GET /', () => {
    it('returns 200 OK', async (done) => {
      const response = await request(server).get('/api/calendar');
      done();
      expect(response.status).toBe(200);
    });
  });
});
