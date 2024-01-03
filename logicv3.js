const apiUrl = 'http://127.0.0.1:5001/api/v1.0/company_summary';
const countrySummary = 'http://127.0.0.1:5001/api/v1.0/country_summary';
const companySummary = "http://127.0.0.1:5001/api/v1.0/company_summary";
const company_locations ="http://127.0.0.1:5001//api/v1.0/company_overall_mean";

function buildCharts(selectedMetric) {
    d3.json(countrySummary, { mode: 'cors' })
        .then((data) => {
            //console.log(data);
            // Assuming data is an array of objects with properties like 'country', 'overall_mean', etc.
            let test = data.map((d) => d)
            //const { country, deforestation_mean, fair_wages_mean, overall_mean, overconsumption_mean, sustainable_sourcing_mean } = test2
            //console.log(test)
            let tired = []
            for (let t in test) {
                let test3 = test[t]
                const { country, deforestation_mean, fair_wages_mean, overall_mean, overconsumption_mean, sustainable_sourcing_mean } = test3
                
                tired.push({x:country, y:overall_mean})

                // let trace1 = [
                //     {
                //         x: country,
                //         y: deforestation_mean,
                //         type: 'bar',
                //     },
                // ];
                // let trace1Layout = {
                //     title: 'Sustainability Metric: ' + selectedMetric.replace(/_/g, ' '),
                //     //margin: { t: 100 },
                //     hovermode: 'closest',
                //     xaxis: { title: 'Countries' },
                //     //margin: { t: 100 },
                // };
                // Plotly.newPlot('plot1', trace1, trace1Layout);
                // //console.log(test3)

            }

            //console.log(tired)

            //let x = data.map((d) => d.country);
            //let y;
            // Determine which metric to use based on the selected value
            switch (selectedMetric) {
                case 'overall_mean':
                    var datapoint = data.map((d) => ({x: d.country, y: d.overall_mean}));

                    break;
                case 'sustainable_sourcing_mean':
                    var datapoint = data.map((d) => ({x: d.country, y: d.sustainable_sourcing_mean}));
                    break;
                case 'overconsumption_mean':
                    var datapoint = data.map((d) => ({x: d.country, y: d.overconsumption_mean}));
                    break;
                case 'deforestation_mean':
                    var datapoint = data.map((d) => ({x: d.country, y: d.deforestation_mean}));
                    break;
                case 'fair_wages_mean':
                    var datapoint = data.map((d) => ({x: d.country, y: d.fair_wages_mean}));
                    break;
                default:
                    var datapoint = data.map((d) => ({x: d.country, y: d.overall_mean}));
                    // y = data.map((d) => d.overall_mean); // Default to overall mean
                    // x = data.map((d) => d.country);
            }

            datapoint.sort((a,b)=> b.y - a.y);
            //console.log(datapoint)

            let x = datapoint.map((d)=>d.x).slice(0,5)
            let y = datapoint.map((d)=> d.y).slice(0,5)

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
                title: 'Sustainability Metric: ' + selectedMetric.replace(/_/g, ' '),
                margin: { t: 50,
                    b:200,
                    l:100,
                    r:100 },
                    hovermode: 'closest',
                    xaxis: { title: 'Countries',
                    tickangle: -45},
                    yaxis: { range: [0,6],
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
        let selectedMetric2 = d3.select(this).property('value');
        buildCharts(selectedMetric);
        buildCharts2(selectedMetric);
    });
    // Fetch initial data with default metric
    buildCharts('overall_mean');
}

function buildCharts2(selectedMetric2) {
    d3.json(companySummary,{ mode: 'cors'})
        .then((response) => {
            let company_sum = response.map((d) => d)
            let company_overall = company_sum.filter((r)=> r.overall_mean > 5)
            let company_sustainable = company_sum.filter((r)=> r.sustainable_sourcing_mean > 5)
            let company_overconsumption = company_sum.filter((r)=> r.overconsumption_mean > 5)
            let company_deforestation = company_sum.filter((r)=> r.deforestation_mean > 5)
            let company_fair_wages = company_sum.filter((r)=> r.fair_wages_mean > 5)


                
            // let test = company_overall.map((d)=>d.overall_mean)
            // console.log(test)


            switch (selectedMetric2) {
                case 'overall_mean':
                    var datapoint1 = response.map((d) => ({y: d.company, x: d.overall_mean}));
                    break;
                case 'sustainable_sourcing_mean':
                    var datapoint1 = response.map((d) => ({y: d.company, x: d.sustainable_sourcing_mean}));
                    break;
                case 'overconsumption_mean':
                    var datapoint1 = response.map((d) => ({y: d.company, x: d.overconsumption_mean}));
                    break;
                case 'deforestation_mean':
                    var datapoint1 = response.map((d) => ({y: d.company, x: d.deforestation_mean}));
                    break;
                case 'fair_wages_mean':
                    var datapoint1 = response.map((d) => ({y: d.company, x: d.fair_wages_mean}));
                    break;
                default:
                    var datapoint1 = response.map((d) => ({y: d.company, x: d.overall_mean}));

            }
            datapoint1.sort(((a,b) =>b.x - a.x))
            //console.log(datapoint1)

            let y = datapoint1.map((d)=>d.y).slice(0,5)
            let x = datapoint1.map((d)=> d.x).slice(0,5)

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
                title: 'Companies that Scored Between 5-10 in: ' + selectedMetric2.substring(0,1).toUpperCase() + 
                selectedMetric2.substring(1).replace(/_/g, ' '),
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
    

        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
}
buildCharts2('overall_mean')

function buildChart3(myMap) {
    d3.json(company_locations, {mode: 'cors'}).then((respond)=> {

    getColor = (depth) => {
        if(depth > 7) {
            return "#ea2c2c"
        } else if (depth > 5) {
            return "#ea822c"
        } else if (depth > 4) {
            return "#ee9c00"
        } else if (depth > 3) {
            return "#eecc00"
        } else if (depth) {
            return "#d4ee00"
        } else {
            return "#98ee00"
        }
        };
    
    styleInfo = (feature) => {
        return{
            opacity: 1, 
            fillOpacity: 1,
            fillColor: getColor(respond.overall_mean) ,
            color: "#000000",
            //radius: getRadius(feature.geometry.mag),
            stroke: true,
            weight: 0.6
        }
    };

    createFeatures = (coorData) => {
        onEachFeature = (feature, layer) => {
            layer.bindPopup(`
            Country: ${respond.country}<br>
            Company; ${respond.company} <br>
            Average: ${respond.overall_mean}
            `);
        }

        let companies_d = L.geoJSON(coorData, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng)
            },
            style: styleInfo,
            onEachFeature: onEachFeature
        });
        createMap(country_data)
    }

    createMap = (country_data) => {
       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        var myMap = L.map("map", {
            center: [40.966864, -12.409179],
            zoom: 3
        });

        var markers = L.markerClusterGroup()

        let coord = []
        
        for (r in respond) {
            let location = respond[r]
            coord.push([location.latitude, location.longitude])

            var locations = [location.latitude, location.longitude]
            //console.log(locations)

            if(locations) {

                markers.addLayer(L.marker([locations[0], locations[1]])
                //.bindPopup("<h3>Country: " +respond[r].country + "<h3>Company: " +respond[r].company + "<h3>Mean: " + respond[r].overall_mean)
                )
            }
        }
        myMap.addLayer(markers);
    }
})

}
buildChart3()

init();
//React
//Reply








