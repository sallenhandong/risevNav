<template>
  <div class="tools-list">
    <div class="type-container" v-draggable="typeList" @end="saveOrder">
      <div
        :class="typeId == item.id ? 'type active' : 'type'"
        v-for="(item, index) in typeList"
        :key="item.id"
        @click="goType(item)"
        draggable="true"
        @dragstart="(event) => dragStart(event, index)"
        @dragover.prevent
        @drop="(event) => drop(event, index)"
      >
        <div class="type-icon">
          <div class="type-icon-item" :style="getMaskImageStyle(item)"></div>
        </div>
        {{ item.name }}
      </div>
    </div>
    <div class="tools-container">
      <div class="nav-bar" v-if="menuGroupList.length != 0">
        <el-scrollbar class="nav-box-scroll">
          <div class="nav-box">
            <div
              v-for="(item, index) in menuGroupList"
              :key="index"
              @click="changeGroup(item)"
              :class="
                miniGroupId == item.groupId
                  ? 'mini-group mini-group-acitive'
                  : 'mini-group'
              "
            >
              {{ item.name }}
            </div>
          </div>
        </el-scrollbar>
        <el-input
          class="input"
          v-model="keyword"
          placeholder="请输入关键字"
          @input="search"
          clearable
          :suffix-icon="Search"
        ></el-input>
      </div>
      <el-scrollbar height="100%" class="tool-items-box">
        <div v-if="typeId == 7" class="list-box">
          <div
            class="tool"
            draggable="true"
            @click="openAccountType(item)"
            v-for="(item, index) in accountTypeList"
            :key="index"
          >
            <el-image class="logo" :src="item.logo" fit="contain">
              <template #error>
                <div class="image-slot">
                  <el-icon>
                    <Picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
            <div class="info-box">
              <div class="name">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
            <div class="account-share" v-if="item.type">{{ item.type }}</div>
          </div>
        </div>
        <div class="list-box" v-if="typeId != 7">
          <div
            v-if="toolList.length == 0"
            style="
              width: 56vw;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 52vh;
            "
          >
            <div style="color: #909399">暂无数据</div>
          </div>
          <div
            class="tool"
            draggable="true"
            @dragstart="(event) => dragToolsStart(event, index)"
            @dragover.prevent
            @drop="(event) => dropTools(event, index)"
            @mouseenter="item.focusOn = true"
            @mouseleave="item.focusOn = false"
            @click="openUrl(item)"
            v-for="(item, index) in toolList"
            :key="index"
          >
            <el-image class="logo" :src="item.logo" fit="contain">
              <template #error>
                <div class="image-slot">
                  <el-icon>
                    <Picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
            <div class="info-box">
              <div class="name">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
            <div class="edit" v-show="item.focusOn || item.collected">
              <img
                @click.stop="clickCollected(item)"
                title="收藏"
                :src="getToolCollected(item.collected)"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!---account dialog--->
    <el-drawer
      v-model="accountDrawer"
      title="RiseV导航/Chatgpt共享"
      direction="ltr"
    >
      <div class="account-drawer-bg">
        <div style="color:chocolate;">自备魔法🎉</div>
        <div style="margin-top: 10px;display: flex;align-items: center;">官方地址：https://chat.openai.com/<el-icon style="cursor: pointer;margin-left: 10px;"  @click="copyLink('https://chat.openai.com/')"><CopyDocument /></el-icon></div>
        <p class="has-line-data" style="color:chocolate;">
          <strong>账号池使用指南</strong>
        </p>
        <ul>
          <li class="has-line-data" data-line-start="5" data-line-end="7">
            <p class="has-line-data" data-line-start="5" data-line-end="6">
              <strong>账号状态</strong
              >：账号均处于正常使用状态，到期账号将被移除。
            </p>
          </li>
          <li class="has-line-data" data-line-start="7" data-line-end="9">
            <p class="has-line-data" data-line-start="7" data-line-end="8">
              <strong>账号更换</strong
              >：除非账号使用次数达到限制，否则无需更换账号。
            </p>
          </li>
        </ul>
        <p class="has-line-data" style="color:chocolate;">
          <strong>共享账号对话信息提醒</strong>
        </p>
        <ul>
          <li class="has-line-data" data-line-start="11" data-line-end="13">
            <p class="has-line-data" data-line-start="11" data-line-end="12">
              <strong>到期处理</strong
              >：共享账号到期后，将更换密码并清除对话记录。
            </p>
          </li>
          <li class="has-line-data" data-line-start="13" data-line-end="14">
            <p class="has-line-data" data-line-start="13" data-line-end="14">
              <strong>数据备份</strong>：请及时备份重要数据，以防丢失。
            </p>
          </li>
        </ul>
      </div>
      <el-table :data="accountList" style="width: 100%">
        <el-table-column prop="dueTime" label="过期时间" align="center" />
        <el-table-column prop="remainder" label="剩余天数" align="center" />
        <el-table-column prop="accountStar" label="账号" align="center">
          <!----复制账号-->
          <template #default="scope">
            <div style="display: flex">
              <div>{{ scope.row.accountStar }}</div>
              <el-button link type="primary" size="small" @click="copyAccount(scope.row)">
                复制
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pwdStar" label="密码" align="center">
          <!----复制账号-->
          <template #default="scope">
            <div style="display: flex">
              <div>{{ scope.row.accountStar }}</div>
              <el-button link type="primary" size="small"  @click="copyPwd(scope.row)">
                复制
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const typeId = ref(0);
const keyword = ref("");
const menuGroupList = ref([]);
const miniGroupId = ref(null);
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import {
  RISEV_MENU_LIST,
  TOOLS_LIST,
  ACCOUNT_TYPE_LIST,
} from "@/assets/config.js";
const sourceToolList = TOOLS_LIST;
const accountTypeList = ACCOUNT_TYPE_LIST;
const toolList = ref([]);
const accountDrawer = ref(false);

const accountList = ref([]);
const typeList = ref(RISEV_MENU_LIST);

const copyLink = async (item) => {
  try {
    await navigator.clipboard.writeText(item);
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
  } catch (err) {
    // 复制操作可能失败，比如因为权限问题  
    console.error('无法复制文本: ', err);
  }

}

const copyAccount = async (item) => {
  try {
    await navigator.clipboard.writeText(item.account);
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
  } catch (err) {
    // 复制操作可能失败，比如因为权限问题  
    console.error('无法复制文本: ', err);
  }

}

const copyPwd = async (item) => {
  try {
    await navigator.clipboard.writeText(item.password);
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
  } catch (err) {
    // 复制操作可能失败，比如因为权限问题  
    console.error('无法复制文本: ', err);
  }

}

const openAccountType = (item) => {
  accountDrawer.value = true;
  const calculateDaysBetweenDates = (date1, date2) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const date1Ms = new Date(date1).getTime();
    const date2Ms = new Date(date2).getTime();
    const differenceInMs = Math.abs(date1Ms - date2Ms);
    return Math.ceil(differenceInMs / oneDay);
  };

  // 遍历item.accountList并更新每个账户的remainder
  item.accountList.forEach((account) => {
    // 假设dueTime字段是有效的日期字符串
    const dueDate = new Date(account.dueTime);
    const today = new Date(); // 当前日期

    // 计算剩余天数
    const remainder = calculateDaysBetweenDates(dueDate, today);

    // 如果到期日期在当前日期之后，remainder为正数；否则为负数或零
    account.remainder = remainder;
  });
  accountList.value = item.accountList;
};

const dragStart = (event, index) => {
  if (typeList && typeList.value) {
    localStorage.setItem("risev_open_menu_list", JSON.stringify(typeList.value));
  }

  event.dataTransfer.setData("index", index.toString()); // Set the data being dragged
};

const drop = (event, index) => {
  const draggedIndex = parseInt(event.dataTransfer.getData("index"));
  const draggedItem = typeList.value[draggedIndex];
  typeList.value.splice(draggedIndex, 1); // Remove dragged item from original position
  typeList.value.splice(index, 0, draggedItem); // Insert dragged item into new position
  saveOrder(); // Save the new order to localStorage
};

const saveOrder = () => {
  localStorage.setItem("risev_open_menu_list", JSON.stringify(typeList.value));
};

const goType = (item) => {
  typeId.value = item.id;
  menuGroupList.value = item.group;
  miniGroupId.value = null;
  if (item.group.length > 0) {
    toolList.value = sourceToolList.filter((item) =>
      item.menuId.includes(typeId.value)
    );
  } else {
    toolList.value = [];
  }

  //获取当前typeId的toolList
  if (localStorage.getItem("risev_open_tool_list_" + typeId.value)) {
    toolList.value = JSON.parse(
      localStorage.getItem("risev_open_tool_list_" + typeId.value)
    );
  }
  //如果数据有变化，保留排序的情况下，将新增的tool添加到toolList中，如果属性有变化，也需要以新的属性为准
  if (sourceToolList.length > toolList.value.length) {
    sourceToolList.forEach((item) => {
      if ((!toolList.value.find((i) => i.name == item.name)) && item.menuId.includes(typeId.value)) {
        toolList.value.push(item);
      }
    });
  }


  //遍历收藏列表，更新当前toolList的收藏状态
  if (localStorage.getItem("risev_open_tool_list_collected")) {
    let collectedList = JSON.parse(
      localStorage.getItem("risev_open_tool_list_collected")
    );
    toolList.value.forEach((item) => {
      item.collected = collectedList.find((i) => i.name == item.name)
        ? true
        : false;
    });
    if (typeId.value == 8) {
      toolList.value = localStorage.getItem("risev_open_tool_list_collected")
        ? collectedList
        : [];
    }
  } else {
    if (typeId.value == 8) {
      toolList.value = [];
    }
  }

  //存储当前typeId
  localStorage.setItem("risev_open_type_id", typeId.value);
};
const getMaskImageStyle = (item) => {
  return {
    maskImage: `url(${item.icon})`,
  };
};
const changeGroup = (item) => {
  miniGroupId.value = item.groupId;
  toolList.value = sourceToolList.filter(
    (item) =>
      item.menuId.includes(typeId.value) &&
      item.groupId.includes(miniGroupId.value)
  );
};

const getToolCollected = (collected) => {
  return collected
    ? require("@/assets/images/collected.svg")
    : require("@/assets/images/menus/shoucang.svg");
};

const dragToolsStart = (event, index) => {
  event.dataTransfer.setData("index", index.toString());
};

const dropTools = (event, index) => {
  const draggedIndex = parseInt(event.dataTransfer.getData("index"));
  const draggedItem = toolList.value[draggedIndex];
  toolList.value.splice(draggedIndex, 1);
  toolList.value.splice(index, 0, draggedItem);

  localStorage.setItem(
    "risev_open_tool_list_" + typeId.value,
    JSON.stringify(toolList.value)
  );
  if (typeId.value == 8) {
    localStorage.setItem(
      "risev_open_tool_list_collected",
      JSON.stringify(toolList.value)
    );
  }
};

const openUrl = (item) => {
  window.open(item.target, "__blank");
};

onMounted(() => {
  let storedOrder = RISEV_MENU_LIST;
  if (localStorage.getItem("risev_open_menu_list")) {
    storedOrder = JSON.parse(localStorage.getItem("risev_open__menu_list"));
  }
  typeList.value = storedOrder;
  //如果RISEV_MENU_LIST数据有变化，保留排序的情况下，将新增的type添加到typeList中，如果属性有变化，也需要以新的属性为准
  if (RISEV_MENU_LIST.length > storedOrder.length) {
    RISEV_MENU_LIST.forEach((item) => {
      if (!storedOrder.find((i) => i.id == item.id)) {
        typeList.value.push(item);
      }
    });
  }

  typeId.value = parseInt(localStorage.getItem("risev_open_type_id"));
  if (!typeId.value) {
    typeId.value = 1;
  }
  // 从localStorage中获取typeId
  if (localStorage.getItem("risev_open_tool_list_" + typeId.value)) {
    toolList.value = JSON.parse(
      localStorage.getItem("risev_open_tool_list_" + typeId.value)
    );
  } else {
    toolList.value = sourceToolList.filter((item) =>
      item.menuId.includes(typeId.value)
    );
  }

  let item = typeList.value.find((item) => item.id == typeId.value);
  goType(item);
});

//clickCollected 防止冒泡
const clickCollected = (item) => {
  //更新收藏状态，并加入到localStorage
  item.collected = !item.collected;
  localStorage.setItem(
    "risev_open_tool_list_" + typeId.value,
    JSON.stringify(toolList.value)
  );

  //如果选中了，则将选中的数据加入收藏列表，如果取消选中，则从收藏列表中删除
  if (item.collected) {
    let collectedList = [];
    if (localStorage.getItem("risev_open_tool_list_collected")) {
      collectedList = JSON.parse(
        localStorage.getItem("risev_open_tool_list_collected")
      );
    }
    collectedList.push(item);
    localStorage.setItem(
      "risev_open_tool_list_collected",
      JSON.stringify(collectedList)
    );
  } else {
    let collectedList = [];
    if (localStorage.getItem("risev_open_tool_list_collected")) {
      collectedList = JSON.parse(
        localStorage.getItem("risev_open_tool_list_collected")
      );
    }
    collectedList = collectedList.filter((i) => i.name != item.name);
    localStorage.setItem(
      "risev_open_tool_list_collected",
      JSON.stringify(collectedList)
    );
    //删除isev_tool_list_8  name为item.name的数据
    localStorage.setItem(
      "risev_open_tool_list_8",
      JSON.stringify(toolList.value.filter((i) => i.name != item.name))
    );
  }

  //根据收藏数组，更新toolList，只保留收藏的数据
  if (typeId.value == 8) {
    toolList.value = toolList.value.filter((item) => item.collected == true);
  }
};

const search = () => {
  if (keyword.value) {
    //节流数据处理
    if (window.timer) {
      clearTimeout(window.timer);
    }
    window.timer = setTimeout(() => {
      toolList.value = sourceToolList.filter(
        (item) =>
          item.jp.includes(keyword.value) ||
          item.desc.includes(keyword.value) ||
          item.name.includes(keyword.value)
      );
    }, 500);
  } else {
    if (miniGroupId.value) {
      toolList.value = sourceToolList.filter(
        (item) =>
          item.menuId.includes(typeId.value) &&
          item.groupId.includes(miniGroupId.value)
      );
    } else {
      toolList.value = sourceToolList.filter((item) =>
        item.menuId.includes(typeId.value)
      );
    }
  }
};
</script>

<style lang="less" scoped>
.tools-list {
  width: 100%;
  height: 100%;
  display: flex;
}

.type-container {
  display: flex;
  flex-direction: column;
  width: 198px;
  background-color: #fff;
  height: 100%;
  border-radius: 10px;
  margin: 0 20px 0 0;

  .type {
    font-size: 14px;
    color: var(--main-text-color) !important;
    background-color: #fff;
    padding: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    /* 确保伪元素是相对于这个元素定位的 */
    border-bottom: 1px solid #ededed;
    // background-image: linear-gradient(0deg, #fff, #f3f5f8);
    // box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1);
  }

  .type:first-child {
    border-radius: 10px 10px 0 0;
  }

  .type:hover {
    transition: 0.3s;
  }

  .active {
    transition: 0.3s;
    border-radius: 8px;
    // background-image: linear-gradient(0deg, #fff, #f3f5f8);
    // box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1);
    color: #fff !important;
    background-color: #817dff;
    font-weight: bold;

    .type-icon {
      background: rgba(255, 255, 255, 0.12);
    }

    .type-icon-item {
      fill: #fff;
      color: #fff;
      background-color: #fff;
    }
  }

  .active::after {
    content: "";
    /* 内容为空，但伪元素依然会生成 */
    position: absolute;
    /* 相对于 .type 定位 */
    top: 50%;
    /* 垂直居中 */
    right: -8px;
    /* 紧贴右边 */
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    /* 上边框透明 */
    border-bottom: 7px solid transparent;
    /* 下边框透明 */
    border-left: 8px solid #817dff;
    /* 左边框为你想要的三角颜色 */
    margin-top: -3.5px;
    /* 垂直居中微调 */
    /* 可以根据需要调整 border 的大小和颜色 */
  }

  .type-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(105, 101, 234, 0.08);
    border-radius: 8px;
    margin-right: 10px;
  }

  .type-icon-item {
    width: 18px;
    height: 18px;
    fill: #908dea;
    color: #908dea;
    background-color: #908dea;
    mask-size: 18px 18px;
  }
}

.tools-container {
  flex: 1;
  min-width: 0;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 8px 16px 1px #4b4b5908;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .nav-bar {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 20px 0;

    .nav-box-scroll {
      flex: 1;
      min-width: 0;
      height: auto;
      padding-bottom: 10px;
    }

    .nav-box {
      display: flex;
      align-items: center;

      .mini-group {
        background-color: rgb(240 240 240);
        font-size: 13px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-right: 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.3s;
        flex-shrink: 1;
        flex-basis: auto;
        white-space: nowrap;
      }

      .mini-group-acitive {
        background-color: rgb(240 239 253);
        color: #6965ea;
        font-weight: bold;
      }

      .mini-group:hover {
        background-color: rgb(240 239 253);
        color: #6965ea;
        font-weight: bold;
      }
    }

    .input {
      width: 200px;
      margin-left: 30px;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 810px) {
    .nav-bar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .nav-box-scroll {
        width: 100%;
        flex: unset;
      }
      .input {
        width: 100%;
        margin: 10px 0 0 0;
      }
    }
  }

  .tool-items-box {
    flex: 1 1 1px;
    padding: 20px;

    .list-box {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-auto-rows: 80px;
      grid-gap: 25px;
      height: 100%;

      .tool {
        display: flex;
        padding: 15px 15px 10px;
        border-radius: 6px;
        // box-shadow: var(--el-box-shadow-lighter);
        // background: var(--card-bg-color) !important;
        user-select: none;
        transition: 0.3s;
        background-image: linear-gradient(0deg, #fff, #f7f7f7);
        border: 1px solid #fff;
        box-shadow: 2px 2px 10px 0 rgba(55, 99, 170, 0.1);

        &:hover {
          cursor: pointer;
          box-shadow: var(--el-box-shadow) !important;
          transform: translateY(-3px);
        }

        .logo {
          width: 32px;
          height: 32px;
          margin-right: 12px;
          border-radius: 50%;

          .image-slot {
            width: 32px;
            height: 32px;
            font-size: 20px;
            color: var(--img-error-text-color) !important;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--img-bg-color) !important;
          }
        }

        .info-box {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;

          .collected {
            fill: red !important;
          }

          .name {
            font-size: 15px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--main-text-color) !important;
          }

          .desc {
            flex: 1 1 1px;
            font-size: 13px;
            margin-top: 5px;
            text-align: justify;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--sub-text-color) !important;
          }

          .etc-box {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .mark {
              font-size: 12px !important;
              background-color: var(--tag-bg-color) !important;
              padding: 3px 8px;
              border-radius: 3px;
              color: var(--tag-text-color) !important;
            }

            .views {
              font-size: 12px !important;
              display: flex;
              align-items: center;
              color: var(--tag-text-color) !important;

              .icon {
                margin-right: 3px;
              }
            }
          }
        }
      }
    }
  }
}

.tool {
  position: relative; /* Ensure position context for pseudo elements */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: grab;
}

.tool.dragging {
  transform: translateY(-10px); /* Adjust as needed for visual effect */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); /* Add shadow during drag */
}

.tool.drop-target {
  border: 2px dashed #aaa; /* Highlight drop target with dashed border */
  box-shadow: none; /* Remove box shadow when hovering over drop target */
}

.tool.drop-target:hover {
  background-color: #f0f0f0; /* Change background color when hovering over drop target */
}
.account-share {
  background-color: #fdf6ec;
  color: #e6a23c;
  padding: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.account-drawer-bg {
  padding: 20px;
  margin-top: -40px;
  color: var(--sub-text-color) !important;
  font-size: 13px;
}
</style>
