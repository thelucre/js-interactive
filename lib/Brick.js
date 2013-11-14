var Brick = Class.create({
    initialize : function(_g) {
        this.g = _g;
        this.pos = new Vec2( 350, 200 );
        this.vel = new Vec2(0,0);
        this.accel = new Vec2( 1, 1 );
    },
    update : function() {
        this.vel = this.g.mouse.pos.subV(this.pos);
        this.vel.normalize();
        this.vel = this.vel.mulV( this.accel );
        this.pos = this.pos.addV(this.vel);
    },
    draw : function() {
        this.g.ctx.rect(this.pos.x, this.pos.y, 10, 10);
        this.g.ctx.stroke();
    }
});

var Mouse = Class.create({ 
        initialize: function() {
            this.pos = new Vec2(0,0);
        },
        onMouseMove: function(event) {
            this.pos.x = event.x;
            this.pos.y = event.y;
        }
    });