


export const webSockets = (socketServer) => {
    socketServer.on('connection', (socket) => {
        console.log(`⚡️ new client connection - socket.id = ${socket.id}`)

    })
}


