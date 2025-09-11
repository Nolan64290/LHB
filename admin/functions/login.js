import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

    let password;
    try {
    password = JSON.parse(event.body).password;
    } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: "Mauvais JSON" }) };
    }


  // Vérification du mot de passe (triple égal !)
  if (password === process.env.PASSWORD) {
    // Lecture du fichier HTML protégé
    const filePath = path.resolve("./admin/functions/protected-content.html"); 
    const protectedHtml = fs.readFileSync(filePath, "utf8");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, html: protectedHtml }),
    };
  }

  return { statusCode: 401, body: JSON.stringify({ success: false }) };
}