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
    const query = `
      *[_type == "programme"] | order(date desc)[0]{
        _id,
        date,
        programme_we[]{
          alt,
          asset->{ url }
        },
        resultats_we[]{
          alt,
          asset->{ url }
        }
      }
    `

    const programme = await client.fetch(query)

    if (programme.programme_we) {
      programme.programme_we = programme.programme_we.map((item) => ({
        alt: item.alt,
        urls: transformUrl(item.asset.url)
      }))
    }

    if (programme.resultats_we) {
      programme.resultats_we = programme.resultats_we.map((item) => ({
        alt: item.alt,
        urls: transformUrl(item.asset.url)
      }))
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(programme)
    }
  } catch (error) {
    console.error('Erreur get-programme:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Impossible de récupérer le programme' })
    }
  }
}
