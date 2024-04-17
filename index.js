const express=require("express");
const app=express();

//For express validation 
const {body,validationResult}=require("express-validator");

app.set('view engine','ejs');
app.use(express.static('public'));
//For passing form data into express 
app.use(express.urlencoded({ extended: true }));

const http=require('http');
const server=http.createServer(app);

const Server=require('socket.io');
const io=Server(server);

let users=[];

io.on('connection',(socket)=>{
    
    socket.on("join-room",(data)=>{
        
        // console.log("Someone just got connected");
        
        socket.join(data.room);

        socket.on("add-msg",(data2)=>{
            // console.log(data2.msg,data2.room,data2.username);
            io.to(data2.room).emit("received-msg",{
                msg:data2.msg,
                username:data2.username
            });
        })  
    })

    // socket.on('disconnect',()=>{
    //     console.log("Someone just got disconnected.");
    // });
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/login',body("Name").notEmpty(),body("Room").isIn(['Alpha','Beta','Gamma']),(req,res)=>{
    const errors=validationResult(req);
    // console.log(errors);
    if(!errors.isEmpty()){
        res.redirect('/');
    }

    const username=req.body.Name;
    const room=req.body.Room;
    res.render(room,{username,room});
    
})

const port= process.env.PORT || 9000;
server.listen(port,()=>{
    console.log("Server running at port 9000");
})