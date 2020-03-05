var pg = require('pg');

var conString = process.env.DB_URL
var client = new pg.Client(conString);
client.connect(function(err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        client.end();
    });
});