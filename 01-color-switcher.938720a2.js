const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;let a=null;t.addEventListener("click",(function(){e.hasAttribute("disabled")&&(e.removeAttribute("disabled"),t.setAttribute("disabled","button-disabled"),a=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3))})),e.addEventListener("click",(function(){t.hasAttribute("disabled")&&(t.removeAttribute("disabled"),e.setAttribute("disabled","button-disabled"),clearInterval(a))})),e.setAttribute("disabled","button-disabled");
//# sourceMappingURL=01-color-switcher.938720a2.js.map
