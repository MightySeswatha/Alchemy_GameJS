export class Alchemy {

    constructor(name1, name2, div1, div2) {
        this.el1 = name1;
        this.el2 = name2;
        this.div1 = div1;
        this.div2 = div2;
    }

    combine() {
        // console.log(this.el1 + "+" + this.el2 + "=result");
        console.log(this.div1);
        console.log(this.div2);
        if (this.el1 != null && this.el2 != null) {
            this.div1.remove(); 
            this.div2.remove();
            this.div1 = null;
            this.div2 = null;
            return true;
        }
        return false;
    }

}