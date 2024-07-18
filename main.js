// Search Bar 
$(document).ready(function(){
  $("#search").focus(function() {
    $(".search-box").addClass("border-searching");
    $(".search-icon").addClass("si-rotate");
  });
  $("#search").blur(function() {
    $(".search-box").removeClass("border-searching");
    $(".search-icon").removeClass("si-rotate");
  });
  $("#search").keyup(function() {
      if($(this).val().length > 0) {
        $(".go-icon").addClass("go-in");
      }
      else {
        $(".go-icon").removeClass("go-in");
      }
  });
  $(".go-icon").click(function(){
    $(".search-form").submit();
  });
});
// Search Bar 
// *************************
// insert Data
var Data =  {
  "customers": [{ "id": 1,"name": "Ahmed Ali"},{"id": 2,"name": "Aya Elsayed"}, {"id": 3,"name": "Mina Adel"},{"id": 4,"name": "Sarah Reda"},{"id": 5,"name": "Mohamed Sayed"}],
  "transactions": [
  {
  "id": 1,
  "customer_id": 1,
  "date": "2022-01-01",
  "amount": 1000
  },
  {
  "id": 2,
  "customer_id": 1,
  "date": "2022-01-02",
  "amount": 2000
  },
  {
  "id": 2,
  "customer_id": 1,
  "date": "2022-01-03",
  "amount": 500
  },
  {
  "id": 2,
  "customer_id": 1,
  "date": "2022-01-04",
  "amount": 3000
  },
  {
  "id": 3,
  "customer_id": 2,
  "date": "2022-01-01",
  "amount": 550
  },
  {
  "id": 3,
  "customer_id": 2,
  "date": "2022-01-02",
  "amount": 0
  },
  {
  "id": 3,
  "customer_id": 2,
  "date": "2022-01-03",
  "amount": 1000
  },
  {
  "id": 4,
  "customer_id": 3,
  "date": "2022-01-01",
  "amount": 500
  },
  {
  "id": 4,
  "customer_id": 3,
  "date": "2022-01-02",
  "amount": 0
  },
  {
  "id": 5,
  
  "customer_id": 2,
  "date": "2022-01-03",
  "amount": 1300
  },
  {
  "id": 6,
  "customer_id": 4,
  "date": "2022-01-01",
  "amount": 750
  },
  {
  "id": 6,
  "customer_id": 4,
  "date": "2022-01-02",
  "amount": 1750
  },
  {
  "id": 7,
  "customer_id": 3,
  "date": "2022-01-02",
  "amount": 1250
  },
  {
  "id": 8,
  "customer_id": 5,
  "date": "2022-01-01",
  "amount": 2500
  },
  {
  "id": 9,
  "customer_id": 5,
  "date": "2022-01-02",
  "amount": 875
  }
  ]
  }
localStorage.setItem('DataList',JSON.stringify(Data))
var dataList = []
if(localStorage.getItem('DataList') != null){
  dataList = JSON.parse(localStorage.getItem('DataList'))
}

// end of inserting Data
let  transactions = dataList.transactions
const totalAmounts = transactions.reduce((acc, transaction) => {
  // Check if the customer_id already exists in the accumulator object
  if (!acc[transaction.customer_id]) {
      acc[transaction.customer_id] = 0;
  }
  // Add the amount to the corresponding customer_id
  acc[transaction.customer_id] += transaction.amount;
  return acc;
}, {});

let datainf = dataList.customers
for (let i = 0; i < datainf.length; i++) {
  datainf[i].totalAmount = totalAmounts[i+1]
}

// Display Data in Table
function displayData(arr){
  let temp = ''
  for(let i = 0 ;i< arr.length; i++){
    temp+=`     <tr>
    <td class="text-center align-middle">${arr[i].name}</td>
    <td class="text-center align-middle">${arr[i].totalAmount}</td>
    <td class="text-center align-middle"> <button class="btn btn-primary" onclick="DisplayChart(${arr[i].id})">View</button></td>
    </tr>`
  }
  document.getElementById('ShowData').innerHTML = temp
}
displayData(datainf)
  // Function to display the chart

  let chartInstance;
  function DisplayChart(dataset) {
   let ChartData = {
    datarange :  [],
    dateRage : []
   }
    // let datarange =  []
    for (let i = 0; i < transactions.length; i++) {
     if (transactions[i].customer_id == dataset ) {
      ChartData.datarange.push(transactions[i].amount)
      ChartData.dateRage.push(transactions[i]['date'])
     }
    }

console.log(ChartData.dateRage);
    let data = {
      labels: ChartData.dateRage,
      datasets: [{
        label: 'Transaction Data',
        data: ChartData.datarange,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        spanGaps: true // This allows the line to span gaps in the data
      }]
    };
  
    let config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Line Chart with Breakpoints'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      },
    };
  
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Initialize the chart
    let ctx = document.getElementById('myChart').getContext('2d');
    chartInstance = new Chart(ctx, config);
  }
  // search function 
let searchBar = document.getElementById('search')
searchBar.addEventListener('keyup',function () {
 let SearchList = datainf.filter(ele => ele.name.toLowerCase().includes(searchBar.value.toLowerCase()))
 displayData(SearchList)
if(SearchList.length > 0 ){
  document.getElementById('noResultimg').style.display = 'none'
  document.getElementById('noResulth2').style.display = 'none'
}else{
  chartInstance.destroy();
  document.getElementById('noResultimg').style.display = 'block'
  document.getElementById('noResulth2').style.display = 'block'
}
})


