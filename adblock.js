function adsblock_it(){
  
  setInterval(function(){
var iframes=document.querySelectorAll("iframe")
for (var i = iframes.length-1;i >=0;i--) { 
iframes[i].remove(); 
} 




var all=document.querySelectorAll("*")
for (var s=0;s<all.length;s++)
{
if(all[s].outerHTML.indexOf("ad")>-1)all[s].hidden=true;

}

  },10);
}
