import * as b from 'bobril';

import {colorsPickerStore} from './store';

const predColorMainStyle = {height: '20px', width: '20px', border: '1px solid black', margin: '0px 5px 0px 5px', 
    display: 'inline-block', cursor: 'pointer'};

export interface IPredefinedColor {
    colorCode: string;
}

interface IPredColorContext extends b.IBobrilCtx {
    data: IPredefinedColor;
}

export const create = b.createComponent<IPredefinedColor>({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        predColorMainStyle['backgroundColor'] = ctx.data.colorCode;

        me.tag = 'span';
        me.children = [];
        b.style(me, predColorMainStyle);
    },
    onClick(ctx: b.IBobrilCtx): boolean {

        colorsPickerStore.setHexColor(ctx.data.colorCode);

        return true;
    }
});