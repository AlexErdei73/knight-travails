(()=>{"use strict";const t=new class{constructor(t){this.boardContainer=t}create(){for(let t=0;t<8;t++)for(let s=0;s<8;s++){const e=document.createElement("div");let i;e.classList.add("board-cell"),i=s%2==0?"bright":"dark",t%2==1&&(i="bright"===i?"dark":"bright"),e.classList.add(i),this.boardContainer.appendChild(e)}}}(document.querySelector(".chess-board")),s=new class{constructor(t){this._positions=[],this.ANIM_STEP_DURATION=500,this.knight=t}putTo(t){const[s,e]=t;let i=`top: ${87.5-12.5*e}%; left: ${12.5*s}%`;this.knight.setAttribute("style",i),this.knight.setAttribute("data-pos",JSON.stringify(t))}moveTo(t){const s=t[0],e=JSON.parse(this.knight.getAttribute("data-pos"))[1];setTimeout((()=>this.putTo([s,e])),0),setTimeout((()=>this.putTo(t)),this.ANIM_STEP_DURATION)}animate(){let t=0;setInterval((()=>{t===this._positions.length&&(t=0,this.knight.classList.remove("animate")),1===t&&this.knight.classList.add("animate");const s=this._positions[t];0===t?this.putTo(s):this.moveTo(s),t++}),3*this.ANIM_STEP_DURATION)}set positions(t){this._positions=t}}(document.querySelector(".knight"));t.create(),s.positions=[[5,5],[6,3],[7,1],[5,2],[3,3]],s.animate();const e=document.querySelector(".form-container"),i=document.querySelector("#btn-swap");i.addEventListener("click",(function(){"Form"===i.textContent?(i.textContent="Chess",t.boardContainer.classList.add("spin-out")):(i.textContent="Form",e.classList.add("spin-out")),setTimeout((()=>{e.classList.toggle("invisible"),t.boardContainer.classList.toggle("invisible")}),500),setTimeout((()=>{e.classList.contains("invisible")?t.boardContainer.classList.remove("spin-out"):e.classList.remove("spin-out")}),520)}));const o=document.querySelector("form");o.addEventListener("submit",(function(t){t.preventDefault();const e=o.elements,i=["start-x","start-y","end-x","end-y"].map((t=>+e.namedItem(t).value));s.positions=[[i[0],i[1]],[i[2],i[3]]],s.animate()}))})();