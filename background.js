/**
 * Copyright (C) 2016 yanni4night.com
 * background.js
 *
 * changelog
 * 2016-04-04[06:39:51]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
        windowType: 'normal'
    }, tabs => tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {
        command: 'show-z-index'
    })))

});