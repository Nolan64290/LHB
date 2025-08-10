export default {
  name: 'actualite',
  type: 'document',
  title: 'Actualité',
  fields: [
    {
      name: 'date',
      type: 'datetime',
      title: 'Date de publication',
      initialValue: () => new Date().toISOString(), // date du jour par défaut
    },
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
      validation: Rule => Rule.required().error('Le titre est obligatoire')
    },
    {
      name: 'contenu',
      type: 'text',
      title: 'Contenu',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Galerie d’images (max 3)',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif'
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3).warning('Maximum 3 images'),
    }
  ],
  preview: {
    select: {
      title: 'titre',
      date: 'date',
      media: 'images.0' // première image comme vignette
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : '',
        media
      }
    }
  }
}
