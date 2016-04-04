/**
 * Copyright (C) 2016 yanni4night.com
 * content.js
 *
 * changelog
 * 2016-04-04[06:52:00]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */

const randomColor = () => {
    const random = () => (((Math.random() * 1e6) | 0 )% 256);
    const red = random();
    const green = random();
    const blue = random();
    return `rgb(${red},${green},${blue})`;
};

const detect = (node, level) => {
    const $node = $(node);
    const position = $node.css('position');
    const zIndex = $node.css('z-index');

    $node.children().each((idx, child) => {
        detect(child, level);
    });
    if (undefined !== position && 'static' !== position && !isNaN(zIndex)) {
        $node.addClass('zindex-level-context').css('outline-color', randomColor());

        $node.append($('<div/>').addClass('zindex-level-context-tip').text(zIndex).css({
            left: 0,
            top: 0
        }));
    }
};

chrome.runtime.onMessage.addListener(message => {
    detect(document.body, 600);
});