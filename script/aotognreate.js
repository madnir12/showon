$(document).ready(function(){
    // getting url page
    let page = window.location.pathname;
    // variable for post
    let pbody = ` <article class="post-body" id="pbody">
    <div class="thumbnail">
        <div class="date">
            <span>published at: 13/3/2022</span>
        </div>
    <img src="https://media.istockphoto.com/photos/woman-hands-praying-for-blessing-from-god-on-sunset-background-picture-id1127245421?b=1&k=20&m=1127245421&s=170667a&w=0&h=aWmPeAuBDB2FPP7hjsqeGsE6eqlqi3Q0nG-w6Ft4HFY=" alt="">
    </div>
    <div class="tcb">
        <h3 class="ptitle"><a href="#">Post title
            Numquam.</a> </h3>
    <p>l facilis quam voluptatem explicabo! Earum quos quaerat sunt mollitia
        voluptatem recusandae explicabo necessitatibus!
    </p>
    <div class="rmbutton">
   /     <a href="#" class="button">Read More</a>
    </div>
   
    </div>
   
   
    </article>`;
    // genrating posts
    if(page.includes("Blog")){
        let pct = 1;
        let max = 12;
        let pcontainer = document.getElementById("pcontainer")
        genratef(pct, max, pcontainer, pbody );
    }
 




// variable for android course card

let aitem = `  <div class="courseitem">
 <i class="fa fa-android"></i>
 <h2 class="cititle">Android Develapment</h2>
 <p class="cdesc">After this course you can start building your own app,Enroll this course today</p>
 <p class="cprice">Rs.5000</p>
 <p class="cfree">free for limited time</p>
 <a href="#" class="button"><i class="fa fa-play"></i> Watch Now</a>
 </div>`;

  // variable for pc course card
  let pitem = ` <div class="courseitem">
  <i class="fa fa-windows"></i>
  <h2 class="cititle">Pc Software Develapment</h2>
  <p class="cdesc">After this course you can start building your own app,Enroll this course today</p>
  <p class="cprice">Rs.5000</p>
  <p class="cfree">free for limited time</p>
  <a href="#" class="button"><i class="fa fa-play"></i> Watch Now</a>
 </div>`;
 // variable for web course card
 let witem = `  <div class="courseitem">
 <i class="fa fa-code"></i>
 <h2 class="cititle">Web Develapment</h2>
 <p class="cdesc">After this course you can start building your own app,Enroll this course today</p>
 <p class="cprice">Rs.5000</p>
 <p class="cfree">free for limited time</p>
 <a href="#" class="button"><i class="fa fa-play"></i> Watch Now</a>
</div>`;
 // genrating android and pc and web courses cards
  if(page.includes("Courses")){
    let act = 1;
    // getting android inner
    let ainner = document.getElementById("and")
    // getting pc inner
    let pinner = document.getElementById("pcinner")
    // getting web inner
    let winner = document.getElementById('webinner')
    let amax = 6
    // genrating android cards
    genratef(act,amax,ainner,aitem);
    //genrating pc cards 
    genratef(act,amax,pinner,pitem);
    // genrating web cards
    genratef(act,amax,winner,witem);
  }





   // function to genrate
  function genratef(acn,max, and, anditem){
    while(acn < max){
        and.innerHTML += anditem;
        acn++;
    }
    acn=1;
}

  });
  




