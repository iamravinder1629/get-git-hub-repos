const url = "https://api.github.com/users/";
const container = document.getElementById("main")

// fetching data from git api
const getdetails = async (username) => {
    const loader = `<div class="loader">
                <div class="loading"></div>
            </div>`
    container.innerHTML = loader;
    const response = await fetch(url + username);
    const data = await response.json();

    console.log(data.status);
    
    if (data.status === "404") {
        const err = `<div class="text-center">
                        <h1>404</h1>
                        <h4>users not found</h4>
                    </div>`
        container.innerHTML = err;
        console.log(data.status);

    } else {
        const card =
            `<div class="row mx-0 p-2 justify-content-center">
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12 d-flex align-items-center justify-content-center right">
                        <div class="profile">
                            <img src="${data.avatar_url}" alt="">
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-8 col-xs-12 left">
                        <h1>${data.login}</h1>
                        <p><b>${data.bio ? data.bio : "bio-"}</b></p>
                        <ul class="info">
                            <li><strong>Followers</strong> ${data.followers} </li>
                            <li><strong>Following</strong>  ${data.following}</li>
                            <li><strong>Repository</strong> ${data.public_repos}</li>
                        </ul>
                        <div class="repos" id="repos">
                        </div>
                    </div>
                </div>`
        container.innerHTML = card;
    }


    getrepos(username)
}
// creating repositories
const getrepos = async (username) => {
    const repos = document.getElementById("repos")
    const response = await fetch(url + username + '/repos');
    const data = await response.json();
    data.forEach((item) => {
        const anchor = document.createElement("a");
        anchor.href = item.html_url;
        anchor.innerHTML = item.name;
        anchor.target = "_blank"
        repos.appendChild(anchor)
    })
}

// search profile
const submit = document.getElementById("search");
submit.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputbox = document.getElementById("inputbox");
    if (inputbox.value != "") {
        getdetails(inputbox.value);
        inputbox.value = ""
    }
})


