const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];


// Use .filter to create an array of user objects where each user object has at least 3 languages in the languages array.
let threeOrMoreLanguages = users.filter(obj => obj.languages.length > 2);

console.log(threeOrMoreLanguages);

//     Use .map to create an array of strings where each element is a user's email address
let emails = users.map(obj => obj.email);

console.log(emails);

// Use .reduce to get the total years of experience from the list of users. Once you get the total of years you can use the result to calculate the average.
let totalYears = users.reduce((total, obj) => {
    return total + obj.yearsOfExperience;
}, 0);

let average = totalYears / users.length;

let averageYears = users.reduce((total, obj, index) => {
    if (index === users.length - 1) {
        return (total + obj.yearsOfExperience) / users.length;
    }
    return total + obj.yearsOfExperience
}, 0);

console.log(averageYears);

//     Use .reduce to get the longest email from the list of users.
let longestEmail = emails.reduce((longest, email) => {
    if (email.length > longest.length) {
        return email;
    } else {
        return longest;
    }
}, "");

console.log(longestEmail);
//     Use .reduce to get the list of user's names in a single string.
//     Example: Your instructors are: ryan, luis, zach, fernando, justin.
let instructors = users.reduce((output, obj, index) => {

    if (index === users.length - 1) {
        return `${output} and ${obj.name}.`;
    } else {
        return `${output} ${obj.name},`;
    }

    }, "Your instructors are:");

console.log(instructors);