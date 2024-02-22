import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

interface result {
    message: string;
}

@Component({
    selector: 'app-socket',
    standalone: true,
    imports: [],
    templateUrl: './socket.component.html',
    styleUrl: './socket.component.scss',
})
export class SocketComponent implements OnInit {
    title = 'AngularWebSockets';

    myWebSocket: WebSocketSubject<result> = webSocket('ws://localhost:8001');

    input: result = { message: '' };
    messages = '';

    ngOnInit(): void {}

    connectSocket() {
        if (!window.WebSocket) {
            console.log('WebSocket not supported.');
        } else {
            this.myWebSocket.subscribe({
                complete: () => {
                    console.log();
                },
                error: (err) => {
                    console.log(err);
                },
                next: (val) => {
                    //===comment out the next 2 lines===
                    // const r = val as string
                    // console.log(r)

                    //===add the following===
                    const r = val as result;
                    console.log(r['message']);
                    //=======================
                },
            });
            this.myWebSocket.next({ message: 'Hello, websockets!' });
        }
    }

    buttonClicked() {
        console.log('Button clicked');
        // send the message to the server
        this.myWebSocket.next(this.input);
        this.input.message = '';
    }
}
