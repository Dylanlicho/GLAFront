export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allUsers: '/users',
      oneUser: '/user/:id',
      oneUserByLogin: '/user/login/:login',
      addUser: '/addUser',
      allArticles: '/articles',
      allArticlesBySeller: '/article/seller/:seller',
      oneArticle: '/article/:id',
      addArticle: '/addArticle',
      deleteArticle: '/deleteArticleById/:id',
      createParticipation: '/addParticipation',
      bestParticipationByIdArticle: '/participation/best/:idArticle',
    }
  }
};
