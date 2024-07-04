<template>
  <div class="index" :data-theme="$store.state.theme">
    <div class="header-risev">
      <Header />
      <SearchBar class="search-bar" />
    </div>
    <!---内部小组件---->
    <div class=".risev-mini-component" v-if="showRiseVComponent">
      <Bianqian />
    </div>
    <div class="main-container">
      <ToolsList class="tools-list" />
      <FastOpen @clickRiseVComponent="clickRiseVComponent" />
    </div>
  </div>
  <div
    class="more animate__animated animate__slideInRight"
    @click="dialogVisible = true"
    :style="{
      'background-color':
        $store.state.theme == 'light'
          ? 'white !important'
          : 'rgb(44, 46, 47) !important',
    }"
  >
    <img
      src="@/assets/images/gongchuang1.jpeg"
      style="width: 38px; height: 38px; border-radius: 50%"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    width="40%"
    top="5vh"
    title="RiseV共创计划1.0 —— 携手创新，共筑未来"
    modal-class="customer-dialog"
  >
    <el-scrollbar style="width: 100%; padding-right: 30px" height="75vh">
      <div style="line-height: 30px" class="gongchuang">
        <p class="has-line-data" data-line-start="4" data-line-end="5">
          感谢您花几分钟时间阅读
          <strong>RiseV共创计划1.0</strong
          >。我们深知，每一位用户都是我们宝贵的伙伴，您的每一条建议和需求都可能成为我们进步的阶梯。因此，我们诚挚地邀请您参与到<strong>RiseV共创计划1.0</strong>中来，与我们一起探索和创造更高效、更智能的办公工具。
        </p>
        <p class="has-line-data" data-line-start="6" data-line-end="7">
          <strong>共创计划宗旨：</strong>
        </p>
        <ul>
          <li class="has-line-data" data-line-start="9" data-line-end="10">
            <strong>免费共享</strong>:
            我们致力于打造免费纯净的创新工具，以满足您的个性化办公需求，让每个人都能享受到高效、便捷的工作体验。
          </li>
          <li class="has-line-data" data-line-start="10" data-line-end="12">
            <strong>共创共赢</strong
            >：我们相信，通过集思广益，可以创造出更符合用户需求的产品。
          </li>
        </ul>
        <p class="has-line-data" data-line-start="17" data-line-end="18">
          <strong>您将获得：</strong>
        </p>
        <ul>
          <li class="has-line-data" data-line-start="18" data-line-end="19">
            <strong>专属礼品</strong
            >：为感谢您的宝贵意见，我们将为积极参与共创计划的用户提供精美文创礼品。
          </li>
          <li class="has-line-data" data-line-start="19" data-line-end="20">
            <strong>优先体验</strong
            >：您将有机会第一时间体验我们新开发的工具和功能。
          </li>
          <li class="has-line-data" data-line-start="20" data-line-end="22">
            <strong>个性化服务</strong
            >：根据您的反馈，我们将提供更加个性化的服务和支持。
          </li>
        </ul>
        <p class="has-line-data" data-line-start="22" data-line-end="23">
          <strong>如何参与：</strong>
        </p>
        <p class="has-line-data" data-line-start="24" data-line-end="25">
          电脑访问：<a href="https://nav.risev.cn/">https://nav.risev.cn/</a>
        </p>
        <ol>
          <li class="has-line-data" data-line-start="25" data-line-end="26">
            <strong>提出需求</strong
            >：如果您在行业日常办公中遇到效率提升的需求，而现有工具无法满足，我们将根据您的具体需求定制开发新工具。例如：文件批量处理、一些繁琐的定时任务等等。一旦开发完成，这些工具将向所有用户开放，供大家免费使用，共同助力实现<strong>高效工作</strong>的目标。
          </li>
          <li class="has-line-data" data-line-start="26" data-line-end="27">
            <strong>使用反馈</strong
            >：如果您在使用过程中有任何建议或遇到问题，欢迎随时通过我们的反馈给我们。您的每条反馈都是我们改进服务、优化产品的重要参考，帮助我们不断进步，以提供更优质的用户体验。
          </li>
        </ol>
        <p class="has-line-data" data-line-start="29" data-line-end="30">
          我们相信，您的支持将使RiseV共创计划1.0成为一个充满生机和创新的社区。让我们携手共创，共同探索和实现更加便捷、高效的工作解决方案。
        </p>
        <h3 class="code-line" data-line-start="31" data-line-end="32">
          <a id="_31"></a><strong>用户反馈与联系指南</strong>
        </h3>
        <p class="has-line-data" data-line-start="33" data-line-end="34">
          为了确保我们能够及时与您取得联系，并在您提供宝贵意见后，方便地为您发放礼品，我们提供了以下联系方式：
        </p>
        <ul>
          <li class="has-line-data" data-line-start="35" data-line-end="36">
            <strong>官方网站</strong>：<a href="https://nav.risev.cn/"
              >https://nav.risev.cn/</a
            > —— 访问我们的网站，了解产品信息。
          </li>
          <li class="has-line-data" data-line-start="36" data-line-end="37">
            <strong>电子邮箱</strong>：<a
              ><span style="color: blue">info@risev.cn</span></a
            > —— 发送邮件至我们的官方邮箱，我们将有专人负责回复您的咨询和需求。
          </li>
          <li class="has-line-data" data-line-start="37" data-line-end="39">
            <strong>微信公众号</strong>：RiseV——
            关注我们的微信公众号，获取最新动态和专属福利。
          </li>
        </ul>
        <p class="has-line-data" data-line-start="39" data-line-end="40">
          <strong>重要提示：</strong>
        </p>
        <ul>
          <li class="has-line-data" data-line-start="41" data-line-end="42">
            请在联系我们时，提供您的联系方式和需求详情，以便我们更好地理解您的需求并及时响应。
          </li>
          <li class="has-line-data" data-line-start="42" data-line-end="43">
            获奖用户将通过以上渠道收到通知，请保持通讯畅通，以免错过礼品发放。
          </li>
        </ul>
        <p class="has-line-data" data-line-start="45" data-line-end="46">
          <strong>RiseV共创计划1.0</strong>，期待您的参与！
        </p>
      </div>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import ToolsList from "@/components/tools-list";
import FastOpen from "@/components/fast-open";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
//便签组件
import {
  StickyNote,
  store as noteStore,
} from "@/components/fast-open/note/note.js";
import $ from "jquery";
const dialogVisible = ref(false);
const store = useStore();
const stickyNoteInstance = ref(null);

//小组件逻辑
const clickRiseVComponent = () => {
  //控制class risev-mini-component 隐藏与显示
  if (
    !stickyNoteInstance.value ||
    document.querySelector(".risev-mini-component") == null
  ) {
    stickyNoteInstance.value = noteStore.setup().note;
    //本地存储组件显示状态
    localStorage.setItem("showRiseVComponent", true);
  } else {
    destroyStickyNote();
    //本地存储组件显示状态
    localStorage.setItem("showRiseVComponent", false);
  }
};

const destroyStickyNote = () => {
  if (stickyNoteInstance.value) {
    stickyNoteInstance.value.close();
    stickyNoteInstance.value = null;
  }
};

onMounted(() => {
  console.log(localStorage.getItem("showRiseVComponent"));
  if (localStorage.getItem("showRiseVComponent") == "true") {
    stickyNoteInstance.value = noteStore.setup().note;
  } else {
    destroyStickyNote();
  }
});
</script>

<style lang="less" scoped>
.index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: var(--body-img) !important;
  background-size: cover;
  background-color: #f5f7ff !important;
  color: var(--text-color) !important;
  display: flex;
  flex-direction: column;

  .main-container {
    flex: 1 1 1px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .search-bar {
      margin-top: 30px;
    }

    .tools-list {
      margin-top: 40px;
      flex: 1 1 1px;
    }
  }
}

.toggle-theme {
  position: fixed;
  right: 30px;
  top: 50px;
  width: 42px;
  height: 42px;
  border-radius: 50px;
  box-shadow: var(--el-box-shadow-lighter) !important;
  cursor: pointer;

  .icon {
    width: 100%;
    height: 100%;
    color: #333;
  }
}

.feedback {
  position: fixed;
  right: 30px;
  bottom: 75px;
  width: 42px;
  height: 42px;
  border-radius: 50px;
  box-shadow: var(--el-box-shadow-light) !important;
  cursor: pointer;

  .icon {
    width: 100%;
    height: 100%;
    color: #333;
    font-size: 20px;
  }
}

.more {
  position: fixed;
  right: 30px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  box-shadow: var(--el-box-shadow-light) !important;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.send-box {
  width: 100%;
  padding: 10px 8px;

  .title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
    color: black !important;
    user-select: none;
  }

  .tip {
    color: #333 !important;
  }

  .textarea {
    margin-top: 14px;
    width: 100%;
    height: 260px;
    border: none;
    outline: none;
    resize: none;
    border: 1px solid rgb(220, 223, 230);
    padding: 12px;
    line-height: 1.4;
    border-radius: 8px;

    &::placeholder {
      color: #c5c5c5;
    }
  }
}

.header-risev {
  // background-color: #fff;
  padding-bottom: 14px;
  // box-shadow: 0px 10px 10px rgb(238 242 245 / 80%);
}

.gongchuang {
  width: 100%;
  height: auto;
  overflow-y: auto;
}
</style>
<style lang="less">
.el-dialog {
  border-radius: 10px;
  color: var(--text-color) !important;
}

.el-dialog__body {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
