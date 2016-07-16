/*amd cmd 支持检测*/
!function(a,b){
	'object'=== typeof module && 'object' === typeof module.exports ? module.exports = a.document?b(a,!0):function(a){
		if(a.document){
            throw new Error("jQuery requires a window with a document");
		}
		return b(a);
	}:b(a);
}('undefined' !== typeof window ? window : this, fucntion(){

})


//引入animate.css
function testAnimate(x){
    $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });
}
/*base.js*/
(function(a){
   var g = {
   		classType:function(){
   			var a = {};
   			'Undefined Boolean String Number Array Function Date Null RegExp Object Error Symbol'.split(' ').forEach(function(item,i){
   				a['Object '+item] = item.toLowerCase();
   			});
   			return a	
   		}(),
   		type:function(obj){
   			return g.classType[Object.prototype.toString.call(obj)];
   		},
   		isArray:function(obj){
   			return Object.prototype.toString.call(obj) === '[object Array]'
   		},
   		each:function(n,r,q){
   			 if (g.isArray(n)) {
                for (var p = 0, m = n.length; p < m; p++) {
                    try {
                        if (r.call(q, n[p], p, n) === false) {
                            return
                        }
                    } catch (s) {
                        f.log(s, "error")
                    }
                }
            } else {
            	console.log(n)
                for (var o in n) {
                    if (!n.hasOwnProperty(o)) {
                        continue
                    }
                    try {
                        if (r.call(q, n[o], o, n) === false) {
                            return
                        }
                    } catch (s) {
                        //f.log(s, "error")
                    }
                }
            }
   		}
   }	

  var f = a.M = a.M || {};
  f.modules = {};

  var e = {
  	require:function(){
       
  	},
  	define:function(l,m){
  		if(arguments.lengt<1){
  			m = l;
  		}
  		if(!l){//匿名模块
  			m.call(null);
  			return;
  		}
  		!f.modules[l]&&(f.modules[l] = {});
  		f.modules[l]['factory'] = m;
  	},
  	exports:function(l){
  		if(f.modules[l]&&f.modules[l].exports){
  			return f.modules[l].exports
  		}
  	},
  	defineModule:function(){
  		g.each(f.modules,function(item,i){
  			console.log(i)
  			var n = f.moudles[i];
  			console.log(n)
  			 if (!n.exports && n.factory) {
                n.exports = {};
                var l = n.factory.call(null , n.exports);
                l && (n.exports = l)
            }	
  		})
  	}	
  }
   f.define = function() {
        return e.define.apply(null , arguments)
    };
     f.defineModule = function() {
        return e.defineModule.apply(null , arguments)
    };
  
})(window)

M.define('index',function(exports){
	exports = {name:'dog'}
})
M.defineModule();
console.log(M.modules)