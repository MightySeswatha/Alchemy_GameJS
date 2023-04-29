export class Clear {

    clear_board() {
        while (document.getElementsByClassName("elem").length != 0) {
            document.getElementsByClassName("elem")[0].remove();
        }

    }

}

