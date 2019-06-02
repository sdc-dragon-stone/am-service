const { createTables, dropTables } = require("../migrations/createTables.js");
const runScript = require("./csvScript.js").runScript;
const knex = require("./db.js").knex;

async function seed_script(total, count, batch, stop) {
  await dropTables(knex)
    .then(() => console.log("Dropped tables"))
    .catch(err => {
      console.log(err);
    });
  await createTables(knex)
    .then(() => console.log("Created tables"))
    .catch(err => {
      console.log(err);
    });
  await runScript(total, count, batch, stop);
}
seed_script(10000000, 1, 150000, false);

//loading time might be mainly depending on generating the dummyData, because the query is really fast.
//batchSize 25K for 1M is 3.65 M
//batchSize 40K for 1M is 3.45 M <just notice bad math skill>
//batchSize 60K for 1M is 3.66 M <just notice bad math skill>
//batchSize 50K for 1M is 3.39 M
//batchSize 100K for 1M is 3.51 M
//batchSize 100K for 10M is 54.17 M
//batchSize 150K for 10M is 45.70 M