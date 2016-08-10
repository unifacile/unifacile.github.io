(function(){
   $('footer.footer').find('.footer-nav-toogle').each(function(){
       $(this).click(function(event){
           $(this).toggleClass('nav-open');
       })
   })
})();