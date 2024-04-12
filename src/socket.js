let socket;

export function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        //   displayMsg('system', 'game', 'connected');
        // console.log("CONNECTED TO WEBSOCKET")
    };
    // socket.onclose = (event) => {
    //   displayMsg('system', 'game', 'disconnected');
    // };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        console.log(msg)
        if (msg.type === EventCreatedEvent) {
            displayMsg('user', msg.user, `${msg.activity}`);
        }
        //   else if (msg.type === GameStartEvent) {
        //     // this.displayMsg(getPlayerName(), msg.user, `started a new game`);
        //   }
    };
}

