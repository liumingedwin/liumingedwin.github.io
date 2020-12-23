function adsblock_it(){
  
  setInterval(function(){
var iframes=document.querySelectorAll("iframe")
for (var s=0;s<iframes.length;s++)
iframes[s].hidden=true




var all=document.querySelectorAll("*")
for (var s=0;s<all.length;s++)
{
if(all[s].outerHTML.indexOf("ad")>-1)all[s].hidden=true;

}

  },1000);
}
