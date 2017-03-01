var Employee = require('./models/employee');

function getEmployees(res) {
    Employee.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------

/*    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });
*/
    // create todo and send back all todos after creation
    app.post('/api/employee', function (req, res) {
        Employee.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone
        }, function (err, todo) {
            if (err)
                res.send(err);

            getEmployees(res);
        });

    });

/*    app.delete('/api/todos/:todo_id', function (req, res) {
        Employee.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });
*/
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
