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
      oneArticle: '/article/:id',
      addArticle: '/addArticle',
      deleteArticle: '/deleteArticleById/:id',

      createParticipation: '/addParticipation',
      bestParticipationByIdArticle: '/participation/best/:idArticle',

      allCategories: '/categories',

      addOfCategory: '/addOfCategory',

      login: '/auth/login',

      addDelivery: '/addDelivery'
    }
  }
};
