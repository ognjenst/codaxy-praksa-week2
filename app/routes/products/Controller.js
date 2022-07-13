export default () => ({
   onInit() {
      this.loadData();
   },

   async loadData() {
      try {
         const response = await fetch('https://dummyjson.com/products');
         const records = await response.json();
         this.store.set('records', records.products);
      } catch (e) {
         console.error(e);
      }
   },
});
