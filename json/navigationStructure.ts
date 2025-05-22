// s_docs/json/navigationStructure.ts

export type NavItemType = 'item' | 'accordion' | 'header';

export interface BaseNavItem {
  type: NavItemType;
  label: string;
}

export interface SingleNavItem extends BaseNavItem {
  type: 'item';
  href: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export interface AccordionNavItem extends BaseNavItem {
  type: 'accordion';
  basePath: string;
  items: (SingleNavItem | NestedAccordionNavItem)[];
}

export interface NestedAccordionNavItem extends BaseNavItem {
  type: 'accordion';
  basePath: string;
  items: SingleNavItem[];
}

export interface HeaderNavItem extends BaseNavItem {
  type: 'header';
}

export type NavigationItem = SingleNavItem | AccordionNavItem | HeaderNavItem;

export const navigationStructure: NavigationItem[] = [
  // --- SECTION OVERVIEW ---
  { type: 'header', label: 'OVERVIEW' },
  { type: 'item', label: 'Introduction', href: '/docs/introduction' },
  { type: 'item', label: 'Getting Started', href: '/docs/getting-started' },
  { type: 'item', label: 'Authentication', href: '/docs/concepts/authentication' },
  { type: 'item', label: 'Error Codes', href: '/docs/concepts/error-codes' },
  { type: 'item', label: 'Pagination & Filtering', href: '/docs/concepts/pagination-filtering' },
  { type: 'item', label: 'Rate Limiting', href: '/docs/concepts/rate-limiting' },

  // --- SECTION SERVER API (s_server) ---
  { type: 'header', label: 'SERVER API (s_server)' },
  {
    type: 'accordion',
    label: 'Auth (Server Owner/Admin)',
    basePath: '/docs/server/auth',
    items: [
      { type: 'item', label: 'Register Owner', href: '/docs/server/auth/register', method: 'POST' }, // AuthController.register
      { type: 'item', label: 'Login', href: '/docs/server/auth/login', method: 'POST' }, // AuthController.login
      { type: 'item', label: 'Get Current User (Me)', href: '/docs/server/auth/me', method: 'GET' }, // AuthController.me
      { type: 'item', label: 'Update My Profile', href: '/docs/server/auth/update-me', method: 'PUT' }, // UsersController.updateMe
      { type: 'item', label: 'Change My Password', href: '/docs/server/auth/change-password', method: 'PUT' }, // UsersController.updateMyPassword
      { type: 'item', label: 'Logout', href: '/docs/server/auth/logout', method: 'POST' }, // AuthController.logout
      { type: 'item', label: 'Logout All Devices', href: '/docs/server/auth/logout-all', method: 'POST' }, // UsersController.logoutAllDevices
      { type: 'item', label: 'Delete My Account', href: '/docs/server/auth/delete-me', method: 'DELETE' }, // UsersController.deleteMe
      { type: 'item', label: 'Google Auth Redirect', href: '/docs/server/auth/google-redirect', method: 'GET' }, // AuthController.google_redirect
      { type: 'item', label: 'Google Auth Callback', href: '/docs/server/auth/google-callback', method: 'GET' }, // AuthController.google_callback (Note: C'est un callback, mais bon à documenter)
      // Les SocialAuthController.googleRedirect et googleCallback sont pour s_api, pas le login owner/admin de s_server directement
    ],
  },
  {
    type: 'accordion',
    label: 'Store Management',
    basePath: '/docs/server/stores',
    items: [
      { type: 'item', label: 'List Stores', href: '/docs/server/stores/list', method: 'GET' },
      { type: 'item', label: 'Create Store', href: '/docs/server/stores/create', method: 'POST' },
      { type: 'item', label: 'Get Store Details', href: '/docs/server/stores/get-one', method: 'GET' }, // {params.id}
      { type: 'item', label: 'Update Store Info', href: '/docs/server/stores/update', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete Store', href: '/docs/server/stores/delete', method: 'DELETE' }, // {params.id}
      { type: 'item', label: 'Update Store Status (Active)', href: '/docs/server/stores/update-status', method: 'POST' }, // {params.id}
      { type: 'item', label: 'Start Store Service', href: '/docs/server/stores/start', method: 'POST' }, // {params.id}
      { type: 'item', label: 'Stop Store Service', href: '/docs/server/stores/stop', method: 'POST' },   // {params.id}
      { type: 'item', label: 'Restart Store Service', href: '/docs/server/stores/restart', method: 'POST' }, // {params.id}
      { type: 'item', label: 'Scale Store Service', href: '/docs/server/stores/scale', method: 'POST' },    // {params.id}
      { type: 'item', label: 'Add Custom Domain', href: '/docs/server/stores/add-domain', method: 'POST' }, // {params.id}
      { type: 'item', label: 'Remove Custom Domain', href: '/docs/server/stores/remove-domain', method: 'DELETE' }, // {params.id}
      { type: 'item', label: 'Change Store Theme', href: '/docs/server/stores/change-theme', method: 'PUT' }, // {params.id} (était POST dans SublymusApi)
      { type: 'item', label: 'Change Store API Version', href: '/docs/server/stores/change-api', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Check Store Name Availability', href: '/docs/server/stores/available-name', method: 'GET' },
    ],
  },
  {
    type: 'accordion',
    label: 'Theme Management (Global)',
    basePath: '/docs/server/themes',
    items: [
      { type: 'item', label: 'List Themes', href: '/docs/server/themes/list', method: 'GET' },
      { type: 'item', label: 'Upsert Theme', href: '/docs/server/themes/upsert', method: 'POST' }, // POST /themes, PUT /themes/:id
      { type: 'item', label: 'Get Theme Details', href: '/docs/server/themes/get-one', method: 'GET' }, // {params.id}
      { type: 'item', label: 'Delete Theme', href: '/docs/server/themes/delete', method: 'DELETE' }, // {params.id}
      { type: 'item', label: 'Update Theme Version (Tag)', href: '/docs/server/themes/update-version', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Update Theme Status (Active)', href: '/docs/server/themes/update-status', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Set Default Theme', href: '/docs/server/themes/set-default', method: 'POST' }, // {params.id}
      { type: 'item', label: 'Start Theme Service', href: '/docs/server/themes/start', method: 'POST' }, // {params.id}
      { type: 'item', label: 'Stop Theme Service', href: '/docs/server/themes/stop', method: 'POST' },   // {params.id}
      { type: 'item', label: 'Restart Theme Service', href: '/docs/server/themes/restart', method: 'POST' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'API Definition Management',
    basePath: '/docs/server/api-definitions',
    items: [
      { type: 'item', label: 'List API Definitions', href: '/docs/server/api-definitions/list', method: 'GET' },
      { type: 'item', label: 'Create API Definition', href: '/docs/server/api-definitions/create', method: 'POST' },
      { type: 'item', label: 'Get API Definition Details', href: '/docs/server/api-definitions/get-one', method: 'GET' }, // {params.id}
      { type: 'item', label: 'Update API Definition', href: '/docs/server/api-definitions/update', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete API Definition', href: '/docs/server/api-definitions/delete', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'User Management (Admin)',
    basePath: '/docs/server/users-admin',
    items: [
      { type: 'item', label: 'List All Users', href: '/docs/server/users-admin/list-all', method: 'GET' }, // UsersController.get_all_users (s_server)
      // Potentiellement d'autres actions admin sur les utilisateurs ici
    ],
  },
  {
    type: 'accordion',
    label: 'Admin Controls',
    basePath: '/docs/server/admin-controls',
    items: [
      { type: 'item', label: 'Ping Store API', href: '/docs/server/admin-controls/ping-store', method: 'POST' }, // {params.storeId}
      { type: 'item', label: 'Logout User From All Devices (Admin)', href: '/docs/server/admin-controls/logout-all-devices', method: 'POST' },
      { type: 'item', label: 'Global Platform Status', href: '/docs/server/admin-controls/global-status', method: 'GET' },
      { type: 'item', label: 'Restart All Services', href: '/docs/server/admin-controls/restart-all-services', method: 'POST' },
      { type: 'item', label: 'Refresh Nginx Configs', href: '/docs/server/admin-controls/refresh-nginx', method: 'POST' },
      { type: 'item', label: 'List Orphan Directories', href: '/docs/server/admin-controls/garbage-collect-dirs-list', method: 'POST' }, // Renommé pour clarté
      { type: 'item', label: 'Delete Orphan Directories', href: '/docs/server/admin-controls/garbage-collect-dirs-delete', method: 'DELETE' },
    ],
  },
  {
    type: 'accordion',
    label: 'Utility Services',
    basePath: '/docs/server/utils',
    items: [
      { type: 'item', label: 'Test Email Sending', href: '/docs/server/utils/test-email', method: 'GET' }, // TryServiceController
    ],
  },

  // --- SECTION STORE API (s_api, pour un client de boutique) ---
  { type: 'header', label: 'STORE API (Client)' },
  {
    type: 'accordion',
    label: 'Auth (Store Client)',
    basePath: '/docs/client/auth',
    items: [
      { type: 'item', label: 'Login Client', href: '/docs/client/auth/login', method: 'POST' },
      { type: 'item', label: 'Register Client', href: '/docs/client/auth/register', method: 'POST' }, // register_mdp
      { type: 'item', label: 'Get Current Client (Me)', href: '/docs/client/auth/me', method: 'GET' },
      { type: 'item', label: 'Update Client Profile', href: '/docs/client/auth/update-me', method: 'PUT' }, // update_user
      { type: 'item', label: 'Verify Email', href: '/docs/client/auth/verify-email', method: 'GET' },
      { type: 'item', label: 'Resend Verification Email', href: '/docs/client/auth/resend-verification', method: 'POST' },
      { type: 'item', label: 'Forgot Password', href: '/docs/client/auth/forgot-password', method: 'POST' },
      { type: 'item', label: 'Reset Password', href: '/docs/client/auth/reset-password', method: 'POST' },
      { type: 'item', label: 'Setup Invited Account', href: '/docs/client/auth/setup-account', method: 'POST' },
      { type: 'item', label: 'Logout Client', href: '/docs/client/auth/logout', method: 'POST' },
      { type: 'item', label: 'Logout All Client Devices', href: '/docs/client/auth/logout-all', method: 'POST' },
      { type: 'item', label: 'Delete Client Account', href: '/docs/client/auth/delete-account', method: 'DELETE' },
      // Le redirect Google pour client est initié par s_server, le callback aussi.
      // S_api a un endpoint INTERNE `_internal/social-callback` qui n'est pas pour la doc publique.
    ],
  },
  {
    type: 'accordion',
    label: 'Products',
    basePath: '/docs/client/products',
    items: [
      { type: 'item', label: 'List Products', href: '/docs/client/products/list', method: 'GET' },
      { type: 'item', label: 'Get Product Details', href: '/docs/client/products/get-one', method: 'GET' }, // ID ou Slug
      // Les actions de création/MAJ/suppression de produit sont pour les admins/collabs, pas l'API client publique
      { type: 'item', label: 'Create Product (Admin)', href: '/docs/client/products/create', method: 'POST' },
      { type: 'item', label: 'Update Product (Admin)', href: '/docs/client/products/update', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete Product (Admin)', href: '/docs/client/products/delete', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Categories',
    basePath: '/docs/client/categories',
    items: [
      { type: 'item', label: 'List Categories', href: '/docs/client/categories/list', method: 'GET' },
      { type: 'item', label: 'Get Sub-Categories', href: '/docs/client/categories/get-sub', method: 'GET' },
      { type: 'item', label: 'Get Category Filters', href: '/docs/client/categories/get-filters', method: 'GET' },
      // Les actions de création/MAJ/suppression sont pour les admins/collabs
      { type: 'item', label: 'Create Category (Admin)', href: '/docs/client/categories/create', method: 'POST' },
      { type: 'item', label: 'Update Category (Admin)', href: '/docs/client/categories/update', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete Category (Admin)', href: '/docs/client/categories/delete', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Product Features & Values (Admin)', // Généralement gestion admin
    basePath: '/docs/client/features',
    items: [
      { type: 'item', label: 'List Features (Product)', href: '/docs/client/features/list-for-product', method: 'GET' },
      { type: 'item', label: 'List Features with Values (Product)', href: '/docs/client/features/list-with-values', method: 'GET' },
      { type: 'item', label: 'Multiple Update Features/Values', href: '/docs/client/features/multiple-update', method: 'POST' },
      // CRUD individuels pour Feature et Value (généralement pour admin)
      { type: 'item', label: 'Create Feature', href: '/docs/client/features/create-feature', method: 'POST' },
      { type: 'item', label: 'Update Feature', href: '/docs/client/features/update-feature', method: 'POST' }, // Body contient feature_id
      { type: 'item', label: 'Delete Feature', href: '/docs/client/features/delete-feature', method: 'POST' }, // Body contient feature_id
      { type: 'item', label: 'Create Value for Feature', href: '/docs/client/features/create-value', method: 'POST' },
      { type: 'item', label: 'Update Value', href: '/docs/client/features/update-value', method: 'POST' }, // Body contient value_id
      { type: 'item', label: 'Delete Value', href: '/docs/client/features/delete-value', method: 'POST' }, // Body contient value_id
    ],
  },
  {
    type: 'accordion',
    label: 'Product Details (Sections Info - Admin)',
    basePath: '/docs/client/product-details',
    items: [
        { type: 'item', label: 'List Details for Product', href: '/docs/client/product-details/list', method: 'GET' },
        { type: 'item', label: 'Create Detail', href: '/docs/client/product-details/create', method: 'POST' },
        { type: 'item', label: 'Update Detail', href: '/docs/client/product-details/update', method: 'PUT' }, // {params.id}
        { type: 'item', label: 'Delete Detail', href: '/docs/client/product-details/delete', method: 'DELETE' }, // {params.id}
    ]
  },
  {
    type: 'accordion',
    label: 'Cart',
    basePath: '/docs/client/cart',
    items: [
      { type: 'item', label: 'View Cart', href: '/docs/client/cart/view', method: 'GET' },
      { type: 'item', label: 'Update Cart', href: '/docs/client/cart/update', method: 'POST' },
      { type: 'item', label: 'Merge Cart on Login', href: '/docs/client/cart/merge', method: 'POST' },
    ],
  },
  {
    type: 'accordion',
    label: 'Orders',
    basePath: '/docs/client/orders',
    items: [
      { type: 'item', label: 'Create Order', href: '/docs/client/orders/create', method: 'POST' },
      { type: 'item', label: 'List My Orders', href: '/docs/client/orders/my-list', method: 'GET' },
      // Les actions "get all orders", "update status", "delete order" sont pour admin/collab
      { type: 'item', label: 'List All Orders (Admin)', href: '/docs/client/orders/list-all', method: 'GET' },
      { type: 'item', label: 'Update Order Status (Admin)', href: '/docs/client/orders/update-status', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete Order (Admin)', href: '/docs/client/orders/delete-order', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Comments',
    basePath: '/docs/client/comments',
    items: [
      { type: 'item', label: 'Create Comment', href: '/docs/client/comments/create', method: 'POST' },
      { type: 'item', label: 'Get My Comment for Item', href: '/docs/client/comments/get-for-item', method: 'GET' },
      { type: 'item', label: 'List Comments (Product/All)', href: '/docs/client/comments/list', method: 'GET' },
      { type: 'item', label: 'Update My Comment', href: '/docs/client/comments/update', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete My Comment / Admin Delete', href: '/docs/client/comments/delete', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Favorites',
    basePath: '/docs/client/favorites',
    items: [
      { type: 'item', label: 'Add Favorite', href: '/docs/client/favorites/add', method: 'POST' },
      { type: 'item', label: 'List My Favorites', href: '/docs/client/favorites/list', method: 'GET' },
      { type: 'item', label: 'Update Favorite Label', href: '/docs/client/favorites/update', method: 'PUT' }, // Body contient favorite_id
      { type: 'item', label: 'Remove Favorite', href: '/docs/client/favorites/remove', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'User Profile (Client Actions)',
    basePath: '/docs/client/user-profile',
    items: [
      // UserAddressesController
      { type: 'item', label: 'Create My Address', href: '/docs/client/user-profile/addresses/create', method: 'POST' },
      { type: 'item', label: 'List My Addresses', href: '/docs/client/user-profile/addresses/list', method: 'GET' },
      { type: 'item', label: 'Update My Address', href: '/docs/client/user-profile/addresses/update', method: 'PUT' }, // Body contient id
      { type: 'item', label: 'Delete My Address', href: '/docs/client/user-profile/addresses/delete', method: 'DELETE' }, // {params.id}
      // UserPhonesController
      { type: 'item', label: 'Create My Phone', href: '/docs/client/user-profile/phones/create', method: 'POST' },
      { type: 'item', label: 'List My Phones', href: '/docs/client/user-profile/phones/list', method: 'GET' },
      { type: 'item', label: 'Update My Phone', href: '/docs/client/user-profile/phones/update', method: 'PUT' }, // Body contient id
      { type: 'item', label: 'Delete My Phone', href: '/docs/client/user-profile/phones/delete', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Collaborators (Store Admin)',
    basePath: '/docs/client/collaborators',
    items: [
      { type: 'item', label: 'List Collaborators', href: '/docs/client/collaborators/list', method: 'GET' },
      { type: 'item', label: 'Create/Invite Collaborator', href: '/docs/client/collaborators/create', method: 'POST' },
      { type: 'item', label: 'Update Collaborator Permissions', href: '/docs/client/collaborators/update-permissions', method: 'POST' },
      { type: 'item', label: 'Remove Collaborator', href: '/docs/client/collaborators/remove', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Inventories (Store Admin)',
    basePath: '/docs/client/inventories',
    items: [
      { type: 'item', label: 'Create Inventory Point', href: '/docs/client/inventories/create', method: 'POST' },
      { type: 'item', label: 'List Inventory Points', href: '/docs/client/inventories/list', method: 'GET' },
      { type: 'item', label: 'Get Inventory Point Details', href: '/docs/client/inventories/get-one', method: 'GET' }, // {params.id}
      { type: 'item', label: 'Update Inventory Point', href: '/docs/client/inventories/update', method: 'PUT' }, // {params.id}
      { type: 'item', label: 'Delete Inventory Point', href: '/docs/client/inventories/delete', method: 'DELETE' }, // {params.id}
    ],
  },
  {
    type: 'accordion',
    label: 'Store Statistics (Admin)',
    basePath: '/docs/client/statistics',
    items: [
      { type: 'item', label: 'Get KPIs', href: '/docs/client/statistics/kpi', method: 'GET' },
      { type: 'item', label: 'Get Visit Details', href: '/docs/client/statistics/visits', method: 'GET' },
      { type: 'item', label: 'Get Order Details', href: '/docs/client/statistics/orders', method: 'GET' },
      { type: 'item', label: 'Get Visits Summary (Legacy)', href: '/docs/client/statistics/visits-summary', method: 'GET' },
      { type: 'item', label: 'Get Client Statistics (Global for Store)', href: '/docs/client/statistics/clients-stats', method: 'GET' }, // UsersController.clients_stats
    ],
  },
  {
    type: 'accordion',
    label: 'Store General',
    basePath: '/docs/client/general',
    items: [
      { type: 'item', label: 'Global Search (In Store)', href: '/docs/client/general/global-search', method: 'GET' },
      { type: 'item', label: 'Import Store Data (Admin)', href: '/docs/client/general/import-store', method: 'POST' },
      { type: 'item', label: 'Export Store Data (Admin)', href: '/docs/client/general/export-store', method: 'GET' },
    ],
  },
  {
    type: 'accordion',
    label: 'Store Debug (Admin/Dev)',
    basePath: '/docs/client/debug',
    items: [
      { type: 'item', label: 'Request Scale Up', href: '/docs/client/debug/scale-up', method: 'GET' },
      { type: 'item', label: 'Request Scale Down', href: '/docs/client/debug/scale-down', method: 'GET' },
    ],
  },
];