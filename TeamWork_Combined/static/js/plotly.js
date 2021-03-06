function init() {
    d3.json("/doseone").then(function (data) {
        var sd = [];
        var cd = [];
        data.forEach(s => {
            Object.entries(s).forEach(([key, value]) => {
                if (key === "symptom") {
                    sd.push(value);
                }else {
                    cd.push(value);
                }
            })
        })
        console.log(cd.reduce((a, b) => a + b, 0));
        // total count of all symptoms: 4882
        // console.log(cd.slice(-1));
        var ts = sd.slice(0, 9);
        // console.log(ts);
        var td = cd.slice(0, 9);

        ts.push("All Other Symptoms");
        td.push(cd.reduce((a, b) => a + b, 0) - td.reduce((a, b) => a + b, 0));
        console.log(ts);
        // console.log(td);
        data = [{
            labels: ts,
            values: td,
            type: "pie",
        }]
        Plotly.newPlot("pie", data);
    })
}
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    if (dataset === "dose1") {
        d3.json("/doseone").then(function (data) {
            var sd1 = [];
            var cd1 = [];
            data.forEach(s => {
                Object.entries(s).forEach(([k, v]) => {
                    if (k === "symptom") {
                        sd1.push(v);
                    } else {
                        cd1.push(v);
                    }
                })
            });
            var topSymptoms = sd1.slice(0, 9);
            // console.log(topSymptoms);
            var topCounts = cd1.slice(0, 9);
            topSymptoms.push("All Other Symptoms");
            topCounts.push(4882 - topCounts.reduce((a, b) => a + b, 0));
            // console.log(topCounts);
            var x =topSymptoms;
            var y =topCounts;
            type = "pie";
            Plotly.restyle("pie", "labels", [x]);
            Plotly.restyle("pie", "values", [y]);
            Plotly.restyle("pie", "type", type);
        })
    }
    else if (dataset === 'dose2') {
        d3.json("/dosetwo").then(function (data) {
            var sd2 = [];
            var cd2 = [];
            data.forEach(s => {
                Object.entries(s).forEach(([k, v]) => {
                    if (k === "symptom") {
                        sd2.push(v);
                    } else {
                        cd2.push(v);
                    }
                })
            });
            var topSymptoms2 = sd2.slice(0, 9);
            // console.log(topSymptoms2);
            var topCounts2 = cd2.slice(0, 9);
            // console.log(topCounts2);

            topSymptoms2.push("All Other Symptoms");
            topCounts2.push(cd2.reduce((a, b) => a + b, 0) - topCounts2.reduce((a, b) => a + b, 0));

            var x =  topSymptoms2;
            var y = topCounts2;
            type = "pie";
            Plotly.restyle("pie", "labels", [x]);
            Plotly.restyle("pie", "values", [y]);
            Plotly.restyle("pie", "type", type);
        })
    }
    else {
        d3.json("/otherdose").then(function (data) {
            var os = [];
            var oc = [];
            data.forEach(s => {
                Object.entries(s).forEach(([k, v]) => {
                    if (k === "symptom") {
                        os.push(v);
                    } else {
                        oc.push(v);
                    }
                })
            });
            var topSymptoms3 = os.slice(0, 9);
            // console.log(topSymptoms3);
            var topCounts3 = oc.slice(0, 9);
            // console.log(topCounts3);

            topSymptoms3.push("All Other Symptoms");
            topCounts3.push(oc.reduce((a, b) => a + b, 0) - topCounts3.reduce((a, b) => a + b, 0));

            var x =topSymptoms3;
            var y = topCounts3;
            type = "pie";
            Plotly.restyle("pie", "labels", [x]);
            Plotly.restyle("pie", "values", [y]);
            Plotly.restyle("pie", "type", type);
        })
    }
};
init();