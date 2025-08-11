export default {
  name: 'programme',
  title: 'Programme & Résultats du week-end',
  type: 'document',
  fields: [
    {
      name: 'programme_we',
      title: 'Programme du week-end prochain (2 à 3 images)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texte alternatif' }
          ]
        }
      ],
      validation: Rule => Rule.max(3).warning('Maximum 3 images')
    },
    {
      name: 'resultats_we',
      title: 'Résultats du week-end précédent (2 images)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texte alternatif' }
          ]
        }
      ],
      validation: Rule => Rule.max(2).warning('Maximum 2 images')
    },
    {
      name: 'date',
      title: 'Date de publication',
      type: 'datetime'
    }
  ]
}
