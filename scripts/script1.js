window.onload = () => {

    const game_window = document.getElementById("game_window"); /*Main game window, where you create and combine elements*/
    const recipe_display = document.getElementById("recipe_display"); /*Display, that shows opened recipes*/
    const btn_clear = document.getElementById("btn_clear");

    btn_clear.onclick = () => {
        while (document.getElementsByClassName("elem").length != 0) {
            document.getElementsByClassName("elem")[0].remove();
        }
    }

    const doubleClickThreshold = 250;

    const recipes = [
        {
            e1: "fire",
            e2: "air",
            res: "electricity"
        },
        {
            e1: "water",
            e2: "earth",
            res: "dirt"
        },
        {}
    ]

    /*Function for detect double-click*/
    function createClicker(clickFn, dblClickFn) {
        let timer;

        return function (event) {
            const context = this;

            if (timer) {
                clearTimeout(timer);
                dblClickFn.call(context, event);
                timer = null;
                return;
            }

            timer = setTimeout(function (ctx) {
                timer = null;
                clickFn.call(ctx, event);
            }, doubleClickThreshold, context)
        }
    }

    const clickHandler = createClicker(onClick, onDoubleClick);
    game_window.onclick = clickHandler;

    function onClick(event) {
        /*Nothing*/
    }

    /*Function for drag&drop*/

    function func_drag(elem, event) {
        console.log(event.offsetX + ":" + event.offsetY);
        elem.style.left = event.offsetX;
        elem.style.top = event.offsetY;
    }

    /*Class for alchemy element*/

    class Alchemy {

        constructor(name1, name2) {
            this.el1 = name1;
            this.el2 = name2;
        }

        combine() {
            console.log(this.el1 + "+" + this.el2 + "=result");
            if (this.el1 != null && this.el2 != null && this.el1 != this.el2) {
                return true;
            }
            return false;
        }

    }

    var alchemy1 = new Alchemy(null, null);

    function onDoubleClick(event) {
        var XY = [event.offsetX, event.offsetY]; /*Get coordination of new elements*/
        console.log(XY[0] + ":" + XY[1]);
        if (XY[0] <= 550 && XY[1] <= 600 && XY[1] >= 50) {
            for (let i = 0; i < 4; i++) {
                var elem = document.createElement("div");/*Create new element*/
                elem.classList.add("elem");/*Set elem class*/
                if (i == 0) {
                    elem.style.left = XY[0];
                    elem.style.top = XY[1];
                    elem.style.backgroundImage = "url('images/fire.svg')"
                    elem.setAttribute("name", "fire");
                }
                else if (i == 1) {
                    elem.style.left = XY[0] + 45;
                    elem.style.top = XY[1];
                    elem.style.backgroundImage = "url('images/water.svg')"
                    elem.setAttribute("name", "water");
                }
                else if (i == 2) {
                    elem.style.left = XY[0] + 45;
                    elem.style.top = XY[1] - 45;
                    elem.style.backgroundImage = "url('images/earth.svg')"
                    elem.setAttribute("name", "earth");
                }
                else if (i == 3) {
                    elem.style.left = XY[0];
                    elem.style.top = XY[1] - 45;
                    elem.style.backgroundImage = "url('images/air.svg')"
                    elem.setAttribute("name", "air");
                }
                elem.setAttribute("draggable", true);
                game_window.appendChild(elem);/*Add elements on game_window*/
            }
            /*Переделать функцию перетаскивания элементов (Вместо координат экрана брать область игрового поля)*/
            for (let i = 0; i < document.getElementsByClassName("elem").length; i++) {
                document.getElementsByClassName("elem")[i].ondrag = () => {
                    alchemy1.el1 = document.getElementsByClassName("elem")[i].getAttribute("name");
                }
                document.getElementsByClassName("elem")[i].ondragend = (e) => {
                    console.log(e.clientX + ":" + e.clientY);
                    if (e.clientX >= 360 && e.clientX <= 960 && e.clientY >= 65 && e.clientY <= 665) {
                        document.getElementsByClassName("elem")[i].style.left = e.clientX - 365;
                        document.getElementsByClassName("elem")[i].style.top = e.clientY - 65;
                        //alchemy1.el1 = document.getElementsByClassName("elem")[i].getAttribute("name");
                    }
                    else {

                    }
                }

                document.getElementsByClassName("elem")[i].ondragover = (e) => {
                    e.preventDefault();
                }

                document.getElementsByClassName("elem")[i].ondrop = (e) => {
                    console.log(e);
                    console.log(document.getElementsByClassName("elem")[i].getAttribute("name"));
                    alchemy1.el2 = document.getElementsByClassName("elem")[i].getAttribute("name");
                    if (alchemy1.combine()) {
                        alert("combined!")
                        for (let i = 0; i < recipes.length; i++) {
                            if (alchemy1.el1 == recipes[i].e1 && alchemy1.el2 == recipes[i].e2 || alchemy1.el1 == recipes[i].e2 && alchemy1.el2 == recipes[i].e1) {
                                /*Add combined element*/
                                console.log(recipes[i].res);
                                var elem = document.createElement("div");/*Create new element*/
                                elem.classList.add("elem");/*Set elem class*/
                                elem.style.left = e.clientX - 365;
                                elem.style.top = e.clientY - 65;
                                elem.style.backgroundImage = `url('images/${recipes[i].res}.svg')`;
                                elem.setAttribute("name", recipes[i].res);
                                elem.setAttribute("draggable", true);
                                game_window.appendChild(elem);
                                /**/
                            }
                        }
                    };
                    alchemy1.el2 = null;
                    //console.log("combine");
                }
            }
        }
    }
}