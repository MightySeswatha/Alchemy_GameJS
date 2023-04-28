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
        {
            e1: "electricity",
            e2: "fire",
            res: "sun"
        },
        {
            e1: "electricity",
            e2: "dirt",
            res: "life"
        }
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

    function func_ondrag(elem) {
        alchemy1.el1 = elem.getAttribute("name");
        alchemy1.div1 = elem;
    }

    function func_ondragend(elem, event) {
        if (event.clientX >= 360 && event.clientX <= 960 && event.clientY >= 65 && event.clientY <= 665) {
            elem.style.left = event.clientX - 365;
            elem.style.top = event.clientY - 65;
        }
    }

    function func_ondrop(elem, event) {
        alchemy1.el2 = elem.getAttribute("name");
        alchemy1.div2 = elem;
        //document.getElementById("delete").remove();
        if (alchemy1.combine()) {
            for (let i = 0; i < recipes.length; i++) {
                if (alchemy1.el1 == recipes[i].e1 && alchemy1.el2 == recipes[i].e2 || alchemy1.el1 == recipes[i].e2 && alchemy1.el2 == recipes[i].e1) {
                    var new_elem = document.createElement("div");/*Create new element*/
                    new_elem.classList.add("elem");/*Set elem class*/
                    new_elem.style.left = event.clientX - 365;
                    new_elem.style.top = event.clientY - 65;
                    new_elem.style.backgroundImage = `url('images/${recipes[i].res}.svg')`;
                    new_elem.setAttribute("name", recipes[i].res);
                    //alchemy1.el1 = null;
                    //alchemy1.el2 = null;
                    new_elem.setAttribute("draggable", true);
                    game_window.appendChild(new_elem);
                    console.log(new_elem);
                 
                    /*Где-то здесь ошибка!!! Ссылается на 75 строку*/
                    new_elem.ondrag = () => {
                        func_ondrag(new_elem);
                    }

                    new_elem.ondragend = (e) => {
                        func_ondragend(new_elem, e);
                    }
                    /**/
                    new_elem.ondragover = (e) => {
                        e.preventDefault();
                    }
                    /**/
                    new_elem.ondrop = (e) => {

                        func_ondrop(new_elem, e);

                    }


                    /**/
                }
            }
        };
    }

    /*Class for alchemy element*/

    class Alchemy {

        constructor(name1, name2, div1, div2) {
            this.el1 = name1;
            this.el2 = name2;
            this.div1 = div1;
            this.div2 = div2;
        }

        combine() {
            console.log(this.el1 + "+" + this.el2 + "=result");
            console.log(this.div1);
            console.log(this.div2);
            if (this.el1 != null && this.el2 != null && this.el1 != this.el2) {
                this.div1.remove();
                this.div2.remove();
                return true;
            }
            return false;
        }

    }

    var alchemy1 = new Alchemy(null, null, null, null);

    function onDoubleClick(event) {
        if (event.offsetX <= 550 && event.offsetY <= 600 && event.offsetY >= 50) {
            for (let i = 0; i < 4; i++) {
                var elem = document.createElement("div");/*Create new element*/
                elem.classList.add("elem");/*Set elem class*/
                if (i == 0) {
                    elem.style.left = event.offsetX;
                    elem.style.top = event.offsetY;
                    elem.style.backgroundImage = "url('images/fire.svg')"
                    elem.setAttribute("name", "fire");
                }
                else if (i == 1) {
                    elem.style.left = event.offsetX + 45;
                    elem.style.top = event.offsetY;
                    elem.style.backgroundImage = "url('images/water.svg')"
                    elem.setAttribute("name", "water");
                }
                else if (i == 2) {
                    elem.style.left = event.offsetX + 45;
                    elem.style.top = event.offsetY - 45;
                    elem.style.backgroundImage = "url('images/earth.svg')"
                    elem.setAttribute("name", "earth");
                }
                else if (i == 3) {
                    elem.style.left = event.offsetX;
                    elem.style.top = event.offsetY - 45;
                    elem.style.backgroundImage = "url('images/air.svg')"
                    elem.setAttribute("name", "air");
                }
                elem.setAttribute("draggable", true);
                game_window.appendChild(elem);/*Add elements on game_window*/
            }
            /*Переделать функцию перетаскивания элементов (Вместо координат экрана брать область игрового поля)*/
            /**/
            for (let i = 0; i < document.getElementsByClassName("elem").length; i++) {
                document.getElementsByClassName("elem")[i].ondrag = () => {
                    func_ondrag(document.getElementsByClassName("elem")[i]);
                }
                /**/
                document.getElementsByClassName("elem")[i].ondragend = (e) => {
                    func_ondragend(document.getElementsByClassName("elem")[i], e);
                }
                /**/
                document.getElementsByClassName("elem")[i].ondragover = (e) => {
                    e.preventDefault();
                }
                /**/
                document.getElementsByClassName("elem")[i].ondrop = (e) => {

                    func_ondrop(document.getElementsByClassName("elem")[i], e);

                }
                /**/
            }
        }
    }
}