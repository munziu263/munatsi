---
title: "Call Chipo"
layout: "single"
type: "page"
---

<!-- The call UI is embedded directly -->
<style>
  /* Override blog styles for full-screen call experience */
  .call-page { 
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #0a0a0a;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* Hide blog chrome */
  header, nav, footer, .container > *:not(.call-page) { display: none !important; }
</style>

<div class="call-page">
  <iframe 
    src="https://clawdbot-ziumbe.tail473d83.ts.net/call" 
    style="width: 100%; height: 100%; border: none;"
    allow="microphone"
  ></iframe>
</div>
