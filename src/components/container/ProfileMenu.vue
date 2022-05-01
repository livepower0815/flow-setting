<template>
  <el-dropdown class="profile-menu" trigger="click">
    <div class="avatar-wrapper">
      <span class="profile-menu__username" style="padding: 0;"><el-tag style="font-size: 14px;">{{ userInfo.nickname }}</el-tag></span>
      <!-- <svg-icon icon-class="user" class-name="user-avatar" fill="#fff" /> -->
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <span class="profile-menu__username"><el-tag style="font-size: 16px;">{{ userInfo.username }}</el-tag></span>
      <el-dropdown-item>
        <span style="display:block;" @click="openDialog('changePwd')">{{ $t('chage_password') }}</span>
      </el-dropdown-item>

      <!-- Log out 一律在最下方 -->
      <el-dropdown-item>
        <span style="display:block;" @click="logout">{{ $t('logout') }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dialog v-if="showDialogXXX" :title="dialogTitle" :visible.sync="showDialogXXX" center width="600px" :modal-append-to-body="false">
      <profile-change-pwd :type-id="editData.id" @close="closeDialog" />
    </el-dialog>
  </el-dropdown>
</template>

<script>
import ProfileChangePwd from '@/components/dialog/ProfileChangePwd.vue'

export default {
  components: {
    ProfileChangePwd
  },
  data() {
    return {
      showDialogXXX: false,
      dialogType: 'changePwd',
      editData: {}
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    dialogTitle() {
      switch (this.dialogType) {
        case 'changePwd':
          return this.$t('edit_password')
        default:
          return `${this.$t('confirm')} this.dialogType`
      }
    },
    ringAlert() {
      return this.$store.state.chat.alertAudio.ring
    }
  },
  methods: {
    async logout() {
      this.ringAlert.pause()
      this.ringAlert.currentTime = 0
      await this.$store.dispatch('user/resetToken')
      this.$store.commit('tagsView/DEL_ALL_VISITED_VIEWS')
      this.$router.push(`/login`)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    openDialog(type) {
      this.dialogType = type
      if (type === 'changePwd') {
        this.editData = {
          id: this.userInfo.id
        }
      }
      this.showDialogXXX = true
    },
    closeDialog(refresh) {
      this.showDialogXXX = false
      if (refresh) {
        // 有需要這邊做後端同步
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-menu {
  height: 100%;
  .avatar-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    .user-avatar {
      cursor: pointer;
      width: 30px;
      height: 30px;
      padding: 5px;
      border-radius: 50%;
      background-color: #fff;
      color: $navBarBg;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
      color: #fff;
    }
  }
  &__username {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    color: #333;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 4px;
    cursor: pointer;
  }
}
</style>
