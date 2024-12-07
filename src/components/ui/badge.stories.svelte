<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import Badge from './badge.svelte';
    import type { Meta } from '@storybook/svelte';

  export const meta = {
    title: "UI/Badge",
    component: Badge,
    tags: ['autodocs'],
    args: {
      variant: 'primary',
      slot: '50',
    },
    argTypes: {
      variant: {
        control: {
          type: 'select'
        },
        options: ['primary', 'secondary']
      }
    }
  } satisfies Meta<Badge>;
</script>


<Template let:args>
  <Badge {...args}>
    {args.slot ?? 48}
  </Badge>
</Template>

<Story name="Default" />
