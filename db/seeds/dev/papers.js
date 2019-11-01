exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("footnotes")
    .del()
    .then(knex("papers").del())
    .then(() => {
      // Inserts seed entries
      return (
        knex("papers")
          // Return id after insertion -> [1]
          .insert(
            { title: "Fooo", author: "Bob", publisher: "Minnesota" },
            "id"
          )
          .then(paper => {
            console.log(paper);
            return knex("footnotes")
              .insert([
                { note: "Lorem", paper_id: paper[0] },
                { note: "Dolor", paper_id: paper[0] }
              ])
              .then(() => console.log("Seeding Complete!"))
              .catch(error => console.log(`Error seeding data: ${error}`));
          })
      );
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
