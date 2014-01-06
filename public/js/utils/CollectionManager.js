var Globals = Globals || {};

(function() {
    "use strict";

    var CollectionManager = function() {

        if ( CollectionManager.prototype._singletonInstance ) {
            return CollectionManager.prototype._singletonInstance;
        }
        CollectionManager.prototype._singletonInstance = this;

        this.collections = {};

        this.addCollection = function(args){
            args = args || {};
            if(!this.collections[args.id]){
                args.items = args.items || [];
                args.options = args.options || {};
                // this.collections[args.id] = new args.type(args.items, args.options);
                this.collections[args.id] = new args.type();
                if(args.fetch){
                    this.collections[args.id].fetch();
                }
            }

            return this.collections[args.id];
        };

        this.getCollection = function(id) {
            return this.collections[id];
        };
    };

    Globals.collectionManager = new CollectionManager();
}());

