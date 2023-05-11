import { Clear } from "./clear.js";
import { Help } from "./help.js";
import { recipes_obj } from "./recipes.js";
import { Alchemy } from "./combine.js";

window.onload = () => {
    const game_window = document.getElementById("game_window"); /*Main game window, where you create and combine elements*/
    const recipe_display = document.getElementById("recipe_display"); //Display, that shows opened recipes
    const help_display = document.getElementById("help_display"); //Display for help with new recipes
    const recipe_list = document.getElementById("recipe_list"); //Available recipes

    var alchemy1 = new Alchemy(null, null, null, null); //Class for alchemy element
    const recipes = recipes_obj; // recipes object
    recipe_display.children[1].innerHTML = recipes.length;

    /*Clear gameboard*/
    btn_clear.onclick = () => {
        var clear = new Clear();
        clear.clear_board();
    }
    /**/

    /*See available recipes*/
    btn_help.onclick = () => {
        var help = new Help();
        help.see_help(help_display, recipes);
    }
    /**/

    /*Functions for double-click*/

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

    function onDoubleClick(event) {
        var c = game_window.getBoundingClientRect();
        var x = 90;
        var x2 = 45;
        if (c.width < 400) {
            x = 75;
        }
        if (c.width < 600) {
            x2 = 30;
        }
        /**/
        if (event.offsetX <= c.width - x && event.offsetY <= c.height - 90 && event.offsetY >= 90) {
            for (let i = 0; i < 4; i++) {
                var elem = document.createElement("div"); //Create new element
                elem.classList.add("elem"); //Set elem class
                if (i == 0) {
                    elem.style.left = event.offsetX;
                    elem.style.top = event.offsetY;
                    elem.style.backgroundImage = "url('images/fire.svg')"
                    elem.setAttribute("name", "fire");
                }
                else if (i == 1) {
                    elem.style.left = event.offsetX + x2;
                    elem.style.top = event.offsetY;
                    elem.style.backgroundImage = "url('images/water.svg')"
                    elem.setAttribute("name", "water");
                }
                else if (i == 2) {
                    elem.style.left = event.offsetX + x2;
                    elem.style.top = event.offsetY - x2;
                    elem.style.backgroundImage = "url('images/earth.svg')"
                    elem.setAttribute("name", "earth");
                }
                else if (i == 3) {
                    elem.style.left = event.offsetX;
                    elem.style.top = event.offsetY - x2;
                    elem.style.backgroundImage = "url('images/air.svg')"
                    elem.setAttribute("name", "air");
                }
                elem.setAttribute("draggable", true);

                event_add(elem);
                game_window.appendChild(elem); //Add elements on game_window
            }

        }
    }

    const clickHandler = createClicker(onClick, onDoubleClick);
    game_window.onclick = clickHandler;

    function onClick(event) {

    }

    /**/

    /*Add all listeners*/

    function event_add(elem) {

        var c = game_window.getBoundingClientRect();
        /*
                elem.addEventListener('touchmove', function (e) {
                    var touchLocation = e.targetTouches[0];
                    elem.style.left = touchLocation.pageX + 'px';
                    elem.style.top = touchLocation.pageY + 'px';
                });
        
                elem.addEventListener('touchend', function (e) {
                    var x = parseInt(elem.style.left);
                    var y = parseInt(elem.style.top);
                })
        */

        if (c.width > 1280) {
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

        else {

            elem.addEventListener('touchmove', (e) => {
                func_ontouch(elem, e);
            })

            elem.addEventListener('touchend', function (e) {
                func_ontouchend(elem, e);
            })

            elem.ondragover = (e) => {
                e.preventDefault();
            }

            elem.ondrop = (e) => {

                func_ondrop(elem, e);

            }

        }

    }

    /*Functions for drag&drop*/


    function func_ondrag(elem) {
        alchemy1.el1 = elem.getAttribute("name");
        alchemy1.div1 = elem;
    }

    function func_ondragend(elem, event) {
        var c = game_window.getBoundingClientRect(); //Get coordinates of gameboard
        if (event.clientX >= c.left + 20 && event.clientX <= c.right - 20 && event.clientY >= c.top + 20 && event.clientY <= c.bottom - 20 && elem != undefined) {
            elem.style.left = event.clientX - c.x - 15;
            elem.style.top = event.clientY - c.y - 15;
        }
    }

    function func_ondrop(elem, event) {
        alchemy1.el2 = elem.getAttribute("name");
        alchemy1.div2 = elem;

        for (let i = 0; i < recipes.length; i++) {
            if (alchemy1.el1 == recipes[i].e1 && alchemy1.el2 == recipes[i].e2 || alchemy1.el1 == recipes[i].e2 && alchemy1.el2 == recipes[i].e1) {
                if (recipes[i].created == false) {
                    recipe_display.children[0].innerHTML = Number(recipe_display.children[0].innerHTML) + 1;
                    /*Add opened recipes at menu display*/
                    var row = document.createElement("div");
                    var img1 = document.createElement("div");
                    var i_plus = document.createElement("div");
                    var img2 = document.createElement("div");
                    var i_equal = document.createElement("div");
                    var img3 = document.createElement("div");
                    row.classList.add("row");
                    img1.classList.add("img");
                    i_plus.classList.add("img2");
                    img2.classList.add("img");
                    i_equal.classList.add("img2");
                    img3.classList.add("img");
                    img1.style.backgroundImage = `url('images/${recipes[i].e1}.svg')`;
                    i_plus.style.backgroundImage = `url('images/plus.svg')`;
                    img2.style.backgroundImage = `url('images/${recipes[i].e2}.svg')`;
                    i_equal.style.backgroundImage = `url('images/equal.svg')`;
                    img3.style.backgroundImage = `url('images/${recipes[i].res}.svg')`;
                    row.appendChild(img1);
                    row.appendChild(i_plus);
                    row.appendChild(img2);
                    row.appendChild(i_equal);
                    row.appendChild(img3);
                    row.setAttribute("data", recipes[i].res);
                    row.onclick = () => {
                        /*Add new element on game board*/
                        var new_elem = document.createElement("div"); //Create new element
                        new_elem.classList.add("elem"); //Set elem class
                        var c = game_window.getBoundingClientRect(); //Get coordinates of gameboard
                        new_elem.style.left = c.width / 2;
                        new_elem.style.top = c.height / 2;
                        new_elem.style.backgroundImage = `url('images/${row.getAttribute("data")}.svg')`;
                        new_elem.setAttribute("name", row.getAttribute("data"));
                        new_elem.setAttribute("draggable", true);
                        game_window.appendChild(new_elem);

                        /*
                        new_elem.addEventListener('touchmove', (e) => {
                            func_ontouch(new_elem, e);
                        })
                        */

                        event_add(new_elem);
                    }
                    recipe_list.appendChild(row);
                    recipes[i].created = true;
                }
                if (alchemy1.combine()) {
                    var new_elem = document.createElement("div");  //Create new element
                    new_elem.classList.add("elem");  //Set elem class
                    var c = game_window.getBoundingClientRect();
                    new_elem.style.left = event.clientX - c.x - 15;
                    new_elem.style.top = event.clientY - c.y - 15;
                    new_elem.style.backgroundImage = `url('images/${recipes[i].res}.svg')`;
                    new_elem.setAttribute("name", recipes[i].res);
                    new_elem.setAttribute("draggable", true);
                    game_window.appendChild(new_elem);

                    /*
                    new_elem.addEventListener('touchmove', (e) => {
                        func_ontouch(new_elem, e);
                    })
                    */

                    event_add(new_elem);

                }
            }
        };
    }
    /**/

    //For mobile phones                
    function func_ontouch(elem, e) {
        alchemy1.el1 = elem.getAttribute("name");
        alchemy1.div1 = elem;
        let touchLocation = e.targetTouches[0];
        currentElementId = currentElement.id;
        elem.style.left = touchLocation.pageX + 'px';
        elem.style.top = touchLocation.pageY + 'px';
    }

    function func_ontouchend(elem, e) {
        console.log(currentElementId)
        var x = parseInt(elem.style.left);
        var y = parseInt(elem.style.top);
        var c = game_window.getBoundingClientRect(); //Get coordinates of gameboard
        if (e.clientX >= c.left + 20 && e.clientX <= c.right - 20 && e.clientY >= c.top + 20 && e.clientY <= c.bottom - 20 && elem != undefined) {
            // elem.style.left = e.clientX - c.x - 15;
            // elem.style.top = e.clientY - c.y - 15;
            elem.style.left = x;
            elem.style.top = y;
        }
    }

}
