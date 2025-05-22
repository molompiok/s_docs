// s_docs/pages/docs/client/products/get-one.page.tsx
import ApiPageBuilder from '../../../../../components/EndpointDisplay/ApiPageBuilder';
import { EndpointData, ResponseDefinition } from '../../../../../components/EndpointDisplay/types'; // ou chemin vers ApiPageBuilder si types y sont

const endpointData: EndpointData = {
  title: 'Get Product Details',
  method: 'GET',
  path: '/api/v1/products/{productId}', // Ou {{store_api_url}}/api/v1/products/{productId}
  description: 'Retrieves the details of a specific product by its ID or slug.',
  status: 'stable',

  security: {
    type: 'Bearer Token (Optional)',
    description: 'Authentication might be required depending on product visibility settings.',
  },

  pathParameters: [ // NOUVEAU
    {
      name: 'productId',
      type: 'string (UUID or Slug)',
      required: true,
      description: 'The unique identifier (UUID) or slug of the product.',
      example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef ou mon-super-produit',
    },
  ],

  queryParameters: [ // NOUVEAU
    {
      name: 'with_feature',
      type: 'boolean',
      required: false,
      description: 'If true, includes product features and their values in the response.',
      defaultValue: 'false',
      example: 'true',
    },
    {
      name: 'slug', // Si on veut permettre de chercher par slug via query param au lieu de path
      type: 'string',
      required: false,
      description: 'Alternatively, retrieve product by its slug (if productId path param is not used).',
    },
  ],

  requestHeaders: [ // NOUVEAU
    {
      name: 'Accept-Language',
      type: 'string',
      required: false,
      description: 'Preferred language for localized content (e.g., "fr-FR, fr;q=0.9").',
      example: 'fr-CI',
    },
  ],

  // requestBody: null, // Pas de body pour un GET

  responses: [
    {
      statusCode: 200,
      description: 'Product details retrieved successfully.',
      contentType: 'application/json',
      headers: [ // NOUVEAU pour les réponses
        { name: 'ETag', type: 'string', description: 'An identifier for a specific version of a resource.' },
        { name: 'Cache-Control', type: 'string', description: 'Directives for caching mechanisms.' },
      ],
      // Le schema ici serait la définition de ProductInterface
      schema: { /* ... Définition de ProductInterface ... */ },
      exampleJson: JSON.stringify({
        id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        name: 'Super Produit',
        description: 'Un produit vraiment incroyable.',
        price: 19.99,
        // ... autres champs du produit
      }, null, 2),
    },
    {
      statusCode: 404,
      description: 'Product not found.',
      contentType: 'application/json',
      exampleJson: JSON.stringify({ message: "Le produit demandé n'a pas été trouvé." }, null, 2),
    },
  ],

  codeExamples: [ /* ... */ ],
  notes: ["If both `productId` in the path and `slug` in the query are provided, the `productId` in the path takes precedence."],
};

export const title = `API Docs: ${endpointData.title}`;
const Page = () => <ApiPageBuilder endpointData={endpointData} />;
export  {Page};