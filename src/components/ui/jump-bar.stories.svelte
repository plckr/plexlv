<script lang="ts" module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import JumpBar from './jump-bar.svelte';

  const { Story } = defineMeta({
    title: 'UI/Jump Bar',
    component: JumpBar,
    tags: ['autodocs'],
    args: { order: 'asc' },
    argTypes: {
      order: {
        control: { type: 'select' },
        options: ['asc', 'desc'] as const
      }
    }
  });
</script>

<Story name="Ascendent" args={{ order: 'asc' }} />
<Story name="Descendent" args={{ order: 'desc' }} />
