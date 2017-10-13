"use strict";function onload(t,e){function a(t){return{episode:t[0],title:t[1],trees:t[61]}}if(t)throw t;var r=e.indexOf("S01E01");e=e.replace(e.substring(0,r),"");var n=e.indexOf("S02E01"),s=e.lastIndexOf("\n");e=e.replace(e.substring(n,s),"");var i=d3.csvParseRows(e,a);i.pop(),x.domain(i.map(function(t){return t.episode})),y.domain([d3.min(i,function(t){return t.trees}),d3.max(i,function(t){return t.trees})]),g.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+height+")").call(d3.axisBottom(x)).append("text").attr("class","label").attr("y",25).attr("x",20).attr("dy","1em").text("Episodes"),g.append("g").attr("class","axis axis--y").call(d3.axisLeft(y).ticks(1)).append("text").attr("class","label").attr("y",-17).attr("x",-20).attr("dy","1em").text("Are there trees?");var o=g.selectAll(".bar").data(i);o=o.enter().append("g").attr("transform",function(t){return"translate("+x(t.episode)+" 0)"}).on("mousedown",function(t,e){d3.select(this).transition().duration(1e3).ease(d3.easeElastic).style("transform-origin","bottom").attr("transform","translate("+x(t.episode)+" 0)scale(1.5)")}).on("mouseup",function(t,e){d3.select(this).transition().delay(1e3).duration(1e3).ease(d3.easeElastic).attr("transform","translate("+x(t.episode)+" 0)scale(1)")}).on("mouseover",function(t){tooltip.transition().duration(400).style("opacity",.9),tooltip.html(t.title+"<br/>").style("left",d3.event.pageX+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(t){tooltip.transition().duration(500).style("opacity",0)}),o.append("rect").attr("class","bar").attr("fill",barColor).attr("width",x.bandwidth()).attr("y",function(t){return y(t.trees)}).attr("height",function(t){return height-y(t.trees)}),o.append("path").attr("fill","green").attr("d","M 50,-50 95,97.5 5,97.5 z").attr("height",function(t){height-y(t.trees)<=0&&d3.select(this).style("display","none")}).attr("y",function(t){return y(t.trees)}).style("transform","translateX(-38%)").style("stroke","darkgreen")}var barColor="#593003",tooltip=d3.select("body").append("div").attr("class","tooltip").style("opacity",0),svg=d3.select("svg"),margin={top:200,right:20,bottom:50,left:110},width=+svg.attr("width")-margin.left-margin.right,height=+svg.attr("height")-margin.top-margin.bottom,x=d3.scaleBand().rangeRound([0,width]).padding(.5),y=d3.scaleLinear().rangeRound([height,0]),g=svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");svg.append("text").attr("x",width/2).attr("y",0+margin.top/2).attr("text-anchor","middle").style("font-size","24px").text("Trees in Bob Ross paintings, season 1"),svg.append("text").attr("x",width/2).attr("y",20+margin.top/2).attr("text-anchor","middle").style("font-size","12px").text("Click dem trees boi"),d3.text("bob-ross.csv").mimeType("text/plain;charset=UTF-8").get(onload);