$(function() {

    PathNode = function(id, gMarker) {
        this.id = id;
        this.successors = [];
        this.hazards = {};
        this.gMarker = gMarker;
        return this;
    };

    PathNode.prototype.connect = function(node, hazards) {
        this.successors[node.id] = {
            node: node,
            hazards: hazards
        };
    };

    PathNode.prototype.setHazards = function(hazards) {
        this.hazards = hazards;
    };

    PathNode.prototype.setPathHazards = function(endNode, hazards) {
        this.successors[endNode.id].hazards = hazards;
    };

    PathNode.prototype.getPathHazards = function(endNode) {
        return this.successors[endNode.id].hazards || {};
    };

    PathNode.prototype.travel = function(currentJourney, hazards) {
        currentJourney = currentJourney || [];
        currentHazards = hazards || this.hazards || {};

        currentJourney.push(this);

        _.each(this.successors, function(successor) {
            var thisHazards = _.clone(currentHazards);
            thisHazards = this.calculateHazards(
                thisHazards, successor.hazards, successor.node.hazards
            );

            successor.node.travel(currentJourney.slice(), thisHazards);
        }, this);

        if (this.successors.length == 0) {
            journey.completePath(currentJourney, currentHazards);
        }
    };

    PathNode.prototype.calculateHazards = function(currentHazards, pathHazards, nodeHazards) {
        var calculatedPathHazards = {}, calculatedNodeHazards = {};

        _.each(pathHazards, function(value, name) {
            if (currentHazards.hasOwnProperty(name)) {
                var xpp = Mediate(name, currentHazards, pathHazards, currentHazards[name], value);
                console.log('xpp', name, value, xpp);
                if (_.isObject(xpp)) {
                    calculatedPathHazards = _.defaults(calculatedPathHazards, xpp);
                } else {
                    calculatedPathHazards[name] = xpp;
                }
            } else {
                calculatedPathHazards[name] = value;
            }
        }, this);

        console.log('calculatedPathHazards', calculatedPathHazards, currentHazards);

        // NODE HAZARDS ARE NOT CALCULATED!!!

        // _.each(nodeHazards, function(value, name) {
        //  if (calculatedPathHazards.hasOwnProperty(name)) {
        //      var xpp2 = Mediate(name, calculatedPathHazards[name], value, calculatedPathHazards, pathHazards);
        //      console.log('xpp2', xpp2);
        //      calculatedPathHazards[name] = xpp2;
        //  }
        //  else {
        //      calculatedPathHazards[name] = value;
        //  }
        // }, this);

        return _.defaults(calculatedPathHazards, currentHazards);
    };

    
    PathNode.prototype.setEntities = function(entities) {
        var me = this;
        me.entities = entities;
    };

    PathNode.prototype.getEntities = function() {
        var me = this;
        return me.entities || {};
    };

});