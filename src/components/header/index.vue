<template>
  <div class="header">
    <div class="main-container">
      <!-- <div class="date-current">{{ currentDate }}</div> -->
       <div class="version" @click="dialogVisible = true">{{ version }}</div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      width="800px"
      top="20px"
    >
      <VersionList />
    </el-dialog>
  </div>
</template>

<script setup>
// const lightImg = require("@/assets/images/logo.svg");
// const darkImg = require("@/assets/images/logo.svg");
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import VersionList from '@/components/version'



const store = useStore();
const currentDate = ref("");
const version = ref("v1.0.0");
const dialogVisible = ref(false);

const getWeek = () => {
  let week = new Date().getDay();
  let weekStr = "";
  switch (week) {
    case 0:
      weekStr = "星期日";
      break;
    case 1:
      weekStr = "星期一";
      break;
    case 2:
      weekStr = "星期二";
      break;
    case 3:
      weekStr = "星期三";
      break;
    case 4:
      weekStr = "星期四";
      break;
    case 5:
      weekStr = "星期五";
      break;
    case 6:
      weekStr = "星期六";
      break;
  }
  return weekStr;
};
const formatTime = () => {
  const date = new Date();
  const time = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    W: date.getDay(),
  };
  time.m = time.m < 10 ? "0" + time.m : time.m;
  time.d = time.d < 10 ? "0" + time.d : time.d;
  time.h = time.h < 10 ? "0" + time.h : time.h;
  time.minute = time.minute < 10 ? "0" + time.minute : time.minute;
  time.second = time.second < 10 ? "0" + time.second : time.second;

  return (
    time.y + "年" + time.m + "月" + time.d + "\xa0" + "\xa0" + "\xa0" + "\xa0"
  );
};

onMounted(() => {
  //日期格式2024年6月19日 星期三
  // currentDate.value = formatTime() + getWeek();
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  padding: 50px 0 0;

  .main-container {
    .logo {
      display: block;
      width: 240px;
      height: auto;
      margin: 0 auto;
    }
  }
}
.white {
  color: #ffffff90 !important;
}
.black {
  color: #000 !important;
}
.date-current {
  letter-spacing: 1px;
  position: fixed;
  top: 10px;
  font-size: 12px;

}
.version {
  position: absolute;
  right: 20px;
  font-size: 13px;
  cursor: pointer;
  top: 10px;
  color: #909399;
}
</style>
