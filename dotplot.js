async function drawdotplot() {

  // 1. Access data

  let dataset = await d3.csv("fruit.csv")
 //console.table(dataset);
  const x1Accessor = d => d.Amount_2017
  const x2Accessor = d => d.Amount_2018
  const yAccessor = d => d.Fruit
  

  // 2. Create chart dimensions

  let dimensions = {
    width: 1000,
    height: 500,
    margin: {
      top: 20,
      right: 25,
      bottom: 20,
      left: 20,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left
      }, ${
        dimensions.margin.top
      })`)

 

  // 4. Create scales

  /*const yScale = d3.scaleOrdinal()  
    .domain(dataset.map(function(d) { return d.Fruit} ))  //make array of fruits
    .range([dimensions.boundedHeight,0])
	//.padding(0.1)*/
  const yScale = d3.scaleBand()
		.range([0,dimensions.boundedHeight])
		.domain(dataset.map(function(d) {return d.Fruit; }))
		.padding(1);

  const xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0, dimensions.boundedWidth])
	

  // 5. Draw data
 /* var svg = d3.select("body")  don't need this
						.append("g")
						.attr("width", dimensions.BoundedWidth)
						.attr("height", dimensions.BoundedHeight);*/
  
 /* dataset.sort(function(a,b) { 
	return d3.descending(+a.Amount_2017,+b.Amount_2018)
  });*/
  

  // 6. Draw peripherals

 
 const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
	

  const xAxis = bounds.append("g")
      .attr("class", "x-axis")
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)
      .call(xAxisGenerator)
	
//const yAxisGenerator = d3.axisLeft()
  //  .scale(yScale)
	//.ticks(4)

 const yAxis = bounds.append("g")
     // .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))

	const xAxisLabel = xAxis.append("text")
					//.attr("class", "xlabel")
					.attr("x", dimensions.boundedWidth /2) 
					.attr("y", dimensions.margin.bottom -5)
					.attr("fill", "black")
					.style("font-size", "1.4em")
					.text("Percent")
					//.attr("dy", "12")
					
        	



  //load up data elements
  
  // Lines
  bounds.selectAll("myline")
    .data(dataset)
    .enter()
    .append("line")
      .attr("x1", function(d) { return xScale(d.Amount_2017); })
      .attr("x2", function(d) { return xScale(d.Amount_2018); })
      .attr("y1", function(d) { return yScale(d.Fruit); })
      .attr("y2", function(d) { return yScale(d.Fruit); })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px")
  
  //make the 2017 dots
	
	const dot1 = bounds.selectAll("circle")
		.data(dataset)
		.enter().append("circle")
		.attr("cx", function(d) { return  xScale(d.Amount_2017); })
		.attr("cy", function(d) { return  yScale(d.Fruit); })
		//.attr("cx", d => xScale(x1Accessor(d)))
		//.attr("cy", d => yScale(yAccessor(d)))
		.attr("r", 5)
		//.attr("class","y2017")
		.style("fill", "#69b3a2")
		
					
	//make the 2017 dots
	
	const dot2 = bounds.selectAll("circle")
		.data(dataset)
		.enter().append("circle")
		.attr("cx", function(d) { return  xScale(d.Amount_2018); })
		.attr("cy", function(d) { return  yScale(d.Fruit); })
		//.attr("cx", d => xScale(x1Accessor(d)))
		//.attr("cy", d => yScale(yAccessor(d)))
		.attr("r", 5)
		//.attr("class","y2018")
		.style("fill", "#4C4082")
	
  
  // 7. Set up interactions

  /*

  const tooltip = d3.select("#tooltip")
  const tooltipCircle = bounds.append("circle")
      .attr("class", "tooltip-circle")
      .attr("r", 4)
      .attr("stroke", "#af9358")
      .attr("fill", "white")
      .attr("stroke-width", 2)
      .style("opacity", 0)

  function onMouseMove() {
    const mousePosition = d3.mouse(this)
    const hoveredDate = xScale.invert(mousePosition[0])

    const getDistanceFromHoveredDate = d => Math.abs(xAccessor(d) - hoveredDate)
    const closestIndex = d3.scan(dataset, (a, b) => (
      getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
    ))
    const closestDataPoint = dataset[closestIndex]

    const closestXValue = xAccessor(closestDataPoint)
    const closestYValue = yAccessor(closestDataPoint)

    const formatDate = d3.timeFormat("%B %A %-d, %Y")
    tooltip.select("#date")
        .text(formatDate(closestXValue))

    const formatTemperature = d => `${d3.format(".1f")(d)}°F`
    tooltip.select("#temperature")
        .text(formatTemperature(closestYValue))

    const x = xScale(closestXValue)
      + dimensions.margin.left
    const y = yScale(closestYValue)
      + dimensions.margin.top

    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc(-100% + ${y}px)`
      + `)`)

    tooltip.style("opacity", 1)

    tooltipCircle
        .attr("cx", xScale(closestXValue))
        .attr("cy", yScale(closestYValue))
        .style("opacity", 1)
  }

  function onMouseLeave() {
    tooltip.style("opacity", 0)

    tooltipCircle.style("opacity", 0)
  }*/
}
drawdotplot()
//reference: https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html
//reference: https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3
