# Railway Tunnel Builder

This code will make the agent dig a tunnel through whatever is in front of it!

To use this code, either import the [railway-tunnel-builder.mkcd](./railway-tunnel-builder.mkcd) project into the MakeCode code builder, or create a new project and add the JavaScript code from the [railway-tunnel-builder.js](./railway-tunnel-builder.js) script file.

Once you have imported the project, or added the JavaScript code, select the green Play button to activate the code.

## Using the code

This code contains two commands:

### summon-agent

The `summon-agent` command moves the agent to your position and points it in a direction.

To use this command, launch the chat window by pressing `t`, then enter:

```sh
summon-agent <direction>
```

Don't actually type `<direction>`, instead use a number to indicate the direction:

* 1 - face North
* 2 - face East
* 3 - face South
* 4 - face West

For example, to have the agent arrive at your location and face East, type:

```sh
summon-agent 2
```

### build-railway

The `build-railway` command will make the agent dig a tunnel through anything in front of it, lining the tunnel with white concrete. The runnel will be 5x5 blocks in size, with the inside 3x3 blocks. A powered rail will run along the floor in the middle of the tunnel, with levers every 10 blocks. The ceiling will have lights every 5 blocks using Sea Lanterns.

To use this command, launch the chat window by pressing `t`, then enter:

```sh
build-railway
```

The agent will continue all the time there are blocks in a 5x5 square around it. Once it reaches an area with no blocks, it will stop. When digging it will constantly check for new blocks appearing, so should handle falling blocks such as sand.

> Agents can't turn levers on, so to make the railway work you will need to turn the levers on manually.
