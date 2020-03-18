describe("Test event calendar CRUD", function() {
  it("Gets events", function() {
    cy.request({
      method: "GET",
      url: "/api/calendar"
    }).then(function(response) {
      expect(response.body).to.exist;
    });
  });

  it("Adds an event", function() {
    cy.request({
      method: "POST",
      url: "/api/calendar",
      body: {
        description: "A historic reenactment of Bastille Day",
        summary: "Bastille Day 2020",
        location: "The Bastille",
        start_time: "10:00",
        start_date: "07/14/2020",
        end_time: "15:00",
        end_date: "07/14/2020"
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      expect(response.body).to.have.property("newEvent");
    });
  });

  it("Deletes an event", function() {
    cy.request({
      method: "DELETE",
      url: `/api/calendar/30`
    }).then(function(response) {
      expect(response.body).to.have.property("deleted");
    });
  });

  it("Registers for an event", function() {
    cy.request({
      method: "POST",
      url: "/api/calendar/user/1/event/21"
    }).then(function(response) {
      expect(response.body).to.have.property("registered");
    });
  });
});
