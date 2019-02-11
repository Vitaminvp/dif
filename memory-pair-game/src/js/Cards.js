import {APP_CONFIG, BLOCKS_AMOUNT} from "./constants";
import {shuffle} from "./functions";
import Card from "./Card";

class Cards {
    constructor(target) {
        this.target = target;
        this.render();
        // this.count = 0;
        this.total = 0;
        this.firstPicSrc = '';
        this.firstId = '';
    }

    countInc(src, id) {
        if (this.firstPicSrc === src && this.firstId !== id) {
            const firstCard = document.getElementById(id);
            const secondCard = document.getElementById(this.firstId);
            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                this.total += 2;
                if (this.total >= BLOCKS_AMOUNT) {
                    this.total = 0;
                    alert(APP_CONFIG.winningText);
                }
            }, APP_CONFIG.cardDeleteTime);
            this.firstPicSrc = '';
            this.firstId = '';
            return false;
        }
        this.firstPicSrc = src;
        this.firstId = id;

        return undefined;
    }

    render() {
        this.loader = document.createElement('div');
        this.btn = document.createElement('button');
        this.btn.innerHTML = "START NEW GAME";
        this.btn.className = "btn";
        this.target.appendChild(this.btn);
        this.output = document.createElement('div');
        this.output.className = "output";
        this.btn.addEventListener('click', () => {
            this.output.innerHTML = "";
            this.output.appendChild(this.loader);
            this.loader.innerHTML = '<img src="https://vitaminvp.github.io/WebAcademy-HomeWork/client/assets/images/ajax-loader.gif" alt="card">';
            this.target.appendChild(this.output);
            this.renderItems();
        });
    }

    renderItems() {
        this.output.innerHTML = "";
        const docFragment = document.createDocumentFragment();
        const arrOfImg = APP_CONFIG.arrImgSrc.slice(0, APP_CONFIG.width);
        const totalBlocksAmount = shuffle(arrOfImg.reduce((acc, cur, i, arr) => [...acc, ...arr], []));
        for (let i = 0; i < APP_CONFIG.height; i++) {
            const div = document.createElement('div');
            for(let j = 0; j < APP_CONFIG.width; j++ ){
                const card = new Card(div, (...args) => this.countInc(...args), totalBlocksAmount[i+j]);
            }
            docFragment.appendChild(div);
        }
        this.output.appendChild(docFragment);
    }
}

export default Cards;
