var express = require('express'),
    router = express.Router(),
    helpers = require("../helpers/helpers");

router.route("/")
.get(helpers.getTodos)
.post(helpers.createTodo);

router.route("/:todoId")
.get(helpers.getTodoById)
.put(helpers.updateTodoById)
.delete(helpers.deleteTodoById);

module.exports = router;