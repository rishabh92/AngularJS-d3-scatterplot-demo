angular.module('readinessZone1', [])
.directive("scatterChart",function(){  
    return {
      restrict:'E',
      scope: { 
        data: '=' 
      },
      link: function(scope, element, attrs) {

        var margin = {top: 20, right: 20, bottom: 70, left: 40},
            width = 700 - margin.left - margin.right,
            height = 680 - margin.top - margin.bottom;
        var xAxis,yAxis;
        var xScale = d3.scale.linear().range([0, width]);
        var yScale = d3.scale.linear().range([height, 0]);
            xScale.domain([-1.2, 1.2]);
            yScale.domain([-19, 19]);
        // tooltip    
        var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function(d) {
              return  d.Major + "<br>" + Math.round(d.Interest*10000)/10000 + ", " + Math.round(d.Academic*10000)/10000;
            });

        var zoomBeh = d3.behavior.zoom()
            .x(xScale)
            .y(yScale)
            .scaleExtent([1, 8])
            .on("zoom", zoom);


        var svg = d3.select("#scatter").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(zoomBeh);

       
        svg.call(tip);
        scope.$watch('data', function(newVals, oldVals) {
          reset();
          scope.render(newVals);   
        }, true);

        scope.render = function(data){
         
        // setup x 
        svg.selectAll("*").remove();

      
        var xValue = function(d) { return d.Marks1;}, // data -> value
            xMap = function(d) { return xScale(xValue(d));}; // data -> display
         xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(-height);;

        // setup y
        var yValue = function(d) { return d.Marks2;}, // data -> value
            yMap = function(d) { return yScale(yValue(d));} // data -> display
         yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(-width);

        
        // setup fill color
        var cValue = function(d) { return d.Subject;},
            color = d3.scale.category10();
          
      
        // rectangle for smooth zoom
        var rect2 = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            
        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .attr("text-anchor", "end")
            .text("Interest Fit")  
          
          // y-axis
          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Academic Fit")       

               
          var objects = svg.append("svg")
                .classed("objects", true)
                .attr("width", width)
                .attr("height", height);  
                                          
          // draw dots

          objects.selectAll(".dot")
              .data(data)
              .enter().append("circle")
              .attr("class", "dot")
              .attr("cx", function (d) { return d.Marks1; } })
               .attr("cy", function (d) { return d.Marks2; })
              .attr("r", 5)
              .attr("transform", transform)
              .style("fill", function(d) { return color(cValue(d));}) 
              .on("mouseover", tip.show)
              .on("mouseout", tip.hide);
          }
          // zoom function
          function zoom() {
            
            svg.select(".x.axis").call(xAxis);
            svg.select(".y.axis").call(yAxis);
            svg.selectAll(".dot")
              .attr("transform", transform); 
                  
          }
         
          // transale the dots when zoom      
          function transform(d) {
              return "translate(" + xScale(d["Marks1"]) + "," + yScale(d["Marks2"]) + ")";
          }
         
        }
    }

  });
