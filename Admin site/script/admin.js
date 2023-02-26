let API = `https://beautybliss-cosmetics-mock-api.onrender.com/`

let ALL_data = [];

let month_filter = document.querySelector("#month_filter");

// ------------- X ------------------ X ------------------




// -------------- Current month showing ----------------- //
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// console.log(today.split("/"));

month_filter.value = `${yyyy}-${mm}`





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

  let append = document.querySelector(".append");
   
  append.innerHTML = display(ALL_data);

  console.log(ALL_data);


  // filter data according to month
  let filtered = ALL_data.reduce((acc, item) => {
    if (item.date[1] == "02") {
      acc["2"].push(item.date.join("/"), item.productCount, item.total)
    } else {
      acc["1"].push(item.date.join("/"), item.productCount, item.total)
    }
    return acc;
  }, { 1: [], 2: [] })

  // console.log(filtered);


  // -------- Current month ----------- //

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();



  // show current month dashboard

  Show_data(filtered[`${Number(mm)}`]);

  console.log(`${Number(mm)}`)


  // ---------- Month Filter ------------- //

  month_filter.addEventListener("change", () => {
    Show_data(filtered[`${Number(month_filter.value.slice(5, 7))}`]);
  })


}

fetch_Data("orders");




function Show_data(month) {


  // ------ Chart -- //
  let week1 = 0;
  let week2 = 0;
  let week3 = 0;
  let week4 = 0;
  let week5 = 0;

  let sale = [];
  let turn = [];
  let date = [];
  for (let i = 0; i < month.length; i = i + 3) {
    sale.push(month[i + 1]);
    turn.push(month[i + 2]);
    date.push(month[i].slice(0, 2));
  }
  // console.log( turn);

  date = date.map(Number);
  sale = sale.map(Number);
  turn = turn.map(Number);

  for (let i = 0; i < date.length; i++) {
    if (date[i] > 1 && date[i] < 7) {
      week1 += sale[i];
    } else if (date[i] > 6 && date[i] < 13) {
      week2 += sale[i];
    } else if (date[i] > 12 && date[i] < 19) {
      week3 += sale[i];
    } else if (date[i] > 18 && date[i] < 25) {
      week4 += sale[i];
    } else if (date[i] > 24 && date[i] < 31) {
      week5 += sale[i];
    }
  }

  // console.log(week1);
  // console.log(week2);
  // console.log(week3);
  // console.log(week4);
  // console.log(week5);

  let week_data = [week1, week2, week3, week4, week5];
  show_chart(week_data)

  let sales = document.querySelector("#sales");
  sales.innerHTML = week1 + week2 + week3 + week4 + week5;

  let turnover = document.querySelector("#turnover");
  turnover.innerHTML = turn.reduce((acc, item) => { return acc + item }, 0);

  let allAPI = [
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/foundation`),
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/makeupkit`),
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/eyes`),
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/lipstick`),
  ]

  all_data();

  // to get total products length;
  async function all_data() {
    try {
      const res = await Promise.all(allAPI);
      const data = await Promise.all(res.map((item) => {
        return item.json();
      }))
      console.log(data);
      let sum = 0;
      for (let x of data) {
        sum += x.length;
      }
      projects.innerHTML = sum;
    } catch (error) {
      console.log(error);
    }
  }

  // to get customers length
  let customers = document.querySelector("#customers")
  get_Data("users");

  async function get_Data(value) {
    let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/${value}`);
    let data = await res.json();
    // console.log(res);
    // console.log(data);
    customers.innerHTML = data.length;
    return data
  }



}

async function get_Data(value) {
  let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/${value}`);
  let data = await res.json();
  // console.log(res);
  // console.log(data);
  return data
}










// chart 

function show_chart(data) {
  var xValues = ["week 1", "week 2", "week 3", "week 4", "week 5"];
  var yValues = data;
  var barColors = ["#6250d2", "#41bda4", "#6250d2", "#41bda4", "#6250d2"];

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


// --------------------- Show Recent Orders -----------------  //

function display(data) {

  let card_list = `
  ${data.map((ele) => {
    return card(
      ele.id,
      ele.date,
      ele.total,
      ele.status,
      
    )
  }).join('')}
  `
  return card_list;
}

function card(order_id,date,total,status) {

  let card = `
  <tr>
  <td class="" >${order_id}</td>
  <td class="">${date}</td>
  <td class="">${total}</td>
  <td class="" >${status}</td>
  </tr>
  `
  return card;
}
