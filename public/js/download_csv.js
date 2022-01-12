const csvBtn = document.querySelector("#csv");
var count = 0;
csvBtn.addEventListener("click", e => {
    fetch("http://localhost:5000/createcsv", {
        method: "POST"
    }).then(async (result) => {
        if (result.status == 200 && count < 1) {
            return count++;
        } else {
            return console.log(result.message);
        }
    }).catch((err) => {
        console.log(err.message);
    });
})