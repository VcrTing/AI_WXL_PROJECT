<template>
  <view class="ps-f h-100 w-100" v-if="!us.is_login">
    <view class="middie w-100 px-row">
      <view class="bg-con con">
        <view>
          <UiInput><input class="inp inp-app" v-model="form.username" placeholder="账号"/></UiInput>
          <UiInput><input class="inp inp-app" v-model="form.password" placeholder="密码"/></UiInput>
          <view class="pt"></view>
          <view class="py-row"><button class="btn btn-app btn-pri" @click="funn.submit">提交</button></view>
        </view>
      </view>
      <view class="py-x3"></view>
      <view class="py-x3"></view>
    </view>
    <CoTip :msg="errmsg" @close="errmsg = ''"/>
  </view>

</template>

<script setup lang="ts">
import { zodUserFormLogin, type Auth, type UserFormLogin } from '@/app/zod/zod_entity_user';
import CoTip from '@/components/tip/CoTip.vue';
import { userStore } from '@/memory/user/user-store';
import { serv_login } from '@/serv/auth/serv_auth';
import { promise } from '@/tool/util/future';
import { is_str } from '@/tool/util/typed';
import zod_tool from '@/tool/web/zod_tool';
import UiInput from '@/ui/form/UiInput.vue';
import { ref, reactive } from 'vue';
//
const uFormRef = ref();
const ioading = ref();
const errmsg = ref();
const form = reactive(<UserFormLogin>{ username: 'ID00500', password: 'ZT123zlt@' })
const us = userStore()
//
const funn = {
  submit: () => promise(ioading, () => {
    const vid = zodUserFormLogin.safeParse(form)
    errmsg.value = vid.success ? '' : zod_tool.forerr(vid.error)
    vid.success && funn.login()
  }),
  login: async () => {
    const src: Auth | string = await serv_login(form.username, form.password)
    if (is_str(src)) {
      errmsg.value = src
    }
    else {
      if (us.saveLoginData(src as Auth)) { }
    }
  }
}
</script>

<!--
          <u-form-item label="水果">
            <u-checkbox-group>
              <u-checkbox>
                你好
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          -->