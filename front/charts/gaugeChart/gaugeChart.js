let temperatura = [];
let umidade = [];
let luminosidade = [];

function getData() {
  fetch("http://localhost:5000/monitoramento/graficomedidor")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        temperatura.push(item.Med_Temperatura);
        umidade.push(item.Med_Umidade);
        luminosidade.push(item.Med_Luminosidade);
      });
      drawGaugeChart();
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}

function drawGaugeChart() {
  google.charts.load("current", { packages: ["gauge"] });
  google.charts.setOnLoadCallback(function () {
    let data = new google.visualization.DataTable();

    data.addColumn("number", "Temperatura");

    data.addColumn("number", "Umidade");

    data.addColumn("number", "Luminosidade");

    for (let i = 0; i < umidade.length; i++) {
      data.addRow([temperatura[i], umidade[i], luminosidade[i]]);
    }

    let options = {
      width: 400,
      height: 120,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5,
    };

    let chart = new google.visualization.Gauge(
      document.getElementById("gauge_chart")
    );

    chart.draw(data, options);
  });
}

getData();
