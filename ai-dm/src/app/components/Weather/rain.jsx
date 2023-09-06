import React, { useRef, useEffect } from "react";
import { useChat } from "@/app/contexts/ChatContext"

function RainParticleOverlay() {

    const {hubArea, setHubArea} = useChat()
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight ;

        // console.log(hubArea);

        let raindrops = [];

        class Raindrop {
            constructor() {
                this.speed = Math.random() * 8 + 15;

                // Define angle in radians.
                this.angle = (Math.PI/5);
                this.speedX = this.speed * Math.sin(this.angle);
                this.speedY = this.speed * Math.cos(this.angle);

                const extendedWidth = canvas.width + canvas.height * Math.tan(this.angle);
                this.x = Math.random() * extendedWidth - canvas.height * Math.tan(this.angle);
                this.y = Math.random() * canvas.height;

                this.length = Math.random() * 30;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                if (this.y > canvas.height) {
                    const extendedWidth = canvas.width + canvas.height * Math.tan(this.angle);
                    this.x = Math.random() * extendedWidth - canvas.height * Math.tan(this.angle);
                    this.y = 0 - this.length;
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
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        function init() {
            for (let i = 1; i < 300; i++) {
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
            className="absolute top-0 left-0  z-20"
            style={{ pointerEvents: 'none'}}
        ></canvas>
    );
}

export default RainParticleOverlay;
