class Fish {
    constructor(container) {
        this.container = container;
        this.element = null;
        this.svg = null;
        this.create();
    }
    create() {
        const fishTemplate = document.getElementById('FishTemplate');
        this.element = fishTemplate.cloneNode(true);
        this.element.setAttribute('id', 'FishClone');
        this.element.style.display = 'block';
        this.svg = this.element.querySelector('svg');
        this.svg.setAttribute('fill', this.getRandomColor());
        this.setRandomSize();
        this.container.appendChild(this.element);
        this.move();
    }
    move() {
        this.element.style.display = 'block';
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        const noiseX = Math.floor(Math.random() * 20) - 10;
        const noiseY = Math.floor(Math.random() * 20) - 10;
        const finalX = randomX + noiseX;
        const finalY = randomY + noiseY;
        const directionX = finalX > this.element.offsetLeft ? 1 : -1;
        this.element.style.left = `${finalX}px`;
        this.element.style.top = `${finalY}px`;
        this.invertirSVG(directionX);
    }
    invertirSVG(directionX) {
        const svg = this.svg;
        if (directionX === -1) {
            svg.setAttribute("transform", "scale(-1, 1)");
        } else {
            svg.setAttribute("transform", "scale(1, 1)");
        }
    }
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        const transparency = Math.random() * 0.5 + 0.3;
        return `rgba(${parseInt(color.substr(1, 2), 16)}, ${parseInt(color.substr(3, 2), 16)}, ${parseInt(color.substr(5, 2), 16)}, ${transparency})`;
    } setRandomSize() {
        const minSize = 32;
        const maxSize = 64;
        const randomSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        this.element.style.width = `${randomSize}px`;
        this.element.style.height = `${randomSize}px`;
        this.svg.setAttribute("width", randomSize);
        this.svg.setAttribute("height", randomSize);
    }

}

class Acuario {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.fishes = [];
        this.init();
    }
    init() {
        for (let i = 0; i < 25; i++) {
            this.addFish();
        }
        this.moveFishes();
        setInterval(this.moveFishes.bind(this), 10000);
        document.body.addEventListener('click', () => {
            this.shot();
        });
    }
    addFish() {
        const fish = new Fish(this.container);
        fish.element.style.display = 'none';
        this.fishes.push(fish);
    }
    shot() {
        if (this.fishes.length < 300) //Limite de peces
        {
            for (let i = 0; i < 25; i++) {
                setTimeout(() => {
                    this.addFish();
                }, 3);
            }
        }

        console.clear();
    }
    moveFishes() {
        this.fishes.forEach(fish => {
            //if (Math.random() < 0.9) {  // 50% de probabilidad de mover el pez
            fish.move();
            //}
        });
    }
    countFishes() {
        console.clear();
        console.log('Total de peces: ' + this.fishes.length);
    }
}
const objeto_fishTank = new Acuario('.container');
setInterval(() => {
    objeto_fishTank.countFishes();
}, 5000);
