const csvBtn = document.querySelector("#csv");
var count1 = 0;
csvBtn.addEventListener("click", e => {
    fetch("http://localhost:5000/createcsv", {
        method: "POST",
        body: JSON.stringify({
            schema: "material"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (result) => {
        console.log(result);
        if (result.status == 200 && count1 < 1) {
            csvBtn.href = "./datamaterial.csv";
            csvBtn.download = "datamaterial.csv"
            csvBtn.click();
            window.location.reload();
            return count1++;

        } else {
            return console.log(result.message);
        }
    }).catch((err) => {
        console.log(err.message);
    });
})