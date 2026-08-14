'use strict';

var gameBall = {
    timerID: null,
    score: null,
    balls: [],

    StartGame: function(){
        if(!this.score)
            this.score = document.getElementById('result');

        // this.score.innerHTML - получить HTML-код, который находиться в элементе или заменить его на другой
        this.score.textContent = 0;

        this.balls.forEach(ball => ball.remove()); // уничтожаем шарики прошлой игры
        this.balls = [];

        document.getElementById('btnStart').disabled = true;

        this.timerID = setInterval(()=> this.NextTimeGame(), 100);
    },

    NewBall: function(){
        let div = document.createElement('DIV');
        div.classList.add('ball'); // добавить новый css-класс
        //div.classList.contains('ball'); // проверить наличие css-класса, если есть вернет True, иначе False
        //div.classList.remove('ball');   // удаление css-класса
        //div.classList.toggle('ball');   // если такой css-класс у элемента есть, то удалить его, иначе добавить
        //div.classList.replace('ball', 'newball'); // заменить первый css-класс вторым

        div.style.backgroundColor = 'rgb(' + Rand(255) + ', ' + Rand(255) + ', ' + Rand(255) + ')';
        div.style.top = (screen.height - 300) + 'px';
        div.style.left = Rand(50, screen.width - 100) + 'px';
        div.speed = Rand(1,50) / 10;

        div.onclick = () => {
            const indx = this.balls.indexOf(div);
            this.balls.splice(indx, 1);
            div.remove();
            this.score.textContent = +this.score.textContent + 1;
        };

        this.balls.push(div);
        document.getElementById('game').append(div);
    },

    GameOver: function(){
        clearInterval(this.timerID);
        const save = document.getElementById('save');
        if(+save.textContent < +this.score.textContent)
            save.textContent = this.score.textContent;

        document.getElementById('btnStart').disabled = false;
    },

    NextTimeGame: function(){
        this.balls.forEach( ball => {
            let top = parseInt(ball.style.top);
            if(top > 5)
                ball.style.top = (top - ball.speed) + 'px';
            else
                this.GameOver();
        });

        if(Math.random() > 0.25) // с вероятностью 75%
            this.NewBall();
    }
}

function Rand(min, max){
    if( max == undefined ){
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}