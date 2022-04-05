<template>
  <div class="rdg-header__container">
    <div class="rdg-header__title">
      <Logo></Logo>
      <span class="text"> Ramdom Data Generator</span>
    </div>
    <div class="rdg-header__github">
      <Github @click="gotoGithub"></Github>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from '@/assets/Logo.svg';
import Github from '@/assets/github.svg';

const gotoGithub = () => {
  window.open('https:github.com');
};
</script>
<style lang="less" scoped>
.rdg-header__ {
  &container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    height: 64px;
    box-sizing: border-box;
  }
  &title {
    display: flex;
    align-items: center;
    margin-left: 16px;
    svg {
      margin-right: 16px;
      transform: scale(0.85);
    }
    .text {
      font-size: 24px;
    }
  }
  &github {
    height: 48px;
    width: 48px;
    svg {
      height: 100%;
      width: 100%;
      margin-right: 16px;
    }
  }
}
</style>
