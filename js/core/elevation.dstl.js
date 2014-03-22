google.load("visualization", "1", {
    packages: ["corechart"]
});

$(function() {

    Elevation = function(map) {
        this.elevator = new google.maps.ElevationService();
        this.map = map
        this.chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        this.drawElevation = function(start, end) {

            var startLocation = start.gMarker.getPosition();
            var endLocation = end.gMarker.getPosition();

            //var startLocation = new google.maps.LatLng(36.578581, -118.291994);
            //var endLocation = new google.maps.LatLng(36.606111, -118.062778);

            var pathRequest = {
                'path': [startLocation, endLocation],
                'samples': 256
            }

            this.elevator.getElevationAlongPath(pathRequest, this.plotElevation);

        }

        this.plotElevation = function(results, status) {
            if (status != google.maps.ElevationStatus.OK) {
                return;
            }
            var elevations = results;

            // Extract the elevation samples from the returned results
            // and store them in an array of LatLngs.
            var elevationPath = [];
            for (var i = 0; i < results.length; i++) {
                elevationPath.push(elevations[i].location);
            }

            // Display a polyline of the elevation path.
            var pathOptions = {
                path: elevationPath,
                strokeColor: '#0000CC',
                opacity: 0.4,
                map: map
            }
            polyline = new google.maps.Polyline(pathOptions);

            // Extract the data from which to populate the chart.
            // Because the samples are equidistant, the 'Sample'
            // column here does double duty as distance along the
            // X axis.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Sample');
            data.addColumn('number', 'Elevation');
            for (var i = 0; i < results.length; i++) {
                data.addRow(['', elevations[i].elevation]);
            }

            // Draw the chart using the data within its DIV.
            document.getElementById('chart_div').style.display = 'block';
            chart.draw(data, {
                legend: 'none',
                chartArea: {
                    left: 30,
                    top: 10,
                    width: '100%',
                    height: '100%'
                },
                backgroundColor: 'transparent'
            });
        }

        return this;
    };

});