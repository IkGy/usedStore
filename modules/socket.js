// Socket.io 설정
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { callbackPromise } = require("nodemailer/lib/shared");
// const socketio = require('socket.io');
// const io = socketio(server)
app.use(cors({ origin: '*' }))
const io = new Server(server, {cors: {origin: '*'}});

const roomInfo = [];

io.on('connection', (socket) => {
  const { url } = socket.request;
  console.log(`${url} 에서 연결됨`);
  
  // 방 입장 이벤트 핸들링
  socket.on('join', (room, callback) => {
    console.log('방 입장:', room);
    // 해당 방에 클라이언트 소켓을 조인
    roomInfo[socket.id] = room;
    console.log(roomInfo[socket.id]);
    socket.join(room);
    console.log("join 실행");
    // callback()
  });

  // 클라이언트로부터의 메시지 이벤트 핸들링
  socket.on('sendMessage', async (data, callback) => {
    console.log("소켓 sendMessage 진입");
    const { writer, message, images } = data;
    console.log("data: ", data);
    console.log("writer: ", writer);
    console.log('메시지 받음:', message);
    console.log('이미지 받음:', images);
    const room = roomInfo[socket.id];
    console.log("room: ", room);

    // 같은 방에 있는 모든 클라이언트에게 메시지 전송
    io.to(room).emit('message', { writer, message, images });
    callback()
  });

  // 연결 해제 이벤트 핸들링
  socket.on('disconnect', () => {
    console.log('사용자가 연결 해제됨');

  });
});

server.listen(5000, () => console.log("채팅서버 연결"));
