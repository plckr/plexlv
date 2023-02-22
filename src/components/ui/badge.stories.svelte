<script lang="ts">
  // import type { Meta, StoryObj } from '@storybook/svelte';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Badge from './badge.svelte';

  // const meta = {
  //   title: 'UI/Badge',
  //   component: Badge,
  //   tags: ['autodocs'],
  //   args: {
  //     variant: 'primary'
  //   },
  //   argTypes: {
  //     variant: {
  //       control: {
  //         type: 'select',
  //         options: ['primary', 'secondary']
  //       }
  //     }
  //   }
  // } satisfies Meta<Badge>;

  // // export default meta;
  // type Story = StoryObj<typeof meta>;

  // export const Movie: Story = {
  //   args: {}
  // };
</script>

<Meta
  title="UI/Badge"
  component={Badge}
  tags={['autodocs']}
  args={{
    variant: 'primary',
    slot: '50'
  }}
  argTypes={{
    variant: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary']
    }
  }}
/>

<Template let:args>
  <Badge {...args}>
    {args.slot ?? 48}
  </Badge>
</Template>

<Story name="Default" />
