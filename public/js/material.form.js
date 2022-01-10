const form = document.querySelector("#material-form");
const identifier = document.querySelector("#identifier");
// let data = new FormData();
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    var myForm = new FormData();
    myForm.append("name", e.srcElement[0].value);
    myForm.append("image", e.srcElement[1].files[0]);
    myForm.append("state", e.srcElement[2].value);
    myForm.append("price", e.srcElement[3].value);
    myForm.append("quan", e.srcElement[4].value);
    if (identifier.textContent == "Add Material") {
        try {
            fetch("http://localhost:5000/addmaterial", {
                method: "POST",
                body: myForm
            }).then((result) => {
                result.json().then(data => {
                    console.log(data);
                })
            })
        } catch (err) {
            return console.log(err.message);
        }
    } else {
        if (identifier.textContent == "Add Material") {
            try {
                fetch("http://localhost:5000/editmaterail", {
                    method: "POST",
                    body: myForm
                }).then((result) => {
                    result.json().then(data => {
                        console.log(data);
                    })
                })
            } catch (err) {
                return console.log(err.message);
            }
        }
    }
})