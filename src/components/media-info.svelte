<script lang="ts">
  import Badge from '$components/ui/badge.svelte';
  import Icon from '$components/ui/icon.svelte';
  import { crossfade, truncate } from '$lib/actions';
  import { getAudienceRating, getContentRating, getInternalUrl } from '$lib/data';
  import { msToHourMinutes } from '$lib/utils/date';
  import type { MediaEntity } from '$lib/zod-schemas/plex-api';

  export let media: MediaEntity;

  // TODO: refactor the below code
  $: duration = media.type !== 'season' ? msToHourMinutes(media?.duration || 0) : [];
  $: durationString =
    (duration[0] === 1 && duration[1] >= 30) || duration[0] > 1
      ? `${duration[0]} h ${duration[1]} min`
      : `${duration[2]} min`;
</script>

<main>
  {#if media.thumb}
    <img
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
    {#if media.type !== 'season'}
      <h1>{media.title}</h1>
    {:else}
      <h1>{media.parentTitle}</h1>
    {/if}

    <div class="subtitle">
      {#if media.type !== 'season'}
        <span>{media.year}</span>
      {:else}
        <span>{media.title}</span>
      {/if}

      {#if media.type === 'movie'}
        <span>{durationString}</span>
      {/if}
    </div>

    <div class="rating">
      {#if 'contentRating' in media && media.contentRating}
        <Badge variant="secondary">
          {getContentRating(media.contentRating)}
        </Badge>
      {/if}

      {#if (media.type === 'movie' || media.type === 'show') && media.audienceRating && media.audienceRatingImage}
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
          expandTranslation: 'Sabe mais',
          collapseTranslation: 'Ler menos'
        }}
      >
        {media.summary}
      </p>
    </div>

    <div class="details">
      <div>
        {#if 'Director' in media && !!media.Director?.length}
          <h4>Realizado por</h4>
          <p>{media.Director.map((director) => director.tag).join(', ')}</p>
        {/if}
        {#if 'Writer' in media && !!media.Writer?.length}
          <h4>Escrito por</h4>
          <p>{media.Writer.map((writer) => writer.tag).join(', ')}</p>
        {/if}
        {#if 'studio' in media}
          <h4>Estúdio</h4>
          <p>{media.studio}</p>
        {/if}
        {#if 'Genre' in media && !!media.Genre?.length}
          <h4>Género</h4>
          <p>{media.Genre.map((genre) => genre.tag).join(', ')}</p>
        {/if}
      </div>
    </div>
  </div>
</main>

<style lang="postcss">
  main {
    display: flex;
    gap: 50px;

    padding-block: 40px;
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

  h1 {
    @mixin text-bold;
    @mixin text-nowrap;

    color: white;
    font-size: clamp(1.75rem, 0.667vw + 1.5rem, 2rem);
    line-height: clamp(2rem, 1.333vw + 1.499rem, 2.5rem);
  }

  .subtitle {
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

  .summary {
    max-width: 750px;
    margin-block: 40px;
    line-height: 1.7;

    & p {
      color: #fafafa;
      font-size: 15px;

      overflow: hidden;

      @media --motion {
        transition: max-height 0.2s ease-in-out;
      }
    }

    & :global(button) {
      @mixin text-bold;

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
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 32px;

    & > div {
      display: grid;
      grid-template-columns: minmax(110px, auto) 1fr;
      column-gap: 24px;
      color: #fafafa;

      font-size: 0.875rem;

      & h4 {
        color: #ffffff99;
      }
    }
  }
</style>
