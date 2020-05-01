<template>
  <section class="profile">
    <div class="inner">
      <div class="profile-container">
        <h2>Profile</h2>
        <div class="profile-list">
          <div
            v-for="(item, intemKey, itemIndex) in user"
            :key="itemIndex"
            class="profile-item"
          >
            <span class="item-key">{{ intemKey }} :</span>
            {{ item }}
          </div>
        </div>
        <Button
          class="modify-button"
          @click="modifyPopupOpen = true"
          text="Modify"
        />
      </div>
      <portal to="root-portal">
        <Modify v-if="modifyPopupOpen" @close="modifyPopupOpen = false" />
      </portal>
    </div>
  </section>
</template>

<script>
import Modify from "~/components/auth/modify";
import Button from "~/components/commons/Button";
export default {
  components: {
    Button,
    Modify
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modifyPopupOpen: false
    };
  }
};
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  padding: 24px;
  margin: 32px 0;

  .profile-item {
    margin-top: 12px;
    padding: 0 8px 8px;
    border-bottom: 2px solid white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item-key {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 8px;
    }
  }
  .modify-button {
    align-self: flex-end;
    margin-top: 16px;
  }
}
</style>
