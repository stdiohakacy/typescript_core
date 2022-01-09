import express from 'express';
import { Server } from "http";
import * as path from 'path';
import { RoutingControllersOptions } from "routing-controllers";
import Container from 'typedi';
import { API_PORT } from './configs/Configuration';
import { ApiAuthenticator } from './controller/ApiAuthenticator';
import { HttpServer } from './HttpServer';

export class ApiService {
    setup(callback: any = null): Server {
        const authenticator = Container.get(ApiAuthenticator);
        const app = express();

        app.get('/healthz', (_req, res) => {
            res.status(200).end('ok');
        });

        const options: RoutingControllersOptions = {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
                maxAge: 3600,
                preflightContinue: true,
                optionsSuccessStatus: 204
            },
            // routePrefix: '/api',
            controllers: [
                path.join(__dirname, '/controller/*{.js,.ts}')
            ],
            validation: false,
            defaultErrorHandler: false,
            development: true,
            authorizationChecker: authenticator.authorizationHttpChecker,
            currentUserChecker: authenticator.userAuthChecker
        };

        const httpServer = new HttpServer();
        httpServer.createApp(options, app);

        return httpServer.start(API_PORT, callback);
    }
}