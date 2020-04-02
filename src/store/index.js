import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    

    state: {
        user:{
            username: "",
            password: "",
            uid:""
        },
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
            {
                text: '个税申报',
                type: 'logo-google',
                children: [
                    {
                        type: 'md-paper',
                        name: 'tdinit',
                        text: '初始化任务'
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        // hidden: true,
                    },
                    {
                                type: 'ios-create',
                                name: 'tdprefill',
                                text: '预填写任务',
                            },
                            {
                                type: 'md-repeat',
                                name: 'tdsenddeclare',
                                text: '发送申报任务',
                            },
                            {
                                type: 'logo-playstation',
                                name: 'tddeclarepay',
                                text: '申报缴款任务',
                         
                    },
                ],
            },
            {
                text: '生产经营申报',
                type: 'logo-hackernews',
                children: [
                    {
                        type: 'md-paper',
                        name: 'atinit',
                        text: '初始化任务'
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        // hidden: true,
                    },
                    {
                                type: 'md-repeat',
                                name: 'atSenddeclare',
                                text: '缴款发送申报任务',
                            },
                            {
                                type: 'logo-playstation',
                                name: 'attaxpay',
                                text: '税款缴纳',
                         
                    },
                ],
            },
            {
                text: '股权信息',
                type: 'ios-podium',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'sharelist',
                        text: '挂牌信息',
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        // hidden: true,
                    },
                    {
                        type: 'ios-grid',
                        name: 'shareshh',
                        text: '预审核信息',
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        // hidden: true,
                    }
                ],
            },
            {
                text: '信用预评',
                type: 'ios-ribbon',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'cphome',
                        text: '预评结果',
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        // hidden: true,
                    }
                ],
            },
            {
                text:'企业微信',
                type:'ios-contacts',
                children:[
                    {
                        type:'ios-contacts-outline',
                        name:'ewcontants',
                        text:'联系人'
                    }
                ]
            }
            
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setUser(state, user) {
            state.user = user
        }
    },
})

export default store