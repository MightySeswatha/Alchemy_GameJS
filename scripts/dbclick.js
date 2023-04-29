/*Edit*/
export class DBclick {
    dbclick() {
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
            
        }

    }
}