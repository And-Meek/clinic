
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Clinic = require('./models/Clinic')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth')
const { addUser, loginUser } = require('./user.controller');


const app = express()

const PORT = 3001
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.post('/form', async(req, res) => {
	const { name, phone, request} = req.body
	try {
		const newRequest = await Clinic.create({date: new Date(), name, phone, request})
		res.json(newRequest)
	} catch (e) {
		console.log(e)
	}
})


app.post('/register', async(req, res)=> {
	const response = await addUser(req.body.email, req.body.password)
	res.json(response)
})

app.post('/login', async(req, res)=>{
	try {
		const token = await loginUser(req.body.email, req.body.password)
		res.cookie('token', token)
		res.json(req.body.email)
	}
	catch (e) {
		console.log(e)
	}
})

app.use(auth);

app.get('/requests', async (req, res) => {
	try {
		const requests = await Clinic.find()

		res.json(requests)
	}
	catch (e){
		console.log(e)
	}
})

const URL = 'mongodb+srv://AndMeek:qwerty123@cluster0.aa7oyko.mongodb.net/clinic-list?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(URL).then(async()=>{
	app.listen(PORT, ()=>{
		console.log(`server start on port: ${PORT}`)
	})
})

