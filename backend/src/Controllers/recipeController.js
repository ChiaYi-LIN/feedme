// import { Client } from "pg";
import { pool } from "../Clients/pool";
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

// recipe query
const qeuryByID = async (req, res) => {
  // const client = new Client(conString);

  const id = req.query;
  const query = 'SELECT * FROM "Recipes" JOIN "Users" ON "Recipes".userID = "Users".id WHERE id = $1';
  const values = [parseInt(id)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const qeuryByName = async (req, res) => {
  // const client = new Client(conString);

  const title = req.query;
  const query = 'SELECT * FROM "Recipes" JOIN "Users" ON "Recipes".userID = "Users".id WHERE title = $1';
  const values = [title.toString()];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const queryByLabel = async (req, res) => {
  // const client = new Client(conString);

  const label = req.query;
  const query = 'SELECT * FROM "Recipes" JOIN "Users" ON "Recipes".userID = "Users".id WHERE $1 = ANY(labels)';
  const values = [parseInt(label)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const queryTopLikeCount = async (req, res) => {
  // const client = new Client(conString);

  const page = req.query;
  const query = 'SELECT * FROM "Recipes" JOIN "Users" ON "Recipes".userID = "Users".id ORDER BY likeCount DESC OFFSET $1 ROWS FETCH NEXT 15 ROWS ONLY';
  const values = [parseInt(page) * 15];

  try {
    // await client.connect();
    // const { rows } = await client.query(query);
    const { rows } = await pool.query(query, values);
    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const queryByIngredients = async (req, res) => {
  // const client = new Client(conString);

  const ingredient = req.query;
  const query = 'SELECT * FROM "Recipes" JOIN "Users" ON "Recipes".userID = "Users".id WHERE $1 = ANY(ingredients)';
  const values = [parseInt(ingredient)];

  try {
    // await client.connect();
    // const { rows } = await client.query(query, values);
    const { rows } = await pool.query(query, values);

    res.send({ rows });
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

// recipe revise
const updateLikeCount = async (req, res) => {
  // const client = new Client(conString);

  const id = req.query;
  const query = 'UPDATE "Recipes" SET likeCount = likeCount + 1 WHERE id = $1';
  const values = [parseInt(id)];

  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const updateRecipe = async (req, res) => {
  // const client = new Client(conString);

  const update = req.query;
  const query =
    'UPDATE "Recipes" SET title = $1, overview = $2, servingSize = $3, instructions = $4, image = $5, video = $6, labels = $7, ingredients = $8 WHERE id = $9';
  const values = [
    (update.title).toString(),
    (update.overview).toString(),
    parseInt(update.servingSize),
    (update.instructions).toString(),
    (update.image).toString(),
    (update.video).toString(),
    add.labels,
    add.ingredients,
    parseInt(id),
  ];

  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

const addComment = async (req, res) => {
  // const client = new Client(conString);

  const comment = req.body;
  const query =
    'UPDATE "Recipes" SET comment = $1 WHERE id = $2';
  const values = [
    comment.comment,
    parseInt(comment.id)
  ];

  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

// add recipe
const addRecipe = async (req, res) => {
  // const client = new Client(conString);

  const add = req.body; // { title: , overview: }
  const user = req.user;
  const query =
    'INSERT INTO "Recipes" ("userID", "title", "overview", "servingSize", "instructions", "image", "video", "likeCount", "labels", "ingredients", "comments") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, DEFAULT)';
  const values = [
    user.id,
    (add.title).toString(),
    (add.overview).toString(),
    parseInt(add.servingSize),
    (add.instructions).toString(),
    // add.instructions,
    (add.image).toString(),
    (add.video).toString(),
    // parseInt(add.likeCount),
    0,
    add.labels,
    add.ingredients,
  ];
  try {
    // await client.connect();
    // await client.query(query, values);
    await pool.query(query, values);

    res.send("success");
  } catch (err) {
    res.send("fail");
    console.log(err);
  // } finally {
  //   client.end();
  }
};

export {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  updateLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
};
