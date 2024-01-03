const apiUrl = '/api/v1.0/company_summary';
const countrySummary = '/api/v1.0/country_summary';
const companySummary = "/api/v1.0/company_summary";
const company_locations ="/api/v1.0/company_overall_mean";

function buildCharts(selectedMetric) {
    d3.json(countrySummary, { mode: 'cors' })
        .then((data) => {
            // Assuming data is an array of objects with properties like 'country', 'overall_mean', etc.
            let test = data.map((d) => d)
            //const { country, deforestation_mean, fair_wages_mean, overall_mean, overconsumption_mean, sustainable_sourcing_mean } = test2
            //console.log(test)
            let countries = []
            let mean_t = []
            for (let t in test) {
                let test3 = test[t]
                const { country, deforestation_mean, fair_wages_mean, overall_mean, overconsumption_mean, sustainable_sourcing_mean } = test3

                picker = (choice) => {
                    if(choice == 'overall_mean') {
                        return overall_mean
                    }else if (choice == 'deforestation_mean') {
                        return deforestation_mean
                    } else {
                        return overall_mean
                    }
                }
                countries.push(country) 
                mean_t.push(picker(selectedMetric))
            }
            let dataP = countries.map((country, index) => ({
                country, mean:mean_t[index]
            }));
            console.log(dataP)

            dataP.sort((a,b)=> b.mean -a.mean)
            countries = dataP.map(dataP => dataP.country)
            mean_t = dataP.map(dataP => dataP.mean)

            let tracev = [
                {
                    x: countries,
                    y: mean_t.slice(0,5),
                    type: 'bar',
                },
            ];
            let tracevLayout = {
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
            Plotly.newPlot('plot1', tracev, tracevLayout);

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
        //buildCharts2(selectedMetric);
    });
    // Fetch initial data with default metric
    buildCharts('overall_mean');
}

// function buildCharts2(selectedMetric2) {
//     d3.json(companySummary,{ mode: 'cors'})
//         .then((response) => {
//             let company_sum = response.map((d) => d)
//             let company_overall = company_sum.filter((r)=> r.overall_mean > 5)
//             let company_sustainable = company_sum.filter((r)=> r.sustainable_sourcing_mean > 5)
//             let company_overconsumption = company_sum.filter((r)=> r.overconsumption_mean > 5)
//             let company_deforestation = company_sum.filter((r)=> r.deforestation_mean > 5)
//             let company_fair_wages = company_sum.filter((r)=> r.fair_wages_mean > 5)


                
//             // let test = company_overall.map((d)=>d.overall_mean)
//             // console.log(test)


//             switch (selectedMetric2) {
//                 case 'overall_mean':
//                     var datapoint1 = response.map((d) => ({y: d.company, x: d.overall_mean}));
//                     break;
//                 case 'sustainable_sourcing_mean':
//                     var datapoint1 = response.map((d) => ({y: d.company, x: d.sustainable_sourcing_mean}));
//                     break;
//                 case 'overconsumption_mean':
//                     var datapoint1 = response.map((d) => ({y: d.company, x: d.overconsumption_mean}));
//                     break;
//                 case 'deforestation_mean':
//                     var datapoint1 = response.map((d) => ({y: d.company, x: d.deforestation_mean}));
//                     break;
//                 case 'fair_wages_mean':
//                     var datapoint1 = response.map((d) => ({y: d.company, x: d.fair_wages_mean}));
//                     break;
//                 default:
//                     var datapoint1 = response.map((d) => ({y: d.company, x: d.overall_mean}));

//             }
//             datapoint1.sort(((a,b) =>b.x - a.x))
//             //console.log(datapoint1)

//             let y = datapoint1.map((d)=>d.y).slice(0,5)
//             let x = datapoint1.map((d)=> d.x).slice(0,5)

//             let trace2 = [
//                 {
//                     x: x,
//                     y: y,
//                     marker: {color: '#4e8983'},
//                     type: 'bar',
//                     orientation: 'h',
//                     text: x.map(value => value.toFixed(1)),
//                     textposition: 'outside',
//                 },
//             ];
//             let trace2Layout = {
//                 title: 'Companies that Scored Between 5-10 in: ' + selectedMetric2.substring(0,1).toUpperCase() + 
//                 selectedMetric2.substring(1).replace(/_/g, ' '),
//                 margin: { t: 50,
//                 b:50,
//                 l:200,
//                 r:0 },
//                 hovermode: 'closest',
//                 xaxis: { range: [0,11],
//                     title: 'Metric Score (0-10)'},
//                 automargin: true,
//                 barmode: 'group',
//             };
//             Plotly.newPlot('plot1', trace2, trace2Layout);
    

//         }).catch((error) => {
//             console.error('Error fetching data:', error);
//         });
// }
// buildCharts2('overall_mean')


function buildChart3() {
    var myMap = L.map("map", {
    center: [40.966864, -12.409179],
    zoom: 3,
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


    d3.json(company_locations, {mode: 'cors'}).then((respond)=> {


        var markers = L.markerClusterGroup()
        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var orangeIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });




        let coord = []
        
        for (r in respond) {
            let location = respond[r]
            coord.push([location.latitude, location.longitude])

            var locations = [location.latitude, location.longitude]
            //console.log(icon)

            getcolor = (mean) => {
                if(mean >= 5) {
                    return greenIcon
                }else if (mean >= 3) {
                    return orangeIcon
                } else {
                    return redIcon
                }
            }
            var icon = getcolor(location.overall_mean)

            if(locations) {

                markers.addLayer(L.marker([locations[0], locations[1]], {icon: icon})
                .bindPopup("<h3>Country: " + respond[r].country + 
                "<h3>Company: " +respond[r].company + 
                "<h3>Mean: " + respond[r].overall_mean)
                )
            }
        }
        myMap.addLayer(markers);

        let legend = L.control({ position: "bottomright" });

        legend.onAdd = (map) => {
            let div = L.DomUtil.create('div', 'info legend'); // Make sure 'info' class is added here
            let grades = [0, 3, 5];
            let colors = ["#CB2B3E", "#CB8427", "#2AAD27"];
        
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML += `<i style="background: ${colors[i]}"></i> ${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'}`;
            }
        
            return div;
        };
        
        legend.addTo(myMap);
})

}
buildChart3()

init();
//React
//Reply








