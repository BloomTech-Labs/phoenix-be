describe('Test user CRUD', function() {
  //post (add user)
  var userId;
  it('Registers a user', function() {
    cy.request({
      method: 'POST',
      url: '/auth/register',
      body: {
        username: 'JPMarat',
        name: 'Jean Paul',
        email: 'jp@marat.com',
        password: 'revolution',
        age: 277
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response) {
      expect(response.body).to.have.property('id');
      console.log(`res body ${response.body}`);
      userId = response.body.id[0].id;
    });
  });
  var token;
  //login
  it('Logs in user', function() {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: {
        username: 'JPMarat',
        password: 'revolution'
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response) {
      expect(response.body).to.have.property('token');
      token = response.body.token;
    });
  });
  //get users
  it('Gets users', function() {
    cy.request({
      method: 'GET',
      url: '/api/users',
      headers: {
        Authorization: token
      }
    }).then(function(response) {
      expect(response.body).to.exist;
    });
  });
  //get user by id
  it('Gets users by id', function() {
    cy.request({
      method: 'GET',
      url: '/api/users/1',
      headers: {
        Authorization: token
      }
    }).then(function(response) {
      expect(response.body).to.have.property('name');
    });
  });

  //get user by key
  it('Gets users by key', function() {
    cy.request({
      method: 'GET',
      url: '/api/users/key',
      body: {
        name: 'Nick'
      },
      headers: {
        Authorization: token,
        'content-type': 'application/json'
      }
    }).then(function(response) {
      expect(response.body).to.exist;
    });
  });
  //put (update user)
  it('Updates user info', function() {
    cy.request({
      method: 'PUT',
      url: `/api/users/${userId}`,
      body: {
        name: 'Jean-Paul'
      },
      headers: {
        Authorization: token,
        'content-type': 'application/json'
      }
    });
  });
  //delete user
  it('Deletes a user', function() {
    cy.request({
      method: 'DELETE',
      url: `/api/users/${userId}`,
      headers: {
        Authorization: token
      }
    }).then(function(response) {
      expect(response.body).to.exist;
    });
  });
});
