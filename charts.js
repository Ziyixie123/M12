function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
     var sampleArray =data.samples;
    // console.log(sampleArray);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
     var Array1 = sampleArray.filter(sampleObj => parseInt(sampleObj.id) == sample); 
    //console.log(Array1);
    //  5. Create a variable that holds the first sample in the array.
     var targetArray = Array1[0];
    //console.log(targetArray);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var idArray = targetArray.otu_ids;
    var labelArray = targetArray.otu_labels;
    var valueArray = targetArray.sample_values;

 
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    // so the otu_ids with the most bacteria are last. 


    var yticks = [];
    var xticksb = [];
    var xticks = [];
    var text =[];
    var size =[];
    var idc=[];
   

    for (i = 0; i <10; i++){
      
    yticks.push("OTU "+idArray[i]);
    xticksb.push(idArray[i]);
    
    xticks.push(valueArray[i]);
    size.push(valueArray[i]/2);
    
    idc.push(idArray[i]);

    text.push(labelArray[i]);
   
    
    //console.log(text);

    }
    // 8. Create the trace for the bar chart. 
    
    var barData = [
      {
        x: xticks,
        y: yticks,
        type: 'bar',
        orientation: 'h'

      }
    ];
    
  
    // 9. Create the layout for the bar chart. 
  

    var barLayout = {
      title: "Top 10 bacterial culture found ",
     };
   
   // 10. Use Plotly to plot the data with the layout. 
   Plotly.newPlot("bar", barData, barLayout);
 
  //#This is deliverable chart 2 for bubble chart 

  // 1. Create the trace for the bubble chart.
  var bubble = {
    x: xticksb,
    y: xticks,
    text: text,
    mode: 'markers',
    marker: {
      color: idc,
      //['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(103, 164, 214)', 'rgb(265, 144, 14)',  'rgb(54, 160, 101)', 'rgb(265, 65, 54)','rgb(93, 174, 214)', 'rgb(255, 154, 14)'],
      
      size: size
    }
  };
  
  var bubbleData  = [bubble];
  
  // 2. Create the layout for the bubble chart.
  var layout = {
    showlegend: false,
   
    xaxis: {
      title: {
        text: "OTU ID",
       
      }},

    title: 'Bacteria culture per sample',
   
  };
 
  // 3. Use Plotly to plot the data with the layout.

  Plotly.newPlot('bubble', bubbleData, layout);


  //this is gauge -delieveable 3 
  
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var gArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    

    // 2. Create a variable that holds the first sample in the metadata array.
    var gresult = gArray[0];
    

    // 3. Create a variable that holds the washing frequency.
    var washF = parseFloat(gresult.wfreq);
    //console.log(washF);
   
   
    
    // 4. Create the trace for the gauge chart.
    //var gaugeData = [
     
    //];
    var gaugeData  = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washF,
        title: { text: "Belly bottom wash frequency",font: { size: 24 } ,},
      

        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ],
          bar: { color: "black" },
        }
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, layout);
    // 5. Create the layout for the gauge chart.
   
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, layout);
 
  });


  
}
