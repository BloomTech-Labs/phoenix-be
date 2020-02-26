
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('username', 255)
            .notNullable()
            .unique()

        users
            .string('password', 255)
            .notNullable()
        
        users
            .string('name', 255)
            .notNullable()

        users
            .string('email', 180)
            .notNullable()
        
        users
            .integer('age')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
