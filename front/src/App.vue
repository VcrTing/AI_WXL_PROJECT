<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { fontawesome_install } from './app/plugins/font_awesome_icon';
onLaunch(() => {
    fontawesome_install()
})
</script>

<style lang="scss">
@import 'uview-pro/theme.scss';
@import "uview-pro/index.scss";
</style>