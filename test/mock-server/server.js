#!/usr/bin/env node
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(require("./db.json"));
const middlewares = jsonServer.defaults();
const request = require("request");

if (process.argv.indexOf("--no-write") !== -1) {
    router.db._.prototype.write = function() {
    };
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Custom route processing
server.get("/lottery/weekly", (req, res) => {
    const current = new Date().getTime();
    const min = current + 2 * 24 * 60 * 60 * 1000;
    const max = current + 3 * 24 * 60 * 60 * 1000;

    res.send({
        ...router.db.get("lottery-weekly").value(),
        startsAt: new Date(Math.floor(Math.random() * (max - min)) + min)
    });
});

server.get("/lottery/winners", (req, res) => {
    const winners = [];

    for (let i = 0; i < 10; i++) {
        winners.push({
            username: "User " + (i + 1),
            lottery: "WEEKLY LOTTERY",
            prize: (10 - i) * 1000,
            etherscanURL: "https://etherscan.io/tx/0xb8ec62d4313f177f8a58b5b9dcbec728fb7af2fe2a33b90bf71e153b9cd164d4"
        });
    }

    res.send(winners);
});

server.post("/lottery/chance", (req, res) => {
    const payload = req.body;
    let chance = 11254;

    chance -= payload.tickets * 2;
    chance -= (payload.loteu / 100 * 2);

    res.send({chance});
});

server.post("/lottery/enter", (req, res) => {
    res.send({chance: 10222});
});

server.get("/conversion-rates", (req, res) => {
    request("https://api.cryptonator.com/api/ticker/eur-btc", (error, response, btcBody) => {
        if (error) {
            return res.status(500).send(null);
        }

        request("https://api.cryptonator.com/api/ticker/eur-eth", (error, response, ethBody) => {
            if (error) {
                return res.status(500).send(null);
            }
            try {
                res.send({
                    eth: JSON.parse(ethBody).ticker.price,
                    btc: JSON.parse(btcBody).ticker.price
                });
            } catch (e) {
                res.status(500).send(null);
            }
        });
    });
});

server.post("/payment-info", (req, res) => {
    const cart = req.body;

    const totalEUR = (cart.tickets | 0) * 10
        + (cart.loteoPass | 0) * 520
        + (cart.loteoMaxx10 | 0) * 100
        + (cart.loteoMaxx20 | 0) * 200
        + (cart.loteoMaxx50 | 0) * 500
        + (cart.loteoMaxx100 | 0) * 1000;

    res.send({
        totalEUR,
        totalETH: totalEUR * 0.00828772,
        totalBTC: totalEUR * 0.00029791
    });
});

server.get("/user", (req, res) => {
    const token = req.header("Authorization");

    if (req.query.referral) {
        console.log("Referral: " + req.query.referral);
    }

    request({
        url: "https://dev-rlffg2aa.eu.auth0.com/userinfo",
        headers: {
            Authorization: token,
            ContentType: "application/json"
        }
    }, (error, response, userInfoString) => {
        if (error || response.statusCode !== 200) {
            return res.status(response.statusCode).send(error);
        }

        const userInfo = JSON.parse(userInfoString);

        request({
            url: `https://dev-rlffg2aa.eu.auth0.com/api/v2/users/${userInfo.sub}`,
            headers: {
                Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
                ContentType: "application/json"
            }
        }, (error, response, userDataString) => {
            if (error || response.statusCode !== 200) {
                console.log(userDataString);
                return res.status(response.statusCode).send(error);
            }

            const userData = JSON.parse(userDataString);

            res.send({
                id: userInfo.sub,
                username: userInfo.nickname,
                email: userData.email,
                avatar: userData.user_metadata.avatar || userInfo.picture,
                country: userData.user_metadata.country,
                telegramUsername: userData.user_metadata.telegram_username || "",
                useMFA: userData.user_metadata.use_mfa || false,
                referralCode: userInfo.nickname,
                whitelisted: userData.user_metadata.whitelisted
            });
        });
    });
});

server.post("/user", (req, res) => {
    const user = req.body;

    if (!user.useMFA) {
        request({
            url: "https://dev-rlffg2aa.eu.auth0.com/mfa/authenticators",
            headers: {
                Authorization: req.header("Authorization"),
                ContentType: "application/json"
            }
        }, (error, response, responseBody) => {
            const mfas = JSON.parse(responseBody);
            console.log(mfas);

            mfas.forEach(mfa => {
                request({
                    url: `https://dev-rlffg2aa.eu.auth0.com/api/v2/guardian/enrollments/${mfa.id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
                        ContentType: "application/json"
                    }
                }, (error, response, responseBody) => {
                    console.log(responseBody);
                });
            });
        });
    }

    request({
        url: `https://dev-rlffg2aa.eu.auth0.com/api/v2/users/${user.id}`,
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
            ContentType: "application/json"
        },
        body: {
            user_metadata: {
                avatar: user.avatar,
                telegram_username: user.telegramUsername,
                use_mfa: user.useMFA
            }
        },
        json: true
    }, (error, response, responseBody) => {
        if (error || response.statusCode !== 200) {
            return res.status(response.statusCode).send(responseBody);
        }

        res.send(user);
    });
});

server.post("/wallet/withdraw-eth", (req, res) => {
    const withdrawal = req.body;

    res.send({
        success: true
    });
});

// Custom routes
server.use(jsonServer.rewriter({
    // add your custom routes here e.g.:
    // "/lottery/winners": "/lottery-winners"
}));
// Use default router
server.use(router);
server.listen(8081, () => {
    console.log("JSON Server is running");
});
