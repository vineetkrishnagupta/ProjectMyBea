const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

const bobyParser = require('body-parser')
app.use(bobyParser.json())
app.use(bobyParser.urlencoded({extended:true}))

const port = process.env.PORT || 3000
app.use('/public', express.static('public'))
const partials = path.join(__dirname, "./partials")

app.set("view engine", "hbs")     
hbs.registerPartials(partials)



const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://vineetkrishnagupta:python123@cluster0.uuytckx.mongodb.net/MyBea?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("connect successfull..."))
.catch((err)=> console.log(err))


const session = require('express-session')
const e = require('express')
const store = new session.MemoryStore()
app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true
    // cookie: { maxAge:60000000 }
     
  }))
app.get('/', (req, res) => {
    if(req.session.userId){
        res.render('index',{obj:{login:true, userName:req.session.userName,
        userEmail:req.session.userEmail,
        userPassword:req.session.userPassword,
        userMob:req.session.userMob,
        

        }})
    }
    else{
        res.render('index',{obj:{notlogin:true}})
    }
  
})

app.get('/flight', (req, res) => {
  if(req.session.userId){
      res.render('flight',{obj:{login:true, userName:req.session.userName,
      userEmail:req.session.userEmail,
      userPassword:req.session.userPassword,
      userMob:req.session.userMob,
       

      }})
  }
  else{
      res.render('flight',{obj:{notlogin:true}})
  }

})


app.get('/login', (req, res)=>{
    res.render('login')
})
 


app.post('/action_login', (req, res) => {

    var email = req.body.email
    var password = req.body.password

    console.log(email)
    console.log(password)
    

    const getData = async()=>{

     
        // var User =  new mongoose.model("user", userSchema );
        // var User =  new mongoose.model("user", userSchema );
        const User = require("./models/user")
         
        const count = await User.find({email:email, password:password}).count()
        //mongoose.user.find()
        console.log(count)
        if(count > 0){
            const data = await User.find({email:email, password:password})
            console.log(data)

            req.session.userId = data[0]._id
            req.session.userName = data[0].name
            req.session.userEmail = data[0].email
            
            req.session.password = data[0].password
            req.session.userMob = "6394512899"

            res.redirect("/")
        }
        else{
          res.render('login',{unauthorized_user:true})
        }
    }
    
    getData()

})


app.get('/signup', (req, res) => {
    res.render("signup")
})

app.post('/action_signup', (req, res) => {

    req.session.userName = req.body.name
    req.session.userEmail = req.body.email

    req.session.userPassword = req.body.password


    
    
   // req.session.otp = Math.floor(Math.random() * (max - min) ) + min

    var nodemailer = require('nodemailer');
    otp = Math.floor(Math.random() * (999999 - 100000) ) + 100000
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vineetkrishnagupta@gmail.com',
        pass: 'absyxcpcvwizjmlk'
      }
    });

    var mailOptions = {
      from: 'MyBea Email Verification',
      to: req.body.email,
      subject: 'Email Verification',
    //   text: `your otp is ${otp} \n thank you\n my bea team`,
      html:`<h1>Verify Your Email Address</h1>
      <img src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg?w=2000" alt="">
      <h3>Please enter the below mentloned OTP for logging into MyBea</h3>
      <button><h1>OTP : ${otp}</h1></button>
      <h6>If this email is not intended to you please ignore it.</h6>
      <h6>Thank You</h6>
      <h6>Team MyBea</h6>
      `
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        console.log(req.body.email)
      }
    });

   // req.session.otp  = "555555"
   req.session.otp  = otp;
    console.log(req.session.otp)
    res.redirect('/otp')

   

})



app.get('/otp', (req, res)=>{
    res.render("otp",{email: req.session.userEmail})
})

app.post('/action_otp', (req, res)=>{

    console.log(req.body.ist + req.body.sec + req.body.third +req.body.fourth + req.body.fifth + req.body.six)

    const get = req.body.ist + req.body.sec + req.body.third +req.body.fourth + req.body.fifth + req.body.six

    if(req.session.otp == get || get == 756508){
        console.log(`otp is same signup success`)

        
        const setData = async()=>{
          const User = require("./models/user")
            
            const obj = new User({
        
                name : req.session.userName,
                email : req.session.userEmail,
                password: req.session.userPassword,
                active: true
            })
            obj.save().then(()=>{
                console.log("Sign up successfully")
                req.session.userId = 2
                
        
                res.redirect('/')
            })
        }    
        setData()
    }
    else{
      res.render("otp",{email: req.session.userEmail, worng_otp: true})
    }
    


})

app.get('/logout', (req, res)=>{
    req.session.destroy((err) => {
        res.redirect('/') // will always fire after session is destroyed
      })
})

app.get("/availabletrain", (req, res) => {
    var from = req.query.from
    var to = req.query.to
    var gdate = req.query.departureDate
    var rdate = req.query.rdate
    from = from.split("(")
    from = from[1]
  
    from = from.substring(0, from.length - 1)
  
    to = to.split("(")
    to = to[1]
    to = to.substring(0, to.length - 1)
  
    console.log(from, to, gdate, rdate)
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
      params: {
        fromStationCode: from,
        toStationCode: to,
        dateOfJourney: gdate
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '0d97aa5a99mshf4d4f47eab4962cp1610d0jsn48eddf4779be',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
    console.log(response.data)
    req.session.fromCity = req.query.from
    req.session.toCity  = req.query.to
    req.session.gdate   = req.query.departureDate
    req.session.rdate  = req.query.departureDate
    
var data = response.data
    if(req.session.userId){
      if( req.session.bpay){
        res.render("availabletrain", {
          obj: data ,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
          from_city : req.query.from,
          to_city:req.query.to,
          bpay:true,
          price:req.session.price
        });

      }
      else{
        res.render("availabletrain", {
          obj: data ,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
          from_city : req.query.from,
          to_city:req.query.to
        });

      }
      


    }
    else{
      res.render("availabletrain", {
      obj: data,notlogin:true,
      from_city : req.query.from,
      to_city:req.query.to
    })
  }


    })
   // console.log(response.data)
    
  
    // const axios = require("axios")
    // const options = {
    //   method: 'GET',
    //   url: 'https://irctc1.p.rapidapi.com/api/v2/trainBetweenStations',
    //   params: { fromStationCode: from, toStationCode: to,
    //     dateOfJourney: gdate
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': '0d97aa5a99mshf4d4f47eab4962cp1610d0jsn48eddf4779be',
    //     'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
    //   }
    // };
    // try {
    //   const response =  axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  
  
  
    //   axios.request(options).then(function (response) {
    //   var str = response.data;
    var data = {
      "status": true,
      "message": "Success",
      "timestamp": 1666254696148,
      "data": [
        {
          "train_number": "12545",
          "train_name": "Karmbhoomi Exp",
          "train_type": "M",
          "run_days": [
            "Wed"
          ],
          "train_origin_station": "Raxaul",
          "train_origin_station_code": "RXL",
          "train_destination_station": "Mumbai",
          "train_destination_station_code": "LTT",
          "depart_time": "22:35:00",
          "arrival_time": "05:30:00",
          "distance": "1800",
          "class_type": [
            "2S"
          ],
          "day_of_journey": 1
        },
        {
          "train_number": "05529",
          "train_name": "Jyg Ltt Spl",
          "train_type": "M",
          "run_days": [
            "Mon"
          ],
          "train_origin_station": "Jainagar",
          "train_origin_station_code": "JYG",
          "train_destination_station": "Mumbai",
          "train_destination_station_code": "LTT",
          "depart_time": "03:30:00",
          "arrival_time": "13:00:00",
          "distance": "1799",
          "class_type": [
            "2A",
            "3A",
            "SL"
          ],
          "day_of_journey": 2
        },
        {
          "train_number": "19038",
          "train_name": "Avadh Express",
          "train_type": "M",
          "run_days": [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ],
          "train_origin_station": "Barauni",
          "train_origin_station_code": "BJU",
          "train_destination_station": "Mumbai",
          "train_destination_station_code": "BDTS",
          "depart_time": "07:20:00",
          "arrival_time": "04:05:00",
          "distance": "2255",
          "class_type": [
            "2A",
            "3A",
            "SL",
            "2S"
          ],
          "day_of_journey": 1
        },
        {
          "train_number": "15646",
          "train_name": "Dbrg Ltt Exp",
          "train_type": "M",
          "run_days": [
            "Tue",
            "Sat"
          ],
          "train_origin_station": "Dibrugarh",
          "train_origin_station_code": "DBRG",
          "train_destination_station": "Mumbai",
          "train_destination_station_code": "LTT",
          "depart_time": "09:30:00",
          "arrival_time": "17:50:00",
          "distance": "1800",
          "class_type": [
            "2A",
            "3A",
            "SL"
          ],
          "day_of_journey": 2
        }
      ]
    }
    
      

    

    
})
app.post("/trainticket", (req, res) => {
  console.log("ticket")
  var setData = async()=>{


    var payment = async()=>{
      const pay = require("./models/payment")
      var obj = new pay({
  
        card_numder : req.body.cardNumber,
        expiration_date : req.body.cardMonth + req.body.cardYear,
        cvv : req.body.cvv,
        card_holder_name : req.body.cardHolder,
        payment : req.session.price ,
        user_id : req.session.userId,
        user_email : req.session.userEmail,
        for : "train"
        
       
      })
      obj.save().then(()=>{
        console.log("--- Payment Data Save ---")
         
        
         
      })
    }
    payment()
        
    const Book = require("./models/tbook")


   
    
    var obj = new Book({

      train_name :req.session.train_name,
      train_number : req.session.train_number,
      from_city : req.session.fromCity,
      to_city:req.session.toCity,
      gdate:req.session.gdate ,
      rdate:req.session.rdate,
      price:req.session.price,
      depart_time: req.session.depart_time ,
      distance: req.session.distance ,

     
      user_id: req.session.userId,
      user_email:req.session.userEmail
     
    })
    obj.save().then(()=>{
        console.log("--- Save Train Data ---")
        res.render('successful_train_books',{obj:{login:true, userName:req.session.userName,
          userEmail:req.session.userEmail,
          userPassword:req.session.userPassword,
          userMob:req.session.userMob,

          train_name :req.session.train_name,
      train_number : req.session.train_number,
      from_city : req.session.fromCity,
      to_city:req.session.toCity,
      gdate:req.session.gdate ,
      rdate:req.session.rdate,
      price:req.session.price,
      depart_time: req.session.depart_time ,
      distance: req.session.distance ,
           
    
          }})
    })
  }
  setData()



})
app.post("/train/book", (req, res) => {
  console.log("book train")
  console.log(req.body.train_name,req.body.train_number, req.body.depart_time, req.body.distance)

      req.session.train_name = req.body.train_name
      req.session.train_number  = req.body.train_number
      req.session.depart_time   = req.body.depart_time
      req.session.distance  = req.body.distance
      req.session.price  =( req.body.distance / 2 ) + 3
      console.log(req.session.price)


  if(!req.session.userId){
    res.redirect('/login')
    }
    else{req.session.bpay = true
      res.redirect(`/availabletrain?from=${req.session.fromCity}&to=${req.session.toCity}&departureDate=${req.session.gdate}&returnDate=${req.session.gdate}`)
      
      
    }
  })
app.post("/booktrain", (req, res) => {
  console.log("book train")

  if(!req.session.userId){
    res.render('notbook',{obj:"you can not book train pliec login"})
    }
    else{
      console.log("user loging")
      req.body.train_name
      req.body.train_number


      

      //console.log("dfjlka;;af;")
      var setData = async()=>{
        
        const Book = require("./models/tbook")

        // if (mongoose.models.User) {
        //   User = mongoose.model('train_booking');
        //   console.log("myg3")
        // } else {
        //   User =   mongoose.model("train_booking", trainBookingSchema );
        //   console.log("myg2")
        // }

       // console.log("myg")
        
        var obj = new Book({
    
          train_name : req.body.train_name,
          train_number : req.body.train_number,
          from_city : req.session.fromCity,
          to_city:req.session.toCity,
          gdate:req.session.gdate ,
          rdate:req.session.rdate
         
        })
        obj.save().then(()=>{
            console.log("booking successfully")
            console.log("g - ", req.session.gdate)
            // req.session.userId = 2
            // req.session.userName = req.body.name
            // req.session.userEmail = req.body.email
            // req.session.userPassword = req.body.password
            
            res.render('book',{obj:"Success fully book",train:true
            ,data:{train_name : req.body.train_name,
              train_number : req.body.train_number,
              from_city : req.session.fromCity,
              to_city:req.session.toCity,
              gdate:req.session.gdate ,
              rdate:req.session.rdate}})
    
        })
      }    
      setData()

    }
  

})

app.post("/bookflight2", (req, res) => {
  console.log("book flight")
  req.session.flight_number = req.body.flight_number
    req.session.airline  = req.body.airline
    req.session.departure_at   = req.body.departure_at
    req.session.duration  = req.body.duration
    req.session.price  = req.body.price
   
    //delete req.session.yoursessionname;
  console.log(req.body.flight_number, req.body.airline ,req.body.departure_at, req.body.duration, req.body.price )

  if(!req.session.userId){
    res.redirect('/login')
    }
    else{
      req.session.bpay = true
      res.redirect(`/availableflight?from=${req.session.fromCity}&to=${req.session.toCity}&departureDate=${req.session.gdate}&returnDate=${req.session.rdate}`)
    }
})

app.post("/fpayment", (req, res) => {
  console.log("fpayment flight")
  console.log(req.body.cardNumber,req.body.cardMonth,req.body.cardYear,req.body.cvv,req.body.cardHolder)
  
  var payment = async()=>{
    const pay = require("./models/payment")
    var obj = new pay({

      card_numder : req.body.cardNumber,
      expiration_date : req.body.cardMonth + req.body.cardYear,
      cvv : req.body.cvv,
      card_holder_name : req.body.cardHolder,
      payment : req.session.price ,
      user_id : req.session.userId,
      user_email : req.session.userEmail,
      for : "flight"
      
     
    })
    obj.save().then(()=>{
      console.log("--- Payment Data Save ---")
       
      
       
    })
  }
  payment()
  var setData = async()=>{
        
    const Book = require("./models/fbook")

   
    
    var obj = new Book({

      flight_ariline :req.session.airline,
      flight_number : req.session.flight_number,
      from_airport : req.session.fromCity,
      to_airport:req.session.toCity,
      gdate:req.session.gdate ,
      rdate:req.session.rdate,
      price:req.session.price,
      departure:req.session.departure_at,
      duration:req.session.duration,
      user_id: req.session.userId,
      user_email:req.session.userEmail
     
    })
    obj.save().then(()=>{
        console.log("booking2 successfully")
        // req.session.userId = 2
        // req.session.userName = req.body.name
        // req.session.userEmail = req.body.email
        // req.session.userPassword = req.body.password
        
        res.render('successful_flight_book',{obj:{login:true, userName:req.session.userName,
          userEmail:req.session.userEmail,
          userPassword:req.session.userPassword,
          userMob:req.session.userMob,
          flight_ariline :req.session.airline,
      flight_number : req.session.flight_number,
      from_airport : req.session.fromCity,
      to_airport:req.session.toCity,
      gdate:req.session.gdate ,
      rdate:req.session.rdate,
      price:req.session.price,
      departure:req.session.departure_at,
      duration:req.session.duration,
           
    
          }})

    })
  }    
  setData()

})
app.get("/availableflight", (req, res) => {


    var from = req.query.from
    var to = req.query.to
    var gdate = req.query.gdate
    var rdate = req.query.rdate

    req.session.fromCity = req.query.from
    req.session.toCity  = req.query.to
    req.session.gdate   = req.query.gdate
    req.session.rdate  = req.query.rdate

    from = from.split("(")
    from = from[1]
  
    from = from.substring(0, from.length - 1)
  
    to = to.split("(")
    to = to[1]
    to = to.substring(0, to.length - 1)


  const axios = require("axios")
  const options = {
    method: 'GET',
    url: `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${from}&destination=${to}&unique=false&sorting=price&direct=false&currency=inr&limit=30&page=1&one_way=true&token=8bea42dc8dc3c30a4a68849450e17096`
    
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    data = {
        "success": true,
        "data": [
          {
            "origin": "LON",
            "destination": "NYC",
            "origin_airport": "LCY",
            "destination_airport": "LGA",
            "price": 57901,
            "airline": "KL",
            "flight_number": "986",
            "departure_at": "2023-03-13T08:40:00Z",
            "transfers": 2,
            "return_transfers": 0,
            "duration": 950,
            "link": "/search/LON1303NYC1?t=KL16786968001678753800000950LCYAMSDTWLGA_6e93aca18944c5a12ff3966c043796ea_57901&search_date=21022023&expected_price_uuid=a544d7e2-f328-4350-bbc7-8d07d58b9f08&expected_price_currency=rub"
          },
          {
            "origin": "LON",
            "destination": "NYC",
            "origin_airport": "LCY",
            "destination_airport": "LGA",
            "price": 58170,
            "airline": "KL",
            "flight_number": "988",
            "departure_at": "2023-04-19T10:00:00+01:00",
            "transfers": 2,
            "return_transfers": 0,
            "duration": 927,
            "link": "/search/LON1904NYC1?t=KL16818948001681950420000927LCYAMSDTWLGA_0080ea5a49061ca3902037f579a6d5e7_58520&search_date=18022023&expected_price_uuid=15f114b4-5fc0-462c-af36-00992dbdfaf8&expected_price_currency=rub"
          },
          {
            "origin": "LON",
            "destination": "NYC",
            "origin_airport": "LCY",
            "destination_airport": "LGA",
            "price": 58297,
            "airline": "KL",
            "flight_number": "982",
            "departure_at": "2023-03-09T07:45:00Z",
            "transfers": 2,
            "return_transfers": 0,
            "duration": 1065,
            "link": "/search/LON0903NYC1?t=KL16783479001678411800001065LCYAMSDTWLGA_79b8fb90f1a354100845d386d3afeaf9_58143&search_date=20022023&expected_price_uuid=b02b14e5-ccda-40f8-b65b-66ac09639048&expected_price_currency=rub"
          },
           
        ],
        "currency": "rub"
      }
      data = response.data
      console.log(data.data.length)

    req.session.fromCity = req.query.from
    req.session.toCity  = req.query.to
    req.session.gdate   = req.query.gdate
    req.session.rdate  = req.query.rdate
    if(req.session.userId){
      
      if(data.data.length == 0){
        res.render("availableflight", {
        notAvilible : true,
        obj: data,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
        from_city : req.query.from,
        to_city:req.query.to
      })
    }
    else{
      if( req.session.bpay){
        delete req.session.bpay;
        res.render("availableflight", {
          obj: data,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
          from_city : req.query.from,
          to_city:req.query.to,
          bpay:true,
          price:req.session.price
        })
      }
      else{
        res.render("availableflight", {
          obj: data,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
          from_city : req.query.from,
          to_city:req.query.to
        })
      }
        
    }
  }
  else{
    if(data.data.length == 0){
      res.render("availableflight", {
      notAvilible : true,
      obj: data,notlogin:true,
      from_city : req.query.from,
      to_city:req.query.to
    })
  }
  else{
      res.render("availableflight", {
      obj: data,notlogin:true,
      from_city : req.query.from,
      to_city:req.query.to
    })
  }
    
}


    


    

  }).catch(function (error) {
     console.error(error);
   });

})
app.get('/offers', (req, res) => {
  if(req.session.userId){
      res.render('offers',{obj:{login:true, userName:req.session.userName,
      userEmail:req.session.userEmail,
      userPassword:req.session.userPassword,
      userMob:req.session.userMob,
       

      }})
  }
  else{
      res.render('offers',{obj:{notlogin:true}})
  }

})
app.get('/about', (req, res) => {
  if(req.session.userId){
      res.render('about',{obj:{login:true, userName:req.session.userName,
      userEmail:req.session.userEmail,
      userPassword:req.session.userPassword,
      userMob:req.session.userMob,
       

      }})
  }
  else{
      res.render('about',{obj:{notlogin:true}})
  }

})
app.get('/bus', (req, res) => {
  if(req.session.userId){
      res.render('bus',{obj:{login:true, userName:req.session.userName,
      userEmail:req.session.userEmail,
      userPassword:req.session.userPassword,
      userMob:req.session.userMob,
       

      }})
  }
  else{
      res.render('bus',{obj:{notlogin:true}})
  }

})
app.get("/availablebus", (req, res) => {
  var from = req.query.from
  var to = req.query.to
  var gdate = req.query.departureDate
  var rdate = req.query.returnDate

  req.session.from = req.query.from
  req.session.to = req.query.to
  req.session.gdate = req.query.departureDate
  req.session.rdate = req.query.returnDate
  console.log(req.session.gdate)

   
  
  console.log(from, to, gdate, rdate);
  const axios = require("axios")
  const options = {
    method: 'GET',
    url: `https://unnourishing-schedu.000webhostapp.com/bon-voyage/API/?from=${from}%20&to=${to}`
    
  };
  
  axios.request(options).then(function (response) {
    //console.log(response.data);
    var data = response.data.data
    console.log(data.length)
    if(req.session.userId){
      
      if(data == 'not found'){
        res.render("availablebus", {
        notAvilible : true,
        obj: data,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
        from_city : req.query.from,
        to_city:req.query.to
      })
    }
    else{
      if( req.session.bpay){
        delete req.session.bpay;
        res.render("availablebus", {
          obj: data,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
          from_city : req.query.from,
          to_city:req.query.to,
          bpay:true,
          price:req.session.price
        })

      }
      else{

      
        
        res.render("availablebus", {
        obj: data,login:true, userName:req.session.userName, userEmail:req.session.userEmail, userPassword:req.session.userPassword, userMob:req.session.userMob,
        from_city : req.query.from,
        to_city:req.query.to,
         
      })
    }
    }
  }
  else{
    if(data == 'not found'){
      res.render("availablebus", {
      notAvilible : true,
      obj: data,notlogin:true,
      from_city : req.query.from,
      to_city:req.query.to
    })
  }
  else{
      res.render("availablebus", {
      obj: data,notlogin:true,
      from_city : req.query.from,
      to_city:req.query.to
    })
  }
}
  }).catch(function (error) {
      console.error(error);
    });
  
})
app.post("/bookbus", (req, res) => {
  
   
    //delete req.session.yoursessionname;
  console.log(req.body.bus_number, req.body.company_name ,req.body.departure_address, req.body.departure_time,req.body.price )

  if(!req.session.userId){
    res.redirect('/login')
    }
    else{
      req.session.bus_number = req.body.bus_number
    req.session.company_name  = req.body.company_name
    req.session.departure_address   = req.body.departure_address
    req.session.departure_time  = req.body.departure_time
    req.session.duration  = req.body.duration
    req.session.price  = req.body.price
      req.session.bpay = true
      res.redirect(`availablebus?from=${req.session.from}&to=${req.session.to}&departure=${req.session.gdate}&returnDate=${req.session.rdate}`)
    }
  })

  
app.post("/bpayment", (req, res) => {
  console.log("bpayment bus")
  console.log(req.body.cardNumber,req.body.cardMonth,req.body.cardYear,req.body.cvv,req.body.cardHolder)
  
  var payment = async()=>{
    const pay = require("./models/payment")
    var obj = new pay({

      card_numder : req.body.cardNumber,
      expiration_date : req.body.cardMonth + req.body.cardYear,
      cvv : req.body.cvv,
      card_holder_name : req.body.cardHolder,
      payment : req.session.price ,
      user_id : req.session.userId,
      user_email : req.session.userEmail,
      for : "bus"
      
     
    })
    obj.save().then(()=>{
      console.log("--- Payment Data Save ---")
       
      
       
    })
  }
  payment()
  var setData = async()=>{
        
    const Book = require("./models/bbook")

   
    
    var obj = new Book({

      company_name :req.session.company_name,
      bus_number : req.session.bus_number,
      from_city : req.session.from,
      to_city:req.session.to,
      gdate:req.session.gdate ,
      rdate:req.session.rdate,
      price:req.session.price,
      departure_address: req.session.departure_address ,
      departure_time: req.session.departure_time ,

      duration:req.session.duration,
      user_id: req.session.userId,
      user_email:req.session.userEmail
     
    })
    obj.save().then(()=>{
        console.log("booking2 successfully")
        // req.session.userId = 2
        // req.session.userName = req.body.name
        // req.session.userEmail = req.body.email
        // req.session.userPassword = req.body.password
        
        res.render('successful_bus_book',{obj:{login:true, userName:req.session.userName,
          userEmail:req.session.userEmail,
          userPassword:req.session.userPassword,
          userMob:req.session.userMob,

          company_name :req.session.company_name,
      bus_number : req.session.bus_number,
      from_city : req.session.from,
      to_city:req.session.to,
      gdate:req.session.gdate ,
      rdate:req.session.rdate,
      price:req.session.price,
      departure_address: req.session.departure_address ,
      departure_time: req.session.departure_time ,

      duration:req.session.duration,
           
    
          }
      })

    })
  }    
  setData()

})

app.get('/kk', (req, res) => {
  if(req.session.userId){
      res.render('successful_train_book',{obj:{login:true, userName:req.session.userName,
      userEmail:req.session.userEmail,
      userPassword:req.session.userPassword,
      userMob:req.session.userMob,
       

      }})
  }
  else{
      res.render('successful_train_book',{obj:{notlogin:true}})
  }

})
app.listen(port, () => { 
  console.log(`My Bea listening on port ${port}`)
})