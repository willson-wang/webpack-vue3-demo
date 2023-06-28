import { withModifiers, defineComponent, ref } from 'vue';

const App = defineComponent({
  setup() {
    const count = ref(0);

    const placeholderText: string = 'email';

    const inc = () => {
      count.value++;
    };

    return () => (
      <div onClick={withModifiers(inc, ['self'])}>{count.value} {placeholderText}</div>
    );
  },
});

export default App