let dispositivo = [];
let totalRegistros = [];

function getData() {
  fetch("http://localhost:5000/monitoramento/graficobarra")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        dispositivo.push(item.dispositivo);
        totalRegistros.push(item.TotalRegistros);
      });
      drawBarChart();
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}

function drawBarChart() {
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(function () {
    
    let data = new google.visualization.DataTable();

    data.addColumn("string", "Dispositivo");

    data.addColumn("number", "Total de Registros");

    for (let i = 0; i < dispositivo.length; i++) {
      data.addRow([dispositivo[i], totalRegistros[i]]);
    }

    let options = {
      chart: { title: 'Gráfico Barras - Totalização de Registro por Dispositivo' },
      bars: 'horizontal',
      hAxis: {
        title: 'Total',
        minValue: 0,
      },
      vAxis: {
        title: 'Dispositivo',
      },
      fontName: 'Arial',
      fontSize: 14,
    };

    let chart = new google.charts.Bar(
      document.getElementById("barChart")
    );

    chart.draw(data, google.charts.Bar.convertOptions(options));
  });
}

getData();
