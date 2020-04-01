<template>
  <Root>
    <Form ref="formValidate" :model="formValidate" :label-width="120">
      <Row>
        <i-col span="8">
          <FormItem label="标题:" prop="gpggtitle">
            <Input v-model="formValidate.gpggtitle" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="8">
          <FormItem label="代码:" prop="dm">
            <Input v-model="formValidate.dm" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="8">
          <FormItem label="简称:" prop="jc">
            <Input v-model="formValidate.jc" placeholder></Input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="8">
          <FormItem label="企业名称:" prop="qymc">
            <Input v-model="formValidate.qymc" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem prop="date" label="挂牌时间起止：">
            <DatePicker
              class="creatDate"
              type="date"
              placeholder
              v-model="formValidate.gpggsj"
              @on-change="formValidate.gpggsj=$event"
              format="yyyy-MM-dd"
            ></DatePicker>-
            <DatePicker
              class="creatDate"
              type="date"
              placeholder
              v-model="formValidate.gpggsjz"
              @on-change="formValidate.gpggsjz=$event"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="8">
          <FormItem label="板块" prop="bkmc">
            <Select v-model="formValidate.bkmc" placeholder>
              <Option value="标准板">标准板</Option>
              <Option value="培育板">培育板</Option>
              <Option value selected>全部</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col span="8">
          <FormItem label="层级" prop="cjmc">
            <Select v-model="formValidate.cjmc" placeholder>
              <Option value="成长层">成长层</Option>
              <Option value="基础层">基础层</Option>
              <Option value selected>全部</Option>
            </Select>
          </FormItem>
        </i-col>

        <i-col span="8">
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
  name: "Sharelist",
  data() {
    return {
      totalcount: 0,
      columnsFiled: [
        { title: "标题", key: "gpggtitle" },
        { title: "时间", key: "gpggsj" },
        { title: "板块名称", key: "bkmc" },
        { title: "层级名称", key: "cjmc" },
        { title: "代码", key: "dm" },
        { title: "简称", key: "jc" },
        { title: "企业名称", key: "qymc" }
      ],
      isShowLoading: false,
      pageNum: 1,
      dateItems: [],
      formValidate: {
        gpggtitle: "",
        gpggsj: "",
        bkmc: "",
        cjmc: "",
        dm: "",
        jc: "",
        qymc: ""
      }
    };
  },
  components: {
    Root
  },
  created() {},
  mounted() {},
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
        url: api.sinfoQuery.replace("PAGENUM", this.pageNum),
        method: "POST",
        data: params
      })
        .then(res => {
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
    handleReset() {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.creatDate {
  width: 130px;
}
</style>
