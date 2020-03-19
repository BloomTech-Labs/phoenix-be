describe("Test user CRUD", function() {
  //post (add user)

  it("Registers a user", function() {
    cy.request({
      method: "POST",
      url: "/auth/register",
      body: {
        username: "GuyFawkes",
        name: "Guy Fawkes",
        email: "guy@idea.com",
        password: "nov05",
        age: 450
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      expect(response.body).to.have.property("id");
    });
  });
  var token;
  //login
  it("Logs in user", function() {
    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        username: "GuyFawkes",
        password: "nov05"
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      expect(response.body).to.have.property("token");
      token = response.body.token;
    });
  });
  //get users
  it("Gets users", function() {
    cy.request({
      method: "GET",
      url: "/api/users",
      headers: {
        Authorization: token
      }
    }).then(function(response) {
      expect(response.body).to.exist;
    });
  });
  //get user by key
  //get user by id

  //put (update user)
  //delete user
});
