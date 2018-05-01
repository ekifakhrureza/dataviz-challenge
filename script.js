function fetchData() {
  return new Promise (function (resolve, reject) {
    d3.csv("fifa-18-more-complete-player-dataset/complete.csv", function (data) {
      return {
        full_name: data.full_name,
        age: data["age"],
        club: data["club"]
      }
    })
      .then(dataJSON => {
        let arrPlayer = []
        dataJSON.forEach((data, index) => {
          if(data.club==='Manchester United' && data.age>20) {
            arrPlayer.push(data)
          }
        })
        resolve(arrPlayer)
      })
      .catch(err => {
        reject(err)
      })
  })
}

fetchData()
.then(arrPlayer => {
  console.log(arrPlayer.length);
  
  let svg = d3.select('#visualization')
              .append('svg')
              .attr('width', 1000)
              .attr('height', 500)
              .style('background', '#eaeaea')

  let yScale = d3.scaleLinear()
                .domain([0, 60])
                .range([0, 400])

  let colorScale = d3.scaleLinear()
                    .domain([0, 9])
                    .range(["white", "red"])
  
  let chart = svg.selectAll('rect')
    .data(arrPlayer)
    .enter()

    chart.append('rect')
    .attr('x', function (d, i) {
      return 60 + i * 35
    })
    .attr('y', function (d, i) {
      return 300 - yScale(d.age)
    })
    .attr('width', 30)
    .attr('height', function (d) {
      return yScale(+d.age)
    })
    .attr('fill', function (d) {
      return colorScale(d.age)
    })
    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', '#4dff4d')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d.Attack))
    })

    chart.append('text')
    .attr('x', function (d, i) {
      return 60 + i * 35
    })
    .attr('y', function (d, i) {
      return 300 - yScale(d.age)
    })
    .attr('dy', -5)
    .text(function (d){
      return d.age
    })

    chart.append('text')
    .attr('transform', function (d, i) {
      return `translate(${70 + i * 35}, 310) rotate (90)`
    })
    .text(function (d){
      return d.full_name
    })

   
})
.catch(err => {
  console.log(err)
})