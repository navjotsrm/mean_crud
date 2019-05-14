const express= require('express'),
path = require("path"),
bodyParser= require('body-parser'),
cors= require('cors'),
mongoose= require('mongoose'),
config= require('./DB');
const businessRoute= require('./routes/business.route');
const ejs= require('ejs');


const app = express();

// app.set('view engine','ejs');
// app.get('/',(req,res)=>res.render('index'))

let port = process.env.PORT || 4000;

const server= app.listen(port,()=>{
    console.log("listning to port " + port);   
})

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected'+ config.DB) },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.get('/',(req,res)=>{
  res.send("testing")
});
app.use('/business',businessRoute)

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',"GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

  app.use("/uploads",express.static(path.join(__dirname, './uploads')));
