!function(){let t;let e=document.getElementById("startButton"),d=document.getElementById("stopButton"),n=document.body;e.addEventListener("click",()=>{e.disabled=!0,d.disabled=!1,t=setInterval(()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`},1e3)}),d.addEventListener("click",()=>{e.disabled=!1,d.disabled=!0,clearInterval(t)})}();
//# sourceMappingURL=01-color-switcher.e464bf65.js.map