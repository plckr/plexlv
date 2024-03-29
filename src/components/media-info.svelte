<script lang="ts">
  import Badge from '$components/ui/badge.svelte';
  import Icon from '$components/ui/icon.svelte';
  import { crossfade, truncate } from '$lib/actions';
  import {
    getAudienceRating,
    getContentRating,
    getFormattedDuration,
    getInternalUrl,
    getStreamTitles
  } from '$lib/data';
  import LL from '$i18n/i18n-svelte';
  import type { MediaEntity } from '$lib/zod-schemas/plex-api';
  import { formatDate } from '$lib/utils/date';

  export let media: MediaEntity;

  $: streams = getStreamTitles(media);
</script>

<main>
  {#if media.thumb}
    <img
      class:wide={media.type === 'episode'}
      class="poster"
      src="/empty.gif"
      alt=""
      use:crossfade={getInternalUrl('image', {
        type: 'thumb-lg',
        thumb: media.thumb
      })}
    />
  {/if}

  <div class="info">
    {#if media.type === 'movie' || media.type === 'show'}
      <h1>{media.title}</h1>
    {:else if media.type === 'season'}
      <h1>
        <a href={getInternalUrl('media', { key: media.parentRatingKey })} title={media.parentTitle}>
          {media.parentTitle}
        </a>
      </h1>
    {:else if media.type === 'episode'}
      <h1>
        <a
          href={getInternalUrl('media', { key: media.grandparentRatingKey })}
          title={media.grandparentTitle}
        >
          {media.grandparentTitle}
        </a>
      </h1>
    {/if}

    <div class="subtitle">
      {#if media.type === 'movie' || media.type === 'show'}
        <span>{media.year}</span>
      {:else if media.type === 'season'}
        <h2>{media.title}</h2>
      {:else if media.type === 'episode'}
        {@const title = $LL.seasonNo({ index: media.parentIndex })}
        <h2>
          <a href={getInternalUrl('media', { key: media.parentRatingKey })} {title}>
            {title}
          </a>
        </h2>
      {/if}

      {#if media.type === 'movie'}
        <span class="duration">{getFormattedDuration(media.duration)}</span>
      {/if}
    </div>

    {#if media.type === 'episode'}
      <div class="episode-title">
        {$LL.episodeNo({ index: media.index })} · {media.title}
      </div>
    {/if}

    <div class="rating">
      {#if media.type === 'episode'}
        <span class="duration">{getFormattedDuration(media.duration)}</span>
      {/if}

      {#if 'contentRating' in media && media.contentRating}
        <Badge variant="secondary">
          {getContentRating(media.contentRating)}
        </Badge>
      {/if}

      {#if (media.type === 'movie' || media.type === 'show' || media.type === 'episode') && media.audienceRating && media.audienceRatingImage}
        {@const audienceRating = getAudienceRating(media.audienceRating, media.audienceRatingImage)}
        {#if audienceRating}
          <Badge variant="secondary">
            <Icon icon={audienceRating.icon} height="16px" />
            {audienceRating.rating}
          </Badge>
        {/if}
      {/if}
    </div>

    <div class="summary">
      <p
        use:truncate={{
          lines: 3,
          expandTranslation: $LL.learnMore(),
          collapseTranslation: $LL.readLess()
        }}
      >
        {media.summary}
      </p>
    </div>

    <section class="details">
      <div>
        {#if 'Director' in media && !!media.Director?.length}
          <h4>{$LL.directedBy()}</h4>
          <p>{media.Director.map((director) => director.tag).join(', ')}</p>
        {/if}
        {#if 'Writer' in media && !!media.Writer?.length}
          <h4>{$LL.writtenBy()}</h4>
          <p>{media.Writer.map((writer) => writer.tag).join(', ')}</p>
        {/if}
        {#if 'studio' in media}
          <h4>{$LL.studio()}</h4>
          <p>{media.studio}</p>
        {/if}
        {#if 'Genre' in media && !!media.Genre?.length}
          <h4>{$LL.genre()}</h4>
          <p>{media.Genre.map((genre) => genre.tag).join(', ')}</p>
        {/if}
        {#if media.type === 'episode'}
          <h4>{$LL.released()}</h4>
          <p>{formatDate(new Date(media.originallyAvailableAt))}</p>
        {/if}
      </div>

      {#if streams}
        <div>
          {#if streams.video}
            <h4>{$LL.video()}</h4>
            <p>{streams.video}</p>
          {/if}

          {#if streams.audio}
            <h4>{$LL.audio()}</h4>
            <p>{streams.audio}</p>
          {/if}

          {#if streams.subtitle}
            <h4>{$LL.subtitles()}</h4>
            <p>{streams.subtitle}</p>
          {/if}
        </div>
      {/if}
    </section>
  </div>
</main>

<style lang="postcss">
  main {
    display: flex;
    gap: 50px;

    padding-block: 20px;

    @media --md {
      padding-block: 40px;
    }
  }

  .poster {
    display: none;

    position: relative;

    width: 250px;
    height: 375px;

    background-color: rgba(0, 0, 0, 0.45);
    border-radius: 4px;
    box-shadow: 0 0 4px rgb(0 0 0 / 30%);

    transition: opacity 0.2s;

    &.wide {
      width: 300px;
      height: 168px;
    }

    @media --lg {
      display: block;
    }
  }

  .info {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    gap: 0.5rem;

    overflow: hidden;
  }

  h1,
  h2 {
    @mixin text-bold;

    @media --md {
      @mixin text-nowrap;
    }

    @media --hover {
      & a:hover {
        text-decoration: underline;
      }
    }
  }

  h1 {
    color: white;
    font-size: clamp(1.75rem, 0.667vw + 1.5rem, 2rem);
    line-height: clamp(2rem, 1.333vw + 1.499rem, 2.5rem);
  }

  h2 {
    font-size: clamp(1.125rem, 0.501vw + 0.937rem, 1.313rem);
  }

  .episode-title {
    @mixin text-regular;

    font-size: 1rem;
    color: white;
  }

  .subtitle {
    @mixin text-semi;

    display: flex;
    gap: 0.5rem;

    color: white;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .rating {
    display: flex;
    gap: 0.5rem;
  }

  .duration {
    @mixin text-semi;

    font-size: 1rem;
    color: white;
  }

  .summary {
    max-width: 750px;
    margin-block: 20px;
    line-height: 1.7;

    @media --md {
      margin-block: 40px;
    }

    & p {
      @mixin text-semi;

      color: #fafafa;
      font-size: 15px;

      overflow: hidden;

      @media --motion {
        transition: max-height 0.2s ease-in-out;
      }
    }

    & :global(button) {
      @mixin text-bold;
      @mixin expand-chevron;

      color: hsla(0, 0%, 100%, 0.45);
      font-size: 13px;
      text-transform: uppercase;
      transition: color 0.2s;

      @media --hover {
        &:hover {
          color: white;
        }
      }
    }

    & :global(button[aria-expanded='true']) {
      @mixin collapse-chevron;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 32px;

    & > div {
      display: grid;
      grid-template-rows: 1fr 1fr;

      @media --md {
        grid-template-columns: minmax(110px, auto) 1fr;
        column-gap: 24px;
      }
      color: #fafafa;

      font-size: 0.875rem;

      & h4,
      & p {
        @mixin text-semi;

        line-height: 1.58;
      }

      & h4 {
        color: #ffffff99;

        &:not(:first-child) {
          margin-top: 12px;
          @media --md {
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
