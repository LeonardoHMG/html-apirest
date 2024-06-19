let dispositivo = [];
let totalRegistros = [];

function getData() {
  fetch("http://localhost:5000/monitoramento/graficopizza")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        dispositivo.push(item.dispositivo);
        totalRegistros.push(item.TotalRegistros);
      });
      drawPieChart();
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}

function drawPieChart() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(function () {
    
    let data = new google.visualization.DataTable();

    data.addColumn("string", "Dispositivo");

    data.addColumn("number", "Total de Registros");

    for (let i = 0; i < dispositivo.length; i++) {
      data.addRow([dispositivo[i], totalRegistros[i]]);
    }

    let options = {
      title: "Gráfico Pizza - Totalização de Registro por Dispositivo",
      width: 700,
      height: 200
    };

    let chart = new google.visualization.PieChart(
      document.getElementById("pie_chart")
    );

    chart.draw(data, options);
  });
}

getData();
