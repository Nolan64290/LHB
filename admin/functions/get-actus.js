const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-08-09',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

exports.handler = async () => {
  try {
    const query = `*[_type == "actualite"] | order(date desc){
      _id,
      title,
      date,
      body,
      "images": images[].asset->url
    }`

    const actus = await client.fetch(query)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actus)
    }
  } catch (error) {
    console.error('Erreur get-actus:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Impossible de récupérer les actualités' })
    }
  }
}
