var user = null;

async function getUser(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, 
        {headers: {'X-GitHub-Api-Version': '2022-11-28'}});
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

function getInputValueByClassName(className) {
  try { 
    let value = document.getElementsByClassName(className)[0].value;
    return value
  } catch (error) {
    console.error(error);
  }
}

function populateUserPanel(userData) {
  document.getElementsByClassName("inspo-container")[0].style.display = "none";
  document.getElementsByClassName("title-section")[0].style.display = "flex";
  document.getElementById("avatar-img").setAttribute("src", userData.avatar_url);
  document.getElementById("user-display-name").innerHTML = userData.name ? userData.name : "'Name Not Specified'";
  document.querySelector("#username a").setAttribute("href", `https://github.com/${userData.login}`);
  document.querySelector("#username a").innerHTML = userData.login ? `@${userData.login}`: "'Unknown Username'";

  document.getElementById("user-created-date").innerHTML = "Joined " + moment(userData.created_at).format("DD MMM YYYY");

}

function populateNoUserFound() {
  document.getElementsByClassName("inspo-container")[0].style.display = "none";
  document.getElementsByClassName("user-card")[0].style.cssText = "display: flex; justify-content: center; align-items: center;";
  
  document.getElementsByClassName("no-user-found")[0].innerHTML = "No User Found 😕";
  document.getElementsByClassName("no-user-found")[0].style.display = "block";
}

function resetResult() {
  document.getElementsByClassName("user-card")[0].style.display = "block";
  document.getElementsByClassName("title-section")[0].style.display = "none";
  document.getElementsByClassName("no-user-found")[0].innerHTML = "";
  document.getElementsByClassName("no-user-found")[0].style.display = "none";
  document.getElementById("avatar-img").setAttribute("src", "");
  document.getElementById("user-display-name").innerHTML = "";
  document.querySelector("#username a").setAttribute("href", "");
  document.querySelector("#username a").innerHTML = "";
  document.getElementById("user-created-date").innerHTML = "";
}
async function handleSearch() {
  user = await getUser(getInputValueByClassName("search-input"));
  resetResult();
  if (user) {
    populateUserPanel(user);
  } else {
    populateNoUserFound();
  }
}

// Trigger search when press Enter in search bar as well
var searchInput = document.getElementsByClassName("search-input")[0];
searchInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    handleSearch();
  }
});
// Trigger search when search button is clicked
var searchButton = document.getElementsByClassName("search-button")[0];
searchButton.addEventListener("click", () => handleSearch());