// password function seen and unseen

// const more = document.getElementById('more').style.display = "block";
const tabs = (document.getElementById("tabs").style.display = "block");
const contact = (document.getElementById("contact").style.display = "none");
// const mainSection = (document.getElementById("main-field").style.display =
  // "none");
const Login = document.getElementById("Login");
function myfunction() {
  var x = document.getElementById("pass");

  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//  function validation of the password. If the login is successful you get the notification Login Successful, but if it fails you get the
//  notification failed.

function validate() {
  var password = document.getElementById("pass");
  var length = document.getElementById("length");

  if (password.value.length >= 8) {
    alert("Login Succesfull");
  } else {
    alert("Login Failed");
  }
  document.getElementById("main-field").style.display = "block";
  document.getElementById("Login").style.display = "none";
}

// declaring variables

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");

// The public API where i am fetching my data from
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="msg"> The input field cannot be empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("user-inp").value = "";
        console.log(data);
        console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = "";
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);
        result.innerHTML = `
        <img src= ${myDrink.strDrinkThumb}>
        <h2>${myDrink.strDrink}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredients"></ul>
        <h3>Instructions:</h3>
        <p>${myDrink.strInstructions}</p>
        `;
        let ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      })

      //  In case an error occurs it is more easier to track where the actual error is
      .catch(() => {
        result.innerHTML = `<h3 class ="msg">Please enter a valid input</h3>`;
      });
  }
};
// Event listeners in my project
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);

function contactUs() {
  document.getElementById("contact").style.display = "block";
  document.getElementById("main-field").style.display = "none";
}

function more() {
  document.getElementById("more").style.display = "block";
  document.getElementById("main-field").style.display = "none";
}
