<script lang="ts" module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Badge from './badge.svelte';

  const { Story } = defineMeta({
    title: 'UI/Badge',
    component: Badge,
    tags: ['autodocs'],
    args: { variant: 'primary' },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary']
      }
    }
  });
</script>

<Story name="Default">
  {#snippet children(args)}
    <Badge {...args}>50</Badge>
  {/snippet}
</Story>
