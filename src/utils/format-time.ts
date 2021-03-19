// NaN is the only value in javascript which is not equal to itself.
// eslint-disable-next-line no-self-compare
const isNaN = Number.isNaN || ((value) => value !== value)

/**
 * @file format-time.js
 *
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 *
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 * @function formatTime
 */
export function formatTime(seconds = 0, guide = seconds) {
  let s: any = Math.floor(seconds % 60)
  let m: any = Math.floor((seconds / 60) % 60)
  let h: any = Math.floor(seconds / 3600)
  const gm: any = Math.floor((guide / 60) % 60)
  const gh: any = Math.floor(guide / 3600)

  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    h = '-'
    m = '-'
    s = '-'
  }

  // Check if we need to show hours
  h = h > 0 || gh > 0 ? `${h}:` : ''

  // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.
  m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`

  // Check if leading zero is need for seconds
  s = s < 10 ? `0${s}` : s

  return h + m + s
}
