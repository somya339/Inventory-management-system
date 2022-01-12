const csvBtn2 = document.querySelector("#csv2");
var count2 = 0;
csvBtn2.addEventListener("click", e => {
    fetch("http://localhost:5000/createcsv", {
        method: "POST",
        body: JSON.stringify({
            schema: "supplier"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (result) => {
        console.log(result);
        if (result.status == 200 && count2 < 1) {
            csvBtn2.href = "./dataSupplier.csv";
            csvBtn2.download = "dataSupplier.csv"
            csvBtn2.click();
            window.location.reload();
            return count2++;

        } else {
            return console.log(result.message);
        }
    }).catch((err) => {
        console.log(err.message);
    });
})