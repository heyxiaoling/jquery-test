requirejs.config({
  baseUrl: './res/js/',
  urlArgs: "v=" +  (new Date()).getTime(),
  //urlArgs: 'v=201603081',
  paths:{
    
  },
  map: {
      '*': {
          'css': 'lib/css'
      }
  },
  shim : {
      'lib/msg': ['css!../../css/msg.css'],
  }
})

requirejs(['lib/tap'],function(msg){
   $('#div1').on('click',function(){
      console.log('click');
   })
});
