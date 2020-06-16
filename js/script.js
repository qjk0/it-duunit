const container = document.querySelector(".container");
const url =
  "https://paikat.te-palvelut.fi/tpt-api/tyopaikat?valitutAmmattialat=25&valitutAmmattialat=35&ilmoitettuPvm=1&vuokrapaikka=---&sort=ilmoituspaivamaara desc&,%20tehtavanimi%20asc,%20tyonantajanNimi%20asc,%20viimeinenHakupaivamaara%20asc&kentat=ilmoitusnumero,tehtavanimi,tyonantajanNimi,kunta,ilmoituspaivamaara,hakuPaattyy,tyonKesto,tyoaika,maa&ss=true&facet.f&facet.fsort=index&facet.flimit=-1";
const dateNow = moment().format("DD.MM.YYYY");

const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const jobs = data.response.docs;

  jobs.forEach(createJobAd);
};

const createJobAd = (job) => {
  const date = moment(job.ilmoituspaivamaara).format("DD.MM.YYYY");
  const id = job.ilmoitusnumero;
  const employer = job.tyonantajanNimi;
  const jobTitle = job.tehtavanimi;
  const city = job.kunta || "Ei määritelty";
  const workingTime = job.tyoaika;
  const duration = job.tyonKesto || "Ei määritelty";
  const endDate = job.hakuPaattyy || "Ei määritelty";
  const div = document.createElement("div");

  div.innerHTML = `  <a href='https://paikat.te-palvelut.fi/tpt/${id}' target='_blank'>
                  <p><em>Ilmoitettu: ${date} </em></p>
                  <strong>${employer}</strong><br/> 
                  <strong>${jobTitle}</strong>  
                  <p>Kaupunki: ${
    city === "Turku" ? "<strong>Turku</strong>" : city
    }</p> 
                  <p>Työaika: ${workingTime} </p> 
                  <p>Työn kesto: ${duration}</p> 
                  <p>Haku päättyy: ${endDate} </p>
                  </a>`;
  if (date === dateNow) {
    div.classList.add("new-item");
  }

  if (dateNow === endDate) {
    div.classList.add("apply-now");
  }

  div.classList.add("job-item");
  container.appendChild(div);
}

fetchData();