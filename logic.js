const apiUrl = 'http://127.0.0.1:5001/api/v1.0/company_summary';
const countrySummary = 'http://127.0.0.1:5001/api/v1.0/country_summary';
const companySummary = "http://127.0.0.1:5001/api/v1.0/company_summary"
function buildCharts(selectedMetric) {
    d3.json(countrySummary, { mode: 'cors' })
        .then((data) => {
            //console.log(data);
            // Assuming data is an array of objects with properties like 'country', 'overall_mean', etc.
            

            let x = data.map((d) => d.country);
            let y;
            // Determine which metric to use based on the selected value
            switch (selectedMetric) {
                case 'overall_mean':
                    y = data.map((d) => d.overall_mean);
                    break;
                case 'sustainable_sourcing_mean':
                    y = data.map((d) => d.sustainable_sourcing_mean);
                    break;
                case 'overconsumption_mean':
                    y = data.map((d) => d.overconsumption_mean);
                    break;
                case 'deforestation_mean':
                    y = data.map((d) => d.deforestation_mean);
                    break;
                case 'fair_wages_mean':
                    y = data.map((d) => d.fair_wages_mean);
                    break;
                default:
                    y = data.map((d) => d.overall_mean); // Default to overall mean
            }
            let trace1 = [
                {
                    x: x,
                    y: y,
                    marker: {color: '#dc4412'},
                    type: 'bar',
                    text: y.map(value => value.toFixed(1)),
                    textposition: 'outside',
                },
            ];
            let trace1Layout = {
                title: 'Sustainability Metric: ' + selectedMetric.substring(0,1).toUpperCase() + selectedMetric.substring(1).replace(/_/g, ' '),
                margin: { t: 50,
                b:200,
                l:100,
                r:100 },
                hovermode: 'closest',
                xaxis: { title: 'Countries',
                tickangle: -45},
                yaxis: { range: [0,10],
                    title: 'Metric Score (0-10)'},
                automargin: true,
            };
            Plotly.newPlot('plot', trace1, trace1Layout);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

}
function init() {
    let selector = d3.select('#selDataset');
    selector.on('change', function () {
        let selectedMetric = d3.select(this).property('value');
        buildCharts(selectedMetric);
        buildCharts2(selectedMetric);
        buildCharts2(selectedMetric2);
    });
    // Fetch initial data with default metric
    buildCharts('overall_mean');
}

function buildCharts2(selectedMetric, selectedMetric2) {
    d3.json(companySummary,{ mode: 'cors'})
        .then((response) => {
            let company_sum = response.map((d) => d)
            let company_overall = company_sum.filter((r)=> r.overall_mean > 5)
            let company_sustainable = company_sum.filter((r)=> r.sustainable_sourcing_mean > 5)
            let company_overconsumption = company_sum.filter((r)=> r.overconsumption_mean > 5)
            let company_deforestation = company_sum.filter((r)=> r.deforestation_mean > 5)
            let company_fair_wages = company_sum.filter((r)=> r.fair_wages_mean > 5)


                
            let test = company_overall.map((d)=>d.overall_mean)
            console.log(test)

            let x;
            switch (selectedMetric) {
                case 'overall_mean':
                    x = company_overall.map((d) => d.overall_mean);
                    break;
                case 'sustainable_sourcing_mean':
                    x = company_sustainable.map((d) => d.sustainable_sourcing_mean);
                    break;
                case 'overconsumption_mean':
                    x = company_overconsumption.map((d) => d.overconsumption_mean);
                    break;
                case 'deforestation_mean':
                    x = company_deforestation.map((d) => d.deforestation_mean);
                    break;
                case 'fair_wages_mean':
                    x = company_fair_wages.map((d) => d.fair_wages_mean);
                    break;
                default:
                    x = company_overall.map((d) => d.overall_mean); // Default to overall mean
            }
            let y;
            // Determine which metric to use based on the selected value
            switch (selectedMetric2) {
                case 'overall_mean':
                    y = company_overall.map((d) => d.company);
                    break;
                case 'sustainable_sourcing_mean':
                    y = company_sustainable.map((d) => d.company);
                    break;
                case 'overconsumption_mean':
                    y = company_overconsumption.map((d) => d.company);
                    break;
                case 'deforestation_mean':
                    y = company_deforestation.map((d) => d.company);
                    break;
                case 'fair_wages_mean':
                    y = company_fair_wages.map((d) => d.company);
                    break;
                default:
                    y = company_overall.map((d) => d.company); // Default to overall mean
            }
            let trace2 = [
                {
                    x: x,
                    y: y,
                    marker: {color: '#4e8983'},
                    type: 'bar',
                    orientation: 'h',
                    text: x.map(value => value.toFixed(1)),
                    textposition: 'outside',
                },
            ];
            let trace2Layout = {
                title: { text: "Companies That Scored<br> Between 5-10 on Sustainability Metrics<br> " },
                margin: { t: 50,
                b:50,
                l:200,
                r:0 },
                hovermode: 'closest',
                xaxis: { range: [0,11],
                    title: 'Metric Score (0-10)'},
                automargin: true,
                barmode: 'group',
            };
            Plotly.newPlot('plot1', trace2, trace2Layout);
    

        })
}
init();
buildCharts2()
//React

//Reply






