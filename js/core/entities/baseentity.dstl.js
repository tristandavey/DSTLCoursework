$(function() {

    Entity = function(id, location) {
        this.id = id;
        this.location = location;
        this.speed = 5;
        return this;
    };

    /**
    * Set End Marker
    * Sets the end location for an entity 
    * 
    * @param gmarker The google maps marker
    */
    Entity.prototype.setEndMarker = function(gmarker) {
    	

    };

    /**
    * Set Speed
    * Sets the core speed variable for an entity
    *
    * @param speed int New speed variable
    */
    Entity.prototype.setSpeed = function(speed) {
    	var me = this;
    	me.speed = speed;
    }; 

    /**
    * Set Name
    * Sets the core name variable for an entity
    *
    * @param name str New name
    */
    Entity.prototype.setName = function(name) {
    	var me = this;
    	me.name = name;
    }; 

});