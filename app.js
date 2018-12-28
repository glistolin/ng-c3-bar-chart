var app = angular.module('app', []);
  app.controller('C3Ctrl', function($http, $scope) {
    $scope.country = '';
    
    $http.get('chartData.json')
      .then(function ( json ) {
        $scope.countries = formatData(json.data);  // format received data
        
        // generate chart
        $scope.chart_types = c3.generate({
          bindto: d3.select('#chart'),
          size: {
            weight: 640,
            height: 480
          },
          data: {
            json: $scope.countries,
            keys: {
              value: ['Croatia', 'Belgium', 'Argentina'],
            },
            type: 'bar',
            onclick: function(d, i) {
              $scope.country = d.name;
              $scope.$apply();
            }
          },
          bar: {
            width: {
              ratio: 0.5 
            }
          },
          legend: {
            bindto: d3.select('#footer')
          }
        });
      },
      function ( err ) {
        console.log(err);   // log if an error occurs
      });

    function formatData ( json ) {
      var formattedData = [],
          object        = {};

     angular.forEach(json, function(row) {
        if (row.hasOwnProperty('country') && row.hasOwnProperty('fifarank')) {
          this[row.country] = row.fifarank;
        }
      },object);

      formattedData.push(object);

      return formattedData;
    }
    $scope.clearSelections = function() {
      console.log("clear");
      $scope.country = "";
    };
  });
  app.directive("countryItem", function() {
    return {
      restrict: "E",
      templateUrl: "table.html",
      //isolated scope and 2-way bind country
      scope: {
        country: "="
      },
      link: function(scope, element, attrs) {
        scope.countries = [{"country":"Argentina","fifarank":7},{"country":"Belgium","fifarank":12}, {"country":"Croatia","fifarank":14}];
        
      }
    };
  });
  
 