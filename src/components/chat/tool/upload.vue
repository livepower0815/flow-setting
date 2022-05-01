<template>
  <el-upload
    ref="upload"
    class="chat-upload"
    action
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadFileServer"
  >
    <template #trigger>
      <div v-if="type === 'image'" class="upload-tool-btn"><img
        :src="require('@/assets/chat/msg_tool_image.svg')"
        :title="$t('caht_tool_upload_image')"
      ></div>
      <div v-if="type === 'video'" class="upload-tool-btn"><img
        :src="require('@/assets/chat/msg_tool_video.svg')"
        :title="$t('caht_tool_upload_video')"
      ></div>
    </template>
  </el-upload>
</template>

<script>
import { uploadChatFile } from '@/api/chat'
import constructors from '@/utils/constructors'
export default {
  props: {
    type: {
      type: String,
      default: 'image' // image, video
    },
    siteId: {
      type: String,
      required: true,
      default: ''
    },
    chatKey: {
      type: String,
      required: true
    }
  },
  methods: {
    uploadFileServer(data) {
      const query = new FormData()
      query.append('file', data.file)
      const uploadType = this.type
      const uploadSite = this.siteId
      const uploadGroup = this.chatKey
      const fileData = constructors.generateUploadImage({
        name: new Date().getTime(),
        type: uploadType,
        progress: 0,
        file: data.file,
        value: '',
        localValue: URL.createObjectURL(data.file),
        isLoading: true
      })
      this.$store.commit('chat/SET_CHAT_UPLOAD_LIST', {
        site: uploadSite,
        group: uploadGroup,
        source: fileData
      })
      uploadChatFile(query, uploadGroup, {
        site: uploadSite,
        group: uploadGroup,
        source: fileData
      })
        .then(res => {
          this.$store.commit('chat/SET_CHAT_UPLOAD_LIST', {
            site: uploadSite,
            group: uploadGroup,
            source: {
              name: fileData.name,
              value: res.data.link,
              progress: 100,
              isLoading: false
            }
          })
        })
        .catch((err) => {
          if (err.message !== 'cancel_upload' && err.message !== undefined) {
            this.$store.commit('chat/SET_CHAT_UPLOAD_LIST', {
              site: uploadSite,
              group: uploadGroup,
              source: {
                name: fileData.name,
                value: '',
                progress: 100,
                isLoading: false
              }
            })
          }
        })
    },
    beforeAvatarUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isVideo = file.type === 'video/mp4'
      const uploadLimit = file.size / 1024 / 1024 <= 25

      if (this.type === 'image' && !isImage) {
        this.$message.error(this.$t('caht_tool_upload_image_limit'))
      } else if (this.type === 'video' && !isVideo) {
        this.$message.error(this.$t('caht_tool_upload_video_limit'))
      } else if (!uploadLimit) {
        this.$message.error(this.$t('file_size', { size: '25' }))
      }
      if (this.type === 'image') {
        return uploadLimit && isImage
      }
      if (this.type === 'video') {
        return uploadLimit && isVideo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-upload {
  .upload-tool-btn {
    cursor: pointer;
    margin: 0 6px;
    transition: transform .2s ease-in-out;
    user-select: none;
    border-radius: 50%;
    &:hover {
      transform: rotate(15deg);
    }
  }
}
</style>
