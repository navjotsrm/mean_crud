const express= require('express'),
path = require("path"),
bodyParser= require('body-parser'),
cors= require('cors'),
mongoose= require('mongoose'),
config= require('./DB');
const businessRoute= require('./routes/business.route');


const app = express();

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
app.use(cors());

app.get('/',(req,res)=>{
  res.send("testing")
});
app.use('/business',businessRoute)
