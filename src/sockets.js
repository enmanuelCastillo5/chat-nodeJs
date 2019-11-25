
module.exports = function(io) {
 let nicknames = [];

    io.on('connection', socket => {
        console.log('new user connected');

    socket.on('new user', (data, cb) => {
        console.log(`new user conected: ${data}`)
        if(nicknames.indexOf(data) != -1) {
            cb(false);

        } else {

            cb(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
            updateNickname();
        
        }
        })



    socket.on('send message', (data) => {
        io.sockets.emit('new message', data);
        });



    socket.on('disconnect', data => {
        if(!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        updateNickname();   
        console.log(`user disconnected ${socket.nickname}`)
    });
    

    const updateNickname = () => {
        io.sockets.emit('usernames', nicknames);
    }
    });

}
