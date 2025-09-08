import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token== null){
      return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if (err) return res.sendStatus(403)
            req.user= user
            next();
    })
}
/**export function authenticateToken(req, res, next) {

Exports a named middleware.

3rd arg next is how Express continues to the next handler.

const authHeader = req.headers['authorization'];

Reads the incoming Authorization header.

Expected format: Bearer <token>.

May be undefined if the client didn’t send it.

const token = authHeader && authHeader.split(' ')[1];

Safe guard: if authHeader exists, split by space and take the second piece.

If header was Bearer abc.def.ghi, token is abc.def.ghi.

If no header, token becomes undefined.

if (token == NULL) {

❗️Bug: NULL (uppercase) is not a thing in JS and will throw a ReferenceError.

Use one of:

if (token == null) return res.sendStatus(401); // catches null or undefined

or if (!token) return res.sendStatus(401);

jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

Verifies the token:

signature matches your secret

not expired (if you set expiresIn when signing)

user is the decoded payload (e.g., { name: "alice", iat: 169..., exp: ... }).

if (err) return res.sendStatus(403);

If verification fails (bad signature/expired) → Forbidden.

req.user = user;

Attach the decoded payload to the request for downstream routes.

next();

All good → move on to the actual route handler. */