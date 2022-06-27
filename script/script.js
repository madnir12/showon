let ep = $("#ep")
let cp = $("#cp")
let epd = $("#epd")
let cpd = $("#cpd")
let stbact = "stbact"

ep.on("click", ()=>{
    settingbtact(ep,stbact,cp,cpd,epd)
})
//  after clicked wdit profile
cp.on("click", ()=>{
   settingbtact(cp,stbact,ep,epd,cpd)
})


$("#dsmenu").on("click", ()=>{
    $(".side").fadeIn();
})

// functions
function settingbtact(ep,stbact,cp,none,block){
    ep.addClass(stbact)
    cp.removeClass(stbact)
    none.fadeOut()
    block.fadeIn()
    $("#alert").html("")
}