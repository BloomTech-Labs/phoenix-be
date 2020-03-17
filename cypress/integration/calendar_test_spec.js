describe("Tests add event", function() {
  it("Adds an event", function() {
    // let eventsLength = events.length
    cy.request("POST", "/api/calendar", {
      description: "A historic reenactment of Bastille Day",
      summary: "Bastille Day 2020",
      location: "The Bastille",
      start_time: "10:00",
      start_date: "07/14/2020",
      end_time: "15:00",
      end_date: "07/14/2020"
    });
    // expect(events)to.equal(eventsLength+1)
  });
});

describe("Tests get events", function() {
  it("Gets events", function() {
    // let eventsLength = events.length
    // get
    // expect(events)
  });
});

describe("Tests register for event", function() {
  it("Registers for event", function() {
    // let registerLength = register.length
    // register
    // expect(events)to.equal(registerLength+1)
  });
});

describe("Tests delete event", function() {
  it("Removes an event", function() {
    // let eventsLength = events.length
    // delete event
    // expect(events)to.equal(eventsLength-1)
  });
});
