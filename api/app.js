var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indexRouter = require('./routes/index');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const connectDb = () => {
  const options = {
    useMongoClient: true,
    useNewUrlParser: true
  }
  mongoose.connect(process.env.MONGO_URL, options)
  return mongoose.connection
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb);

// create Schema for terms
const termScheme = new Schema({
  term: { type : String , unique : true, required : true },
  definition: { type : String , required : true }
}, {versionKey: false});
const Term = mongoose.model("Term", termScheme);

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    .use(cors())
    .use('/', indexRouter)
    .get('/search', (req,res) => {
        const termReq = req.query.term;
        Term.findOne({term: termReq.toUpperCase()}, function(err, term){
            if(err) return console.log(err);
            let lowerTerm = termReq.toLowerCase();
            let capitalizedTerm = capitalizeFirstLetter(lowerTerm);
            if (term) {
                res.send({ term: capitalizedTerm, definition: term.definition });
            } else {
                res.send({term: capitalizedTerm, definition: null});
            }
        });
    })
    .post('/add', (req,res) => {
        if(!req.body) return res.sendStatus(400);

        console.log('Starting adding...');
        const termReq = req.body.term;
        const definitionReq = req.body.definition;
        const term = new Term({term: termReq.toUpperCase(), definition: definitionReq});

        let lowerTerm = termReq.toLowerCase();
        let capitalizedTerm = capitalizeFirstLetter(lowerTerm);

        term.save(function(err){
            if(err) return console.log(err);
            console.log('Added');
            res.send({term: capitalizedTerm, definition: term.definition});
        });
    })

    .get('/all', (req,res) => {
      Term.find({}, function(err, terms){

        if(err) return console.log(err);
        res.send(terms);
      });
    })

    // catch 404 and forward to error handler
    .use(function(req, res, next) {
      next(createError(404));
    })

    // error handler
    .use(function(err, req, res, next) {
    // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

module.exports = app;
