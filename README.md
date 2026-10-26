# 陈智贤 · 个人作品集

原生 HTML + CSS + JavaScript，零依赖，无需构建。

## 预览

```sh
python3 -m http.server 3000 --bind 0.0.0.0 --directory /workspace/hello-Ai-project
```

修改后刷新浏览器。网站包含鼠标跟随作品背景、7 组真实作品、分类筛选、项目图集、简历入口及移动端布局。

## 内容来源

图片与简历来自用户提供的 81 页压缩版作品集。assets/ 下为优化后的 WebP 页面、原始背景图片与单页简历 PDF。个人信息根据简历页整理；环境与空间设计、AI 辅助创作为作品体现的关注方向，不声明为正式研究课题。

GitHub 使用项目仓库所有者主页 https://github.com/Zhixian-Chen，可在 script.js 的 profile 中修改。联系邮箱来自作品集。项目标题、图集与说明位于 script.js，卡片和个人介绍位于 index.html。

## 验证

已用 Chromium + Playwright 验证鼠标跟随、分类筛选、真实作品图集、Escape 关闭弹窗、390px 手机布局无横向溢出；HTML/CSS/JS、图片和简历 HTTP 请求正常，无浏览器脚本错误。

## 发布到 GitHub Pages

已包含 `.github/workflows/pages.yml`。将网站提交到本仓库 main 分支，在 GitHub 仓库 Settings → Pages → Build and deployment 中选择 GitHub Actions，随后运行 Publish portfolio to GitHub Pages 工作流。工作流只发布 HTML/CSS/JS 和 assets，不发布开发文件。发布成功后的真实地址以工作流输出为准。

当前尚未发布：云环境访问 GitHub Pages API 返回 Forbidden，无法验证或启用 Pages。小红书教程链接亦返回网络策略 403，未据此编造教程步骤。

## Gallery edition

作品区改为按 01–07 逐行排列的大幅画廊，封面提取原作主视觉。点击进入铺满浏览器的深色阅览器，完整收录 PDF 第 7–79 页，项目及页码严格按原始顺序。支持左右方向键、Home/End、页码滑杆、下一项目、移动端滑动、Escape 退出以及可选浏览器全屏。大图采用 contain 展示，保留完整页面。
