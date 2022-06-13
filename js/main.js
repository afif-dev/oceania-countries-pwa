window.addEventListener("load", () => {
  registerSW();
});

// Register the Service Worker
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("service-worker.js");
      await console.log("Service worker registered! 😎");
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err);
    }
  }
}

// view country list
viewCountryList();
async function viewCountryList() {
  let listsEl = document.querySelector("#country-lists");
  let content = "";
  if (listsEl) {
    data = await countryLists(); // get data
    data.forEach((item, index) => {
      content += `
    <div>
        <div class="uk-card uk-card-default f32">
            <div class="uk-card-body">
                <h3 class="uk-card-title"><span class="flag ${item.code.toLowerCase()}"></span> ${item.country}</h3>
                <p>${item.short_content}</p>
                <div>
                   <a id="country-btn" href="#country-modal-full" data-country="${index}" uk-toggle class="uk-button uk-button-default uk-width-1-1">Read more <span uk-icon="arrow-right"></span></a> 
                </div>
            </div>
        </div>
    </div>
    `;
    });
    listsEl.innerHTML += content;
  }
  let country_modal_content = document.querySelector("#country-modal-full .modal-content");
  document.querySelectorAll("#country-btn").forEach((e) => {
    e.addEventListener("click", () => {
      let id = e.getAttribute("data-country");
      let selected_data = data[id];
      country_modal_content.innerHTML =
        `<h3>${selected_data.country}</h3>
      <p>Capital City: ${selected_data.capital}</p>
      <p>Flag: <span class="uk-text-middle flag ${selected_data.code.toLowerCase()}"></span></p>
      <p>ISO Code: ${selected_data.code}</p>
      <p>
        <a href="${selected_data.map_url}" target="_blank" class="uk-button uk-button-danger"><span uk-icon="location" ratio="0.75"></span> Maps</a> ` +
        (selected_data.gov_url != "" ? `<a href="${selected_data.gov_url}" target="_blank" class="uk-button uk-button-primary"><span uk-icon="home" ratio="0.75"></span> Gov site</a>` : ``) +
        (selected_data.travel_url != ""
          ? ` 
        <a href="${selected_data.travel_url}" target="_blank" class="uk-button uk-button-secondary"><span uk-icon="world" ratio="0.75"></span> Travel site</a> `
          : ``) +
        `</p>
      <p>${selected_data.content}</p>
      `;
    });
  });
}

// get country list data
async function countryLists() {
  let url = "data/oceania.json";
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// view Australia List
viewaAustraliaList();
async function viewaAustraliaList() {
  let listsEl = document.querySelector("#australia-lists");
  let content = "";
  if (listsEl) {
    data = await australiaLists(); // get data
    await data.forEach((item, index) => {
      content +=
        `
    <div>
        <div class="uk-card uk-card-default">
            <div class="uk-card-body">
                <h4>${index + 1}. ${item.name}</h4>
                <p uk-margin>
                   <a href="https://www.google.com/maps/place/${item.name}, Australia" target="_blank" class="uk-button uk-button-danger uk-width-auto@s uk-width-1-1"><span uk-icon="location" ratio="0.75"></span> Maps</a> ` +
        (item.travel_url != undefined ? `<a href="${item.travel_url}" target="_blank" class="uk-button uk-button-default uk-width-auto@s uk-width-1-1"><span uk-icon="world" ratio="0.75"></span> Visit</a>` : ``) +
        `</p>
            </div>
        </div>
    </div>
    `;
    });
    listsEl.innerHTML = content;
  }
}

// get australia data
async function australiaLists() {
  let url = "data/au.json";
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// view New Zealand List
viewaNzdList();
async function viewaNzdList() {
  let listsEl = document.querySelector("#nzd-lists");
  let content = "";
  if (listsEl) {
    data = await nzdLists(); // get data
    await data.forEach((item, index) => {
      content +=
        `
    <div>
        <div class="uk-card uk-card-default">
            <div class="uk-card-body">
                <h4>${index + 1}. ${item.name}</h4>
                <p uk-margin>
                   <a href="https://www.google.com/maps/place/${item.name}, New Zealand" target="_blank" class="uk-button uk-button-danger uk-width-auto@s uk-width-1-1"><span uk-icon="location" ratio="0.75"></span> Maps</a> ` +
        (item.travel_url != undefined ? `<a href="${item.travel_url}" target="_blank" class="uk-button uk-button-default uk-width-auto@s uk-width-1-1"><span uk-icon="world" ratio="0.75"></span> Visit</a>` : ``) +
        `</p>
            </div>
        </div>
    </div>
    `;
    });
    listsEl.innerHTML = content;
  }
}

// get New Zealand data
async function nzdLists() {
  let url = "data/nz.json";
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// set full content size when browser resize
fullContentSize();
window.onresize = fullContentSize;
function fullContentSize() {
  let headerEl = document.querySelector("header");
  let footerEl = document.querySelector("footer");
  let headerHeight = headerEl.offsetHeight;
  let footerHeight = footerEl.offsetHeight;
  let bodyHeight = window.innerHeight - 2;
  let contentHeight = bodyHeight - (headerHeight + footerHeight);

  let mapsEl = document.querySelector("#maps-full iframe");
  if (mapsEl) {
    mapsEl.setAttribute("width", "100%");
    mapsEl.setAttribute("height", contentHeight + "px");
  }
}
