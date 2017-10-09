//Set width, margins and height of SVG element
var svg = d3.select('svg'),
    margin = {
      top: 200,
      right: 20,
      bottom: 0,
      left: 110
    },
    width  = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,

    //Calculates the X and Y values of the
    x = d3.scaleBand()
          //rangeRound sets the scale’s range to the specified two-element array of numbers while also enabling rounding
          .rangeRound([0, width])
          .padding(0.05),
    y = d3.scaleLinear()
          .rangeRound([height, 0]),
    //Append group element to SVG
    g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//Gets the data
d3.tsv('languages.tsv', function(d) {
  d.speakers = +d.speakers;
  return d;
}, function(error, data) {
    if (error) throw error;
    //domain is the input where range is the output, domain translates in relation to the range
    x.domain(data.map(function(d) { return d.language; }));
    //min: 0, max = highest number from data
    y.domain([0, d3.max(data, function(d) { return d.speakers; })]);

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        //Makes this group the bottom axis while getting the values of x
        .call(d3.axisBottom(x))
    g.append('g')
        .attr('class', 'axis axis--y')
        //Makes this group the left axis and setting 20 value indicators on the axis
        .call(d3.axisLeft(y).ticks(20))
      .append('text')
        //I believe styling (for most things) should be done in CSS but some attributes won't work
        .attr('class', 'label')
        .attr('y', -17)
        .attr('x', -20)
        .attr('dy', '1em')
        .text('speakers');

    g.selectAll('.bar')
      .data(data)
      //Adds the bar elements as 'rect's to the highest group
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.language); })
        .attr('width', x.bandwidth())
        //y and height reset for animation purposes
        .attr('y', function(d) {
            return y(0);
        })
        .attr('height', 0)
        //transition with dat elastic ease tho
        .transition()
          .ease(d3.easeElastic)
          .duration(3000)
          .delay(function(d, i) { return i*50; })
          .attr('y', function(d) { return y(d.speakers); })
          .attr('height', function(d) { return height - y(d.speakers); })
        .transition()
          .ease(d3.easeBounce)
          .duration(3000)
          .delay(function(d, i) { return (i*50) + 500; })
          .attr('y', function(d) {
              return y(0);
          })
          .attr('height', 0)
        .transition()
          .ease(d3.easeBounce)
          .duration(3000)
          .delay(function(d, i) { return i*50; })
          .style('fill', '#123456')
          .attr('y', function(d) { return y(d.speakers); })
          .attr('height', function(d) { return height - y(d.speakers); })
  });
