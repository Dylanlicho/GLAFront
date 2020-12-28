export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allUsers: '/users',
      oneUser: '/user/:id',
      addUser: '/addUser',
      allArticles: '/articles',
      oneArticle: '/article/:id',
    }
  }
};
