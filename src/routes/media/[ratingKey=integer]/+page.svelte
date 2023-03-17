<script>
  import { page } from '$app/stores';
  import MediaInfo from '$components/media-info.svelte';
  import SeasonsSection from '$components/seasons-section.svelte';
  import CarouselSection from '$components/carousel-section.svelte';
  import CastCard from '$components/ui/cast-card.svelte';
  import MediaCard from '$components/ui/media-card.svelte';
  import ReviewCard from '$components/ui/review-card.svelte';
  import { getInternalUrl, getRatingIcon } from '$lib/data';
  import { truncate } from '$lib/utils/string';

  $: media = $page.data.media;
</script>

<svelte:head>
  {#if media}
    <title>{media.title} • Plexlv</title>
    <meta name="description" content={truncate(media.summary, 170)} />

    <meta name="og:url" content={$page.url.toString()} />
    <meta name="og:title" content={media.title} />
    <meta name="og:description" content={media.summary} />
    <meta name="og:image" content={$page.data.art} />
  {/if}
</svelte:head>

{#if media}
  <aside>
    <a href={getInternalUrl('library', { key: media.librarySectionID })}>
      {media.librarySectionTitle}
    </a>
  </aside>

  <article>
    <MediaInfo {media} />

    {#if 'Children' in media && !!media.Children?.MediaEntity}
      <SeasonsSection children={media.Children} />
    {/if}

    {#if 'Role' in media && !!media.Role?.length}
      <CarouselSection title="Elenco">
        {#each media.Role as role (role.id)}
          <CastCard
            title={role.tag}
            subtitle={role.role}
            image={role.thumb
              ? {
                  src: role.thumb,
                  alt: role.tag
                }
              : undefined}
          />
        {/each}
      </CarouselSection>
    {/if}

    {#if 'Review' in media && !!media.Review?.length}
      <CarouselSection title="Análises">
        {#each media.Review as review (review.id)}
          <ReviewCard
            title={review.source}
            subtitle={review.tag}
            text={review.text}
            href={review.link}
            icon={review.image ? getRatingIcon(review.image) : undefined}
          />
        {/each}
      </CarouselSection>
    {/if}

    {#await $page.data.lazy?.related then related}
      {#if related && 'Hub' in related && related.Hub}
        {#each related.Hub as hub (hub.hubKey)}
          {#if 'MediaEntity' in hub && hub.MediaEntity}
            <CarouselSection title={hub.title}>
              {#each hub.MediaEntity as media (media.ratingKey)}
                <MediaCard
                  title={media.title}
                  subtitle={media.year?.toString() || ''}
                  href={getInternalUrl('media', { key: media.ratingKey })}
                  image={media.thumb
                    ? {
                        src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
                        alt: ''
                      }
                    : undefined}
                />
              {/each}
            </CarouselSection>
          {/if}
        {/each}
      {/if}
    {/await}
  </article>
{/if}

<style lang="postcss">
  aside {
    & a {
      display: block;
      color: hsla(0, 0%, 100%, 0.75);
      font-size: 1rem;
      line-height: 1.5rem;
      transition: color 0.2s;
      padding-block: 14px;

      @media --hover {
        &:hover {
          color: white;
        }
      }
    }
  }
</style>
