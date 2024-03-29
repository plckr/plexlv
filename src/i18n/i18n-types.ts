// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'de'
	| 'en'
	| 'pt'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * E​n​g​l​i​s​h
	 */
	language: string
	/**
	 * N​o​t​ ​f​o​u​n​d
	 */
	errorNotFoundTitle: string
	/**
	 * W​e​ ​c​a​n​'​t​ ​f​i​n​d​ ​t​h​e​ ​p​a​g​e​ ​y​o​u​'​r​e​ ​l​o​o​k​i​n​g​ ​f​o​r
	 */
	errorNotFoundMessage: string
	/**
	 * S​o​m​e​t​h​i​n​g​ ​w​e​n​t​ ​w​r​o​n​g
	 */
	errorDefaultTitle: string
	/**
	 * A​n​ ​u​n​e​x​p​e​c​t​e​d​ ​e​r​r​o​r​ ​o​c​c​u​r​r​e​d​.
	 */
	errorDefaultMessage: string
	/**
	 * H​o​m​e
	 */
	home: string
	/**
	 * G​o​ ​h​o​m​e
	 */
	goHome: string
	/**
	 * M​a​i​n​ ​m​e​n​u
	 */
	mainMenu: string
	/**
	 * E​x​p​a​n​d
	 */
	expand: string
	/**
	 * C​o​l​l​a​p​s​e
	 */
	collapse: string
	/**
	 * D​i​r​e​c​t​e​d​ ​b​y
	 */
	directedBy: string
	/**
	 * W​r​i​t​t​e​n​ ​b​y
	 */
	writtenBy: string
	/**
	 * S​t​u​d​i​o
	 */
	studio: string
	/**
	 * G​e​n​r​e
	 */
	genre: string
	/**
	 * C​a​s​t
	 */
	cast: string
	/**
	 * R​e​v​i​e​w​s
	 */
	reviews: string
	/**
	 * L​e​a​r​n​ ​m​o​r​e
	 */
	learnMore: string
	/**
	 * R​e​a​d​ ​l​e​s​s
	 */
	readLess: string
	/**
	 * {​n​o​O​f​S​e​a​s​o​n​s​}​ ​s​e​a​s​o​n​{​{​s​}​}
	 * @param {number} noOfSeasons
	 */
	noOfSeasons: RequiredParams<'noOfSeasons'>
	/**
	 * S​e​a​s​o​n​s
	 */
	seasons: string
	/**
	 * S​e​a​s​o​n​ ​{​i​n​d​e​x​}
	 * @param {number} index
	 */
	seasonNo: RequiredParams<'index'>
	/**
	 * {​n​o​O​f​E​p​i​s​o​d​e​s​}​ ​e​p​i​s​o​d​e​{​{​s​}​}
	 * @param {number} noOfEpisodes
	 */
	noOfEpisodes: RequiredParams<'noOfEpisodes'>
	/**
	 * E​p​i​s​o​d​e​ ​{​i​n​d​e​x​}
	 * @param {number} index
	 */
	episodeNo: RequiredParams<'index'>
	/**
	 * R​e​l​e​a​s​e​d
	 */
	released: string
	/**
	 * V​i​d​e​o
	 */
	video: string
	/**
	 * A​u​d​i​o
	 */
	audio: string
	/**
	 * S​u​b​t​i​t​l​e​s
	 */
	subtitles: string
	/**
	 * R​e​c​o​m​m​e​n​d​e​d
	 */
	recommended: string
	/**
	 * L​i​b​r​a​r​y
	 */
	library: string
	/**
	 * C​o​l​l​e​c​t​i​o​n​s
	 */
	collections: string
}

export type TranslationFunctions = {
	/**
	 * English
	 */
	language: () => LocalizedString
	/**
	 * Not found
	 */
	errorNotFoundTitle: () => LocalizedString
	/**
	 * We can't find the page you're looking for
	 */
	errorNotFoundMessage: () => LocalizedString
	/**
	 * Something went wrong
	 */
	errorDefaultTitle: () => LocalizedString
	/**
	 * An unexpected error occurred.
	 */
	errorDefaultMessage: () => LocalizedString
	/**
	 * Home
	 */
	home: () => LocalizedString
	/**
	 * Go home
	 */
	goHome: () => LocalizedString
	/**
	 * Main menu
	 */
	mainMenu: () => LocalizedString
	/**
	 * Expand
	 */
	expand: () => LocalizedString
	/**
	 * Collapse
	 */
	collapse: () => LocalizedString
	/**
	 * Directed by
	 */
	directedBy: () => LocalizedString
	/**
	 * Written by
	 */
	writtenBy: () => LocalizedString
	/**
	 * Studio
	 */
	studio: () => LocalizedString
	/**
	 * Genre
	 */
	genre: () => LocalizedString
	/**
	 * Cast
	 */
	cast: () => LocalizedString
	/**
	 * Reviews
	 */
	reviews: () => LocalizedString
	/**
	 * Learn more
	 */
	learnMore: () => LocalizedString
	/**
	 * Read less
	 */
	readLess: () => LocalizedString
	/**
	 * {noOfSeasons} season{{s}}
	 */
	noOfSeasons: (arg: { noOfSeasons: number }) => LocalizedString
	/**
	 * Seasons
	 */
	seasons: () => LocalizedString
	/**
	 * Season {index}
	 */
	seasonNo: (arg: { index: number }) => LocalizedString
	/**
	 * {noOfEpisodes} episode{{s}}
	 */
	noOfEpisodes: (arg: { noOfEpisodes: number }) => LocalizedString
	/**
	 * Episode {index}
	 */
	episodeNo: (arg: { index: number }) => LocalizedString
	/**
	 * Released
	 */
	released: () => LocalizedString
	/**
	 * Video
	 */
	video: () => LocalizedString
	/**
	 * Audio
	 */
	audio: () => LocalizedString
	/**
	 * Subtitles
	 */
	subtitles: () => LocalizedString
	/**
	 * Recommended
	 */
	recommended: () => LocalizedString
	/**
	 * Library
	 */
	library: () => LocalizedString
	/**
	 * Collections
	 */
	collections: () => LocalizedString
}

export type Formatters = {}
