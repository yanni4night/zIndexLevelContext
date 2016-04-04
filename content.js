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

const camelCase = str => str.replace(/\-([a-z])/mg, (m, $1, $2) => $1.toUpperCase());

const css = (node, key, ...args) => {
    if (args.length) {
        // set
        node.style[camelCase(key)] = args[0];
    } else {
        // get
        return window.getComputedStyle(node, null)[key];
    }
}

const detect = node => {
    const position = css(node, 'position');
    const zIndex = css(node, 'z-index');

    Array.prototype.forEach.call(node.childNodes, child => {
        if (child.nodeName && 1 === child.nodeType) {
            detect(child);
        }
    });

    if (undefined !== position && 'static' !== position && !isNaN(zIndex)) {
        node.classList.add(CONTEXT_CLASS_NAME);
        css(node, 'outline-color', randomColor());

        let tip = document.createElement('div');
        tip.classList.add(CONTEXT_TIP_CLASS_NAME);
        tip.innerText = zIndex;
        css(tip, 'left', 0);
        css(tip, 'top', 0);
        node.appendChild(tip);
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