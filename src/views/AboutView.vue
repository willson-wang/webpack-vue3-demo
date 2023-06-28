<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CompositionApi />
    <SetUpApi />
    <div>
      <CompositionTsApi />
    </div>
    <div>
    </div>
  </div>
</template>

<script >
import { Options, Vue } from "vue-class-component";
import CompositionApi from "@/components/compositionApi";
import CompositionTsApi from "@/components/compositionTsApi";
import SetUpApi from "@/components/setUpApi";


@Options({
  components: {
    CompositionApi,
    SetUpApi,
    CompositionTsApi,
  },
})
export default class AboutView extends Vue {}
</script>