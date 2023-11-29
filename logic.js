// const apiUrl = 'http://127.0.0.1:5001/api/v1.0/company_summary';
// const countrySummary = 'http://127.0.0.1:5001/api/v1.0/country_summary';


// function buildCharts(){
// d3.json(countrySummary, { mode: 'cors' })
//     .then((data) => { console.log(data)
//         let x  = data.map((d)=>d.country)
//         console.log(x)
//         let y1  = data.map((d)=>d.overall_mean)
//         console.log(y1)
//         let y2  = data.map((d)=>d.deforestation_mean)
//         console.log(y2)
//         let y3  = data.map((d)=>d.sustainable_sourcing_mean)
//         console.log(y3) 
//         let y4  = data.map((d)=>d.overconsumption_mean)
//         console.log(y4)
//         let y5 = data.map((d)=>d.fair_wages_mean)
//         console.log(y5)

//         let trace1 = [
//             {
//               x: x,
//               y: y1,
//               type: 'bar'
//             }
//           ];

//         let trace1Layout = {
//             title: "Overall Sustainability Scores by Country",
//             margin: { t:100},
//             hovermode: "closest",
//             xaxis: { title: "Countries"},
//             margin: { t: 100}
//         };
    
//         Plotly.newPlot('plot', trace1, trace1Layout)

    

    
//         // for (let d in data) {
//         //     let test = data[d]
//         //     // console.log(test)
//         //     let overall = [test.overall_mean];
//         //     console.log(topValues);
//         // }
    
    
//     })




// }
// function init(){
//     let selector = d3.select("#selDataset");

//     d3.json(countrySummary, { mode: 'cors' }).then((data) => {
//         // let x  = data.map((d)=>d.country)
//         for (let d in data){
//             selector.append("option").text(data[d]).property("value", data[d]);
//         }

        

//         let firstSample = data[0];
//         buildCharts(firstSample);
//     })

    
// }
// function optionChanged(newSample){
//     buildCharts(newSample);
// }
// buildCharts()
// init()

const apiUrl = 'http://127.0.0.1:5001/api/v1.0/company_summary';
const countrySummary = 'http://127.0.0.1:5001/api/v1.0/country_summary';
function buildCharts(selectedMetric) {
    d3.json(countrySummary, { mode: 'cors' })
        .then((data) => {
            //console.log(data);
            // Assuming data is an array of objects with properties like 'country', 'overall_mean', etc.
            let test = data.map((d) => d)
            for (let t in test) {
                let test3 = test[t]
                const { country, deforestation_mean, fair_wages_mean, overall_mean, overconsumption_mean, sustainable_sourcing_mean } = test3
            }

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
                    title: 'Score (0-10)'},
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
    });
    // Fetch initial data with default metric
    buildCharts('overall_mean');
}
init();

//React

//Reply






