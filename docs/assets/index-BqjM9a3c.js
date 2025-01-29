(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const i=async a=>{try{const e=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`);if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();return console.log("Fetched data:",t),t}catch(e){console.error("Error fetching data:",e)}},m=async a=>{try{const e=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${a}`);if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();return console.log("Fetched data:",t),t}catch(e){console.error("Error fetching data:",e)}},u=async()=>{try{const a=await fetch("https://www.themealdb.com/api/json/v1/1/random.php");if(!a.ok)throw new Error("Network response was not ok");const e=await a.json();return console.log("Fetched data:",e),e}catch(a){console.error("Error fetching data:",a)}},p=async()=>{const a=Array.from({length:10},()=>u());return{meals:(await Promise.all(a)).map(n=>n.meals[0])}},h=async a=>{try{const e=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`);if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();return console.log("Fetched data:",t),t}catch(e){console.error("Error fetching data:",e)}},f=a=>{const e=a.split(/\.\s+|\.$/).filter(n=>n.trim()!==""),t=document.createElement("ol");return e.forEach(n=>{const o=document.createElement("li");o.textContent=n.trim(),t.appendChild(o)}),t},y=async a=>{let e=null;a.length===1?e=await m(a):e=await i(a),e.meals?c(e.meals):alert("Error: Meal was not found!")},c=a=>{const e=document.getElementById("meal-grid"),t=document.createElement("div");e.innerHTML="",a.forEach(n=>{const o=document.createElement("div"),s=document.createElement("button");s.classList.add("btn","btn-outline-secondary"),s.setAttribute("type","button"),s.setAttribute("data-bs-toggle","modal"),s.setAttribute("data-bs-target","#mealModal"),s.textContent="More Info",o.classList.add("meal-card"),o.innerHTML=`<h3>${n.strMeal}</h3>
            <img src="${n.strMealThumb}" alt="${n.strMeal}"/>`,o.setAttribute("data-id",n.idMeal),o.appendChild(s),o.appendChild(t),e.appendChild(o)}),t.classList.add("modal","fade","modal-lg"),t.id="mealModal",t.setAttribute("tabindex",-1),t.setAttribute("role","dialog"),t.setAttribute("aria-labelledby","mealModal"),t.setAttribute("aria-hidden",!0),t.innerHTML=`
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">None</h5>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `,document.body.appendChild(t)},b=async()=>{const a=await p();c(a.meals)},w=async a=>{const e=await h(a),t=document.querySelector("#mealModal");t.innerHTML=`
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${e.meals[0].strMeal}</h5>
      </div>
      <div class="modal-body-instructions">
       
      </div>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ingredients</h5>
      </div>
      <div class="modal-body-ingredients">
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  `;const n=f(e.meals[0].strInstructions);document.querySelector(".modal-body-instructions").appendChild(n);const s=document.querySelector(".modal-body-ingredients"),r=document.createElement("ul");let l=0;for(;e.meals[0][`strIngredient${l+1}`];){const d=document.createElement("li");d.textContent=e.meals[0][`strIngredient${l+1}`],r.appendChild(d),l++}s.appendChild(r)},g=()=>{const a=document.querySelector("#form-search"),e=document.querySelector("#meal-grid");a.addEventListener("submit",t=>{t.preventDefault();const o=t.target.elements[0].value;y(o)}),e.addEventListener("click",t=>{const n=t.target;let o=null;n.type==="button"&&(document.querySelector("#mealModal"),o=n.parentElement.dataset.id,w(o))}),b()};g();
