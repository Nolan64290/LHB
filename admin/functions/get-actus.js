const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-08-09',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

const transformUrl = (url) => `${url}?w=1200&auto=format`

exports.handler = async () => {
  try {
    const query = `*[_type == "actualite"] | order(date desc){
        _id,
        titre,
        date,
        contenu,
        images[]{ 
            alt,
            asset->{ url }
        }
    }`

    let actus = await client.fetch(query)

    actus = actus.map(actu => ({
      ...actu,
      images: actu.images?.map(img => ({
        alt: img.alt,
        url: transformUrl(img.asset.url)
      })) || []
    }))

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
