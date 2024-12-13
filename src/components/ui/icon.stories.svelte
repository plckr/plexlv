<script lang="ts" module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import { objectKeys } from '$lib/utils/object';
  import Icon, { icons } from './icon.svelte';

  const { Story } = defineMeta({
    title: 'UI/Icon',
    component: Icon,
    tags: ['autodocs'],
    args: { icon: 'home' },
    argTypes: {
      icon: {
        control: { type: 'select' },
        options: objectKeys(icons)
      }
    }
  });
</script>

<Story name="Default" />
