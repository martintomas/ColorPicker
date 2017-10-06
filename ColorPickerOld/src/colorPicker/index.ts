import * as b from 'bobril';

import * as ColorPalete from './colorPalete';
import * as BlueChangeSlider from './blueChangeSlider';

const mainWrapperStyle = { position: 'relative', width: '400px', height: '300px', backgroundColor: 'red', 
    border: 'solid black 1px', borderRadius: '5px', margin: '10px', padding: '5px'};

export const create = b.createComponent<never>({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.style = mainWrapperStyle;

        me.children = [
            ColorPalete.create(),
            BlueChangeSlider.create(),
        ]
    }
}) ;