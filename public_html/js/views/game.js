define([
	'backbone',
	'tmpl/game',
], function (Backbone, tmpl) {
	var GameView = Backbone.View.extend({
		className: "game",
		events: {
			"click": "moveShip"
		},
		initialize: function() {
			this.$page = $('#page');
			this.centerX = this.$page.width()/2;
			this.centerY = this.$page.height()/2;
		},
		template: function() {
			return tmpl();
		},
		render: function() {
			this.$el.html(this.template());
			this.$page.html(this.$el);
			this.$game = $(".game");
		},
		moveShip: function(e) {
			var offset = this.$page.offset(),
			      x = e.pageX - offset.left,
			      y = e.pageY - offset.top,
			      currentX = parseInt(this.$game.css('background-position-x')),
			      currentY = parseInt(this.$game.css('background-position-y'));
			this.$game.animate({
				backgroundPosition: ((currentX+(x-this.centerX))+"px", (currentY+(y-this.centerY))+"px")},{
					duration:3000, step: function (n) {
						console.log(n);
						$(this).css('background-position', n + 'px ' + n + 'px');
					}
				}
			); 
		}
	});
	
	return new GameView();
});