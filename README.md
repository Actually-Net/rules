# 概述
  1. 本仓库提供基于 Clash / Mihomo/ Sing-box  体系的全局覆写配置，核心目标是统一代理组、细化业务分流，并补齐 DNS加密分流、TUN、嗅探等常用能力。
  2. 配置整体偏向日常主力使用，优先兼顾稳定性、分流清晰度和连接体验，而不是堆叠过多实验性逻辑。
  3. 规则主要覆盖如 AI、流媒体、游戏、Google、Microsoft、Apple、Telegram、广告过滤和常规直连等等场景。
  4. 后续计划取消部分如google的独立分流，只针对大分类、限定地区、以及特定的需要拆分服务的类型进行分类，如限定区域的动画疯独立于媒体分组外，微软部分必须代理的服务拆分国内外等以此类推。

# 配置说明
  1. 当前配置按 IPv4 主链路设计，TUN模式下需要在系统物理网卡中禁用 IPv6；仅在配置中拒绝 `ipv6` 入站而系统仍启用 IPv6 时，可能出现首开慢、解析慢或连接回退异常。
  2. 在 Clash Verge Rev 中，当前配置更适合配合 `gVisor` 使用，建议手动切换；`mixed` 栈可能出现无法联网或明显卡顿。
  3. `dev` 版本用于验证和细化分流逻辑，更新更快，但可能引入阶段性问题；`release` 版本更适合稳定长期使用。
  4. `js` 脚本版本主要用于将同一套配置思路注入订阅，不做独立功能扩展，通常以 `yaml` 版本为主。
  5. 配置预写了第三方zashboard面板的配置内容，如不需要可自行删除或注释，配置中的初始密钥在客户端中不一定生效，在客户端中手动修改即可

# 版本
  1. `release`：稳定优先，适合日常长期使用。
  2. `dev`：在 `release` 基础上不定期修改测试内容，不对可用性保证。
  3. 当前版本的`sing-box`的`json`配置在初试阶段，不对可用性保证。

# 链接

| 版本 | 种类 | cdn链接 | raw链接 |
| --- | --- | --- | --- |
| release | yaml | [GlobalCoverage.yaml](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.yaml) | [GlobalCoverage.yaml](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.yaml) |
| release | json | [GlobalCoverage.json](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.json) | [GlobalCoverage.json](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.json) |
| release | js | [GlobalCoverage.js](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.js) | [GlobalCoverage.js](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.js) |
| dev | yaml | [GlobalCoverage.yaml](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.yaml) | [GlobalCoverage.yaml](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.yaml) |
| dev | json | [GlobalCoverage.json](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.json) | [GlobalCoverage.json](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.json) |
| dev | js | [GlobalCoverage.js](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.js) | [GlobalCoverage.js](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.js) |
