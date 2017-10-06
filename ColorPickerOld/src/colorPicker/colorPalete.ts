import * as b from 'bobril';

import { colorsPickerStore, ColorTypes } from './store';

let colorPaleteMainStyle = {
    width: '255px', height: '255px', border: '1px solid black',
    position: 'absolute', top: '5px', left: '5px'
};

export interface IColorPalete {
    maxValues?: number;
}

interface IContexColorPalete extends b.IBobrilCtx {
    data: IColorPalete;
}

export const create = b.createComponent<IColorPalete>({
    init(ctx: IContexColorPalete) {
    },
    render(ctx: IContexColorPalete, me: b.IBobrilNode) {
        console.log('redrawing palete');

        colorPaleteMainStyle['background'] = 
        'linear-gradient(top left, rgb(255,0,' + colorsPickerStore.Blue + '), rgb(0,255,' + colorsPickerStore.Blue + '))';
        
        me.tag = 'span';
        //me.style = colorPaleteMainStyle;
        b.style(me,colorPaleteMainStyle);
    }
});
