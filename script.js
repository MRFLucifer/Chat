var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port, {
    transports: ['websocket']
});

let username;

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('message', function(data) {
    var messages = document.getElementById('messages');
    var message = document.createElement('div');
    message.textContent = `${data.username}: ${data.msg}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
});

function setUsername() {
    username = document.getElementById('username-input').value;
    if (username.trim() !== "") {
        document.getElementById('username-input').disabled = true;
        document.getElementById('username-container').style.display = 'none';
        document.getElementById('message-input').disabled = false;
        document.querySelector('button[onclick="sendMessage()"]').disabled = false;
    }
}

function sendMessage() {
    var input = document.getElementById('message-input');
    var message = input.value;
    if (message.trim() !== "") {
        socket.send({ username: username, msg: message });
        input.value = '';
    }
}
