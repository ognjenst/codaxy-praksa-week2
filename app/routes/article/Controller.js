export default () => ({
   onInit() {
      const articleId = this.store.get('$route.id');
      this.loadData(articleId);
   },

   async loadData(articleId) {
      if (!articleId) return;

      try {
         let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${articleId}`);
         let article = await response.json();
         this.store.set('article', article);
      } catch (e) {
         console.error(e);
      }
   },
});
