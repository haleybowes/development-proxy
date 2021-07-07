# Loyalty Development Proxy
This project contains the mock middleware server for the front-end build of the PC Optimum web app. The mock middleware combines koa, koa-better-http-proxy, and koa-router to create a
solution which proxies requests to midtiers lower UAT API, utilizes a local API to mimic upcoming API features, and can alter proxied responses.

### Node
Our application has been built with node 10.15.0 therefore you should use it during development.
It is highly recommended to use `nvm` to manage your node versions. See [the nvm github](https://github.com/creationix/nvm) for more details.
Before installing nvm via command line make sure that you have a `bash_profile` in your home directory.
If no `bash_profile` exists create one by entering `touch ~/.bash_profile` in your terminal.

## Getting started
- Install the correct node version
- `git clone` this repository
- `npm install` in the project root directory

## Running the mock server
The application uses a mock middleware combines which koa, koa-better-http-proxy, and koa-router to create a solution which proxies requests to midtiers lower UAT API, allows for the modification of proxied responses, and utilizes a router middleware to allow for mimicking upcoming API features.
- `npm start` runs the mock server. Access the mock server at [http://localhost:3003](http://localhost:3003)

It is important to determine when to use the router middleware vs. modifying the proxy's response.

* Modifying the proxy's response is best used when a value on the response needs to be manipulated (e.g. modifying a members segmentation to return a specific marketing tile) or midtier plans to add a new key to an existing endpoint.
* The router middleware is used when the endpoint does not yet exist in the midtiers lower UAT API. By creating the endpoint in the router middleware, it allows the developer to complete the work on the client side (create services, actions, reducers, models, etc.) by being provided the expected response (as outlined in the [midtier documentation](https://docs.api.loblaw.digital/)).
*The router middleware can also be used to completely override the proxy response if the request being proxied has a matching route in the router middleware (see example in offers route).

### Middleware key package
***koa***
- [Koa](https://koajs.com/) is a web framework which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. By leveraging async functions, Koa allows you to ditch callbacks and greatly increase error-handling.

***koa-better-http-proxy***
- [Koa middleware](https://github.com/nsimmons/koa-better-http-proxy) being used to proxy `https://api-uat.pcoptimum.ca` and pass the response back to the client.
- [`userResDecorator`](https://github.com/nsimmons/koa-better-http-proxy#userresdecorator-supports-promise) can be used to modify the proxy's response before sending it to the client.

***koa-router***
- [koa-router](https://github.com/koajs/router/blob/master/API.md) can be used to proxy a specific path, and will override the `koa-better-http-proxy` request and use the router middleware if a route is matched.
- If the endpoint does not exist in the router middleware or the proxy, a 400 Bad Request will be returned.
