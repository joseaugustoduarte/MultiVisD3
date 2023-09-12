// document.body.style.zoom = "100%";
// console.log(window.outerWidth / window.innerWidth)

const height = (window.innerHeight * 90)/100,
    width = (window.innerWidth * 90)/100,
    marginTop = (height * 10) / 100,
    margin = {top: 20, right: 20, bottom: 100, left: 20, label: height - ((height * 85) / 100)};

let loaderBootBox = d3.select(".vis")
    .append("svg")
    .attr('id', 'loaderBootBox')
    .attr("height", height)
    .attr("width", width)
    .style("text-align", 'center')
    .style("color", '#eee')
    .style("font-family", 'system-ui, sans-serif')
    .style("display", 'block')
    .style("margin", '0 auto')

// loaderBootBox.append('rect')
//     .attr("height", height)
//     .attr("width", width)
//     .style("fill", "green")
//     .style("stroke", "red")
//     .style("stroke-width", '5')

let labelBox = loaderBootBox
    .append('g')
    .attr('id', 'labelBox')
    .attr("transform", "translate( 0 " + marginTop + ")")
    .attr("height", (margin.label * 3))
    .attr("width", width)

// labelBox.append('rect')
//     .attr("height", (margin.label * 3))
//     .attr("width", width)
//     .style("fill", "yellow")
//     .style("stroke", "pink")
//     .style("stroke-width", '5')

let labelTitle = labelBox
    .append('g')
    .attr('id', 'labelTitle')
    .attr("transform", "translate( 0 " + (marginTop) + ")")
    .attr("height", margin.label)
    .attr("width", width)

// labelTitle.append('rect')
//     .attr("height", margin.label)
//     .attr("width", width)
//     .style("fill", "blue")
//     .style("stroke", "white")
//     .style("stroke-width", '5')

let labelLoading = labelBox
    .append('g')
    .attr('id', 'labelLoading')
    .attr("transform", "translate( 0 " + (margin.label + marginTop * 2) + ")")
    .attr("height", margin.label)
    .attr("width", width)

// labelLoading.append('rect')
//     .attr("height", margin.label)
//     .attr("width", width)
//     .style("fill", "white")
//     .style("stroke", "black")
//     .style("stroke-width", '5')

/* add informaçoes */

labelTitle.append("text")
    .attr("x", width / 2)
    .attr("y", margin.label / 2)
    .text("Multi Vis D3: Projection Error Analiser")
    .style('font-size', '40px')
    .style('font-family', 'Helvetica Neue, Helvetica, Arial, sans-serif')
    .style('font-weight', 'bold')
    .style('text-anchor',"middle")
    .style('alignment-baseline',"central")

labelLoading.append("text")
    .attr("x", width / 2)
    .attr("y", margin.label / 2)
    .text("Loading")
    .style('font-size', '20px')
    .style('font-family', 'Helvetica Neue, Helvetica, Arial, sans-serif')
    .style('font-weight', 'bold')
    .style('text-anchor',"middle")
    .style('alignment-baseline',"central")

let htmlBox = loaderBootBox
    .append('g')
    .attr('id', 'progressBarHtml')
    .attr("transform", "translate( 0 " + (margin.label*2 + marginTop * 3) + ")")
    .append("foreignObject")
    .attr("height", margin.label*3)
    .attr("width", width)
    .append("xhtml:body")
    .html("<div class='meter'>\n" +
        "   <span class = 'progressBarSpan' style = 'width: 0%'>\n" +
        "       <span class='progressBarSpanSpan' style='flex-grow: 1'></span>\n" +
        "   </span>\n" +
        " </div>")

let loading = 0;
function move() {
    if ((d3.select(".progressBarSpan")[0][0] === null) === false){
        if (loading === 0) {
            loading = 1;
            let width = 1;
            let id = setInterval(frame, 1);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    loading = 0;
                    move()
                } else {
                    width = width + .3;
                    d3v4.select('.progressBarSpan').style('width', width+'%')
                }
            }
        }
    }
}
move()