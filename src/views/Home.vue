<template>
  <Root class="home-container">
    <Row>
      <i-col span="12">
        <div id="pie"></div>
      </i-col>

      <i-col span="12">
        <div id="pie2"></div>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <div id="pie3"></div>
      </i-col>

      <i-col span="12">
        <div id="pie4"></div>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <div id="pie5"></div>
      </i-col>

      <i-col span="12">
        <div id="pie6"></div>
      </i-col>
    </Row>
  </Root>
</template>

<script>
// 引入 ECharts 模块
let echarts = require("echarts/lib/echarts");
// 引入扇形图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title"); // 引入 ECharts 模块
import api from "../network/api";
import { request } from "../network/index";
import Root from "../components/common/Root";
export default {
  name: "home",
  data() {
    return {
      incomeAndTaxdata: [],
      pieCharts: {},
      pieCharts2: {},
      pieCharts3: {},
      pieCharts4: {},
      pieCharts5: {},
      pieCharts6: {},
    };
  },
  components: {
    Root
  },
  mounted() {
    this.drawPie();
    this.drawPie2();
    this.drawPie3();
    this.drawPie4();
    this.drawPie5();
    this.drawPie6();
  },
  methods: {
    chartClick(param) {
      console.log("chartClick.........");

      console.log(param);
      this.$router.replace({ name: param.seriesName });
    },
    drawPie2() {
      let params = {};
      this.isShowLoading = true;
      request({
        url: api.tdpreRecordData,
        method: "POST",
        data: params
      })
        .then(res => {
          this.isShowLoading = false;
          this.incomeAndTaxdata = res.data;
          let options = {
            title: {
              text: "预填写" // 标题组件，设置图表标题
            },

            series: [
              // 系列列表 ，里面每个对象通过 type 决定自己额图表类型
              {
                name: "tdprefill", // 系列名称
                type: "pie", // 通过设置这个值来控制图表是扇形图
                radius: ["0%", "55%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径
                data: this.incomeAndTaxdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                  }
                }
              }
            ]
          };
          this.pieCharts2 = echarts.init(document.getElementById("pie2")); // 初始化图表实例
          this.pieCharts2.setOption(options); // 设置图表配置项
          this.pieCharts2.on("click", this.chartClick);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    },
    drawPie3() {
      let params = {};
      this.isShowLoading = true;
      request({
        url: api.tdsendDeclarData,
        method: "POST",
        data: params
      })
        .then(res => {
          this.isShowLoading = false;
          this.incomeAndTaxdata = res.data;
          let options = {
            title: {
              text: "发送申报" // 标题组件，设置图表标题
            },

            series: [
              // 系列列表 ，里面每个对象通过 type 决定自己额图表类型
              {
                name: "tdsenddeclare", // 系列名称
                type: "pie", // 通过设置这个值来控制图表是扇形图
                radius: ["0%", "55%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径
                data: this.incomeAndTaxdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                  }
                }
              }
            ]
          };
          this.pieCharts3 = echarts.init(document.getElementById("pie3")); // 初始化图表实例
          this.pieCharts3.setOption(options); // 设置图表配置项
          this.pieCharts3.on("click", this.chartClick);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    },

    drawPie4() {
      let params = {};
      this.isShowLoading = true;
      request({
        url: api.atinitdata,
        method: "POST",
        data: params
      })
        .then(res => {
          this.isShowLoading = false;
          this.incomeAndTaxdata = res.data;
          let options = {
            title: {
              text: "生产经营初始化"
            },
            series: [
              // 系列列表 ，里面每个对象通过 type 决定自己额图表类型
              {
                name: "atinit", // 系列名称
                type: "pie", // 通过设置这个值来控制图表是扇形图
                radius: ["0%", "55%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径
                data: this.incomeAndTaxdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                  }
                }
              }
            ]
          };
          this.pieCharts4 = echarts.init(document.getElementById("pie4")); // 初始化图表实例
          this.pieCharts4.setOption(options); // 设置图表配置项
          this.pieCharts4.on("click", this.chartClick);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    },

    drawPie5() {
      let params = {};
      this.isShowLoading = true;
      request({
        url: api.attaxpaydata,
        method: "POST",
        data: params
      })
        .then(res => {
          console.log(res.data);
          
          this.isShowLoading = false;
          this.incomeAndTaxdata = res.data;
          let options = {
            title: {
              text: "生产经营发送申报" // 标题组件，设置图表标题
            },

            series: [
              // 系列列表 ，里面每个对象通过 type 决定自己额图表类型
              {
                name: "atSenddeclare", // 系列名称
                type: "pie", // 通过设置这个值来控制图表是扇形图
                radius: ["0%", "55%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径
                data: this.incomeAndTaxdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                  }
                }
              }
            ]
          };
          this.pieCharts5 = echarts.init(document.getElementById("pie5")); // 初始化图表实例
          this.pieCharts5.setOption(options); // 设置图表配置项
          this.pieCharts5.on("click", this.chartClick);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    },
    drawPie6() {
      let params = {};
      this.isShowLoading = true;
      request({
        url: api.cpchartdata,
        method: "POST",
        data: params
      })
        .then(res => {
          this.isShowLoading = false;
          this.incomeAndTaxdata = res.data;
          let options = {
            title: {
              text: "信用预评" // 标题组件，设置图表标题
            },

            series: [
              // 系列列表 ，里面每个对象通过 type 决定自己额图表类型
              {
                name: "cphome", // 系列名称
                type: "pie", // 通过设置这个值来控制图表是扇形图
                radius: ["0%", "55%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径
                data: this.incomeAndTaxdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                  }
                }
              }
            ]
          };
          this.pieCharts6 = echarts.init(document.getElementById("pie6")); // 初始化图表实例
          this.pieCharts6.setOption(options); // 设置图表配置项
          this.pieCharts6.on("click", this.chartClick);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    },
    drawPie() {
      let params = {};
      this.isShowLoading = true;
      request({
        url: api.tdinitdata,
        method: "POST",
        data: params
      })
        .then(res => {
          this.isShowLoading = false;
          this.incomeAndTaxdata = res.data;
          let options = {
            title: {
              text: "申报初始化" // 标题组件，设置图表标题
            },

            series: [
              // 系列列表 ，里面每个对象通过 type 决定自己额图表类型
              {
                name: "tdinit", // 系列名称
                type: "pie", // 通过设置这个值来控制图表是扇形图
                radius: ["0%", "55%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径
                data: this.incomeAndTaxdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  },
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                  }
                }
              }
            ]
          };
          this.pieCharts = echarts.init(document.getElementById("pie")); // 初始化图表实例
          this.pieCharts.setOption(options); // 设置图表配置项
          this.pieCharts.on("click", this.chartClick);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    }
  }
};
</script>

<style scoped>
.home-container {
  padding: 10px;
  padding-top: 5px;
}
.home-content {
  padding: 10px;
  border-radius: 5px;
  background: #fff;
}
#pie {
  width: 400px;
  height: 200px;
}

#pie2 {
  width: 400px;
  height: 200px;
}
#pie3 {
  width: 400px;
  height: 200px;
}
#pie4 {
  width: 400px;
  height: 200px;
}
#pie5 {
  width: 400px;
  height: 200px;
}
#pie6 {
  width: 400px;
  height: 200px;
}
</style>