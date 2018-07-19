//javascript


var datastring  = [];

var datastringInput  = document.getElementById("datastring");
var messageBox  = document.getElementById("display");
function insert ( ) {
 datastring.push( datastringInput.value );
}
// This is the original blue bar chart 
messageBox.innerHTML = datastringInput.value;
var dataArray = [datastring];
//var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];
//}
var svg = d3.select("body").append("svg")
          .attr("height","100%")
          .attr("width","100%");

svg.selectAll("rect")
    //.data(dataArray)
           .data(dataArray)
    .enter().append("rect")
	  .attr("class", "bar")
          .attr("height", function(d, i) {return (d * 10)})
          .attr("width","40")
          .attr("x", function(d, i) {return (i * 60)+25})
          .attr("y", function(d, i) {return 400 - (d * 10)})
	  .attr("stroke", "black")
          .attr("stroke-width", "1");

//svg.selectAll("text")
  //  .data(datastring)
   // .enter().append("text")
   // .text(function(d) {return d;})
    	//	.attr("class", "text")
	//	.attr("x", function(d, i) {return (i * 60) + 36})
          //	.attr("y", function(d, i) {return 415 - (d * 10)});
        
//clearAndShow();
//}

//function clearAndShow () {
  // Clear our fields
  //datastringInput.value = "";

  
  // Show our output
 // 
  //messageBox.innerHTML += "datastringx: " + datastring.join(", ") + "<br/>";
 // messageBox.innerHTML = datastring;
//}