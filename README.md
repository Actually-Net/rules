# 说明
  1. 适配各类Clash类型代理工具 
  2. 配置国内外DNS加密及DNS分流，避免DNS泄露 
  3. 配置自定义代理组，基于业务类型选择出口
  4. 集成具有良好使用量及口碑的第三方规则集和自定义规则集实现分流

# 版本
  1. dev版本在release版基础上细化分流，基本属于增量，可能存在一些问题，谨慎使用
  2. js脚本不做独立优化，基本只同步yaml配置的功能模块
  
# 链接
  方便远程调用
  
  GlobalCoverage.yaml（全局覆写配置）
```yaml
https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalCoverage.yaml
```
```yaml
https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalCoverage.yaml
```
  GlobalExtension.js（全局拓展脚本）
```yaml
https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/release/GlobalExtension.js
```
```yaml
https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/release/GlobalExtension.js
```
  GlobalCoverage.yaml（全局覆写配置-dev）
```yaml
https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/overrides/dev/GlobalCoverage.yaml
```
```yaml
https://raw.githubusercontent.com/Actually-Net/rules/main/overrides/dev/GlobalCoverage.yaml
```



