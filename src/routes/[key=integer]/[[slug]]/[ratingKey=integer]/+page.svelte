<script>
  import { page } from '$app/stores';
  import Badge from '$components/ui/badge.svelte';
  import CarouselSection from '$components/ui/carousel-section.svelte';
  import CastCard from '$components/ui/cast-card.svelte';
  import Icon from '$components/ui/icon.svelte';
  import MediaCard from '$components/ui/media-card.svelte';
  import ReviewCard from '$components/ui/review-card.svelte';
  import { crossfade, truncate } from '$lib/actions';
  import { getRatingIcon } from '$lib/data';
  import { msToHourMinutes } from '$lib/utils/date';
  import { slugify } from '$lib/utils/string';

  $: video = $page.data.video;

  $: duration = msToHourMinutes(video?.duration || 0);
  $: durationString =
    (duration[0] === 1 && duration[1] >= 30) || duration[0] > 1
      ? `${duration[0]} h ${duration[1]} min`
      : `${duration[2]} min`;
</script>

<svelte:head>
  {#if video}
    <title>{video.title} • Plexlv</title>
    <meta name="description" content={video.summary} />

    <meta name="og:url" content={$page.url.toString()} />
    <meta name="og:title" content={video.title} />
    <meta name="og:description" content={video.summary} />
    <meta name="og:image" content={$page.data.art} />
  {/if}
</svelte:head>

{#if video}
  <aside>
    <a href="/{video.librarySectionID}/{slugify(video.librarySectionTitle)}">
      {video.librarySectionTitle}
    </a>
  </aside>

  <article>
    <main>
      <img
        class="poster"
        src="/empty.gif"
        alt=""
        use:crossfade={`/img/thumb-lg/${$page.params.ratingKey}.png`}
      />

      <div class="info">
        <h1>{video.title}</h1>

        <div class="subtitle">
          <span>{video.year}</span>
          <span>{durationString}</span>
        </div>

        <div class="rating">
          {#if !!video?.Rating?.length}
            {@const rating = video.Rating[0]}
            <span class="badge" />
            <Badge variant="secondary">
              <Icon icon="imdb" height="16px" />
              {rating.value}
            </Badge>
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
            {video.summary}
          </p>
        </div>

        <div class="details">
          <div>
            {#if !!video.Director?.length}
              <h4>Realizado por</h4>
              <p>{video.Director.map((director) => director.tag).join(', ')}</p>
            {/if}
            {#if !!video.Writer?.length}
              <h4>Escrito por</h4>
              <p>{video.Writer.map((writer) => writer.tag).join(', ')}</p>
            {/if}
            {#if video.studio}
              <h4>Estúdio</h4>
              <p>{video.studio}</p>
            {/if}
            {#if !!video.Genre?.length}
              <h4>Género</h4>
              <p>{video.Genre.map((genre) => genre.tag).join(', ')}</p>
            {/if}
          </div>
        </div>
      </div>
    </main>

    {#if !!video.Role?.length}
      <CarouselSection title="Elenco">
        {#each video.Role as role (role.id)}
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

    {#if !!video.Review?.length}
      <CarouselSection title="Análises">
        {#each video.Review as review (review.id)}
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

    {#each video?.Related?.Hub || [] as hub (hub.hubKey)}
      <CarouselSection title={hub.title}>
        {#each hub.Video || [] as media (media.ratingKey)}
          <MediaCard
            title={media.title}
            subtitle={media.year?.toString() || ''}
            href="{$page.url.pathname}/{media.ratingKey}"
            image={media.thumb
              ? {
                  src: media.thumb,
                  alt: ''
                }
              : undefined}
          />
        {/each}
      </CarouselSection>
    {/each}
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
    flex-direction: column;
    gap: 0.5rem;
    justify-content: stretch;
    align-items: stretch;
    flex-wrap: nowrap;
  }

  h1 {
    @mixin text-bold;

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

  .summary {
    max-width: 750px;
    margin-block: 40px;
    line-height: 1.7;

    & p {
      color: #fafafa;
      font-size: 15px;

      transition: max-height 0.2s ease-in-out;
      overflow: hidden;
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
