$(function() {

    UI = function() {
        this.template = _.template($.trim($('#template').html()));
    }

    UI.prototype.display = function(data) {
        $('#data').append(this.template({
            data: data
        }));
    }

    UI.prototype.render = function(completedPath, allCompletedPaths) {
        this.display('New Path FOUND!<br>');

        this.display('Found Journeys:<br>');
        this.display(this.parse_path(completedPath));

        this.display('Journey Distance:<br>');
        var distance = (completedPath.distance / 1000) * 0.6214;
        this.display(distance.toFixed(2) + ' miles');


        this.display('Least number of nodes:<br>');
        var least = null;
        _.each(allCompletedPaths, function(path) {
            console.log('path here', path);
            if (least == null || path.journey.length < least.journey.length) {
                least = path;
            }
        }, this)
        this.display(this.parse_path(least));


        var all_hazards = [];
        _.each(allCompletedPaths, function(path) {
            _.each(path.hazards, function(value, name) {
                if (!_.contains(all_hazards, name)) {
                    all_hazards.push(name);
                }
            })
        })


        _.each(all_hazards, function(hazard_name) {
            this.display('Lowest ' + hazard_name + ' value:<br>');
            var lowest = null;
            _.each(allCompletedPaths, function(path) {
                if (lowest == null || path.hazards[hazard_name] < lowest.hazards[hazard_name]) {
                    lowest = path;
                }
            }, this)
            console.log(hazard_name, lowest);
            this.display(this.parse_path(lowest));
        }, this);
    }

    UI.prototype.parse_path = function(path) {
        console.log('path', path);
        return '<b>' + _.pluck(path.journey, 'id') + '</b> ' + JSON.stringify(path.hazards);
    }

});