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
chrome.runtime.onMessage.addListener(message => {
    console.log(message, $);
});