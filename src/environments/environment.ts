export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '8080',
    endpoints: {
      allUsers: '/users',
      oneUser: '/user/:id',
      oneUserByLogin: '/user/login/:login',
      addUser: '/auth/register',

      allArticles: '/articles',
      allArticlesBySeller: '/article/seller/:seller',
      allArticlesByName: '/article/name/:name',
      allArticlesByCategory: '/article/category/:category',
      oneArticle: '/article/:id',
      addArticle: '/addArticle',
      deleteArticle: '/deleteArticleById/:id',

      createParticipation: '/addParticipation',
      bestParticipationByIdArticle: '/participation/best/:idArticle',
      participationOf: '/participation/user/:id',
      allCategories: '/categories',

      addOfCategory: '/addOfCategory',

      login: '/auth/login',

      addDelivery: '/addDelivery',
      getDeliveryUser: '/delivery/:id',
      allPromotions: '/promotions'
    }
  }
};
