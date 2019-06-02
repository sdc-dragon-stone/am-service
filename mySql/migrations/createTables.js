
module.exports.createTables = async function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments('_id').primary();
    table.float('accuracy');
    table.float('communication');
    table.float('cleanliness');
    table.float('location');
    table.float('checkin');
    table.float('value');
    table.float('avgRating');
  }).createTable('sub_reviews', table => {
      table.increments('_id').primary();
      table.string('picture');
      table.string('name');
      table.text('text');
      table.date('date');
      table.integer('review_id').unsigned().references('_id').inTable('reviews');
    });
};
module.exports.dropTables = async function(knex, Promise) {
  return knex.raw('DROP TABLE IF EXISTS sub_reviews;').then(() => {
    return knex.raw('DROP TABLE IF EXISTS reviews;')
  })
};

