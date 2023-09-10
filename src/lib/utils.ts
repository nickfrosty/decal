/**
 *
 */

/**
 *
 * todo: there is an edge case if the text.length of < `length`, then characters will be duplicated in the response
 */
export function shortText(
  text: string,
  length: number = 6,
  separator: string = "...",
) {
  return (
    text.substring(0, length) + separator + text.substring(text.length - length)
  );
}
