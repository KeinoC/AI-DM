import React, { useRef, useEffect } from "react";

function RainParticleOverlay() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth * 2; // testing twice width to avid rain not falling on bottom right
        canvas.height = window.innerHeight;

        let raindrops = [];

        class Raindrop {
            constructor() {
                this.speed = Math.random() * 5 + 1;

                // Define angle in radians.
                this.angle = (Math.PI/5);
                this.speedX = this.speed * Math.sin(this.angle);
                this.speedY = this.speed * Math.cos(this.angle);
                
                const extendedWidth = canvas.width + canvas.height * Math.tan(this.angle);
                this.x = Math.random() * extendedWidth - canvas.height * Math.tan(this.angle);
                this.y = Math.random() * canvas.height;

                this.length = Math.random() * 20;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                if (this.y > canvas.height || this.x > canvas.width + this.length * Math.sin(this.angle) || this.x < 0 - this.length * Math.sin(this.angle)) {
                    this.y = 0 - this.length;
                    const extendedWidth = canvas.width + canvas.height * Math.tan(this.angle);
                    this.x = Math.random() * extendedWidth - canvas.height * Math.tan(this.angle);
                    this.speed = Math.random() * 10 + 5;
                    this.speedX = this.speed * Math.sin(this.angle);
                    this.speedY = this.speed * Math.cos(this.angle);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(
                    this.x + this.length * Math.sin(this.angle),
                    this.y + this.length * Math.cos(this.angle)
                );
                ctx.strokeStyle = "skyblue";
                ctx.stroke();
            }
        }

        function init() {
            for (let i = 0; i < 100; i++) {
                raindrops.push(new Raindrop());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let raindrop of raindrops) {
                raindrop.update();
                raindrop.draw();
            }

            requestAnimationFrame(animate);
        }

        function handleResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            raindrops = [];
            init();
        }

        init();
        animate();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
        ></canvas>
    );
}

export default RainParticleOverlay;
