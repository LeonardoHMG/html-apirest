let dispositivo = [];
let totalRegistros = [];

function getData() {
  fetch("http://localhost:5000/monitoramento/graficolinhas")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        dispositivo.push(item.dispositivo);
        totalRegistros.push(item.TotalRegistros);
      });
      drawLineChart();
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}

function drawLineChart() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(function () {
    
    let data = new google.visualization.DataTable();

    data.addColumn("string", "Dispositivo");

    data.addColumn("number", "Total de Registros");

    for (let i = 0; i < dispositivo.length; i++) {
      data.addRow([dispositivo[i], totalRegistros[i]]);
    }

    let options = {
      title: 'Gráfico Linhas - Totalização de Registro por Dispositivo',
      hAxis: {
        title: 'Dispositivo',
      },
      vAxis: {
        title: 'Total',
        minValue: 0,
      },
      fontName: 'Arial',
      fontSize: 14,
      areaOpacity: 0.2,
      legend: { position: 'top', textStyle: { fontSize: 14 } },
    };

    let chart = new google.visualization.LineChart(
      document.getElementById('line_chart')
    );

    chart.draw(data, options);
  });
}

getData();
