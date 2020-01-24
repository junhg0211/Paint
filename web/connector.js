function Connector() {
    if (!("WebSocket" in window)) {
        alert("This browser is not supported in internet socket communication.\n브라우저에서 인터넷 통신을 사용할 수 없습니다.")
    }

    this.socket = new WebSocket("ws://shtelo.iptime.org:28367");
    
    this.gmap = function() {
        this.socket.send("GMAP");
    };

    this.stle = function(x, y, tileCode) {
        this.socket.send(`STLE${pad(x, 5)}${pad(y, 5)}${tileCode.toString(16)}`)
    };

    this.socket.onopen = function() {
        connector.gmap();
    }

    this.socket.onmessage = function(event) {
        var message = event.data;

        if (message.substring(0, 3) == "MAP") {
            var width = parseInt(message.substring(3, 8));
            var height = parseInt(message.substring(8, 13));

            map.setWidth(width);
            map.setHeight(height);
            camera.center();

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    map.setTile(x, y, parseInt(message[13 + y * width + x], 16));
                }
            }
        } else if (message.substring(0, 4) == "STLE") {
            var x = parseInt(message.substring(4, 9));
            var y = parseInt(message.substring(9, 14));
            map.setTile(x, y, parseInt(message[14], 16));
        }
    };

    this.socket.onclose = function() {
        console.log("Console Closed");
    };
}