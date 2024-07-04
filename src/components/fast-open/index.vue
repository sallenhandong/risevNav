<template>
  <div class="fast-open-container   animate__animated animate__zoomIn animate__faster">
    <div class="fast-open-container-content">
      <el-popover
        v-for="(item, index) in fastOpenList"
        :key="index"
        placement="top"
        trigger="hover"
        :content="item.name"
        effect="dark"
        popper-class="customPopper"
      >
        <template #reference>
          <a :href="item.url" class="fast-open-container-content-item" v-if="item.url">
            <img
              :src="item.icon"
              style="width: 30px; height: 30px; border-radius: 50%"
            />
          </a>
          <div v-else  @click="clickItem(item.url)" class="fast-open-container-content-item">
            <img
              :src="item.icon"
              style="width: 30px; height: 30px; border-radius: 50%"
            />
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastOpen",
  data() {
    return {
      fastOpenList: [
        {
          name: "钉钉",
          url: "dingtalk://",
          icon: require("@/assets/images/fastopen/dd.png"),
        },
        {
          name: "腾讯会议",
          url: "wemeet:",
          icon: require("@/assets/images/fastopen/txhy.png"),
        },
        {
          name: "小组件",
          url: "",
          icon: require("@/assets/images/fastopen/risev.jpeg"),
        },
        {
          name: "微信",
          url: "weixin:",
          icon: require("@/assets/images/fastopen/weixin.png"),
        },
        {
          name: "bilibili",
          url: "bilipc:",
          icon: require("@/assets/images/fastopen/blibli.png"),
        }
      ],
    };
  },
  methods: {
    clickItem(url) {
        if (url == ''){
            this.$emit("clickRiseVComponent");
        }
    },
  },
};
</script>

<style lang="less" scoped>
.fast-open-container {
  position: relative;
  padding: 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  &-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 2.5rem;
    margin-bottom: 10px;
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
}
.fast-open-container-content-item {
  text-decoration: unset;
  color: #161e2e;
  border: 1px solid transparent;
  border-radius: 50%;
  box-shadow: 4px 4px 8px 0px rgba(1, 1, 2, 0.13);
  cursor: pointer;
  display: flex;
  width: 31px;
  height: 31px;
  align-items: center;
  margin-right: 20px;
  user-select: none;
  transition: 0.3s;
}
.fast-open-container-content-item:hover {
  box-shadow: var(--el-box-shadow) !important;
  transform: translateY(-10px);
}

</style>
<style lang="less">
.el-popover.customPopper {
    min-width: 90px!important;
    width: 90px!important;
    text-align: center;
}
</style>
