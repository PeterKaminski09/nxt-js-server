# NXT + Rasberry Pi + iPad

This is the server code for the project. It should be deployed to a host such as Heroku.

The Raspberry Pi client-side python code can be found [here](https://github.com/PeterKaminski09/nxt-pythonpi-client)

## What

The server code is meant to connect a Raspberry Pi python client to an iPad client. The server is sent commands from the iPad and then relays them to the correct Raspberry Pi which relays them to the corresponding Lego NXT device.

Only 1 server is needed, but the address of deployment should be noted and updated on line 9 of the nxt-pythonpi-client code [here](https://github.com/PeterKaminski09/nxt-pythonpi-client/blob/master/client.py)


