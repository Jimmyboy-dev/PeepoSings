(function() {
   function add(data) {
       try {
           if (typeof self.Iconify === 'object' && self.Iconify.addCollection) {
               self.Iconify.addCollection(data);
               return;
           }
           if (typeof self.IconifyPreload === 'undefined') {
               self.IconifyPreload = [];
           }
           self.IconifyPreload.push(data);
       } catch (err) {
       }
   }

})();