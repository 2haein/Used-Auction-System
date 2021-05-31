var socket = io()

/* 접속 되었을 때 실행 */
socket.on('connect', function () {
    /* 이름을 입력받고 */
    var name = prompt("채팅에 참여합니다.")
    if (!name) {
        name = '익명';
    }

    /* 서버에 새로운 유저가 왔다고 알림 */
    socket.emit('newUser', name)
})

/* 서버로부터 데이터 받은 경우 */
socket.on('update', function (data) {
    var chat = document.getElementById('chat')
    var message = document.createElement('div')

    /*시간 관련 코드*/
    var now = new Date();
    var time = document.createElement('div')//
    var nowtime = document.createTextNode(
        (now.getMonth() + 1) + '/' + now.getDate() + ' ' +
        now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2))

    var node = document.createTextNode(`${data.message}`)
    var className = ''

    // 타입에 따라 적용할 클래스를 다르게 지정
    switch (data.type) {
        case 'message':
            className = 'other'
            break

        case 'connect':
            className = 'connect'
            break

        case 'disconnect':
            className = 'disconnect'
            break
    }
    message.classList.add(className)
    message.appendChild(node)
    time.appendChild(nowtime)
    time.className = "timeprint"
    chat.appendChild(message)
    chat.appendChild(time)
    document.getElementById('main').scrollTop
        = document.getElementById('main').scrollHeight;
})

/* 메시지 전송 함수 */
function send() {
    // 입력되어있는 데이터 가져오기
    var message = document.getElementById('입력칸').value


    /*시간*/
    var now = new Date();
    var time = document.createElement('div')//
    var nowtime = document.createTextNode(
        (now.getMonth() + 1) + '/' + now.getDate() + ' ' +
        now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2))


    // 가져왔으니 데이터 빈칸으로 변경
    document.getElementById('입력칸').value = ''

    // 내가 전송할 메시지 클라이언트에게 표시
    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(message)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)

    time.appendChild(nowtime)
    time.className = "timeprint"
    chat.appendChild(time)

    document.getElementById('main').scrollTop
        = document.getElementById('main').scrollHeight;

    // 서버로 message 이벤트 전달 + 데이터와 함께
    socket.emit('message', { type: 'message', message: message })
}