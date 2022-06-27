$(document).ready(function () {
  // navbar toggle effect on mobile  
  $("#menu").click(function () {
    $("#nav-links").slideToggle(500)

  });

  // slide show
  let slides = $('.slide');
  let num = 1;
  
  setInterval(() => {
    
      for(let y of slides){
        $(y).fadeOut('fast');
  
      };
       $(slides[num]).fadeIn('fast');
       if(num < slides.length-1){
        num++;
        }
        else{
            num = 0;
        }
        
    
  }, 5000);
  
  // navbar effect on scrolling
  $(window).scroll(()=>{
    $(".navbar").toggleClass('navscrolled', $(this).scrollTop() > 50)
  });
  // Search box effect
  $('#searchbox').click(()=>{
    $('.lbsearch').hide();
  
  });
  
  // 
  $(document).mouseup((e)=>{
    let lb = $('.lbsearch')
    let ls = $("#searchbox").val()
    if(!lb.is(e.target)&&ls=="" &&lb.has(e.target).length==0) {
      $(lb).show()
    }
  });
    
  

});





