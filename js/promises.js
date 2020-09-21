function gitData(url) {
    return fetch(url,
        {headers: {'Authorization': gitToken}})
        .then(response => response.json());
}

gitData("https://api.github.com/users/johnwmcnay/events")
    .then(data => {
        console.log(data[0].created_at);
    });
