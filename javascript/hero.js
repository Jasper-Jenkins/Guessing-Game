document.body.onload = hero;

function hero() {
    var playArea = document.createElement("canvas");
   
    playArea.setAttribute("id", "playArea");
    playArea.setAttribute("width", "350");
    playArea.setAttribute("height", "250");
    playArea.setAttribute("float", "left");

    document.body.insertAdjacentElement('afterbegin', playArea);

    if (playArea.getContext) {
        console.log("is it getting here?")
        var ctx = playArea.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 60, 50);
        console.log("here???")
    }

    console.log(ctx)
    const first = document.getElementById("first");
    const hero = document.createElement("div");
    hero.setAttribute("id", "hero");
    var someText = document.createElement("p");
    someText.innerText = "Whats good!";
    hero.appendChild(someText);
    //playArea.appendChild

    //hero.setAttribute();
    //const first = document.getElementById("first");
    //document.body.insertBefore(hero, first);
    //  const gameHolder = document.getElementById("game");
    var pewCounter = 0;

    first.insertAdjacentElement("afterend", hero);
    hero.addEventListener('click', pew);





    function pew() {
        console.log("pew fired");
        var ctx = playArea.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        var bulletHeight = 10;
        var bulletWidth = 10;
        var positionX = 0;
        var positionY = 0;
        ctx.fillRect(positionX, positionY, bulletWidth, bulletHeight);

        const sleep = (time) => {
            return new Promise((resolve)=>setTimeout(resolve, time))
        }




        const moveBullet = async () => {
            console.log("moveBullet Fired")
            for (let i = 0; i < 130; i++) {
                const positionZ = (positionX ** 2) / 130;
                ctx.clearRect(positionX, positionY, bulletWidth, bulletHeight);
                positionX++;
                //console.log(ctx.getContextAttributes);
                ctx.fillStyle = 'rgba(0, 0, 200, 1)';
                ctx.fillRect(positionX, positionY, bulletWidth, bulletHeight);
                await sleep(1)
                if (i === 130 - 1) {
                    fadeBullet();                   
                }
            }
        }

        moveBullet();

        const fadeBullet = async () => {
            var j = 1.0;
            var incr = 0.1;
            do { 
                ctx.clearRect(positionX, positionY, bulletWidth, bulletHeight);
                ctx.fillStyle = `rgba(0, 0, 200, ${j})`;
                ctx.fillRect(positionX, positionY, bulletWidth, bulletHeight);
                j -= incr;
                await sleep(10);
                //console.log(j);
            } while (j > 0 && j <= 1)
            console.log("make it explode!");
        }
      

    }

}

