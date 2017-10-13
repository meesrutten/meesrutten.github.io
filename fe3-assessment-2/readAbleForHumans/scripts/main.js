const barColor = '#593003';

//https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
//Added mouse over snippet which displays the title of the episode
var tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

//Set width, margins and height of SVG element
var svg = d3.select('svg'),
    margin = {
      top: 200,
      right: 20,
      bottom: 50,
      left: 110
    },
    width  = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,

    //Calculates the X and Y values of the
    x = d3.scaleBand()
          //rangeRound sets the scale’s range to the specified two-element array of numbers while also enabling rounding
          .rangeRound([0, width])
          .padding(.5),
    y = d3.scaleLinear()
          .rangeRound([height, 0]),
    //Append group element to SVG
    g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    //Add title to graph
    svg.append('text')
            .attr('x', (width / 2))
            .attr('y', 0 + (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .text('Trees in Bob Ross paintings, season 1');
    svg.append('text')
            .attr('x', (width / 2))
            .attr('y', 20 + (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .text('Click dem trees boi');

//Get csv as txt for cleaning
d3.text('bob-ross.csv')
  .mimeType('text/plain;charset=UTF-8')
  .get(onload)

  function onload(err, doc) {
    if(err) {
      throw err
    }
    var header = doc.indexOf('S01E01')
    //remove all untill header
    doc = doc.replace( doc.substring( 0, header ), '' )
    var startRemove = doc.indexOf('S02E01')
    var end = doc.lastIndexOf('\n')
    //remove everything else
    doc = doc.replace( doc.substring( startRemove, end ), '' )
    //parse data as csv
    var data = d3.csvParseRows(doc, map)
    //this pop fixes an empty node bug
    data.pop()
    //mapping interesting data...
    function map(d) {
      return {
        episode: d[0],
        title: d[1],
        trees: d[61],
      }
    }
    //domain is the input where range is the output, domain translates in relation to the range
    x.domain(data.map(function(d) { return d.episode; }));
    //min: 0, max = 1
    y.domain([d3.min(data, function(d){return d.trees;}), d3.max(data, function(d) { return d.trees; })]);

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        //Makes this group the bottom axis while getting the values of x
        .call(d3.axisBottom(x))
        //add legend for X axis
        .append('text')
          .attr('class', 'label')
          .attr('y', 25)
          .attr('x', 20)
          .attr('dy', '1em')
          .text('Episodes');

    g.append('g')
        .attr('class', 'axis axis--y')
        //Makes this group the left axis and setting 1 value indicator on the axis
        .call(d3.axisLeft(y).ticks(1))
        //add legend for Y axis
      .append('text')
        .attr('class', 'label')
        .attr('y', -17)
        .attr('x', -20)
        .attr('dy', '1em')
        .text('Are there trees?');

    var selection = g.selectAll('.bar')
      .data(data);

    selection = selection.enter()
      .append('g')
      //add transform for positioning
      .attr('transform', function(d) {
        return `translate(${x(d.episode)} 0)`;
      })
      //click down event which scales the tree for 1 second
      .on('mousedown', function(d, i){
        console.log('click');
        d3.select(this)
        .transition()
        .duration(1000)
        //i love elastic easing
        .ease(d3.easeElastic)
        .style('transform-origin', 'bottom')
        .attr('transform', `translate(${x(d.episode)} 0)scale(1.5)`)
      })
      //release click event resets the click down event
      .on('mouseup', function(d, i){
        console.log('click');
        d3.select(this)
        .transition()
        .delay(1000)
        .duration(1000)
        .ease(d3.easeElastic)
        .attr('transform', `translate(${x(d.episode)} 0)scale(1)`)
      })
      // add hover which displays the name of the episode
      .on('mouseover', function(d) {
        tooltip.transition()
          .duration(400)
          .style('opacity', .9);
        tooltip.html(d.title + '<br/>')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
        })
      .on('mouseout', function(d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        });

    // Adding the stump of the tree here
    selection.append('rect')
      .attr('class', 'bar')
      .attr('fill', barColor)
      .attr('width', x.bandwidth())

      .attr('y', function(d) {
          return y(0);
      })
      .attr('height', 0)
      //transition with dat elastic ease tho
      .transition()
        .ease(d3.easeBounce)
        .duration(1000)
        .delay(function(d, i) { return i*50; })
        .attr('y', function(d) { return y(d.trees); })
        .attr('height', function(d) {
          return height - y(d.trees);
        })

    // Adding the top of the tree here (green triangle)
    selection.append('path')
      .attr('fill', 'green')
      .attr('d', 'M 50,-50 95,97.5 5,97.5 z')
      // If the data returns 0, don't display the triangle
      .attr('height', function(d) {
        if( height - y(d.trees) <= 0){
          d3.select(this).style('display', 'none')
        }
      })
      .attr('y', function(d) { return y(d.trees); })
      // .style('transform', 'translateX(-38%)')
      .style('stroke', 'darkgreen')
      .attr('opacity', 0)
      .style('transform', 'translateX(-35px)scale(0)')
      .transition()
        .duration(function(d, i) { return i*80; })
        .delay(3000)
        .attr('opacity', 1)
        .style('transform', 'translateX(-35px)scale(1)')
    }
