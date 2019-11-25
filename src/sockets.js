
module.exports = function(io) {
 let users = {};

    io.on('connection', socket => {
       
        socket.on('new user', (data, cb) => {
            console.log(`new user conected: ${data}`)
            if(data in users) {
                cb(false);

            } else {

                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNickname();
            
            }
            })



        socket.on('send message', (data, cb) => {
            var msg = data.trim();

            if (msg.substr(0 ,3) === '/w ') {

                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if(index !== -1) {
                   var name =  msg.substr(0, index);
                   var msg = msg.substr(index +1);
                        if(name in users) {
                            users[name].emit('whisper', {
                                msg,
                                nick: socket.nickname

                            });
                        } else {
                            cb('error, please enter a valid user')
                        }
                } else {
                cb('error! please enter your msg')
                     }

            } else {
                io.sockets.emit('new message', {
                    msg: data,
                    nick: socket.nickname
    
                    });                
            }
            });


        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            delete users[socket.nickname];
            updateNickname();   
            console.log(`user disconnected: ${socket.nickname}`)
        });
        

        const updateNickname = () => {
            io.sockets.emit('usernames', Object.keys(users));
        }
    });

}
