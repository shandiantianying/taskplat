<template>
  <Root>
    <Form ref="formValidate" :model="formValidate" :label-width="120">
      <Row>
        <i-col span="12">
          <FormItem label="纳税人识别号:" prop="nsrsbh">
            <Input v-model="formValidate.nsrsbh" placeholder=""></Input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="纳税人名称:" prop="nsrmc">
            <Input v-model="formValidate.nsrmc" placeholder=""></Input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem prop="date" label="创建时间起止：">
            <DatePicker
              type="date"
              placeholder="Select date"
              v-model="formValidate.cjsj"
              @on-change="formValidate.cjsj=$event"
              format="yyyy-MM-dd"
            ></DatePicker>-
            <DatePicker
              type="date"
              placeholder="Select date"
              v-model="formValidate.cjsjz"
              @on-change="formValidate.cjsjz=$event"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="5">
          <FormItem label="状态" prop="ztbz">
            <Select v-model="formValidate.ztbz" placeholder="Select your city">
              <Option value="0">未处理</Option>
              <Option value="2">处理失败</Option>
              <Option value="1">处理成功</Option>
              <Option value="3" selected>全部</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="7">
          <FormItem>
            <Button :loading="isShowLoading" type="primary" @click="handleSubmit('formValidate')">查询</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <i-table border :columns="columnsFiled" :data="dateItems"></i-table>
    <Page :total="totalcount" show-total @on-change="changePage"></Page>
  </Root>
</template>

<script>
import { request } from "../../network/index";
import api from "../../network/api";
import Root from "../../components/common/Root";
export default {
  name: "Tddeclarepay",
  data() {
    return {
      totalcount: 0,
      columnsFiled: [
        { title: "纳税人识别号", key: "nsrsbh"},
        { title: "纳税人名称", key: "nsrmc" },
        { title: "创建时间", key: "cjsj" },
        { title: "最后更新时间", key: "zhgxsj" },
        { title: "状态", width: "50px", key: "ztbz" },
        { title: "返回信息", key: "fhxx", ellipsis: true },
        { title: "操作", slot: "action", width: 78, align: "center" }
      ],
      isShowLoading: false,
      pageNum: 1,
      dateItems: [],
      formValidate: {
        nsrsbh: "",
        nsrmc: "",
        ztbz: "3",
        cjsj: "",
        cjsjz: ""
      }
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    show(index){
     this.$Modal.info({
        fullscreen: true,
        title: "详情信息",
        content: `纳税人识别号：${this.dateItems[index].nsrsbh}<br>纳税人名称：${this.dateItems[index].nsrmc}<br>返回信息：${this.dateItems[index].fhxx}`
      });
    },
    changePage(currentPage) {
      this.pageNum = currentPage;
      this.handleSubmit("formValidate");
    },
    handleSubmit(name) {
      let params = {};
      console.log(this.formValidate);
      params = this.formValidate;
      this.isShowLoading = true;
      request({
        url: api.tddeclarepay.replace("PAGENUM", this.pageNum),
        method: "POST",
        data: params
      })
        .then(res => {
          this.isShowLoading = false;
          this.dateItems = res.data.pageInfo.list;
          console.log(res.data.pageInfo.total);
          this.totalcount = res.data.pageInfo.total;
          if (this.totalcount === 0) {
            this.$Message.warning("查询无数据！");
          }
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.error("您的网络连接异常，请稍候再试！");
        });
      this.isShowLoading = false;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
</style>
