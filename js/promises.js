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

fetch("https://platinum-satisfying-caption.glitch.me/movies")
    .then(response => response.json())
    .then(data => console.log(data));

fetch(`https://omdbapi.com/?apikey=${omdbToken}&s=summer`)
    .then(response => response.json())
    .then(data => console.log(data));

const reviewObj = {
    restaurant_id: 1,
    name: 'John',
    rating: 2,
    comments: "Slow service! Mediocre food!"
};
const url = 'https://codeup-restful-example.glitch.me/reviews';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewObj),
};
fetch(url, options)
    .then( response => console.log(response) ) /* review was created successfully */
    .catch( error => console.error(error) ); /* handle errors */