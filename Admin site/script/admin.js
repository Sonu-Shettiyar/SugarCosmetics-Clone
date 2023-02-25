let API = `https://beautybliss-cosmetics-mock-api.onrender.com/`

let ALL_data = [];

let month_filter = document.querySelector("#month_filter");

// ------------- X ------------------ X ------------------



// ----------- Fetch Data ------------ //

async function fetch_Data(value) {
  let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/${value}`);
  let data = await res.json();
  // console.log(res);
  // console.log(data);
  for (let x of data) {
    // console.log(x);
    ALL_data.unshift(x);
  }
 

  // filter data according to month
  let filtered = ALL_data.reduce((acc, item) => {
    if (item.date[1] == "02") {
      acc["2"].push(item.date.join("/"), item.productCount,item.total)
    } else {
      acc["1"].push(item.date.join("/"), item.productCount,item.total)
    }
    return acc;
  }, { 1: [], 2: [] })

  console.log(filtered);

  Show_data(filtered["1"]);
 }

 fetch_Data("orders");




 function Show_data (month){
  let week1 = [];
  let week2 = [];
  let week3 = [];
  let week4 = [];
  let week5 = [];

  let sale = [];
  let turn = [];
  let date = [];
   for(let i=0; i<month.length; i=i+3){
       sale.push(month[i+1]);
       turn.push(month[i+2]);
       date.push(month[i]);
   }
   console.log(sale, turn, date);
 }










// ---------- Month Filter ------------- //

month_filter.addEventListener("change", () => {
  alert();
  console.log(month_filter.value);
})


// chart 

function show_chart() {
  var xValues = ["week 1", "week 2", "week 3", "week 4", "week 5"];
  var yValues = [55, 49, 44, 24, 15];
  var barColors = ["red", "green", "blue", "orange", "brown"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Sales chart"
      }
    }
  });
}

show_chart();

// -------------- Current month showing ----------------- //
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log(today.split("/"));

month_filter.value = `${yyyy}-${mm}`