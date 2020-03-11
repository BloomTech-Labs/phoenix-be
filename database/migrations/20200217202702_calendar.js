exports.up = function(knex) {
  return knex.schema
    .createTable("phoenixEvent", t => {
      t.increments("event_id");
      t.string("summary", 256).notNullable();
      t.string("location", 256).notNullable();
      t.string("description", 512);
      t.time("start_time");
      t.date("start_date");
      t.time("end_time");
      t.date("end_date");
    })

    .createTable("attendees", t => {
      t.integer("event_id")
        .references("event_id")
        .inTable("phoenixEvent")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      t.integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      t.primary(["event_id", "user_id"]);
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("attendees")
    .dropTableIfExists("phoenixEvent");
};
