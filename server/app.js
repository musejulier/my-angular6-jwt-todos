const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');//来验证指定http请求的JsonWebTokens的有效性，如果有效就将JsonWebTokens的值设置到req.user里面，然后路由到相应的router


const app = express()
app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

var TODOS = [
    { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT Todo App", 'completed': false },
];
var USERS = [
    { 'id': 1, 'username': 'jemma' },
    { 'id': 2, 'username': 'paul' },
    { 'id': 3, 'username': 'sebastian' },
];
function getTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    var todo = _.find(TODOS, function (todo) { return todo.id == todoID; })

    return todo;
}
function getCompletedTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return _.filter(todos, ['completed', true]);
}
function getNotCompletedTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return _.filter(todos, ['completed', false]);
}
function getUsers() {
    return USERS;
}

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});

app.get('/api/todos', function (req, res) {
    res.type("json");
    res.send(getTodos(req.user.userID));
});
app.get('/api/completedTodos', function (req, res) {
    res.type("json");
    res.send(getCompletedTodos(req.user.userID));
});
app.get('/api/notcompletedTodos', function (req, res) {
    res.type("json");
    res.send(getNotCompletedTodos(req.user.userID));
});

app.get('/api/todos/:id', function (req, res) {
    var todoID = req.params.id;
    res.type("json");
    res.send(getTodo(todoID));
});
app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});
app.post('/api/auth', function(req, res) {
    const body = req.body;
   
    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != 'todo') return res.sendStatus(401);
    
    var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '1h'});
    res.send({token});
  });
app.post('/api/addTodo', function (req, res) {
    const { name, completed } = req.body;
 
    TODOS.push({
        id: TODOS.length,
        user_id: req.user.userID,
        name,
        completed
    });
    res.send({
        success: true
    });
});

app.post('/api/updateState', function (req, res) {
    const { id, isCompleted } = req.body;
    let hasUpdate = false;
    TODOS.map(todo => {
        if(todo.id == id) {
            todo.completed = isCompleted;
            hasUpdate = true;
        }
        return todo;
    });
    res.send({
        success: hasUpdate
    });
});
app.post('/api/deleteTodo', function (req, res) {
    const { id } = req.body;
    TODOS = _.filter(TODOS, function(todo) { return todo.id != id; });
    res.send({
        success: true
    });
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});




