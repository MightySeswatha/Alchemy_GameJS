import { Clear } from "../scripts/clear.js";
import { recipes_obj } from "../scripts/recipes.js";
import { Alchemy } from "./combine.js";

window.onload = () => {

    const game_window = document.getElementById("game_window"); /*Main game window, where you create and combine elements*/
    const recipe_display = document.getElementById("recipe_display"); /*Display, that shows opened recipes*/

    /*Clear gameboard*/
    btn_clear.onclick = () => {
        var clear = new Clear();
        clear.clear_board();
    }
    /**/

    const recipes = recipes_obj; // recipes object

    /*Function for detect double-click*/
    const doubleClickThreshold = 250;
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

    /*Add all listeners*/

    function event_add(elem) {

        elem.ondrag = () => {
            func_ondrag(elem);
        }

        elem.ondragend = (e) => {
            func_ondragend(elem, e);
        }

        elem.ondragover = (e) => {
            e.preventDefault();
        }

        elem.ondrop = (e) => {

            func_ondrop(elem, e);

        }

    }

    /*Function for drag&drop*/

    function func_ondrag(elem) {
        alchemy1.el1 = elem.getAttribute("name");
        alchemy1.div1 = elem;
    }

    /*
    function func_onclick(elem) {
        alchemy1.div1 = elem;
    }
    */

    function func_ondragend(elem, event) {
        if (event.clientX >= 360 && event.clientX <= 960 && event.clientY >= 65 && event.clientY <= 665 && elem != undefined) {
            elem.style.left = event.clientX - 365;
            elem.style.top = event.clientY - 65;
        }
    }

    function func_ondrop(elem, event) {
        alchemy1.el2 = elem.getAttribute("name");
        alchemy1.div2 = elem;
        //document.getElementById("delete").remove();

        for (let i = 0; i < recipes.length; i++) {
            if (alchemy1.el1 == recipes[i].e1 && alchemy1.el2 == recipes[i].e2 || alchemy1.el1 == recipes[i].e2 && alchemy1.el2 == recipes[i].e1) {
                if (recipes[i].created == false) {
                    recipe_display.children[0].innerHTML = Number(recipe_display.children[0].innerHTML) + 1;
                    recipes[i].created = true;
                }
                if (alchemy1.combine()) {
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
                // console.log(new_elem);

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
                event_add(elem);
                /*

                elem.ondrag = () => {
                    func_ondrag(elem);
                }

                elem.ondragend = (e) => {
                    func_ondragend(elem, e);
                }

                elem.ondragover = (e) => {
                    e.preventDefault();
                }

                elem.ondrop = (e) => {

                    func_ondrop(elem, e);

                }

                */

                game_window.appendChild(elem);/*Add elements on game_window*/
            }
            /*Переделать функцию перетаскивания элементов (Вместо координат экрана брать область игрового поля)*/
            /**/


            /**/

        }
    }
}