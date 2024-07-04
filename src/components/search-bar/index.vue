<template>
  <div class="search-bar" :data-theme="$store.state.theme">
    <div style="display: flex; align-items: center; justify-content: center">
      <img src="@/assets/images/risev1.png" style="width: 400px" />
    </div>
    <div class="main-container">
      <div :class="isInputActive ? 'input-box input-box-active' : 'input-box'">
        <div class="search-left">
          <el-select v-model="searchTypeIndex" placeholder="请选择搜索引擎" style="width: 80px">
            <el-option v-for="(item, index) in searchType" :key="item.label" :label="item.label"
              :value="index"></el-option>
          </el-select>
        </div>
        <input class="input" @focus="handleFocus" @blur="handleBlur" v-model="keyword" type="text"
          :placeholder="searchType[searchTypeIndex]['placeholder']" @keydown.enter="search" @input="handleChange" />
        <div class="send-item">
          <el-icon class="icon" @click="search">
            <Promotion />
          </el-icon>
        </div>
        <div v-show="isInputActive"
          :class="isInputActive ? 'search-like-content search-like-content-active' : 'search-like-content'">
          <el-scrollbar max-height="400px">
            <div class="item" v-for="item in suggestions" :key="item">
              {{ item }}
            </div>
          </el-scrollbar>
        </div>
      </div>
      <!-- <div class="search-type">
                <div class="type" :class="{ active: searchTypeIndex == index }" @click="changeSearchType(index)"
                    v-for="(item, index) in searchType" :key="item.label">
                    {{ item.label }}
                </div>
            </div> -->
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import $ from "jquery";
// 定义一个全局的 JSONP 回调函数（确保它只在您的应用范围内可见）
window.handleBaiduSuggestion = (data) => {
  // 这里处理来自 Baidu 的响应数据
  // 注意：这个函数将在全局作用域中被调用，而不是在 Vue 组件的作用域中
  if (typeof data === "object" && data.s && data.s.length > 0) {
    console.log(data.s);
    suggestions.value = data.s;
  }
};

const store = useStore();
const isInputActive = ref(false);
const suggestions = ref([]);

const keyword = ref("");
const searchType = [
  {
    label: "Bing",
    placeholder: "微软Bing搜索",
    value: "https://cn.bing.com/search?q=",
  },
  {
    label: "百度",
    placeholder: "百度一下",
    value: "https://www.baidu.com/s?wd=",
  },
];
const searchTypeIndex = ref(0);

const changeSearchType = (index) => {
  searchTypeIndex.value = index;
};

const search = () => {
  if (keyword.value) {
    window.open(
      searchType[searchTypeIndex.value].value + keyword.value,
      "blank"
    );
  }
};
function handleFocus() {
  isInputActive.value = true;
}
function ShowDiv(strurls) {
  var urls = strurls["s"];
  console.log(urls);
}

function handleChange() {
  if (keyword.value) {
    //采用节流函数
    if (window.timer) {
      clearTimeout(window.timer);
    }
    window.timer = setTimeout(() => {
      var qsData = {
        wd: keyword.value,
        p: "3",
        cb: "handleBaiduSuggestion",
        t: new Date().getTime(),
      };

      $.ajax({
        url: "https://suggestion.baidu.com/su",
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data: qsData,
        timeout: 5000,
        success: function (json) {
          console.log(json);
        },
        error: function (xhr) { },
      });
    }, 300);
  } else {
    suggestions.value = [];

  }
}

// 处理 blur 事件
function handleBlur() {
  isInputActive.value = false;
}

onMounted(() => { });
</script>

<style lang="less" scoped>
.search-bar {
  width: 72vw;
  margin: 0 auto;

  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.input-box {
  position: relative;
  width: 60%;
  height: 46px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  border-radius: 23px;
  background-color: var(--input-bg-color) !important;
  color: #333 !important;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 6px 16px 1px #6468e729;
  border-radius: 10px;
  padding: 0 5px 0 0;

  .input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    // color: var(--input-color) !important;
    color: #333;
    // &::placeholder {
    //     color: var(--input-placeholder-color) !important;
    // }
  }

  .send-item {
    color: #fff;
    width: 32px;
    height: 32px;
    background: #6965ea;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    cursor: pointer;

    .icon {
      user-select: none;
      font-size: 18px !important;
      // color: var(--input-icon-color) !important;
    }
  }


  .search-like-content {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100.4%;
    height: 400px;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-lighter);
    z-index: 99999;

    .item {
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      color: var(--sub-text-color);

      &:hover {
        cursor: pointer;
        color: #409eff;
      }

      &:first-of-type {
        margin-top: 10px;
      }
    }
  }

  .search-like-content-active {
    border: 1px solid #6965ea;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: none;
  }
}

.search-type {
  width: 60%;
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding: 0 30px;

  .type {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 3px;
    color: var(--tag-text-color) !important;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: var(--tag-bg-color) !important;
      color: rgb(96, 98, 102) !important;
    }

    &.active {
      background-color: var(--tag-bg-color) !important;
      color: rgb(96, 98, 102) !important;
    }

    &+.type {
      margin-left: 20px;
    }
  }
}

.input-box-active {
  border: 1px solid #6965ea;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search-left {
  margin-right: 10px;
}
</style>
<style scoped>
.search-left>>>.el-select__wrapper {
  box-shadow: unset !important;
}

.search-left>>>.el-select__selected-item {
  color: #000 !important;
}

.search-left>>>.el-select__icon {
  color: #000 !important;
}
</style>
