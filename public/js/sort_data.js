const Tname = document.querySelector("#name");
const Tprice = document.querySelector("#price");
const Tqty = document.querySelector("#qty");
const Tcreated = document.querySelector("#created");
Tname.addEventListener("click", (e) => {
    fetch("http://localhost:5000/getdata", {
        method: "post"
    }).then(async result => {
        if (result.status == 200) {
            result.json().then(async (res) => {
                let sortedData = res.result.sort((a, b) => (a.name > b.name) ? 1 : -1)
                try {
                    await fetch("http://localhost:5000/sorted", {
                        method: "post",
                        body: JSON.stringify(sortedData),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                } catch (err) {
                    console.log(err.message);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    })
})