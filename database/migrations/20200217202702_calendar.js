exports.up = function(knex) {
  return knex.schema
    .createTable("phoenixEvent", t => {
      t.increments("event_id");
      t.string("summary", 256).notNullable();
      t.string("location", 256).notNullable();
      t.string("description", 512);
      t.index("start");
      t.index("end");
      t.index("attendees");
    })
    .createTable("start", t => {
      t.increments("start_id");
      t.timestamp("start_dateTime");
      t.timestamp("start_timeZone");
<<<<<<< HEAD

=======
>>>>>>> 69947291420664c47c68957576fce3e71bc81f5a
      t.integer("event_id")
        .unsigned()
        .notNullable()
        .references("event_id")
        .inTable("phoenixEvent")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("end", t => {
      t.increments("end_id");
      t.timestamp("end_dateTime");
      t.timestamp("end_timeZone");
<<<<<<< HEAD

=======
>>>>>>> 69947291420664c47c68957576fce3e71bc81f5a
      t.integer("event_id")
        .unsigned()
        .notNullable()
        .references("event_id")
        .inTable("phoenixEvent")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("attendees", t => {
      t.increments("attendees_id");
<<<<<<< HEAD

      t.email("email");

=======
      t.email("email");
>>>>>>> 69947291420664c47c68957576fce3e71bc81f5a
      t.integer("event_id")
        .unsigned()
        .notNullable()
        .references("event_id")
        .inTable("phoenixEvent")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
<<<<<<< HEAD

=======
>>>>>>> 69947291420664c47c68957576fce3e71bc81f5a
      t.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("attendees")
    .dropTableIfExists("end")
    .dropTableIfExists("start")
    .dropTableIfExists("phoenixEvent");
<<<<<<< HEAD
};
=======
};
>>>>>>> 69947291420664c47c68957576fce3e71bc81f5a
