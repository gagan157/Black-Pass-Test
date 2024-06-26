import gsap from 'gsap';
/* eslint-disable */

export default class GrainFX {
    constructor() {
        this.size = 128;
        this.c2dHi = document.createElement('canvas');
        this.c2dHi.width = this.size;
        this.c2dHi.height = this.size;
        this.ctxHi = this.c2dHi.getContext('2d', {
            antialias: !1,
            depth: !1,
        });
        this.c2d = document.getElementById('grainfx');
        this.ctx = this.c2d.getContext('2d', {
            antialias: !1,
            depth: !1,
        });

        this.init();
    }

    init() {
        this.addEvents();
    }

    addEvents() {
        this.resize();
        this.create();

        window.addEventListener('resize', this.resize);
    }

    resize = () => {
        this.c2dW = window.innerWidth;
        this.c2dH = window.innerHeight;
        this.c2d.width = this.c2dW;
        this.c2d.height = this.c2dH;
    };

    run = () => {
        for (
            var t = this.ctxHi.getImageData(0, 0, this.size, this.size),
                i = t.data.length,
                e = 0;
            e < i;
            e += 4
        ) {
            var s = t.data,
                r = ~~(255 * Math.random());
            (s[e] = s[e + 1] = s[e + 2] = r), (s[e + 3] = 255);
        }
        this.ctxHi.putImageData(t, 0, 0);
        var n = Math.ceil(this.c2dW / this.size),
            o = Math.ceil(this.c2dH / this.size);
        this.ctx.clearRect(0, 0, this.c2dW, this.c2dH),
            (this.ctx.globalAlpha = 0.075);

        for (var a = 0; a < n; a++) {
            for (var h = 0; h < o; h++) {
                this.ctx.drawImage(
                    this.c2dHi,
                    a * this.size,
                    h * this.size,
                    this.size,
                    this.size
                );
            }
        }
    };

    create = () => {
        gsap.ticker.add(this.run);
    };

    destroy = () => {
        gsap.ticker.remove(this.run);
    };
}
