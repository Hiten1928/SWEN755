var navObj = {
  msg: "I'm alive",
  time: new Date()
}

function init(){
  var count= 0
  closure: ()=>{
    navObj.time = new Date();
    while(count < 3){
      console.log(count)
      count++;
      setTimeout(closure(),4000)
    }

}
}
module.exports = {
  init: () => 
  {
    init();
  },
  navObj
}
