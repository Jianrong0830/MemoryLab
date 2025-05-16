#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

// 1. 自動建立 dist/CNAME 檔案
const cname = 'www.memorylab.vip';
const cnamePath = path.join(__dirname, 'dist', 'CNAME');
fs.writeFileSync(cnamePath, cname, 'utf8');
console.log(`✅ CNAME created: ${cnamePath}`);

// 2. 自動部署到 gh-pages 分支
ghpages.publish(
  'dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Jianrong0830/MemoryLab.git',
    message: '🚀 Auto deploy with domain binding',
  },
  function (err) {
    if (err) {
      console.error('❌ Deployment failed:', err);
    } else {
      console.log('🎉 Deployed successfully with custom domain!');
    }
  }
);
