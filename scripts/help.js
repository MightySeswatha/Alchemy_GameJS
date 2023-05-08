export class Help {

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    see_help(parent,recipes) {
        var arr = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].created == false) { arr.push(recipes[i]); }
        }

        var mark = this.getRandomInt(0, 2);
        var temp = this.getRandomInt(0, arr.length);

        if (mark == 0) {
            while (parent.children.length != 0) {
                parent.children[0].remove();
            }

            var row = document.createElement("div");
            var img1 = document.createElement("div");
            var i_plus = document.createElement("div");
            var img2 = document.createElement("div");
            var i_equal = document.createElement("div");
            var img3 = document.createElement("div");
            row.classList.add("row_btn");
            img1.classList.add("img");
            i_plus.classList.add("img2");
            img2.classList.add("img");
            i_equal.classList.add("img2");
            img3.classList.add("img");
            img1.style.backgroundImage = `url('images/${arr[temp].e1}.svg')`;
            i_plus.style.backgroundImage = `url('images/plus.svg')`;
            img2.style.backgroundImage = `url('images/question.svg')`;
            i_equal.style.backgroundImage = `url('images/equal.svg')`;
            img3.style.backgroundImage = `url('images/${arr[temp].res}.svg')`;
            row.appendChild(img1);
            row.appendChild(i_plus);
            row.appendChild(img2);
            row.appendChild(i_equal);
            row.appendChild(img3);
            parent.appendChild(row);

        }

        else {
            while (parent.children.length != 0) {
                parent.children[0].remove();
            }
            var row = document.createElement("div");
            var img1 = document.createElement("div");
            var i_plus = document.createElement("div");
            var img2 = document.createElement("div");
            var i_equal = document.createElement("div");
            var img3 = document.createElement("div");
            row.classList.add("row_btn");
            img1.classList.add("img");
            i_plus.classList.add("img2");
            img2.classList.add("img");
            i_equal.classList.add("img2");
            img3.classList.add("img");
            img1.style.backgroundImage = `url('images/question.svg')`;
            i_plus.style.backgroundImage = `url('images/plus.svg')`;
            img2.style.backgroundImage = `url('images/${arr[temp].e2}.svg')`;
            i_equal.style.backgroundImage = `url('images/equal.svg')`;
            img3.style.backgroundImage = `url('images/${arr[temp].res}.svg')`;
            row.appendChild(img1);
            row.appendChild(i_plus);
            row.appendChild(img2);
            row.appendChild(i_equal);
            row.appendChild(img3);
            parent.appendChild(row);
        }
    }
}