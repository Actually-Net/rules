///////////////////////////////////////////////////////////////////////////////////
//  全局配置
///////////////////////////////////////////////////////////////////////////////////
const globalConfig = {
  //  配置持久化
  "profile": {
    //  保存代理组的手动选择结果，重启后继续使用
    "store-selected": true,
    //  保存 fake-ip 映射表，减少重复分配导致的波动
    "store-fake-ip": true
  },
  //  统一延迟测试方式，减少不同协议节点因握手差异带来的测速偏差
  "unified-delay": true,
  //  对 DNS 返回的多个 IP 并发发起 TCP 连接，优先使用最先成功的连接
  "tcp-concurrent": true,
  //  进程识别模式：strict 更稳，适合连接归属显示和按进程排障
  "find-process-mode": "strict"
};


///////////////////////////////////////////////////////////////////////////////////
//  DNS配置
///////////////////////////////////////////////////////////////////////////////////
//  直连DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", //  阿里DoH
  "https://doh.pub/dns-query" //  腾讯DoH
];
//  代理DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", //  CloudflareDNS
  "https://8.8.4.4/dns-query" //  GoogleDNS  
];
//  DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": false,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    //  本地主机/设备
    "+.lan",
    "+.local",
    //  Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    //  QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    //  追加以下条目
    "+.in-addr.arpa",
    "+.ip6.arpa",
    "time.*.com",
    "time.*.gov",
    "pool.ntp.org",
    //  微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  //  解析直连加密DNS域名
  "default-nameserver": ["223.5.5.5","1.2.4.8"],
  "nameserver": [...foreignNameservers],
  //  解析代理节点域名 / 代理链路相关域名
  "proxy-server-nameserver": ["1.1.1.1","8.8.4.4"],
  "direct-nameserver": [...domesticNameservers],
  "nameserver-policy": {
    "geosite:private,cn": domesticNameservers
  }
};


///////////////////////////////////////////////////////////////////////////////////
//  代理组配置
///////////////////////////////////////////////////////////////////////////////////
//  代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

//  代理组配置
const proxyGroups = [
      //  1、基础组
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "include-all": true,
      //  "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT"],
      //  "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },

      //  2、娱乐组
    {
      ...groupBaseOption,
      "name": "直连游戏",
      "type": "select",
      //  "include-all": true,
      "proxies": ["DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/assets/icons/directgame.svg"
    },
    {
      ...groupBaseOption,
      "name": "代理游戏",
      "type": "select",
      "include-all": true,
      "proxies": ["节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/assets/icons/proxygame.svg"
    },

      //  3、服务组
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "include-all": true,
      "proxies": ["节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["全局直连","节点选择"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择","全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["节点选择","全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
      //  4、媒体组
    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "Netflix",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/netflix.svg"
    },
    
    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "include-all": true,
      "proxies": ["节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/tiktok.svg"
    },
    {
      ...groupBaseOption,
      "name": "动画疯",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      "filter": "(?i)台|tw|TW",
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/Bahamut.svg"
    },
    {
      ...groupBaseOption,
      "name": "国内媒体",
      "type": "select",
      "proxies": ["DIRECT"],
      //  "include-all": true,
      //  "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/assets/icons/cnmedia.svg"
    },
    {
      ...groupBaseOption,
      "name": "Spotify",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/spotify.svg"
    },
      //  5、兜底组
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      //  "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];


///////////////////////////////////////////////////////////////////////////////////
//  规则集配置
///////////////////////////////////////////////////////////////////////////////////
//  规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

const ruleProviders = {
  //  Actually-Net规则集
  "directgame": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/directgame.txt",
    "path": "./ruleset/Actually-Nat/directgame.yaml"
  },
  "proxygame": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/proxygame.txt",
    "path": "./ruleset/Actually-Nat/proxygame.yaml"
  },
  "diydirect": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/diydirect.txt",
    "path": "./ruleset/Actually-Nat/diydirect.yaml"
  },
  "diyproxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/diyproxy.txt",
    "path": "./ruleset/Actually-Nat/diyproxy.yaml"
  },
  "diyreject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/diyreject.txt",
    "path": "./ruleset/Actually-Nat/diyreject.yaml"
  },
  "cnmedia": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/cnmedia.txt",
    "path": "./ruleset/Actually-Nat/cnmedia.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/google.txt",
    "path": "./ruleset/Actually-Nat/google.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/Rules@Rules/rule-providers/microsoft.txt",
    "path": "./ruleset/Actually-Nat/microsoft.yaml"
  },

  //  Loyalsoldier规则集
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  
  //  xiaolin-007规则集
  "bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Bahamut.txt",
    "path": "./ruleset/xiaolin-007/bahamut.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/YouTube.txt",
    "path": "./ruleset/xiaolin-007/YouTube.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Netflix.txt",
    "path": "./ruleset/xiaolin-007/Netflix.yaml"
  },
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Spotify.txt",
    "path": "./ruleset/xiaolin-007/Spotify.yaml"
  },
  "AI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/AI.txt",
    "path": "./ruleset/xiaolin-007/AI.yaml"    
  },
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/TikTok.txt",
    "path": "./ruleset/xiaolin-007/TikTok.yaml"    
  },
};


///////////////////////////////////////////////////////////////////////////////////
//  分流规则配置
///////////////////////////////////////////////////////////////////////////////////
const rules = [
  //  1、本地直连
  "IP-CIDR,10.0.0.0/8,全局直连,no-resolve",
  "IP-CIDR,172.16.0.0/12,全局直连,no-resolve",
  "IP-CIDR,192.168.0.0/16,全局直连,no-resolve",
  "RULE-SET,applications,全局直连",
  "RULE-SET,private,全局直连",

  //  2、广告过滤
  "RULE-SET,reject,广告过滤",
  "RULE-SET,diyreject,广告过滤",//  补充拦截

  //  3、游戏
  "RULE-SET,directgame,直连游戏",//  直连游戏
  "RULE-SET,proxygame,代理游戏",//  代理游戏

  //  4、自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", //  Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", //  Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", //  Google Play下载服务
  "DOMAIN-SUFFIX,github.io,节点选择", //  Github Pages
  "DOMAIN,v2rayse.com,节点选择", //  V2rayse节点工具
  "RULE-SET,diydirect,全局直连", //  补充直连
  "RULE-SET,diyproxy,节点选择", //  补充代理
  "RULE-SET,cnmedia,国内媒体",  //  国内媒体

  //  5、细化分流
  "RULE-SET,AI,AI",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,TikTok,TikTok",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,bahamut,动画疯",
  
  //  6、服务类
  "RULE-SET,google,谷歌服务",
  "RULE-SET,microsoft,微软服务",
  "RULE-SET,icloud,苹果服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,telegramcidr,Telegram,no-resolve",

  //  7、代理类
  "RULE-SET,proxy,节点选择",
  "RULE-SET,gfw,节点选择",

  //  8、非中国域名
  "RULE-SET,tld-not-cn,节点选择",

  //  9、直连
  "RULE-SET,direct,全局直连",
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "GEOSITE,CN,全局直连",
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOIP,CN,全局直连,no-resolve",
  //  10、兜底（最后的兜底规则）
  "MATCH,漏网之鱼"
];


//  程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  //  覆盖原配置中的全局行为配置
  Object.assign(config, globalConfig);

  //  覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  //  覆盖原配置中的代理组
  config["proxy-groups"] = proxyGroups;

  //  覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  //  为每个节点补充 udp = true
  if (config["proxies"]) {
    config["proxies"].forEach(proxy => {
      proxy.udp = true;
    });
  }

  //  返回修改后的配置
  return config;
}