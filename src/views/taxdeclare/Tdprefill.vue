<template>
  <div class="Tdprefill">
    <Form ref="formValidate" :model="formValidate":label-width="120">
      <Row>
        <i-col span="12">
          <FormItem label="纳税人识别号:" prop="nsrsbh">
            <Input v-model="formValidate.nsrsbh" placeholder="Enter your name"></Input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="纳税人名称:" prop="nsrmc">
            <Input v-model="formValidate.nsrmc" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem prop="date" label="创建时间起止：">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.cjsj"></DatePicker>-
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.cjsjz"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="5">
          <FormItem label="状态" prop="ztbz">
            <Select v-model="formValidate.ztbz" placeholder="Select your city">
                  <Option value="0">未处理</Option>
                  <Option value="2">处理失败</Option>
                  <Option value="1">处理成功</Option>
                  <Option value="3" Selected>全部</Option>
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

    <h1>预填写</h1>
  </div>
</template>

<script>
import { request } from "../../network/index";
export default {
  name: "Tdprefill",
  data() {
    return {
      isShowLoading:false,
      pageNum:1,
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
    handleSubmit(name) {
        let params = {
        nsrsbh: "",
        nsrmc: "",
        name: "",
        sfzzhm: "",
        cjsj: "2020-03-01",
        cjsjz: "2020-03-04",
        ztbz:"3"
      };
      console.log(this.formValidate.ztbz);
      console.log(this.formValidate.cjsj);
      console.log(this.formValidate.cjsjz);
      console.log(params)
      this.isShowLoading = true
      request({
        url: "/ytxTaskData?pageNum="+this.pageNum,
        method: "POST",
        data: params,
      })
        .then(res => {
          this.isShowLoading = false;
          console.log(res);
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.warning("您的网络连接异常，请稍候再试！");
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
