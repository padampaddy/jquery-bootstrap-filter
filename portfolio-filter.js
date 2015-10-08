/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "portfolio";

    // The actual plugin constructor
    function Plugin( element , json) {
        this.element = $(element);

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this._name = pluginName;
        this.data = json;
        this.tags = ["All"];
        this.init();
    }

    Plugin.prototype = {

        init: function() {
          this.render();
        },

        checkInTags : function(val) {
          for(var i=0; i < this.tags.length; i++) {
              if(this.tags[i].toLowerCase()==val.toLowerCase())
                return true;
          }
          return false;
        },

        createTags: function(items){
          for(var i = 0; i<items.length;i++){
            for(var j=0; j<items[i].tag.length;j++){
              if(!this.checkInTags(items[i].tag[j]))
                this.tags.push(items[i].tag[j]);
            }
          }
        },

        createItem: function(item){
          return('<div class="col-lg-3">'+
                    '<div class="panel panel-default">' +
                      '<div id="portfolio-title" class="panel-heading">'+item.title+'</div>' +
                      '<div class="panel-body"><img style="max-width:100%;padding:5px;max-height:200px;" src="'+item.image+'"/>' + item.description +
                      '</div>' +
                      (item.link?'<div class="panel-footer"><a href="'+item.link+'">Check out</a></div>':'') +
                    '</div>' +
                  '</div>');
        },

        contains: function(a, obj) {
          for (var i = 0; i < a.length; i++) {
            if (a[i].toLowerCase() === obj.toLowerCase()) {
              return true;
            }
          }
          return false;
        },

        renderTags: function(){
          var self = this;
          this.createTags(this.data);
          this.element.append('<div class="row">'+
                  '<div class="col-lg-12">' +
                    '<div class="btn-group" role="group" aria-label="...">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div style="margin-top:10px;" class="row i-container"></div>');
          for(var i=0;i<this.tags.length;i++){
            this.element.find('.btn-group').append('<button type="button" style="text-transform:capitalize;" class="btn btn-default">'+this.tags[i]+'</button>');
          }
          this.element.find('.btn-group button').click(function(){
            self.renderItems(this.innerHTML);
          });
        },

        renderItems: function(v){
          this.element.find('.i-container').empty();
          if(typeof v == "undefined" || v=="All"){
            for(var i=0;i<this.data.length;i++){
              this.element.find('.i-container').append(this.createItem(this.data[i]));
            }
          } else{
            for(var j=0;j<this.data.length;j++){
              if(this.contains(this.data[j].tag,v))
                this.element.find('.i-container').append(this.createItem(this.data[j]));
            }
          }
        },

        render: function() {
          this.renderTags();
          this.renderItems();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
