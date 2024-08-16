import wx from "weixin-js-sdk";
import DefaultLogo from "@/assets/logo.png";
import { commonErrorTip } from "./common";

interface shareMediaType {
  url: string;
  title?: string;
  cover?: string;
  desc?: string;
}
/**
 * 去除url中的www.
 * @param url
 * @returns
 */
export const urlNoWww = (url: string) => {
  return url.replace(/www\./, "");
};
/**
 * 微信分享卡片调用，可以提供封面 链接 标题 描述
 * @param param0
 */
export const WxShareCard = async ({
  cover,
  url,
  title,
  desc,
}: shareMediaType) => {
  const shareMedia = {
    title,
    desc,
    link: url,
    imgUrl: cover || DefaultLogo,
  };
  try {
    const res = await getSignUsingGET({ url });
    if (res.data) {
      const infoData = res.data || {};
      wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId: infoData.appId || "wx20bb1114a915b647", // 必填，公众号的唯一标识
        timestamp: parseInt((infoData?.timestamp as unknown as string) || ""), // 必填，生成签名的时间戳
        nonceStr: infoData?.nonceStr || "", // 必填，生成签名的随机串
        signature: infoData?.signature || "", // 必填，签名
        jsApiList: [
          "checkJsApi",
          "onMenuShareWeibo",
          "updateTimelineShareData",
          "updateAppMessageShareData",
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "onMenuShareQQ",
        ], // 必填，需要使用的 JS 接口列表
      });
      // 校验接口权限
      wx.checkJsApi({
        jsApiList: [
          "onMenuShareWeibo",
          "updateTimelineShareData",
          "updateAppMessageShareData",
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "onMenuShareQQ",
        ],
        success: function (response: any) {
          console.log("ok", JSON.stringify(response));
        },
        error: function (response: any) {
          console.log("error", response.errMsg);
        },
      });
      wx.ready(() => {
        wx.updateAppMessageShareData(shareMedia as any); // “分享给朋友”及“分享到QQ”
        wx.updateTimelineShareData(shareMedia as any); // “分享到朋友圈”及“分享到QQ空间”
        wx.onMenuShareWeibo(shareMedia as any); // 分享到腾讯微博
        wx.onMenuShareTimeline(shareMedia as any); // 旧版，分享到朋友圈
        wx.onMenuShareAppMessage(shareMedia as any); // 旧版，分享给朋友
        wx.onMenuShareQQ(shareMedia as any); // 旧版，分享给qq
      });
      //错误了会走 这里
      wx.error(function (response: any) {
        // alert(JSON.stringify(response));
        console.log("微信分享错误信息", response);
      });
    }
  } catch (e: any) {
    commonErrorTip("获取失败，", e);
  }
};
