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
  //   describe('addEvent', () => {
  //     it('should add a new event', async () => {
  //       let event = await Model.addEvent({
  //         summary: 'End of Labs Party',
  //         location: "Emma's House",
  //         description:
  //           'Getting together to celebrate the successful completion of labs',
  //         start_time: '6:00pm',
  //         start_date: 'may 1 2020',
  //         end_time: '10:00PM',
  //         end_date: '2020-05-01',
  //       });
  //       expect(event.summary).toBe('End of Labs Party');
  //     });
  //   });
});
