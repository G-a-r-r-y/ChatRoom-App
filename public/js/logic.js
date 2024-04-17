const socket = io();

let room=document.getElementById("room").innerHTML;
socket.emit("join-room",{room:room});

$("#send-btn").click(()=>{
    const msgText=$("#inp").val();
    if(msgText===""){
        return;
    }
    let username=document.getElementById("username").innerHTML;
    socket.emit("add-msg",{msg:msgText,room:room,username:username});
})

socket.on('received-msg', (data) => {
    $('#chat-box').append(`<li class="border p-2 ms-0  rounded-pill mb-2"><span class="fw-bold">${data.username}</span> - <span>${data.msg}</span></li>`)
    $("#inp").val("");
});

