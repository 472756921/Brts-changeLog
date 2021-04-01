# BRTS-CHANGELOG 使用指南

## 如何下载

```
    npm i brts-changelog
```

## 建议配置前提

建议搭配 conventional-changelog; cz-conventional-changelog 规范食用（更香）

---

## 是什么

由于提交规范基于 conventional 生成的 高度自定义 changeLog 文件

---

## 为什么使用

不管是 conventional，还是 standard-version 在自定义 changeLog 上是比较繁琐的，所以提供这么一个工具可以自定义 changLog；

---

## changeLog 规范

依据 cz-conventional 提交规范（如果未使用请按规范使用提交信息 -m）

-   feat
-   fix
-   docs
-   style
-   refactor
-   perf
-   test
-   build
-   ci
-   revert
-   chore

CHANGELOG-BRTS.md 中将展示 ['fix','feat','style'] 三类信息

---

## 如何使用

安装后请在 package.json 配置项目信息

```
{
    repository:'',   // 项目仓库地址 （展示 commit 和 issues）
    issuesUrl:'',    // 项目 BUG 地址 （默认使用项目 issues 地址）
    version:''       // 项目版本信息（默认创建 1.0.0）
}
```
完成上述配置后，使用 shell 工具执行 brts-changelog init 可生成 CHANGELOG-BRTS.md

---

## 反馈建议
https://github.com/472756921/Brts-changeLog/issues