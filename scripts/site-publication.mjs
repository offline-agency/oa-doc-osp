const origin='https://docs.offlineagency.com';
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function pagePolicy(route,context,redirects=[]) {
 const redirect=redirects.find(item=>item.route===route);
 const target=redirect?.target || (context && !context.snapshot ? context.pinnedRoute : route);
 const canonical=new URL(target || route,origin);canonical.search='';canonical.hash='';
 const noindex=!!redirect || context?.channel==='next' || (!!context && !context.snapshot) || route==='/404.html';
 return {canonical:canonical.href,robots:noindex?'noindex, follow':'index, follow',...(redirect?{redirect:redirect.target}:{})};
}
export function withSeo(html,policy) {
 const clean=html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,'').replace(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,'');
 return clean.replace('</head>',`<link rel="canonical" href="${escape(policy.canonical)}"><meta name="robots" content="${policy.robots}"></head>`);
}
export function redirectHtml({route,target,anchors={}}) {
 const policy=pagePolicy(route,null,[{route,target}]);
 const payload=JSON.stringify({target,anchors}).replaceAll('<','\\u003c');
 return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Documentation moved | OFFLINE Agency</title><link rel="canonical" href="${escape(policy.canonical)}"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0; url=${escape(target)}"></head><body><main><h1>Documentation moved</h1><p><a href="${escape(target)}">Open the versioned documentation</a>.</p><p>The versioned guide identifies the exact source release. Older section links are listed below.</p>${Object.entries(anchors).map(([id,destination])=>`<p id="${escape(id)}"><a href="${escape(destination)}">${escape(id)}</a></p>`).join('')}</main><script>(function(){var data=${payload};var key;try{key=decodeURIComponent(location.hash.slice(1))}catch(e){key=location.hash.slice(1)}var found=Object.prototype.hasOwnProperty.call(data.anchors,key);var target=found?data.anchors[key]:data.target;if(key&&!found)target+=(target.indexOf('?')>=0?'&':'?')+'missing-topic='+encodeURIComponent(key);location.replace(target)})();</script></body></html>`;
}
export function sitemap(policies,history={}) {
 const urls=Object.entries(policies).filter(([route,policy])=>!policy.redirect && policy.robots.startsWith('index,') && policy.canonical===new URL(route,origin).href).map(([,policy])=>policy.canonical).sort();
 return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(urls)].map(url=>{const date=history[new URL(url).pathname]?.changedOn;return `<url><loc>${escape(url)}</loc>${/^\d{4}-\d{2}-\d{2}$/.test(date || '')?`<lastmod>${date}</lastmod>`:''}</url>`}).join('')}</urlset>\n`;
}
