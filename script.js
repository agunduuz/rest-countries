document.querySelector('#btnSearch').addEventListener('click', () => {
  let text = document.querySelector('#txtSearch').value;
  getCountry(text);
});
function getCountry(country) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v3.1/name/' + country);
  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data[0]);

    const countries = data[0].borders.toString();

    const req = new XMLHttpRequest();
    req.open('GET', 'https://restcountries.com/v3.1/alpha?codes=' + countries);
    req.send();

    req.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      renderNeighbors(data);
    });
  });
}

function renderCountry(data) {
  let html = `
            <section class="card-header">
                <h5>Search Result</h5>
            </section>
            <section class="card-body">
                <aside class="row">
                    <div class="col-4">
                        <img src="${data.flags.png}" alt="" class="img-fluid" />
                    </div>
                    <div class="col-8">
                        <h3 class="card-title">${data.name.common} (${
    data.altSpellings[0]
  })
  </h3>
                        <hr />
                        <div class="row">
                            <div class="col-4">Population: </div>
                            <div class="col-8">${data.population}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Capital: </div>
                            <div class="col-8"> ${data.capital[0]}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Language: </div>
                            <div class="col-8"> ${Object.values(
                              data.languages
                            )}</div>
                        </div>
                    </div>
                </aside>
            </section>
`;

  document.querySelector('#country-details').innerHTML = html;
}

function renderNeighbors(data) {
  let html = '';
  for (let country of data) {
    html += `
        <div class="col-2 mt-2">
            <div class="card">
                <img src="${country.flags.png}" class="card-img-top">
                <div class="card-body">
                    <h6 class="card-title">${country.name.common}</h6>
                </div>
            </div>
        </div>
        
        `;
  }
  document.querySelector('#neighbors').innerHTML = html;
}
