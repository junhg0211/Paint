# Paint
like a *r/place*.

## Coordinate System
*Paint* use a coordinate system that exists in default javascript canvas context.
Upper left will be `(0, 0)`.
When you go to right side, your x-coordinate will increased,
and when you go to left side, your x-coordinate will decreased.
As the same way, going down makes your y-coordinate be increased,
going up does your y-coordinate decreased.

## Protocol
* 'CTS' stands for 'Clients to Server'. Protocol header with this label is for sending information from client to a server.
* 'STC' stands for 'Server to Clients'. Protocol header with this label is for sending information from a server to client.

### CTS
* `GMAP`
  * Requesting map data to server.
    * **Format**  `OOOWWWWWHHHHHDD...`
      * `OOO`  header (`'MAP'`)
      * `WWWWW`  width of the map in 5 digits (`%05d`)
      * `HHHHH`  height of the map in 5 digits (`%05d`)
      * `DD...`  data - from upper left to right, line by line.
* `STLE`
  * Give an information that the client requested to place a block.
    * **Format** `OOOOXXXXXYYYYYT`
      * `OOOO`  header (`'STLE'`)
      * `XXXXX`  x-coordinate (`%05d`)
      * `YYYYY`  y-coordinate (`%05d`)
      * `T`  tile code (`'%X' | '%x'`)

### STC
* `STLE`
  * Give an information that a client requested to place a block.
    * **Format** `OOOOXXXXXYYYYYT`
      * `OOOO`  header (`'STLE'`)
      * `XXXXX`  x-coordinate (`%05d`)
      * `YYYYY`  y-coordinate (`%05d`)
      * `T`  tile code (`'%X' | '%x'`)
