import jwt from "jsonwebtoken";

export const loginHandler= (req, res)=>{
    const username= req.body.username;
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
}
/**export const loginHandler = (req, res) => {

Exports a named function for your routes.

req is the incoming request, res is the response object.

const username = req.body.username;

Reads username from the JSON body.

Works because you enabled express.json() in index.js.

const user = { name: username };

Builds the JWT payload. This object will be encoded into the token.

Tip: in real apps, prefer stable claims like { sub: userId, name: username }.

const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

Creates the JWT:

Header: { alg: "HS256", typ: "JWT" } (default)

Payload: whatever you passed in user plus iat (issued-at)

Signature: HMAC using ACCESS_TOKEN_SECRET

No expiry set here, so the token never expires. Usually you add { expiresIn: "1h" }.

res.json({ accessToken: accessToken });

Sends { "accessToken": "<token>" } as JSON with status 200.

Shorthand is res.json({ accessToken }).

}; */
