export default () => ({
   onInit() {
      this.loadData();
   },

   async loadData() {
      try {
         let response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100');
         let articles = await response.json();

         response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10');
         let users = await response.json();

         articles.forEach((article) => {
            article.author = users.find((user) => user.id === article.userId).name;
         });

         this.store.set('articles', articles);
      } catch (e) {
         console.error(e);
      }
   },
});
