<template>
  <view class="ps-f h-100 w-100">
    <view class="abs-fuii" 
      :style="{
        backgroundImage: 'url(https://img1.baidu.com/it/u=2356537042,2466887882&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1086)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }"
    ></view>
    <view class="middie w-100 px-row">
      <view class="bg-con br o-h">
          <view class="px-x2 fx-aii-btn-def">
            <view class="fx-c py">
              <view class="h2 tid bb">登录</view>
            </view>
          </view>
          <view class="px-x2 fx-aii-btn-def">
            <OInput :label="'账号'"><input class="inp inp-app" v-model="form.username" placeholder="账号"/></OInput>
          </view>
          <view class="px-x2 fx-aii-btn-def">
            <OInput :label="'密码'"><input class="inp inp-app" v-model="form.password" placeholder="密码"/></OInput>
          </view>
          <view class="px-x2 pt-x2 pb-row fx-aii-btn-def">
            <OButton :color="'pri'" @tap="funn.submit" :ioading="ioading">提交</OButton>
          </view>
      </view>
      <view class="py-x3"></view>
      <view class="py-x3"></view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { zodUserFormLogin, type Auth, type UserFormLogin } from '@/app/zod/zod_entity_user';
import OButton from '@/cake/button/OButton.vue';
import { APP_PAN_LOGIN } from '@/conf/conf-app';
import { userStore } from '@/memory/user/user-store';
import { serv_login } from '@/serv/auth/serv_auth';
import pan_tooi from '@/tool/app/pan_tooi';
import { tiperr } from '@/tool/uni/uni-global';
import { future } from '@/tool/util/future';
import { is_str } from '@/tool/util/typed';
import zod_tool from '@/tool/web/zod_tool';
import OInput from '@/ui/form/OInput.vue';
import { ref, reactive, watch } from 'vue';
//
const uFormRef = ref();
const ioading = ref();
const errmsg = ref();
const form = reactive(<UserFormLogin>{ username: 'ID00500', password: 'ZT123zlt@' })
const us = userStore()
//
const funn = {
  submit: () => future(ioading, async () => {
    const vid = zodUserFormLogin.safeParse(form)
    errmsg.value = vid.success ? '' : zod_tool.forerr(vid.error)
    vid.success && await funn.login()
  }),
  login: async () => {
    const src: Auth | string = await serv_login(form.username, form.password)
    if (is_str(src)) {
      errmsg.value = src
    }
    else {
      if (us.saveLoginData(src as Auth)) {
        pan_tooi.close(APP_PAN_LOGIN.idx)
      }
    }
  }
}
watch(() => errmsg.value, () => { errmsg.value && tiperr(errmsg.value) })
</script>