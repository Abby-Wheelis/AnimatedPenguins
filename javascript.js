var PenguinPromise = d3.json("penguins/classData.json")

var screen = {width: 800, height: 500}
var margins = {top: 15, bottom: 25, left: 50, right: 15}

var setup = function(penguins)
{
    d3.select("svg")
    .attr("height", screen.height)
    .attr("width", screen.width)
    .append("g")
    .attr("id", "scatterplot")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
    .domain([0,40])
    .range([0, width])
    
    var yScale = d3.scaleLinear()
    .domain([0,10])
    .range([height,0])
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("svg")
    .append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select("svg")
    .append("g")
    .attr("id","yAxis")
    .attr("transform","translate(25,"+margins.top+")")
    .call(yAxis);
    
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins[0].quizes)
    .enter()
    .append("circle")
    .attr("fill", "#A15E49")
    
    makeButtons(penguins,xScale, yScale)
    
    drawScatterplot(penguins, xScale, yScale, 0)
}

var getGrade = function(quiz)
{
    return quiz.grade;
}

var drawScatterplot = function(penguins, xScale, yScale, index)
{
    var scatter = d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins[index].quizes)
    //.enter()
    //.append("circle")
    .transition()
    .attr("fill", "blue")
    .attr("cx", function(quiz)
    {
        return xScale(quiz.day);
    })
    .attr("cy", function(quiz)
    {
        return yScale(quiz.grade);
    })
    .attr("r", 3);
}

var makeButtons = function(penguins, xScale, yScale)
{
    d3.select("#buttonHome")
    .selectAll("button")
    .data(penguins)
    .enter()
    .append("button")
    .attr("id", function(penguin, index)
    {
        return index;
    })
    .on("click", function(penguin, index)
    {
        drawScatterplot(penguins, xScale, yScale, index)    
    })
    .append("img")
    .attr("src", function(penguin)
    {
        return "penguins/" + penguin.picture
    })
    
}


PenguinPromise.then(
function(penguins)
{
    console.log("data",penguins)
    
    setup(penguins)
    //makeButtons(penguins)
},
function(err)
{
    console.log("broken",err)
});
