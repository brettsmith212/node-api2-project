// implement your posts router here
const { Router } = require("express");
const {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
} = require("./posts-model");

const router = Router();

router.get("/", (req, res) => {
  find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  if (!body.title || !body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  }
  insert(body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

module.exports = router;
