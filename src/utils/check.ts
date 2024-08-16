/**
 * 和当前时间相比，是否已过期
 * @param time
 */
export const isExpires = (time: string) => {
  return Date.now() > new Date(time).getTime();
};
