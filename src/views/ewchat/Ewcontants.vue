<template>
  <Root>
    <Form ref="formValidate" :model="formValidate" :label-width="120">
      <Row>
            <i-col span="6">
          <FormItem label="电话:" prop="iphone">
            <Input v-model="formValidate.iphone" placeholder />
          </FormItem>
        </i-col>
        <i-col span="6">
          <FormItem label="企业名称:" prop="company">
            <Input v-model="formValidate.company" placeholder />
          </FormItem>
        </i-col>
        <i-col span="6">
          <FormItem label="联系人名称:" prop="contcatName">
            <Input v-model="formValidate.contcatName" placeholder />
          </FormItem>
        </i-col>
    
      </Row>
      <Row>
        <i-col span="11">
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

        <i-col span="8">
          <FormItem>
            <Button :loading="isShowLoading" type="primary" @click="handleSubmit()">查询</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <i-table border :columns="columnsFiled" :data="dateItems">
      <!-- <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
      </template>-->
    </i-table>
    <Page :total="totalcount" show-total @on-change="changePage"></Page>
  </Root>
</template>

<script>
import api from "../../network/api";
import { request } from "../../network/index";
import Root from "../../components/common/Root";
export default {
  name: "Ewcontants",
  data() {
    return {
      columnsFiled: [
        { title: "企业名称", key: "company" },
        { title: "联系人名称", key: "contcatName" },
        { title: "联系电话", key: "iphone" },
        { title: "创建时间", key: "cjsj" }
      ],
      isShowLoading: false,
      totalcount: 0,
      pageNum: 1,
      dateItems: [],
      formValidate: {
        company: "",
        contcatName: "",
        iphone: "",
        cjsj: "",
        cjsjz: ""
      }
    };
  },
  methods: {
    changePage(currentPage) {
      this.pageNum = currentPage;
      this.handleSubmit();
    },
    handleSubmit() {
      let params = {};
      params = this.formValidate;
      this.isShowLoading = true;
      request({
        url: api.ewcontantsdata.replace("PAGENUM", this.pageNum),
        method: "POST",
        data: params
      })
        .then(res => {
          console.log("request query data!");
          console.log(res.data);
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
  },
  components: { Root }
};
</script>

<style>
</style>