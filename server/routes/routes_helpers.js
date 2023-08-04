
////////////////////////////////Helpers////////////////////////////////////////


// const addOrder = async(item) => {
//   console.log("Cart in add Order function:", item);

//   // Destructure keys and values into arrays
//   const columns = Object.keys(item); //cart
//   const values = Object.values(item); //array with object
//   const placeholders = []; //will consist of $1, $2, etc

//   // Placeholders for parameterized queries
//   for (let i = 0; i < values.length; i++) {
//     placeholders.push(`$${i + 1}`);
//   }

//   // Query string
//   const qs = `
//       INSERT INTO orders (${columns.join(", ")})
//       VALUES (${placeholders.join(", ")})
//       RETURNING *;
//     `;
//   console.log("Query String: ", qs);
//   return db
//     .query(qs, values)
//     .then((result) => result.rows)
//     .catch((err) => {
//       console.log(err.message);
//       throw err;
//     });

// };