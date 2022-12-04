import React, { Component } from 'react';
import './App.css';

/* global brain */

const network = new brain.recurrent.LSTM();

window.onload = function () {
    document.getElementById("button-addon2").addEventListener("click", function () {

        let InputString = document.getElementById("inputBox").value;
        console.log(InputString);

        // Loading JSON data
        fetch("./trainingDataSet.json")
            .then(response => response.json())
            .then(dataSet => {

                // Mapping values
                console.log("Mapping values...")
                const trainingData = dataSet.map(item => ({
                    input: item.msg,
                    output: item.feelings
                }));

                // Training Model
                console.log("Training data...")
                network.train(trainingData, { iterations: 500, log: true });
                const Output = network.run(InputString);  // Build model
                console.clear();

                // See results
                document.getElementById("cardBox").innerHTML =
                    `<p className="card-text fs-2">You are feeling <b>${Output}</b></p>`;
            });
    });
}

class App extends Component {

    render() {
        return (
            <><div className="App">
                <div className="App-header">
                    <img src="https://i.imgur.com/pEds07b.png" className="App-logo" alt="logo" />
                    <h2>Emotion Detection</h2>
                </div>
            </div>

                <div className="d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-lg-6">
                                <div className="">
                                    <input type="text" className="form" placeholder="Describe how are you feeling today...">
                                    </input>
                                    <button className="button" type="button" id="button-addon2">Detect</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>
        );
    }

}
export default App;