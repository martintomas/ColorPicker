import * as b from 'bobril';

import { colorsPickerStore, ColorTypes } from './store';

const sliderMainStyle = {position: 'absolute', top: '5px', left: '270px', border: '1px solid black', backgroundColor: 'black', 
    height: '255px', width: '35px'};
const sliderStyle = {transformOrigin: '15px 15px', transform: 'rotate(90deg)', width: '250px', height: '30px'};

const slider = b.createComponent<never>({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.attrs = {
            type: 'range',
            min: '0',
            max: '255',
            step: '1',
            value: colorsPickerStore.Blue.toString()
        };
        me.style = sliderStyle;
    },
    onChange(_ctx:b.IBobrilCtx, param: string) {
        colorsPickerStore.setColor(ColorTypes.BLUE, Number(param));
    }
});

export const create = b.createComponent<never>({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        console.log('redrawing slider');

        me.tag = 'span';
        me.children = [
            slider(),
        ];
        me.style = sliderMainStyle;
    }
})