function performGetRequest1() {
  var resultElement = document.getElementById("display");
  resultElement.innerHTML = "";

  axios
    .get("https://s3.amazonaws.com/open-to-cors/assignment.json")
    .then(function(response) {
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function(error) {
      resultElement.innerHTML = error;
    });
}

function generateSuccessHTMLOutput(response) {
  var products1 = JSON.stringify(response.data.products);
  var products = JSON.parse(products1);
  var tdata = "<table><th>Title</th><th>Price</th>";
  var keys = Object.keys(products);
  var arr = [];
  for (let i = 0; i < keys.length; i++) {
    arr.push([
      products[keys[i]].title,
      products[keys[i]].price,
      products[keys[i]].popularity
    ]);
  }
  arr.sort(function(a, b) {
    var valueA, valueB;
    valueA = a[2];
    valueB = b[2];
    if (+valueA > +valueB) {
      return -1;
    } else if (+valueA < +valueB) {
      return 1;
    }
    return 0;
  });
  for (let j = 0; j < arr.length; j++) {
    tdata +=
      "<tr><td>" +
      arr[j][0] +
      "</td><td>" +
      arr[j][1] +
      "</td><td>" +
      "</tr>";
  }
  tdata += "</table>";
  return tdata;
}
