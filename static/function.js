document.getElementById("flower").focus();

async function search() {

    const resultBox = document.querySelector(".show_flower");
    const name = document.getElementById("flower").value.trim();
    const name_pattern = /^[A-Za-z ]+$/;

    if (!name) {
        alert("Please enter any flower name....")
        document.getElementById("flower").focus();
        document.getElementById("flower").value = ""
        return
    }
    else if (!name_pattern.test(name)) {
        alert("Please enter a valid name...");
        document.getElementById("flower").focus();
        document.getElementById("flower").value = ""
        return;
    }

    document.getElementById("flower").value = ""


    try {

        const response = await fetch("/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                f_name: name
            })
        });


        const result = await response.json();

        resultBox.classList.add("active");

        if (result.status === "success") {

            const flower = result.flower;
            resultBox.innerHTML = `
                <div class="flower-card">
                    <div class="flower-info">
                        <h2>🌸 ${flower.name}</h2>
                        <p>
                            <strong>Color:</strong>
                            ${flower.color}
                        </p>

                        <p>
                            <strong>Type:</strong>
                            ${flower.type}
                        </p>

                        <p>
                            <strong>Lifespan:</strong>
                            ${flower.lifespan}
                        </p>

                        <p>
                            <strong>Use:</strong>
                            ${flower.use}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            ${flower.location}
                        </p>

                    </div>
                </div>`;
        }

        else {
            resultBox.innerHTML = `
                <div>
                    <h2>🌱 Flower Not Found</h2>
                    <p>${result.message}</p>
                </div>`;
        }
    }

    catch (error) {
        console.error(error);
        resultBox.classList.add("active");
        resultBox.innerHTML = `
            <div>
                <h2>⚠️ Server Error</h2>
                <p>
                    Something went wrong while connecting
                    to the Flask server.
                </p>
            </div>`;
    }
    document.getElementById("flower").focus();

}



document.getElementById("flower").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search();
    }
});