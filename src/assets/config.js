export const RISEV_MENU_LIST = [{
        "name": "精品整理",
        "id": 1,
        "icon": require("@/assets/images/menus/hot.svg"),
        "group": [{
            "groupId": 100001,
            "name": "热门"
        }, {
            "groupId": 100002,
            "name": "图像"
        }, {
            "groupId": 100003,
            "name": "文档"
        }, {
            "groupId": 100004,
            "name": "设计"
        }, {
            "groupId": 100005,
            "name": "开发"
        }]

    },

    {
        "name": "文件处理",
        "id": 2,
        "icon": require("@/assets/images/menus/wenjian.svg"),
        "group": [{
            "groupId": 200001,
            "name": "文件转换"
        }, {
            "groupId": 200002,
            "name": "文档编辑"
        }, {
            "groupId": 200006,
            "name": "共享与协作"
        }]

    }, {
        "name": "图像处理",
        "id": 3,
        "icon": require("@/assets/images/menus/picture_interpretation.svg"),
        "group": [{
            "groupId": 3000010,
            "name": "图像压缩"
        }, {
            "groupId": 300001,
            "name": "图像编辑"
        }, {
            "groupId": 300002,
            "name": "在线抠图"
        }, {
            "groupId": 300003,
            "name": "图片背景消除"
        }, {
            "groupId": 300004,
            "name": "视频处理"
        }]

    }, {
        "name": "设计制作",
        "id": 4,
        "icon": require("@/assets/images/menus/sheji.svg"),
        "group": [{
            "groupId": 400001,
            "name": "图形设计"
        }, {
            "groupId": 400002,
            "name": "思维导图"
        }, {
            "groupId": 400004,
            "name": "原型设计"
        }, {
            "groupId": 400005,
            "name": "icon图标"
        }, {
            "groupId": 4000010,
            "name": "颜色搭配"
        }, {
            "groupId": 400003,
            "name": "创意工具"
        }]

    }, {
        "name": "编程助手",
        "id": 5,
        "icon": require("@/assets/images/menus/biancheng.svg"),
        "group": [{
            "groupId": 500001,
            "name": "在线工具"
        }]

    }, {
        "name": "效率工具",
        "id": 6,
        "icon": require("@/assets/images/menus/xiaolv.svg"),
        "group": [{
            "groupId": 600001,
            "name": "在线翻译"
        }, {
            "groupId": 600003,
            "name": "AI专区"
        }, {
            "groupId": 600002,
            "name": "金额转换"
        }, {
            "groupId": 600004,
            "name": "其他工具"
        }]

    }, {
        "name": "RiseV专属",
        "id": 7,
        "icon": require("@/assets/images/menus/zhuanshu.svg"),
        "group": []

    }, {
        "name": "我的收藏",
        "id": 8,
        "icon": require("@/assets/images/menus/shoucang.svg"),
        "group": []
    }
]

export const TOOLS_LIST = [{
        "logo": require('@/assets/images/kimi.png'),
        "name": "Kimi Ai",
        "desc": "人工智能助手",
        "target": "https://kimi.moonshot.cn/",
        "jp": "km",
        "menuId": [1, 6],
        "groupId": [100001, 600003]
    },
    {
        "logo": require('@/assets/images/wenxinyiyan.svg'),
        "name": "文心一言",
        "desc": "百度文心一言",
        'jp': 'wxyy',
        "target": "https://www.yiyan.baidu.com/",
        "menuId": [1, 6],
        "groupId": [100001, 600003]
    },
    {
        "logo": require('@/assets/images/bdfy.svg'),
        "name": "百度翻译",
        "desc": "在线翻译",
        "jp": "bdfy",
        "target": "https://fanyi.baidu.com/mtpe-individual/multimodal#/",
        "menuId": [6, 1],
        "groupId": [600001, 100001]
    },
    {
        "logo": require('@/assets/images/tinypng.png'),
        "name": "TinyPng",
        "desc": "免费无损压缩图片",
        'jp': 'tiny',
        "target": "https://tinypng.com/",
        "menuId": [3, 1],
        "groupId": [3000010, 100001, 100002]
    },
    {
        "logo": require('@/assets/images/processon.png'),
        "name": "Processon",
        "desc": "免费在线流程图思维导图",
        'jp': 'processon',
        "target": "https://www.processon.com/",
        "menuId": [4, 1],
        "groupId": [400002, 100001]
    },
    {
        "logo": require('@/assets/images/lovepdf.png'),
        "name": "I❤PDF",
        "desc": "免费PDF合并、拆分、压缩、转换图片等",
        'jp': 'pdf',
        "target": "https://www.ilovepdf.com/zh-cn",
        "menuId": [2, 1],
        "groupId": [200001, 100001]
    },
    {
        "logo": require('@/assets/images/tutieshi.png'),
        "name": "图贴士",
        'jp': 'tts',
        "desc": "gif制作",
        "target": "https://www.ilovepdf.com/zh-cn",
        "menuId": [3],
        "groupId": [300001]
    },
    {
        "logo": require('@/assets/images/jezh.svg'),
        "name": "金额转换",
        'jp': 'jezh',
        "desc": "在线金额大小写转换",
        "target": "https://www.xiezq.com/",
        "menuId": [6],
        "groupId": [600002]
    },
    {
        "logo": require('@/assets/images/Fliki.png'),
        "name": "Fliki",
        'jp': 'fli',
        "desc": "文本转视频AI工具",
        "target": "https://kimi.moonshot.cn/",
        "menuId": [3],
        "groupId": [300004]
    },
    {
        "logo": require('@/assets/images/docsmall.jpg'),
        "name": "DocSmall",
        "desc": "在线压缩文件大小",
        'jp': 'doc',
        "target": "https://docsmall.com/",
        "menuId": [1, 2],
        "groupId": [100002, 200001]
    },
    {
        "logo": require('@/assets/images/cdkm.png'),
        "name": "CDKM",
        'jp': 'zh',
        "desc": "在线文件转换器，完全免费，用完就删！",
        "target": "https://cdkm.com/cn/",
        "menuId": [2],
        "groupId": [200001]
    },
    {
        "logo": require('@/assets/images/chuangkit.jpeg'),
        "name": "创可贴",
        'jp': 'ckt',
        "desc": "在线作图与视频必备工具",
        "target": "https://www.chuangkit.com/",
        "menuId": [1, 4],
        "groupId": [100004, 400001]
    },
    {
        "logo": require('@/assets/images/clippingmagic.png'),
        "name": "ClippingMagic",
        'jp': 'kt',
        "desc": "在线抠图工具",
        "target": "https://clippingmagic.com/",
        "menuId": [1, 3],
        "groupId": [100002, 300002]
    },
    {
        "logo": require('@/assets/images/cli.png'),
        "name": "草料二维码",
        'jp': 'cl',
        "desc": "在线创建二维码",
        "target": "https://cli.im/",
        "menuId": [1, 4],
        "groupId": [100004, 400001]
    },
    {
        "logo": require('@/assets/images/gaoding.png'),
        "name": "UUPOOP",
        'jp': 'ps',
        "desc": "在线PS处理",
        "target": "https://www.uupoop.com/",
        "menuId": [3, 1],
        "groupId": [300001, 100002]
    },
    {
        "logo": require('@/assets/images/gamma.png'),
        "name": "Gamma",
        'jp': 'ppt',
        "desc": "最好用的AI生成PPT工具",
        "target": "https://gamma.app/",
        "menuId": [2, 6],
        "groupId": [200002, 600003]
    },
    {
        "logo": require('@/assets/images/billfish.png'),
        "name": "Billfish",
        'jp': 'billfish',
        "desc": "收集和整理创意灵感",
        "target": "https://www.billfish.cn/",
        "menuId": [4],
        "groupId": [400003]
    },
    {
        "logo": require('@/assets/images/xunjie.png'),
        "name": "迅捷思维导图",
        'jp': 'swdt',
        "desc": "支持多人协作",
        "target": "https://www.liuchengtu.com/",
        "menuId": [4],
        "groupId": [400002]
    },
    {
        "logo": require('@/assets/images/removebg.png'),
        "name": "Remove.bg",
        "desc": "图片背景消除",
        'jp': 'bjxc',
        "target": "www.remove.bg/",
        "menuId": [3, 1],
        "groupId": [300003, 100002]
    },
    {
        "logo": require('@/assets/images/bro.svg'),
        "name": "BrowserFrame",
        "desc": "网页截图嵌入浏览器",
        'jp': 'jt',
        "target": "https://browserframe.com/",
        "menuId": [6],
        "groupId": [300001]
    },
    {
        "logo": require('@/assets/images/tengxunwendang.png'),
        "name": "腾讯文档",
        "desc": "支持多人在线编辑Word、Excel",
        'jp': 'wd',
        "target": "https://docs.qq.com/home",
        "menuId": [2, 1],
        "groupId": [200002, 200006, 100003]
    },
    {
        "logo": require('@/assets/images/convertio.png'),
        "name": "Convertio",
        "desc": "在线文档文件转换器",
        'jp': 'zh',
        "target": "https://convertio.co/zh/document-converter/",
        "menuId": [2, 1],
        "groupId": [200001, 100003]
    }, {
        "logo": require('@/assets/images/videvo.svg'),
        "name": "VIDEVO",
        "desc": "视频素材下载",
        'jp': 'video',
        "target": "https://www.videvo.net/",
        "menuId": [3],
        "groupId": [300004]
    }, {
        "logo": require('@/assets/images/loading.png'),
        "name": "Loading",
        "desc": "制作GIF、SVG、CSS加载动画图标",
        'jp': 'load',
        "target": "https://loading.io/",
        "menuId": [4],
        "groupId": [400005]
    }, {
        "logo": require('@/assets/images/iconfont.png'),
        "name": "iconfont",
        "desc": "阿里团队图标字体及图标素材下载",
        'jp': 'iconfont',
        "target": "https://www.iconfont.cn/plus",
        "menuId": [4],
        "groupId": [400005]
    }, {
        "logo": require('@/assets/images/trianglify.png'),
        "name": "Trianglify",
        "desc": "炫酷多边形背景色块生成",
        'jp': 'ys',
        "target": "https://trianglify.io/",
        "menuId": [4],
        "groupId": [400005]
    }, {
        "logo": require('@/assets/images/lingdaima.svg'),
        "name": "零代码",
        "desc": "专为前端打造",
        'jp': 'code',
        "target": "http://www.lingdaima.com/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/erjinzhi.png'),
        "name": "进制转换",
        "desc": "在线进制转换",
        'jp': 'jz',
        "target": "https://tool.lu/hexconvert/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/cardbon.png'),
        "name": "carbon",
        "desc": "代码生成海报",
        'jp': 'hb',
        "target": "https://carbon.now.sh/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/jiami.png'),
        "name": "加密解密",
        "desc": "在线加密解密",
        'jp': 'dec',
        "target": "https://tool.lu/encdec/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/bejson.svg'),
        "name": "bejson",
        "desc": "json格式化",
        'jp': 'json',
        "target": "https://www.bejson.com/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/yanse.svg'),
        "name": "颜色转换",
        "desc": "RGB转16进制",
        'jp': 'ys',
        "target": "https://www.jyshare.com/front-end/55/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/cubic.png'),
        "name": "cubic",
        "desc": "贝塞尔曲线生成",
        'jp': 'bse',
        "target": "https://cubic-bezier.com/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/codepen.png'),
        "name": "codepen",
        "desc": "在线炫酷样式技能效果",
        'jp': 'code',
        "target": "https://codepen.io/",
        "menuId": [5],
        "groupId": [500001]

    }, {
        "logo": require('@/assets/images/modao.svg'),
        "name": "墨刀",
        "desc": "让原型设计更简单",
        'jp': 'md',
        "target": "https://modao.cc/",
        "menuId": [4, 1],
        "groupId": [400004, 100005]
    }, {
        "logo": require('@/assets/images/codepen.png'),
        "name": "codepen",
        "desc": "变量命名转换",
        'jp': 'code',
        "target": "https://www.iamwawa.cn/namingconverter.html",
        "menuId": [5],
        "groupId": [500001]

    }, {
        "logo": require('@/assets/images/mahua-logo.jpeg'),
        "name": "mahua",
        "desc": "在线markdown编辑器",
        'jp': 'markdown',
        "target": "http://mahua.jser.me/",
        "menuId": [5],
        "groupId": [500001]
    }, {
        "logo": require('@/assets/images/zhongguose.png'),
        "name": "中国传统颜色",
        "desc": "中科院色谱的中国传统色",
        'jp': 'ps',
        "target": "https://www.zhongguose.com/",
        "menuId": [4],
        "groupId": [4000010]
    }, {
        "logo": require('@/assets/images/lanhu.svg'),
        "name": "蓝湖",
        "desc": "产品设计协作平台",
        'jp': 'lh',
        "target": "https://lanhuapp.com/",
        "menuId": [1, 4],
        "groupId": [100004, 400001]
    }
]

export const ACCOUNT_TYPE_LIST = [{
    "logo": require('@/assets/images/icon-chatgpt.svg'),
    "name": "Chatgpt",
    "desc": "最强人工智能，免费使用",
    "type": "账号共享",
    "target": "",
    "id": 1,
    "accountList": []
}]