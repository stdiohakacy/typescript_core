import socketIO from 'socket.io';

export const emitAsync = (socket: socketIO.Socket, emitName: string, socketId: string, cbFn: any) => {
    return new Promise((resolve, reject) => {
        if(!socket || !socket.emit)
            return reject('Please input socket');
        socket.emit(emitName, socketId, (...args) => {
            let response;
            if(typeof cbFn === 'function')
                response = cbFn(...args);
            return resolve(response);
        })
    })
}