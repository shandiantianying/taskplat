<template>
  <Root>
    <Form ref="formValidate" :model="formValidate" :label-width="120">
      <Row>
        <i-col span="6">
          <FormItem label="纳税人识别号:" prop="nsrsbh">
            <Input v-model="formValidate.nsrsbh" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="6">
          <FormItem label="纳税人名称:" prop="nsrmc">
            <Input v-model="formValidate.nsrmc" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="4">
          <FormItem label="实名账号:" prop="smzh">
            <Input v-model="formValidate.smzh" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="4">
          <FormItem label="sessionid:" prop="smbz">
            <Input v-model="formValidate.smbz" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="4">
          <FormItem label="返回信息:" prop="xyxx">
            <Input v-model="formValidate.xyxx" placeholder></Input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem prop="date" label="创建时间起止：">
            <DatePicker
              class="creatDate"
              type="date"
              placeholder
              v-model="formValidate.cjsj"
              @on-change="formValidate.cjsj=$event"
              format="yyyy-MM-dd"
            ></DatePicker>-
            <DatePicker
              class="creatDate"
              type="date"
              placeholder
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
        <i-col span="6">
          <FormItem>
            <Button :loading="isShowLoading" type="primary" @click="handleSubmit('formValidate')">查询</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </i-col>
      </Row>
    </Form>
<i-table border :columns="columnsFiled" :data="dateItems">
     <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        <!-- <Button type="error" size="small" @click="remove(index)">Delete</Button> -->
      </template>

    </i-table>
    <Page :total="totalcount" show-total @on-change="changePage"></Page>
  </Root> 
</template>

<script>
import api from "../../network/api";
import { request } from "../../network/index";
import Root from "../../components/common/Root";
export default {
  name: "Cphome",
  data() {
    return {
      totalcount: 0,
      columnsFiled: [
        { title: "实名账号", key: "smzh" },
        { title: "sessionid", key: "smbz" },
        { title: "纳税人识别号", key: "nsrsbh" },
        { title: "纳税人名称", key: "nsrmc" },
        { title: "创建时间", key: "cjsj" },
        { title: "最后更新时间", key: "zhgxsj" },
        { title: "状态", width: "50px", key: "ztbz" },
        { title: "年度", width: "90px", key: "cxnd" },
        { title: "返回信息", key: "xyxx", ellipsis: true },
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
        cjsjz: "",
        smzh: "",
        smbz: "",
        xyxx: ""
      }
    };
  },
  components: {Root},
  created() {},
  mounted() {},
  methods: {
    show(index) {
      this.$Modal.info({
        title: "详情信息",
        content: `纳税人识别号：${this.dateItems[index].nsrsbh}<br>纳税人名称：${this.dateItems[index].nsrmc}<br>返回信息：${this.dateItems[index].xyxx}`
      });
    },
      changePage(currentPage) {
      this.pageNum = currentPage;
      this.handleSubmit();
    },
      handleSubmit(){
      let params = {};
      params = this.formValidate;
      this.isShowLoading = true;
      request({
        url: api.cpdataQuery.replace("PAGENUM", this.pageNum),
        method: "POST",
        data: params
      })
        .then(res => {
          console.log("request query data!")
          console.log(res.data);
          this.isShowLoading = false;
          this.dateItems = res.data.list;
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
      handleReset(){
        this.$refs[name].resetFields();
      }
  }
};
</script>
<style scoped>
</style>
