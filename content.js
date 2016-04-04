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
const CONTEXT_CLASS_NAME = 'zindex-level-context';
const CONTEXT_TIP_CLASS_NAME = 'zindex-level-context-tip';

const randomColor = () => {
    const random = () => (((Math.random() * 1e6) | 0) % 256);
    const red = random();
    const green = random();
    const blue = random();
    return `rgb(${red},${green},${blue})`;
};

const css = (node, key) => window.getComputedStyle(node, null)[key];

const detect = node => {
    const $node = $(node);
    const position = css(node, 'position');
    const zIndex = css(node, 'z-index');

    $node.children().each((idx, child) => {
        detect(child);
    });
    if (undefined !== position && 'static' !== position && !isNaN(zIndex)) {
        $node.addClass(CONTEXT_CLASS_NAME).css('outline-color', randomColor());

        $node.append($('<div/>').addClass(CONTEXT_TIP_CLASS_NAME).text(zIndex).css({
            left: 0,
            top: 0
        }));
    }
};

chrome.runtime.onMessage.addListener(message => {
    const tagClassName = 'zindex-level-context-extension';
    if (document.body.classList.contains(tagClassName)) {
        Array.prototype.forEach.call(document.querySelectorAll('.' + CONTEXT_CLASS_NAME), node => node.classList.remove(CONTEXT_CLASS_NAME));
        Array.prototype.forEach.call(document.querySelectorAll('.' + CONTEXT_TIP_CLASS_NAME), node => node.parentNode.removeChild(node));
        document.body.classList.remove(tagClassName);
    } else {
        document.body.classList.add(tagClassName);
        detect(document.body);
    }
});