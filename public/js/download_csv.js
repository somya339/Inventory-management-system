const csvBtn = document.querySelector("#csv");

csvBtn.addEventListener("click", e => {
    fetch("http://localhost:5000/createcsv", {
        method: "POST"
    }).then((result) => {
        if (result.status == 401) {
            e.target.download = "../../uploads/data.csv";
            e.target.click();
        } else {
            console.log(result.message);
        }
    }).catch((err) => {
        console.log(err.message);
    });
})