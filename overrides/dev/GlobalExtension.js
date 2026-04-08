///////////////////////////////////////////////////////////////////////////////////
//  全局配置
///////////////////////////////////////////////////////////////////////////////////
const globalConfig = {
  "mixed-port": 7890,
  "allow-lan": false,
  "mode": "rule",
  "log-level": "info",
  "ipv6": false,
  "external-controller": "127.0.0.1:9090",
  "secret": "809050203040",
  "external-ui": "ui",
  "external-ui-name": "dist",
  "external-ui-url": "https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip",
  "profile": {
    "store-selected": true,
    "store-fake-ip": true
  },
  "unified-delay": true,
  "tcp-concurrent": true,
  "find-process-mode": "strict",
  "tun": {
    "enable": true,
    "stack": "mixed",
    "auto-route": true,
    "auto-detect-interface": true,
    "strict-route": true,
    "route-exclude-address": [
      "10.0.0.0/8",
      "127.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16"
    ],
    "dns-hijack": [
      "any:53",
      "tcp://any:53",
      "[::]:53",
      "tcp://[::]:53"
    ]
  }
};

///////////////////////////////////////////////////////////////////////////////////
//  DNS 配置
///////////////////////////////////////////////////////////////////////////////////
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "disable-qtype-65": true,
  "ipv6": false,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": true,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "localhost",
    "+.lan",
    "+.local",
    "*.localhost",
    "*.localdomain",
    "*.home.arpa",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "+.mdt.qq.com",
    "localhost.work.weixin.qq.com",
    "weixin.qq.com",
    "+.in-addr.arpa",
    "+.ip6.arpa",
    "time.*.com",
    "time.*.gov",
    "pool.ntp.org",
    "+.example.org",
    "+.gs.com",
    "+.gamesci.com.cn",
    "stun.*",
    "srv.nintendo.net"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29"],
  "nameserver-policy": {
    "geosite:category-ads-all": "1.0.1.1#REJECT",
    "+.gs.com": "192.168.20.201#DIRECT",
    "+.gamesci.com.cn": "192.168.20.201#DIRECT"
  },
  "nameserver": [
    "https://223.5.5.5/dns-query",
    "https://1.12.12.12/dns-query"
  ],
  "proxy-server-nameserver": ["223.5.5.5", "1.12.12.12"]
};

///////////////////////////////////////////////////////////////////////////////////
//  流量嗅探配置
///////////////////////////////////////////////////////////////////////////////////
const snifferConfig = {
  "enable": true,
  "parse-pure-ip": false,
  "sniff": {
    "TLS": {
      "ports": [443, 8443]
    },
    "HTTP": {
      "ports": [80, "8080-8880"]
    }
  },
  "force-domain": [
    "+.googleapis.com",
    "+.bilivideo.com",
    "+.bilivideo.cn",
    "+.hdslb.com",
    "+.apple.com",
    "+.icloud.com",
    "+.microsoft.com"
  ],
  "skip-domain": [
    "Mijia Cloud",
    "dlg.io.mi.com",
    "+.local",
    "+.lan",
    "+.push.apple.com",
    "+.gs.com",
    "+.gamesci.com.cn"
  ]
};

///////////////////////////////////////////////////////////////////////////////////
//  代理组配置
///////////////////////////////////////////////////////////////////////////////////
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

const proxyGroups = [
  {
    ...groupBaseOption,
    "name": "节点选择",
    "type": "select",
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/adjust.svg"
  },
  {
    ...groupBaseOption,
    "name": "全局直连",
    "type": "select",
    "proxies": ["DIRECT"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/link.svg"
  },
  {
    ...groupBaseOption,
    "name": "广告过滤",
    "type": "select",
    "proxies": ["REJECT", "DIRECT"],
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/bug.svg"
  },
  {
    ...groupBaseOption,
    "name": "国内游戏",
    "type": "select",
    "proxies": ["DIRECT"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/game-cn.svg"
  },
  {
    ...groupBaseOption,
    "name": "国际游戏",
    "type": "select",
    "proxies": ["节点选择", "DIRECT"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/game-intl.svg"
  },
  {
    ...groupBaseOption,
    "name": "AI",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/chatgpt.svg"
  },
  {
    ...groupBaseOption,
    "name": "谷歌服务",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/google.svg"
  },
  {
    ...groupBaseOption,
    "name": "微软中国",
    "type": "select",
    "proxies": ["DIRECT", "节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/microsoft.svg"
  },
  {
    ...groupBaseOption,
    "name": "微软国际",
    "type": "select",
    "proxies": ["节点选择", "DIRECT"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/microsoft-intl.svg"
  },
  {
    ...groupBaseOption,
    "name": "苹果服务",
    "type": "select",
    "proxies": ["DIRECT", "节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/apple.svg"
  },
  {
    ...groupBaseOption,
    "name": "Telegram",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/telegram.svg"
  },
  {
    ...groupBaseOption,
    "name": "BT",
    "type": "select",
    "proxies": ["DIRECT", "节点选择", "REJECT"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/bt.svg"
  },
  {
    ...groupBaseOption,
    "name": "YouTube",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/youtube.svg"
  },
  {
    ...groupBaseOption,
    "name": "Netflix",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/netflix.svg"
  },
  {
    ...groupBaseOption,
    "name": "TikTok",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/tiktok.svg"
  },
  {
    ...groupBaseOption,
    "name": "动画疯",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/Bahamut.svg"
  },
  {
    ...groupBaseOption,
    "name": "国内媒体",
    "type": "select",
    "proxies": ["DIRECT"],
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/media-cn.svg"
  },
  {
    ...groupBaseOption,
    "name": "海外媒体",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/media-intl.svg"
  },
  {
    ...groupBaseOption,
    "name": "漏网之鱼",
    "type": "select",
    "proxies": ["节点选择"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/assets/icons/fish.svg"
  }
];

///////////////////////////////////////////////////////////////////////////////////
//  规则集配置
///////////////////////////////////////////////////////////////////////////////////
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

const ruleProviders = {
  "game-cn": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/game-cn.txt",
    "path": "./ruleset/Actually-Net/game-cn.yaml"
  },
  "game-intl": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/game-intl.txt",
    "path": "./ruleset/Actually-Net/game-intl.yaml"
  },
  "an-reject": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-reject.txt",
    "path": "./ruleset/Actually-Net/an-reject.yaml"
  },
  "an-direct": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-direct.txt",
    "path": "./ruleset/Actually-Net/an-direct.yaml"
  },
  "an-proxy": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-proxy.txt",
    "path": "./ruleset/Actually-Net/an-proxy.yaml"
  },
  "an-ai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-ai.txt",
    "path": "./ruleset/Actually-Net/an-ai.yaml"
  },
  "an-tiktok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-tiktok.txt",
    "path": "./ruleset/Actually-Net/an-tiktok.yaml"
  },
  "an-netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-netflix.txt",
    "path": "./ruleset/Actually-Net/an-netflix.yaml"
  },
  "an-bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-bahamut.txt",
    "path": "./ruleset/Actually-Net/an-bahamut.yaml"
  },
  "media-cn": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/media-cn.txt",
    "path": "./ruleset/Actually-Net/media-cn.yaml"
  },
  "media-intl": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/media-intl.txt",
    "path": "./ruleset/Actually-Net/media-intl.yaml"
  },
  "an-youtube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-youtube.txt",
    "path": "./ruleset/Actually-Net/an-youtube.yaml"
  },
  "an-google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/an-google.txt",
    "path": "./ruleset/Actually-Net/an-google.yaml"
  },
  "microsoft-cn": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/microsoft-cn.txt",
    "path": "./ruleset/Actually-Net/microsoft-cn.yaml"
  },
  "microsoft-intl": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Actually-Net/rules@main/rule-providers/microsoft-intl.txt",
    "path": "./ruleset/Actually-Net/microsoft-intl.yaml"
  },
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
  }
};

///////////////////////////////////////////////////////////////////////////////////
//  分流规则配置
///////////////////////////////////////////////////////////////////////////////////
const rules = [
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,applications,全局直连",
  "RULE-SET,private,全局直连",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,an-reject,广告过滤",
  "RULE-SET,game-cn,国内游戏",
  "RULE-SET,game-intl,国际游戏",
  "RULE-SET,an-direct,全局直连",
  "RULE-SET,an-proxy,节点选择",
  "RULE-SET,media-cn,国内媒体",
  "RULE-SET,an-ai,AI",
  "RULE-SET,an-youtube,YouTube",
  "RULE-SET,an-netflix,Netflix,no-resolve",
  "RULE-SET,an-tiktok,TikTok",
  "RULE-SET,an-bahamut,动画疯",
  "RULE-SET,media-intl,海外媒体",
  "RULE-SET,an-google,谷歌服务",
  "RULE-SET,microsoft-intl,微软国际",
  "RULE-SET,microsoft-cn,微软中国",
  "RULE-SET,icloud,苹果服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,telegramcidr,Telegram,no-resolve",
  "GEOSITE,tracker,BT",
  "RULE-SET,gfw,节点选择",
  "RULE-SET,proxy,节点选择",
  "RULE-SET,tld-not-cn,节点选择",
  "GEOIP,LAN,全局直连,no-resolve",
  "RULE-SET,direct,全局直连",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "GEOSITE,CN,全局直连",
  "GEOIP,CN,全局直连,no-resolve",
  "MATCH,漏网之鱼"
];

function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount = typeof config?.["proxy-providers"] === "object"
    ? Object.keys(config["proxy-providers"]).length
    : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  Object.assign(config, globalConfig);
  config["dns"] = dnsConfig;
  config["sniffer"] = snifferConfig;
  config["proxy-groups"] = proxyGroups;
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  if (config["proxies"]) {
    config["proxies"].forEach(proxy => {
      proxy.udp = true;
    });
  }

  return config;
}
