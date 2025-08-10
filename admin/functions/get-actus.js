const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID, // ID de ton projet Sanity
  dataset: process.env.SANITY_DATASET || 'production', // Nom du dataset
  apiVersion: '2025-08-09', // Date d'aujourd'hui, format YYYY-MM-DD
  useCdn: true, // true = plus rapide mais données pas en temps réel
});

exports.handler = async () => {
  try {
    const query = `*[_type == "actualite"] | order(date desc){
      _id,
      title,
      date,
      body,
      "images": images[].asset->url
    }`;

    const actus = await client.fetch(query);

    return {
      statusCode: 200,
      body: JSON.stringify(actus),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('Erreur get-actus:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Impossible de récupérer les actualités' }),
    };
  }
};
