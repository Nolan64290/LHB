import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

  const { password } = JSON.parse(event.body);

  // Hash le mdp saisi
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  // Compare avec celui en variable d'env
  const correctHash = process.env.PASSWORD_HASH;

  if (hash === correctHash) {
    const filePath = path.resolve("protected-content.html");
    const protectedHtml = fs.readFileSync(filePath, "utf8");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, html: protectedHtml }),
    };
  }

  return { statusCode: 401, body: JSON.stringify({ success: false }) };
}

/*
Fonctions pour hasher un mdp et stocker sa valeur dans les var d'env

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

*/