const network = new brain.recurrent.LSTM();

document.getElementById("button-addon2").addEventListener("click", function () {

    document.getElementById("cardBox").classList.add("d-flex");
    document.getElementById("cardBox").classList.add("flex-column");
    document.getElementById("cardBox").classList.add("justify-content-center");
    document.getElementById("cardBox").classList.add("align-items-center");
    document.getElementById("cardBox").innerHTML =
        `<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <p class="text-center card-text m-3">Guessing...</p>`;

    let InputString = document.getElementById("inputBox").value;
    console.log(InputString);

    fetch("./trainingDataSet.json")
        .then(response => response.json())
        .then(dataSet => {

            console.log("Mapping values...")
            const trainingData = dataSet.map(item => ({
                input: item.msg,
                output: item.feelings
            }));

            console.log("Training data...")
            network.train(trainingData, { iterations: 500, log: true });
            const Output = network.run(InputString);
            console.clear();

            document.getElementById("cardBox").innerHTML =
                `<p class="card-text fs-2">You are feeling <b>${Output}</b></p>`;
        });
});