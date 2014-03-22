$(function() {

    Journey = function(paths) {
        this.allNodes = [];
        this.startNode = null;
        this.completedPaths = [];
    };

    Journey.prototype.createNode = function(id, gMarker) {
        var n = new PathNode(id, gMarker);
        this.allNodes.push(n);
        return n;
    };

    Journey.prototype.getAllNodes = function() {
        return this.allNodes;
    };

    Journey.prototype.findNodeByGMarker = function(gMarker) {
        xx = _.first(_.where(this.allNodes, {
            gMarker: gMarker
        }));
        console.log('xx', xx);
        return xx;
    };

    Journey.prototype.nodesConnected = function(nodeA, nodeB) {
        console.log('connected?', nodeA, nodeB);
        return nodeA.id == nodeB.id || nodeA.successors[nodeB.id] || nodeB.successors[nodeA.id];
    };

    Journey.prototype.connectNodes = function(nodeFrom, nodeTo, hazards) {
        console.log('connecting', nodeFrom, nodeTo);
        if (this.nodesConnected(nodeFrom, nodeTo)) {
            return false;
        }

        nodeFrom.connect(nodeTo, hazards || {});
        return true;
    };

    Journey.prototype.disconnectNodes = function(nodeA, nodeB) {
        var newSuccessors = [];
        _.each(nodeA.successors, function(path) {
            if (path.node.id != nodeB.id) {
                newSuccessors[path.node.id] = path;
            }
        });
        nodeA.successors = newSuccessors;
    };

    Journey.prototype.setStartNode = function(node) {
        this.startNode = node;
    };

    Journey.prototype.completePath = function(journey, hazards) {

        var distance = 0;

        for (var i = 0; i < journey.length; i++) {

            var curMarker = journey[i].gMarker;

            if (i !== 0) {

                var prevMarker = journey[i - 1].gMarker;
                distance += google.maps.geometry.spherical.computeDistanceBetween(prevMarker.getPosition(), curMarker.getPosition());

            }

        }

        var details = {
            journey: journey,
            hazards: hazards,
            distance: distance
        };

        this.completedPaths.push(details);

        ui = new UI;
        ui.render(details, this.completedPaths);
    };

    Journey.prototype.start = function(node) {
        if (node) {
            this.setStartNode(node);
        }

        this.startNode.travel();
    };

    Journey.prototype.calculateDistance = function() {

        var nodes = this.getAllNodes();

    };

    window.j = journey = new Journey;

    //TODO: Probably best to move these to some sort of ui scripts
    $('#setStart').click(function() {
        window.setStart = true;
        journey.setStartNode(window.selected_node);
        $('#go').prop('disabled', false);
    });

    $('#go').click(function() {
        window.journey.start();
    });

});