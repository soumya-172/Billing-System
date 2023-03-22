
$(document).ready(function () {
  $('#vegitable').change(function () {
    let id = $(this).find(':selected')[0].id;
    $.ajax({
      method: 'POST',
      url: 'fetch_data.php',
      data: { id: id },
      dataType: 'json',
      success: function (data) {
        $('#price').text(data.product_price);
      }
    })
  });

  // adding to cart
  let countOfOrder = 1;
  $('#add').on('click', function () {
    let name = $('#vegitable').val();
    // console.log(name);
    let qty = $('#qty').val();
    // console.log(qty);
    let price = $('#price').text();
    // console.log(price);

    if (qty == 0) {
      var errmsg = '<span class = "alert alert-danger ml-5">Minimum Qty should be 1 or more than 1</span>';
      $('#errorMsg').html(errmsg).fadeOut(9000);
    }
    else {
      billFunction();
    }

    function billFunction() {
      let displaytotal = 0;

      $("#receipt_bill").each(function () {
        displaytotal = price * qty;
        let subTotal = 0;
        // subTotal += parseInt(total);

        let table = '<tr><td>' + countOfOrder + '</td><td>' + name + '</td><td>' + qty + '</td><td>' + price + '</td><td><strong><input type="hidden" id="total" value="' + displaytotal + '">' + displaytotal + '</strong></td></tr>';
        $('#new').append(table);

        // Code for Sub Total of Vegitables 
        let total = 0;
        $('tbody tr td:last-child').each(function () {
          var value = parseInt($('#total', this).val());
          if (!isNaN(value)) {
            total += value;
          }
        });
        $('#subTotal').text(total);

        // Code for calculate tax of Subtoal 5% Tax Applied
        let Tax = (total * 5) / 100;
        $('#taxAmount').text(Tax.toFixed(2));

        // Code for Total Payment Amount

        let Subtotal = $('#subTotal').text();
        let taxAmount = $('#taxAmount').text();

        let totalPayment = parseFloat(Subtotal) + parseFloat(taxAmount);
        $('#totalPayment').text(totalPayment.toFixed(2)); // Showing using ID 

      });
      countOfOrder++;
    }

  });

  // Code for year 

  let currentdate = new Date();
  let datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear();
  $('#year').text(datetime);

  // Code for extract Weekday     
  function myFunction() {
    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let day = weekday[d.getDay()];
    return day;
  }
  let day = myFunction();
  $('#day').text(day);
});

window.onload = displayClock();

function displayClock() {
  let time = new Date().toLocaleTimeString();
  document.getElementById("time").innerHTML = time;
  setTimeout(displayClock, 1000);
}

