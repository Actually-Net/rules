# 概述
  1. 本仓库提供基于 Clash / Mihomo/ Sing-box  体系的全局覆写配置，核心目标是统一代理组、细化业务分流，并补齐 DNS加密分流、TUN、嗅探等常用能力；
  2. 配置整体偏向日常主力使用，优先兼顾稳定性、分流清晰度和连接体验，而不是堆叠过多实验性逻辑；
  3. 规则主要覆盖如 AI、流媒体、游戏、Google、Microsoft、Apple、Telegram、广告过滤和常规直连等等场景；
  4. 后续计划取消部分如google的独立分流，只针对大分类、限定地区、以及特定的需要拆分服务的类型进行分类，如限定区域的动画疯独立于媒体分组外，微软部分必须代理的服务拆分国内外等以此类推；

# 使用说明
  1. 当前配置按 IPv4 主链路设计，TUN模式下需要在系统物理网卡中禁用 IPv6；仅在配置中拒绝 `ipv6` 入站而系统仍启用 IPv6 时，可能出现首开慢、解析慢或连接回退异常；
  2. 在 Clash Verge Rev 中，当前配置更适合配合 `gVisor` 使用，建议手动切换；`mixed` 栈可能出现无法联网或明显卡顿；
  3. `release` 适合稳定长期使用，`dev` 不定期更新调整，不保证可用性；
  4. `js` 脚本版本主要用于将同一套配置思路注入订阅，不做独立功能扩展，通常以 `yaml` 版本为主；
  5. 配置预写了第三方zashboard面板的配置内容，如无需要可自行copy后删除或注释，配置中的初始密钥在部分客户端中不一定生效（主要是移动端），需在客户端中手动修改；

# 版本更新说明
### 第二个可用的版本迭代
**v0.0.1版本当前弃用，配置内容可参考，但配置中相关链接已失效，调整内容如下；**
1. 增加`sing-box`的`json`配置，功能模块与`yaml`版本基本一致，但仍属于初始版本，可尝试，但不对可用性保证；
2. 全局配置增加`web ui`相关配置，默认`web ui`密钥在多数客户端不直接生效，需手动在客户端中配置，此配置在部分客户端可能不生效（主要是移动端），如有必要可`copy`后自行删除或相关配置；
3. TUN模式优化，排除主要内网`ip`段，完善DNS劫持范围，并启用严格路由防止流量偷跑；
4. nameserver-policy处理特定域名的特殊DNS需求，亦可拦截广告域名解析。为提高解析速度，仅`nameserver`开启加密DNS，其余保持明文，无安全风险；
5. 海外加密DNS直连被阻断，海外明文DNS不推荐。启用`respect-rules: true`以`rules`决定`DNS`解析方式，`proxy`的`DNS`请求不再由本地处理，转交代理服务器负责（视同系统代理）；
6. 优化`proxy-groups`，调整架构只对大分类及部分必要服务单独拆分分流。
7. 自定义`rule-providers`舍弃了一些第三方规则集，整合后统一管理，仅个人规则总数1K+出头（不包含第三方如Loyalsoldier），无需转换msr类型，可以但没必要。

# 链接
| 版本 | 种类 | 适用core | cdn链接 | raw链接 |
| --- | --- | --- | --- | --- |
| release | yaml | mihomo | [GlobalCoverage.yaml](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.yaml) | [GlobalCoverage.yaml](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.yaml) |
| release | json | sing-box | [GlobalCoverage.json](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.json) | [GlobalCoverage.json](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.json) |
| release | js | mihomo | [GlobalCoverage.js](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.js) | [GlobalCoverage.js](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.js) |
| dev | yaml | mihomo | [GlobalCoverage.yaml](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.yaml) | [GlobalCoverage.yaml](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.yaml) |
| dev | json | sing-box | [GlobalCoverage.json](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.json) | [GlobalCoverage.json](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.json) |
| dev | js | mihomo | [GlobalCoverage.js](https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.js) | [GlobalCoverage.js](https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.js) |
