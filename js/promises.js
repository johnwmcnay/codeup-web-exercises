function gitData(url) {
    return fetch(url,
        {headers: {'Authorization': gitToken}})
        .then(response => response.json());
}

gitData("https://api.github.com/users/johnwmcnay/events")
    .then(data => {
        return data;
    })
    .then(data => {
        let i = 0;

        while (i < data.length) {
            if (data[i].type === "PushEvent") {
                break;
            }
            i++;
        }
        console.log(data[i].created_at);
    });

function wait(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`You will see this after ${(delay / 1000).toFixed(2)} seconds.`);
        }, delay);
    });
}

wait(3000).then(msg => console.log(msg));
wait(1500).then(msg => console.log(msg));