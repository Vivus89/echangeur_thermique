'use strict';

/**
 * @ngdoc function
 * @name echangeurApp.controller:CalculThermiqueCtrl
 * @description
 * # CalculThermiqueCtrl
 * Controller of the echangeurApp
 */
angular.module('echangeurApp')
  .controller('CalculThermiqueCtrl', function($scope, $http, $interval) {


    $(function() {
      $("#upload").bind("click", function() {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
          if (typeof(FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function(e) {
              var table = $('<table class= "table table-bordered" />');
              var rows = e.target.result.split("\n");
              for (var i = 0; i < rows.length; i++) {
                var row = $("<tr />");
                var cells = rows[i].split(";");
                for (var j = 0; j < cells.length; j++) {
                  var cell = $("<td />");


                  cell.html(cells[j]);
                  row.append(cell);
                }
                table.append(row);
              }

              $("#dvCSV").html('');
              $("#dvCSV").append(table);

            }

            reader.readAsText($("#fileUpload")[0].files[0]);

          } else {
            alert("This browser does not support HTML5.");
          }
        } else {
          alert("Please upload a valid CSV file.");
        }

      });

    });
    $scope.submit = function() {


      $http.post("http://localhost/echangeur_thermique/app/Formulaire_de_calcul.php")
        .then(function(data, status, headers, config) {
            console.log("inserted Successfully");

          },
          function(response) { // optional
            // failed
          });

    }
    //data graph



    $http.post("http://localhost/echangeur_thermique/app/graphique.php")
      .then(function(response, status, headers, config) {
          // your API would presumably be sending new data, not the same
          // data each time!

          var Data = response.data;

          $scope.data = Data;

        },
        function(err) { // optional
          console.log("failed");
          throw err;

        });

    let total = "";
    $scope.qeffluent1 = 0;


    $scope.qeffluent2 = function() {

      total = (parseFloat(qeffluent1.value) * 2661584.6033) / 3600 * 4.186 * 1000;
      return total.toFixed(0);
    }
    let reynolds = "";
    $scope.reynoldseffluent = function() {

      reynolds = 1000 * parseFloat(rheffluent.value) * parseFloat(qeffluent1.value) * 4 / (0.0013 * parseFloat(smouilleeffluent.value));
      return reynolds.toFixed(0);
    }

    let prandlt = "";
    $scope.prandlteffluent = function() {

      prandlt = 0.0013 * 4.186 * 1000 / 0.584;
      return prandlt.toFixed(0);
    }

    let chaleur = "";
    $scope.heffluent = function() {

      chaleur = 0.023 * (0.584 / (4 * parseFloat(rheffluent.value))) * (parseFloat(reynoldseffluent.value) ^ 0.8) * (parseFloat(prandlteffluent.value) ^ 0.4);
      return chaleur.toFixed(0);
    }



    $scope.solver = function() {
      


      $http({
        method: "POST",

        url: "http://localhost/echangeur_thermique/app/solver.php",

        //data: angular.toJson(formdata),
        data: {
          vitesse1: vitesse1.value,
          vitesse2: vitesse2.value,
          qcaloporteur1: qcaloporteur1.value
        }



      }).then(
        function(data) {
          //angular.toJson(data);
          console.log("Successfully");
          console.log(data);
          //  console.log(response.data);

          $scope.data = JSON.stringify(data);
          console.log($scope.data);
        });



    }






    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });



angular.module('echangeurApp').directive('scatter', function() {
  function link(scope, $interval, attr) {

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;



    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // define the line
    var valueline = d3.line()
      .x(function(d) {
        return x(d.id_temperature);
      })
      .y(function(d) {
        return y(d.tec);
      });
    // define the line
    var valueline2 = d3.line()
      .x(function(d) {
        return x(d.id_temperature);
      })
      .y(function(d) {
        return y(d.tee);
      });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    function draw(data) {

      var data = data;

      // format the data
      data.forEach(function(d) {
        d.id_temperature = +d.id_temperature;
        d.tec = +d.tec;
        d.tee = +d.tee;
      });



      // Scale the range of the data
      x.domain(d3.extent(data, function(d) {
        return d.id_temperature;
      }));
      y.domain([0, d3.max(data, function(d) {
        return Math.max(d.tec, d.tee);
      })]);



      // Drawing Lines for each segments
      var segment = svg.selectAll(".segment")
        .data([data])
        .enter().append("g")
        .attr("class", "segment");

      // Add the valueline path.
      segment.append("path")
        .attr("class", "line")
        .attr("id", valueline)
        .attr("visible", 1)
        .attr("d", valueline)
        .style("stroke", function(d) {
          return color(d.tec);
        });
      // Add the valueline2 path.
      segment.append("path")
        .attr("class", "line")
        .attr("id", valueline2)
        .attr("visible", 1)
        .attr("d", valueline2)
        .style("stroke", function(d) {
          return color(d.tee);
        });
      // Creating Dots on line
      segment.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) {
          return x(d.id_temperature);
        })
        .attr("cy", function(d) {
          return y(d.tec);
        })
        .attr("r", 5)
        .style("stroke", "white")
        .style("fill", function(d) {
          return color("température entrée calorie");
        })
        .on("mouseover", mouseover)
        .on("mousemove", function(d) {
          divToolTip
            .text("température entrée calorie" + " : " + d.tec + "°C")
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 10) + "px");
        })
        .on("mouseout", mouseout);

      segment.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) {
          return x(d.id_temperature);
        })
        .attr("cy", function(d) {
          return y(d.tee);
        })
        .attr("r", 5)
        .style("stroke", "blue")
        .style("fill", function(d) {
          return color(this.parentNode.__data__.tee);
        })
        .on("mouseover", mouseover)
        .on("mousemove", function(d) {
          divToolTip
            .text("température entrée effluent" + " : " + d.tee + "°C")
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 10) + "px");
        })
        .on("mouseout", mouseout);



      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));



    }

    // Adding Tooltip
    var divToolTip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 1e-6);

    function mouseover() {
      divToolTip.transition()
        .duration(500)
        .style("opacity", 1);
    }

    function mouseout() {
      divToolTip.transition()
        .duration(500)
        .style("opacity", 1e-6);
    }

    // Get the data
    d3.json("http://localhost/echangeur_thermique/app/graphique.php", function(error, data) {
      if (error) throw error;

      // trigger render
      draw(data);
    });



  }
  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '=',
      selectedPoint: '='
    }
  };
});
