function MetaData(sample) { 
    d3.json("samples.json").then((data)=>{
    var metadata = data.metadata;
    // Filter the data for each sample
    var ArrayResult = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = ArrayResult[0];
    
    // use d3 to place in the index
    var metaDataPanel = d3.select("#sample-metadata");

    // use html to clear any input if present
    metaDataPanel.html("");

    // use ojbect entries to add each key and value from the json
    Object.entries(result).forEach(([key, value]) => {
        metaDataPanel.append("h5").text(`${key.toUpperCase()}: ${value}`)
        console.log(key, value)
    });


    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) =>{
        var samples = data.samples;
        var ArrayResult = samples.filter(sampleObj=> sampleObj.id == sample);
        var result = ArrayResult[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        

        // Build the barchart

        var barChart = [
            {
                y: otu_ids.slice(0,10).map(OTUID => `OTU ${OTUID}`).reverse(),
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria",
            margin: {t:40, l:170}
        }
        Plotly.newPlot("bar", barChart, barLayout);

    });
}

function init() {
    // put data in the dropdown
    var selector = d3.select("#selDataset");

    // loop thru the data set options
    d3.json("samples.json").then((data) =>{
        var samplesNames = data.names;

        samplesNames.forEach((sample) => {
            selector
             .append("option")
             .text(sample)
             .property("value", sample);
        });


        // Use the first sample to build the plot
        var oneSample = samplesNames[0];
        buildCharts(oneSample);
        MetaData(oneSample);
    });
}
// function to generate change
function optionChanged(newSample){
    buildCharts(newSample);
    MetaData(newSample);
}

// run the code
init();