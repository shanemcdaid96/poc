var Patient = require('./models/patients');
var Chart = require('chart.js');




function getPatient(res) {
    Patient.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all patients in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all patients in the database
        getPatient(res);
    });

    // create todo and send back all patients after creation
    app.post('/api/todos', function (req, res) {

        // create a patient, information comes from AJAX request from Angular
        Patient.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the patients after you create another
            getPatient(res);
        });

    });

    // delete a patients
    app.delete('/api/todos/:todo_id', function (req, res) {
        Patient.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getPatient(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
