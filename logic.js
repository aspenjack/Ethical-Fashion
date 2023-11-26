const apiUrl = 'http://127.0.0.1:5001/api/v1.0/company_summary';

function 
d3.json(apiUrl, { mode: 'cors' })
    .then(data => console.log(data))
