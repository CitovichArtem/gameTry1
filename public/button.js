import {ctx, font } from './game.js';
const activeColor = '#ffffff', disabledColor = "#ff0000";

export const drawButton = (x, y, width, height, text, radius, isDisabled) => {
    ctx.save();
    const borderOffset = 3;
    const fillColor = isDisabled ? disabledColor : activeColor;
    let fontBig = font, fontSmall = font*0.95;
    ctx.strokeStyle = fillColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + radius + borderOffset, y + borderOffset);
    ctx.arcTo(x + width - borderOffset, y + borderOffset, x + width - borderOffset, y + height - borderOffset, radius);
    ctx.arcTo(x + width - borderOffset, y + height - borderOffset, x + borderOffset, y + height - borderOffset, radius);
    ctx.arcTo(x + borderOffset, y + height - borderOffset, x + borderOffset, y + borderOffset, radius);
    ctx.arcTo(x + borderOffset, y + borderOffset, x + width - borderOffset, y + borderOffset, radius);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = fillColor;
    ctx.font = isDisabled ? `${fontSmall} Montserrat` : `${fontBig} Montserrat`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + width / 2, y + height / 2);

    ctx.restore();
};
