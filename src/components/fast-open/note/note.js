class StickyNote {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        Object.assign(this, config, options);
        this.id = this.id ? this.id : new Date().getTime();
        StickyNote.top = Math.max(StickyNote.top, this.layer);
        if (!this.root) {
            this.root = document.body;
        }
        this.container = document.createElement('div');
        this.container.classList.add(this.className || 'risev-mini-component');
        this.root.appendChild(this.container);
        this.render();
        this.bindEvent();
    }

    save() {
        this.content = this.noteContent.innerHTML;
        store.set(this.id, {
            content: this.content || '',
            postTime: new Date().getTime(),
            x: this.x,
            y: this.y,
            layer: this.layer
        });
    }

    close() {
        try {
            if (this.root) {
                this.root.removeChild(this.container);
            }
            //本地存储组件显示状态
            localStorage.setItem(
                "showRiseVComponent",
                'false'
            );
        } catch (error) {

        }
    }

    bindEvent() {
        var pos = {},
            self = this,
            canMove = false;
        addEvent(this.titleBar, 'mousedown', function (e) {
            pos.x = e.clientX - self.container.offsetLeft;
            pos.y = e.clientY - self.container.offsetTop;
            if (e.button == 0) {
                canMove = true;
            }
        });
        addEvent(document, 'mousemove', function (e) {
            if (!canMove) return;
            var
                x = Math.min(document.documentElement.clientWidth - self.width, Math.max(e.clientX - pos.x, 0)),
                y = Math.min(document.documentElement.clientHeight - self.height, Math.max(e.clientY - pos.y, 0));

            self.container.style.left = x + 'px';
            self.container.style.top = y + 'px';
        });
        addEvent(document, 'mouseup', function (e) {
            canMove = false;
        });

        addEvent(self.noteContent, 'keyup', function (e) {
            self.save();
        });

        addEvent(self.btnClose, 'click', function (e) {
            self.close();
            self.save();
        });

        addEvent(self.btnNew, 'click', function (e) {
            var x = self.x,
                y = self.y,
                maxWidth = document.documentElement.clientWidth - self.width,
                maxHeight = document.documentElement.clientHeight - self.height;
            if (x >= maxWidth || x < 0) {
                vx *= -1;
            }

            if (y >= maxHeight || y < 0) {
                vy *= -1;
            }

            x = x + 20 * vx;
            y = y + 20 * vy;

            new StickyNote({
                root: self.root,
                x: x,
                y: y,
                layer: StickyNote.top++
            });
        });

        addEvent(self.btnRemove, 'click', function (e) {
            store.remove(self.id);
            self.close();
        });

        addEvent(self.container, 'mousedown', function (e) {
            if (e.button != 0) return;
            self.layer = StickyNote.top++;
            self.container.style.zIndex = self.layer;
        });

        addEvent(self.container, 'mouseup', function (e) {
            self.x = self.container.offsetLeft || 0;
            self.y = self.container.offsetTop || 0;
            self.save();
        });
    }

    render() {
        var self = this;
        self.container.innerHTML = template.replace(/\{\{([^\}]+)\}\}/g, ($0, $1) => self[$1]);
        self.titleBar = self.container.querySelector('.risev-component-note-title');
        self.noteContent = self.container.querySelector('.risev-component-note-content');
        self.btnClose = self.container.querySelector('.risev-component-btn-close');
        self.btnNew = self.container.querySelector('.risev-component-btn-new');
        self.btnRemove = self.container.querySelector('.risev-component-btn-remove');
        self.container.style.position = 'absolute';
        self.container.style.left = self.x + 'px';
        self.container.style.top = self.y + 'px';
        self.noteContent.innerHTML = self.content;
        self.container.data = self;
        self.container.style.zIndex = self.layer;
        self.save();
    }
}

StickyNote.top = 0;
var vx = 1,
    vy = 1;
const config = {
    id: null,
    root: null,
    title: '便笺',
    btnCloseTip: '关闭',
    textBtnNew: '新建笔记',
    textBtnRemove: '删除笔记',
    container: null,
    titleBar: null,
    width: 230,
    height: 320,
    x: 0,
    y: 0,
    layer: 0,
    content: '',
};

const template = [
    '<div class="risev-component-note-title">',
    '   <h6>{{title}}</h6>',
    '   <a href="javascript:;" title="{{btnCloseTip}}" class="risev-component-btn-close">&times;</a>',
    '</div>',
    '<div class="risev-component-note-content" contenteditable="true"></div>',
    '<div class="risev-component-note-footer">',
    '   <button class="risev-component-btn-new">{{textBtnNew}}</button>',
    '   <button class="risev-component-btn-remove">{{textBtnRemove}}</button>',
    '</div>'
].join('\n');

function addEvent(el, type, fn) {
    var ieType = 'on' + type;
    if ('addEventListener' in window) {
        addEventListener.call(el, type, fn, false);
    } else if ('attachEvent' in el) {
        attachEvent.call(el, ieType, fn, false);
    } else {
        el[ieType] = fn;
    }
}

function removeEvent(el, type, fn) {
    var ieType = 'on' + type;
    if ('removeEventListener' in window) {
        removeEventListener.call(el, type, fn, false);
    } else if ('dispatchEvent' in el) {
        el.dispatch(ieType, fn);
    } else {
        el[ieType] = null;
    }
}

const store = {
    appId: 'stickyNote',
    data: {},
    get(id) {
        return store.data ? store.data[id] : {};
    },

    set(id, value) {
        store.data[id] = value;
    },

    remove(id) {
        delete store.data[id];
        localStorage.setItem(store.appId, JSON.stringify(store.data));
        //本地存储组件显示状态
        localStorage.setItem(
            "showRiseVComponent",
            'false'
        );
    },

    setup() {
        try {
            store.data = JSON.parse(localStorage[store.appId]) || {};
        } catch (e) {
            store.data = {};
            store.note = {}
        }
        var data = store.data;
        if (!isEmpty(data)) {

            for (var k in data) {
                store.note =    new StickyNote({
                    root: document.body,
                    id: k,
                    x: data[k].x,
                    y: data[k].y,
                    layer: data[k].layer,
                    content: data[k].content
                });
            }
        } else {
         store.note =  new StickyNote({
                root: document.body,
                x: 0,
                y: 0,
            });
        }
        window.onunload = function () {
            localStorage.setItem(store.appId, JSON.stringify(data));
        };
        return {
            note: store.note,
            data: store.data
        };
    },

    unsetup() {
        store.data = {};
        localStorage.removeItem(store.appId);
        window.onunload = null;
    }
};

function isEmpty(o) {
    if (typeof o === 'string' || Array.isArray(o)) {
        return o.length === 0;
    } else if (typeof o === 'object') {
        for (let k in o) {
            if (!o.hasOwnProperty(k)) continue;
            return false;
        }
        return true;
    } else {
        return o == null;
    }
}

export {
    StickyNote,
    store,
    addEvent,
    removeEvent
};