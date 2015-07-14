(function() {
	'use strict';

	angular.module('d3App.directives')
			.directive('d3Lines',['d3',
					function(d3) {
						return {
							restrict : 'EA',
							link : function(scope) {
								var data = [ 100, 25, 250, 300, 150,
										300, 200, 400, 200, 80, 450 ];
								var data2 = [ 0, 0, 0, 0, 0, 0, 0, 0,
										0, 0, 0, 0, 0 ];
								var width = 800, height = 500, margin = 45;
							// creating a div to contain line charts.
								var div = d3.select('body').append('div');
								var svg = div.append('svg:svg')
											.attr('width', width)
											.attr('height',	height)
											.style('background-color', '#eee');
							// on window resize, re-render d3 canvas
								window.onresize = function() {
											return scope.$apply();
											};
								scope.$watch(function() {
											return angular.element(window)[0].innerWidth;
													},
											function() {
												return scope.render(scope.data);
											});
							// define render function
								scope.render = function(d) {
							// remove all previous items before render
								svg.selectAll("*").remove();
							// setup variables
								var y = d3.scale.linear().domain(
										[ 0, d3.max(data) ]).range(
										[ 0 + margin,
										height - margin ]);
								var x = d3.scale.linear().domain(
										[ 0, data.length ]).range(
										[ 0 + margin,
										width - margin ]);
								var g = svg.append("svg:g").style(
										'stroke', '#fff').style(
										'fill', 'none');
								var lineGraph = d3.svg.line()
										.interpolate("monotone").x(
											function(d, i) {
												return x(i);
											}).y(function(d) {
												return height - y(d);
											});
							// draw the y axis
								g.append("svg:line")
										.attr("x1",x(0)).attr("y1", y(0))
										.attr("x2", x(0)).attr("y2",y(d3.max(data)));
							// draw the x axis
								g.append("svg:line")
										.attr("x1",x(0)).attr("y1",height - y(0))
										.attr("x2",width - margin).attr("y2",height - y(0));
							// x-axis label
								g.selectAll(".xLabel").data(x.ticks(5)).enter()
										.append("svg:text").attr("class","xLabel")
										.text(String).attr("x", function(d) {
														return x(d)
													}).attr("y",height - margin+ 20)
										.style('stroke-width', 0).style('fill', '#000')
										.attr("text-anchor","middle");

							// y-axis label
								g.selectAll(".yLabel").data(y.ticks(5)).enter()
										.append("svg:text").attr("class","yLabel").text(String)
										.attr("x", margin - 5).attr("y", function(d) {
														return height - y(d)
													}).attr("text-anchor","end")
										.style('stroke-width', 0)
										.style('fill', '#000');
							// x axis ticks
								g.selectAll(".xTicks").data(x.ticks(10)).enter()
										.append("svg:line").attr("class", "xTicks")
										.attr("x1", function(d) {
														return x(d);
													})
										.attr("y1", height - y(0))
										.attr("x2", function(d) {
														return x(d);
													})
										.attr("y2",height - y(0) + 5);

							// draw the y ticks
								g.selectAll(".yTicks").data(y.ticks(10)).enter()
										.append("svg:line").attr("class", "yTicks")
										.attr("y1", function(d) {
														return y(d);
													})
										.attr("x1", x(0) - 5)
										.attr("y2", function(d) {
														return y(d);
													})
										.attr("x2", x(0));

							// draw the x grid
								g.selectAll(".xGrids").data(x.ticks(10)).enter()
										.append("svg:line").attr("class", "xGrids")
										.attr("x1", function(d) {
														return x(d);
													})
										.attr("y1", y(0)).attr("x2", function(d) {
																return x(d);
															})
										.attr("y2",y(d3.max(data)));

							// draw the y grid
								g.selectAll(".yGrids").data(y.ticks(10)).enter()
										.append("svg:line").attr("class", "yGrids")
										.attr("y1", function(d) {
														return y(d);
													})
										.attr("x1",width - margin)
										.attr("y2", function(d) {
														return y(d);
													})
										.attr("x2", x(0));

							// line chart path
								g.append("svg:path").attr("d",lineGraph(data2))
										.transition().duration(1000)
										.attr("d",lineGraph(data))
										.style('stroke-width', 2)
										.style('fill', 'none');
										};
									}
								};
							} ]);

}());
