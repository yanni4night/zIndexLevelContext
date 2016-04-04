/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-04-04[05:40:46]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
class ZIndexLevelContext {
    constructor(treeNode) {
        this._parse(treeNode);
    }
    _parse(treeNode) {
        const self = this;
        if (Array.isArray(treeNode.childNodes) && treeNode.childNodes.length) {
            for (let i = 0, child; i < treeNode.childNodes.length; ++i) {
                child = treeNode.childNodes[i];
                console.log(child.name);
                this._parse(child);
            }
        }
    }
}