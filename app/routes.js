var Employee = require('./models/employee');
var User = require('./models/user');

function getEmployees(res) {
    Employee.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos); 
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.post('/api/login', function (req, res) {

        var email = req.body.email;
        var pass = eval(req.body.pass);

        User.find({
            email : email,
            pass : pass
        },
        function (err, person) {
            if(err){
                res.json({
                    status:false
                });
            }else{
                res.json({
                    status:true,
                    user:person
                });
            }
        });

    });

    //Employee
    app.get('/api/employee', function (req, res) {
        getEmployees(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/employee', function (req, res) {
        Employee.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone
        }, function (err, todo) {
            if (err){
                res.json({
                    status:false
                });
            }else{
                res.json({
                    status:true
                });
            }
        });

    });

    app.delete('/api/employee/:id', function (req, res) {
        Employee.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err)
                res.send(err);
            getEmployees(res);
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
