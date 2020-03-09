<template>
 <Root>
    <Form ref="formValidate" :model="formValidate" :label-width="120">
      <Row>
        <i-col span="6">
          <FormItem label="标题:" prop="shhtitle">
            <Input v-model="formValidate.shhtitle" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="6">
          <FormItem label="公司名称:" prop="gsmc">
            <Input v-model="formValidate.gsmc" placeholder></Input>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="推荐机构:" prop="tjjghy">
            <Input v-model="formValidate.tjjghy" placeholder></Input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem prop="date" label="时间起止：">
            <DatePicker
              class="creatDate"
              type="date"
              placeholder
              v-model="formValidate.shhsj"
              @on-change="formValidate.shhsj=$event"
              format="yyyy-MM-dd"
            ></DatePicker>-
            <DatePicker
              class="creatDate"
              type="date"
              placeholder
              v-model="formValidate.shhsjz"
              @on-change="formValidate.shhsjz=$event"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="12">
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
  name: 'Shareshh',
  data(){
    return {
          totalcount: 0,
      columnsFiled: [
        { title: "标题", key: "shhtitle" },
        { title: "时间", key: "shhsj" },
        { title: "公司名称", key: "gsmc" },
        { title: "推荐机构行业", key: "tjjghy" },
      ],
      isShowLoading: false,
      pageNum: 1,
      dateItems: [],
      formValidate: {
        shhtitle: "",
        shhsj: "",
        gsmc: "",
        tjjghy: "",
      }
    }
  },
  components: {
      Root
  },
  created(){},
  mounted(){},
  methods: {
         changePage(currentPage) {
      this.pageNum = currentPage;
      this.handleSubmit();
    },
      handleSubmit(){
      let params = {};
      params = this.formValidate;
      this.isShowLoading = true;
      request({
        url: api.sinfoshhQuery.replace("PAGENUM", this.pageNum),
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
      handleReset(){
        this.$refs[name].resetFields();
      }
  }
}
</script>
<style scoped>
</style>
