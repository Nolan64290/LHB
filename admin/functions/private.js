import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`)
);

export const handler = async (event) => {
  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token");

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      audience: process.env.AUTH0_AUDIENCE
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Contenu privé ✅",
        user: payload
      })
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Unauthorized ❌",
        details: err.message
      })
    };
  }
};